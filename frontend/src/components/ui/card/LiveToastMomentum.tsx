"use client";
import React from 'react';

export interface LiveToastMomentumProps {
  username?: string;
  amount?: string;
}

export const LiveToastMomentum: React.FC<LiveToastMomentumProps> = ({
  username = '@LiveToastMomentum',
  amount = '5.00 USDC'
}) => {
  return (
    <div
      className="glass-liquid gpu-layer relative rounded-xl p-4 flex gap-4 items-center"
      style={{
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
};

export default LiveToastMomentum;
