"use client";
import React, { useState, useRef } from 'react';

export interface PremiumSubscriptionCardProps {
  tierName?: string;
  title?: string;
  description?: string;
  onUpgrade?: () => void;
}

export const PremiumSubscriptionCard: React.FC<PremiumSubscriptionCardProps> = ({
  tierName = 'PRO TIER',
  title = 'Gala Dinner',
  description = 'Unlock gasless microtransactions, programmable wallet automations, and zero platform fees.',
  onUpgrade
}) => {
  const borderRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative p-[2px] rounded-2xl w-full isolate overflow-hidden"
      style={{ transition: 'filter 0.3s ease' }}
      onMouseEnter={(e) => {
        e.currentTarget.style.filter = 'brightness(1.04)';
        if (borderRef.current) borderRef.current.style.animationDuration = '2s';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.filter = '';
        if (borderRef.current) borderRef.current.style.animationDuration = '4s';
      }}
    >
      <div
        ref={borderRef}
        className="absolute inset-0 -z-10"
        style={{
          background: 'conic-gradient(from 0deg, var(--gold-400), var(--teal-900), var(--gold-400))',
          animation: 'spin 4s linear infinite',
          willChange: 'transform',
        }}
      />
      <div
        className="absolute inset-[2px] rounded-[14px] -z-10"
        style={{
          backgroundColor: 'var(--teal-900)',
          boxShadow: 'inset 0 20px 50px -20px color-mix(in oklch, var(--gold-400) 15%, transparent)',
        }}
      />

      <div className="p-6 h-full flex flex-col relative z-10">
        <div
          className="w-max px-3 py-1 rounded-full tracking-widest mb-5"
          style={{
            backgroundColor: 'color-mix(in oklch, var(--gold-400) 15%, transparent)',
            border: '1px solid var(--gold-400)',
            color: 'var(--color-text-secondary)',
            fontSize: '10px',
            boxShadow: '0 0 10px color-mix(in oklch, var(--gold-400) 60%, transparent)',
          }}
        >
          {tierName}
        </div>
        <h3
          className="text-3xl font-light font-heading"
          style={{ color: 'var(--gold-400)' }}
        >
          {title}
        </h3>
        <p
          className="text-sm mt-3 mb-8 leading-relaxed"
          style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}
        >
          {description}
        </p>
        <button
          onClick={onUpgrade}
          className="mt-auto w-full py-3.5 rounded-xl font-bold tracking-wide cursor-pointer active:scale-95"
          style={{
            backgroundColor: 'var(--gold-400)',
            color: 'var(--teal-900)',
            transition: 'filter 0.3s ease, transform 0.1s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.filter = 'brightness(1.1)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.filter = ''; }}
        >
          PremiumSubscriptionCard
        </button>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default PremiumSubscriptionCard;
