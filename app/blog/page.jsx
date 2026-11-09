'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { 
  BookOpen, 
  Search, 
  Tag, 
  Calendar, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  User, 
  CheckCircle2,
  Mail,
  Crown
} from 'lucide-react';

export const BLOG_POSTS = [
  {
    slug: 'migrating-mern-to-nextjs-enterprise',
    title: 'Why We Transitioned from Legacy MERN Stack to Next.js 14 for Enterprise Web Applications',
    excerpt: 'Traditional client-rendered MERN (Vite + CRA + Express) architectures struggle with enterprise SEO, initial page load latency, and edge rendering. Discover how Next.js App Router solves these bottlenecks with sub-second speeds.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    category: 'Web Development',
    date: 'Nov 4, 2026',
    readTime: '6 min read',
    author: 'Yovarin Engineering Team',
    authorRole: 'Full-Stack Architects',
    featured: true,
    tags: ['Next.js 14', 'MERN Stack', 'React 19', 'Performance', 'SEO']
  },
  {
    slug: 'transition-spreadsheets-to-erpnext',
    title: 'The Blueprint: Moving from 20+ Excel Spreadsheets & WhatsApp Groups to ERPNext',
    excerpt: 'Manual registers and scattered WhatsApp groups cost SMBs up to 40% in hidden operational losses. Here is our step-by-step methodology to migrate safely without stopping daily shipments or cashflow.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    category: 'ERPNext & Frappe',
    date: 'Oct 28, 2026',
    readTime: '8 min read',
    author: 'Rizwan',
    authorRole: 'Principal ERP Architect',
    featured: false,
    tags: ['ERPNext', 'Data Migration', 'Digital Transformation', 'Operations']
  },
  {
    slug: 'read-only-ai-copilots-erp',
    title: 'Zero Data Leaks: How We Built Read-Only Enterprise AI Copilots with Frappe',
    excerpt: 'Connecting enterprise databases to generative AI is a massive security liability unless handled with strict isolation. Explore Yovarin Pilot’s read-only replication architecture and role-based permission enforcement.',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80',
    category: 'Enterprise AI',
    date: 'Oct 19, 2026',
    readTime: '7 min read',
    author: 'Bilal Qureshi',
    authorRole: 'AI Systems Lead',
    featured: false,
    tags: ['AI Copilot', 'ERP Security', 'Frappe', 'Python', 'LLM']
  },
  {
    slug: 'automating-manufacturing-boms-scrap-tracking',
    title: 'Automating Multi-Level BOMs & Copper Scrap Tracking on the Factory Floor',
    excerpt: 'How we helped industrial cable manufacturers eliminate raw material variance with touchscreen operator terminals, automated weight reconciliation, and subcontractor return tracking.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
    category: 'Manufacturing',
    date: 'Oct 11, 2026',
    readTime: '5 min read',
    author: 'Tariq Mehmood',
    authorRole: 'Industrial Operations Lead',
    featured: false,
    tags: ['Manufacturing', 'Bills of Materials', 'Cable Industry', 'Shop Floor']
  },
  {
    slug: 'building-custom-saas-portals-with-nextjs-frappe',
    title: 'Combining Next.js Frontend with Frappe Backend: The Modern SaaS Architecture',
    excerpt: 'Why building a lightweight Next.js client portal connected to Frappe’s battle-tested REST API gives you the speed of modern Jamstack with the full transactional power of an enterprise ERP.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    category: 'SaaS Architecture',
    date: 'Sep 29, 2026',
    readTime: '9 min read',
    author: 'Yovarin Engineering Team',
    authorRole: 'Core Systems',
    featured: false,
    tags: ['Web Applications', 'Frappe API', 'Next.js', 'SaaS Portals']
  },
  {
    slug: 'top-5-mistakes-erp-adoption',
    title: 'Top 5 Mistakes Small Enterprises Make When Implementing ERP (And How to Avoid Them)',
    excerpt: 'From buying too many modules upfront to ignoring staff training in local dialects like Urdu, these 5 critical oversights account for 80% of ERP implementation failures.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
    category: 'ERPNext & Frappe',
    date: 'Sep 15, 2026',
    readTime: '6 min read',
    author: 'Rizwan',
    authorRole: 'Principal ERP Architect',
    featured: false,
    tags: ['Change Management', 'Best Practices', 'Training', 'ROI']
  }
];

