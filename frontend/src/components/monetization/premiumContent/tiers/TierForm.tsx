"use client";

import React, { useState } from "react";
import { PencilLine, Eye, Rocket } from "lucide-react";
import clsx from "clsx";
import Button from "@/components/ui/buttons/Button";
import Input from "@/components/ui/forms/Input";
import { useToast } from "@/components/ui/notifications/Toast";
import { normalize } from "@/lib/api/errors";
import type { PriceCycle, Tier } from "@/types/premiumContent";
import { useSaveTier } from "@/lib/api/premiumContent";
import ProductMultiSelect from "../products/ProductMultiSelect";
import TierPerksEditor from "./TierPerksEditor";

export interface TierDraft extends Partial<Tier> {}

interface TierFormProps {
  initialTier?: Partial<Tier>;
  onSaved?: (tier: Tier) => void;
}

/**
 * studio/monetization/premium-content/tiers/[tier]/
 * Ten sam wzorzec co TargetBar: config lewo, live preview prawo.
 * includedProductIds to relacja many-to-many — jeden produkt może
 * pojawiać się w wielu tierach, ProductMultiSelect nie filtruje tego,
 * co jest już przypisane gdzie indziej (backend na to pozwala celowo).
 */
export default function TierForm({ initialTier, onSaved }: TierFormProps) {
  const [draft, setDraft] = useState<TierDraft>({
    name: initialTier?.name ?? "",
    priceCycle: initialTier?.priceCycle ?? "monthly",
    price: initialTier?.price ?? 5,
    currency: initialTier?.currency ?? "USDC",
    includedProductIds: initialTier?.includedProductIds ?? [],
    perks: initialTier?.perks ?? [],
    status: initialTier?.status ?? "active",
  });

  const { mutateAsync, isPending } = useSaveTier(initialTier?.id);
  const toast = useToast();

  const set = <K extends keyof TierDraft>(key: K, value: TierDraft[K]) =>
    setDraft((prev) => ({ ...prev, [key]: value }));

  const save = async () => {
    if (!draft.name?.trim()) {
      toast.push({ type: "error", text: "Give this tier a name." });
      return;
    }
    if (!draft.price || draft.price <= 0) {
      toast.push({ type: "error", text: "Set a price above 0." });
      return;
    }

    try {
      const saved = await mutateAsync(draft);
      toast.push({ type: "success", text: `${saved.name} saved.` });
      onSaved?.(saved);
    } catch (e: unknown) {
      const { msg } = normalize(e);
      toast.push({ type: "error", text: msg || "Failed to save tier." });
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
                Tier name
              </label>
              <Input
                value={draft.name ?? ""}
                onChange={(e) => set("name", e.target.value)}
                placeholder="e.g. Gold"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-white/30 ml-1">
                  Price ({draft.currency})
                </label>
                <Input
                  type="text"
                  inputMode="numeric"
                  value={draft.price ?? ""}
                  onChange={(e) => {
                    const v = e.target.value.replace(/\D/g, "");
                    set("price", v ? Number(v) : 0);
                  }}
                  className="tnum"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-white/30 ml-1">
                  Billing cycle
                </label>
                <div className="flex gap-2">
                  {(["monthly", "yearly"] as PriceCycle[]).map((cycle) => (
                    <button
                      key={cycle}
                      type="button"
                      onClick={() => set("priceCycle", cycle)}
                      className={clsx(
                        "flex-1 px-3 py-2.5 rounded-lg text-xs font-heading font-medium transition-colors capitalize",
                        draft.priceCycle === cycle
                          ? "bg-teal-700 text-white border border-teal-500/40"
                          : "bg-white/5 text-white/50 border border-white/10 hover:bg-white/10",
                      )}
                    >
                      {cycle}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="h-px bg-white/5" />

            <ProductMultiSelect
              label="Included products"
              selectedIds={draft.includedProductIds ?? []}
              onChange={(ids) => set("includedProductIds", ids)}
            />

            <div className="h-px bg-white/5" />

            <TierPerksEditor
              perks={draft.perks ?? []}
              onChange={(perks) => set("perks", perks)}
            />

            <div className="pt-2">
              <Button
                variant="primary"
                fullWidth
                loading={isPending}
                onClick={save}
                type="button"
                leftIcon={!isPending ? <Rocket size={18} /> : undefined}
              >
                Save tier
              </Button>
            </div>
          </div>
        </section>

        {/* RIGHT: Preview */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 border-l-4 border-teal-400 pl-4">
            <Eye size={16} className="text-teal-400" />
            <h2 className="text-sm font-heading font-medium text-teal-400">
              Fan-facing Preview
            </h2>
          </div>
          <TierPreviewCard draft={draft} />
        </section>
      </div>
    </div>
  );
}

function TierPreviewCard({ draft }: { draft: TierDraft }) {
  const productCount = draft.includedProductIds?.length ?? 0;

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-teal-900 to-teal-800 border border-teal-500/20 rounded-xl p-6 shadow-2 backdrop-blur-md">
      <h3 className="text-xl font-heading font-bold text-text-ds-primary tracking-tight">
        {draft.name || "Tier name"}
      </h3>

      <div className="flex items-baseline gap-1 mt-2">
        <span className="text-2xl font-heading font-bold text-gold-400 tnum">
          ${draft.price?.toLocaleString() ?? 0}
        </span>
        <span className="text-xs text-teal-500/40 uppercase tracking-widest">
          / {draft.priceCycle === "yearly" ? "year" : "month"}
        </span>
      </div>

      {productCount > 0 && (
        <p className="text-xs text-teal-500/40 mt-3 uppercase tracking-widest">
          {productCount} included {productCount === 1 ? "product" : "products"}
        </p>
      )}

      {(draft.perks?.length ?? 0) > 0 && (
        <ul className="mt-4 space-y-1.5">
          {draft.perks!.map((perk, i) => (
            <li
              key={i}
              className="text-sm text-text-ds-secondary flex items-start gap-2"
            >
              <span className="text-gold-400 mt-0.5">•</span>
              {perk}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}