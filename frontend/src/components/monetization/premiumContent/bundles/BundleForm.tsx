"use client";

import React, { useState } from "react";
import { PencilLine, Eye, Package } from "lucide-react";
import Button from "@/components/ui/buttons/Button";
import Input from "@/components/ui/forms/Input";
import { useToast } from "@/components/ui/notifications/Toast";
import { normalize } from "@/lib/api/errors";
import type { Bundle } from "@/types/premiumContent";
import { useCreateBundle, useProducts } from "@/lib/api/premiumContent";
import ProductMultiSelect from "../products/ProductMultiSelect";

export interface BundleDraft extends Partial<Bundle> {}

interface BundleFormProps {
  onSaved?: (bundle: Bundle) => void;
}

/**
 * studio/monetization/premium-content/bundles/create/
 * Grupuje istniejące products w jedną paczkę z ceną łączną. Nie tworzy
 * nowej treści — to czysto relacyjny obiekt (productIds + price).
 */
export default function BundleForm({ onSaved }: BundleFormProps) {
  const [draft, setDraft] = useState<BundleDraft>({
    title: "",
    productIds: [],
    price: undefined,
    currency: "USDC",
    status: "draft",
  });

  const { data: products } = useProducts();
  const { mutateAsync, isPending } = useCreateBundle();
  const toast = useToast();

  const set = <K extends keyof BundleDraft>(key: K, value: BundleDraft[K]) =>
    setDraft((prev) => ({ ...prev, [key]: value }));

  const selectedProducts = (products ?? []).filter((p) =>
    (draft.productIds ?? []).includes(p.id),
  );
  const individualTotal = selectedProducts.reduce(
    (sum, p) => sum + (p.price ?? 0),
    0,
  );

  const save = async () => {
    if (!draft.title?.trim()) {
      toast.push({ type: "error", text: "Give this bundle a title." });
      return;
    }
    if ((draft.productIds?.length ?? 0) < 2) {
      toast.push({ type: "error", text: "A bundle needs at least 2 products." });
      return;
    }
    if (!draft.price || draft.price <= 0) {
      toast.push({ type: "error", text: "Set a bundle price." });
      return;
    }

    try {
      const saved = await mutateAsync(draft);
      toast.push({ type: "success", text: `${saved.title} created.` });
      onSaved?.(saved);
    } catch (e: unknown) {
      const { msg } = normalize(e);
      toast.push({ type: "error", text: msg || "Failed to create bundle." });
    }
  };

  return (
    <div className="w-full mt-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start max-w-5xl mx-auto">
        {/* LEFT: Configuration */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 border-l-4 border-teal-400 pl-4">
            <PencilLine size={16} className="text-teal-400" />
            <h2 className="text-sm font-heading font-medium text-teal-400">
              Configuration
            </h2>
          </div>

          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 space-y-6 shadow-2xl">
            <div className="space-y-2">
              <label className="text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-white/30 ml-1">
                Bundle title
              </label>
              <Input
                value={draft.title ?? ""}
                onChange={(e) => set("title", e.target.value)}
                placeholder="e.g. Complete Photo Pack"
              />
            </div>

            <ProductMultiSelect
              label="Bundle contents"
              selectedIds={draft.productIds ?? []}
              onChange={(ids) => set("productIds", ids)}
            />

            <div className="space-y-2">
              <label className="text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-white/30 ml-1">
                Bundle price ({draft.currency})
              </label>
              <Input
                type="text"
                inputMode="numeric"
                value={draft.price ?? ""}
                onChange={(e) => {
                  const v = e.target.value.replace(/\D/g, "");
                  set("price", v ? Number(v) : undefined);
                }}
                className="tnum"
              />
              {individualTotal > 0 && (
                <p className="text-[11px] text-white/30 ml-1">
                  Sum of individual prices: ${individualTotal.toLocaleString()}
                </p>
              )}
            </div>

            <div className="pt-2">
              <Button
                variant="primary"
                fullWidth
                loading={isPending}
                onClick={save}
                type="button"
                leftIcon={!isPending ? <Package size={18} /> : undefined}
              >
                Create bundle
              </Button>
            </div>
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

          <div className="relative overflow-hidden bg-gradient-to-br from-teal-900 to-teal-800 border border-teal-500/20 rounded-xl p-6 shadow-2 backdrop-blur-md">
            <p className="text-[10px] font-heading font-bold text-teal-500/40 uppercase tracking-widest mb-1">
              Bundle · {selectedProducts.length} items
            </p>
            <h3 className="text-xl font-heading font-bold text-text-ds-primary tracking-tight">
              {draft.title || "Untitled bundle"}
            </h3>

            <ul className="mt-4 space-y-1.5">
              {selectedProducts.map((p) => (
                <li key={p.id} className="text-sm text-text-ds-secondary">
                  {p.title}
                </li>
              ))}
            </ul>

            <div className="mt-4 flex items-center justify-between">
              {individualTotal > (draft.price ?? 0) && draft.price ? (
                <span className="text-xs text-teal-500/40 line-through">
                  ${individualTotal.toLocaleString()}
                </span>
              ) : (
                <span />
              )}
              <span className="text-lg font-heading font-bold text-gold-400 tnum">
                ${draft.price?.toLocaleString() ?? "—"}
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}