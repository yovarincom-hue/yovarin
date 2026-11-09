'use client';

import React, { useState } from 'react';
import { 
  Factory, 
  ShoppingBag, 
  Dna, 
  Radio, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck 
} from 'lucide-react';

const INDUSTRIES = [
  {
    id: 'manufacturing',
    title: "Industrial & Cable Manufacturing",
    icon: Factory,
    clientHighlight: "Alpha Cable & Wire Industries",
    painPoint: "High scrap rates, manual copper weight calculations, untracked subcontractor routing.",
    solution: "Configured multi-tier Bills of Materials (BOM), shop-floor touchscreens for machine operators, and automatic scrap variance reporting.",
    metrics: [
      { label: "Scrap Reduction", val: "42%" },
      { label: "BOM Accuracy", val: "99.8%" },
      { label: "Order Lead Time", val: "-35%" }
    ],
    features: [
      "Machine Workstation Capacity Scheduling",
      "Subcontractor Material Issue & Scrap Return Reconciliation",
      "Automated Copper Weight & Pricing Formulas",
      "Shop Floor Operator Barcode Terminals"
    ]
  },
  {
    id: 'fmcg',
    title: "FMCG, Food & Retail Distribution",
    icon: ShoppingBag,
    clientHighlight: "Prime Foods & Regional Wholesale",
    painPoint: "Stockouts in regional depots, expired inventory write-offs, unauthorized customer credit extensions.",
    solution: "Automated multi-warehouse inventory with FEFO (First-Expired, First-Out), customer credit blocks, and delivery note mobile signatures.",
    metrics: [
      { label: "Expired Goods Waste", val: "-88%" },
      { label: "Warehouse Sync", val: "Real-Time" },
      { label: "Order Turnaround", val: "3x Faster" }
    ],
    features: [
      "FEFO & FIFO Automated Batch Picking",
      "Regional Hub Transit Reconciliation",
      "Dynamic Credit Limit Enforcement",
      "Driver Delivery App & Route Optimization"
    ]
  },
  {
    id: 'agri',
    title: "Livestock, Genetics & Agriculture",
    icon: Dna,
    clientHighlight: "Apex Bovine Genetics & Dairy Farms",
    painPoint: "Pedigree lines kept in notebooks, scattered veterinary logs, no cost-per-animal visibility.",
    solution: "Custom Frappe DocTypes tracking breeding lines, vaccination lifecycle stages, milk yield sensors, and individual animal margin calculation.",
    metrics: [
      { label: "Pedigree Tracking", val: "100%" },
      { label: "Yield Visibility", val: "+28%" },
      { label: "Vet Audit Compliance", val: "Zero Defect" }
    ],
    features: [
      "RFID Ear-Tag Scanning & Lineage Trees",
      "Vaccination & Quarantine Alert Engines",
      "Milk Bulk Cooler IoT Weight Sync",
      "Feed Consumption & Growth Velocity Charts"
    ]
  },
  {
    id: 'energy',
    title: "Energy, Telecom & Field Contracting",
    icon: Radio,
    clientHighlight: "Horizon Power & Solar Contracting",
    painPoint: "Field crew timesheets submitted weeks late, unbilled site materials, untracked diesel generator fuel.",
    solution: "Lightweight mobile field worker portal with offline caching, GPS geofencing, daily diesel consumption reconciliation, and client sign-off.",
    metrics: [
      { label: "Billing Cycle", val: "Same-Day" },
      { label: "Fuel Leakage", val: "Zero" },
      { label: "Field Utilization", val: "+31%" }
    ],
    features: [
      "GPS Geofenced Daily Mobile Check-Ins",
      "Site Material Issue with Photo Verification",
      "Daily Generator Fuel & Run-Hour Log",
      "Preventative Equipment Maintenance Schedule"
    ]
  }
];

export default function IndustrySolutions({ onOpenConsultation }) {
  const [activeTab, setActiveTab] = useState(INDUSTRIES[0].id);
  const activeIndustry = INDUSTRIES.find(i => i.id === activeTab) || INDUSTRIES[0];

  return (
    <section id="case-studies" className="py-24 relative bg-transparent border-t border-gold-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gold-500/15 text-gold-800 dark:text-gold-300 border border-gold-500/30 font-mono">
            <Factory className="w-3.5 h-3.5 text-gold-600 dark:text-gold-400" /> Proven Track Record
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-slate-900 dark:text-white tracking-tight">
            Tailored Industry Solutions &amp; <span className="text-gradient-gold">Real Case Studies</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm font-light">
            Explore how we engineered custom Frappe/ERPNext solutions for specialized manufacturing, wholesale, agriculture, and field operations.
          </p>
        </div>

        {/* Industry Tabs */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-12">
          {INDUSTRIES.map((ind) => {
            const Icon = ind.icon;
            const isActive = activeTab === ind.id;
            return (
              <button
                key={ind.id}
                onClick={() => setActiveTab(ind.id)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 border ${
                  isActive
                    ? 'btn-luxury-gold shadow-lg shadow-gold-500/20'
                    : 'luxury-card-subtle text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-gold-600 dark:text-gold-400'}`} />
                <span>{ind.title}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Industry Card */}
        <div className="luxury-card p-6 sm:p-10 shadow-2xl relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-gold-700 dark:text-gold-400 font-semibold">
                  Case Study: {activeIndustry.clientHighlight}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 dark:text-white">
                  {activeIndustry.title}
                </h3>
              </div>

              {/* The Problem vs Solution */}
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/25 text-xs space-y-1">
                  <span className="text-[10px] uppercase font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1 font-mono">
                    The Challenge Before Yovarin
                  </span>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    {activeIndustry.painPoint}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-gold-500/10 border border-gold-500/30 text-xs space-y-1">
                  <span className="text-[10px] uppercase font-bold text-gold-700 dark:text-gold-400 flex items-center gap-1 font-mono">
                    The Yovarin Engineering Solution
                  </span>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    {activeIndustry.solution}
                  </p>
                </div>
              </div>

              {/* Specific Features List */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider block">
                  Configured Capabilities:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeIndustry.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenConsultation}
                  className="btn-luxury-gold px-5 py-2.5 text-xs font-bold rounded-xl flex items-center gap-2"
                >
                  <span>Build Solution for Your {activeIndustry.title}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

            {/* Impact Metric Cards Column */}
            <div className="lg:col-span-5 space-y-4">
              <div className="luxury-card-subtle p-6 space-y-6">
                <div className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold border-b border-gold-500/20 pb-3 flex justify-between">
                  <span>Verified Operational Impact</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">Audited</span>
                </div>

                <div className="space-y-4">
                  {activeIndustry.metrics.map((m, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-white/70 dark:bg-slate-900/70 border border-gold-500/25">
                      <div className="text-xs text-slate-600 dark:text-slate-400">{m.label}</div>
                      <div className="text-3xl font-extrabold font-mono mt-1 text-gold-600 dark:text-gold-400">
                        {m.val}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-3 rounded-xl bg-gold-500/10 border border-gold-500/30 text-[11px] text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-gold-600 dark:text-gold-400 shrink-0" />
                  <span>Deployment managed under full NDA &amp; dedicated server security.</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
