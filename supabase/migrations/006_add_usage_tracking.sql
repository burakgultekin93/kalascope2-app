-- Migration: Add usage tracking fields to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS daily_scans_count INT DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_scan_date DATE DEFAULT CURRENT_DATE;

-- Function to check and reset scans if the date has changed
CREATE OR REPLACE FUNCTION increment_scan_count(user_id_param UUID)
RETURNS INT AS $$
DECLARE
    current_count INT;
    last_date DATE;
BEGIN
    SELECT daily_scans_count, last_scan_date INTO current_count, last_date
    FROM public.profiles
    WHERE id = user_id_param;

    IF last_date < CURRENT_DATE THEN
        -- It's a new day, reset to 1 (counting current scan)
        UPDATE public.profiles
        SET daily_scans_count = 1,
            last_scan_date = CURRENT_DATE
        WHERE id = user_id_param;
        RETURN 1;
    ELSE
        -- Same day, increment
        UPDATE public.profiles
        SET daily_scans_count = current_count + 1
        WHERE id = user_id_param;
        RETURN current_count + 1;
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
