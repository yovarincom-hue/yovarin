'use client';

import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  Send, 
  ShieldCheck, 
  Building2, 
  User, 
  Mail, 
  Phone, 
  Briefcase, 
  Calendar,
  Sparkles,
  Crown,
  Clock,
  Lock
} from 'lucide-react';

export default function ConsultationModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    industry: 'Industrial & Manufacturing',
    users: '25-50 Users',
    timeline: 'Within 1-2 Months',
    modules: ['Accounting', 'Inventory', 'Manufacturing', 'Pilot AI'],
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const toggleModule = (mod) => {
    if (formData.modules.includes(mod)) {
      setFormData({
        ...formData,
        modules: formData.modules.filter(m => m !== mod)
      });
    } else {
      setFormData({
        ...formData,
        modules: [...formData.modules, mod]
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit inquiry');
      }
      setSubmitted(true);
    } catch (err) {
      console.error('Submission error:', err);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-slate-950 dark:bg-obsidian-950 border border-gold-500/40 rounded-3xl shadow-2xl shadow-black/90 overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-obsidian-950 via-slate-900 to-obsidian-950 border-b border-gold-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gold-500/15 text-gold-400 border border-gold-500/30 flex items-center justify-center">
              <Crown className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold font-serif text-white flex items-center gap-2">
                Private Technical Consultation &bull; Architecture Scope
              </h3>
              <p className="text-[11px] text-gold-400/90 font-mono">
                Direct engagement with Yovarin Principal Solutions Architects
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-gold-500/20 text-gold-300 border border-gold-500/40 flex items-center justify-center mx-auto shadow-xl">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-bold font-serif text-white">
                Consultation Request Confirmed
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed font-light">
                Thank you, <strong className="text-white font-medium">{formData.name}</strong>. Our senior technical team is reviewing your operational parameters for <strong className="text-white font-medium">{formData.company}</strong>. We will reach out via WhatsApp/Email within <strong className="text-gold-300">4 business hours</strong>.
              </p>

              <div className="p-5 rounded-2xl bg-slate-900/90 border border-gold-500/20 text-xs text-left max-w-md mx-auto space-y-2">
                <div className="text-[10px] uppercase font-mono text-gold-400 font-bold">Scope Parameters</div>
                <div className="flex justify-between text-slate-300">
                  <span>Industry:</span>
                  <span className="font-medium text-white">{formData.industry}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Target Scale:</span>
                  <span className="font-medium text-white">{formData.users}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Components:</span>
                  <span className="font-medium text-gold-300">{formData.modules.join(', ')}</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="btn-luxury-gold px-8 py-3 text-xs rounded-xl"
                >
                  Return to Platform
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 font-mono">
                    <User className="w-3.5 h-3.5 text-gold-400" /> Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Tariq Mehmood"
                    className="w-full bg-slate-900 border border-slate-800 focus:border-gold-400 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                  />
                </div>

                {/* Work Email */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 font-mono">
                    <Mail className="w-3.5 h-3.5 text-gold-400" /> Corporate Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="tariq@company.com"
                    className="w-full bg-slate-900 border border-slate-800 focus:border-gold-400 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Phone / WhatsApp */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 font-mono">
                    <Phone className="w-3.5 h-3.5 text-gold-400" /> Direct WhatsApp / Mobile *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+92 300 1234567"
                    className="w-full bg-slate-900 border border-slate-800 focus:border-gold-400 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                  />
                </div>

                {/* Company Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 font-mono">
                    <Building2 className="w-3.5 h-3.5 text-gold-400" /> Enterprise / Entity Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Apex Industrial Group"
                    className="w-full bg-slate-900 border border-slate-800 focus:border-gold-400 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Industry */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 font-mono">
                    Industry Domain
                  </label>
                  <select
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 focus:border-gold-400 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none"
                  >
                    <option>Industrial Cable &amp; Manufacturing</option>
                    <option>FMCG, Food &amp; Retail Wholesale</option>
                    <option>Livestock, Dairy &amp; Genetics</option>
                    <option>Energy, Telecom &amp; Contracting</option>
                    <option>Next.js Custom SaaS / Digital Platform</option>
                    <option>Other Enterprise Vertical</option>
                  </select>
                </div>

                {/* Team Size */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 font-mono">
                    Target User Scope
                  </label>
                  <select
                    value={formData.users}
                    onChange={(e) => setFormData({ ...formData, users: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 focus:border-gold-400 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none"
                  >
                    <option>10 - 25 Users</option>
                    <option>25 - 50 Users</option>
                    <option>50 - 150 Users</option>
                    <option>150+ Enterprise Tier</option>
                  </select>
                </div>
              </div>

              {/* Modules Checklist */}
              <div className="space-y-2 pt-1">
                <label className="text-xs font-semibold text-slate-300 block font-mono">
                  Select Architectural Pillars Needed:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    'Next.js Web',
                    'Custom SaaS',
                    'Accounting',
                    'Manufacturing',
                    'Inventory',
                    'AI Pilot Copilot',
                    'Desk Theme',
                    'HSE Mobile'
                  ].map((mod) => (
                    <button
                      key={mod}
                      type="button"
                      onClick={() => toggleModule(mod)}
                      className={`px-3 py-2 rounded-xl border text-[11px] font-medium text-left transition-all flex items-center justify-between ${
                        formData.modules.includes(mod)
                          ? 'bg-gold-500/20 border-gold-400 text-gold-300 font-semibold'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <span>{mod}</span>
                      {formData.modules.includes(mod) && <CheckCircle2 className="w-3.5 h-3.5 text-gold-400" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block font-mono">
                  Operational Context &amp; Key Challenges (Optional)
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="e.g. Currently tracking inventory across 25 spreadsheets and WhatsApp. Need real-time BOM routing and automated customer credit blocks..."
                  className="w-full bg-slate-900 border border-slate-800 focus:border-gold-400 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-luxury-gold w-full py-4 text-xs font-bold rounded-2xl flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer shadow-xl"
                >
                  {submitting ? (
                    <span>Dispatching Architectural Scope...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Scope &bull; Request Private 30-Min Call</span>
                    </>
                  )}
                </button>
                <div className="flex items-center justify-center gap-4 text-[10px] text-slate-500 mt-2 font-mono">
                  <span className="flex items-center gap-1 text-gold-400/90">
                    <ShieldCheck className="w-3.5 h-3.5 text-gold-400" /> Mutual NDA Guaranteed
                  </span>
                  <span className="flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5 text-slate-400" /> 256-Bit Encrypted
                  </span>
                </div>
              </div>

            </form>
          )}
        </div>
      </div>
    </div>
  );
}
