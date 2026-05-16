"use client";

export interface TipSummaryProps {
  amount: number;
  fee: number;
}

export const TipSummary = ({ amount, fee }: TipSummaryProps) => (
  <div className="mb-4 text-sm text-text-ds-secondary">
    <p>
      Creator receives:{" "}
      <span className="font-heading font-bold text-gold-400">
        ${(amount - fee).toFixed(2)}
      </span>
    </p>
    <p>Fee: ${fee.toFixed(2)}</p>
  </div>
);
