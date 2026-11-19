import { NextResponse } from 'next/server';
import { protectPublicSubmission } from '@/lib/public-api-protection';
import { hashPassword, issueOtp, findUserByEmail, removeOtp } from '@/lib/auth';
import { sendAuthenticationCode } from '@/lib/mailer';

export async function POST(request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: 'Please provide valid account details.' }, { status: 400 });
    }

    const protectionError = await protectPublicSubmission(request, body, 'auth-register');
    if (protectionError) {
      return NextResponse.json({ error: protectionError.error }, { status: protectionError.status });
    }

    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const password = typeof body.password === 'string' ? body.password : '';
    if (
      !name ||
      name.length > 120 ||
      email.length > 320 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      password.length < 12 ||
      password.length > 128
    ) {
      return NextResponse.json(
        { error: 'Enter a valid name and email, and a password of at least 12 characters.' },
        { status: 400 }
      );
    }
    if (await findUserByEmail(email)) {
      return NextResponse.json(
        { error: 'An account already exists for this email. Please sign in or reset your password.' },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(password);
    const code = await issueOtp({ email, purpose: 'verify', name, passwordHash });
    try {
      await sendAuthenticationCode(email, code, 'verify');
    } catch (error) {
      await removeOtp(email, 'verify');
      throw error;
    }
    return NextResponse.json({ success: true, message: 'A verification code has been sent to your email.' });
  } catch (error) {
    console.error('API /auth/register error:', error);
    return NextResponse.json(
      { error: 'We could not start registration. Please try again later.' },
      { status: 500 }
    );
  }
}
