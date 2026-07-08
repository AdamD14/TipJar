"use client";

import React, { useRef, useEffect } from "react";
import clsx from "clsx";
import type { DisplayCategory } from "@/types/premiumContent";

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
  error?: string;
}

export default function DisplayCategoryPicker({
  value,
  onChange,
  error,
}: DisplayCategoryPickerProps) {
  const buttonsRef = useRef<HTMLButtonElement[]>([]);

  useEffect(() => {
    const selectedIndex = buttonsRef.current.findIndex(
      (btn) => btn.getAttribute("aria-checked") === "true"
    );
    if (selectedIndex >= 0) {
      buttonsRef.current[selectedIndex]?.focus();
    }
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let newIndex = index;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      newIndex = (index + 1) % CATEGORIES.length;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      newIndex = (index - 1 + CATEGORIES.length) % CATEGORIES.length;
    } else if (e.key === "Home") {
      e.preventDefault();
      newIndex = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      newIndex = CATEGORIES.length - 1;
    }

    if (newIndex !== index) {
      buttonsRef.current[newIndex]?.focus();
    }
  };

  return (
    <fieldset className="space-y-2">
      <legend className="text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-white/30 ml-1">
        Storefront category (optional)
      </legend>
      <p className="text-[11px] text-white/30 mb-2">
        Only affects how this is grouped on your public profile.
      </p>

      {error && (
        <div className="text-xs text-red-400" role="alert">{error}</div>
      )}

      <div
        className="flex flex-wrap gap-2"
        role="radiogroup"
        aria-label="Storefront category"
      >
        {CATEGORIES.map((cat, index) => (
          <button
            key={cat.value}
            ref={(el) => { buttonsRef.current[index] = el!; }}
            type="button"
            role="radio"
            aria-checked={value === cat.value}
            aria-label={cat.label}
            onClick={() =>
              onChange(value === cat.value ? undefined : cat.value)
            }
            onKeyDown={(e) => handleKeyDown(e, index)}
            tabIndex={value === cat.value ? 0 : -1}
            className={clsx(
              "px-3 py-1.5 rounded-full text-xs font-heading font-medium transition-colors border",
              value === cat.value
                ? "bg-gold-400 text-teal-900 border-gold-400"
                : "bg-transparent text-white/50 border-white/15 hover:border-white/30",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-app"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}