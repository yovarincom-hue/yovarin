'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import IndustrySolutions from '@/components/IndustrySolutions';
import Link from 'next/link';
import { 
  Building2, 
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Sparkles
} from 'lucide-react';

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen bg-transparent flex flex-col justify-between transition-colors duration-500">
      <Navbar />

      <main className="flex-1 pb-24">
        
        {/* Header */}
        <section className="relative pt-16 pb-16 border-b border-gold-500/20 bg-transparent overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gold-500/15 text-gold-800 dark:text-gold-300 border border-gold-500/30 font-mono">
              <Building2 className="w-3.5 h-3.5 text-gold-600 dark:text-gold-400" /> Proven Enterprise Deployments
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-extrabold font-serif text-slate-900 dark:text-white tracking-tight">
              Real Transformations in <span className="text-gradient-gold">Complex Operations</span>
            </h1>

            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-light">
              Explore how Yovarin engineered tailored ERPNext and custom web solutions for high-volume manufacturing, regional retail distribution, livestock genetics, and field energy operations.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/calculator"
                className="btn-luxury-gold px-6 py-3 text-xs font-bold rounded-xl inline-flex items-center gap-2"
              >
                <span>Calculate Your Operational ROI</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="btn-luxury-outline px-5 py-3 text-xs font-semibold rounded-xl"
              >
                Request Confidential Case Study Deck
              </Link>
            </div>
          </div>
        </section>

        {/* Interactive Industry Solutions Component */}
        <IndustrySolutions />

        {/* High-level Transformation Summary Cards */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 dark:text-white">Audited Operational Outcomes</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Aggregated results across 40+ enterprise ERP deployments.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="luxury-card p-6 space-y-3">
              <div className="text-3xl font-extrabold font-mono text-gold-600 dark:text-gold-400">42%</div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Reduction in Material Scrap</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Automated multi-level BOM weight formulas and touchscreen operator scrap logs eliminated unexplained raw material variances in cable and metal fabrication plants.
              </p>
            </div>

            <div className="luxury-card p-6 space-y-3">
              <div className="text-3xl font-extrabold font-mono text-cyan-600 dark:text-cyan-400">320 hrs</div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Saved Monthly per 30 Staff</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                By replacing 20+ disconnected spreadsheets and endless WhatsApp messaging threads with automated ERP workflows and approval hierarchies.
              </p>
            </div>

            <div className="luxury-card p-6 space-y-3">
              <div className="text-3xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400">100%</div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">On-Time Go-Live Rate</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Our strict 4-phase engineering framework, comprehensive bilingual UAT, and staging dry-run protocol eliminate unexpected surprises during live cutover.
              </p>
            </div>
          </div>

          <div className="text-center pt-6">
            <Link
              href="/contact"
              className="btn-luxury-gold px-6 py-3 text-xs font-bold rounded-xl inline-flex items-center gap-2"
            >
              <span>Schedule Architecture Audit for Your Industry</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
