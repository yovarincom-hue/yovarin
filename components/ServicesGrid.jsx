'use client';

import React from 'react';
import { 
  Cpu, 
  Database, 
  Factory, 
  Boxes, 
  Server, 
  Smartphone, 
  GraduationCap, 
  Workflow, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

const SERVICES = [
  {
    icon: Workflow,
    title: "Full-Cycle ERPNext Implementation",
    tagline: "From Discovery to Flawless Go-Live",
    description: "We don't do generic installations. Our senior engineers analyze your specific factory or office workflows, map every form, configure workflows, and ensure 100% user adoption.",
    features: ["Business Process Mapping", "Custom Approval Hierarchies", "User Acceptance Testing (UAT)", "Guaranteed On-Time Delivery"]
  },
  {
    icon: Cpu,
    title: "Custom DocTypes & Frappe Apps",
    tagline: "Tailored Python & JS Engineering",
    description: "When standard ERPNext features don't match your unique operational model, we build custom Frappe apps that stay 100% upgrade-safe across major releases.",
    features: ["Upgrade-Safe App Architecture", "Automated Webhooks & APIs", "Custom Print Formats & Barcodes", "Interactive Executive Dashboards"]
  },
  {
    icon: Database,
    title: "Legacy Data Migration & Cleaning",
    tagline: "Zero Data Loss from Excel & Old Systems",
    description: "Moving from 50 disjointed Excel spreadsheets, Tally, or legacy software? We scrub duplicates, normalize schemas, validate opening balances, and import your entire history.",
    features: ["Automated Data Deduplication", "Opening Balance Reconciliation", "Historical Ledger Preservation", "Zero Day Operational Continuity"]
  },
  {
    icon: Factory,
    title: "Manufacturing & Multi-Level BOMs",
    tagline: "Shop-Floor & Subcontracting Control",
    description: "Gain complete transparency over raw materials, routing operations, work orders, subcontractor transfers, and scrap metrics with real-time shop-floor terminals.",
    features: ["Multi-Level Bills of Materials", "Capacity & Workstation Planning", "Subcontractor Reconciliation", "Yield & Scrap Variance Tracking"]
  },
  {
    icon: Boxes,
    title: "Multi-Warehouse & Batch Expiry",
    tagline: "Automated FIFO, FEFO & Lot Tracking",
    description: "Eliminate stockouts and expired goods. Complete traceability from port of arrival through central storage to regional distributor dispatch.",
    features: ["Lot & Batch Barcode Tracking", "Automated Safety Reorder Levels", "Inter-Warehouse Transfer Logs", "Real-Time Stock Valuation"]
  },
  {
    icon: Server,
    title: "Dedicated Hardened Cloud Hosting",
    tagline: "Private Cloud Infrastructure with 99.98% SLA",
    description: "We deploy your ERP on dedicated, high-performance private cloud servers with kernel-level hardening, automated hourly encrypted backups, and 24/7 monitoring.",
    features: ["Zero-Shared Server Isolation", "Off-Site S3 Encrypted Backups", "DDoS Mitigation & Firewalls", "Instant One-Click Disaster Recovery"]
  },
  {
    icon: Smartphone,
    title: "Field Forms & HSE Operations",
    tagline: "Mobile Tools for Energy & Field Teams",
    description: "Empower field technicians and inspectors with lightweight mobile-friendly forms, GPS geofencing, offline caching, and photo evidence capture.",
    features: ["Health, Safety & Environment (HSE)", "Offline Form Submission", "Photo & Signature Capture", "Fleet & Asset Geo-Tagging"]
  },
  {
    icon: GraduationCap,
    title: "Change Management & Staff Training",
    tagline: "Bilingual Training for Real-World Adoption",
    description: "The best ERP fails if workers don't use it. We conduct on-site and remote training in English and Urdu, creating illustrated SOPs and video walk-throughs for your staff.",
    features: ["Role-Based Hands-On Workshops", "Urdu & English Visual Cheat Sheets", "Recorded SOP Video Library", "Ongoing Dedicated Helpdesk"]
  }
];

export default function ServicesGrid({ onOpenConsultation }) {
  return (
    <section id="services" className="py-24 relative bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-500/10 text-brand-400 border border-brand-500/20">
            <Cpu className="w-3.5 h-3.5" /> End-to-End Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Comprehensive Enterprise Services for <span className="text-brand-400">Sustainable Scale</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            We guide your organization through every phase of digital transformation—from initial process discovery to ongoing 24/7 engineering support.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 flex flex-col justify-between hover:border-brand-500/40 hover:bg-slate-900/90 transition-all duration-300 group shadow-lg"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-500/10 border border-brand-500/20 text-brand-400 flex items-center justify-center group-hover:bg-brand-500/20 group-hover:scale-105 transition-all">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-brand-300 transition-colors">
                      {srv.title}
                    </h3>
                    <div className="text-[11px] font-mono text-brand-400/90 font-medium mt-0.5">
                      {srv.tagline}
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {srv.description}
                  </p>

                  <div className="pt-2 border-t border-slate-800/80 space-y-1.5">
                    {srv.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-[11px] text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    onClick={onOpenConsultation}
                    className="w-full py-2 text-xs font-semibold text-slate-300 group-hover:text-white bg-slate-950/80 group-hover:bg-brand-500/10 border border-slate-800 group-hover:border-brand-500/30 rounded-lg transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Discuss Requirements</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-brand-950/40 to-slate-900 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-lg font-bold text-white flex items-center justify-center md:justify-start gap-2">
              <ShieldCheck className="w-5 h-5 text-brand-400" />
              Direct Senior-Led Engineering Model
            </h4>
            <p className="text-xs text-slate-400 max-w-xl">
              Unlike traditional consultancies that pass your project to junior contractors, Yovarin clients collaborate directly with senior ERP architects with a decade of Frappe core experience.
            </p>
          </div>
          <button
            onClick={onOpenConsultation}
            className="px-6 py-3 text-xs font-bold text-slate-950 bg-gradient-to-r from-brand-400 to-emerald-400 hover:from-brand-300 hover:to-emerald-300 rounded-xl transition-all shadow-lg shadow-brand-500/25 whitespace-nowrap"
          >
            Schedule Architectural Call
          </button>
        </div>

      </div>
    </section>
  );
}
