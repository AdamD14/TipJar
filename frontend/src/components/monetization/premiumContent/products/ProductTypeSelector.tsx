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
}

/**
 * Krok 1 kreatora — wybór typu produktu. Karta na typ, ikona + label + opis.
 * Wybrany stan: złoty border + subtelne tło. Kliknięcie -> onSelect -> wizard idzie do kroku 2.
 */
export default function ProductTypeSelector({
  value,
  onSelect,
}: ProductTypeSelectorProps) {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-3 border-l-4 border-teal-400 pl-4">
        <h2 className="text-sm font-heading font-medium text-teal-400">
          What are you selling?
        </h2>
      </div>
      <p className="text-xs text-white/40 ml-1">
        Choose the format. You can change this later before publishing.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {TYPES.map((type) => {
          const meta = PRODUCT_TYPE_META[type];
          const Icon = TYPE_ICONS[type];
          const selected = value === type;

          return (
            <button
              key={type}
              type="button"
              onClick={() => onSelect(type)}
              className={clsx(
                "relative p-6 rounded-2xl border transition-all duration-300 [transition-timing-function:var(--ease-spring)] group",
                selected
                  ? "border-gold-400 bg-gold-400/5 shadow-[0_0_0_1px_rgba(255,215,0,0.15)]"
                  : "border-white/10 hover:border-white/20 hover:bg-white/5",
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
    </div>
  );
}