'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FaqSection from '@/components/FaqSection';
import { 
  PhoneCall, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  Send, 
  Building2, 
  User, 
  Phone, 
  Briefcase, 
  Clock, 
  Calendar,
  Sparkles
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    industry: 'Industrial & Manufacturing',
    users: '25-50 Users',
    service: 'Full ERP Implementation',
    timeline: 'Within 1-2 Months',
    modules: ['Accounting', 'Inventory', 'Manufacturing', 'Web Development'],
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

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
    <div className="min-h-screen bg-transparent flex flex-col justify-between transition-colors duration-500">
      <Navbar />

      <main className="flex-1 pb-24">
        
        {/* Header */}
        <section className="relative pt-16 pb-12 border-b border-gold-500/20 bg-transparent overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gold-500/15 text-gold-800 dark:text-gold-300 border border-gold-500/30 font-mono">
              <PhoneCall className="w-3.5 h-3.5 text-gold-600 dark:text-gold-400" /> Direct Technical Engagement
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-extrabold font-serif text-slate-900 dark:text-white tracking-tight">
              Schedule Your <span className="text-gradient-gold">Architecture &amp; Process Audit</span>
            </h1>

            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-light">
              Connect directly with our senior Frappe architects and full-stack web engineers. No junior salespeople. We review your existing workflow bottlenecks and deliver a concrete blueprint.
            </p>
          </div>
        </section>

        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Contact Details Left Panel */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="luxury-card p-6 sm:p-8 space-y-6">
                <h2 className="text-xl font-bold font-serif text-slate-900 dark:text-white">Direct Channels</h2>
                
                <div className="space-y-4 text-xs">
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-xl bg-gold-500/15 border border-gold-500/30 text-gold-600 dark:text-gold-400 shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <strong className="text-slate-900 dark:text-white block font-semibold text-sm">Email Technical Inquiries</strong>
                      <span className="text-slate-600 dark:text-slate-300 font-mono">yovarin.com@gmail.com</span>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Average response: Under 4 business hours</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-xl bg-gold-500/15 border border-gold-500/30 text-gold-600 dark:text-gold-400 shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <strong className="text-slate-900 dark:text-white block font-semibold text-sm">Direct Phone &amp; WhatsApp</strong>
                      <span className="text-slate-600 dark:text-slate-300 font-mono">+92 309 0687624</span>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Urgent client support: 24/7 priority SLA</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-xl bg-gold-500/15 border border-gold-500/30 text-gold-600 dark:text-gold-400 shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <strong className="text-slate-900 dark:text-white block font-semibold text-sm">Engineering Headquarters</strong>
                      <span className="text-slate-600 dark:text-slate-300">Lahore, Pakistan</span>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Serving enterprise clients across North America, Middle East, and Asia.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gold-500/20 space-y-3">
                  <span className="text-xs uppercase font-mono text-gold-700 dark:text-gold-400 font-bold block">
                    Our Engagement Guarantee:
                  </span>
                  <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-gold-600 dark:text-gold-400" />
                      <span>Mutual Non-Disclosure Agreement (NDA) on request</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-gold-600 dark:text-gold-400" />
                      <span>Direct discussion with practicing lead engineers</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-gold-600 dark:text-gold-400" />
                      <span>Zero high-pressure sales tactics</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Response SLA badge */}
              <div className="luxury-card p-4 flex items-center gap-3">
                <Clock className="w-5 h-5 text-gold-600 dark:text-gold-400 shrink-0" />
                <div className="text-xs text-slate-600 dark:text-slate-300">
                  <strong className="text-slate-900 dark:text-white block font-medium">Guaranteed Fast Response</strong>
                  All consultation requests received during business hours are reviewed within 4 hours.
                </div>
              </div>

            </div>

            {/* Contact Form Right Panel */}
            <div className="lg:col-span-7">
              <div className="luxury-card p-6 sm:p-10 shadow-2xl">
                {submitted ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-gold-500/20 text-gold-600 dark:text-gold-400 border border-gold-500/40 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-bold font-serif text-slate-900 dark:text-white">
                      Consultation Request Confirmed!
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                      Thank you, <strong className="text-slate-900 dark:text-white">{formData.name}</strong>. Our senior technical team is reviewing your operational parameters for <strong className="text-slate-900 dark:text-white">{formData.company}</strong> and will reach out via WhatsApp/Email within 4 hours.
                    </p>
                    <div className="pt-4">
                      <button
                        onClick={() => setSubmitted(false)}
                        className="btn-luxury-gold px-6 py-2.5 text-xs font-bold rounded-xl"
                      >
                        Submit Another Inquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="border-b border-gold-500/20 pb-4 mb-2">
                      <h2 className="text-xl font-bold font-serif text-slate-900 dark:text-white">Project Scope &amp; RFQ Form</h2>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Fill in your requirements below for an accurate technical estimate.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-gold-600 dark:text-gold-400" /> Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Rizwan"
                          className="w-full bg-white/90 dark:bg-slate-950/70 border border-gold-500/30 focus:border-gold-500 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-gold-600 dark:text-gold-400" /> Work Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="rizwan@company.com"
                          className="w-full bg-white/90 dark:bg-slate-950/70 border border-gold-500/30 focus:border-gold-500 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-gold-600 dark:text-gold-400" /> Phone / WhatsApp *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+92 309 0687624"
                          className="w-full bg-white/90 dark:bg-slate-950/70 border border-gold-500/30 focus:border-gold-500 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5 text-gold-600 dark:text-gold-400" /> Company / Enterprise *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="Apex Industries Ltd"
                          className="w-full bg-white/90 dark:bg-slate-950/70 border border-gold-500/30 focus:border-gold-500 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
                          Industry Sector
                        </label>
                        <select
                          value={formData.industry}
                          onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                          className="w-full bg-white/90 dark:bg-slate-950/70 border border-gold-500/30 focus:border-gold-500 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none"
                        >
                          <option>Industrial &amp; Manufacturing</option>
                          <option>FMCG, Food &amp; Distribution</option>
                          <option>Livestock, Genetics &amp; Agriculture</option>
                          <option>Energy, Telecom &amp; Field Contracting</option>
                          <option>E-Commerce &amp; Digital Brand</option>
                          <option>Other Enterprise</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
                          Primary Service Required
                        </label>
                        <select
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          className="w-full bg-white/90 dark:bg-slate-950/70 border border-gold-500/30 focus:border-gold-500 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none"
                        >
                          <option>Full ERP Implementation</option>
                          <option>Custom Web Development (Next.js)</option>
                          <option>Web Application / SaaS Portal</option>
                          <option>Legacy Excel Data Migration</option>
                          <option>Yovarin Pilot AI Integration</option>
                          <option>Dedicated Cloud VPS Hosting</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-1">
                      <label className="text-xs font-medium text-slate-700 dark:text-slate-300 block">
                        Select Relevant Components:
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {[
                          'Next.js Web',
                          'SaaS Portal',
                          'Accounting',
                          'Manufacturing',
                          'Inventory',
                          'Pilot AI',
                          'Desk Theme',
                          'HSE Field'
                        ].map((mod) => (
                          <button
                            key={mod}
                            type="button"
                            onClick={() => toggleModule(mod)}
                            className={`px-2.5 py-1.5 rounded-lg border text-[11px] font-medium text-left transition-all flex items-center justify-between ${
                              formData.modules.includes(mod)
                                ? 'bg-gold-500/20 border-gold-500 text-gold-800 dark:text-gold-200 font-bold'
                                : 'bg-white/50 dark:bg-slate-900/50 border-gold-500/20 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                            }`}
                          >
                            <span>{mod}</span>
                            {formData.modules.includes(mod) && <CheckCircle2 className="w-3 h-3 text-gold-600 dark:text-gold-400" />}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-medium text-slate-700 dark:text-slate-300 block">
                        Current Workflow Context / Pain Points
                      </label>
                      <textarea
                        rows={3}
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        placeholder="Describe your current software setup (e.g., spreadsheets, Tally, custom web apps) and your main operational goals..."
                        className="w-full bg-white/90 dark:bg-slate-950/70 border border-gold-500/30 focus:border-gold-500 rounded-xl p-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="btn-luxury-gold w-full py-3.5 text-xs font-bold rounded-xl flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        {submitting ? (
                          <span>Submitting Technical Scope...</span>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            <span>Submit Technical Scope &amp; Request Call</span>
                          </>
                        )}
                      </button>
                    </div>

                  </form>
                )}
              </div>
            </div>

          </div>
        </section>

        {/* Embedded FAQ */}
        <FaqSection />

      </main>

      <Footer />
    </div>
  );
}
