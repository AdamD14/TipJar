"use client";

import React from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import Button from "@/components/ui/buttons/Button";
import Spinner from "@/components/ui/Spinner";
import { useProducts, useTiers, useBundles } from "@/lib/api/premiumContent";
import { PRODUCT_TYPE_META } from "@/types/premiumContent";

/** studio/monetization/premium-content/products/ (index) */
export function ProductsIndex() {
  const { data: products, isLoading } = useProducts();

  return (
    <div className="max-w-5xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-heading font-medium text-teal-400">
          Products
        </h2>
        <Link href="./products/create">
          <Button variant="primary" size="sm" leftIcon={<Plus size={14} />}>
            New product
          </Button>
        </Link>
      </div>

      {isLoading && (
        <div className="flex justify-center py-12">
          <Spinner size="md" />
        </div>
      )}

      {!isLoading && (products?.length ?? 0) === 0 && (
        <p className="text-sm text-white/30 italic">
          No products yet. Start by creating one.
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products?.map((product) => (
          <Link
            key={product.id}
            href={`./products/${product.id}`}
            className="block bg-black/40 border border-white/10 hover:border-white/20 rounded-2xl p-5 transition-colors"
          >
            <p className="text-[10px] font-heading font-bold text-teal-500/40 uppercase tracking-widest mb-1">
              {PRODUCT_TYPE_META[product.type].label}
            </p>
            <h3 className="text-sm font-heading font-semibold text-text-ds-primary truncate">
              {product.title}
            </h3>
            <p className="text-xs text-white/30 mt-2 capitalize">
              {product.status}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

/** studio/monetization/premium-content/tiers/ (index) */
export function TiersIndex() {
  const { data: tiers, isLoading } = useTiers();

  return (
    <div className="max-w-5xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-heading font-medium text-teal-400">
          Tiers
        </h2>
        <Link href="./tiers/create">
          <Button variant="primary" size="sm" leftIcon={<Plus size={14} />}>
            New tier
          </Button>
        </Link>
      </div>

      {isLoading && (
        <div className="flex justify-center py-12">
          <Spinner size="md" />
        </div>
      )}

      <div className="space-y-3">
        {[...(tiers ?? [])]
          .sort((a, b) => a.price - b.price)
          .map((tier) => (
            <Link
              key={tier.id}
              href={`./tiers/${tier.id}`}
              className="flex items-center justify-between bg-black/40 border border-white/10 hover:border-white/20 rounded-xl px-5 py-4 transition-colors"
            >
              <div>
                <h3 className="text-sm font-heading font-semibold text-text-ds-primary">
                  {tier.name}
                </h3>
                <p className="text-xs text-white/30 mt-0.5">
                  {tier.includedProductIds.length} products ·{" "}
                  {tier.perks.length} perks
                </p>
              </div>
              <span className="text-sm font-heading font-bold text-gold-400 tnum">
                ${tier.price.toLocaleString()}/
                {tier.priceCycle === "yearly" ? "yr" : "mo"}
              </span>
            </Link>
          ))}
      </div>
    </div>
  );
}

/** studio/monetization/premium-content/bundles/ (index) */
export function BundlesIndex() {
  const { data: bundles, isLoading } = useBundles();

  return (
    <div className="max-w-5xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-heading font-medium text-teal-400">
          Bundles
        </h2>
        <Link href="./bundles/create">
          <Button variant="primary" size="sm" leftIcon={<Plus size={14} />}>
            New bundle
          </Button>
        </Link>
      </div>

      {isLoading && (
        <div className="flex justify-center py-12">
          <Spinner size="md" />
        </div>
      )}

      {!isLoading && (bundles?.length ?? 0) === 0 && (
        <p className="text-sm text-white/30 italic">
          No bundles yet — group 2+ products to create one.
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {bundles?.map((bundle) => (
          <div
            key={bundle.id}
            className="bg-black/40 border border-white/10 rounded-2xl p-5"
          >
            <h3 className="text-sm font-heading font-semibold text-text-ds-primary truncate">
              {bundle.title}
            </h3>
            <p className="text-xs text-white/30 mt-1">
              {bundle.productIds.length} items
            </p>
            <p className="text-sm font-heading font-bold text-gold-400 mt-2 tnum">
              ${bundle.price.toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}