"use client";

import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { use } from "react";
import Spinner from "@/components/ui/Spinner";
import { useProduct, useUpdateProductAccess } from "@/lib/api/premiumContent";
import { PRODUCT_TYPE_META, ACCESS_MODEL_META } from "@/types/premiumContent";
import { useToast } from "@/components/ui/notifications/Toast";
import Input from "@/components/ui/forms/Input";
import clsx from "clsx";

export default function ProductAccessPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = use(params);
  const { data: product, isLoading } = useProduct(productId);
  const updateAccess = useUpdateProductAccess(productId);
  const toast = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [accessModel, setAccessModel] = useState(product?.accessModel ?? "one-time");
  const [price, setPrice] = useState(product?.price ?? "");
  const [currency] = useState(product?.currency ?? "USDC");

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
    setIsSaving(true);
    try {
      await updateAccess.mutateAsync({
        accessModel,
        price: accessModel !== "tier-included" ? (price ? Number(price) : undefined) : undefined,
        currency,
      });
      toast.push({ type: "success", text: "Access settings saved." });
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to save access settings.";
      toast.push({ type: "error", text: message });
    } finally {
      setIsSaving(false);
    }
  };

  const needsPrice = accessModel !== "tier-included";

  const ACCESS_OPTIONS = [
    { value: "one-time", label: "One-time purchase", hint: "Fan pays once, owns it forever" },
    { value: "tier-included", label: "Included in a tier", hint: "No separate price — bundled into subscription" },
    { value: "add-on", label: "Paid add-on for subscribers", hint: "Discounted price for active tier members" },
  ];

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
          Access & Pricing
        </h1>
      </div>

      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 space-y-6">
        <fieldset className="space-y-2">
          <legend className="text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-white/30 ml-1">
            Access model
          </legend>
          <div className="space-y-2" role="radiogroup" aria-label="Access model">
            {ACCESS_OPTIONS.map((opt) => (
              <label
                key={opt.value}
                className={clsx(
                  "w-full px-4 py-3 rounded-xl border transition-colors cursor-pointer flex items-center gap-3",
                  accessModel === opt.value
                    ? "border-gold-400 bg-gold-400/5"
                    : "border-white/10 hover:border-white/20"
                )}
              >
                <input
                  type="radio"
                  name="accessModel"
                  value={opt.value}
                  checked={accessModel === opt.value}
                  onChange={() => setAccessModel(opt.value)}
                  disabled={isSaving}
                  className="sr-only"
                />
                <span className="flex-1">
                  <span className="block text-sm font-heading font-medium text-text-ds-primary">
                    {opt.label}
                  </span>
                  <span className="block text-xs text-white/40 mt-0.5">{opt.hint}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        {needsPrice && (
          <div className="space-y-2">
            <label className="text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-white/30 ml-1">
              Price ({currency})
            </label>
            <Input
              type="text"
              inputMode="numeric"
              value={price}
              onChange={(e) => {
                const v = e.target.value.replace(/\D/g, "");
                setPrice(v);
              }}
              className="tnum"
              disabled={isSaving}
            />
          </div>
        )}

        <div className="pt-4 border-t border-white/10 flex justify-end">
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving || (needsPrice && !price)}
            className="px-6 py-2.5 bg-teal-600 text-teal-900 font-heading font-semibold rounded-lg hover:bg-teal-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSaving ? "Saving..." : "Save access settings"}
          </button>
        </div>
      </div>
    </div>
  );
}