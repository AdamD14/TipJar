"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { PencilLine, Eye, Package, ChevronRight } from "lucide-react";
import clsx from "clsx";
import Button from "@/components/ui/buttons/Button";
import Input from "@/components/ui/forms/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/notifications/Toast";
import { useCreateBundle, useUpdateBundle, useProducts } from "@/lib/api/premiumContent";
import { createBundleSchema, updateBundleSchema } from "./schemas";
import ProductMultiSelect from "../products/ProductMultiSelect";

interface BundleFormV2Props {
  mode: "create" | "edit";
  bundleId?: string;
  onSaved?: (bundle: any) => void;
}

export default function BundleFormV2({ mode, bundleId, onSaved }: BundleFormV2Props) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: products } = useProducts();

  const schema = mode === "create" ? createBundleSchema : updateBundleSchema;

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
      title: "",
      description: "",
      productIds: [],
      price: 0,
      currency: "USDC",
      status: "draft",
    },
  });

  const { mutateAsync, isPending } = mode === "create" ? useCreateBundle() : useUpdateBundle(bundleId!);
  const toast = useToast();

  const watchedProductIds = watch("productIds") ?? [];
  const watchedPrice = watch("price");
  const watchedTitle = watch("title");

  const selectedProducts = (products ?? []).filter((p) => watchedProductIds.includes(p.id));
  const individualTotal = selectedProducts.reduce((sum, p) => sum + (p.price ?? 0), 0);

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      const saved = await mutateAsync(data);
      toast.push({ type: "success", text: `${saved.title} ${mode === "create" ? "created" : "saved"}.` });
      onSaved?.(saved);
      if (router && mode === "create") {
        router.push("../" + saved.id);
      }
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to " + mode + " bundle.";
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
                  Bundle title
                </label>
                <Input
                  {...register("title")}
                  placeholder="e.g. Complete Photo Pack"
                  aria-invalid={!!errors.title}
                  aria-describedby={errors.title ? "title-error" : undefined}
                />
                {errors.title && (
                  <p id="title-error" className="text-xs text-red-400" role="alert">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <ProductMultiSelect
                label="Bundle contents"
                selectedIds={watchedProductIds}
                onChange={(ids) => setValue("productIds", ids, { shouldValidate: true })}
                error={errors.productIds?.message}
              />

              <div className="space-y-2">
                <label className="text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-white/30 ml-1">
                  Bundle price ({watch("currency")})
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
                {individualTotal > 0 && watchedPrice && (
                  <p className="text-[11px] text-white/30 ml-1">
                    Sum of individual prices: ${individualTotal.toLocaleString()}
                    {watchedPrice < individualTotal && (
                      <span className="ml-2 text-teal-400">(Bundle saves ${(individualTotal - watchedPrice).toLocaleString()})</span>
                    )}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-white/30 ml-1">
                  Status
                </label>
                <select
                  {...register("status")}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400/20"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <div className="pt-2">
                <Button
                  variant="primary"
                  fullWidth
                  loading={isSubmitting || isPending}
                  type="submit"
                  leftIcon={!isSubmitting && !isPending ? <Package size={18} /> : undefined}
                  disabled={!isValid || isSubmitting || isPending}
                >
                  {mode === "create" ? "Create bundle" : "Save bundle"}
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
              Storefront Preview
            </h2>
          </div>

          <div className="relative overflow-hidden bg-gradient-to-br from-teal-900 to-teal-800 border border-teal-500/20 rounded-xl p-6 shadow-2 backdrop-blur-md">
            <p className="text-[10px] font-heading font-bold text-teal-500/40 uppercase tracking-widest mb-1">
              Bundle · {selectedProducts.length} items
            </p>
            <h3 className="text-xl font-heading font-bold text-text-ds-primary tracking-tight">
              {watchedTitle || "Untitled bundle"}
            </h3>

            {selectedProducts.length > 0 && (
              <ul className="mt-4 space-y-1.5">
                {selectedProducts.map((p) => (
                  <li key={p.id} className="text-sm text-text-ds-secondary">
                    {p.title}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-4 flex items-center justify-between">
              {individualTotal > (watchedPrice ?? 0) && watchedPrice ? (
                <span className="text-xs text-teal-500/40 line-through">
                  ${individualTotal.toLocaleString()}
                </span>
              ) : (
                <span />
              )}
              <span className="text-lg font-heading font-bold text-gold-400 tnum">
                ${watchedPrice?.toLocaleString() ?? "—"}
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}