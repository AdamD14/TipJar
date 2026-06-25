"use client";

import React from 'react';

export type LiveNotificationVariant = 'stream' | 'default' | 'toast' | 'stacked';

export interface LiveNotificationCardProps {
  variant?: LiveNotificationVariant;
  username?: string;
  amount?: string | number;
  currency?: string;
  message?: string;
  title?: string;
  description?: string;
  stackIndex?: number;
  isDegraded?: boolean;
}

function StreamVariant({ title, amount, currency }: { title: string; amount: string; currency: string }) {
  return (
    <article
      className="glass-liquid gpu-layer relative w-full overflow-hidden rounded-xl flex items-center"
      style={{
        border: '1px solid var(--teal-800, #003737)',
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
}

function DefaultVariant({ username, message, amount, currency }: { username: string; message: string; amount: string | number; currency: string }) {
  return (
    <div
      className="glass-liquid gpu-layer relative flex items-center justify-between p-5 mb-3 rounded-2xl"
      style={{
        border: '1px solid var(--teal-700, #004545)',
        opacity: 1,
        transition: 'filter 0.3s ease, opacity 0.7s cubic-bezier(0.2,0.8,0.2,1), transform 0.7s cubic-bezier(0.2,0.8,0.2,1)',
        animation: 'notifyIn 400ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.filter = 'brightness(1.03)';
        const ring = e.currentTarget.querySelector('.avatar-ring') as HTMLDivElement | null;
        if (ring) ring.style.boxShadow = 'color-mix(in oklch, var(--gold-400) 60%, transparent) 0 0 28px 8px';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.filter = '';
        const ring = e.currentTarget.querySelector('.avatar-ring') as HTMLDivElement | null;
        if (ring) ring.style.boxShadow = 'color-mix(in oklch, var(--gold-400) 40%, transparent) 0 0 20px 4px';
      }}
    >
      <div className="flex items-center gap-4">
        <div
          className="avatar-ring w-12 h-12 rounded-full p-[2px]"
          style={{
            background: 'linear-gradient(135deg, var(--teal-800), var(--gold-400))',
            boxShadow: 'color-mix(in oklch, var(--gold-400) 40%, transparent) 0 0 20px 4px',
            transition: 'box-shadow 0.3s ease',
          }}
        >
          <div
            className="w-full h-full rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'var(--teal-900)' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
              style={{ stroke: 'var(--gold-400)' }}
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
        </div>
        <div className="flex flex-col">
          <p
            className="text-sm font-bold tracking-wide"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {username}
          </p>
          <p
            className="text-xs"
            style={{ color: 'color-mix(in oklch, var(--color-text-tertiary) 50%, transparent)' }}
          >
            {message}
          </p>
        </div>
      </div>
      <div
        className="text-xl font-black font-heading haptic-glow"
        style={{
          color: 'var(--gold-400)',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        +{amount} {currency}
      </div>

      <style>{`
        @keyframes notifyIn {
          0% { opacity: 0; transform: scale(0.75) rotate(-6deg); filter: blur(12px); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); filter: blur(0px); }
        }
      `}</style>
    </div>
  );
}

function ToastVariant({ username, amount }: { username: string; amount: string }) {
  return (
    <div
      className="glass-liquid gpu-layer relative rounded-xl p-4 flex gap-4 items-center"
      style={{
        border: '1px solid var(--teal-800, #003737)',
        animation: 'glideInUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
        transition: 'filter 0.3s ease, box-shadow 0.3s ease',
        boxShadow: '0 8px 32px color-mix(in oklch, var(--teal-900) 90%, #000)',
      }}
      role="status"
      aria-live="polite"
      onMouseEnter={(e) => { e.currentTarget.style.filter = 'brightness(1.04)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.filter = ''; }}
    >
      <div
        className="w-6 h-6 rounded-full flex-shrink-0"
        style={{
          background: 'linear-gradient(135deg, var(--gold-400), var(--purple-300))',
          animation: 'pulse-breath 1.5s ease-in-out infinite',
          animationPlayState: 'running',
        }}
      />
      <div>
        <p
          className="text-sm"
          style={{ color: 'color-mix(in oklch, var(--color-text-tertiary) 80%, transparent)', fontFamily: 'var(--font-body)' }}
        >
          Momentum: Wsparcie od <strong className="font-bold" style={{ color: 'var(--color-text-primary)' }}>{username}</strong> ({amount})
        </p>
      </div>

      <style>{`
        @keyframes glideInUp {
          0% { transform: translateY(50px) scale(0.95); opacity: 0; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

function StackedVariant({ title, description, stackIndex, isDegraded }: { title: string; description: string; stackIndex: number; isDegraded: boolean }) {
  const brightness = 1 - 0.15 * stackIndex;
  return (
    <div
      className="relative transition-all duration-300"
      style={{
        transform: `translateY(${stackIndex * -4}px) scale(${1 - 0.05 * stackIndex})`,
        zIndex: 9999 - stackIndex,
        filter: `brightness(${brightness})`,
      }}
      onMouseEnter={(e) => { e.currentTarget.style.filter = `brightness(${Math.min(brightness + 0.2, 1)})`; }}
      onMouseLeave={(e) => { e.currentTarget.style.filter = `brightness(${brightness})`; }}
    >
      <article
        className={`rounded-xl p-4 flex gap-4 ${isDegraded ? 'bg-teal-900' : 'glass-liquid backdrop-blur-md shadow-card-rest'}`}
        style={{ border: '1px solid var(--teal-700, #004545)' }}
      >
        {!isDegraded && (
          <div className="w-4 h-4 bg-gold-400 rounded-full self-center animate-pulse flex-shrink-0" />
        )}
        <div className="flex flex-col min-w-0">
          <span className="text-[clamp(1rem,0.5vw+0.875rem,1.125rem)] font-bold text-text-primary font-body truncate">
            {title}
          </span>
          <span className="text-xs text-teal-50/80 mt-0.5 truncate">
            {description}
          </span>
        </div>
      </article>
    </div>
  );
}

export const LiveNotificationCard: React.FC<LiveNotificationCardProps> = ({
  variant = 'default',
  username = 'LiveNotificationCard',
  amount = '5.00',
  currency = 'USDC',
  message = 'Właśnie teraz',
  title,
  description = '100.00 USDC verified on-chain.',
  stackIndex = 0,
  isDegraded = false,
}) => {
  const resolvedTitle = title ?? (variant === 'stream' ? 'LiveEventStreamCard' : 'AsynchronousStackedToastCard');
  const resolvedAmount = typeof amount === 'number' ? amount.toFixed(2) : amount;

  switch (variant) {
    case 'stream':
      return <StreamVariant title={resolvedTitle} amount={resolvedAmount} currency={currency} />;
    case 'toast':
      return <ToastVariant username={username} amount={`${resolvedAmount} ${currency}`} />;
    case 'stacked':
      return <StackedVariant title={resolvedTitle} description={description} stackIndex={stackIndex} isDegraded={isDegraded} />;
    default:
      return <DefaultVariant username={username} message={message} amount={resolvedAmount} currency={currency} />;
  }
};

export default LiveNotificationCard;
