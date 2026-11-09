'use client';

import React, { useState } from 'react';
import { 
  Palette, 
  Sun, 
  Moon, 
  Layout, 
  Check, 
  Sparkles, 
  Sliders, 
  Terminal,
  Grid,
  Search,
  ChevronDown
} from 'lucide-react';

const THEMES = [
  {
    id: 'emerald',
    name: 'Enterprise Emerald',
    bg: 'bg-slate-950',
    cardBg: 'bg-slate-900',
    primary: 'bg-brand-500 text-slate-950',
    accent: 'text-brand-400',
    border: 'border-brand-500/30',
    dot: 'bg-emerald-400',
    desc: 'Deep slate with radiant emerald accents — optimized for manufacturing and engineering firms.'
  },
  {
    id: 'slate',
    name: 'Midnight Indigo',
    bg: 'bg-slate-950',
    cardBg: 'bg-slate-900',
    primary: 'bg-indigo-500 text-white',
    accent: 'text-indigo-400',
    border: 'border-indigo-500/30',
    dot: 'bg-indigo-400',
    desc: 'High-contrast dark navy designed for finance, accounts, and executive command centers.'
  },
  {
    id: 'cyan',
    name: 'Nordic Cyan',
    bg: 'bg-slate-950',
    cardBg: 'bg-slate-900',
    primary: 'bg-cyan-500 text-slate-950',
    accent: 'text-cyan-400',
    border: 'border-cyan-500/30',
    dot: 'bg-cyan-400',
    desc: 'Cool futuristic cyan highlights for high-velocity tech and supply-chain logistics.'
  },
  {
    id: 'light',
    name: 'Clean SaaS Slate',
    bg: 'bg-slate-100',
    cardBg: 'bg-white',
    primary: 'bg-emerald-600 text-white',
    accent: 'text-emerald-700',
    border: 'border-slate-300',
    dot: 'bg-emerald-600',
    desc: 'Crisp, ultra-clean daylight interface for offices with bright ambient lighting.'
  }
];

