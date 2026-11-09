import { NextResponse } from 'next/server';
import { insertNewsletterSubscriber } from '@/lib/supabase';
import { sendNewsletterNotification } from '@/lib/mailer';

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    // 1. Insert into Supabase
    let dbResult = { mode: 'pending' };
    try {
      dbResult = await insertNewsletterSubscriber(email);
    } catch (dbErr) {
      console.error('Supabase newsletter warning:', dbErr.message);
    }

    // 2. Dispatch Email notification via Nodemailer
    try {
      await sendNewsletterNotification(email);
    } catch (emailErr) {
      console.error('Nodemailer newsletter warning:', emailErr.message);
    }

    return NextResponse.json({
      success: true,
      mode: dbResult.mode || 'delivered',
      message: 'Successfully subscribed to Yovarin Tech Dispatch.',
    });
  } catch (error) {
    console.error('API /newsletter error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to subscribe.' },
      { status: 500 }
    );
  }
}
