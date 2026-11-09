'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ConsultationModal from '@/components/ConsultationModal';
import { 
  Globe, 
  Code2, 
  Layers, 
  Cpu, 
  Database, 
  Factory, 
  Server, 
  Smartphone, 
  GraduationCap, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Sparkles,
  Laptop,
  Terminal,
  Workflow
} from 'lucide-react';
import Link from 'next/link';

const ALL_SERVICES = [
  {
    id: "web-development",
    badge: "High-Performance Frontend",
    icon: Globe,
    title: "Custom Web Development",
    subtitle: "Blazing Fast Next.js 14 & Modern React Engineering",
    description: "We architect ultra-fast, search-engine-optimized, and visually stunning corporate websites that represent your brand with distinction. Powered by Next.js Server-Side Rendering (SSR), Static Generation (SSG), and edge CDNs.",
    highlights: [
      "Sub-second load times & 99+ Core Web Vitals score",
      "Tailwind CSS with responsive glassmorphism & dark mode",
      "Semantic HTML & technical SEO built for ranking",
      "Global CDN caching & automated CI/CD deployment"
    ],
    techStack: ["Next.js 14", "React", "Tailwind CSS", "TypeScript", "Vercel", "AWS CloudFront"]
  },
  {
    id: "web-apps",
    badge: "Full-Stack SaaS & Portals",
    icon: Laptop,
    title: "Web Applications & SaaS Systems",
    subtitle: "Scalable Multi-Tenant Portals & Custom Business Tools",
    description: "Turn manual operational bottlenecks into custom, automated web applications. Whether you need a customer self-service portal, vendor supplier management system, or custom SaaS dashboard, we build robust, secure platforms.",
    highlights: [
      "Role-Based Access Control (RBAC) & Single Sign-On (SSO)",
      "Real-time WebSocket data updates & live notifications",
      "High-throughput RESTful & GraphQL microservice APIs",
      "Interactive data visualizations & analytical export tools"
    ],
    techStack: ["Next.js", "Node.js", "PostgreSQL", "Redis", "Prisma", "Docker", "WebSockets"]
  },
  {
    id: "erp-implementation",
    badge: "Core Enterprise Specialization",
    icon: Workflow,
    title: "Full-Cycle ERPNext Implementation",
    subtitle: "From Chaos to Centralized Operational Clarity",
    description: "We don't do generic one-click installations. Our senior engineers analyze your specific factory or office workflows, map every form, configure approvals, and ensure 100% user adoption across every department.",
    highlights: [
      "In-depth operational audit & process blueprinting",
      "Custom approval hierarchies & notification triggers",
      "Comprehensive User Acceptance Testing (UAT)",
      "Guaranteed on-time production cutover"
    ],
    techStack: ["ERPNext v15", "Frappe Framework", "Python", "MariaDB", "Linux", "Gunicorn"]
  },
  {
    id: "frappe-engineering",
    badge: "Upgrade-Safe Custom Apps",
    icon: Cpu,
    title: "Custom DocTypes & Frappe Apps",
    subtitle: "Tailored Python & JavaScript Module Engineering",
    description: "When standard ERP features don't capture your unique business logic, we engineer custom Frappe apps that remain 100% upgrade-safe across major ERPNext releases without breaking your core code.",
    highlights: [
      "Modular Frappe application architecture",
      "Custom Python document hooks & server scripts",
      "Tailored barcode generation & thermal print formats",
      "Bespoke executive dashboards with real-time KPI cards"
    ],
    techStack: ["Frappe App SDK", "Python 3.11+", "JavaScript", "Jinja2", "REST API Hooks"]
  },
  {
    id: "data-migration",
    badge: "Zero-Data-Loss Migration",
    icon: Database,
    title: "Legacy Data Migration & Cleaning",
    subtitle: "Transition from Excel, Tally & Old Accounting Systems",
    description: "Moving from 50 disjointed Excel spreadsheets, QuickBooks, or Tally? We deduplicate records, normalize customer/vendor masters, reconcile opening balances, and safely import your entire historical ledger.",
    highlights: [
      "Automated deduplication & master schema cleansing",
      "Double-entry opening balance verification",
      "Dry-run simulation on isolated staging instances",
      "Zero-downtime cutover with historical record audit"
    ],
    techStack: ["Python Pandas", "SQL ETL", "Excel Sanitizers", "Frappe Data Import Tool"]
  },
  {
    id: "cloud-hosting",
    badge: "Private Hardened Cloud",
    icon: Server,
    title: "Dedicated Cloud VPS Hosting & 24/7 SLA",
    subtitle: "Isolated Servers with 99.98% Guaranteed Uptime",
    description: "We host your ERP and web applications on dedicated, high-performance private cloud VPS instances with kernel-level security hardening, automated hourly encrypted off-site backups, and 24/7 proactive monitoring.",
    highlights: [
      "Zero shared-server neighbor interference",
      "Automated hourly backups encrypted and pushed to Amazon S3",
      "Fail2ban, custom firewalls, and SSL certificate rotation",
      "Instant one-click disaster recovery snapshots"
    ],
    techStack: ["Hetzner / AWS / DigitalOcean", "Linux Ubuntu", "Amazon S3", "Nginx", "Fail2ban"]
  },
  {
    id: "manufacturing-bom",
    badge: "Shop-Floor Visibility",
    icon: Factory,
    title: "Manufacturing & Multi-Level BOMs",
    subtitle: "Shop-Floor Tracking, Routing & Subcontracting",
    description: "Gain complete transparency over raw materials, routing operations, work orders, subcontractor transfers, and scrap metrics with real-time shop-floor terminals built for factory floors.",
    highlights: [
      "Multi-tier Bills of Materials (BOM) with scrap tracking",
      "Machine workstation capacity & shift scheduling",
      "Subcontractor material delivery & return reconciliation",
      "Operator touchscreen barcode terminals"
    ],
    techStack: ["ERPNext Manufacturing", "Job Cards", "Routing Engine", "Barcode Scanners"]
  },
  {
    id: "mobile-field",
    badge: "Field Operations",
    icon: Smartphone,
    title: "Mobile Field Forms & HSE Tracking",
    subtitle: "Mobile Solutions for Energy, Telecom & Field Crews",
    description: "Empower field technicians and inspectors with lightweight mobile-friendly forms, GPS geofencing, offline caching, and photo evidence capture that instantly sync with central ERP.",
    highlights: [
      "Health, Safety & Environment (HSE) incident logging",
      "Offline-first form submission with auto-sync",
      "Customer digital signature & photo evidence capture",
      "Fleet, equipment & technician geo-tagging"
    ],
    techStack: ["PWA", "Next.js Mobile", "Frappe REST API", "GPS Geofencing"]
  }
];

