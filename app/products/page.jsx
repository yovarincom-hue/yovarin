'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductsShowcase from '@/components/ProductsShowcase';
import PilotDemoSimulator from '@/components/PilotDemoSimulator';
import DeskThemeStudio from '@/components/DeskThemeStudio';
import Link from 'next/link';
import { 
  Layers, 
  Bot, 
  Palette, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  Terminal,
  Cpu,
  Sparkles
} from 'lucide-react';

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-transparent flex flex-col justify-between transition-colors duration-500">
      <Navbar />

      <main className="flex-1 pb-24">
        
        {/* Products Header */}
        <section className="relative pt-16 pb-16 border-b border-gold-500/20 bg-transparent overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gold-500/15 text-gold-800 dark:text-gold-300 border border-gold-500/30 font-mono">
              <Layers className="w-3.5 h-3.5 text-gold-600 dark:text-gold-400" /> Proprietary Enterprise Suite
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-extrabold font-serif text-slate-900 dark:text-white tracking-tight">
              Yovarin <span className="text-gradient-gold">Desk</span> &amp; Yovarin <span className="text-cyan-700 dark:text-cyan-400">Pilot AI</span>
            </h1>

            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-light">
              Two powerful proprietary products engineered specifically for Frappe and ERPNext: an open-source white-label UI theme and a secure read-only enterprise AI assistant.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#pilot-demo"
                className="px-6 py-3 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all shadow-lg shadow-cyan-500/25 flex items-center gap-2"
              >
                <Bot className="w-4 h-4" />
                <span>Test Live Pilot AI Demo</span>
              </a>
              <a
                href="#theme-studio"
                className="px-5 py-3 text-xs font-semibold text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl transition-colors flex items-center gap-2"
              >
                <Palette className="w-4 h-4 text-brand-400" />
                <span>Customize Desk Theme</span>
              </a>
            </div>
          </div>
        </section>

        {/* Feature Showcase Component */}
        <ProductsShowcase />

        {/* Interactive Pilot AI Simulator */}
        <div id="pilot-demo" className="scroll-mt-20">
          <PilotDemoSimulator />
        </div>

        {/* Interactive Desk Theme Studio */}
        <div id="theme-studio" className="scroll-mt-20">
          <DeskThemeStudio />
        </div>

        {/* Comparison Matrix Table */}
        <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-2 mb-10">
            <h3 className="text-2xl font-bold text-white">Why Yovarin Pilot Beats Generic AI</h3>
            <p className="text-xs text-slate-400">Enterprise data requires isolated read replicas and strict permission inheritance.</p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-2xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 font-mono text-[11px]">
                <tr>
                  <th className="p-4 font-semibold">Capability / Architecture</th>
                  <th className="p-4 font-semibold text-cyan-400">Yovarin Pilot AI</th>
                  <th className="p-4 font-semibold text-slate-500">Generic ChatGPT / Third-Party Bots</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-slate-300">
                <tr>
                  <td className="p-4 font-medium text-white">Database Safety Guarantee</td>
                  <td className="p-4 text-brand-400 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> 100% Read-Only Replica (Zero write rights)
                  </td>
                  <td className="p-4 text-rose-400">Direct DB credentials or risky write hooks</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-white">User Role Inheritance</td>
                  <td className="p-4 text-brand-400 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Strictly inherits ERPNext Role Permissions
                  </td>
                  <td className="p-4 text-rose-400">Ignores user roles (data leaks likely)</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-white">Multilingual Dialect Support</td>
                  <td className="p-4 text-brand-400 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Roman Urdu, Urdu, Arabic & English
                  </td>
                  <td className="p-4 text-slate-400">Standard English only</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-white">Proprietary Training Safety</td>
                  <td className="p-4 text-brand-400 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Zero enterprise data sent to public model training
                  </td>
                  <td className="p-4 text-rose-400">Often absorbed into public model datasets</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/contact"
              className="px-6 py-3 text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-teal-300 hover:from-cyan-300 hover:to-teal-200 rounded-xl transition-all shadow-lg shadow-cyan-500/20 inline-flex items-center gap-2"
            >
              <span>Deploy Yovarin Pilot & Desk In Your Organization</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
