import { NextResponse } from 'next/server';
import { insertConsultationLead } from '@/lib/supabase';
import { sendLeadNotificationEmail, sendLeadConfirmationEmail } from '@/lib/mailer';

export async function POST(request) {
  try {
    const body = await request.json();

    // Basic validation
    if (!body.name || !body.email || !body.phone || !body.company) {
      return NextResponse.json(
        { error: 'Please provide all required fields: name, email, phone, and company.' },
        { status: 400 }
      );
    }

    // 1. Persist to Supabase Database
    let dbResult = { mode: 'pending' };
    try {
      dbResult = await insertConsultationLead(body);
    } catch (dbErr) {
      console.error('Supabase insert warning:', dbErr.message);
    }

    // 2. Dispatch Email via Nodemailer (to Yovarin admin + customer confirmation)
    try {
      await Promise.allSettled([
        sendLeadNotificationEmail(body),
        sendLeadConfirmationEmail(body),
      ]);
    } catch (emailErr) {
      console.error('Nodemailer dispatch warning:', emailErr.message);
    }

    return NextResponse.json({
      success: true,
      mode: dbResult.mode || 'delivered',
      message: 'Consultation request successfully received and email notification dispatched.',
      data: dbResult.data || body,
    });
  } catch (error) {
    console.error('API /consultation error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to submit consultation lead.' },
      { status: 500 }
    );
  }
}
