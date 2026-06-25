"use client";
import React from 'react';

type LiveNotificationCardProps = {
  username: string;
  amount: number | string;
  message?: string;
};

export default function LiveNotificationCard({ username, amount, message }: LiveNotificationCardProps) {
  return (
    <div
      className="glass-liquid gpu-layer relative flex items-center justify-between p-5 mb-3 rounded-2xl"
      style={{
        opacity: 1,
        transition: 'filter 0.3s ease, opacity 0.7s cubic-bezier(0.2,0.8,0.2,1), transform 0.7s cubic-bezier(0.2,0.8,0.2,1)',
        animation: 'notifyIn 400ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.filter = 'brightness(1.03)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.filter = ''; }}
    >
      <div className="flex items-center gap-4">
        <div
          className="w-12 h-12 rounded-full p-[2px]"
          style={{
            background: 'linear-gradient(135deg, var(--teal-800), var(--gold-400))',
            boxShadow: 'color-mix(in oklch, var(--gold-400) 40%, transparent) 0 0 20px 4px',
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
        +{amount} USDC
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
