import { payments, subscription } from '@/lib/action/payments'
import { stripe } from '@/lib/stripe'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'


export default async function Success({ searchParams }) {
    const { session_id } = await searchParams

    if (!session_id)
        throw new Error('Please provide a valid session_id (`cs_test_...`)')

    const {
        status,
        metadata,
        customer_details: { email: customerEmail }
    } = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ['line_items', 'payment_intent']
    })

    if (status === 'open') {
        return redirect('/')
    }

    if (status === 'complete') {
        // console.log(metadata)
        await payments({...metadata,sessionId:session_id})
        

        return (
            <section
                id="success"
                className="min-h-[80vh] flex items-center justify-center p-4 "
            >
                <div className="w-full max-w-md bg-[#18181b]/80 border border-zinc-800/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl flex flex-col items-center text-center relative overflow-hidden group">

                    <div className="absolute -top-24 -left-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-all duration-500" />
                    <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all duration-500" />

                    <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center justify-center text-emerald-400 mb-6 shadow-lg shadow-emerald-500/5 scale-100 animate-pulse">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2.5}
                            stroke="currentColor"
                            className="w-8 h-8"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                    </div>

                    <h2 className="text-2xl font-black text-white tracking-tight mb-2">
                        Payment Successful!
                    </h2>
                    <p className="text-xs text-zinc-500 font-mono bg-zinc-900/60 border border-zinc-800/50 px-3 py-1 rounded-full mb-6">
                        ID: {session_id.slice(0, 15)}...
                    </p>

                    <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-5 text-sm text-zinc-300 leading-relaxed text-left w-full mb-6">
                        We appreciate your business! A confirmation email will be sent to{' '}
                        <span className="text-white font-semibold underline decoration-pink-500/50 decoration-2 underline-offset-2">
                            {customerEmail}
                        </span>.
                    </div>

                    <p className="text-xs text-zinc-400">
                        If you have any questions, please email{' '}
                        <a
                            href="mailto:orders@example.com"
                            className="text-pink-400 font-semibold hover:text-pink-300 transition-colors underline decoration-pink-500/20 hover:decoration-pink-500/50"
                        >
                            orders@example.com
                        </a>.
                    </p>

                    <Link
                        href="/"
                        className="w-full mt-6 bg-gradient-to-r from-pink-500 to-indigo-600 hover:opacity-95 text-white font-bold h-11 flex items-center justify-center rounded-xl text-sm shadow-lg shadow-pink-500/10 active:scale-[0.98] transition-all"
                    >
                        Go to Dashboard
                    </Link>
                </div>
            </section>
        )
    }
}