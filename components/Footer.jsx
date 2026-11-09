'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  ArrowUp,
  Crown
} from 'lucide-react';
import LuxuryLogo from './LuxuryLogo';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-ivory-200/80 dark:bg-obsidian-950 border-t border-gold-500/20 text-slate-600 dark:text-slate-400 text-xs relative overflow-hidden transition-colors duration-500">
      {/* Background ambient luxury glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[150px] bg-gold-500/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <LuxuryLogo size="md" />
            </Link>
            
            <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed max-w-sm font-light">
              Architecting bespoke Next.js web applications, full-cycle ERPNext enterprise deployments, Yovarin Desk design systems, and read-only AI copilots for discerning modern enterprises.
            </p>

            <div className="pt-2 space-y-2 text-slate-700 dark:text-slate-300 text-xs">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gold-600 dark:text-gold-400 shrink-0" />
                <span>Lahore, Pakistan &bull; Serving Private Enterprise Clients Globally</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold-600 dark:text-gold-400 shrink-0" />
                <a href="mailto:yovarin.com@gmail.com" className="hover:text-gold-600 dark:hover:text-gold-300 transition-colors">
                  yovarin.com@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold-600 dark:text-gold-400 shrink-0" />
                <a href="https://wa.me/923090687624" target="_blank" rel="noopener noreferrer" className="hover:text-gold-600 dark:hover:text-gold-300 transition-colors">
                  +92 309 0687624 (Private WhatsApp VIP Channel)
                </a>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-white/80 dark:bg-slate-900 border border-gold-500/25 text-[10px] font-mono text-gold-700 dark:text-gold-300 flex items-center gap-1.5 shadow-sm">
                <Crown className="w-3 h-3 text-gold-600 dark:text-gold-400" /> Sovereign Tier Architecture
              </span>
              <span className="px-3 py-1 rounded-full bg-white/80 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-[10px] font-mono text-slate-700 dark:text-slate-400 flex items-center gap-1.5 shadow-sm">
                <ShieldCheck className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> 99.98% Private SLA
              </span>
            </div>
          </div>

          {/* Navigation Pages */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 dark:text-white uppercase font-mono tracking-wider text-xs flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-500"></span> Platform
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-gold-600 dark:hover:text-gold-300 transition-colors">
                  Overview
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-gold-600 dark:hover:text-gold-300 transition-colors">
                  Yovarin Products Suite
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-gold-600 dark:hover:text-gold-300 transition-colors">
                  Bespoke Engineering Services
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="hover:text-gold-600 dark:hover:text-gold-300 transition-colors">
                  Audited Case Studies
                </Link>
              </li>
              <li>
                <Link href="/calculator" className="hover:text-gold-600 dark:hover:text-gold-300 transition-colors">
                  Financial ROI Calculator
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-gold-600 dark:hover:text-gold-300 transition-colors">
                  Engineering Journal
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gold-600 dark:hover:text-gold-300 transition-colors">
                  Private Concierge &amp; RFQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Column */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 dark:text-white uppercase font-mono tracking-wider text-xs flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-500"></span> Capabilities
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/services#web-development" className="text-gold-700 dark:text-gold-400 hover:text-gold-800 dark:hover:text-gold-300 font-medium transition-colors">
                  Next.js Luxury Web Development
                </Link>
              </li>
              <li>
                <Link href="/services#web-apps" className="text-cyan-700 dark:text-cyan-300 hover:underline font-medium transition-colors">
                  Custom SaaS &amp; Enterprise Portals
                </Link>
              </li>
              <li>
                <Link href="/services#erp-implementation" className="hover:text-gold-600 dark:hover:text-gold-300 transition-colors">
                  Full ERPNext Implementation
                </Link>
              </li>
              <li>
                <Link href="/services#manufacturing-bom" className="hover:text-gold-600 dark:hover:text-gold-300 transition-colors">
                  Shop-Floor BOM &amp; Scrap Control
                </Link>
              </li>
              <li>
                <Link href="/services#data-migration" className="hover:text-gold-600 dark:hover:text-gold-300 transition-colors">
                  Legacy Data Migration &amp; Deduplication
                </Link>
              </li>
              <li>
                <Link href="/services#cloud-hosting" className="hover:text-gold-600 dark:hover:text-gold-300 transition-colors">
                  Hardened Private Cloud VPS
                </Link>
              </li>
            </ul>
          </div>

          {/* Verticals Column */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 dark:text-white uppercase font-mono tracking-wider text-xs flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-500"></span> Verticals
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/case-studies" className="hover:text-gold-600 dark:hover:text-gold-300 transition-colors">
                  Industrial Cable &amp; Engineering
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="hover:text-gold-600 dark:hover:text-gold-300 transition-colors">
                  FMCG &amp; Multi-Depot Distribution
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="hover:text-gold-600 dark:hover:text-gold-300 transition-colors">
                  Livestock, Dairy &amp; Genetics
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="hover:text-gold-600 dark:hover:text-gold-300 transition-colors">
                  Energy, Telecom &amp; Field Services
                </Link>
              </li>
            </ul>

            <div className="pt-3">
              <Link
                href="/contact"
                className="btn-luxury-gold w-full block py-2.5 text-xs rounded-xl text-center shadow-md shadow-gold-500/20"
              >
                Request Architectural Audit
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-12 mt-12 border-t border-gold-500/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} Yovarin Technologies. All rights reserved. Architected with Next.js 14 &amp; Tailwind CSS.
          </div>

          <div className="flex items-center gap-4">
            <span className="text-slate-500">
              ERPNext &amp; Frappe are registered trademarks of Frappe Technologies.
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-white/80 dark:bg-slate-900 hover:bg-gold-500/20 text-gold-600 dark:text-gold-400 border border-gold-500/20 transition-all flex items-center gap-1 cursor-pointer shadow-sm"
              title="Back to Top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
