'use client';

import React from 'react';

export default function LuxuryLogo({ size = 'md', showSubtitle = true }) {
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const svgSizes = {
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-7 h-7',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <div className="flex items-center gap-3 group select-none">
      {/* 24K Faceted Royal Octagonal Crest */}
      <div className={`${iconSizes[size]} relative rounded-2xl p-[1.5px] bg-gradient-to-br from-gold-200 via-gold-500 to-amber-700 shadow-lg shadow-gold-500/25 group-hover:shadow-gold-500/45 group-hover:scale-105 transition-all duration-300`}>
        <div className="w-full h-full bg-slate-950 dark:bg-obsidian-950 rounded-[14px] flex items-center justify-center relative overflow-hidden">
          
          {/* Ambient Royal Gold Glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-gold-500/15 via-transparent to-transparent pointer-events-none" />

          {/* Light Sweep Reflection on Hover */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <svg 
            className={svgSizes[size]} 
            width={size === 'sm' ? 20 : size === 'lg' ? 28 : 24} 
            height={size === 'sm' ? 20 : size === 'lg' ? 28 : 24} 
            viewBox="0 0 64 64" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* 24K Gold Light Facet Gradient */}
              <linearGradient id="crest-gold-light" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fff8eb" />
                <stop offset="35%" stopColor="#f5e1b5" />
                <stop offset="75%" stopColor="#d9b671" />
                <stop offset="100%" stopColor="#b88a38" />
              </linearGradient>

              {/* 24K Gold Shadow Facet Gradient */}
              <linearGradient id="crest-gold-dark" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e8cf9b" />
                <stop offset="45%" stopColor="#b88a38" />
                <stop offset="85%" stopColor="#805618" />
                <stop offset="100%" stopColor="#54370a" />
              </linearGradient>

              {/* Emerald Jewel Radiant Center */}
              <radialGradient id="crest-emerald-gem" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#6ee7b7" />
                <stop offset="50%" stopColor="#10b981" />
                <stop offset="85%" stopColor="#047857" />
                <stop offset="100%" stopColor="#064e3b" />
              </radialGradient>
            </defs>

            {/* Inner Hairline Lattice Ring */}
            <circle cx="32" cy="32" r="26" stroke="url(#crest-gold-dark)" strokeWidth="0.75" strokeDasharray="3 2" opacity="0.5" />

            {/* Crown Apex Micro Chevron */}
            <polygon points="32,9 34.5,13.5 32,12.5 29.5,13.5" fill="#fff8eb" opacity="0.95" />

            {/* Left Wing Light Facet */}
            <polygon points="14,16 32,32 32,38 24,27 18,16" fill="url(#crest-gold-light)" />
            {/* Left Wing Inner Bevel Glow */}
            <polygon points="14,16 18,16 32,32 28,32" fill="#ffffff" opacity="0.6" />

            {/* Right Wing Dark Facet */}
            <polygon points="50,16 32,32 32,38 40,27 46,16" fill="url(#crest-gold-dark)" />
            {/* Right Wing Outline Glow */}
            <polygon points="46,16 50,16 36,32 32,32" fill="url(#crest-gold-light)" opacity="0.75" />

            {/* Wing Infill Center V */}
            <polygon points="24,27 32,34 40,27 32,23" fill="url(#crest-gold-light)" opacity="0.95" />

            {/* Central Column - Split 3D Facet */}
            <polygon points="29.5,34 32,34 32,52 29.5,50" fill="url(#crest-gold-light)" />
            <polygon points="32,34 34.5,34 34.5,50 32,52" fill="url(#crest-gold-dark)" />

            {/* Column Base Pedestal */}
            <polygon points="27,49.5 37,49.5 36,52 28,52" fill="url(#crest-gold-light)" />

            {/* Radiant Emerald Heart Jewel */}
            <polygon points="32,26 37,31.5 32,37 27,31.5" fill="url(#crest-emerald-gem)" stroke="#fff8eb" strokeWidth="0.75" />
            <circle cx="30.5" cy="30" r="0.9" fill="#ffffff" opacity="0.95" />
          </svg>
        </div>
      </div>

      {/* Haute Horlogerie Typography */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span className={`${textSizes[size]} font-extrabold tracking-[0.14em] font-serif uppercase text-slate-900 dark:text-white transition-colors`}>
            Yovarin
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse ml-0.5" />
        </div>
        {showSubtitle && (
          <span className="text-[9px] uppercase tracking-[0.28em] text-gold-700 dark:text-gold-400 font-mono font-bold mt-1">
            Bespoke Enterprise &bull; ERP
          </span>
        )}
      </div>
    </div>
  );
}
