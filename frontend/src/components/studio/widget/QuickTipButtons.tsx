"use client";

import Button from '@/components/ui/buttons/Button';

export interface QuickTipButtonsProps {
  amounts: number[];
  active: number;
  onSelect: (value: number) => void;
}

export const QuickTipButtons = ({
  amounts,
  active,
  onSelect,
}: QuickTipButtonsProps) => (
  <div className="mb-4 flex gap-2">
    {amounts.map((amt) => (
      <Button
        key={amt}
        variant={active === amt ? "gold" : "outline"}
        size="sm"
        onClick={() => onSelect(amt)}
      >
        {`$${amt}`}
      </Button>
    ))}
  </div>
);
