import { NextResponse } from 'next/server';
import { checkDatabaseConnection } from '@/lib/database';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await checkDatabaseConnection();
    return NextResponse.json({ connected: true });
  } catch (error) {
    console.error('Database health check failed:', error);
    return NextResponse.json(
      { connected: false, error: 'Database is unavailable.' },
      { status: 503 }
    );
  }
}
