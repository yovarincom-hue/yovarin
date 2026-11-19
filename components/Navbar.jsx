'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Layers, 
  Bot, 
  Calculator, 
  Briefcase, 
  PhoneCall, 
  Menu, 
  X, 
  ChevronRight,
  BookOpen,
  Globe,
  Crown,
  LogOut,
  UserRound
} from 'lucide-react';
import ConsultationModal from './ConsultationModal';
import LuxuryLogo from './LuxuryLogo';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [accountUser, setAccountUser] = useState(null);
  const [signOutError, setSignOutError] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let active = true;
    const loadAccount = () => {
      fetch('/api/auth/session', { credentials: 'same-origin', cache: 'no-store' })
        .then((response) => response.ok ? response.json() : null)
        .then((result) => {
          if (active) setAccountUser(result?.user || null);
        })
        .catch((error) => console.error('Could not load account navigation state:', error));
    };
    loadAccount();
    window.addEventListener('yovarin-auth-changed', loadAccount);
    return () => {
      active = false;
      window.removeEventListener('yovarin-auth-changed', loadAccount);
    };
  }, []);

  async function signOut() {
    setSignOutError('');
    try {
      const response = await fetch('/api/auth/logout', { method: 'POST', credentials: 'same-origin' });
      if (!response.ok) throw new Error('Sign out failed.');
      setAccountUser(null);
      window.dispatchEvent(new Event('yovarin-auth-changed'));
    } catch (error) {
      console.error('Could not sign out:', error);
      setSignOutError('Could not sign out. Please try again.');
    }
  }

  // Keep labels short so they fit in one row on desktop
  const navLinks = [
    { href: '/',              label: 'Home' },
    { href: '/products',      label: 'Products' },
    { href: '/services',      label: 'Services' },
    { href: '/case-studies',  label: 'Cases' },
    { href: '/calculator',    label: 'ROI' },
    { href: '/blog',          label: 'Journal' },
    { href: '/contact',       label: 'Contact' },
  ];

  return (
    <>
      {/* Top Luxury Announcement Ribbon */}
      <div className="bg-ivory-200/90 dark:bg-gradient-to-r dark:from-obsidian-950 dark:via-slate-900 dark:to-obsidian-950 border-b border-gold-500/20 py-2 px-4 text-xs text-center text-slate-700 dark:text-slate-300 flex items-center justify-center gap-2 transition-colors duration-300 flex-wrap">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-gold-500/20 text-gold-800 dark:text-gold-300 border border-gold-500/30 font-mono">
          <Crown className="w-3 h-3 text-gold-600 dark:text-gold-400" /> PRIVATE CLIENT TIER
        </span>
        <span>
          <strong className="text-slate-900 dark:text-white font-medium">Bespoke Next.js &amp; ERPNext Architecture</strong> &bull; Schedule your private 30-min system discovery.
        </span>
        <button 
          onClick={() => setConsultationOpen(true)}
          className="text-gold-700 dark:text-gold-400 hover:underline font-semibold cursor-pointer transition-colors whitespace-nowrap"
        >
          Book Discovery &rarr;
        </button>
      </div>

      {/* Main Sticky Luxury Navbar */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-ivory-100/90 dark:bg-obsidian-950/90 backdrop-blur-md border-b border-gold-500/25 shadow-lg dark:shadow-2xl dark:shadow-black/60 py-2.5' 
          : 'bg-ivory-100/75 dark:bg-obsidian-950/70 backdrop-blur-sm border-b border-gold-500/15 py-3'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* Brand Logo */}
            <Link href="/" className="cursor-pointer shrink-0">
              <LuxuryLogo size="md" />
            </Link>

            {/* Desktop Navigation — compact labels, tighter gaps */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 flex-1 justify-center">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-xs font-medium transition-all py-1.5 px-2.5 xl:px-3 rounded-lg whitespace-nowrap tracking-wide ${
                      isActive
                        ? 'text-gold-800 dark:text-gold-300 bg-gold-500/20 dark:bg-gold-500/15 font-semibold border border-gold-500/30 shadow-sm'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-gold-500/10 dark:hover:bg-slate-900/60'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right: Theme Toggle + AI Pilot + CTA */}
            <div className="hidden lg:flex items-center gap-2 shrink-0">
              <ThemeToggle />

              {accountUser ? (
                <div className="flex items-center gap-1">
                  <Link href="/account" title={accountUser.email} className="flex h-8 w-8 items-center justify-center rounded-full border border-gold-500/35 bg-gold-500/15 text-gold-800 dark:text-gold-200" aria-label={`Account for ${accountUser.name}`}>
                    <UserRound className="h-4 w-4" />
                  </Link>
                  <button onClick={signOut} className="rounded-lg p-2 text-slate-500 transition hover:bg-gold-500/10 hover:text-gold-700 dark:text-slate-300 dark:hover:text-gold-300" aria-label="Sign out" title="Sign out">
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <Link href="/account" className="rounded-xl border border-gold-500/30 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-gold-500/60 hover:text-gold-800 dark:text-slate-200 dark:hover:text-gold-300">Sign in</Link>
              )}
              {signOutError && <span role="alert" className="sr-only">{signOutError}</span>}

              <Link
                href="/products#pilot-demo"
                className="px-3 py-1.5 text-xs font-semibold text-cyan-800 dark:text-cyan-300 bg-cyan-100/70 dark:bg-cyan-950/50 hover:bg-cyan-200/80 dark:hover:bg-cyan-900/60 border border-cyan-500/30 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap"
              >
                <Bot className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                <span>AI Pilot</span>
              </Link>
              
              <button
                onClick={() => setConsultationOpen(true)}
                className="btn-luxury-gold px-3.5 py-1.5 text-xs rounded-xl flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Consult</span>
              </button>
            </div>

            {/* Mobile: Theme Toggle + Hamburger */}
            <div className="flex lg:hidden items-center gap-1 shrink-0">
              <ThemeToggle />
              <Link
                href="/account"
                onClick={() => setMobileMenuOpen(false)}
                aria-label={accountUser ? `Account for ${accountUser.name}` : 'Sign in'}
                title={accountUser ? 'Your account' : 'Sign in'}
                className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl border border-gold-500/30 bg-white/80 px-1.5 text-xs font-semibold text-gold-800 transition hover:border-gold-500/60 hover:bg-gold-500/10 dark:bg-slate-900/80 dark:text-gold-200"
              >
                <UserRound className="h-4 w-4 min-[360px]:hidden" />
                <span className="hidden min-[360px]:inline">{accountUser ? 'Account' : 'Sign in'}</span>
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-white/80 dark:bg-slate-900/80 rounded-xl border border-gold-500/20"
                aria-label="Toggle Navigation"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-ivory-100/95 dark:bg-obsidian-950/98 border-b border-gold-500/30 px-6 py-6 space-y-4 backdrop-blur-2xl shadow-2xl">
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 text-sm font-medium rounded-xl flex items-center justify-between transition-all ${
                      isActive
                        ? 'bg-gold-500/20 text-gold-900 dark:text-gold-300 font-bold border border-gold-500/30'
                        : 'text-slate-700 dark:text-slate-200 hover:bg-gold-500/10 dark:hover:bg-slate-900'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4 text-gold-500/60" />
                  </Link>
                );
              })}
            </nav>

            <div className="pt-4 border-t border-gold-500/20 flex flex-col gap-3">
              {accountUser ? (
                <>
                  <div className="flex items-center justify-between gap-3 rounded-xl border border-gold-500/20 bg-gold-500/5 px-4 py-3">
                    <Link href="/account" onClick={() => setMobileMenuOpen(false)} className="flex min-w-0 items-center gap-2 text-sm text-slate-700 dark:text-slate-200">
                      <UserRound className="h-4 w-4 shrink-0 text-gold-600 dark:text-gold-300" />
                      <span className="truncate">{accountUser.name}</span>
                    </Link>
                    <button onClick={signOut} className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-gold-700 dark:text-slate-300 dark:hover:text-gold-300">
                      <LogOut className="h-3.5 w-3.5" /> Sign out
                    </button>
                  </div>
                  {signOutError && <p role="alert" className="text-center text-xs text-rose-600 dark:text-rose-300">{signOutError}</p>}
                </>
              ) : (
                <Link href="/account" onClick={() => setMobileMenuOpen(false)} className="btn-luxury-outline w-full py-3 text-xs font-semibold flex items-center justify-center gap-2">
                  <UserRound className="h-4 w-4 text-gold-600 dark:text-gold-300" /> Sign in or create an account
                </Link>
              )}
              <Link
                href="/products#pilot-demo"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 text-xs font-semibold text-cyan-800 dark:text-cyan-300 bg-cyan-100 dark:bg-cyan-950/80 border border-cyan-500/30 rounded-xl flex items-center justify-center gap-2"
              >
                <Bot className="w-4 h-4 text-cyan-600 dark:text-cyan-400" /> Test AI Pilot Simulator
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setConsultationOpen(true);
                }}
                className="btn-luxury-gold w-full py-3 text-xs rounded-xl flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4" /> Book Private Technical Consultation
              </button>
            </div>
          </div>
        )}
      </header>

      <ConsultationModal 
        isOpen={consultationOpen} 
        onClose={() => setConsultationOpen(false)} 
      />
    </>
  );
}
