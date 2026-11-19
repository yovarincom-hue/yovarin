import { NextResponse } from 'next/server';
import { completeRegistration, inspectOtp, rateLimitAuthRequest } from '@/lib/auth';

export async function POST(request) {
  try {
    const limitError = await rateLimitAuthRequest(request, 'auth-verify-email');
    if (limitError) {
      return NextResponse.json({ error: limitError.error }, { status: limitError.status });
    }

    const body = await request.json().catch(() => null);
    const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';
    const code = typeof body?.code === 'string' ? body.code.trim() : '';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !/^\d{6}$/.test(code)) {
      return NextResponse.json({ error: 'Enter your email and the six-digit verification code.' }, { status: 400 });
    }

    const challenge = await inspectOtp(email, 'verify', code);
    if (!challenge || !challenge.name || !challenge.password_hash) {
      return NextResponse.json(
        { error: 'That code is invalid or expired. Request a new code and try again.' },
        { status: 400 }
      );
    }
    if (!(await completeRegistration(email, challenge.code_hash))) {
      return NextResponse.json(
        { error: 'That code is invalid or expired. Request a new code and try again.' },
        { status: 400 }
      );
    }
    return NextResponse.json({ success: true, message: 'Your email is verified. You can now sign in.' });
  } catch (error) {
    console.error('API /auth/verify-email error:', error);
    return NextResponse.json({ error: 'We could not verify your email. Please try again later.' }, { status: 500 });
  }
}
