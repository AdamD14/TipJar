"use client";
import React from 'react';

export interface HolographicNodeCardProps {
  nodeName?: string;
  latency?: string;
  peersCount?: number;
}

export const HolographicNodeCard: React.FC<HolographicNodeCardProps> = ({
  nodeName = 'HolographicNodeCard',
  latency = '12ms',
  peersCount = 144
}) => {
  return (
    <div
      className="glass-liquid gpu-layer relative w-full min-h-[220px] rounded-2xl overflow-hidden flex flex-col items-center justify-center"
      style={{
        border: '1px solid color-mix(in oklch, var(--purple-300) 40%, transparent)',
        boxShadow: 'inset 0 0 50px color-mix(in oklch, var(--purple-300) 15%, transparent)',
        transition: 'filter 0.3s ease',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.filter = 'hue-rotate(-5deg) brightness(1.05)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.filter = ''; }}
    >
      <div
        className="absolute inset-0 opacity-20 pointer-events-none mix-blend-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cpath d='M50 0L100 25L50 50L0 25z' fill='none' stroke='%234D194D' stroke-width='1'/%3E%3Cpath d='M0 25V75L50 100V50z' fill='none' stroke='%234D194D' stroke-width='1'/%3E%3Cpath d='M100 25V75L50 100V50z' fill='none' stroke='%234D194D' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px',
        }}
      />

      <div
        className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center"
        style={{
          border: '2px solid var(--purple-300)',
          backgroundColor: 'var(--teal-900)',
          boxShadow: 'inset 0 0 15px color-mix(in oklch, var(--purple-300) 40%, transparent), 0 0 20px 4px color-mix(in oklch, var(--gold-400) 30%, transparent)',
        }}
      >
        <div
          className="w-5 h-5 rounded-full"
          style={{
            backgroundColor: 'var(--purple-300)',
            animation: 'pulse-breath 2s ease-in-out infinite',
          }}
        />
      </div>

      <div className="relative z-10 mt-5 text-center">
        <h3
          className="text-sm tracking-widest font-heading"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          {nodeName}
        </h3>
        <p
          className="text-[10px] mt-1"
          style={{ color: 'color-mix(in oklch, var(--color-text-tertiary) 70%, transparent)' }}
        >
          Latency: {latency} / Peers: {peersCount}
        </p>
      </div>
    </div>
  );
};

export default HolographicNodeCard;
