-- Migration: Add streak and gamification fields to profiles table
-- Up
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS current_streak integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS longest_streak integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_login_date timestamp with time zone;

-- Optional: Create an index on last_login_date if we need to query active users frequently
-- CREATE INDEX IF NOT EXISTS idx_profiles_last_login ON profiles(last_login_date);
