import { NextResponse } from 'next/server';
import { protectPublicSubmission } from '@/lib/public-api-protection';
import { findUserByEmail, issueOtp, removeOtp } from '@/lib/auth';
import { sendAuthenticationCode } from '@/lib/mailer';

export async function POST(request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: 'Please enter the email address for your account.' }, { status: 400 });
    }

    const protectionError = await protectPublicSubmission(request, body, 'auth-forgot-password');
    if (protectionError) {
      return NextResponse.json({ error: protectionError.error }, { status: protectionError.status });
    }

    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 320) {
      return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
    }

    const user = await findUserByEmail(email);
    if (user) {
      const code = await issueOtp({ email, purpose: 'reset' });
      try {
        await sendAuthenticationCode(email, code, 'reset');
      } catch (error) {
        await removeOtp(email, 'reset');
        throw error;
      }
    }
    return NextResponse.json({
      success: true,
      message: 'If an account exists for that email, a password reset code has been sent.',
    });
  } catch (error) {
    console.error('API /auth/forgot-password error:', error);
    return NextResponse.json({ error: 'We could not send a reset code. Please try again later.' }, { status: 500 });
  }
}
