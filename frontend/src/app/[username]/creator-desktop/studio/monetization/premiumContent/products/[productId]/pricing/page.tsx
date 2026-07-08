"use client";

import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { use } from "react";
import Spinner from "@/components/ui/Spinner";
import { useProduct, useUpdateProductPricing } from "@/lib/api/premiumContent";
import { PRODUCT_TYPE_META } from "@/types/premiumContent";
import { useToast } from "@/components/ui/notifications/Toast";
import Input from "@/components/ui/forms/Input";

export default function ProductPricingPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = use(params);
  const { data: product, isLoading } = useProduct(productId);
  const updatePricing = useUpdateProductPricing(productId);
  const toast = useToast();
  const [isSaving, setIsSaving] = useState(false);
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
    if (!price) return;
    setIsSaving(true);
    try {
      await updatePricing.mutateAsync({ price: Number(price), currency });
      toast.push({ type: "success", text: "Pricing saved." });
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to save pricing.";
      toast.push({ type: "error", text: message });
    } finally {
      setIsSaving(false);
    }
  };

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
          Pricing
        </h1>
      </div>

      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 space-y-6">
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

        <div className="pt-4 border-t border-white/10 flex justify-end">
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving || !price}
            className="px-6 py-2.5 bg-teal-600 text-teal-900 font-heading font-semibold rounded-lg hover:bg-teal-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSaving ? "Saving..." : "Save pricing"}
          </button>
        </div>
      </div>
    </div>
  );
}