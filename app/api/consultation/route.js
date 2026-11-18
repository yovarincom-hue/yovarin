import { NextResponse } from 'next/server';
import { insertConsultationLead } from '@/lib/database';
import { sendLeadNotificationEmail, sendLeadConfirmationEmail } from '@/lib/mailer';
import { protectPublicSubmission } from '@/lib/public-api-protection';

export async function POST(request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        { error: 'Please provide valid consultation details.' },
        { status: 400 }
      );
    }

    const protectionError = await protectPublicSubmission(request, body, 'consultation');
    if (protectionError) {
      return NextResponse.json(
        { error: protectionError.error },
        { status: protectionError.status }
      );
    }

    if (
      !body ||
      typeof body.name !== 'string' ||
      typeof body.email !== 'string' ||
      typeof body.phone !== 'string' ||
      typeof body.company !== 'string' ||
      !body.name.trim() ||
      !body.email.trim() ||
      !body.phone.trim() ||
      !body.company.trim() ||
      body.name.length > 200 ||
      body.email.length > 320 ||
      body.phone.length > 60 ||
      body.company.length > 200 ||
      (body.notes != null && (typeof body.notes !== 'string' || body.notes.length > 5000)) ||
      (body.modules != null &&
        (!Array.isArray(body.modules) ||
          body.modules.length > 20 ||
          body.modules.some((module) => typeof module !== 'string' || module.length > 80)))
    ) {
      return NextResponse.json(
        { error: 'Please provide valid consultation details.' },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email.trim())) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    const dbResult = await insertConsultationLead(body);
    const emailResults = await Promise.allSettled([
      sendLeadNotificationEmail(body),
      sendLeadConfirmationEmail(body),
    ]);

    emailResults.forEach((result) => {
      if (result.status === 'rejected') {
        console.error('Consultation email dispatch failed:', result.reason);
      }
    });

    return NextResponse.json({
      success: true,
      mode: dbResult.mode,
      message: 'Consultation request received.',
      data: { id: dbResult.data.id },
    });
  } catch (error) {
    console.error('API /consultation error:', error);
    return NextResponse.json(
      { error: 'Failed to submit consultation lead. Please try again later.' },
      { status: 500 }
    );
  }
}
