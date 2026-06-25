"use client";
import React from 'react';

export interface FrozenGlassErrorCardProps {
  title?: string;
  description?: string;
}

export const FrozenGlassErrorCard: React.FC<FrozenGlassErrorCardProps> = ({
  title = 'FrozenGlassErrorCard',
  description = 'The cryptographic node failed to respond. Ice protocols engaged. Retrying in 10s.'
}) => {
  return (
    <div
      className="glass-liquid gpu-layer border-gold-subtle rounded-2xl p-8 overflow-hidden group relative"
      style={{
        transition: 'backdrop-filter 0.4s ease, filter 0.3s ease',
        boxShadow: 'inset 0 0 60px color-mix(in oklch, var(--teal-900) 80%, transparent)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backdropFilter = 'blur(24px) saturate(1.3)';
        e.currentTarget.style.filter = 'brightness(1.04)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backdropFilter = '';
        e.currentTarget.style.filter = '';
      }}
    >
      <div
        className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center text-center h-full">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center mb-5"
          style={{
            border: '1px solid color-mix(in oklch, var(--error-light) 30%, transparent)',
            backgroundColor: 'color-mix(in oklch, var(--error-light) 5%, transparent)',
          }}
        >
          <svg
            className="w-6 h-6"
            style={{ color: 'var(--error-light)' }}
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>

        <h3
          className="font-heading text-xl"
          style={{ color: 'var(--error-light)' }}
        >
          {title}
        </h3>

        <p
          className="font-mono text-xs mt-2 max-w-[80%] leading-relaxed"
          style={{
            color: 'color-mix(in oklch, var(--color-text-secondary) 50%, transparent)',
          }}
        >
          {description}
        </p>
      </div>
    </div>
  );
};
