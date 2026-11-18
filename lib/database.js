import { getCloudflareContext } from '@opennextjs/cloudflare';

async function getDatabase() {
  const { env } = await getCloudflareContext({ async: true });

  if (!env.DB) {
    throw new Error('The Cloudflare D1 binding "DB" is not configured.');
  }

  return env.DB;
}

export async function insertConsultationLead(leadData) {
  const database = await getDatabase();
  const record = {
    id: crypto.randomUUID(),
    name: leadData.name.trim(),
    email: leadData.email.trim().toLowerCase(),
    phone: leadData.phone.trim(),
    company: leadData.company.trim(),
    industry: leadData.industry || 'Industrial & Manufacturing',
    users: leadData.users || '25-50 Users',
    service: leadData.service || 'Full ERP Implementation',
    timeline: leadData.timeline || 'Within 1-2 Months',
    modules: Array.isArray(leadData.modules) ? leadData.modules : [],
    notes: leadData.notes?.trim() || '',
    createdAt: new Date().toISOString(),
  };

  await database
    .prepare(
      `INSERT INTO consultation_leads
        (id, full_name, work_email, phone_number, company_name, industry,
         estimated_users, service_required, timeline, target_modules, notes, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .bind(
      record.id,
      record.name,
      record.email,
      record.phone,
      record.company,
      record.industry,
      record.users,
      record.service,
      record.timeline,
      JSON.stringify(record.modules),
      record.notes,
      record.createdAt
    )
    .run();

  return {
    success: true,
    mode: 'database',
    data: record,
  };
}

export async function insertNewsletterSubscriber(email) {
  const database = await getDatabase();
  const normalizedEmail = email.trim().toLowerCase();
  const id = crypto.randomUUID();
  const subscribedAt = new Date().toISOString();
  const result = await database
    .prepare(
      `INSERT INTO newsletter_subscribers (id, email, subscribed_at)
       VALUES (?, ?, ?)
       ON CONFLICT(email) DO NOTHING`
    )
    .bind(id, normalizedEmail, subscribedAt)
    .run();

  return {
    success: true,
    mode: 'database',
    alreadySubscribed: result.meta.changes === 0,
  };
}

export async function listConsultationLeads(limit, offset) {
  const database = await getDatabase();
  const result = await database
    .prepare(
      `SELECT id, full_name, work_email, phone_number, company_name, industry,
              estimated_users, service_required, timeline, target_modules, notes,
              status, created_at
       FROM consultation_leads
       ORDER BY created_at DESC
       LIMIT ? OFFSET ?`
    )
    .bind(limit, offset)
    .all();

  return result.results;
}

export async function updateConsultationLeadStatus(id, status) {
  const database = await getDatabase();
  const result = await database
    .prepare('UPDATE consultation_leads SET status = ? WHERE id = ?')
    .bind(status, id)
    .run();

  return result.meta.changes > 0;
}

export async function listNewsletterSubscribers(limit, offset) {
  const database = await getDatabase();
  const result = await database
    .prepare(
      `SELECT email, subscribed_at, is_active
       FROM newsletter_subscribers
       ORDER BY subscribed_at DESC
       LIMIT ? OFFSET ?`
    )
    .bind(limit, offset)
    .all();

  return result.results;
}

export async function checkDatabaseConnection() {
  const database = await getDatabase();
  await database.prepare('SELECT 1').first();
}
