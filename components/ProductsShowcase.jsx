'use client';

import React, { useState } from 'react';
import { 
  Layers, 
  Bot, 
  Sparkles, 
  Check, 
  ExternalLink, 
  Palette, 
  Search, 
  Sliders, 
  ShieldAlert, 
  Cpu, 
  Database, 
  Languages, 
  ArrowRight,
  Terminal,
  LayoutGrid
} from 'lucide-react';

export default function ProductsShowcase({ onOpenPilotDemo, onOpenConsultation }) {
  const [activeTab, setActiveTab] = useState('desk');

  return (
    <section id="products" className="py-24 relative border-t border-slate-800/80 bg-slate-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-500/10 text-brand-400 border border-brand-500/20">
            <Layers className="w-3.5 h-3.5" /> Proprietary Products
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Engineered Specifically for the <span className="text-brand-400">ERPNext & Frappe</span> Ecosystem
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            We don’t just implement standard software. We build specialized, high-performance UI layers and enterprise AI agents that elevate ERPNext into a modern SaaS powerhouse.
          </p>

          {/* Product Selector Tabs */}
          <div className="pt-4 flex justify-center">
            <div className="p-1 rounded-xl bg-slate-900 border border-slate-800 flex gap-2">
              <button
                onClick={() => setActiveTab('desk')}
                className={`px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                  activeTab === 'desk'
                    ? 'bg-brand-500 text-slate-950 shadow-md shadow-brand-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
                <span>Yovarin Desk</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-950/20 uppercase font-mono">Theme</span>
              </button>
              <button
                onClick={() => setActiveTab('pilot')}
                className={`px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                  activeTab === 'pilot'
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Bot className="w-4 h-4" />
                <span>Yovarin Pilot</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-950/20 uppercase font-mono">AI Agent</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tab Content: Yovarin Desk */}
        {activeTab === 'desk' && (
          <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-300">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-400">
                <Palette className="w-4 h-4" /> Modern White-Label UI Theme
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                Transform ERPNext into a Sleek, Modern Enterprise SaaS Platform
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Standard ERP interfaces can feel clunky, crowded, and dated. <strong className="text-white">Yovarin Desk</strong> replaces the default ERPNext view with a refined, high-contrast, distraction-free interface built for rapid operational workflows.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <div className="p-1 rounded bg-brand-500/20 text-brand-400 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-white text-sm font-medium">Customizable Workspace Layouts:</strong>
                    <p className="text-xs text-slate-400 mt-0.5">Personalize cards, KPI widgets, shortcuts, and document queues per role (CEO, Accountant, Plant Manager).</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1 rounded bg-brand-500/20 text-brand-400 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-white text-sm font-medium">Command Palette (Ctrl + K):</strong>
                    <p className="text-xs text-slate-400 mt-0.5">Sub-second navigation across any DocType, purchase order, customer record, or system settings.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1 rounded bg-brand-500/20 text-brand-400 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-white text-sm font-medium">Dark Mode & Theme Studio:</strong>
                    <p className="text-xs text-slate-400 mt-0.5">Full native dark mode designed to reduce eye strain during multi-hour shifts in factory and accounting offices.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1 rounded bg-brand-500/20 text-brand-400 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-white text-sm font-medium">White-Label Branding:</strong>
                    <p className="text-xs text-slate-400 mt-0.5">Seamlessly embed your company logo, typography, domain, and colors for external vendor & customer portals.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <a
                  href="#theme-studio"
                  className="px-5 py-2.5 text-xs font-semibold text-slate-950 bg-brand-400 hover:bg-brand-300 rounded-lg transition-colors flex items-center gap-2"
                >
                  <Palette className="w-4 h-4" /> Try Live Theme Studio
                </a>
                <button
                  onClick={onOpenConsultation}
                  className="px-5 py-2.5 text-xs font-semibold text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors"
                >
                  Request Desk Installation
                </button>
              </div>
            </div>

            {/* Visual Preview Card */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-3 shadow-2xl relative">
                <div className="bg-slate-950 rounded-xl border border-slate-800/80 p-5 space-y-4">
                  {/* Mock Navbar in Desk */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-brand-500 flex items-center justify-center text-[10px] font-bold text-slate-950">
                        YD
                      </div>
                      <span className="text-xs font-bold text-white">Yovarin Desk Studio</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 bg-slate-900 rounded-lg border border-slate-800 text-[11px] text-slate-400">
                      <Search className="w-3.5 h-3.5 text-slate-500" />
                      <span>Search or type command...</span>
                      <kbd className="px-1.5 py-0.5 text-[9px] bg-slate-800 text-slate-300 rounded font-mono">⌘K</kbd>
                    </div>
                  </div>

                  {/* Modules grid */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 rounded-lg bg-slate-900/90 border border-brand-500/30">
                      <div className="text-[10px] uppercase font-bold text-brand-400">Accounting</div>
                      <div className="text-sm font-semibold text-white mt-1">$1.42M</div>
                      <div className="text-[10px] text-slate-400">General Ledger live</div>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800">
                      <div className="text-[10px] uppercase font-bold text-cyan-400">Manufacturing</div>
                      <div className="text-sm font-semibold text-white mt-1">42 BOMs</div>
                      <div className="text-[10px] text-slate-400">Active routing</div>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800">
                      <div className="text-[10px] uppercase font-bold text-emerald-400">Stock & Batch</div>
                      <div className="text-sm font-semibold text-white mt-1">3 Warehouses</div>
                      <div className="text-[10px] text-slate-400">FIFO calibrated</div>
                    </div>
                  </div>

                  {/* High Contrast Data Table */}
                  <div className="rounded-lg border border-slate-800 bg-slate-900/40 p-3 space-y-2 text-xs">
                    <div className="font-semibold text-slate-300 text-[11px] flex items-center justify-between">
                      <span>Recent Sales Orders (Frappe DocType: Sales Order)</span>
                      <span className="text-[10px] font-mono text-brand-400">Filter: Active</span>
                    </div>
                    <div className="space-y-1.5 font-mono text-[11px]">
                      <div className="p-2 rounded bg-slate-950 border border-slate-800 flex justify-between items-center">
                        <span className="text-slate-200">SO-2026-00412 — Apex Retailers</span>
                        <span className="text-brand-400 font-semibold">$34,200 (Paid)</span>
                      </div>
                      <div className="p-2 rounded bg-slate-950 border border-slate-800 flex justify-between items-center">
                        <span className="text-slate-200">SO-2026-00413 — Industrial Wire Corp</span>
                        <span className="text-cyan-400 font-semibold">$118,500 (Production)</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-400 italic text-center pt-1">
                    Compatible with Frappe v14 & v15 • Frappe Cloud & Self-Hosted
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content: Yovarin Pilot */}
        {activeTab === 'pilot' && (
          <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-300">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400">
                <Bot className="w-4 h-4" /> Secure Read-Only AI Assistant for ERPNext
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                Query Live Business Data in Natural Language — Zero Security Risk
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Business owners and executives shouldn’t have to learn SQL or navigate 15 ERP nested menus to answer simple questions. <strong className="text-white">Yovarin Pilot</strong> lets you chat with your live business data in English, Roman Urdu, Urdu, or Arabic.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <div className="p-1 rounded bg-cyan-500/20 text-cyan-400 mt-0.5">
                    <ShieldAlert className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-white text-sm font-medium">Read-Only Safety Guarantee:</strong>
                    <p className="text-xs text-slate-400 mt-0.5">Pilot never modifies records or executes state writes. Your database integrity is 100% safeguarded.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1 rounded bg-cyan-500/20 text-cyan-400 mt-0.5">
                    <Cpu className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-white text-sm font-medium">Role-Based Permission Inheritance:</strong>
                    <p className="text-xs text-slate-400 mt-0.5">Pilot strictly enforces ERPNext User Roles. A warehouse supervisor cannot see company payroll numbers.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1 rounded bg-cyan-500/20 text-cyan-400 mt-0.5">
                    <Languages className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-white text-sm font-medium">Multilingual Dialect Support:</strong>
                    <p className="text-xs text-slate-400 mt-0.5">Ask questions in Roman Urdu (&quot;Lahore warehouse mein cable ka kitna stock bacha hai?&quot;) or standard Urdu/English/Arabic.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1 rounded bg-cyan-500/20 text-cyan-400 mt-0.5">
                    <Database className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-white text-sm font-medium">Self-Hosted or Private Cloud LLM:</strong>
                    <p className="text-xs text-slate-400 mt-0.5">Your proprietary operational data never trains external public models. Runs locally or via encrypted enterprise private endpoints.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <button
                  onClick={onOpenPilotDemo}
                  className="px-5 py-2.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors flex items-center gap-2"
                >
                  <Bot className="w-4 h-4" /> Try Interactive AI Pilot Demo
                </button>
                <button
                  onClick={onOpenConsultation}
                  className="px-5 py-2.5 text-xs font-semibold text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors"
                >
                  Deploy Pilot in Your ERP
                </button>
              </div>
            </div>

            {/* Visual Chat Mockup */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl border border-cyan-500/30 bg-slate-900/90 p-4 shadow-2xl relative">
                <div className="bg-slate-950 rounded-xl border border-slate-800 p-5 space-y-4">
                  
                  {/* Chat header */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-white">Yovarin Pilot Assistant</div>
                        <div className="text-[10px] text-cyan-400 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span> Connected to live ERP replica
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                      Read-Only Mode
                    </span>
                  </div>

                  {/* Messages */}
                  <div className="space-y-3 text-xs">
                    {/* User Prompt */}
                    <div className="flex justify-end">
                      <div className="bg-cyan-950/80 border border-cyan-500/30 text-cyan-100 p-3 rounded-xl max-w-sm">
                        &quot;Show me top 3 overdue receivables and which sales manager is assigned to them.&quot;
                      </div>
                    </div>

                    {/* AI Response */}
                    <div className="flex justify-start">
                      <div className="bg-slate-900 border border-slate-800 text-slate-200 p-3.5 rounded-xl max-w-md space-y-2">
                        <div className="flex items-center gap-1.5 text-cyan-400 font-semibold text-[11px]">
                          <Sparkles className="w-3.5 h-3.5" /> Found 3 overdue invoices (Total: $84,300):
                        </div>
                        <div className="space-y-1 font-mono text-[11px]">
                          <div className="p-1.5 rounded bg-slate-950 border border-slate-800/80 flex justify-between">
                            <span>1. Metro Power Ltd ($42,000)</span>
                            <span className="text-amber-400">Manager: Bilal Q.</span>
                          </div>
                          <div className="p-1.5 rounded bg-slate-950 border border-slate-800/80 flex justify-between">
                            <span>2. Crescent Agri ($24,500)</span>
                            <span className="text-amber-400">Manager: Tariq M.</span>
                          </div>
                          <div className="p-1.5 rounded bg-slate-950 border border-slate-800/80 flex justify-between">
                            <span>3. Delta Cables ($17,800)</span>
                            <span className="text-amber-400">Manager: Sara K.</span>
                          </div>
                        </div>
                        <div className="text-[10px] text-slate-400 pt-1">
                          Calculated from ERPNext <code>Sales Invoice</code> doctype with status <code>Overdue</code>.
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Prompt suggestion */}
                  <div className="pt-2 text-center">
                    <button 
                      onClick={onOpenPilotDemo}
                      className="text-xs text-cyan-400 hover:text-cyan-300 font-medium underline inline-flex items-center gap-1"
                    >
                      Click here to test interactive live queries &rarr;
                    </button>
                  </div>

                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
