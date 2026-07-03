"use client";

import React from "react";
import { PencilLine, Eye } from "lucide-react";
import Input from "@/components/ui/forms/Input";
import type {
  Product,
  ProductType,
} from "../../types/premiumContent";
import { PRODUCT_TYPE_META } from "../../types/premiumContent";
import CourseModulesEditor from "./content/CourseModulesEditor";
import LiveSessionScheduler from "./content/LiveSessionScheduler";
import GenericContentUpload from "./content/GenericContentUpload";
import ProductAccessSection from "./ProductAccessSection";
import DisplayCategoryPicker from "./DisplayCategoryPicker";

export interface ProductDraft
  extends Omit<Partial<Product>, "type">,
    Pick<Product, "type"> {
  files?: File[]; // lokalny stan uploadu przed submitem, nie część Product
}

interface ProductDetailsFormProps {
  draft: ProductDraft;
  onChange: (draft: ProductDraft) => void;
}

/**
 * Krok 2 kreatora. Renderuje inny content editor w zależności od draft.type,
 * potem wspólne dla wszystkich typów: access/pricing/delivery + storefront
 * category. Prawa kolumna to live preview tego, co fan zobaczy na karcie
 * produktu — ten sam wzorzec config/preview co TargetBar/GoalBar.
 */
export default function ProductDetailsForm({
  draft,
  onChange,
}: ProductDetailsFormProps) {
  const set = <K extends keyof ProductDraft>(key: K, value: ProductDraft[K]) =>
    onChange({ ...draft, [key]: value });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start max-w-5xl mx-auto">
      {/* LEFT: Configuration */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 border-l-4 border-teal-400 pl-4">
          <PencilLine size={16} className="text-teal-400" />
          <h2 className="text-sm font-heading font-medium text-teal-400">
            Details
          </h2>
        </div>

        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 space-y-6 shadow-2xl">
          <div className="space-y-2">
            <label className="text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-white/30 ml-1">
              Title
            </label>
            <Input
              value={draft.title ?? ""}
              onChange={(e) => set("title", e.target.value)}
            />
          </div>

          {/* Type-specific content editor */}
          {draft.type === "course" && (
            <CourseModulesEditor
              modules={draft.modules ?? []}
              onChange={(modules) => set("modules", modules)}
            />
          )}

          {draft.type === "live-session" && (
            <LiveSessionScheduler
              value={
                draft.liveSession ?? {
                  scheduledAt: "",
                  durationMinutes: 60,
                }
              }
              onChange={(v) => set("liveSession", v)}
            />
          )}

          {draft.type !== "course" && draft.type !== "live-session" && (
            <GenericContentUpload
              type={draft.type}
              files={draft.files ?? []}
              onChange={(files) => set("files", files)}
            />
          )}

          <div className="h-px bg-white/5" />

          <ProductAccessSection
            accessModel={draft.accessModel ?? "one-time"}
            price={draft.price}
            currency={draft.currency ?? "USDC"}
            delivery={draft.delivery ?? "instant"}
            scheduledAt={draft.scheduledAt}
            onAccessModelChange={(v) => set("accessModel", v)}
            onPriceChange={(v) => set("price", v)}
            onDeliveryChange={(v) => set("delivery", v)}
            onScheduledAtChange={(v) => set("scheduledAt", v)}
          />

          <div className="h-px bg-white/5" />

          <DisplayCategoryPicker
            value={draft.displayCategory}
            onChange={(v) => set("displayCategory", v)}
          />
        </div>
      </section>

      {/* RIGHT: Preview */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 border-l-4 border-teal-400 pl-4">
          <Eye size={16} className="text-teal-400" />
          <h2 className="text-sm font-heading font-medium text-teal-400">
            Storefront Preview
          </h2>
        </div>
        <ProductPreviewCard draft={draft} />
      </section>
    </div>
  );
}

function ProductPreviewCard({ draft }: { draft: ProductDraft }) {
  const meta = PRODUCT_TYPE_META[draft.type];
  const priceLabel =
    draft.accessModel === "tier-included"
      ? "Included in tier"
      : draft.price
        ? `$${draft.price.toLocaleString()} ${draft.currency ?? "USDC"}`
        : "—";

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-teal-900 to-teal-800 border border-teal-500/20 rounded-xl p-6 shadow-2 backdrop-blur-md">
      <p className="text-[10px] font-heading font-bold text-teal-500/40 uppercase tracking-widest mb-1">
        {meta.label}
        {draft.displayCategory ? ` · ${draft.displayCategory}` : ""}
      </p>
      <h3 className="text-xl font-heading font-bold text-text-ds-primary tracking-tight leading-tight">
        {draft.title || "Untitled product"}
      </h3>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-teal-500/40 uppercase tracking-widest">
          {draft.delivery === "scheduled-drop"
            ? "Drops soon"
            : draft.delivery === "booking"
              ? "Live / booked"
              : "Instant access"}
        </span>
        <span className="text-lg font-heading font-bold text-gold-400 tnum">
          {priceLabel}
        </span>
      </div>
    </div>
  );
}
