import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe?target=deno'

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
    // Basic CORS for non-POST requests or preflights
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    const signature = req.headers.get('stripe-signature')
    if (!signature) {
        return new Response('Missing stripe-signature', { status: 400 })
    }

    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') ?? '', {
        apiVersion: '2022-11-15',
        httpClient: Stripe.createFetchHttpClient(),
    })
    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET') ?? ''

    try {
        const body = await req.text()
        let event
        try {
            event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
        } catch (err) {
            console.error(`Webhook signature verification failed: ${err.message}`)
            return new Response(`Webhook Error: ${err.message}`, { status: 400 })
        }

        const supabaseAdmin = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
        )

        // Handle the event
        if (event.type === 'checkout.session.completed') {
            const session = event.data.object
            const userId = session.metadata?.user_id

            if (userId) {
                console.log(`Payment successful for user: ${userId}`)

                // Update user profile to PRO
                const { error } = await supabaseAdmin
                    .from('profiles')
                    .update({
                        is_pro: true,
                        subscription_tier: 'pro',
                        subscription_end_date: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
                        payment_gateway: 'stripe'
                    })
                    .eq('id', userId)

                if (error) {
                    console.error(`Error updating profile: ${error.message}`)
                    return new Response('Error updating profile', { status: 500 })
                }
            } else {
                console.warn('No user_id found in session metadata')
            }
        }

        return new Response(JSON.stringify({ received: true }), {
            headers: { 'Content-Type': 'application/json' },
            status: 200
        })

    } catch (error) {
        console.error('Webhook Error:', error.message)
        return new Response(JSON.stringify({ error: error.message }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        })
    }
})
