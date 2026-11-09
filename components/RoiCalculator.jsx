'use client';

import React, { useState } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  Clock, 
  DollarSign, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export default function RoiCalculator({ onOpenConsultation }) {
  const [teamSize, setTeamSize] = useState(25);
  const [manualHours, setManualHours] = useState(6);
  const [hourlyRate, setHourlyRate] = useState(20);
  const [selectedModules, setSelectedModules] = useState([
    'accounting',
    'inventory',
    'manufacturing',
    'pilot'
  ]);

  const toggleModule = (mod) => {
    if (selectedModules.includes(mod)) {
      if (selectedModules.length > 1) {
        setSelectedModules(selectedModules.filter(m => m !== mod));
      }
    } else {
      setSelectedModules([...selectedModules, mod]);
    }
  };

  // Calculations
  const weeklyHoursLost = teamSize * manualHours;
  const monthlyHoursLost = weeklyHoursLost * 4.2;
  const hoursSavedFactor = 0.72;
  const monthlyHoursSaved = Math.round(monthlyHoursLost * hoursSavedFactor);
  const annualHoursSaved = monthlyHoursSaved * 12;

  const monthlyCostSaved = Math.round(monthlyHoursSaved * hourlyRate);
  const annualCostSaved = monthlyCostSaved * 12;

  const estimatedImplementationCost = 5000 + (selectedModules.length * 1500) + (teamSize * 50);
  const paybackMonths = Math.max(1.2, (estimatedImplementationCost / Math.max(1, monthlyCostSaved))).toFixed(1);

  return (
    <section id="calculator" className="py-24 relative bg-transparent border-t border-gold-500/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gold-500/15 text-gold-800 dark:text-gold-300 border border-gold-500/30 font-mono">
            <Calculator className="w-3.5 h-3.5 text-gold-600 dark:text-gold-400" /> Interactive Business Case
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-slate-900 dark:text-white tracking-tight">
            Calculate Your <span className="text-gradient-gold">ERP &amp; Automation ROI</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm font-light">
            Adjust the sliders below to estimate how many wasted operational hours and direct costs your company saves by migrating from manual workflows to Yovarin ERPNext.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Sliders Input Panel */}
          <div className="lg:col-span-7 luxury-card p-6 sm:p-8 space-y-6">
            <h3 className="text-lg font-bold font-serif text-slate-900 dark:text-white flex items-center gap-2">
              <span>Operational Parameters</span>
              <span className="text-xs font-mono font-normal text-slate-500 dark:text-slate-400">Live calculations</span>
            </h3>

            {/* Slider 1: Team Size */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-semibold text-slate-700 dark:text-slate-300">
                  Operational Staff / Data Users:
                </label>
                <span className="font-mono text-gold-700 dark:text-gold-400 font-bold text-sm bg-gold-500/15 px-2 py-0.5 rounded border border-gold-500/30">
                  {teamSize} People
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="250"
                step="5"
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                className="w-full accent-yellow-600 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer h-2"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>5 Users</span>
                <span>100 Users</span>
                <span>250+ Users</span>
              </div>
            </div>

            {/* Slider 2: Manual Hours */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-semibold text-slate-700 dark:text-slate-300">
                  Hours/week per employee spent on Excel, WhatsApp &amp; Paper:
                </label>
                <span className="font-mono text-cyan-700 dark:text-cyan-400 font-bold text-sm bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                  {manualHours} hrs / week
                </span>
              </div>
              <input
                type="range"
                min="2"
                max="20"
                step="1"
                value={manualHours}
                onChange={(e) => setManualHours(Number(e.target.value))}
                className="w-full accent-cyan-600 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer h-2"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>2 hrs (Light)</span>
                <span>10 hrs (Moderate)</span>
                <span>20 hrs (Heavy Chaos)</span>
              </div>
            </div>

            {/* Slider 3: Hourly Cost */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-semibold text-slate-700 dark:text-slate-300">
                  Average Blended Hourly Staff Cost:
                </label>
                <span className="font-mono text-emerald-700 dark:text-emerald-400 font-bold text-sm bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  ${hourlyRate} / hr
                </span>
              </div>
              <input
                type="range"
                min="8"
                max="80"
                step="2"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="w-full accent-emerald-600 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer h-2"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>$8 / hr</span>
                <span>$40 / hr</span>
                <span>$80 / hr</span>
              </div>
            </div>

            {/* Modules Checkbox Grid */}
            <div className="pt-2 border-t border-gold-500/20 space-y-3">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                Required Core Modules:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { id: 'accounting', name: 'General Accounting' },
                  { id: 'inventory', name: 'Inventory & Warehousing' },
                  { id: 'manufacturing', name: 'Manufacturing & BOMs' },
                  { id: 'sales', name: 'CRM & Sales Invoicing' },
                  { id: 'pilot', name: 'Yovarin AI Pilot' },
                  { id: 'field', name: 'Field HSE & Mobile' }
                ].map((mod) => (
                  <button
                    key={mod.id}
                    type="button"
                    onClick={() => toggleModule(mod.id)}
                    className={`p-2.5 rounded-xl border text-xs font-medium text-left transition-all flex items-center justify-between ${
                      selectedModules.includes(mod.id)
                        ? 'bg-gold-500/20 border-gold-500 text-gold-900 dark:text-gold-200 font-bold'
                        : 'bg-white/50 dark:bg-slate-900/60 border-gold-500/20 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <span>{mod.name}</span>
                    {selectedModules.includes(mod.id) && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-gold-600 dark:text-gold-400 shrink-0 ml-1" />
                    )}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Results Summary Card */}
          <div className="lg:col-span-5 luxury-card border-gold-500/40 p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative"
               style={{ background: 'linear-gradient(145deg, var(--bg-surface) 0%, var(--bg-surface-elevated) 100%)' }}>
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-gold-500/25 pb-4">
                <span className="text-xs uppercase font-mono tracking-wider text-gold-700 dark:text-gold-400 font-bold">
                  Projected Financial Impact
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-gold-500/15 text-gold-800 dark:text-gold-300 border border-gold-500/30">
                  72% Efficiency Rate
                </span>
              </div>

              {/* Annual Cost Savings */}
              <div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Estimated Annual Cost Savings</div>
                <div className="text-4xl sm:text-5xl font-black text-gradient-gold font-mono mt-1 tracking-tight">
                  ${annualCostSaved.toLocaleString()}
                </div>
                <div className="text-xs text-gold-700 dark:text-gold-400 font-medium mt-1">
                  ~${monthlyCostSaved.toLocaleString()} recovered every month
                </div>
              </div>

              {/* Stat breakdown */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl luxury-card-subtle">
                  <div className="text-[11px] text-slate-600 dark:text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" /> Annual Hours Saved
                  </div>
                  <div className="text-xl font-bold text-slate-900 dark:text-white font-mono mt-1">
                    {annualHoursSaved.toLocaleString()} hrs
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {monthlyHoursSaved.toLocaleString()} hrs / month
                  </div>
                </div>

                <div className="p-3.5 rounded-xl luxury-card-subtle">
                  <div className="text-[11px] text-slate-600 dark:text-slate-400 flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Payback Period
                  </div>
                  <div className="text-xl font-bold text-slate-900 dark:text-white font-mono mt-1">
                    {paybackMonths} Months
                  </div>
                  <div className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-0.5">
                    Fast capital return
                  </div>
                </div>
              </div>

              {/* Recommended Tier */}
              <div className="p-4 rounded-xl bg-gold-500/10 border border-gold-500/30 space-y-1.5">
                <div className="text-xs font-semibold text-slate-900 dark:text-white flex items-center justify-between">
                  <span>Recommended Architecture:</span>
                  <span className="text-gold-700 dark:text-gold-400 font-mono text-[11px]">
                    {teamSize < 30 ? 'Dedicated VPS Tier' : 'High-Availability Cluster'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                  Includes full process mapping, {selectedModules.length} core modules, custom workflows, data migration, and 24/7 SLA.
                </p>
              </div>

            </div>

            {/* Booking CTA */}
            <div className="pt-6 border-t border-gold-500/20 mt-6">
              <button
                onClick={onOpenConsultation}
                className="btn-luxury-gold w-full py-3.5 text-xs font-bold rounded-xl flex items-center justify-center gap-2"
              >
                <span>Request Custom Scope &amp; Quotation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <div className="text-[10px] text-slate-500 text-center mt-2 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3 h-3 text-gold-600 dark:text-gold-400" />
                No obligation. 100% confidential operational review.
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
