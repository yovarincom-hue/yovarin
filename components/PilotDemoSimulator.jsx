'use client';

import React, { useState } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  BarChart2, 
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Terminal,
  HelpCircle
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

const MOCK_RESPONSES = {
  "What was our gross and net margin for Q3, and how does it compare to budget?": {
    title: "Q3 Financial Performance Summary",
    status: "Calculated from GL & Sales Invoices",
    kpis: [
      { label: "Gross Margin", val: "38.6%", trend: "+2.4% vs Q2", positive: true },
      { label: "Net Profit", val: "$184,200", trend: "+14.1% vs budget", positive: true },
      { label: "Operating Exp", val: "$82,900", trend: "Under budget by $6.2k", positive: true }
    ],
    details: "Revenue reached $478,000 against a target of $440,000. Key driver was high-spec automotive cable orders in July and September. Operating expenses stayed within threshold due to optimized utility contracts.",
    doctype: "GL Entry, Sales Invoice, Purchase Invoice"
  },
  "Which inventory items are currently below safety reorder level in Central Warehouse?": {
    title: "Inventory Alert: 3 Items Below Reorder Point",
    status: "Central Warehouse (Bin: WH-C-01)",
    table: [
      { item: "COP-ROD-8MM (Copper Rod 8mm)", current: "420 kg", min: "1,200 kg", urgency: "Critical" },
      { item: "PVC-RESIN-GR70 (Insulation Compound)", current: "18 bags", min: "50 bags", urgency: "High" },
      { item: "DRUM-WOOD-120 (Standard Cable Spool)", current: "12 units", min: "40 units", urgency: "Medium" }
    ],
    details: "Automatic Material Request draft #MR-2026-089 has been prepared for Procurement review.",
    doctype: "Bin, Item, Stock Ledger Entry"
  },
  "Lahore factory mein pending work orders kitnay hain aur unka status kya hai?": {
    title: "Lahore Plant Active Production Orders",
    status: "Language: Roman Urdu / Urdu NLP Engine",
    kpis: [
      { label: "Total Pending", val: "14 Orders", trend: "Normal capacity", positive: true },
      { label: "In Assembly", val: "8 Lines Active", trend: "Shift 1 running", positive: true },
      { label: "Quality Check", val: "4 Batches", trend: "Inspection pending", positive: false }
    ],
    details: "Sab se bara order 'CABLE-HV-400' line #2 par chal raha hai aur 85% mukammal ho chuka hai. Raw material copper available hai.",
    doctype: "Work Order, Job Card, BOM"
  },
  "List top 3 customers with overdue invoices exceeding 30 days.": {
    title: "Aging Receivables Alert (>30 Days Overdue)",
    status: "Total Overdue: $78,400 across 3 accounts",
    table: [
      { item: "Metro Infrastructure Ltd", current: "$41,200", min: "48 days overdue", urgency: "Critical" },
      { item: "Al-Falah Energy Contractors", current: "$22,800", min: "39 days overdue", urgency: "High" },
      { item: "Horizon Telecom Logistics", current: "$14,400", min: "33 days overdue", urgency: "Medium" }
    ],
    details: "Payment reminders have been auto-sent via email. Assigned account executives: Bilal Qureshi & Tariq Mehmood.",
    doctype: "Sales Invoice, Payment Entry"
  }
};

