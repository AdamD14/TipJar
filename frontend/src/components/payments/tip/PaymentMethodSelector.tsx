"use client";
import Button from "@/components/ui/buttons/Button";

export interface PaymentMethod {
  id: string;
  label: string;
  icon: React.ReactNode;
  tooltip: string;
}

export interface PaymentMethodSelectorProps {
  methods: PaymentMethod[];
  selected: string;
  onSelect: (id: string) => void;
  balance?: number;
}

export const PaymentMethodSelector = ({
  methods,
  selected,
  onSelect,
  balance,
}: PaymentMethodSelectorProps) => (
  <div className="mb-4">
    <div className="mb-2 flex gap-3">
      {methods.map((m) => (
        <Button
          key={m.id}
          type="button"
          onClick={() => onSelect(m.id)}
          title={m.tooltip}
          variant={selected === m.id ? "primary" : "outline"}
          size="sm"
        >
          {m.icon}
        </Button>
      ))}
    </div>
    {selected === "internal" && balance !== undefined && (
      <div className="text-sm text-text-ds-secondary">
        Balance: ${balance.toFixed(2)}
      </div>
    )}
  </div>
);
