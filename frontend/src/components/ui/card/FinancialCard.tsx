"use client";

import React from 'react';

export type FinancialCardVariant = 'stat' | 'momentum' | 'volume';

export interface FinancialCardProps {
  variant?: FinancialCardVariant;
  label?: string;
  value?: string;
  trend?: string;
  amount?: string;
  currency?: string;
  changeText?: string;
  statusText?: string;
  progress?: number;
}

function StatVariant({ label, value, trend, progress }: { label: string; value: string; trend: string; progress: number }) {
  return (
    <div
      className="glass-liquid gpu-layer shadow-maestro elevation-z-2 rounded-[20px] p-6 group"
      style={{ transition: 'filter 0.25s ease' }}
      onMouseEnter={(e) => { e.currentTarget.style.filter = 'brightness(1.06)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.filter = 'brightness(1)'; }}
    >
      <div
        className="absolute inset-0 rounded-[20px] pointer-events-none"
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
            width: `${progress}%`,
            background: 'linear-gradient(to right, var(--teal-800), var(--gold-400))',
          }}
        />
      </div>
    </div>
  );
}

function MomentumVariant({ label, amount, currency }: { label: string; amount: string; currency: string }) {
  return (
    <article
      className="glass-liquid gpu-layer border-gold-subtle relative w-full rounded-2xl p-6"
      aria-labelledby="financial-momentum-title"
      style={{ transition: 'filter 0.3s ease' }}
      onMouseEnter={(e) => { e.currentTarget.style.filter = 'brightness(1.03)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.filter = ''; }}
    >
      <header className="mb-4">
        <h3
          id="financial-momentum-title"
          className="font-bold font-heading"
          style={{ color: 'var(--color-text-primary)', fontSize: 'clamp(1.5rem, 2.5vw + 1rem, 2.5rem)' }}
        >
          {label}
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
}

function VolumeVariant({ label, value, currency, changeText, statusText }: { label: string; value: string; currency: string; changeText: string; statusText: string }) {
  return (
    <div
      className="card-total-volume relative rounded-2xl p-6 border flex flex-col justify-between h-full transition-filter duration-300 ease"
      style={{
        backgroundColor: 'var(--teal-900, #002121)',
        borderColor: 'var(--teal-700, #004545)',
        boxShadow: 'inset 1px 1px 0 rgba(224,242,242,0.05), 0 8px 16px rgba(0,31,31,0.5)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.filter = 'brightness(1.05)';
        const icon = e.currentTarget.querySelector('.volume-icon') as SVGElement | null;
        if (icon) icon.style.filter = 'brightness(1.3)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.filter = '';
        const icon = e.currentTarget.querySelector('.volume-icon') as SVGElement | null;
        if (icon) icon.style.filter = '';
      }}
    >
      <div className="flex justify-between items-start mb-4">
        <h4
          className="text-sm uppercase tracking-wider font-semibold"
          style={{
            color: 'var(--color-text-tertiary, #CCF7F4)',
            fontFamily: 'var(--font-heading)',
          }}
        >
          {label}
        </h4>
        <svg
          className="volume-icon w-5 h-5 transition-filter duration-300 ease"
          style={{ color: 'var(--teal-700, #005959)' }}
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      </div>
      <div>
        <div
          className="text-4xl tracking-tight relative inline-block"
          style={{
            fontFamily: 'var(--font-body)',
            fontFeatureSettings: '"tnum"',
            color: 'var(--color-text-secondary, #E0F2F2)',
          }}
        >
          <span
            className="relative z-10 font-bold"
            style={{
              textShadow: '-1px 1px 0 var(--teal-900, #001111), 1px 1px 0 var(--teal-900, #001111)',
            }}
          >
            {value}
          </span>
          <span
            className="text-xl ml-2 font-normal"
            style={{ color: 'var(--color-text-tertiary, #CCF7F4)' }}
          >
            {currency}
          </span>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <span
            className="text-xs px-2 py-1 rounded"
            style={{
              fontFamily: 'var(--font-body)',
              fontFeatureSettings: '"tnum"',
              backgroundColor: 'var(--teal-800, #003737)',
              color: 'var(--color-text-secondary, #E0F2F2)',
              border: '1px solid var(--teal-700, #005959)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)',
            }}
          >
            {changeText}
          </span>
          <span
            className="text-xs"
            style={{
              fontFamily: 'var(--font-body)',
              fontFeatureSettings: '"tnum"',
              color: 'color-mix(in oklch, var(--color-text-tertiary, #CCF7F4) 60%, transparent)',
            }}
          >
            {statusText}
          </span>
        </div>
      </div>
    </div>
  );
}

export const FinancialCard: React.FC<FinancialCardProps> = ({
  variant = 'stat',
  label,
  value,
  trend = '+18.3%',
  amount = '14,250.00',
  currency = 'USDC',
  changeText = '+12.4% (30d)',
  statusText = 'Healthy velocity',
  progress = 72,
}) => {
  const resolvedLabel = label ?? (variant === 'stat' ? 'Monthly Revenue' : variant === 'momentum' ? 'FinancialCard' : 'Total Volume Card');
  const resolvedValue = value ?? (variant === 'stat' ? '$12,480' : '14,500.50');

  switch (variant) {
    case 'momentum':
      return <MomentumVariant label={resolvedLabel} amount={amount} currency={currency} />;
    case 'volume':
      return <VolumeVariant label={resolvedLabel} value={resolvedValue} currency={currency} changeText={changeText} statusText={statusText} />;
    default:
      return <StatVariant label={resolvedLabel} value={resolvedValue} trend={trend} progress={progress} />;
  }
};

export default FinancialCard;
