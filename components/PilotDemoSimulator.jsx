'use client';

import React, { useState } from 'react';
import TurnstileWidget from './TurnstileWidget';
import { 
  Bot, 
  Send, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Terminal,
} from 'lucide-react';

const SAMPLE_QUERIES = [
  {
    label: "Net Profit & Margins",
    query: "What was our gross and net margin for Q3, and how does it compare to budget?",
    category: "Financials"
  },
  {
    label: "Low Stock Alert",
    query: "Which inventory items are currently below safety reorder level in Central Warehouse?",
    category: "Inventory"
  },
  {
    label: "Roman Urdu Query",
    query: "Lahore factory mein pending work orders kitnay hain aur unka status kya hai?",
    category: "Operations"
  },
  {
    label: "Top Overdue Receivables",
    query: "List top 3 customers with overdue invoices exceeding 30 days.",
    category: "Sales"
  }
];

export default function PilotDemoSimulator({ onOpenConsultation }) {
  const [activeQuery, setActiveQuery] = useState(SAMPLE_QUERIES[0].query);
  const [customInput, setCustomInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [displayedResponse, setDisplayedResponse] = useState(null);
  const [turnstileToken, setTurnstileToken] = useState('');
  const [turnstileResetKey, setTurnstileResetKey] = useState(0);

  const handleSelectQuery = (queryText) => {
    setActiveQuery(queryText);
    setCustomInput(queryText);
  };

  const handleCustomSubmit = async (e) => {
    e.preventDefault();
    if (!customInput.trim() || !turnstileToken || isLoading) return;
    setActiveQuery(customInput.trim());
    setIsLoading(true);
    setDisplayedResponse(null);
    try {
      const response = await fetch('/api/pilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: customInput.trim(), turnstileToken }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Pilot could not complete the request.');
      }
      setDisplayedResponse(result);
    } catch (error) {
      setDisplayedResponse({ error: error.message || 'Pilot could not complete the request.' });
    } finally {
      setIsLoading(false);
      setTurnstileToken('');
      setTurnstileResetKey((key) => key + 1);
    }
  };

  return (
    <section id="pilot-demo" className="py-24 relative bg-transparent border-t border-gold-500/15">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gold-500/15 text-gold-800 dark:text-gold-300 border border-gold-500/30 font-mono">
            <Bot className="w-3.5 h-3.5 text-gold-600 dark:text-gold-400" /> Read-Only AI Assistant
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-slate-900 dark:text-white tracking-tight">
            Experience <span className="text-gradient-gold">Yovarin Pilot</span> in Real-Time
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm font-light">
          Ask a question against the configured ERPNext account. Pilot uses read-only ERP permissions and a configured AI service.
          </p>
        </div>

        {/* Simulator Container */}
        <div className="luxury-card shadow-2xl overflow-hidden">
          
          {/* Connection status */}
          <div className="px-6 py-4 bg-slate-900/50 dark:bg-slate-950/70 border-b border-gold-500/20 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gold-500/20 text-gold-600 dark:text-gold-400 flex items-center justify-center font-bold">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <span className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  Yovarin Pilot Enterprise Terminal
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                    READ ONLY
                  </span>
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                  ERP access is limited to the configured account’s permissions
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
              <ShieldCheck className="w-4 h-4 text-gold-600 dark:text-gold-400" />
              <span>Permission checked by ERPNext</span>
            </div>
          </div>

          <div className="p-6 space-y-6">
            
            {/* Sample Query Pills */}
            <div>
              <div className="text-xs font-medium text-slate-600 dark:text-slate-400 mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-gold-600 dark:text-gold-400" /> Choose a question or enter your own:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {SAMPLE_QUERIES.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectQuery(item.query)}
                    className={`text-left p-3 rounded-xl border text-xs transition-all flex items-start justify-between gap-2 ${
                      activeQuery === item.query
                        ? 'bg-gold-500/15 border-gold-500 text-gold-900 dark:text-gold-100 shadow-sm'
                        : 'luxury-card-subtle text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <div>
                      <div className="text-[10px] uppercase font-mono text-gold-700 dark:text-gold-400 font-semibold mb-0.5">
                        {item.category}
                      </div>
                      <div className="font-medium line-clamp-1">{item.query}</div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-gold-600 dark:text-gold-400 shrink-0 mt-2" />
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Input Bar */}
            <form onSubmit={handleCustomSubmit} className="relative flex items-center">
              <input
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder="Or ask anything (e.g. 'How many sales invoices are unpaid this month?')..."
                className="w-full bg-white/90 dark:bg-slate-950/80 border border-gold-500/30 focus:border-gold-500 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none pr-24 transition-colors"
              />
              <button
                type="submit"
                disabled={isLoading || !turnstileToken || !customInput.trim()}
                className="absolute right-2 btn-luxury-gold px-3.5 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 disabled:opacity-50"
              >
                {isLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                <span>Send</span>
              </button>
            </form>

            {/* Output Display Card */}
            <div className="rounded-xl border border-gold-500/25 bg-white/50 dark:bg-slate-950/80 p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gold-500/20 text-xs">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-gold-600 dark:text-gold-400" />
                  <span className="font-bold text-slate-900 dark:text-white">Pilot response</span>
                </div>
                <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  {displayedResponse ? 'ERPNext read-only query' : 'Ready for a question'}
                </span>
              </div>

              {isLoading ? (
                <div className="py-8 flex flex-col items-center justify-center space-y-2 text-slate-500 dark:text-slate-400">
                  <RefreshCw className="w-6 h-6 text-gold-600 dark:text-gold-400 animate-spin" />
                  <span className="text-xs font-mono">Querying ERPNext and analyzing results...</span>
                </div>
              ) : displayedResponse?.error ? (
                <p role="alert" className="text-sm text-rose-700 dark:text-rose-300">
                  {displayedResponse.error}
                </p>
              ) : displayedResponse ? (
                <>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {displayedResponse.answer}
                  </p>
                  <div className="pt-2 text-[10px] text-slate-500 font-mono border-t border-gold-500/15">
                    Read-only source: {displayedResponse.doctype} ({displayedResponse.recordCount} records)
                  </div>
                  <p className="text-xs text-amber-700 dark:text-amber-300">{displayedResponse.notice}</p>
                </>
              ) : (
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Submit a question to retrieve a permission-checked, read-only answer from ERPNext.
                </p>
              )}

            </div>

            <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 space-y-2">
              <p className="text-xs text-amber-800 dark:text-amber-200">
                Use requires a signed-in, approved account. Questions and the minimum ERP records needed to answer them are sent to the AI provider configured by the site administrator. Do not submit sensitive information unless your organization has approved that provider.
              </p>
              <TurnstileWidget
                key={turnstileResetKey}
                action="pilot"
                onVerify={setTurnstileToken}
              />
            </div>

            {/* Bottom Call to Action banner */}
            <div className="p-4 rounded-xl luxury-card-subtle border border-gold-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-700 dark:text-slate-300">
                <strong className="text-slate-900 dark:text-white block font-medium">Need Yovarin Pilot for your organization?</strong>
                Configure an approved ERPNext connection and AI provider for your team.
              </div>
              <button
                onClick={onOpenConsultation}
                className="btn-luxury-gold px-4 py-2 text-xs font-bold rounded-xl whitespace-nowrap"
              >
                Request Pilot Setup
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
