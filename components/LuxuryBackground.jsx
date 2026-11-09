'use client';

import React from 'react';

/**
 * LuxuryBackground - Adaptive High-End Visual Canvas
 * Renders an opulent, cinematic multi-layered ambient background
 * tailored dynamically for both Dark Mode (Royal Obsidian & 24K Liquid Gold)
 * and Light Mode (Royal Ivory & Warm Champagne Cashmere).
 */
export default function LuxuryBackground() {
  return (
    <div className="luxury-bg-canvas" aria-hidden="true">
      {/* 1. Dynamic Aurora Lighting Orbs */}
      {/* Top Center Crown Chandelier Glow */}
      <div className="absolute top-[-180px] left-1/2 -translate-x-1/2 w-[1100px] h-[650px] bg-gradient-to-b from-gold-400/25 via-gold-500/10 to-transparent dark:from-gold-400/20 dark:via-gold-500/5 rounded-full blur-[140px] pointer-events-none animate-pulse-slow" />

      {/* Mid Left Emerald / Jewel Luminescence */}
      <div className="absolute top-[28%] -left-[200px] w-[650px] h-[650px] bg-emerald-500/12 dark:bg-emerald-500/9 rounded-full blur-[170px] pointer-events-none animate-float" />

      {/* Mid Right Golden Shimmer Orb */}
      <div className="absolute top-[52%] -right-[220px] w-[700px] h-[700px] bg-gold-400/16 dark:bg-gold-500/10 rounded-full blur-[180px] pointer-events-none" style={{ animation: 'float 9s ease-in-out infinite reverse' }} />

      {/* Bottom Center Deep Royal Ambient Glow */}
      <div className="absolute bottom-[-180px] left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-teal-500/12 dark:bg-teal-500/7 rounded-full blur-[180px] pointer-events-none animate-pulse-slow" />

      {/* 2. Haute Horlogerie / Art Deco Diamond Tapisserie Grid */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.4] dark:opacity-[0.25]"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <defs>
          {/* Subtle Guilloche Diamond Pattern */}
          <pattern
            id="luxury-diamond-grid"
            width="64"
            height="64"
            patternUnits="userSpaceOnUse"
          >
            {/* Fine Hairline Rhombus */}
            <path
              d="M 32 0 L 64 32 L 32 64 L 0 32 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.75"
              className="text-gold-600/25 dark:text-gold-400/20"
            />
            {/* Inner Accent Facet */}
            <path
              d="M 32 16 L 48 32 L 32 48 L 16 32 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              strokeDasharray="2 3"
              className="text-gold-500/20 dark:text-gold-400/15"
            />
            {/* Center Gilded Micro-Gem Node */}
            <circle
              cx="32"
              cy="32"
              r="1.25"
              className="fill-gold-500/40 dark:fill-gold-400/35"
            />
          </pattern>

          {/* Radial Mask to softly fade grid towards edges and center focus */}
          <radialGradient id="luxury-mask-gradient" cx="50%" cy="45%" r="65%">
            <stop offset="0%" stopColor="white" stopOpacity="0.85" />
            <stop offset="45%" stopColor="white" stopOpacity="0.5" />
            <stop offset="85%" stopColor="white" stopOpacity="0.15" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>

          <mask id="luxury-grid-fade">
            <rect width="100%" height="100%" fill="url(#luxury-mask-gradient)" />
          </mask>
        </defs>

        <rect
          width="100%"
          height="100%"
          fill="url(#luxury-diamond-grid)"
          mask="url(#luxury-grid-fade)"
        />
      </svg>

      {/* 3. Luxury Vignette Border for Architectural Depth */}
      <div className="luxury-vignette-overlay" />
    </div>
  );
}
