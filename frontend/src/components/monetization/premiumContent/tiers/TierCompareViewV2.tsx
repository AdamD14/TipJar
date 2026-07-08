"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { use } from "react";
import Spinner from "@/components/ui/Spinner";
import { useTiers, useProducts } from "@/lib/api/premiumContent";
import { PRODUCT_TYPE_META } from "@/types/premiumContent";

export default function TierComparePage({
  params,
}: {
  params: Promise<{ tierId: string }>;
}) {
  const { tierId } = use(params);
  const { data: tiers, isLoading: tiersLoading } = useTiers();
  const { data: products, isLoading: productsLoading } = useProducts();

  const tier = tiers?.find((t) => t.id === tierId);

  if (tiersLoading || productsLoading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner size="md" />
      </div>
    );
  }

  if (!tier) {
    return <p className="text-sm text-white/30">Tier not found.</p>;
  }

  const includedProducts = products?.filter((p) =>
    tier.includedProductIds.includes(p.id)
  ) ?? [];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <Link
        href=".."
        className="inline-flex items-center gap-2 text-sm text-text-ds-tertiary hover:text-white transition-colors"
      >
        <ArrowLeft size={16} />
        Back to tiers
      </Link>

      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 space-y-6">
        <div className="flex items-center gap-3 border-l-4 border-teal-400 pl-4">
          <h1 className="text-sm font-heading font-medium text-teal-400">
            {tier.name} · Details
          </h1>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-white/30 mb-1">
              Price
            </p>
            <p className="text-sm font-heading font-bold text-gold-400 tnum">
              ${tier.price.toLocaleString()}/{tier.priceCycle === "yearly" ? "yr" : "mo"}
            </p>
          </div>
          <div>
            <p className="text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-white/30 mb-1">
              Status
            </p>
            <p className="text-sm text-text-ds-primary capitalize">{tier.status}</p>
          </div>
        </div>

        <div className="h-px bg-white/5 my-4" />

        <h2 className="text-sm font-heading font-medium text-teal-400">
          Included Products ({includedProducts.length})
        </h2>

        {includedProducts.length === 0 ? (
          <p className="text-xs text-white/30 italic">No products in this tier yet.</p>
        ) : (
          <div className="space-y-2">
            {includedProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between p-3 bg-white/5 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-teal-900/30 rounded-lg">
                    <span className="text-teal-400" aria-hidden="true">
                      {PRODUCT_TYPE_META[product.type].label.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-heading font-medium text-text-ds-primary">
                      {product.title}
                    </p>
                    <p className="text-xs text-white/30 uppercase tracking-wider">
                      {PRODUCT_TYPE_META[product.type].label}
                    </p>
                  </div>
                </div>
                <span className="text-sm font-heading font-bold text-gold-400 tnum">
                  {product.accessModel === "tier-included"
                    ? "Included"
                    : product.price
                    ? `$${product.price.toLocaleString()} ${product.currency}`
                    : "—"}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="h-px bg-white/5 my-4" />

        <h2 className="text-sm font-heading font-medium text-teal-400">
          Perks ({tier.perks.length})
        </h2>

        {tier.perks.length === 0 ? (
          <p className="text-xs text-white/30 italic">No perks defined.</p>
        ) : (
          <ul className="space-y-1.5">
            {tier.perks.map((perk, i) => (
              <li
                key={i}
                className="text-sm text-text-ds-secondary flex items-start gap-2 p-3 bg-white/5 rounded-lg"
              >
                <span className="text-gold-400 mt-0.5">•</span>
                {perk}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}