export default function PilotDemoSimulator({ onOpenConsultation }) {
  const [activeQuery, setActiveQuery] = useState(SAMPLE_QUERIES[0].query);
  const [customInput, setCustomInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [displayedResponse, setDisplayedResponse] = useState(MOCK_RESPONSES[SAMPLE_QUERIES[0].query]);

  const handleSelectQuery = (queryText) => {
    setActiveQuery(queryText);
    setCustomInput('');
    setIsLoading(true);
    setTimeout(() => {
      setDisplayedResponse(MOCK_RESPONSES[queryText] || {
        title: "ERP Intelligence Query Result",
        status: "Read-Only Analysis Completed",
        details: `Live query analyzed across ERPNext schema for: "${queryText}". In your deployed system, Yovarin Pilot cross-checks real-time DocTypes and generates structured reports adhering to user-level permissions.`,
        doctype: "ERPNext Frappe Dynamic Schema"
      });
      setIsLoading(false);
    }, 600);
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!customInput.trim()) return;
    setActiveQuery(customInput);
    setIsLoading(true);
    setTimeout(() => {
      setDisplayedResponse({
        title: "ERP Intelligence Analysis",
        status: `Custom Query Analyzed: "${customInput}"`,
        kpis: [
          { label: "Query Execution", val: "38 ms", trend: "Encrypted memory", positive: true },
          { label: "Data Safety", val: "Read-Only", trend: "Zero DB write rights", positive: true }
        ],
        details: `Yovarin Pilot parsed your query: "${customInput}". It maps natural terminology to ERPNext DocTypes, applies your role permissions, and returns verified operational numbers without risk of data corruption.`,
        doctype: "DocType Mapping: Sales / Stock / Accounts"
      });
      setIsLoading(false);
    }, 700);
  };

  return (
    <section id="pilot-demo" className="py-24 relative bg-transparent border-t border-gold-500/15">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gold-500/15 text-gold-800 dark:text-gold-300 border border-gold-500/30 font-mono">
            <Bot className="w-3.5 h-3.5 text-gold-600 dark:text-gold-400" /> Interactive Sandbox
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-slate-900 dark:text-white tracking-tight">
            Experience <span className="text-gradient-gold">Yovarin Pilot</span> in Real-Time
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm font-light">
            Select a sample enterprise prompt below or type your own to test how Pilot interprets operational inquiries without exposing raw databases.
          </p>
        </div>

        {/* Simulator Container */}
        <div className="luxury-card shadow-2xl overflow-hidden">
          
          {/* Top simulated bar */}
          <div className="px-6 py-4 bg-slate-900/50 dark:bg-slate-950/70 border-b border-gold-500/20 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gold-500/20 text-gold-600 dark:text-gold-400 flex items-center justify-center font-bold">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <span className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  Yovarin Pilot Enterprise Terminal
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                    ONLINE
                  </span>
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                  Schema: ERPNext v15 • Role: Chief Executive Officer (Read-Only)
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
              <ShieldCheck className="w-4 h-4 text-gold-600 dark:text-gold-400" />
              <span>Permission Protected</span>
            </div>
          </div>

          <div className="p-6 space-y-6">
            
            {/* Sample Query Pills */}
            <div>
              <div className="text-xs font-medium text-slate-600 dark:text-slate-400 mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-gold-600 dark:text-gold-400" /> Click a prompt to test live execution:
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
                disabled={isLoading}
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
                  <span className="font-bold text-slate-900 dark:text-white">{displayedResponse?.title}</span>
                </div>
                <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">{displayedResponse?.status}</span>
              </div>

              {isLoading ? (
                <div className="py-8 flex flex-col items-center justify-center space-y-2 text-slate-500 dark:text-slate-400">
                  <RefreshCw className="w-6 h-6 text-gold-600 dark:text-gold-400 animate-spin" />
                  <span className="text-xs font-mono">Parsing Frappe DocTypes &amp; querying read-only replica...</span>
                </div>
              ) : (
                <>
                  {/* KPI Cards if available */}
                  {displayedResponse?.kpis && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {displayedResponse.kpis.map((k, i) => (
                        <div key={i} className="p-3 rounded-xl luxury-card-subtle">
                          <div className="text-[11px] text-slate-500 dark:text-slate-400">{k.label}</div>
                          <div className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">{k.val}</div>
                          <div className={`text-[10px] font-medium mt-0.5 ${k.positive ? 'text-gold-700 dark:text-gold-400' : 'text-amber-600 dark:text-amber-400'}`}>
                            {k.trend}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Table if available */}
                  {displayedResponse?.table && (
                    <div className="rounded-xl border border-gold-500/20 overflow-hidden text-xs">
                      <table className="w-full text-left">
                        <thead className="bg-gold-500/10 text-slate-600 dark:text-slate-400 text-[11px]">
                          <tr>
                            <th className="p-2.5 font-medium">Item / Account</th>
                            <th className="p-2.5 font-medium">Metric</th>
                            <th className="p-2.5 font-medium">Threshold / Aging</th>
                            <th className="p-2.5 font-medium text-right">Priority</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gold-500/15 bg-white/40 dark:bg-slate-950/60 font-mono text-[11px] text-slate-700 dark:text-slate-300">
                          {displayedResponse.table.map((row, idx) => (
                            <tr key={idx}>
                              <td className="p-2.5 text-slate-900 dark:text-white font-medium">{row.item}</td>
                              <td className="p-2.5 text-gold-700 dark:text-gold-400">{row.current}</td>
                              <td className="p-2.5 text-slate-500 dark:text-slate-400">{row.min}</td>
                              <td className="p-2.5 text-right">
                                <span className={`px-2 py-0.5 rounded text-[9px] uppercase font-bold ${
                                  row.urgency === 'Critical' 
                                    ? 'bg-rose-500/20 text-rose-600 dark:text-rose-300 border border-rose-500/30'
                                    : row.urgency === 'High'
                                    ? 'bg-amber-500/20 text-amber-600 dark:text-amber-300 border border-amber-500/30'
                                    : 'bg-slate-200/60 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300'
                                }`}>
                                  {row.urgency}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Text details */}
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {displayedResponse?.details}
                  </p>

                  {/* Footer metadata */}
                  <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-500 font-mono border-t border-gold-500/15">
                    <span>Source DocTypes: {displayedResponse?.doctype}</span>
                    <span className="text-gold-700 dark:text-gold-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Zero LLM training on enterprise data
                    </span>
                  </div>
                </>
              )}

            </div>

            {/* Bottom Call to Action banner */}
            <div className="p-4 rounded-xl luxury-card-subtle border border-gold-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-700 dark:text-slate-300">
                <strong className="text-slate-900 dark:text-white block font-medium">Want Yovarin Pilot connected to your ERPNext instance?</strong>
                Deployment takes less than 48 hours with zero interruption to your live database.
              </div>
              <button
                onClick={onOpenConsultation}
                className="btn-luxury-gold px-4 py-2 text-xs font-bold rounded-xl whitespace-nowrap"
              >
                Request Pilot Integration
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
