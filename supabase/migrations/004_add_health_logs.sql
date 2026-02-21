-- supabase/migrations/004_add_health_logs.sql

CREATE TABLE public.health_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('insulin', 'blood_sugar', 'ketones', 'medication')),
  value NUMERIC NOT NULL,
  unit TEXT, -- 'units', 'mg/dL', 'mmol/L', etc.
  notes TEXT,
  logged_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.health_logs ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "own_health_logs" ON health_logs 
  FOR ALL USING (auth.uid() = user_id);

-- Index for performance
CREATE INDEX idx_health_logs_user_date ON health_logs(user_id, logged_at DESC);
