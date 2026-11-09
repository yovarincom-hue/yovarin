'use client';

import React from 'react';
import { 
  ArrowRight, 
  Bot, 
  ShieldCheck, 
  CheckCircle2, 
  TrendingUp, 
  Terminal, 
  Clock, 
  Sparkles, 
  BarChart3, 
  Boxes, 
  Crown 
} from 'lucide-react';

export default function Hero({ onOpenConsultation, onOpenPilotDemo }) {
  return (
    <section className="relative pt-14 pb-24 overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          
          {/* Luxury Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-500/35 bg-gold-500/10 dark:bg-gold-500/15 text-gold-800 dark:text-gold-300 text-xs font-semibold shadow-sm backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-500"></span>
            </span>
            <span className="font-mono uppercase tracking-wider text-[11px] flex items-center gap-1">
              <Crown className="w-3 h-3 text-gold-600 dark:text-gold-400" /> Private Enterprise Architecture
            </span>
            <span className="text-gold-500/40">|</span>
            <span className="text-slate-700 dark:text-slate-300 font-mono text-[11px]">Sovereign Web &bull; ERP Suite</span>
          </div>

          {/* Main Headline with Serif Typography */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white font-serif leading-[1.12]">
            Transcend Manual Chaos.{' '}
            <span className="text-gradient-gold block sm:inline">
              Command Enterprise Precision.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
            Transition your organization from fragile spreadsheets and disconnected WhatsApp logs into a unified, high-performance <strong className="text-slate-900 dark:text-white font-medium">Next.js Web &amp; ERPNext ecosystem</strong> &bull; engineered with <strong className="text-gold-700 dark:text-gold-300 font-medium">Yovarin Desk</strong> and secure, read-only <strong className="text-cyan-700 dark:text-cyan-300 font-medium">AI Pilot</strong>.
          </p>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenConsultation}
              className="btn-luxury-gold w-full sm:w-auto px-8 py-4 text-xs sm:text-sm rounded-2xl flex items-center justify-center gap-2.5 cursor-pointer shadow-xl group"
            >
              <span>Schedule Architecture Audit</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={onOpenPilotDemo}
              className="w-full sm:w-auto px-7 py-4 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 bg-white/80 dark:bg-slate-900/90 hover:bg-gold-500/10 dark:hover:bg-slate-800 border border-gold-500/25 hover:border-gold-400 rounded-2xl transition-all flex items-center justify-center gap-2.5 shadow-md backdrop-blur-md cursor-pointer"
            >
              <Bot className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>Launch Live Pilot AI Simulator</span>
            </button>
          </div>

          {/* Trust Guarantees */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600 dark:text-slate-400 font-mono">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-gold-600 dark:text-gold-400" />
              <span>Zero-Data Leakage AI</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-gold-600 dark:text-gold-400" />
              <span>Dedicated Hardened Cloud Servers</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Crown className="w-4 h-4 text-gold-600 dark:text-gold-400" />
              <span>Senior Partner Led Implementation</span>
            </div>
          </div>
        </div>

        {/* Luxury Simulated ERP Command Center Mockup */}
        <div className="mt-16 relative max-w-5xl mx-auto">
          <div className="relative rounded-3xl p-1 bg-gradient-to-b from-gold-500/40 via-gold-500/15 to-slate-900/60 shadow-2xl dark:shadow-black/90 backdrop-blur-2xl">
            <div className="bg-white/95 dark:bg-obsidian-950/95 rounded-[22px] overflow-hidden border border-gold-500/25 shadow-xl">
              
              {/* Window Header */}
              <div className="px-5 py-3.5 bg-ivory-200/90 dark:bg-slate-900/95 border-b border-gold-500/20 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80"></span>
                  <span className="w-3 h-3 rounded-full bg-gold-500/80"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
                  <span className="ml-3 text-xs font-mono text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-gold-600 dark:text-gold-400" /> yovarin-enterprise.cloud &bull; live-replica
                  </span>
                </div>
                <div className="hidden sm:flex items-center gap-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-gold-500/15 text-gold-800 dark:text-gold-300 border border-gold-500/30 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-pulse"></span>
                    SYNCED: 12s ago
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">v15.8-SOVEREIGN</span>
                </div>
              </div>

              {/* Dashboard Content */}
              <div className="p-6 sm:p-8 space-y-6">
                
                {/* AI Pilot Executive Insight Banner */}
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-gold-500/10 via-white/80 dark:via-slate-900 to-cyan-500/10 border border-gold-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="p-3 rounded-xl bg-gold-500/15 text-gold-700 dark:text-gold-300 border border-gold-500/30">
                      <Sparkles className="w-5 h-5 text-gold-600 dark:text-gold-400 animate-pulse" />
                    </div>
                    <div>
                      <div className="text-[11px] font-semibold text-gold-800 dark:text-gold-300 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                        <Bot className="w-3.5 h-3.5 text-gold-600 dark:text-gold-400" /> Yovarin Pilot Intelligence Brief
                      </div>
                      <div className="text-sm font-medium text-slate-900 dark:text-slate-100 mt-0.5">
                        &quot;Lahore Cable Factory: Extrusion Line 2 completed BOM #981. Copper scrap variance decreased by 4.2% below tolerance.&quot;
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={onOpenPilotDemo}
                    className="btn-luxury-gold px-3.5 py-1.5 text-xs rounded-lg whitespace-nowrap cursor-pointer"
                  >
                    Query AI Pilot &rarr;
                  </button>
                </div>

                {/* Key Operational KPIs */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 rounded-2xl bg-ivory-100/70 dark:bg-slate-900/70 border border-gold-500/20">
                    <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between">
                      <span>Monthly Net Billing</span>
                      <TrendingUp className="w-4 h-4 text-gold-600 dark:text-gold-400" />
                    </div>
                    <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1 font-mono">$482,900</div>
                    <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-1">
                      +18.4% vs forecast
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-ivory-100/70 dark:bg-slate-900/70 border border-gold-500/20">
                    <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between">
                      <span>Active Work Orders</span>
                      <Boxes className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1 font-mono">32 In-Flight</div>
                    <div className="text-[11px] text-cyan-600 dark:text-cyan-400 font-medium mt-1">
                      98.1% on-schedule
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-ivory-100/70 dark:bg-slate-900/70 border border-gold-500/20">
                    <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between">
                      <span>Inventory Accuracy</span>
                      <BarChart3 className="w-4 h-4 text-gold-600 dark:text-gold-400" />
                    </div>
                    <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1 font-mono">99.8% Verified</div>
                    <div className="text-[11px] text-gold-700 dark:text-gold-400 font-medium mt-1">
                      FEFO automated
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-ivory-100/70 dark:bg-slate-900/70 border border-gold-500/20">
                    <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between">
                      <span>Coordination Time Saved</span>
                      <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1 font-mono">360 hrs / mo</div>
                    <div className="text-[11px] text-amber-700 dark:text-amber-400 font-medium mt-1">
                      Zero WhatsApp logs
                    </div>
                  </div>
                </div>

                {/* Operations Queue Table */}
                <div className="rounded-2xl border border-gold-500/20 bg-ivory-100/50 dark:bg-slate-900/40 p-4">
                  <div className="flex items-center justify-between mb-3 text-xs">
                    <span className="font-semibold text-slate-900 dark:text-slate-200 uppercase tracking-wider font-mono text-[11px]">
                      Live Manufacturing &amp; Client Order Queue
                    </span>
                    <span className="text-gold-600 dark:text-gold-400 font-mono text-[10px]">Real-Time WebSocket Link</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-mono">
                      <thead>
                        <tr className="border-b border-gold-500/20 text-slate-500 dark:text-slate-400 text-[11px]">
                          <th className="pb-2 font-medium">BOM / DocType</th>
                          <th className="pb-2 font-medium">Facility</th>
                          <th className="pb-2 font-medium">Stage</th>
                          <th className="pb-2 font-medium text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gold-500/10 text-slate-700 dark:text-slate-300 text-[11px]">
                        <tr>
                          <td className="py-2.5 text-slate-900 dark:text-white font-bold">BOM-CABLE-HV-500</td>
                          <td className="py-2.5">Extrusion Plant 1</td>
                          <td className="py-2.5">Armoring &amp; Jacketing</td>
                          <td className="py-2.5 text-right">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-gold-500/20 text-gold-800 dark:text-gold-300 border border-gold-500/30">
                              Running
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2.5 text-slate-900 dark:text-white font-bold">SO-2026-FMCG-902</td>
                          <td className="py-2.5">Central Hub Depot</td>
                          <td className="py-2.5">Batch Quality Check</td>
                          <td className="py-2.5 text-right">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-800 dark:text-cyan-300 border border-cyan-500/30">
                              Inspecting
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2.5 text-slate-900 dark:text-white font-bold">BATCH-GENETICS-44</td>
                          <td className="py-2.5">Livestock Unit 3</td>
                          <td className="py-2.5">Lineage DNA Trace</td>
                          <td className="py-2.5 text-right">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30">
                              Verified
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Metric Ribbon */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center border-t border-gold-500/20 pt-10">
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-mono">40+</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 uppercase font-mono tracking-wider">Enterprise Deployments</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-gold-600 dark:text-gold-400 font-mono">42%</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 uppercase font-mono tracking-wider">Material Scrap Reduction</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-mono">99.98%</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 uppercase font-mono tracking-wider">Private Server Uptime</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-cyan-600 dark:text-cyan-400 font-mono">100%</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 uppercase font-mono tracking-wider">On-Time Cutover Record</div>
          </div>
        </div>

      </div>
    </section>
  );
}
