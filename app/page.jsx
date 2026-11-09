'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProductsShowcase from '@/components/ProductsShowcase';
import PilotDemoSimulator from '@/components/PilotDemoSimulator';
import ServicesGrid from '@/components/ServicesGrid';
import RoiCalculator from '@/components/RoiCalculator';
import IndustrySolutions from '@/components/IndustrySolutions';
import ImplementationRoadmap from '@/components/ImplementationRoadmap';
import FaqSection from '@/components/FaqSection';
import Footer from '@/components/Footer';
import ConsultationModal from '@/components/ConsultationModal';
import StickyConcierge from '@/components/StickyConcierge';
import InstantAssessment from '@/components/InstantAssessment';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Globe, 
  Laptop, 
  ArrowRight, 
  BookOpen, 
  Clock 
} from 'lucide-react';
import { BLOG_POSTS } from './blog/page';

export default function HomePage() {
  const [consultationOpen, setConsultationOpen] = useState(false);

  const handleOpenConsultation = () => setConsultationOpen(true);
  const handleCloseConsultation = () => setConsultationOpen(false);

  const recentPosts = BLOG_POSTS.slice(0, 3);

  return (
    <div className="relative min-h-screen flex flex-col justify-between transition-colors duration-500">
      {/* Navigation with Dark/Light Mode Toggle & Luxury Monogram */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1">
        
        {/* Luxury Hero Section */}
        <Hero 
          onOpenConsultation={handleOpenConsultation}
          onOpenPilotDemo={() => {
            const el = document.getElementById('home-pilot-demo');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* High-Converting Interactive Architecture Matcher */}
        <InstantAssessment />

        {/* Featured Capabilities Banner: Next.js Web Dev & SaaS */}
        <section className="py-14 border-y border-gold-500/20 bg-ivory-200/60 dark:bg-obsidian-900/80 backdrop-blur-md transition-colors duration-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center md:text-left">
                <span className="text-[10px] uppercase font-mono font-bold text-gold-700 dark:text-gold-400 bg-gold-500/10 px-2.5 py-1 rounded-full border border-gold-500/30">
                  Full-Stack Enterprise Engineering
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 dark:text-white mt-1">
                  Bespoke Next.js 14 Web Development &amp; Cloud SaaS Applications
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl font-light">
                  Beyond ERPNext, Yovarin architects bespoke high-performance websites, customer self-service portals, and cloud SaaS platforms built on Next.js 14, React, and enterprise APIs.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <Link
                  href="/services#web-development"
                  className="px-5 py-3 text-xs font-semibold text-gold-800 dark:text-gold-300 bg-white/80 dark:bg-slate-900 hover:bg-gold-500/10 dark:hover:bg-slate-800 border border-gold-500/30 rounded-xl transition-all flex items-center gap-2 shadow-sm"
                >
                  <Globe className="w-4 h-4 text-gold-600 dark:text-gold-400" />
                  <span>Web Development</span>
                </Link>
                <Link
                  href="/services#web-apps"
                  className="btn-luxury-gold px-5 py-3 text-xs rounded-xl flex items-center gap-2 cursor-pointer"
                >
                  <Laptop className="w-4 h-4" />
                  <span>Web Apps &amp; SaaS</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Proprietary Products Preview */}
        <section className="relative">
          <ProductsShowcase onOpenConsultation={handleOpenConsultation} />
          <div className="text-center pb-12">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-xs font-semibold text-gold-700 dark:text-gold-400 hover:text-gold-500 transition-colors underline font-mono"
            >
              <span>Explore Dedicated Products Suite (Theme Studio &amp; AI Specs)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        {/* Interactive Pilot AI Simulator */}
        <div id="home-pilot-demo" className="scroll-mt-20">
          <PilotDemoSimulator onOpenConsultation={handleOpenConsultation} />
        </div>

        {/* Core Services Grid */}
        <section className="relative">
          <ServicesGrid onOpenConsultation={handleOpenConsultation} />
          <div className="text-center pb-12">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-xs font-semibold text-gold-700 dark:text-gold-400 hover:text-gold-500 transition-colors underline font-mono"
            >
              <span>View All 8 Enterprise Service Pillars &amp; Technology Stacks</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        {/* Interactive ROI Calculator */}
        <section className="relative">
          <RoiCalculator onOpenConsultation={handleOpenConsultation} />
          <div className="text-center pb-12">
            <Link
              href="/calculator"
              className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-500 transition-colors underline font-mono"
            >
              <span>Open Full Screen ROI Financial Feasibility Model</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        {/* Industry Solutions & Case Studies */}
        <section className="relative">
          <IndustrySolutions onOpenConsultation={handleOpenConsultation} />
          <div className="text-center pb-12">
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-700 dark:text-cyan-400 hover:text-cyan-500 transition-colors underline font-mono"
            >
              <span>Explore In-Depth Client Case Studies &amp; Audited Metrics</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        {/* 4-Phase Implementation Framework */}
        <ImplementationRoadmap onOpenConsultation={handleOpenConsultation} />

        {/* Recent Blog Articles Section on Home with Visual Images */}
        <section className="py-24 border-t border-gold-500/20 bg-ivory-200/40 dark:bg-obsidian-950/60 backdrop-blur-sm transition-colors duration-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gold-500/15 text-gold-800 dark:text-gold-400 border border-gold-500/30 mb-2 font-mono">
                  <BookOpen className="w-3.5 h-3.5" /> Technical Journal
                </div>
                <h2 className="text-2xl sm:text-4xl font-serif font-bold text-slate-900 dark:text-white">
                  Latest Blueprints from the Engineering Team
                </h2>
              </div>
              <Link
                href="/blog"
                className="btn-luxury-gold px-5 py-2.5 text-xs rounded-xl flex items-center gap-2"
              >
                <span>Browse All Articles</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {recentPosts.map((post) => (
                <article
                  key={post.slug}
                  className="rounded-3xl border border-gold-500/20 bg-white/80 dark:bg-obsidian-900/80 overflow-hidden flex flex-col justify-between hover:border-gold-400/50 hover:shadow-2xl hover:shadow-gold-500/10 transition-all duration-300 group shadow-md"
                >
                  <div>
                    {/* Visual Card Image */}
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500 brightness-95 group-hover:brightness-100"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent dark:block hidden" />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold uppercase bg-slate-950/80 text-gold-300 border border-gold-500/30 backdrop-blur-md">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 space-y-2.5">
                      <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 flex items-center justify-between">
                        <span>{post.date}</span>
                        <span className="text-gold-700 dark:text-gold-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {post.readTime}
                        </span>
                      </div>

                      <Link href={`/blog/${post.slug}`}>
                        <h3 className="text-base sm:text-lg font-bold font-serif text-slate-900 dark:text-white group-hover:text-gold-600 dark:group-hover:text-gold-300 transition-colors leading-snug">
                          {post.title}
                        </h3>
                      </Link>

                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3 font-light">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0 border-t border-gold-500/15 mt-4 flex items-center justify-between text-xs">
                    <span className="text-slate-500 dark:text-slate-400 font-medium text-[11px]">{post.author}</span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-gold-700 dark:text-gold-400 hover:text-gold-900 dark:hover:text-gold-300 font-semibold flex items-center gap-1 text-xs"
                    >
                      <span>Read Blueprint</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Enterprise Decision-Maker FAQ */}
        <FaqSection onOpenConsultation={handleOpenConsultation} />

      </main>

      {/* Footer */}
      <Footer />

      {/* Sticky High-Converting VIP Concierge */}
      <StickyConcierge />

      {/* Consultation Modal */}
      <ConsultationModal 
        isOpen={consultationOpen}
        onClose={handleCloseConsultation}
      />
    </div>
  );
}
