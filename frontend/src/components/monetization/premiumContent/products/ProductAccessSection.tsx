"use client";

import React from "react";
import clsx from "clsx";
import Input from "@/components/ui/forms/Input";
import type { AccessModel, DeliveryModel } from "@/types/premiumContent";

const ACCESS_OPTIONS: { value: AccessModel; label: string; hint: string }[] = [
  {
    value: "one-time",
    label: "One-time purchase",
    hint: "Fan pays once, owns it forever",
  },
  {
    value: "tier-included",
    label: "Included in a tier",
    hint: "No separate price — bundled into subscription",
  },
  {
    value: "add-on",
    label: "Paid add-on for subscribers",
    hint: "Discounted price for active tier members",
  },
];

const DELIVERY_OPTIONS: { value: DeliveryModel; label: string }[] = [
  { value: "instant", label: "Instant" },
  { value: "scheduled-drop", label: "Scheduled drop" },
  { value: "booking", label: "Booking / live" },
];

interface ProductAccessSectionProps {
  accessModel: AccessModel;
  price?: number;
  currency: string;
  delivery: DeliveryModel;
  scheduledAt?: string;
  onAccessModelChange: (v: AccessModel) => void;
  onPriceChange: (v: number | undefined) => void;
  onDeliveryChange: (v: DeliveryModel) => void;
  onScheduledAtChange: (v: string) => void;
}

/**
 * accessModel === "tier-included" -> pole price znika (cena żyje w
 * Tier.price, nie na produkcie). To wymuszenie reguły z grafu relacji:
 * produkt wliczony w tier nie ma własnej ceny.
 */
export default function ProductAccessSection({
  accessModel,
  price,
  currency,
  delivery,
  scheduledAt,
  onAccessModelChange,
  onPriceChange,
  onDeliveryChange,
  onScheduledAtChange,
}: ProductAccessSectionProps) {
  const needsPrice = accessModel !== "tier-included";

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <label className="text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-white/30 ml-1">
          Access model
        </label>
        <div className="space-y-2">
          {ACCESS_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onAccessModelChange(opt.value)}
              className={clsx(
                "w-full text-left px-4 py-3 rounded-xl border transition-colors",
                accessModel === opt.value
                  ? "border-gold-400 bg-gold-400/5"
                  : "border-white/10 hover:border-white/20",
              )}
            >
              <span className="block text-sm font-heading font-medium text-text-ds-primary">
                {opt.label}
              </span>
              <span className="block text-xs text-white/40 mt-0.5">
                {opt.hint}
              </span>
            </button>
          ))}
        </div>
      </div>

      {needsPrice && (
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-white/30 ml-1">
              Price ({currency})
            </label>
            <Input
              type="text"
              inputMode="numeric"
              value={price ?? ""}
              onChange={(e) => {
                const v = e.target.value.replace(/\D/g, "");
                onPriceChange(v ? Number(v) : undefined);
              }}
              className="tnum"
            />
          </div>
        </div>
      )}

      <div className="space-y-2">
        <label className="text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-white/30 ml-1">
          Delivery
        </label>
        <div className="flex gap-2">
          {DELIVERY_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onDeliveryChange(opt.value)}
              className={clsx(
                "flex-1 px-3 py-2 rounded-lg text-xs font-heading font-medium transition-colors",
                delivery === opt.value
                  ? "bg-teal-700 text-white border border-teal-500/40"
                  : "bg-white/5 text-white/50 border border-white/10 hover:bg-white/10",
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {delivery === "scheduled-drop" && (
          <Input
            type="datetime-local"
            value={scheduledAt ?? ""}
            min={new Date().toISOString().slice(0, 16)}
            onChange={(e) => onScheduledAtChange(e.target.value)}
            className="mt-2"
          />
        )}
      </div>
    </div>
  );
}