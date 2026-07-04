"use client";

import React, { useState } from "react";
import { ArrowLeft, CheckCircle2, Rocket } from "lucide-react";
import Button from "@/components/ui/buttons/Button";
import { useToast } from "@/components/ui/notifications/Toast";
import { normalize } from "@/lib/api/errors";
import type { ProductType } from "../../types/premiumContent";
import { useCreateProduct } from "../../lib/api/premiumContent";
import ProductTypeSelector from "./ProductTypeSelector";
import ProductDetailsForm, { type ProductDraft } from "./ProductDetailsForm";

interface ProductCreateWizardProps {
  onPublished?: (productId: string) => void;
}

/**
 * studio/monetization/premium-content/products/create/
 * Krok 1: wybór typu. Krok 2: detale zależne od typu + access/pricing/
 * delivery + storefront category. Publish woła useCreateProduct — jeśli
 * type to gallery/video/audio/document i draft.files ma zawartość, upload
 * plików musi się odbyć PRZED tym mutation call (osobny hook do
 * presigned URL, nie zaimplementowany tutaj — podłącz istniejący pipeline).
 */
export default function ProductCreateWizard({
  onPublished,
}: ProductCreateWizardProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [draft, setDraft] = useState<ProductDraft>({
    type: "gallery",
    currency: "USDC",
    accessModel: "one-time",
    delivery: "instant",
    status: "draft",
  });

  const { mutateAsync, isPending } = useCreateProduct();
  const toast = useToast();

  const selectType = (type: ProductType) => {
    setDraft((prev) => ({ ...prev, type }));
  };

  const publish = async () => {
    if (!draft.title?.trim()) {
      toast.push({ type: "error", text: "Give your product a title." });
      return;
    }
    if (draft.accessModel !== "tier-included" && !draft.price) {
      toast.push({ type: "error", text: "Set a price, or include it in a tier." });
      return;
    }

    try {
      const { files, ...payload } = draft;
      const created = await mutateAsync(payload);
      toast.push({ type: "success", text: `${created.title} published.` });
      onPublished?.(created.id);
    } catch (e: unknown) {
      const { msg } = normalize(e);
      toast.push({ type: "error", text: msg || "Failed to create product." });
    }
  };

  return (
    <div className="w-full mt-8">
      {step === 1 && (
        <div className="space-y-8">
          <ProductTypeSelector value={draft.type} onSelect={selectType} />
          <div className="flex justify-end max-w-5xl mx-auto">
            <Button variant="primary" onClick={() => setStep(2)} type="button">
              Continue
            </Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-8">
          <ProductDetailsForm draft={draft} onChange={setDraft} />
          <div className="flex items-center justify-between max-w-5xl mx-auto pt-4 border-t border-teal-700/20">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="flex items-center gap-2 text-sm text-text-ds-tertiary hover:text-white transition-colors"
            >
              <ArrowLeft size={16} />
              Change type
            </button>
            <Button
              variant="primary"
              size="lg"
              loading={isPending}
              onClick={publish}
              type="button"
              leftIcon={!isPending ? <Rocket size={18} /> : undefined}
            >
              Publish product
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
