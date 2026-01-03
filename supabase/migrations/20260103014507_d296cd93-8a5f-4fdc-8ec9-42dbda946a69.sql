-- Create marketplace_leads table for capturing email signups
CREATE TABLE public.marketplace_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.marketplace_leads ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for lead capture without auth)
CREATE POLICY "Anyone can submit their email"
ON public.marketplace_leads
FOR INSERT
WITH CHECK (true);

-- Only allow reading for authenticated admins (future use)
-- No select policy for now since we don't need to display leads in the app