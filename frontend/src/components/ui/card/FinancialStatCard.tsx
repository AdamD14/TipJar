"use client";
import React from 'react';

type FinancialStatSummaryProps = {
  value: React.ReactNode;
  label: string;
  trend: string;
};

export default function FinancialStatCard({ value, label, trend }: FinancialStatSummaryProps) {
  return (
    <div className="glass-liquid gpu-layer shadow-maestro elevation-z-2 rounded-[20px] p-6 group"
      style={{ transition: 'filter 0.25s ease' }}
      onMouseEnter={(e) => { e.currentTarget.style.filter = 'brightness(1.06)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.filter = 'brightness(1)'; }}
    >
      <div className="absolute inset-0 rounded-[20px] pointer-events-none"
        style={{ boxShadow: 'inset 0 0 0 1px color-mix(in oklch, var(--teal-100) 8%, transparent)' }}
      />

      <p
        className="text-xs font-semibold uppercase mb-3"
        style={{
          color: 'color-mix(in oklch, var(--teal-100) 60%, transparent)',
          letterSpacing: '0.15em',
        }}
      >
        {label}
      </p>

      <div className="flex items-baseline gap-4 mb-6">
        <h3
          className="text-4xl font-black font-heading"
          style={{
            color: 'var(--text-primary)',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {value}
        </h3>
        <span
          className="text-sm font-bold"
          style={{ color: trend.startsWith('+') ? 'var(--color-success-base)' : 'var(--color-error-base)' }}
        >
          {trend}
        </span>
      </div>

      <div
        className="w-full h-[14px] rounded-full relative overflow-hidden"
        style={{
          backgroundColor: 'var(--teal-900)',
          boxShadow: 'inset 1px 2px 4px rgba(0,0,0,0.8), inset -1px -1px 2px color-mix(in oklch, var(--teal-100) 5%, transparent)',
        }}
      >
        <div
          className="absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ease-in-out"
          style={{
            width: '72%',
            background: 'linear-gradient(to right, var(--teal-800), var(--gold-400))',
          }}
        />
      </div>
    </div>
  );
}
