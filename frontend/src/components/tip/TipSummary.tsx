"use client";

export interface TipSummaryProps {
  amount: number;
  fee: number;
}

export const TipSummary = ({ amount, fee }: TipSummaryProps) => (
  <div className="mb-4 text-sm text-brand-light-text">
    <p>
      Twórca otrzyma: <span className="font-bold text-brand-gold">${(amount - fee).toFixed(2)}</span>
    </p>
    <p>Fee: ${fee.toFixed(2)}</p>
  </div>
);
