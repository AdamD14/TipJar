"use client";

import React from "react";
import clsx from "clsx";
import Button from "@/components/ui/buttons/Button";
import { useTiers } from "../../lib/api/premiumContent";
import Spinner from "@/components/ui/Spinner";

interface TierCompareViewProps {
  onSelectTier?: (tierId: string) => void;
}

/**
 * studio/monetization/premium-content/tiers/compare-view/
 * Fan-facing, publiczny widok. Renderowany na profilu (/@username),
 * czyta z tego samego useTiers() co admin, filtrowane po status: "active"
 * po stronie API — front nie ukrywa archived tierów ręcznie.
 */
export default function TierCompareView({
  onSelectTier,
}: TierCompareViewProps) {
  const { data: tiers, isLoading } = useTiers();

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner size="md" />
      </div>
    );
  }

  if (!tiers || tiers.length === 0) return null;

  const sorted = [...tiers].sort((a, b) => a.price - b.price);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
      {sorted.map((tier, i) => {
        const isPopular = i === Math.floor(sorted.length / 2) && sorted.length > 1;

        return (
          <div
            key={tier.id}
            className={clsx(
              "relative rounded-2xl p-6 border backdrop-blur-md flex flex-col",
              isPopular
                ? "border-gold-400/60 bg-gradient-to-br from-teal-900 to-teal-800 shadow-[0_0_0_1px_rgba(255,215,0,0.15)]"
                : "border-teal-500/20 bg-teal-900/60",
            )}
          >
            {isPopular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-heading font-bold uppercase tracking-widest bg-gold-400 text-teal-900 px-3 py-1 rounded-full">
                Most popular
              </span>
            )}

            <h3 className="text-lg font-heading font-bold text-text-ds-primary">
              {tier.name}
            </h3>

            <div className="flex items-baseline gap-1 mt-2 mb-4">
              <span className="text-3xl font-heading font-bold text-gold-400 tnum">
                ${tier.price.toLocaleString()}
              </span>
              <span className="text-xs text-teal-500/40 uppercase tracking-widest">
                / {tier.priceCycle === "yearly" ? "year" : "month"}
              </span>
            </div>

            <ul className="space-y-2 flex-1">
              {tier.perks.map((perk, idx) => (
                <li
                  key={idx}
                  className="text-sm text-text-ds-secondary flex items-start gap-2"
                >
                  <span className="text-gold-400 mt-0.5">•</span>
                  {perk}
                </li>
              ))}
            </ul>

            <Button
              variant={isPopular ? "primary" : "secondary"}
              fullWidth
              className="mt-6"
              onClick={() => onSelectTier?.(tier.id)}
            >
              Subscribe
            </Button>
          </div>
        );
      })}
    </div>
  );
}
