"use client";

import React from "react";
import clsx from "clsx";
import type { DisplayCategory } from "../../types/premiumContent";

const CATEGORIES: { value: DisplayCategory; label: string }[] = [
  { value: "courses-learning", label: "Courses & Learning" },
  { value: "programs-coaching", label: "Programs & Coaching" },
  { value: "digital-assets", label: "Digital Assets" },
  { value: "premium-media", label: "Premium Media" },
  { value: "live-experiences", label: "Live Experiences" },
];

interface DisplayCategoryPickerProps {
  value?: DisplayCategory;
  onChange: (value: DisplayCategory | undefined) => void;
}

/**
 * WYŁĄCZNIE tag marketingowy do grupowania kafelków na public storefront.
 * Zero wpływu na pricing/access/delivery. "Membership Access" celowo
 * pominięte tutaj — to sekcja wynikająca z Tier, nie wartość na produkcie.
 */
export default function DisplayCategoryPicker({
  value,
  onChange,
}: DisplayCategoryPickerProps) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-white/30 ml-1">
        Storefront category (optional)
      </label>
      <p className="text-[11px] text-white/30 mb-2">
        Only affects how this is grouped on your public profile.
      </p>
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            type="button"
            onClick={() =>
              onChange(value === cat.value ? undefined : cat.value)
            }
            className={clsx(
              "px-3 py-1.5 rounded-full text-xs font-heading font-medium transition-colors border",
              value === cat.value
                ? "bg-gold-400 text-teal-900 border-gold-400"
                : "bg-transparent text-white/50 border-white/15 hover:border-white/30",
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
}
