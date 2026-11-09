'use client';

import React, { useState } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  ShieldCheck
} from 'lucide-react';

const FAQS = [
  {
    q: "Why should we choose ERPNext & Frappe over SAP, NetSuite, or Odoo?",
    a: "SAP and NetSuite cost hundreds of thousands of dollars in recurring seat licenses and lock you into proprietary vendor ecosystems. Odoo charges per module and per user with frequent license changes. ERPNext is 100% open-source, written in modern Python/JS, contains all modules out-of-the-box (Manufacturing, Accounts, Stock, HR, CRM) with zero per-user licensing fees. You own your system and your data forever."
  },
  {
    q: "How does Yovarin Pilot AI guarantee zero data leaks?",
    a: "Yovarin Pilot operates under a strict 'Read-Only Replicated Architecture'. It queries an isolated read replica database, strictly inherits ERPNext's role-based permissions (so unauthorized staff cannot see payroll or sensitive margins), and connects to private, enterprise-grade LLM endpoints where your data is never used for model training or public indexing."
  },
  {
    q: "Our business has complex manufacturing with multi-level BOMs and subcontractors. Can Yovarin handle this?",
    a: "Yes. In fact, complex manufacturing (such as high-voltage industrial cable production, automotive components, and food processing) is our primary specialization. We configure multi-stage routing, workstation capacities, subcontractor copper/raw material transfer logs, and automated scrap variance tracking right on the shop floor."
  },
  {
    q: "How do you migrate our messy existing data from Excel spreadsheets and Tally?",
    a: "We have battle-tested automated migration pipelines. Our engineers first audit your spreadsheets, remove duplicate entries, normalize vendor/customer master records, reconcile opening balances, and run dry runs on a staging environment before touching your live production cutover."
  },
  {
    q: "Can we host ERPNext on our own dedicated private cloud server?",
    a: "Absolutely. We specialize in deploying ERPNext on dedicated, hardened Linux VPS instances (Hetzner, AWS, DigitalOcean, or your on-premises datacenter). We configure automated hourly off-site encrypted backups to Amazon S3, SSL hardening, Fail2ban firewalls, and 99.98% uptime monitoring."
  },
  {
    q: "What is included in Yovarin's post-launch SLA and maintenance agreement?",
    a: "Our monthly SLA covers 24/7 technical monitoring, security patch applications, disaster recovery drills, DocType updates as your business workflows evolve, and a dedicated bilingual (Urdu & English) helpdesk for your operational staff."
  }
];

export default function FaqSection({ onOpenConsultation }) {
  const [openIdx, setOpenIdx] = useState(0);

  const toggle = (idx) => {
    setOpenIdx(openIdx === idx ? -1 : idx);
  };

  return (
    <section id="faq" className="py-24 relative bg-transparent border-t border-gold-500/15">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gold-500/15 text-gold-800 dark:text-gold-300 border border-gold-500/30 font-mono">
            <HelpCircle className="w-3.5 h-3.5 text-gold-600 dark:text-gold-400" /> Answers for Decision Makers
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-slate-900 dark:text-white tracking-tight">
            Frequently Asked <span className="text-gradient-gold">Questions</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm font-light">
            Everything you need to know about Frappe, ERPNext licensing, data privacy, and implementation timelines.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`luxury-card overflow-hidden transition-all duration-300 ${isOpen ? 'shadow-lg shadow-gold-500/10' : ''}`}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-gold-500/5 transition-colors"
                >
                  <span className={`font-semibold text-sm sm:text-base transition-colors ${isOpen ? 'text-gradient-gold' : 'text-slate-900 dark:text-white'}`}>
                    {faq.q}
                  </span>
                  <div className={`p-1.5 rounded-lg transition-all duration-200 shrink-0 ${
                    isOpen 
                      ? 'rotate-180 bg-gold-500/20 text-gold-600 dark:text-gold-400 border border-gold-500/40' 
                      : 'bg-white/50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 border border-gold-500/20'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-gold-500/15">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Help */}
        <div className="mt-12 text-center text-xs text-slate-600 dark:text-slate-400">
          <span>Have a specific architectural or security inquiry? </span>
          <button
            onClick={onOpenConsultation}
            className="text-gold-700 dark:text-gold-400 hover:text-gold-900 dark:hover:text-gold-200 font-semibold underline ml-1 transition-colors"
          >
            Speak directly with a lead ERP architect →
          </button>
        </div>

      </div>
    </section>
  );
}
