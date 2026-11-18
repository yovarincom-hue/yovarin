import { NextResponse } from 'next/server';
import { isAuthorizedAdmin } from '@/lib/cloudflare-access';
import { updateConsultationLeadStatus } from '@/lib/database';

const LEAD_STATUSES = new Set(['new', 'contacted', 'scheduled', 'closed']);

export async function PATCH(request, { params }) {
  try {
    if (!(await isAuthorizedAdmin(request))) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const body = await request.json().catch(() => null);
    if (!body || !LEAD_STATUSES.has(body.status)) {
      return NextResponse.json({ error: 'Invalid lead status.' }, { status: 400 });
    }

    const updated = await updateConsultationLeadStatus(params.id, body.status);
    if (!updated) {
      return NextResponse.json({ error: 'Consultation lead not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Admin lead update failed:', error);
    return NextResponse.json(
      { error: 'Could not update consultation lead.' },
      { status: 500 }
    );
  }
}
