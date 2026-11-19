import { NextResponse } from 'next/server';
import { completePasswordReset, hashPassword, inspectOtp, rateLimitAuthRequest } from '@/lib/auth';

export async function POST(request) {
  try {
    const limitError = await rateLimitAuthRequest(request, 'auth-reset-password');
    if (limitError) {
      return NextResponse.json({ error: limitError.error }, { status: limitError.status });
    }

    const body = await request.json().catch(() => null);
    const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';
    const code = typeof body?.code === 'string' ? body.code.trim() : '';
    const password = typeof body?.password === 'string' ? body.password : '';
    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      !/^\d{6}$/.test(code) ||
      password.length < 12 ||
      password.length > 128
    ) {
      return NextResponse.json(
        { error: 'Enter a valid email, six-digit code, and password of at least 12 characters.' },
        { status: 400 }
      );
    }

    const challenge = await inspectOtp(email, 'reset', code);
    if (!challenge) {
      return NextResponse.json(
        { error: 'That code is invalid or expired. Request a new code and try again.' },
        { status: 400 }
      );
    }
    if (!(await completePasswordReset(email, challenge.code_hash, await hashPassword(password)))) {
      return NextResponse.json({ error: 'We could not update that account password.' }, { status: 400 });
    }
    return NextResponse.json({ success: true, message: 'Your password has been updated. You can sign in now.' });
  } catch (error) {
    console.error('API /auth/reset-password error:', error);
    return NextResponse.json({ error: 'We could not reset your password. Please try again later.' }, { status: 500 });
  }
}
