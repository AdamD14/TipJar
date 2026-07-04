"use client";

import React from "react";
import clsx from "clsx";
import {
  Image as GalleryIcon,
  Video,
  Music,
  FileText,
  GraduationCap,
  Radio,
} from "lucide-react";
import type { ProductType } from "../../types/premiumContent";
import { PRODUCT_TYPE_META } from "../../types/premiumContent";

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
}

/**
 * Krok 1 kreatora produktu (studio/monetization/premium-content/products/create/).
 * Wybór typu determinuje pola formularza w kroku 2 (np. course pokazuje
 * moduły, live-session pokazuje datę/limit miejsc). Nie ma tu żadnej
 * logiki DisplayCategory — to osobny, opcjonalny krok, niezależny od typu.
 */
export default function ProductTypeSelector({
  value,
  onSelect,
}: ProductTypeSelectorProps) {
  return (
    <div className="w-full">
      <div className="mb-6 border-l-4 border-teal-400 pl-4">
        <h2 className="text-sm font-heading font-medium text-teal-400">
          What are you selling?
        </h2>
        <p className="text-xs text-white/40 mt-1">
          Choose a content type. You&apos;ll set pricing and access in the
          next step.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {TYPES.map((type) => {
          const Icon = TYPE_ICONS[type];
          const meta = PRODUCT_TYPE_META[type];
          const selected = value === type;

          return (
            <button
              key={type}
              type="button"
              onClick={() => onSelect(type)}
              className={clsx(
                "text-left p-5 rounded-2xl border transition-all",
                "bg-black/40 backdrop-blur-xl",
                selected
                  ? "border-gold-400 shadow-[0_0_0_1px_rgba(255,215,0,0.4)]"
                  : "border-white/10 hover:border-white/20",
              )}
            >
              <Icon
                size={22}
                className={clsx(
                  "mb-3",
                  selected ? "text-gold-400" : "text-teal-400",
                )}
              />
              <h3 className="font-heading font-semibold text-sm text-text-ds-primary">
                {meta.label}
              </h3>
              <p className="text-xs text-text-ds-secondary mt-1 leading-snug">
                {meta.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
