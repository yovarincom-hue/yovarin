import { NextResponse } from 'next/server';
import { insertNewsletterSubscriber } from '@/lib/database';
import { sendNewsletterNotification } from '@/lib/mailer';
import { protectPublicSubmission } from '@/lib/public-api-protection';

export async function POST(request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    const protectionError = await protectPublicSubmission(request, body, 'newsletter');
    if (protectionError) {
      return NextResponse.json(
        { error: protectionError.error },
        { status: protectionError.status }
      );
    }

    const email = body?.email;

    if (
      typeof email !== 'string' ||
      email.length > 320 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    ) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    const dbResult = await insertNewsletterSubscriber(email);

    try {
      await sendNewsletterNotification(email);
    } catch (emailErr) {
      console.error('Newsletter email dispatch failed:', emailErr);
    }

    return NextResponse.json({
      success: true,
      mode: dbResult.mode,
      alreadySubscribed: dbResult.alreadySubscribed,
      message: 'Successfully subscribed to Yovarin Tech Dispatch.',
    });
  } catch (error) {
    console.error('API /newsletter error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again later.' },
      { status: 500 }
    );
  }
}
