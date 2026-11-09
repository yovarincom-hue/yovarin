'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RoiCalculator from '@/components/RoiCalculator';
import Link from 'next/link';
import { 
  Calculator, 
  TrendingUp, 
  Clock, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  HelpCircle
} from 'lucide-react';

export default function CalculatorPage() {
  return (
    <div className="min-h-screen bg-transparent flex flex-col justify-between transition-colors duration-500">
      <Navbar />

      <main className="flex-1 pb-24">
        
        {/* Header */}
        <section className="relative pt-16 pb-12 border-b border-gold-500/20 bg-transparent overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gold-500/15 text-gold-800 dark:text-gold-300 border border-gold-500/30 font-mono">
              <Calculator className="w-3.5 h-3.5 text-gold-600 dark:text-gold-400" /> Interactive Business Case Model
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-extrabold font-serif text-slate-900 dark:text-white tracking-tight">
              Enterprise ERP &amp; Web Automation <span className="text-gradient-gold">ROI Calculator</span>
            </h1>

            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-light">
              Calculate the true financial and operational cost of spreadsheet chaos, manual reconciliations, and WhatsApp order tracking vs a centralized Yovarin ERP deployment.
            </p>
          </div>
        </section>

        {/* The Calculator Tool */}
        <RoiCalculator />

        {/* Methodology explanation section */}
        <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 dark:text-white">How We Calculate Your ROI</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Transparent parameters based on verified data from 40+ client implementations.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="luxury-card p-5 space-y-2">
              <strong className="text-slate-900 dark:text-white block font-semibold text-sm">72% Automation Recovery Metric</strong>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                By replacing duplicate manual data entry across fragmented spreadsheets with automated Frappe DocTypes and barcode scanning, operations staff recover an average of 72% of their previously wasted coordination time.
              </p>
            </div>

            <div className="luxury-card p-5 space-y-2">
              <strong className="text-slate-900 dark:text-white block font-semibold text-sm">Payback Period Under 6 Months</strong>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Because ERPNext carries zero recurring per-user license fees (unlike SAP or NetSuite), the total cost of implementation is recovered rapidly through eliminated inventory shrinkage and administrative labor savings.
              </p>
            </div>
          </div>

          <div className="luxury-card p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-600 dark:text-slate-300">
              <strong className="text-slate-900 dark:text-white block font-medium mb-1">Want a tailored financial feasibility report for your board?</strong>
              Our team prepares custom financial models including server infrastructure costs and data migration audits.
            </div>
            <Link
              href="/contact"
              className="btn-luxury-gold px-4 py-2.5 text-xs font-bold rounded-xl whitespace-nowrap"
            >
              Request Custom Feasibility Study
            </Link>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
