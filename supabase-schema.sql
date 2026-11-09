-- ==============================================================================
-- Yovarin Technologies — Supabase Database Setup Schema
-- Run this script in your Supabase Dashboard: SQL Editor -> New Query -> Run
-- Associated Account Email: yovarin.com@gmail.com
-- ==============================================================================

-- 1. Create table for Consultation Inquiries & Enterprise Leads
CREATE TABLE IF NOT EXISTS public.consultation_leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    work_email TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    company_name TEXT NOT NULL,
    industry TEXT DEFAULT 'Industrial & Manufacturing',
    estimated_users TEXT DEFAULT '25-50 Users',
    service_required TEXT DEFAULT 'Full ERP Implementation',
    timeline TEXT DEFAULT 'Within 1-2 Months',
    target_modules TEXT[] DEFAULT ARRAY[]::TEXT[],
    notes TEXT,
    status TEXT DEFAULT 'new', -- 'new', 'contacted', 'scheduled', 'closed'
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Index for searching leads by email and company
CREATE INDEX IF NOT EXISTS idx_consultation_leads_email ON public.consultation_leads(work_email);
CREATE INDEX IF NOT EXISTS idx_consultation_leads_created ON public.consultation_leads(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE public.consultation_leads ENABLE ROW LEVEL SECURITY;

-- Allow anonymous visitors from your Next.js site to submit consultation forms
CREATE POLICY "Allow public insert into consultation_leads" 
ON public.consultation_leads 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

-- Allow authenticated admins to view/manage leads
CREATE POLICY "Allow authenticated read of consultation_leads" 
ON public.consultation_leads 
FOR SELECT 
TO authenticated 
USING (true);


-- 2. Create table for Newsletter Subscribers (Tech Dispatch)
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    subscribed_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    is_active BOOLEAN DEFAULT true NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_newsletter_email ON public.newsletter_subscribers(email);

ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Allow anonymous visitors to subscribe
CREATE POLICY "Allow public insert into newsletter_subscribers" 
ON public.newsletter_subscribers 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

-- Allow authenticated admins to view subscribers
CREATE POLICY "Allow authenticated read of newsletter_subscribers" 
ON public.newsletter_subscribers 
FOR SELECT 
TO authenticated 
USING (true);

-- ==============================================================================
-- Schema creation complete!
-- You can view and manage all incoming leads under Table Editor -> consultation_leads
-- ==============================================================================
