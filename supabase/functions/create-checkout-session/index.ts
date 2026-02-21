import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe?target=deno'

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const supabaseClient = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_ANON_KEY') ?? '',
            { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
        )

        const { data: { user } } = await supabaseClient.auth.getUser()
        if (!user) throw new Error('Not authenticated')

        const { priceId, gateway } = await req.json()

        if (gateway === 'stripe') {
            const stripeKey = Deno.env.get('STRIPE_SECRET_KEY')
            if (!stripeKey) throw new Error('STRIPE_SECRET_KEY is not set')

            const stripe = new Stripe(stripeKey, {
                apiVersion: '2022-11-15',
                httpClient: Stripe.createFetchHttpClient(),
            })

            // Map frontend priceId to Stripe Price ID
            // NOTE: priceId should ideally be the Stripe Price ID (e.g., price_...)
            const stripePriceId = priceId === 'pro_annual' ? 'prod_U1SiFbuRzIgkZE' : priceId

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: [
                    {
                        price: stripePriceId,
                        quantity: 1,
                    },
                ],
                mode: 'subscription',
                success_url: `${req.headers.get('origin')}/app?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${req.headers.get('origin')}/app/paywall`,
                customer_email: user.email,
                metadata: {
                    user_id: user.id
                }
            })

            return new Response(JSON.stringify({ url: session.url }), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            })
        } else {
            return new Response(JSON.stringify({ message: "Iyzico integration requires merchant keys" }), {
                status: 200,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            })
        }

    } catch (error) {
        console.error('Checkout Error:', error)
        return new Response(JSON.stringify({ error: error.message }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
    }
})