export default function DeskThemeStudio({ onOpenConsultation }) {
  const [selectedTheme, setSelectedTheme] = useState(THEMES[0]);
  const [density, setDensity] = useState('compact');
  const [navStyle, setNavStyle] = useState('topbar');

  return (
    <section id="theme-studio" className="py-24 relative bg-transparent border-t border-gold-500/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gold-500/15 text-gold-800 dark:text-gold-300 border border-gold-500/30 font-mono">
            <Palette className="w-3.5 h-3.5 text-gold-600 dark:text-gold-400" /> Interactive Theme Studio
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-slate-900 dark:text-white tracking-tight">
            Customize <span className="text-gradient-gold">Yovarin Desk</span> to Your Brand
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm font-light">
            Toggle color themes, density settings, and navigation layouts below to see how ERPNext instantly updates with Yovarin Desk&apos;s CSS architecture.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Theme Controls Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="luxury-card p-6 space-y-6">
              
              {/* Theme Picker */}
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block mb-3 font-mono">
                  Color Themes
                </label>
                <div className="space-y-2">
                  {THEMES.map((th) => (
                    <button
                      key={th.id}
                      onClick={() => setSelectedTheme(th)}
                      className={`w-full p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                        selectedTheme.id === th.id
                          ? 'border-gold-500 bg-gold-500/15 text-slate-900 dark:text-white shadow-md'
                          : 'border-gold-500/20 luxury-card-subtle text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={`w-3.5 h-3.5 rounded-full ${th.dot}`}></span>
                        <span className="font-semibold">{th.name}</span>
                      </div>
                      {selectedTheme.id === th.id && <Check className="w-4 h-4 text-gold-600 dark:text-gold-400" />}
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
                  {selectedTheme.desc}
                </p>
              </div>

              {/* Density Toggle */}
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block mb-3 font-mono">
                  Data Table Density
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setDensity('compact')}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                      density === 'compact'
                        ? 'bg-gold-500/20 border-gold-500 text-gold-900 dark:text-gold-200'
                        : 'luxury-card-subtle border-gold-500/20 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    High-Density (Compact)
                  </button>
                  <button
                    onClick={() => setDensity('comfortable')}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                      density === 'comfortable'
                        ? 'bg-gold-500/20 border-gold-500 text-gold-900 dark:text-gold-200'
                        : 'luxury-card-subtle border-gold-500/20 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    Comfortable (Relaxed)
                  </button>
                </div>
              </div>

              {/* Navigation Style */}
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block mb-3 font-mono">
                  Layout Navigation
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setNavStyle('topbar')}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                      navStyle === 'topbar'
                        ? 'bg-gold-500/20 border-gold-500 text-gold-900 dark:text-gold-200'
                        : 'luxury-card-subtle border-gold-500/20 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    Modern Top Navbar
                  </button>
                  <button
                    onClick={() => setNavStyle('sidebar')}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                      navStyle === 'sidebar'
                        ? 'bg-gold-500/20 border-gold-500 text-gold-900 dark:text-gold-200'
                        : 'luxury-card-subtle border-gold-500/20 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    Classic Sidebar
                  </button>
                </div>
              </div>

              {/* Install CTA */}
              <button
                onClick={onOpenConsultation}
                className="btn-luxury-gold w-full py-3 text-xs font-bold rounded-xl"
              >
                Apply This Theme to Your ERPNext
              </button>

            </div>
          </div>

          {/* Interactive Live Preview Viewport */}
          <div className="lg:col-span-8">
            <div className="luxury-card p-2 shadow-2xl overflow-hidden">
              <div className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                selectedTheme.id === 'light' ? 'bg-slate-100 text-slate-900 border-slate-300' : 'bg-slate-950 text-slate-100 border-slate-800'
              }`}>
                
                {/* Simulated Header */}
                <div className={`px-4 py-3 border-b flex items-center justify-between text-xs ${
                  selectedTheme.id === 'light' ? 'bg-white border-slate-200' : 'bg-slate-900/90 border-slate-800'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded flex items-center justify-center font-bold text-xs ${selectedTheme.primary}`}>
                      Y
                    </div>
                    <span className="font-bold tracking-tight">Yovarin Desk Preview</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-500/20">Frappe v15</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-500/10 border border-slate-500/20 text-[11px]">
                      <Search className="w-3 h-3" />
                      <span>Search DocTypes...</span>
                    </div>
                  </div>
                </div>

                {/* Body with selected Layout (Topbar vs Sidebar) */}
                <div className="flex">
                  {navStyle === 'sidebar' && (
                    <div className={`w-44 p-3 border-r text-xs space-y-1 ${
                      selectedTheme.id === 'light' ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-slate-900/50 border-slate-800 text-slate-300'
                    }`}>
                      <div className="text-[10px] uppercase font-mono font-bold text-slate-400 mb-2">Modules</div>
                      <div className={`p-1.5 rounded font-semibold text-[11px] ${
                        selectedTheme.id === 'light' ? 'bg-slate-200 text-emerald-800' : 'bg-slate-800 text-brand-300'
                      }`}>
                        Manufacturing
                      </div>
                      <div className="p-1.5 rounded hover:bg-slate-800/40 text-[11px]">Accounts</div>
                      <div className="p-1.5 rounded hover:bg-slate-800/40 text-[11px]">Stock & Inventory</div>
                      <div className="p-1.5 rounded hover:bg-slate-800/40 text-[11px]">Buying & POs</div>
                      <div className="p-1.5 rounded hover:bg-slate-800/40 text-[11px]">HRMS Payroll</div>
                    </div>
                  )}

                  <div className="flex-1 p-5 space-y-4">
                    
                    {/* Top Action Ribbon */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <h4 className="font-bold text-base">Production Orders & Workflows</h4>
                        <p className={`text-xs ${selectedTheme.id === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
                          Assembly Line 1 & Line 2 • Live Status
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${selectedTheme.primary}`}>
                          + New Work Order
                        </button>
                      </div>
                    </div>

                    {/* Metric Quick Cards */}
                    <div className="grid grid-cols-3 gap-3">
                      <div className={`p-3 rounded-xl border ${
                        selectedTheme.id === 'light' ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
                      }`}>
                        <div className="text-[10px] text-slate-400 uppercase font-mono">BOM Completion</div>
                        <div className="text-lg font-bold mt-1">94.8%</div>
                        <div className={`text-[10px] font-semibold ${selectedTheme.accent}`}>+3.2% vs target</div>
                      </div>
                      <div className={`p-3 rounded-xl border ${
                        selectedTheme.id === 'light' ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
                      }`}>
                        <div className="text-[10px] text-slate-400 uppercase font-mono">Rejections</div>
                        <div className="text-lg font-bold mt-1">0.4%</div>
                        <div className="text-[10px] text-brand-400">Optimal quality</div>
                      </div>
                      <div className={`p-3 rounded-xl border ${
                        selectedTheme.id === 'light' ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
                      }`}>
                        <div className="text-[10px] text-slate-400 uppercase font-mono">Material Yield</div>
                        <div className="text-lg font-bold mt-1">99.1%</div>
                        <div className="text-[10px] text-brand-400">Zero copper scrap</div>
                      </div>
                    </div>

                    {/* Simulated Dynamic Data Table with Selected Density */}
                    <div className={`rounded-xl border overflow-hidden ${
                      selectedTheme.id === 'light' ? 'bg-white border-slate-200' : 'bg-slate-900/60 border-slate-800'
                    }`}>
                      <table className="w-full text-left text-xs font-mono">
                        <thead className={`text-[11px] border-b ${
                          selectedTheme.id === 'light' ? 'bg-slate-50 border-slate-200 text-slate-500' : 'bg-slate-900 border-slate-800 text-slate-400'
                        }`}>
                          <tr>
                            <th className={density === 'compact' ? 'p-2' : 'p-3.5'}>Work Order</th>
                            <th className={density === 'compact' ? 'p-2' : 'p-3.5'}>Product Item</th>
                            <th className={density === 'compact' ? 'p-2' : 'p-3.5'}>Qty</th>
                            <th className={density === 'compact' ? 'p-2' : 'p-3.5'}>Target Date</th>
                            <th className={density === 'compact' ? 'p-2 text-right' : 'p-3.5 text-right'}>Status</th>
                          </tr>
                        </thead>
                        <tbody className={`divide-y text-[11px] ${
                          selectedTheme.id === 'light' ? 'divide-slate-200 text-slate-700' : 'divide-slate-800 text-slate-300'
                        }`}>
                          <tr>
                            <td className={density === 'compact' ? 'p-2 font-bold' : 'p-3.5 font-bold'}>MFG-WO-2026-001</td>
                            <td className={density === 'compact' ? 'p-2' : 'p-3.5'}>Armored Cable 3x120mm</td>
                            <td className={density === 'compact' ? 'p-2' : 'p-3.5'}>4,500 m</td>
                            <td className={density === 'compact' ? 'p-2' : 'p-3.5'}>Tomorrow, 14:00</td>
                            <td className={density === 'compact' ? 'p-2 text-right' : 'p-3.5 text-right'}>
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                selectedTheme.id === 'light' ? 'bg-emerald-100 text-emerald-800' : 'bg-brand-500/20 text-brand-300'
                              }`}>
                                In-Process
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td className={density === 'compact' ? 'p-2 font-bold' : 'p-3.5 font-bold'}>MFG-WO-2026-002</td>
                            <td className={density === 'compact' ? 'p-2' : 'p-3.5'}>Low-Voltage Copper Wire</td>
                            <td className={density === 'compact' ? 'p-2' : 'p-3.5'}>12,000 m</td>
                            <td className={density === 'compact' ? 'p-2' : 'p-3.5'}>Nov 12, 2026</td>
                            <td className={density === 'compact' ? 'p-2 text-right' : 'p-3.5 text-right'}>
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                selectedTheme.id === 'light' ? 'bg-blue-100 text-blue-800' : 'bg-cyan-500/20 text-cyan-300'
                              }`}>
                                Scheduled
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

        </div>

      </div>
    </section>
  );
}
