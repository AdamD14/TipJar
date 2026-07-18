"use client";

import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { use } from "react";
import Spinner from "@/components/ui/Spinner";
import { useProduct, useUpdateProductDelivery } from "@/lib/api/premiumContent";
import { PRODUCT_TYPE_META, DELIVERY_MODEL_META } from "@/types/premiumContent";
import { useToast } from "@/components/ui/notifications/Toast";
import Input from "@/components/ui/forms/Input";
import clsx from "clsx";

export default function ProductDeliveryPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = use(params);
  const { data: product, isLoading } = useProduct(productId);
  const updateDelivery = useUpdateProductDelivery(productId);
  const toast = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [delivery, setDelivery] = useState(product?.delivery ?? "instant");
  const [scheduledAt, setScheduledAt] = useState(product?.scheduledAt ?? "");

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner size="md" />
      </div>
    );
  }

  if (!product) {
    return <p className="text-sm text-white/30">Product not found.</p>;
  }

  const handleSave = async () => {
    if (delivery === "scheduled-drop" && !scheduledAt) return;
    setIsSaving(true);
    try {
      await updateDelivery.mutateAsync({ delivery, scheduledAt: scheduledAt || undefined });
      toast.push({ type: "success", text: "Delivery settings saved." });
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to save delivery settings.";
      toast.push({ type: "error", text: message });
    } finally {
      setIsSaving(false);
    }
  };

  const DELIVERY_OPTIONS = [
    { value: "instant", label: "Instant" },
    { value: "scheduled-drop", label: "Scheduled drop" },
    { value: "booking", label: "Booking / Live" },
  ] as const;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <Link
        href=".."
        className="inline-flex items-center gap-2 text-sm text-text-ds-tertiary hover:text-white transition-colors"
      >
        <ArrowLeft size={16} />
        Back to {product.title}
      </Link>

      <div className="flex items-center gap-3 border-l-4 border-teal-400 pl-4">
        <h1 className="text-sm font-heading font-medium text-teal-400">
          Delivery
        </h1>
      </div>

      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 space-y-6">
        <fieldset className="space-y-2">
          <legend className="text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-white/30 ml-1">
            Delivery method
          </legend>
          <div className="flex gap-2" role="radiogroup" aria-label="Delivery method">
            {DELIVERY_OPTIONS.map((opt) => (
              <label
                key={opt.value}
                className={clsx(
                  "flex-1 px-3 py-2.5 rounded-lg text-xs font-heading font-medium transition-colors text-center cursor-pointer",
                  delivery === opt.value
                    ? "bg-teal-700 text-white border border-teal-500/40"
                    : "bg-white/5 text-white/50 border border-white/10 hover:bg-white/10"
                )}
              >
                <input
                  type="radio"
                  name="delivery"
                  value={opt.value}
                  checked={delivery === opt.value}
                  onChange={() => setDelivery(opt.value)}
                  disabled={isSaving}
                  className="sr-only"
                />
                {opt.label}
              </label>
            ))}
          </div>
        </fieldset>

        {delivery === "scheduled-drop" && (
          <div className="space-y-2">
            <label className="text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-white/30 ml-1">
              Release date & time
            </label>
            <Input
              type="datetime-local"
              value={scheduledAt}
              min={new Date().toISOString().slice(0, 16)}
              onChange={(e) => setScheduledAt(e.target.value)}
              disabled={isSaving}
            />
          </div>
        )}

        <div className="pt-4 border-t border-white/10 flex justify-end">
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving || (delivery === "scheduled-drop" && !scheduledAt)}
            className="px-6 py-2.5 bg-teal-600 text-teal-900 font-heading font-semibold rounded-lg hover:bg-teal-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSaving ? "Saving..." : "Save delivery settings"}
          </button>
        </div>
      </div>
    </div>
  );
}