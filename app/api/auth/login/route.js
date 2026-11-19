import { NextResponse } from 'next/server';
import { protectPublicSubmission } from '@/lib/public-api-protection';
import { createSession, findUserByEmail, verifyPassword, sessionCookie } from '@/lib/auth';

export async function POST(request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: 'Please provide your email and password.' }, { status: 400 });
    }

    const protectionError = await protectPublicSubmission(request, body, 'auth-login');
    if (protectionError) {
      return NextResponse.json({ error: protectionError.error }, { status: protectionError.status });
    }

    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const password = typeof body.password === 'string' ? body.password : '';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !password || password.length > 128) {
      return NextResponse.json({ error: 'Please provide a valid email and password.' }, { status: 400 });
    }

    const user = await findUserByEmail(email);
    if (!user || !(await verifyPassword(password, user.password_hash))) {
      return NextResponse.json({ error: 'The email or password is incorrect.' }, { status: 401 });
    }

    const token = await createSession(user.id);
    const response = NextResponse.json({
      success: true,
      user: { id: user.id, name: user.name, email: user.email },
    });
    response.headers.set('Set-Cookie', sessionCookie(token));
    response.headers.set('Cache-Control', 'no-store');
    return response;
  } catch (error) {
    console.error('API /auth/login error:', error);
    return NextResponse.json({ error: 'Sign in is temporarily unavailable. Please try again later.' }, { status: 500 });
  }
}
