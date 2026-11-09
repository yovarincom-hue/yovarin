'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch — only render after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Show a neutral placeholder that takes up the same space
  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-xl border border-gold-500/25 bg-transparent" />
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      title={isDark ? 'Switch to Luxury Ivory Mode' : 'Switch to Obsidian Dark Mode'}
      className={`
        relative p-2 rounded-xl border transition-all duration-300 cursor-pointer
        flex items-center justify-center group
        ${isDark
          ? 'border-gold-500/35 bg-gold-500/10 hover:bg-gold-500/20 hover:border-gold-400 shadow-sm shadow-gold-500/10'
          : 'border-amber-400/40 bg-amber-50 hover:bg-amber-100 hover:border-amber-500 shadow-sm shadow-amber-200'
        }
      `}
    >
      {isDark ? (
        /* Sun icon — shown in dark mode so user can switch to light */
        <Sun className="w-4 h-4 text-gold-400 group-hover:rotate-45 transition-transform duration-300" />
      ) : (
        /* Moon icon — shown in light mode so user can switch to dark */
        <Moon className="w-4 h-4 text-amber-700 group-hover:-rotate-12 transition-transform duration-300" />
      )}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
