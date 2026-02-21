-- Migration: Add subscription fields to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS is_pro BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS subscription_tier TEXT DEFAULT 'free',
ADD COLUMN IF NOT EXISTS subscription_end_date TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS payment_gateway TEXT, -- 'stripe' or 'iyzico'
ADD COLUMN IF NOT EXISTS external_customer_id TEXT;

-- Create an index for faster lookups
CREATE INDEX IF NOT EXISTS idx_profiles_is_pro ON public.profiles(is_pro);
