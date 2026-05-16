"use client";

import React from 'react';

interface GoalBadgeProps {
  percent: number;
  amount: number;
  goal: number;
  currency: 'USDC' | 'USD' | 'PLN';
  className?: string;
}

export default function GoalBadge({ percent, amount, goal, currency, className = '' }: GoalBadgeProps) {
  const clampedPercent = Math.min(100, Math.max(0, percent));

  const formatAmount = (value: number) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}k`;
    }
    return value.toString();
  };

  const getCurrencySymbol = () => {
    switch (currency) {
      case 'USD':
      case 'USDC':
        return '$';
      case 'PLN':
        return 'zł';
      default:
        return '$';
    }
  };

  return (
    <div className={`inline-flex items-center gap-2 rounded-full bg-gold-400/10 border border-gold-400/30 px-3 py-1.5 text-xs ${className}`}>
      <div className="relative w-4 h-4">
        <svg className="w-4 h-4 transform -rotate-90" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="rgb(var(--color-gold-400) / 0.2)" strokeWidth="3" fill="none" />
          <circle
            cx="12" cy="12" r="10"
            stroke="var(--color-gold-400)" strokeWidth="3" fill="none"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 10}`}
            strokeDashoffset={`${2 * Math.PI * 10 * (1 - clampedPercent / 100)}`}
            className="transition-all duration-300 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[8px] font-bold text-gold-400">{clampedPercent}%</span>
        </div>
      </div>
      <span className="font-medium text-gold-400 uppercase tracking-tighter">
        {getCurrencySymbol()}{formatAmount(amount)}/{formatAmount(goal)}
      </span>
    </div>
  );
}
