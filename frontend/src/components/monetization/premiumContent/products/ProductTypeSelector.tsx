"use client";

import React, { useRef, useEffect } from "react";
import clsx from "clsx";
import {
  Image as GalleryIcon,
  Video,
  Music,
  FileText,
  GraduationCap,
  Radio,
} from "lucide-react";
import type { ProductType } from "@/types/premiumContent";
import { PRODUCT_TYPE_META } from "@/types/premiumContent";

const TYPE_ICONS: Record<ProductType, React.ElementType> = {
  gallery: GalleryIcon,
  video: Video,
  audio: Music,
  document: FileText,
  course: GraduationCap,
  "live-session": Radio,
};

const TYPES: ProductType[] = [
  "gallery",
  "video",
  "audio",
  "document",
  "course",
  "live-session",
];

interface ProductTypeSelectorProps {
  value?: ProductType;
  onSelect: (type: ProductType) => void;
  error?: string;
}

export default function ProductTypeSelector({
  value,
  onSelect,
  error,
}: ProductTypeSelectorProps) {
  const radiosRef = useRef<HTMLButtonElement[]>([]);

  useEffect(() => {
    const selectedIndex = radiosRef.current.findIndex(
      (btn) => btn.getAttribute("aria-checked") === "true"
    );
    if (selectedIndex >= 0) {
      radiosRef.current[selectedIndex]?.focus();
    }
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let newIndex = index;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      newIndex = (index + 1) % TYPES.length;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      newIndex = (index - 1 + TYPES.length) % TYPES.length;
    } else if (e.key === "Home") {
      e.preventDefault();
      newIndex = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      newIndex = TYPES.length - 1;
    }

    if (newIndex !== index) {
      radiosRef.current[newIndex]?.focus();
    }
  };

  return (
    <fieldset className="space-y-6 max-w-5xl mx-auto">
      <legend className="text-sm font-heading font-medium text-teal-400 flex items-center gap-3 border-l-4 border-teal-400 pl-4">
        What are you selling?
      </legend>
      <p className="text-xs text-white/40 ml-1">
        Choose the format. You can change this later before publishing.
      </p>

      {error && (
        <div className="text-xs text-red-400" role="alert">{error}</div>
      )}

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        role="radiogroup"
        aria-label="Product type"
        aria-describedby={error ? undefined : "type-hint"}
      >
        {TYPES.map((type, index) => {
          const meta = PRODUCT_TYPE_META[type];
          const Icon = TYPE_ICONS[type];
          const selected = value === type;

          return (
            <button
              key={type}
              ref={(el) => { radiosRef.current[index] = el!; }}
              type="button"
              role="radio"
              aria-checked={selected}
              aria-label={meta.label}
              onClick={() => onSelect(type)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              tabIndex={selected ? 0 : -1}
              className={clsx(
                "relative p-6 rounded-2xl border transition-all duration-300 [transition-timing-function:var(--ease-spring)] group",
                selected
                  ? "border-gold-400 bg-gold-400/5 shadow-[0_0_0_1px_rgba(255,215,0,0.15)]"
                  : "border-white/10 hover:border-white/20 hover:bg-white/5",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-app"
              )}
            >
              <div className={clsx(
                "w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors",
                selected
                  ? "bg-gold-400/10 text-gold-400"
                  : "bg-white/5 text-white/50 group-hover:text-gold-400/50",
              )}>
                <Icon size={24} />
              </div>
              <h3 className="text-lg font-heading font-bold text-text-ds-primary mb-1">
                {meta.label}
              </h3>
              <p className="text-xs text-white/40">
                {meta.description}
              </p>
              {selected && (
                <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gold-400 flex items-center justify-center">
                  <Radio size={10} className="text-teal-900" />
                </div>
              )}
            </button>
          );
        })}
      </div>
      <span id="type-hint" className="sr-only">
        Use arrow keys to navigate between options, press Enter or Space to select
      </span>
    </fieldset>
  );
}