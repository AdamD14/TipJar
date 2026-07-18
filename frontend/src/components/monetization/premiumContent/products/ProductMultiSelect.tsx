"use client";

import React, { useRef, useEffect } from "react";
import clsx from "clsx";
import { Check } from "lucide-react";
import { useProducts } from "@/lib/api/premiumContent";
import { PRODUCT_TYPE_META } from "@/types/premiumContent";

interface ProductMultiSelectProps {
  selectedIds: string[];
  onChange: (ids: string[]) => void;
  label: string;
  error?: string;
}

export default function ProductMultiSelect({
  selectedIds,
  onChange,
  label,
  error,
}: ProductMultiSelectProps) {
  const { data: products, isLoading } = useProducts();
  const optionsRef = useRef<HTMLButtonElement[]>([]);

  useEffect(() => {
    if (!products) return;
    const firstSelectedIndex = products.findIndex((p) =>
      selectedIds.includes(p.id)
    );
    const focusIndex = firstSelectedIndex >= 0 ? firstSelectedIndex : 0;
    optionsRef.current[focusIndex]?.focus();
  }, [products, selectedIds]);

  const toggle = (id: string) => {
    onChange(
      selectedIds.includes(id)
        ? selectedIds.filter((i) => i !== id)
        : [...selectedIds, id],
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let newIndex = index;
    const maxIndex = (products?.length ?? 1) - 1;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      newIndex = Math.min(index + 1, maxIndex);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      newIndex = Math.max(index - 1, 0);
    } else if (e.key === "Home") {
      e.preventDefault();
      newIndex = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      newIndex = maxIndex;
    } else if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      const product = products?.[index];
      if (product) toggle(product.id);
    }

    if (newIndex !== index) {
      optionsRef.current[newIndex]?.focus();
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-white/30 ml-1">
        {label}
      </label>

      {error && (
        <div className="text-xs text-red-400" role="alert">{error}</div>
      )}

      {isLoading && (
        <p className="text-xs text-white/30 italic">Loading products…</p>
      )}

      {!isLoading && (products?.length ?? 0) === 0 && (
        <p className="text-xs text-white/30 italic">
          No published products yet. Create one first.
        </p>
      )}

      <div
        className="space-y-1.5 max-h-64 overflow-y-auto pr-1"
        role="listbox"
        aria-multiselectable="true"
        aria-label={label}
      >
        {products?.map((product, index) => {
          const selected = selectedIds.includes(product.id);
          return (
            <button
              key={product.id}
              ref={(el) => { optionsRef.current[index] = el!; }}
              type="button"
              role="option"
              aria-selected={selected}
              onClick={() => toggle(product.id)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              tabIndex={selected || index === 0 ? 0 : -1}
              className={clsx(
                "w-full flex items-center gap-3 text-left px-3 py-2.5 rounded-xl border transition-colors",
                selected
                  ? "border-gold-400 bg-gold-400/5"
                  : "border-white/10 hover:border-white/20",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-app"
              )}
            >
              <span
                className={clsx(
                  "w-4 h-4 rounded shrink-0 flex items-center justify-center border",
                  selected
                    ? "bg-gold-400 border-gold-400"
                    : "border-white/20",
                )}
                aria-hidden="true"
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