export default function ServicesPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const handleOpenConsultation = (serviceTitle) => {
    setSelectedService(serviceTitle);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-transparent flex flex-col justify-between transition-colors duration-500">
      <Navbar />

      <main className="flex-1 pb-24">
        
        {/* Services Page Header */}
        <section className="relative pt-16 pb-20 border-b border-gold-500/20 bg-transparent overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gold-500/15 text-gold-800 dark:text-gold-300 border border-gold-500/30">
              <Code2 className="w-3.5 h-3.5 text-gold-600 dark:text-gold-400" /> Engineering &amp; Implementation Services
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-extrabold font-serif text-slate-900 dark:text-white tracking-tight">
              Enterprise Web Development, Custom Web Apps &amp; <span className="text-gradient-gold">ERPNext Solutions</span>
            </h1>

            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-light">
              We design and build cutting-edge digital experiences: from high-performance Next.js web applications to end-to-end ERP implementations that streamline manufacturing, accounting, and supply chains.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => handleOpenConsultation('General Services Inquiry')}
                className="px-6 py-3 text-xs font-bold text-slate-950 bg-gradient-to-r from-brand-400 to-emerald-400 hover:from-brand-300 hover:to-emerald-300 rounded-xl transition-all shadow-lg shadow-brand-500/25 flex items-center gap-2"
              >
                <span>Request Custom Technical Scope</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <Link
                href="/calculator"
                className="btn-luxury-outline px-5 py-3 text-xs font-semibold rounded-xl"
              >
                Estimate ERP ROI
              </Link>
            </div>
          </div>
        </section>

        {/* Services In-Depth List */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {ALL_SERVICES.map((srv) => {
              const Icon = srv.icon;
              return (
                <div
                  key={srv.id}
                  id={srv.id}
                  className="luxury-card luxury-card-hover p-8 flex flex-col justify-between transition-all duration-300 shadow-xl group scroll-mt-24"
                >
                  <div className="space-y-5">
                    
                    {/* Badge and Icon */}
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-xl bg-gold-500/15 border border-gold-500/30 text-gold-600 dark:text-gold-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-mono uppercase font-bold text-gold-800 dark:text-gold-300 bg-gold-500/15 px-2.5 py-1 rounded-md border border-gold-500/30">
                        {srv.badge}
                      </span>
                    </div>

                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 dark:text-white group-hover:text-gold-700 dark:group-hover:text-gold-300 transition-colors">
                        {srv.title}
                      </h2>
                      <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">
                        {srv.subtitle}
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {srv.description}
                    </p>

                    {/* Highlights */}
                    <div className="space-y-2 pt-2 border-t border-gold-500/15">
                      {srv.highlights.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-gold-600 dark:text-gold-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech stack tags */}
                    <div className="pt-2 flex flex-wrap gap-1.5">
                      {srv.techStack.map((tech, tIdx) => (
                        <span 
                          key={tIdx} 
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/60 dark:bg-slate-900/60 border border-gold-500/25 text-slate-600 dark:text-slate-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                  </div>

                  {/* Action CTA */}
                  <div className="pt-6 border-t border-gold-500/15 mt-6">
                    <button
                      onClick={() => handleOpenConsultation(srv.title)}
                      className="btn-luxury-gold w-full py-2.5 text-xs font-semibold rounded-xl flex items-center justify-center gap-2"
                    >
                      <span>Inquire About {srv.title}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Bottom Banner */}
          <div className="luxury-card p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="space-y-1 text-center md:text-left">
              <h3 className="text-lg font-bold font-serif text-slate-900 dark:text-white flex items-center justify-center md:justify-start gap-2">
                <ShieldCheck className="w-5 h-5 text-gold-600 dark:text-gold-400" />
                Need a Custom Combination of Web App &amp; ERP Integration?
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 max-w-xl">
                We specialize in connecting high-performance Next.js web applications and customer portals directly to ERPNext backend DocTypes and APIs.
              </p>
            </div>
            <button
              onClick={() => handleOpenConsultation('Full Stack Next.js + ERP Integration')}
              className="btn-luxury-gold px-6 py-3 text-xs font-bold rounded-xl whitespace-nowrap"
            >
              Talk to Our Lead Architect
            </button>
          </div>

        </section>

      </main>

      <Footer />

      <ConsultationModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
      />
    </div>
  );
}
