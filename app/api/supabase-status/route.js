import { NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';

export async function GET() {
  const supabase = getSupabase();

  if (!supabase) {
    return NextResponse.json({
      connected: false,
      configured: false,
      message: 'Supabase credentials are not yet set in .env.local. Follow instructions in supabase-schema.sql to connect.',
    });
  }

  try {
    // Ping Supabase with a lightweight query
    const { error } = await supabase.from('consultation_leads').select('id').limit(1);

    if (error && error.code !== 'PGRST116') {
      return NextResponse.json({
        connected: false,
        configured: true,
        message: `Connected to Supabase, but encountered error querying 'consultation_leads': ${error.message}. Make sure you ran supabase-schema.sql!`,
        error: error.message,
      });
    }

    return NextResponse.json({
      connected: true,
      configured: true,
      message: 'Supabase is fully configured, connected and operational!',
    });
  } catch (err) {
    return NextResponse.json({
      connected: false,
      configured: true,
      message: err.message,
    });
  }
}
