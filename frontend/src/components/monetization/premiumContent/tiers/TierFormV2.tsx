"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { PencilLine, Eye, Rocket, ArrowLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";
import Button from "@/components/ui/buttons/Button";
import Input from "@/components/ui/forms/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/notifications/Toast";
import { useSaveTier, useProducts } from "@/lib/api/premiumContent";
import { createTierSchema, updateTierSchema } from "./schemas";
import ProductMultiSelect from "../products/ProductMultiSelect";
import TierPerksEditor from "./TierPerksEditor";

interface TierFormV2Props {
  mode: "create" | "edit";
  tierId?: string;
  onSaved?: (tier: any) => void;
}

function getCycleButtonClass(cycle: string, current: string): string {
  const base = "flex-1 px-3 py-2.5 rounded-lg text-xs font-heading font-medium transition-colors capitalize";
  if (current === cycle) {
    return base + " bg-teal-700 text-white border border-teal-500/40";
  }
  return base + " bg-white/5 text-white/50 border border-white/10 hover:bg-white/10";
}

function getStatusBadgeClass(status: string | undefined): string {
  const base = "text-xs px-2 py-0.5 rounded-full ";
  if (status === "active") {
    return base + "bg-green-500/20 text-green-400";
  }
  return base + "bg-yellow-500/20 text-yellow-400";
}

export default function TierFormV2({ mode, tierId, onSaved }: TierFormV2Props) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: products } = useProducts();

  const schema = mode === "create" ? createTierSchema : updateTierSchema;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      name: "",
      priceCycle: "monthly",
      price: 5,
      currency: "USDC",
      includedProductIds: [],
      perks: [],
      status: "active",
    },
  });

  const { mutateAsync, isPending } = useSaveTier(tierId);
  const toast = useToast();

  const watchedPriceCycle = watch("priceCycle");
  const watchedPrice = watch("price");
  const watchedIncludedProductIds = watch("includedProductIds");
  const watchedPerks = watch("perks");
  const watchedName = watch("name");
  const watchedStatus = watch("status");

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      const saved = await mutateAsync(data);
      toast.push({ type: "success", text: `${saved.name} saved.` });
      onSaved?.(saved);
      if (router && mode === "create") {
        router.push(`../${saved.id}`);
      }
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to save tier.";
      toast.push({ type: "error", text: message });
    } finally {
      setIsSubmitting(false);
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

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 space-y-6 shadow-2xl">
              <div className="space-y-2">
                <label className="text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-white/30 ml-1">
                  Tier name
                </label>
                <Input
                  {...register("name")}
                  placeholder="e.g. Gold"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="text-xs text-red-400" role="alert">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-white/30 ml-1">
                    Price ({watch("currency")})
                  </label>
                  <Input
                    type="number"
                    inputMode="numeric"
                    {...register("price", { valueAsNumber: true })}
                    placeholder="0"
                    className="tnum"
                    min="1"
                    aria-invalid={!!errors.price}
                    aria-describedby={errors.price ? "price-error" : undefined}
                  />
                  {errors.price && (
                    <p id="price-error" className="text-xs text-red-400" role="alert">
                      {errors.price.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-white/30 ml-1">
                    Billing cycle
                  </label>
                  <div className="flex gap-2" role="radiogroup" aria-label="Billing cycle">
                    {(["monthly", "yearly"] as const).map((cycle) => (
                      <label key={cycle} className={getCycleButtonClass(cycle, watchedPriceCycle ?? "monthly")}>
                        <input
                          type="radio"
                          {...register("priceCycle")}
                          value={cycle}
                          className="sr-only"
                        />
                        {cycle}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="h-px bg-white/5" />

              <ProductMultiSelect
                label="Included products"
                selectedIds={watchedIncludedProductIds ?? []}
                onChange={(ids) => setValue("includedProductIds", ids, { shouldValidate: true })}
                error={errors.includedProductIds?.message}
              />

              <div className="h-px bg-white/5" />

              <TierPerksEditor
                perks={watchedPerks ?? []}
                onChange={(perks) => setValue("perks", perks)}
              />

              <div className="space-y-2">
                <label className="text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-white/30 ml-1">
                  Status
                </label>
                <select
                  {...register("status")}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400/20"
                >
                  <option value="active">Active</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <div className="pt-2">
                <Button
                  variant="primary"
                  fullWidth
                  loading={isSubmitting || isPending}
                  type="submit"
                  leftIcon={!isSubmitting && !isPending ? <Rocket size={18} /> : undefined}
                  disabled={!isValid || isSubmitting || isPending}
                >
                  {mode === "create" ? "Create tier" : "Save tier"}
                </Button>
              </div>
            </div>
            </form>
        </section>

        {/* RIGHT: Preview */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 border-l-4 border-teal-400 pl-4">
            <Eye size={16} className="text-teal-400" />
            <h2 className="text-sm font-heading font-medium text-teal-400">
              Fan-facing Preview
            </h2>
          </div>
          <TierPreviewCard
            name={watchedName}
            price={watchedPrice}
            priceCycle={watchedPriceCycle}
            currency={watch("currency")}
            includedProductIds={watchedIncludedProductIds}
            perks={watchedPerks}
            status={watchedStatus}
          />
        </section>
      </div>
    </div>
  );
}

function TierPreviewCard({
  name,
  price,
  priceCycle,
  currency,
  includedProductIds,
  perks,
  status,
}: {
  name?: string;
  price?: number;
  priceCycle?: "monthly" | "yearly";
  currency?: string;
  includedProductIds?: string[];
  perks?: string[];
  status?: string;
}) {
  const productCount = includedProductIds?.length ?? 0;
  const statusClass = getStatusBadgeClass(status);

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-teal-900 to-teal-800 border border-teal-500/20 rounded-xl p-6 shadow-2 backdrop-blur-md">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xl font-heading font-bold text-text-ds-primary tracking-tight">
          {name || "Tier name"}
        </h3>
        <span className={statusClass}>
          {status || "active"}
        </span>
      </div>

      <div className="flex items-baseline gap-1 mt-2">
        <span className="text-2xl font-heading font-bold text-gold-400 tnum">
          ${price?.toLocaleString() ?? 0}
        </span>
        <span className="text-xs text-teal-500/40 uppercase tracking-widest">
          / {priceCycle === "yearly" ? "year" : "month"}
        </span>
      </div>

      {productCount > 0 && (
        <p className="text-xs text-teal-500/40 mt-3 uppercase tracking-widest">
          {productCount} included {productCount === 1 ? "product" : "products"}
        </p>
      )}

      {(perks?.length ?? 0) > 0 && (
        <ul className="mt-4 space-y-1.5">
          {perks!.map((perk, i) => (
            <li key={i} className="text-sm text-text-ds-secondary flex items-start gap-2">
              <span className="text-gold-400 mt-0.5">•</span>
              {perk}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}