const CATEGORIES = [
  'All',
  'Web Development',
  'ERPNext & Frappe',
  'Enterprise AI',
  'Manufacturing',
  'SaaS Architecture'
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPost = BLOG_POSTS.find(p => p.featured) || BLOG_POSTS[0];

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    try {
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail }),
      });
      setSubscribed(true);
      setNewsletterEmail('');
    } catch (err) {
      console.error('Subscription error:', err);
      setSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 dark:bg-obsidian-950 flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 pb-24">
        
        {/* Luxury Journal Header */}
        <section className="relative pt-20 pb-16 border-b border-gold-500/20 bg-slate-950 dark:bg-obsidian-950 overflow-hidden">
          <div className="absolute inset-0 bg-grid-luxury opacity-40 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[320px] bg-gold-500/10 blur-[140px] rounded-full pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gold-500/15 text-gold-300 border border-gold-500/30 font-mono">
              <Crown className="w-3.5 h-3.5 text-gold-400" /> Engineering Journal &bull; Architecture Blueprints
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight font-serif">
              The <span className="text-gradient-gold">Yovarin</span> Dispatches
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-light">
              Bespoke architectural analyses, production benchmarks, and field notes on transitioning enterprises from chaotic spreadsheets into unified Next.js &amp; ERPNext systems.
            </p>

            {/* Search Input Bar */}
            <div className="pt-4 max-w-lg mx-auto relative flex items-center">
              <Search className="w-4 h-4 text-gold-500/60 absolute left-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search blueprints by topic, framework, or keyword..."
                className="w-full bg-slate-900/90 dark:bg-obsidian-900 border border-gold-500/30 focus:border-gold-400 rounded-xl pl-11 pr-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition-colors shadow-inner"
              />
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-12">
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${
                  selectedCategory === cat
                    ? 'btn-luxury-gold shadow-md'
                    : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white hover:border-gold-500/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Featured Post Card with Luxury Visual Banner */}
          {selectedCategory === 'All' && !searchQuery && featuredPost && (
            <div className="rounded-3xl border border-gold-500/35 bg-gradient-to-r from-slate-900 via-obsidian-900 to-slate-900 overflow-hidden shadow-2xl relative group">
              <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                
                {/* Image Half */}
                <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-full overflow-hidden">
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-slate-950/90" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full font-mono text-[10px] uppercase font-bold bg-gold-500/90 text-slate-950 shadow-lg flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3" /> Featured Blueprint
                    </span>
                  </div>
                </div>

                {/* Content Half */}
                <div className="lg:col-span-7 p-8 sm:p-12 space-y-5 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-3 text-xs">
                      <span className="text-gold-400 font-mono font-bold uppercase tracking-wider text-[11px]">
                        {featuredPost.category}
                      </span>
                      <span className="text-slate-600">&bull;</span>
                      <span className="text-slate-400 font-mono flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-gold-400" /> {featuredPost.date}
                      </span>
                      <span className="text-slate-600">&bull;</span>
                      <span className="text-slate-400 font-mono flex items-center gap-1">
                        <Clock className="w-3 h-3 text-gold-400" /> {featuredPost.readTime}
                      </span>
                    </div>

                    <Link href={`/blog/${featuredPost.slug}`}>
                      <h2 className="text-2xl sm:text-4xl font-bold font-serif text-white group-hover:text-gold-300 transition-colors leading-tight">
                        {featuredPost.title}
                      </h2>
                    </Link>

                    <p className="text-sm text-slate-300 leading-relaxed font-light">
                      {featuredPost.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3 text-xs">
                      <div className="w-8 h-8 rounded-full bg-gold-500/20 border border-gold-500/40 text-gold-300 flex items-center justify-center font-bold">
                        <User className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-white font-semibold block">{featuredPost.author}</span>
                        <span className="text-[10px] text-gold-400/80">{featuredPost.authorRole}</span>
                      </div>
                    </div>

                    <Link
                      href={`/blog/${featuredPost.slug}`}
                      className="btn-luxury-gold px-5 py-2.5 text-xs rounded-xl flex items-center gap-2"
                    >
                      <span>Read Blueprint</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                </div>

              </div>
            </div>
          )}

          {/* Articles Grid with Visual Image Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.slug}
                className="rounded-3xl border border-slate-800/90 dark:border-gold-500/20 bg-slate-900/70 dark:bg-obsidian-900/80 overflow-hidden flex flex-col justify-between hover:border-gold-400/50 hover:shadow-2xl hover:shadow-gold-500/10 transition-all duration-300 group"
              >
                <div>
                  {/* Card Image Banner */}
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 brightness-90 group-hover:brightness-100"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold uppercase bg-slate-950/80 text-gold-300 border border-gold-500/30 backdrop-blur-md">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-400 font-mono text-[11px]">
                      <span>{post.date}</span>
                      <span className="flex items-center gap-1 text-gold-400/90">
                        <Clock className="w-3 h-3" /> {post.readTime}
                      </span>
                    </div>

                    <Link href={`/blog/${post.slug}`}>
                      <h3 className="text-base sm:text-lg font-bold font-serif text-white group-hover:text-gold-300 transition-colors leading-snug">
                        {post.title}
                      </h3>
                    </Link>

                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 font-light">
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {post.tags.slice(0, 3).map((tag, tIdx) => (
                        <span 
                          key={tIdx}
                          className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded-md border border-slate-800"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer metadata */}
                <div className="p-6 pt-0 border-t border-slate-800/80 mt-4 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium text-[11px]">{post.author}</span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-gold-400 hover:text-gold-300 font-semibold flex items-center gap-1 text-xs"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-20 text-slate-400 space-y-2">
              <p className="text-lg font-serif font-semibold text-white">No blueprints found matching &quot;{searchQuery}&quot;</p>
              <p className="text-xs">Try searching for keywords such as Next.js, ERPNext, BOM, or AI.</p>
            </div>
          )}

          {/* Luxury Tech Dispatch Newsletter Box */}
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-slate-900 via-obsidian-950 to-slate-900 border border-gold-500/30 text-center max-w-2xl mx-auto space-y-4 shadow-2xl relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-gold-500/15 border border-gold-500/30 text-gold-400 flex items-center justify-center mx-auto shadow-inner">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold font-serif text-white">
              The Yovarin Private Technical Dispatch
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed font-light">
              Curated engineering blueprints on high-performance Next.js architectures, Frappe core development, and enterprise AI copilots. Zero marketing fluff.
            </p>

            {subscribed ? (
              <div className="p-3.5 rounded-xl bg-gold-500/20 text-gold-300 text-xs font-semibold inline-flex items-center gap-2 border border-gold-500/40">
                <CheckCircle2 className="w-4 h-4 text-gold-400" />
                Welcome. You are now subscribed to the Yovarin Private Dispatch.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto pt-2">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your enterprise email..."
                  className="flex-1 bg-slate-950 border border-slate-800 focus:border-gold-400 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="btn-luxury-gold px-6 py-3 text-xs rounded-xl whitespace-nowrap cursor-pointer"
                >
                  Join Dispatches
                </button>
              </form>
            )}
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
