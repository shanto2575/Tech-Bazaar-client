import { NextResponse } from "next/server";

import { headers } from 'next/headers'
import { stripe } from "@/lib/stripe";
import { getSession } from "@/lib/session";


export async function POST() {
    try {
        const headersList = await headers()
        const origin = headersList.get('origin')
        const userSession=await getSession()
        const user=userSession?.user;

        const PRICE_ID='price_1TiaI6HT75yvwioq1mhwAS03'

        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
            customer_email:user?.email,
            line_items: [
                {
                    // Provide the exact Price ID (for example, price_1234) of the product you want to sell
                    price: PRICE_ID,
                    quantity: 1,
                },
            ],
            metadata:{
                priceId:PRICE_ID,
                userId:user?.id,
                userEmail:user?.email,
            },
            mode: 'subscription',
            success_url: `${origin}/pricing/success?session_id={CHECKOUT_SESSION_ID}`,
            automatic_tax: { enabled: true },
        });
        return NextResponse.redirect(session.url, 303)
    } catch (err) {
        return NextResponse.json(
            { error: err.message },
            { status: err.statusCode || 500 }
        )
    }
}
export async function GET() {
    return NextResponse.json({ message: 'this is subsription api route' })
}