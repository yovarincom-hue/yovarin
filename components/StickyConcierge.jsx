'use client';

import React, { useState } from 'react';
import { PhoneCall, MessageSquare, X, Crown, ShieldCheck, Clock } from 'lucide-react';
import ConsultationModal from './ConsultationModal';

export default function StickyConcierge() {
  const [visible, setVisible] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  // X button clicked → completely unmount the popup
  if (!visible) return null;

  return (
    <>
      <aside
        aria-label="Private Enterprise Concierge"
        className="fixed bottom-5 right-5 z-50 w-[320px] sm:w-80"
      >
        <div className="rounded-2xl border border-gold-500/40 bg-slate-950/96 backdrop-blur-xl p-4 shadow-2xl shadow-black/70 space-y-3 relative overflow-hidden">

          {/* Background glow */}
          <div className="absolute top-0 right-0 w-32 h-28 bg-gold-500/10 rounded-full blur-2xl pointer-events-none" />

          {/* Header row */}
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-2">
              {/* Live indicator */}
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-[11px] font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1">
                <Crown className="w-3 h-3 text-gold-400" /> Private Concierge
              </span>
            </div>

            {/* CLOSE — sets visible=false → renders null */}
            <button
              type="button"
              onClick={() => setVisible(false)}
              aria-label="Close concierge"
              className="relative z-10 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Body */}
          <div className="text-xs space-y-1 relative">
            <p className="font-semibold text-white">Evaluating Next.js Web or ERPNext?</p>
            <p className="text-[11px] text-slate-400 leading-relaxed font-light">
              Connect directly with a Principal Solutions Architect for a complimentary 30-min system readiness audit.
            </p>
          </div>

          {/* CTA buttons */}
          <div className="grid grid-cols-2 gap-2 relative">
            <a
              href="https://wa.me/923090687624?text=Hello%20Yovarin%20Technologies,%20I%20would%20like%20to%20discuss%20our%20enterprise%20software%20requirements."
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-3 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/30 text-emerald-300 text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-all"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="btn-luxury-gold py-2 px-3 rounded-xl text-[11px] font-bold flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Book Call</span>
            </button>
          </div>

          {/* Footer */}
          <div className="relative flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-800 font-mono">
            <span className="flex items-center gap-1 text-gold-400/80">
              <ShieldCheck className="w-3 h-3 text-gold-400" /> Mutual NDA
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" /> &lt;4h response
            </span>
          </div>
        </div>
      </aside>

      <ConsultationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
