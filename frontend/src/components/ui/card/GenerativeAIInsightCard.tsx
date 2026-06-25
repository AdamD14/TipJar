"use client";
import React from 'react';

type GenerativeAIInsightCardProps = {
  insight: string;
  metric: number;
  label: string;
};

export default function GenerativeAIInsightCard({ insight, metric, label }: GenerativeAIInsightCardProps) {
  return (
    <div className="glass-liquid gpu-layer shadow-maestro elevation-z-3 rounded-[24px] p-1 w-full">
      <div
        className="relative w-full h-full p-6 rounded-[22px] flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
        style={{
          border: '1px solid color-mix(in oklch, var(--teal-100) 10%, transparent)',
          transition: 'filter 0.3s ease',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.filter = 'hue-rotate(3deg) brightness(1.03)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.filter = ''; }}
      >
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <div
              className="w-6 h-6 rounded-md flex items-center justify-center"
              style={{
                backgroundColor: 'color-mix(in oklch, var(--color-text-tertiary) 20%, transparent)',
                border: '1px solid color-mix(in oklch, var(--color-text-tertiary) 50%, transparent)',
              }}
            >
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor" style={{ color: 'var(--color-text-tertiary)' }}>
                <path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13.5h-13L12 6.5z" />
              </svg>
            </div>
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: 'var(--color-text-tertiary)' }}
            >
              GenerativeAIInsightCard
            </span>
          </div>

          <h3
            className="font-heading font-medium leading-tight"
            style={{
              color: 'var(--text-primary)',
              fontSize: 'clamp(1rem, 5cqi, 1.5rem)',
            }}
          >
            {insight}
          </h3>
        </div>

        <div
          className="p-5 rounded-[16px] flex flex-col items-center justify-center min-w-[140px]"
          style={{
            backgroundColor: 'var(--teal-900)',
            boxShadow: 'inset 0 2px 10px color-mix(in oklch, var(--teal-900) 80%, #000), 0 0 0 1px color-mix(in oklch, var(--teal-100) 5%, transparent)',
            borderTop: '1px solid color-mix(in oklch, var(--teal-100) 10%, transparent)',
          }}
        >
          <span
            className="text-[10px] mb-2 uppercase font-bold"
            style={{
              color: 'color-mix(in oklch, var(--color-text-tertiary) 60%, transparent)',
              letterSpacing: '0.2em',
            }}
          >
            {label}
          </span>
          <span
            className="text-3xl font-black font-heading"
            style={{
              color: 'var(--gold-400)',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            +{metric}%
          </span>
        </div>
      </div>
    </div>
  );
}
