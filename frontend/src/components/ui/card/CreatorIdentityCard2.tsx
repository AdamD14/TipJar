"use client";

import React from 'react';

export interface CreatorIdentityCard2Props {
  name?: string;
  role?: string;
}

export const CreatorIdentityCard2: React.FC<CreatorIdentityCard2Props> = ({
  name = 'CreatorIdentityCard2',
  role = 'Decentralized System Architect'
}) => {
  return (
    <article
      className="glass-liquid gpu-layer shadow-maestro elevation-z-2 squishy-3d
                  relative overflow-hidden rounded-lg p-6
                  group"
      style={{ '--elevation-z': 'var(--elevation-z-2)' } as React.CSSProperties}
      aria-label={`Profil Twórcy: ${name}`}
    >
      <div
        className="absolute top-0 left-0 right-0 h-[35%] pointer-events-none"
        style={{ background: `linear-gradient(180deg, color-mix(in oklch, var(--gold-400) 10%, transparent), transparent)` }}
        aria-hidden="true"
      />

      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 will-change-opacity"
        style={{
          backgroundImage: `linear-gradient(135deg, color-mix(in oklch, var(--gold-400) 8%, transparent) 0%, color-mix(in oklch, var(--teal-400) 12%, transparent) 50%, color-mix(in oklch, var(--gold-400) 6%, transparent) 100%)`,
          backgroundSize: '200% 200%',
          backgroundPosition: '0% 0%',
          transition: 'opacity 500ms var(--ease-spring), background-position 500ms var(--ease-spring)'
        }}
        aria-hidden="true"
      />

      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, var(--teal-300) 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
        aria-hidden="true"
      />

      <div className="w-20 h-20 rounded-md overflow-hidden bg-teal-900 border border-teal-700 mb-4 relative z-20">
        <div className="skeleton-shimmer w-full h-full" aria-hidden="true" />
      </div>

      <div className="relative z-20">
        <h2 className="font-heading text-text-primary text-xl font-light tracking-wide">
          {name}
        </h2>
        <p className="font-body text-text-tertiary text-sm">
          {role}
        </p>
      </div>

      <a href="/profile" className="absolute inset-0 z-10" aria-hidden="true" />
    </article>
  );
};

export default CreatorIdentityCard2;
