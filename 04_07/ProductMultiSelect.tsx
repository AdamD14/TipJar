"use client";

import React from "react";
import clsx from "clsx";
import { Check } from "lucide-react";
import { useProducts } from "../../lib/api/premiumContent";
import { PRODUCT_TYPE_META } from "../../types/premiumContent";

interface ProductMultiSelectProps {
  selectedIds: string[];
  onChange: (ids: string[]) => void;
  /** Etykieta nad listą — różni się między Tier ("Included products") i Bundle ("Bundle contents"). */
  label: string;
}

/**
 * Wspólny multi-select produktów. Używany przez tiers/[tier]/ (includedProductIds)
 * i bundles/create/ (productIds) — ten sam UI, inna etykieta i inny efekt
 * biznesowy po stronie backendu, ale front nie musi tego duplikować.
 */
export default function ProductMultiSelect({
  selectedIds,
  onChange,
  label,
}: ProductMultiSelectProps) {
  const { data: products, isLoading } = useProducts();

  const toggle = (id: string) => {
    onChange(
      selectedIds.includes(id)
        ? selectedIds.filter((i) => i !== id)
        : [...selectedIds, id],
    );
  };

  return (
    <div className="space-y-2">
      <label className="text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-white/30 ml-1">
        {label}
      </label>

      {isLoading && (
        <p className="text-xs text-white/30 italic">Loading products…</p>
      )}

      {!isLoading && (products?.length ?? 0) === 0 && (
        <p className="text-xs text-white/30 italic">
          No published products yet. Create one first.
        </p>
      )}

      <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1">
        {products?.map((product) => {
          const selected = selectedIds.includes(product.id);
          return (
            <button
              key={product.id}
              type="button"
              onClick={() => toggle(product.id)}
              className={clsx(
                "w-full flex items-center gap-3 text-left px-3 py-2.5 rounded-xl border transition-colors",
                selected
                  ? "border-gold-400 bg-gold-400/5"
                  : "border-white/10 hover:border-white/20",
              )}
            >
              <span
                className={clsx(
                  "w-4 h-4 rounded shrink-0 flex items-center justify-center border",
                  selected
                    ? "bg-gold-400 border-gold-400"
                    : "border-white/20",
                )}
              >
                {selected && <Check size={12} className="text-teal-900" />}
              </span>
              <span className="flex-1 min-w-0">
                <span className="block text-sm text-text-ds-primary truncate">
                  {product.title}
                </span>
                <span className="block text-[10px] text-white/30 uppercase tracking-wider">
                  {PRODUCT_TYPE_META[product.type].label}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
