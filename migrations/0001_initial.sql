CREATE TABLE IF NOT EXISTS consultation_leads (
  id TEXT PRIMARY KEY NOT NULL,
  full_name TEXT NOT NULL,
  work_email TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  company_name TEXT NOT NULL,
  industry TEXT NOT NULL DEFAULT 'Industrial & Manufacturing',
  estimated_users TEXT NOT NULL DEFAULT '25-50 Users',
  service_required TEXT NOT NULL DEFAULT 'Full ERP Implementation',
  timeline TEXT NOT NULL DEFAULT 'Within 1-2 Months',
  target_modules TEXT NOT NULL DEFAULT '[]' CHECK (json_valid(target_modules)),
  notes TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'new'
    CHECK (status IN ('new', 'contacted', 'scheduled', 'closed')),
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_consultation_leads_email
  ON consultation_leads(work_email);
CREATE INDEX IF NOT EXISTS idx_consultation_leads_created
  ON consultation_leads(created_at DESC);

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id TEXT PRIMARY KEY NOT NULL,
  email TEXT NOT NULL COLLATE NOCASE UNIQUE,
  subscribed_at TEXT NOT NULL,
  is_active INTEGER NOT NULL DEFAULT 1 CHECK (is_active IN (0, 1))
);

CREATE INDEX IF NOT EXISTS idx_newsletter_subscribed
  ON newsletter_subscribers(subscribed_at DESC);
