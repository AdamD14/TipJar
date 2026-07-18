"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import Button from "@/components/ui/buttons/Button";
import Input from "@/components/ui/forms/Input";
import { useToast } from "@/components/ui/notifications/Toast";
import { useBilling } from "@/lib/api/premiumContent";
import { billingSchema } from "./schemas";

export default function BillingForm() {
  const { register, handleSubmit, watch, setValue } = useForm({
    resolver: zodResolver(billingSchema),
    mode: "onChange",
    defaultValues: {
      payoutSchedule: "monthly",
      minimumPayout: 10,
      currency: "USDC",
      taxInfo: {
        taxId: "",
        country: "US",
        region: "",
      },
    },
  });

  const { mutateAsync, isPending } = useBilling();
  const toast = useToast();

  const watchedCountry = watch("taxInfo.country");

  const onSubmit = async (data: any) => {
    try {
      await mutateAsync(data);
      toast.push({ type: "success", text: "Billing settings saved." });
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to save billing settings.";
      toast.push({ type: "error", text: message });
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Link
        href=".."
        className="inline-flex items-center gap-2 text-sm text-text-ds-tertiary hover:text-white transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Premium Content
      </Link>

      <div className="flex items-center gap-3 border-l-4 border-teal-400 pl-4">
        <h1 className="text-base font-heading font-medium text-teal-400">
          Billing & Payouts
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 space-y-8">
          <section className="space-y-4">
            <h2 className="text-sm font-heading font-medium text-teal-400 flex items-center gap-3 border-l-4 border-teal-400 pl-4">
              Payout Schedule
            </h2>

            <div className="space-y-2">
              <label className="text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-white/30 ml-1">
                Payout frequency
              </label>
              <select
                {...register("payoutSchedule")}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400/20"
              >
                <option value="monthly">Monthly</option>
                <option value="weekly">Weekly</option>
                <option value="manual">Manual</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-white/30 ml-1">
                Minimum payout amount
              </label>
              <Input
                type="number"
                min="1"
                {...register("minimumPayout", { valueAsNumber: true })}
                className="tnum"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-white/30 ml-1">
                Currency
              </label>
              <select
                {...register("currency")}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400/20"
              >
                <option value="USDC">USDC</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select>
            </div>
          </section>

          <section className="space-y-4 pt-6 border-t border-white/5">
            <h2 className="text-sm font-heading font-medium text-teal-400 flex items-center gap-3 border-l-4 border-teal-400 pl-4">
              Tax Information
            </h2>

            <div className="space-y-2">
              <label className="text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-white/30 ml-1">
                Tax ID (optional)
              </label>
              <Input
                {...register("taxInfo.taxId")}
                placeholder="e.g. EIN, VAT number"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-white/30 ml-1">
                Country
              </label>
              <select
                {...register("taxInfo.country")}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400/20"
              >
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="GB">United Kingdom</option>
                <option value="DE">Germany</option>
                <option value="FR">France</option>
                <option value="AU">Australia</option>
                <option value="JP">Japan</option>
                <option value="BR">Brazil</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-white/30 ml-1">
                Region / State / Province (optional)
              </label>
              <Input
                {...register("taxInfo.region")}
                placeholder="e.g. California, Ontario, Bavaria"
              />
            </div>
          </section>

          <div className="pt-4 border-t border-white/10 flex justify-end">
            <Button
              variant="primary"
              loading={isPending}
              type="submit"
            >
              Save billing settings
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}