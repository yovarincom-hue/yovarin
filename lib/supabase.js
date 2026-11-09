import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Singleton client instance
let supabaseInstance = null;

export function getSupabase() {
  if (
    !supabaseUrl || 
    !supabaseAnonKey || 
    supabaseUrl.includes('placeholder') || 
    supabaseAnonKey.includes('your-anon') ||
    supabaseAnonKey.length < 20
  ) {
    return null;
  }
  
  if (!supabaseInstance) {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
      },
    });
  }
  
  return supabaseInstance;
}

/**
 * Inserts a new consultation inquiry / lead into Supabase
 */
export async function insertConsultationLead(leadData) {
  const supabase = getSupabase();
  
  if (!supabase) {
    console.warn('Supabase not yet configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local');
    return {
      success: true,
      mode: 'simulated',
      message: 'Lead received in fallback mode. Please configure your Supabase credentials in .env.local to persist directly into PostgreSQL.',
      data: leadData,
    };
  }

  const { data, error } = await supabase
    .from('consultation_leads')
    .insert([
      {
        full_name: leadData.name,
        work_email: leadData.email,
        phone_number: leadData.phone,
        company_name: leadData.company,
        industry: leadData.industry || 'Industrial & Manufacturing',
        estimated_users: leadData.users || '25-50 Users',
        service_required: leadData.service || 'Full ERP Implementation',
        timeline: leadData.timeline || 'Within 1-2 Months',
        target_modules: Array.isArray(leadData.modules) ? leadData.modules : [],
        notes: leadData.notes || '',
        created_at: new Date().toISOString(),
      },
    ])
    .select();

  if (error) {
    console.error('Supabase insert error:', error);
    throw new Error(error.message);
  }

  return {
    success: true,
    mode: 'database',
    data: data[0],
  };
}

/**
 * Inserts a new newsletter subscriber into Supabase
 */
export async function insertNewsletterSubscriber(email) {
  const supabase = getSupabase();

  if (!supabase) {
    console.warn('Supabase not configured. Set credentials in .env.local');
    return {
      success: true,
      mode: 'simulated',
      message: 'Subscriber received in fallback mode.',
    };
  }

  const { data, error } = await supabase
    .from('newsletter_subscribers')
    .insert([
      {
        email: email.trim().toLowerCase(),
        subscribed_at: new Date().toISOString(),
        is_active: true,
      },
    ])
    .select();

  if (error) {
    // If already subscribed (unique constraint), treat as success
    if (error.code === '23505') {
      return { success: true, message: 'Already subscribed' };
    }
    console.error('Newsletter insert error:', error);
    throw new Error(error.message);
  }

  return {
    success: true,
    mode: 'database',
    data: data[0],
  };
}
