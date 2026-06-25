"use client";

import React from 'react';

export interface CreatorPulseCardProps {
  name?: string;
  handle?: string;
  isSynced?: boolean;
  onSupportClick?: () => void;
}

export const CreatorPulseCard: React.FC<CreatorPulseCardProps> = ({
  name = 'CreatorPulseCard',
  handle = '@component_label',
  isSynced = true,
  onSupportClick
}) => {
  return (
    <article
      className="glass-liquid gpu-layer shadow-maestro elevation-z-2 squishy-3d border-gold-subtle
                  relative w-full rounded-2xl overflow-hidden flex flex-col p-6 group"
      style={{
        '--elevation-z': 'var(--elevation-z-2)',
        background: 'var(--bg-surface-base)'
      } as React.CSSProperties}
      aria-label={`Profil Twórcy: ${name}`}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 will-change-opacity"
        style={{
          backgroundImage: `linear-gradient(135deg, color-mix(in oklch, var(--gold-400) 8%, transparent) 0%, color-mix(in oklch, var(--teal-400) 12%, transparent) 50%, color-mix(in oklch, var(--gold-400) 6%, transparent) 100%)`,
          backgroundSize: '200% 200%',
          backgroundPosition: '0% 0%'
        }}
        aria-hidden="true"
      />

      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage: `radial-gradient(circle, var(--teal-100) 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
        aria-hidden="true"
      />

      <div className="flex items-center gap-4 relative z-20">
        <div className="w-16 h-16 bg-teal-900 rounded-md border border-teal-700 p-1 flex items-center justify-center flex-shrink-0 overflow-hidden relative">
          <div className="skeleton-shimmer w-full h-full" aria-hidden="true" />
        </div>
        <div className="flex flex-col min-w-0">
          <h3 className="font-heading text-text-secondary text-xl tracking-[0.05em] leading-[1.1] font-bold truncate">
            {name}
          </h3>
          <span className="font-body text-text-quaternary text-sm font-medium truncate">
            {handle}
          </span>
        </div>
      </div>

      <div className="mt-auto pt-6 flex justify-between items-center relative z-20">
        <span className="text-info-base font-body text-xs font-bold tracking-widest uppercase flex items-center gap-2 select-none">
          <span
            className={`w-2 h-2 rounded-full bg-success-base ${isSynced ? 'animate-pulse' : 'opacity-40'}`}
          />
          {isSynced ? 'Node Synced' : 'Offline'}
        </span>
        <button
          onClick={onSupportClick}
          className="cta-gold cta-gold-02 squishy-3d cta-btn-text px-4 py-2 rounded-lg text-sm cursor-pointer"
        >
          SUPPORT
        </button>
      </div>
    </article>
  );
};

export default CreatorPulseCard;
