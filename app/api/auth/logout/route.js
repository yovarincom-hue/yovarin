import { NextResponse } from 'next/server';
import { deleteSession, sessionCookie } from '@/lib/auth';

export async function POST(request) {
  try {
    await deleteSession(request);
    const response = NextResponse.json({ success: true });
    response.headers.set('Set-Cookie', sessionCookie('', 0));
    response.headers.set('Cache-Control', 'no-store');
    return response;
  } catch (error) {
    console.error('API /auth/logout error:', error);
    return NextResponse.json({ error: 'Sign out failed. Please try again.' }, { status: 500 });
  }
}
