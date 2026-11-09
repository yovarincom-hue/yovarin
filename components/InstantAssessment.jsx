'use client';

import React, { useState } from 'react';
import { 
  Sparkles, 
  Crown, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  Clock, 
  TrendingUp, 
  FileSpreadsheet, 
  Factory, 
  Globe, 
  Boxes,
  ShieldCheck
} from 'lucide-react';
import ConsultationModal from './ConsultationModal';

const BOTTLENECKS = [
  {
    id: 'spreadsheets',
    title: 'Spreadsheets & WhatsApp Chaos',
    icon: FileSpreadsheet,
    desc: 'Orders, delivery dates, and cashflows scattered across 20+ Excel sheets and WhatsApp groups.',
    recommendation: 'Yovarin ERPNext Core + Automated Workflows',
    estTimeline: '6 - 8 Weeks',
    estSavings: '$35,000+ / year',
    primaryModule: 'Accounts & Multi-Warehouse Stock'
  },
  {
    id: 'manufacturing',
    title: 'Manufacturing Scrap & Untracked BOMs',
    icon: Factory,
    desc: 'Raw material leakage, manual copper/metal weight calculations, subcontractor delay.',
    recommendation: 'Yovarin Manufacturing Suite + Shop Floor Terminals',
    estTimeline: '8 - 10 Weeks',
    estSavings: '42% Scrap Reduction',
    primaryModule: 'Multi-Level BOMs & Routing'
  },
  {
    id: 'web-apps',
    title: 'Need Bespoke Web App or SaaS Portal',
    icon: Globe,
    desc: 'Outdated legacy frontend or need customer/vendor self-service digital portal.',
    recommendation: 'Custom Next.js 14 Web Application + Frappe API',
    estTimeline: '4 - 6 Weeks',
    estSavings: '3x Faster Order Throughput',
    primaryModule: 'Next.js App Router + Secure RBAC'
  },
  {
    id: 'inventory',
    title: 'Multi-Warehouse Inventory Stockouts',
    icon: Boxes,
    desc: 'Regional depots out of sync, expired lots, unauthorized customer credit sales.',
    recommendation: 'Yovarin Automated FIFO / FEFO Inventory Engine',
    estTimeline: '6 Weeks',
    estSavings: '99.4% Stock Accuracy',
    primaryModule: 'Batch Expiry & Barcode Tracking'
  }
];

const SCALES = [
  { id: 'small', label: '10 - 30 Operational Staff', tier: 'Dedicated Private VPS Tier' },
  { id: 'medium', label: '30 - 100 Operational Staff', tier: 'High-Availability Cluster Tier' },
  { id: 'enterprise', label: '100+ Enterprise Staff', tier: 'Sovereign Multi-Entity Enterprise Tier' },
];

export default function InstantAssessment() {
  const [selectedBottleneck, setSelectedBottleneck] = useState(BOTTLENECKS[0].id);
  const [selectedScale, setSelectedScale] = useState(SCALES[1].id);
  const [modalOpen, setModalOpen] = useState(false);

  const activeBottleneck = BOTTLENECKS.find(b => b.id === selectedBottleneck) || BOTTLENECKS[0];
  const activeScale = SCALES.find(s => s.id === selectedScale) || SCALES[1];

  return (
    <>
      <section className="py-20 relative bg-slate-950 dark:bg-obsidian-950 border-t border-gold-500/20 overflow-hidden">
        {/* Ambient luxury light */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gold-500/10 blur-[130px] rounded-full pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gold-500/15 text-gold-300 border border-gold-500/30 font-mono">
              <Crown className="w-3.5 h-3.5 text-gold-400" /> Interactive Readiness Matcher
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-white tracking-tight">
              Instant <span className="text-gradient-gold">Architecture Blueprint</span>
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm font-light">
              Select your primary operational friction below to generate an instant technical recommendation, estimated timeline, and financial impact.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Step 1 & 2 Selector Panel */}
            <div className="lg:col-span-7 rounded-3xl border border-gold-500/30 bg-slate-900/70 dark:bg-obsidian-900/90 p-6 sm:p-8 space-y-6 shadow-2xl">
              
              {/* Step 1: Bottleneck */}
              <div>
                <label className="text-xs font-bold text-gold-400 uppercase tracking-wider block mb-3 font-mono">
                  1. Identify Primary Bottleneck
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {BOTTLENECKS.map((b) => {
                    const Icon = b.icon;
                    const isSelected = selectedBottleneck === b.id;
                    return (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => setSelectedBottleneck(b.id)}
                        className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'bg-gold-500/15 border-gold-400 shadow-md shadow-gold-500/10'
                            : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:border-gold-500/40 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1.5">
                          <Icon className={`w-4 h-4 ${isSelected ? 'text-gold-400' : 'text-slate-500'}`} />
                          <span className="text-xs font-bold text-white leading-tight">{b.title}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed font-light">
                          {b.desc}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Scale */}
              <div>
                <label className="text-xs font-bold text-gold-400 uppercase tracking-wider block mb-3 font-mono">
                  2. Organizational Scope &amp; Scale
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {SCALES.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSelectedScale(s.id)}
                      className={`p-3 rounded-xl border text-xs text-left transition-all ${
                        selectedScale === s.id
                          ? 'bg-gold-500/20 border-gold-400 text-gold-200 font-semibold'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                      }`}
                    >
                      <div className="font-semibold text-white">{s.label}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5 font-mono">{s.tier}</div>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Step 3: Instant Output Blueprint */}
            <div className="lg:col-span-5 rounded-3xl border border-gold-500/40 bg-gradient-to-b from-slate-900 via-obsidian-950 to-slate-900 p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative">
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-gold-500/20 pb-3">
                  <span className="text-[11px] font-mono uppercase text-gold-400 font-bold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> Tailored Recommendation
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-gold-500/20 text-gold-300 border border-gold-500/30">
                    VIP TIER
                  </span>
                </div>

                <div>
                  <div className="text-xs text-slate-400">Recommended Architecture:</div>
                  <h3 className="text-xl font-bold font-serif text-white mt-1 leading-snug">
                    {activeBottleneck.recommendation}
                  </h3>
                  <div className="text-xs text-gold-400 font-mono mt-1 font-semibold">
                    Core: {activeBottleneck.primaryModule}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 rounded-2xl bg-slate-950 border border-gold-500/20 space-y-1">
                    <div className="text-[10px] uppercase font-mono text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-gold-400" /> Go-Live Timeline
                    </div>
                    <div className="text-base font-bold font-mono text-white">
                      {activeBottleneck.estTimeline}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-950 border border-gold-500/20 space-y-1">
                    <div className="text-[10px] uppercase font-mono text-slate-400 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 text-emerald-400" /> Target Impact
                    </div>
                    <div className="text-base font-bold font-mono text-emerald-400">
                      {activeBottleneck.estSavings}
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1 text-xs">
                  <div className="font-semibold text-slate-200">Deployment Architecture:</div>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-light">
                    Includes dedicated private Linux VPS hardening, S3 hourly encrypted backups, bilingual staff training, and 24/7 SLA.
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6 border-t border-slate-800/80 mt-6">
                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  className="btn-luxury-gold w-full py-3.5 text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  <span>Claim Your Complimentary Blueprint Call</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <div className="flex items-center justify-center gap-1 text-[10px] text-slate-500 mt-2 font-mono">
                  <ShieldCheck className="w-3 h-3 text-gold-400" />
                  100% Confidential &bull; Mutual NDA on request
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      <ConsultationModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
      />
    </>
  );
}
