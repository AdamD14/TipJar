"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { use } from "react";
import Spinner from "@/components/ui/Spinner";
import { useTiers, useProducts } from "@/lib/api/premiumContent";
import { PRODUCT_TYPE_META } from "@/types/premiumContent";

export default function TierComparePage() {
  const { data: tiers, isLoading: tiersLoading } = useTiers();
  const { data: products, isLoading: productsLoading } = useProducts();

  if (tiersLoading || productsLoading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner size="md" />
      </div>
    );
  }

  const sortedTiers = [...(tiers ?? [])].sort((a, b) => a.price - b.price);

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
            Tier Comparison
          </h1>
        </div>

        {sortedTiers.length === 0 ? (
          <p className="text-xs text-white/30 italic">No tiers to compare.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left" role="table">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="pb-3 text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-white/30" scope="col">
                    Tier
                  </th>
                  <th className="pb-3 text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-white/30 text-right" scope="col">
                    Price
                  </th>
                  <th className="pb-3 text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-white/30 text-center" scope="col">
                    Products
                  </th>
                  <th className="pb-3 text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-white/30 text-center" scope="col">
                    Perks
                  </th>
                  <th className="pb-3 text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-white/30 text-center" scope="col">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedTiers.map((tier) => {
                  const includedProducts = products?.filter((p) =>
                    tier.includedProductIds.includes(p.id)
                  ) ?? [];

                  return (
                    <tr key={tier.id} className="border-b border-white/5">
                      <td className="py-4">
                        <p className="text-sm font-heading font-semibold text-text-ds-primary">{tier.name}</p>
                      </td>
                      <td className="py-4 text-right">
                        <p className="text-sm font-heading font-bold text-gold-400 tnum">
                          ${tier.price.toLocaleString()}/{tier.priceCycle === "yearly" ? "yr" : "mo"}
                        </p>
                      </td>
                      <td className="py-4 text-center">
                        <p className="text-sm text-text-ds-primary">{includedProducts.length}</p>
                        <p className="text-xs text-white/30">{tier.perks.length} perks</p>
                      </td>
                      <td className="py-4 text-center">
                        <ul className="space-y-1 text-xs text-white/50 max-h-24 overflow-auto">
                          {tier.perks.map((perk, i) => (
                            <li key={i}>• {perk}</li>
                          ))}
                        </ul>
                      </td>
                      <td className="py-4 text-center">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${tier.status === "active" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}>
                          {tier.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}