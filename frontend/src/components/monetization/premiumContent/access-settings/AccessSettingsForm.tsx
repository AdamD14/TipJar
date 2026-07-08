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
import { useAccessSettings } from "@/lib/api/premiumContent";
import { accessSettingsSchema } from "./schemas";

const COMMON_REGIONS = [
  { code: "US", name: "United States" },
  { code: "CA", name: "Canada" },
  { code: "GB", name: "United Kingdom" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  { code: "AU", name: "Australia" },
  { code: "JP", name: "Japan" },
  { code: "BR", name: "Brazil" },
  { code: "IN", name: "India" },
  { code: "MX", name: "Mexico" },
  { code: "ES", name: "Spain" },
  { code: "IT", name: "Italy" },
  { code: "NL", name: "Netherlands" },
  { code: "PL", name: "Poland" },
  { code: "KR", name: "South Korea" },
  { code: "SG", name: "Singapore" },
  { code: "CH", name: "Switzerland" },
  { code: "SE", name: "Sweden" },
  { code: "NO", name: "Norway" },
  { code: "DK", name: "Denmark" },
  { code: "FI", name: "Finland" },
];

const COMMON_CURRENCIES = [
  "USDC",
  "USD",
  "EUR",
  "GBP",
  "CAD",
  "AUD",
  "JPY",
  "BRL",
  "INR",
  "MXN",
  "CHF",
  "SEK",
  "NOK",
  "DKK",
];

export default function AccessSettingsForm() {
  const { register, handleSubmit, watch, setValue } = useForm({
    resolver: zodResolver(accessSettingsSchema),
    mode: "onChange",
    defaultValues: {
      allowedRegions: [],
      blockedRegions: [],
      defaultCurrency: "USDC",
      supportedCurrencies: ["USDC"],
      requireAgeGate: false,
      ageGateThreshold: 18,
    },
  });

  const { mutateAsync, isPending } = useAccessSettings();
  const toast = useToast();

  const watchedAllowedRegions = watch("allowedRegions") ?? [];
  const watchedBlockedRegions = watch("blockedRegions") ?? [];
  const watchedSupportedCurrencies = watch("supportedCurrencies") ?? [];

  const onSubmit = async (data: any) => {
    try {
      await mutateAsync(data);
      toast.push({ type: "success", text: "Access settings saved." });
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to save access settings.";
      toast.push({ type: "error", text: message });
    }
  };

  const toggleArray = (
    current: string[],
    value: string,
    setFn: (val: string[]) => void
  ) => {
    setFn(current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value]
    );
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
          Access Settings
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 space-y-8">
          <section className="space-y-4">
            <h2 className="text-sm font-heading font-medium text-teal-400 flex items-center gap-3 border-l-4 border-teal-400 pl-4">
              Geographic Restrictions
            </h2>

            <div className="space-y-2">
              <label className="text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-white/30 ml-1">
                Allowed regions (empty = worldwide)
              </label>
              <div className="flex flex-wrap gap-2">
                {COMMON_REGIONS.map((region) => (
                  <button
                    key={region.code}
                    type="button"
                    onClick={() => toggleArray(watchedAllowedRegions, region.code, (v) => setValue("allowedRegions", v, { shouldValidate: true }))}
                    className={clsx(
                      "px-3 py-1.5 rounded-full text-xs font-heading font-medium transition-colors border",
                      watchedAllowedRegions.includes(region.code)
                        ? "bg-teal-600 text-white border-teal-500/40"
                        : "bg-white/5 text-white/50 border-white/15 hover:border-white/30"
                    )}
                  >
                    {region.name} ({region.code})
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-white/30 ml-1">
                Blocked regions
              </label>
              <div className="flex flex-wrap gap-2">
                {COMMON_REGIONS.map((region) => (
                  <button
                    key={`block-${region.code}`}
                    type="button"
                    onClick={() => toggleArray(watchedBlockedRegions, region.code, (v) => setValue("blockedRegions", v, { shouldValidate: true }))}
                    className={clsx(
                      "px-3 py-1.5 rounded-full text-xs font-heading font-medium transition-colors border",
                      watchedBlockedRegions.includes(region.code)
                        ? "bg-red-500/20 text-red-400 border-red-500/40"
                        : "bg-white/5 text-white/50 border-white/15 hover:border-white/30"
                    )}
                  >
                    {region.name} ({region.code})
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="space-y-4 pt-6 border-t border-white/5">
            <h2 className="text-sm font-heading font-medium text-teal-400 flex items-center gap-3 border-l-4 border-teal-400 pl-4">
              Currency Settings
            </h2>

            <div className="space-y-2">
              <label className="text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-white/30 ml-1">
                Default currency
              </label>
              <select
                {...register("defaultCurrency")}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400/20"
              >
                {COMMON_CURRENCIES.map((curr) => (
                  <option key={curr} value={curr}>{curr}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-white/30 ml-1">
                Supported currencies
              </label>
              <div className="flex flex-wrap gap-2">
                {COMMON_CURRENCIES.map((curr) => (
                  <button
                    key={curr}
                    type="button"
                    onClick={() => toggleArray(watchedSupportedCurrencies, curr, (v) => setValue("supportedCurrencies", v, { shouldValidate: true }))}
                    className={clsx(
                      "px-3 py-1.5 rounded-full text-xs font-heading font-medium transition-colors border",
                      watchedSupportedCurrencies.includes(curr)
                        ? "bg-gold-400 text-teal-900 border-gold-400"
                        : "bg-white/5 text-white/50 border-white/15 hover:border-white/30"
                    )}
                  >
                    {curr}
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="space-y-4 pt-6 border-t border-white/5">
            <h2 className="text-sm font-heading font-medium text-teal-400 flex items-center gap-3 border-l-4 border-teal-400 pl-4">
              Age Gate
            </h2>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  {...register("requireAgeGate")}
                  className="w-4 h-4 rounded border-white/20 bg-black/40 text-teal-400 focus:ring-teal-400"
                />
                <span className="text-sm text-text-ds-primary">Require age verification for this content</span>
              </label>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-white/30 ml-1">
                Minimum age
              </label>
              <Input
                type="number"
                min="13"
                max="21"
                {...register("ageGateThreshold", { valueAsNumber: Number })}
                className="w-24"
              />
            </div>
          </section>

          <div className="pt-4 border-t border-white/10 flex justify-end">
            <Button
              variant="primary"
              loading={isPending}
              type="submit"
            >
              Save access settings
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}