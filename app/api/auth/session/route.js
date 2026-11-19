import { NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const user = await getSessionUser(request);
    return NextResponse.json({ user: user || null }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    console.error('API /auth/session error:', error);
    return NextResponse.json({ error: 'Could not load your account.' }, { status: 500 });
  }
}
