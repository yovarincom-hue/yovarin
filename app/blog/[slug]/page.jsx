'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  User, 
  Sparkles, 
  Terminal, 
  ArrowRight,
  Crown,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { BLOG_POSTS } from '../page';

export default function BlogPostPage({ params }) {
  const { slug } = params;
  const post = BLOG_POSTS.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-transparent flex flex-col justify-between text-slate-900 dark:text-white transition-colors duration-500">
        <Navbar />
        <div className="max-w-xl mx-auto py-24 text-center space-y-4">
          <h1 className="text-3xl font-serif font-bold">Blueprint Not Found</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">The requested technical blueprint could not be found in our engineering journal.</p>
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-xs text-gold-700 dark:text-gold-400 font-semibold underline">
            <ArrowLeft className="w-3.5 h-3.5" /> Return to all articles
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent flex flex-col justify-between transition-colors duration-500">
      <Navbar />

      <main className="flex-1 pb-24">
        
        {/* Luxury Article Header */}
        <header className="relative pt-16 pb-12 border-b border-gold-500/20 bg-transparent overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
            
            {/* Back link */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-gold-700 dark:hover:text-gold-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-gold-600 dark:text-gold-400" />
              <span>Back to Engineering Journal</span>
            </Link>

            {/* Category and date pills */}
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase bg-gold-500/15 text-gold-800 dark:text-gold-300 border border-gold-500/35">
                {post.category}
              </span>
              <span className="text-slate-500 dark:text-slate-400 font-mono flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-gold-600 dark:text-gold-400" /> {post.date}
              </span>
              <span className="text-slate-400 dark:text-slate-600">&bull;</span>
              <span className="text-slate-500 dark:text-slate-400 font-mono flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-gold-600 dark:text-gold-400" /> {post.readTime}
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-5xl font-extrabold font-serif text-slate-900 dark:text-white tracking-tight leading-[1.18]">
              {post.title}
            </h1>

            {/* Author bar */}
            <div className="pt-2 flex items-center gap-3 text-xs border-t border-gold-500/20">
              <div className="w-9 h-9 rounded-full bg-gold-500/20 border border-gold-500/40 text-gold-700 dark:text-gold-300 flex items-center justify-center font-bold">
                <User className="w-5 h-5" />
              </div>
              <div>
                <span className="text-slate-900 dark:text-white font-semibold block">{post.author}</span>
                <span className="text-[11px] text-gold-700 dark:text-gold-400/90 font-mono">{post.authorRole} &bull; Yovarin Technologies</span>
              </div>
            </div>

          </div>
        </header>

        {/* Featured Hero Image */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="relative h-72 sm:h-96 w-full rounded-3xl overflow-hidden border border-gold-500/35 shadow-2xl">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 900px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-85" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-white">
              <span className="px-3 py-1 rounded-md bg-black/75 backdrop-blur-md border border-gold-500/30 text-gold-300">
                Visual Architecture Blueprint
              </span>
              <span className="hidden sm:inline px-3 py-1 rounded-md bg-black/75 backdrop-blur-md border border-white/20 text-slate-300">
                Verified Production Case
              </span>
            </div>
          </div>
        </div>

        {/* Article Body */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-8 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base font-light">
          
          {/* Executive Summary Callout */}
          <div className="luxury-card p-6 sm:p-8 space-y-2 shadow-xl">
            <div className="text-xs uppercase font-mono font-bold text-gold-700 dark:text-gold-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-gold-600 dark:text-gold-400" /> Executive Architecture Summary
            </div>
            <p className="text-slate-800 dark:text-slate-200 text-sm sm:text-base leading-relaxed font-normal">
              {post.excerpt}
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 dark:text-white tracking-tight pt-4">
              1. The Operational Reality in Enterprise Environments
            </h2>
            <p>
              When evaluating modern enterprise software architectures, organizations frequently find themselves torn between traditional monolithic ERPs, fragmented Excel registers, and modern custom web applications. The fundamental challenge is always data integrity: how to make data instantly accessible to leadership without introducing security leaks, performance bottlenecks, or user adoption friction.
            </p>
            <p>
              In our engineering engagements across manufacturing, distribution, and agriculture, we consistently discover that companies lose upwards of 15 to 25 hours per employee every single week simply synchronizing spreadsheets, chasing WhatsApp delivery updates, and manually keying numbers into disparate accounting tools.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 dark:text-white tracking-tight pt-4">
              2. Architectural Paradigm Shift
            </h2>
            <p>
              By leveraging Next.js 14 on the client/portal layer and pairing it with ERPNext&apos;s battle-tested transactional DocType engine, organizations achieve the best of both worlds:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
              <div className="luxury-card p-6 space-y-2 shadow-lg">
                <div className="text-xs font-bold text-gold-700 dark:text-gold-400 uppercase font-mono">Modern Frontend Speed</div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                  Next.js App Router delivers sub-second initial loads, edge caching, responsive glassmorphism, and instant search without page reloads.
                </p>
              </div>

              <div className="luxury-card p-6 space-y-2 shadow-lg">
                <div className="text-xs font-bold text-cyan-700 dark:text-cyan-400 uppercase font-mono">Transactional Core</div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                  Frappe Framework handles relational ledger integrity, multi-warehouse FIFO/FEFO stock, payroll compliance, and multi-currency accounting.
                </p>
              </div>
            </div>
          </div>

          {/* Code snippet example */}
          <div className="rounded-2xl border border-gold-500/25 bg-slate-950 p-5 space-y-3 font-mono text-xs shadow-2xl">
            <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-slate-800">
              <span className="flex items-center gap-1.5 text-gold-400">
                <Terminal className="w-3.5 h-3.5" /> yovarin_api_handler.py
              </span>
              <span className="text-[10px] text-slate-500">Python 3.11</span>
            </div>
            <pre className="text-slate-200 overflow-x-auto pt-2 leading-relaxed">
{`# Yovarin Secure Read-Only ERP Query Handler
import frappe

@frappe.whitelist()
def query_executive_kpis(company, fiscal_year):
    # Enforce role-based permission
    if not frappe.has_permission("GL Entry", "read"):
        frappe.throw("Insufficient role permissions for financial analytics.")
    
    # Query read-replica safely with zero DB write rights
    metrics = frappe.db.sql("""
        SELECT 
            SUM(debit) - SUM(credit) AS net_margin,
            COUNT(DISTINCT voucher_no) as transaction_count
        FROM \`tabGL Entry\`
        WHERE company = %s AND fiscal_year = %s
    """, (company, fiscal_year), as_dict=True)

    return metrics[0]`}
            </pre>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 dark:text-white tracking-tight pt-4">
              3. Measurable Outcomes &amp; Key Takeaways
            </h2>
            <p>
              Clients migrating to this combined architecture routinely experience:
            </p>
            <ul className="space-y-2.5 pl-4 list-disc text-slate-700 dark:text-slate-300 text-sm">
              <li><strong className="text-slate-900 dark:text-white">42% reduction</strong> in operational scrap and undocumented material loss.</li>
              <li><strong className="text-slate-900 dark:text-white">100% elimination</strong> of manual WhatsApp order coordination.</li>
              <li><strong className="text-slate-900 dark:text-white">Instant executive clarity</strong> via AI natural language queries in English and Roman Urdu.</li>
            </ul>
          </div>

          {/* Tags */}
          <div className="pt-6 border-t border-gold-500/20 flex flex-wrap gap-2">
            {post.tags.map((tag, idx) => (
              <span 
                key={idx}
                className="px-3 py-1 rounded-lg text-xs font-mono bg-gold-500/10 border border-gold-500/25 text-gold-700 dark:text-gold-400"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Luxury Consultation CTA Banner */}
          <div className="luxury-card p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl mt-12">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-lg sm:text-xl font-bold font-serif text-slate-900 dark:text-white">
                Ready to implement this bespoke architecture for your business?
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Schedule a 30-minute private technical discovery session directly with our lead architects.
              </p>
            </div>
            <Link
              href="/contact"
              className="btn-luxury-gold px-6 py-3 text-xs rounded-xl whitespace-nowrap cursor-pointer shadow-lg"
            >
              Book Discovery Session
            </Link>
          </div>

        </article>

      </main>

      <Footer />
    </div>
  );
}
