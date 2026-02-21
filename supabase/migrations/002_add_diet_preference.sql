-- Migration 002: Add Diet Preference to Profiles

-- Add diet_preference column with default 'standard'
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS diet_preference text DEFAULT 'standard'::text;

-- Optional: Add a check constraint to ensure only valid diets are used
ALTER TABLE public.profiles
ADD CONSTRAINT valid_diet_preference 
CHECK (diet_preference IN ('standard', 'ketogenic', 'vegan', 'vegetarian', 'diabetic', 'high_protein', 'mediterranean'));
