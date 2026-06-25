"use client";
import React from 'react';

export interface PulseMomentumCardProps {
  title?: string;
  amount?: string;
  currency?: string;
}

export const PulseMomentumCard: React.FC<PulseMomentumCardProps> = ({
  title = 'PulseMomentumCard',
  amount = '14,250.00',
  currency = 'USDC'
}) => {
  return (
    <article
      className="glass-liquid gpu-layer border-gold-subtle relative w-full rounded-2xl p-6"
      aria-labelledby="pulse-title"
      style={{ transition: 'filter 0.3s ease' }}
      onMouseEnter={(e) => { e.currentTarget.style.filter = 'brightness(1.03)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.filter = ''; }}
    >
      <header className="mb-4">
        <h3
          id="pulse-title"
          className="font-bold font-heading"
          style={{ color: 'var(--color-text-primary)', fontSize: 'clamp(1.5rem, 2.5vw + 1rem, 2.5rem)' }}
        >
          {title}
        </h3>
      </header>
      <div
        className="font-bold font-heading flex items-baseline gap-3"
        style={{
          color: 'var(--gold-400)',
          fontSize: 'clamp(2.5rem, 4vw + 1.5rem, 4rem)',
          fontVariantNumeric: 'tabular-nums',
          fontFeatureSettings: "'tnum'",
          transition: 'filter 0.3s ease',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.filter = 'brightness(1.12)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.filter = ''; }}
      >
        <span
          className="text-sm uppercase tracking-widest"
          style={{ color: 'color-mix(in oklch, var(--color-text-tertiary) 70%, transparent)' }}
        >
          {currency}
        </span>
        <span>{amount}</span>
      </div>
    </article>
  );
};

export default PulseMomentumCard;
