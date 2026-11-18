import { NextResponse } from 'next/server';
import { isAuthorizedAdmin } from '@/lib/cloudflare-access';
import { listConsultationLeads } from '@/lib/database';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    if (!(await isAuthorizedAdmin(request))) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const url = new URL(request.url);
    const limit = Math.min(Math.max(Number(url.searchParams.get('limit')) || 50, 1), 100);
    const page = Math.max(Number(url.searchParams.get('page')) || 1, 1);
    const leads = await listConsultationLeads(limit, (page - 1) * limit);

    return NextResponse.json({ leads, page, limit });
  } catch (error) {
    console.error('Admin leads request failed:', error);
    return NextResponse.json(
      { error: 'Could not load consultation leads.' },
      { status: 500 }
    );
  }
}
