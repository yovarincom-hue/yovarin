'use client';

import React from 'react';
import { 
  Compass, 
  Code2, 
  TestTube2, 
  Rocket, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Clock
} from 'lucide-react';

const STEPS = [
  {
    phase: "Phase 01",
    duration: "Weeks 1 - 2",
    title: "Process Discovery & Operational Audit",
    icon: Compass,
    description: "We don't touch code yet. Our senior engineers visit your operations, observe physical shop floor flows, inspect current Excel spreadsheets, and document every field, approval chain, and bottleneck.",
    deliverables: [
      "Process Architecture Blueprint",
      "Field & Form Mapping Matrix",
      "DocType Gap Analysis",
      "Milestone & Timeline Agreement"
    ]
  },
  {
    phase: "Phase 02",
    duration: "Weeks 3 - 5",
    title: "DocType Engineering & App Customization",
    icon: Code2,
    description: "We configure standard ERPNext modules and write custom Python/Frappe apps to model your exact business rules, custom validation scripts, automated email alerts, and specialized print formats.",
    deliverables: [
      "Custom Frappe Apps (Upgrade-Safe)",
      "Automated Routing & BOM Rules",
      "Barcode & Print Format Templates",
      "Executive Dashboard Configuration"
    ]
  },
  {
    phase: "Phase 03",
    duration: "Weeks 6 - 7",
    title: "Data Migration & User Acceptance Testing (UAT)",
    icon: TestTube2,
    description: "We scrub legacy records from Excel, QuickBooks, or Tally. Then, we simulate a full business week in a secure staging environment with your key department heads and operators.",
    deliverables: [
      "Legacy Data Deduplication & Import",
      "Opening Balance Reconciliation",
      "Hands-On Departmental UAT",
      "Issue Resolution & Fine-Tuning"
    ]
  },
  {
    phase: "Phase 04",
    duration: "Week 8 & Beyond",
    title: "Hardened Production Cutover & 24/7 SLA",
    icon: Rocket,
    description: "We switch to the live dedicated cloud instance over the weekend. Our team is on standby on-site and remote during Day 1 to ensure zero business disruption and 100% staff adoption.",
    deliverables: [
      "Dedicated VPS Cloud Hardening",
      "Urdu & English Staff Training Sessions",
      "Automated Hourly Off-Site Backups",
      "Continuous Monthly SLA Support"
    ]
  }
];

export default function ImplementationRoadmap({ onOpenConsultation }) {
  return (
    <section className="py-24 relative bg-slate-900/60 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-500/10 text-brand-400 border border-brand-500/20">
            <Clock className="w-3.5 h-3.5" /> Proven Methodology
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How We Deliver <span className="text-brand-400">100% On-Time</span> Go-Lives
          </h2>
          <p className="text-slate-400 text-sm">
            ERP implementations notoriously fail when handled carelessly. We follow a strict 4-phase engineering framework designed to eliminate surprises and guarantee adoption.
          </p>
        </div>

        {/* Roadmap Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-800 bg-slate-950 p-6 flex flex-col justify-between relative group hover:border-brand-500/40 transition-all duration-300 shadow-xl"
              >
                {/* Step Header */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-brand-400 uppercase tracking-wider bg-brand-500/10 px-2.5 py-1 rounded-md border border-brand-500/20">
                      {step.phase}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      {step.duration}
                    </span>
                  </div>

                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 text-brand-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-brand-300 transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Deliverables */}
                  <div className="pt-3 border-t border-slate-800/80 space-y-1.5">
                    <div className="text-[10px] uppercase font-mono font-bold text-slate-500">Key Deliverables</div>
                    {step.deliverables.map((item, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-1.5 text-[11px] text-slate-300">
                        <CheckCircle2 className="w-3 h-3 text-brand-400 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6">
                  <div className="h-1 w-full bg-slate-900 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-brand-500 to-cyan-400 rounded-full"
                      style={{ width: `${(idx + 1) * 25}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <button
            onClick={onOpenConsultation}
            className="px-6 py-3.5 text-xs font-bold text-slate-950 bg-gradient-to-r from-brand-400 to-emerald-400 hover:from-brand-300 hover:to-emerald-300 rounded-xl transition-all shadow-lg shadow-brand-500/25 inline-flex items-center gap-2"
          >
            <span>Review Implementation Schedule for Your Business</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
