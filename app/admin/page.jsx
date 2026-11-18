'use client';

import { useEffect, useState } from 'react';

const STATUS_OPTIONS = ['new', 'contacted', 'scheduled', 'closed'];

export default function AdminPage() {
  const [leads, setLeads] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [leadsResponse, subscribersResponse] = await Promise.all([
          fetch('/api/admin/leads'),
          fetch('/api/admin/newsletter'),
        ]);
        const [leadsData, subscribersData] = await Promise.all([
          leadsResponse.json(),
          subscribersResponse.json(),
        ]);

        if (!leadsResponse.ok || !subscribersResponse.ok) {
          throw new Error(
            leadsData.error || subscribersData.error || 'Could not load the dashboard.'
          );
        }

        setLeads(leadsData.leads);
        setSubscribers(subscribersData.subscribers);
      } catch (loadError) {
        setError(loadError.message || 'Could not load the dashboard.');
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  async function updateStatus(id, status) {
    setError('');
    try {
      const response = await fetch(`/api/admin/leads/${encodeURIComponent(id)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Could not update lead status.');
      }
      setLeads((current) =>
        current.map((lead) => (lead.id === id ? { ...lead, status } : lead))
      );
    } catch (updateError) {
      setError(updateError.message || 'Could not update lead status.');
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6 sm:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-gold-400">Yovarin</p>
            <h1 className="text-3xl font-semibold">Private admin dashboard</h1>
          </div>
          <a href="/" className="text-sm text-slate-300 hover:text-white">
            Back to website
          </a>
        </header>

        {error && (
          <p className="rounded-lg border border-red-800 bg-red-950/60 p-4 text-sm text-red-200" role="alert">
            {error}
          </p>
        )}

        {loading ? (
          <p className="text-slate-400">Loading dashboard…</p>
        ) : !error ? (
          <>
            <section className="space-y-4">
              <h2 className="text-xl font-semibold">Consultation leads</h2>
              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-900 text-slate-300">
                    <tr>
                      <th className="p-3">Contact</th>
                      <th className="p-3">Company</th>
                      <th className="p-3">Request</th>
                      <th className="p-3">Received</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.map((lead) => (
                      <tr key={lead.id} className="border-t border-slate-800 align-top">
                        <td className="p-3">
                          <div>{lead.full_name}</div>
                          <a className="text-gold-300" href={`mailto:${lead.work_email}`}>
                            {lead.work_email}
                          </a>
                          <div className="text-slate-400">{lead.phone_number}</div>
                        </td>
                        <td className="p-3">{lead.company_name}</td>
                        <td className="p-3">
                          <div>{lead.service_required}</div>
                          <div className="text-slate-400">{lead.industry}</div>
                          {lead.notes && <p className="mt-1 max-w-sm whitespace-pre-wrap text-slate-400">{lead.notes}</p>}
                        </td>
                        <td className="p-3 whitespace-nowrap">
                          {new Date(lead.created_at).toLocaleString()}
                        </td>
                        <td className="p-3">
                          <select
                            value={lead.status}
                            onChange={(event) => updateStatus(lead.id, event.target.value)}
                            className="rounded-md border border-slate-700 bg-slate-900 p-2"
                            aria-label={`Status for ${lead.full_name}`}
                          >
                            {STATUS_OPTIONS.map((status) => (
                              <option key={status} value={status}>{status}</option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    ))}
                    {leads.length === 0 && (
                      <tr><td className="p-4 text-slate-400" colSpan={5}>No consultation leads yet.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">Newsletter subscribers</h2>
              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-900 text-slate-300">
                    <tr>
                      <th className="p-3">Email</th>
                      <th className="p-3">Subscribed</th>
                      <th className="p-3">Active</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscribers.map((subscriber) => (
                      <tr key={subscriber.email} className="border-t border-slate-800">
                        <td className="p-3">{subscriber.email}</td>
                        <td className="p-3">{new Date(subscriber.subscribed_at).toLocaleString()}</td>
                        <td className="p-3">{subscriber.is_active ? 'Yes' : 'No'}</td>
                      </tr>
                    ))}
                    {subscribers.length === 0 && (
                      <tr><td className="p-4 text-slate-400" colSpan={3}>No newsletter subscribers yet.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        ) : null}
      </div>
    </main>
  );
}
