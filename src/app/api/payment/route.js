import { NextResponse } from "next/server";

import { headers } from 'next/headers'
import { stripe } from "@/lib/stripe";
import { getSession } from "@/lib/session";


export async function POST(req) {
    try {
        const headersList = await headers()
        const origin = headersList.get('origin')
        const userSession=await getSession()
        const user=userSession?.user;

        const formData=await req.formData()
        const price=formData.get('price')
        const title=formData.get('title')
        const productId=formData.get('productId')


        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
            customer_email:user?.email,
            line_items: [
                {
                    price_data:{
                        currency:'usd',
                        unit_amount:Number(price)*100,
                        product_data:{
                            name:title
                        }
                    },
                    quantity: 1,
                },
            ],
            metadata:{
                priceId:price,
                userId:user?.id,
                userEmail:user?.email,
            },
            mode: 'payment',
            success_url: `${origin}/pricing/payment-success?session_id={CHECKOUT_SESSION_ID}`,
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