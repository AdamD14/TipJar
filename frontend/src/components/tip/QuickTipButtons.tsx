"use client";

export interface QuickTipButtonsProps {
  amounts: number[];
  active: number;
  onSelect: (value: number) => void;
}

export const QuickTipButtons = ({ amounts, active, onSelect }: QuickTipButtonsProps) => (
  <div className="mb-4 flex gap-2">
    {amounts.map((amt) => (
      <button
        key={amt}
        type="button"
        onClick={() => onSelect(amt)}
        className={`rounded-md border border-brand-gold px-3 py-1 font-mono ${
          active === amt ? "bg-brand-gold text-brand-dark" : "text-brand-gold"
        }`}
      >
        {`$${amt}`}
      </button>
    ))}
  </div>
);
