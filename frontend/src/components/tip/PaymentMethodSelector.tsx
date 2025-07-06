"use client";

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

export const PaymentMethodSelector = ({ methods, selected, onSelect, balance }: PaymentMethodSelectorProps) => (
  <div className="mb-4">
    <div className="mb-2 flex gap-3">
      {methods.map((m) => (
        <button
          key={m.id}
          type="button"
          onClick={() => onSelect(m.id)}
          title={m.tooltip}
          className={`rounded-lg border px-3 py-2 ${
            selected === m.id ? "border-brand-gold bg-brand-gold text-brand-dark" : "border-brand-gold text-brand-gold"
          }`}
        >
          {m.icon}
        </button>
      ))}
    </div>
    {selected === "internal" && balance !== undefined && (
      <div className="text-sm text-brand-light-text">Saldo: ${balance.toFixed(2)}</div>
    )}
  </div>
);
