"use client";
import React from 'react';

export interface LiveEventStreamCardProps {
  title?: string;
  amount?: string;
  currency?: string;
}

export const LiveEventStreamCard: React.FC<LiveEventStreamCardProps> = ({
  title = 'LiveEventStreamCard',
  amount = '5.00',
  currency = 'USDC'
}) => {
  return (
    <article
      className="glass-liquid gpu-layer relative w-full overflow-hidden rounded-xl flex items-center"
      style={{
        animation: 'slideInNotify 400ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
        transition: 'filter 0.3s ease',
      }}
      aria-live="polite"
      role="status"
      onMouseEnter={(e) => { e.currentTarget.style.filter = 'brightness(1.04)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.filter = ''; }}
    >
      <div
        className="w-1 self-stretch flex-shrink-0"
        style={{
          backgroundColor: 'var(--color-success-light)',
          transition: 'filter 0.3s ease',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.filter = 'brightness(1.2)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.filter = ''; }}
      />
      <div className="p-4 flex items-center gap-4">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: 'color-mix(in oklch, var(--color-success-light) 10%, transparent)' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
            style={{ stroke: 'var(--color-success-light)' }}
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <div className="flex flex-col min-w-0">
          <span
            className="font-medium text-sm truncate"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {title}
          </span>
          <span
            className="font-semibold text-xs mt-0.5"
            style={{ color: 'var(--color-success-light)', fontVariantNumeric: 'tabular-nums' }}
          >
            + {amount} {currency}
          </span>
        </div>
      </div>

      <style>{`
        @keyframes slideInNotify {
          0% { transform: translateY(24px) scale(0.95); opacity: 0; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
      `}</style>
    </article>
  );
};

export default LiveEventStreamCard;
