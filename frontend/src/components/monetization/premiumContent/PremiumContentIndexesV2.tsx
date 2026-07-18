"use client";

import React from "react";
import Link from "next/link";
import { Plus, Package, Layers } from "lucide-react";
import { useProducts, useTiers, useBundles } from "@/lib/api/premiumContent";
import { PRODUCT_TYPE_META } from "@/types/premiumContent";
import type { Product, Tier, Bundle } from "@/types/premiumContent";
import { SkeletonCard, SkeletonGrid, EmptyState, ErrorBanner } from "@/components/ui/feedback";
import Button from "@/components/ui/buttons/Button";
import { useToast } from "@/components/ui/notifications/Toast";
import { useQueryClient } from "@tanstack/react-query";

const RETRY_DELAY = 1000;

function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`./${product.id}`}
      className="block bg-black/40 border border-white/10 hover:border-white/20 rounded-2xl p-5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-app"
      aria-label={`${product.title}, ${PRODUCT_TYPE_META[product.type].label}`}
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
  );
}

function TierCard({ tier }: { tier: Tier }) {
  return (
    <Link
      href={`./${tier.id}`}
      className="flex items-center justify-between bg-black/40 border border-white/10 hover:border-white/20 rounded-xl px-5 py-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-app"
    >
      <div>
        <h3 className="text-sm font-heading font-semibold text-text-ds-primary">
          {tier.name}
        </h3>
        <p className="text-xs text-white/30 mt-0.5">
          {tier.includedProductIds.length} products · {tier.perks.length} perks
        </p>
      </div>
      <span className="text-sm font-heading font-bold text-gold-400 tnum">
        ${tier.price.toLocaleString()}/{tier.priceCycle === "yearly" ? "yr" : "mo"}
      </span>
    </Link>
  );
}

function BundleCard({ bundle }: { bundle: Bundle }) {
  return (
    <Link
      href={`./${bundle.id}`}
      className="block bg-black/40 border border-white/10 hover:border-white/20 rounded-2xl p-5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-app"
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
    </Link>
  );
}

interface IndexProps {
  createHref?: string;
}

export function ProductsIndexV2({ createHref = "products/create" }: IndexProps) {
  const queryClient = useQueryClient();
  const toast = useToast();
  const { data: products, isLoading, isError, error, refetch } = useProducts();

  const handleRetry = () => {
    refetch();
    toast.info("Retrying...");
  };

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-heading font-medium text-teal-400">Products</h2>
          <Link href={createHref}>
            <Button variant="primary" size="sm" leftIcon={<Plus size={14} />}>New product</Button>
          </Link>
        </div>
        <SkeletonGrid count={6} variant="product" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-5xl mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-heading font-medium text-teal-400">Products</h2>
          <Link href={createHref}>
            <Button variant="primary" size="sm" leftIcon={<Plus size={14} />}>New product</Button>
          </Link>
        </div>
        <ErrorBanner
          message={error instanceof Error ? error.message : "Failed to load products"}
          onRetry={handleRetry}
        />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-heading font-medium text-teal-400">Products</h2>
        <Link href={createHref}>
          <Button variant="primary" size="sm" leftIcon={<Plus size={14} />}>New product</Button>
        </Link>
      </div>

      {(products?.length ?? 0) === 0 && (
        <EmptyState
          icon={<Package size={32} />}
          title="No products yet"
          description="Create your first product to start selling premium content."
          action={{ label: "Create product", onClick: () => {} }}
        />
      )}

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        role="list"
        aria-label="Products"
      >
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export function TiersIndexV2({ createHref = "tiers/create" }: IndexProps) {
  const queryClient = useQueryClient();
  const toast = useToast();
  const { data: tiers, isLoading, isError, error, refetch } = useTiers();

  const handleRetry = () => {
    refetch();
    toast.info("Retrying...");
  };

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-heading font-medium text-teal-400">Tiers</h2>
          <Link href={createHref}>
            <Button variant="primary" size="sm" leftIcon={<Plus size={14} />}>New tier</Button>
          </Link>
        </div>
        <SkeletonGrid count={3} variant="tier" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-5xl mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-heading font-medium text-teal-400">Tiers</h2>
          <Link href={createHref}>
            <Button variant="primary" size="sm" leftIcon={<Plus size={14} />}>New tier</Button>
          </Link>
        </div>
        <ErrorBanner
          message={error instanceof Error ? error.message : "Failed to load tiers"}
          onRetry={handleRetry}
        />
      </div>
    );
  }

  const sortedTiers = [...(tiers ?? [])].sort((a, b) => a.price - b.price);

  return (
    <div className="max-w-5xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-heading font-medium text-teal-400">Tiers</h2>
        <Link href={createHref}>
          <Button variant="primary" size="sm" leftIcon={<Plus size={14} />}>New tier</Button>
        </Link>
      </div>

      {sortedTiers.length === 0 && (
        <EmptyState
          icon={<Layers size={32} />}
          title="No tiers yet"
          description="Create a subscription tier to offer recurring access to your content."
          action={{ label: "Create tier", onClick: () => {} }}
        />
      )}

      <div className="space-y-3" role="list" aria-label="Tiers">
        {sortedTiers.map((tier) => (
          <TierCard key={tier.id} tier={tier} />
        ))}
      </div>
    </div>
  );
}

export function BundlesIndexV2({ createHref = "bundles/create" }: IndexProps) {
  const queryClient = useQueryClient();
  const toast = useToast();
  const { data: bundles, isLoading, isError, error, refetch } = useBundles();

  const handleRetry = () => {
    refetch();
    toast.info("Retrying...");
  };

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-heading font-medium text-teal-400">Bundles</h2>
          <Link href={createHref}>
            <Button variant="primary" size="sm" leftIcon={<Plus size={14} />}>New bundle</Button>
          </Link>
        </div>
        <SkeletonGrid count={6} variant="bundle" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-5xl mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-heading font-medium text-teal-400">Bundles</h2>
          <Link href={createHref}>
            <Button variant="primary" size="sm" leftIcon={<Plus size={14} />}>New bundle</Button>
          </Link>
        </div>
        <ErrorBanner
          message={error instanceof Error ? error.message : "Failed to load bundles"}
          onRetry={handleRetry}
        />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-heading font-medium text-teal-400">Bundles</h2>
        <Link href={createHref}>
          <Button variant="primary" size="sm" leftIcon={<Plus size={14} />}>New bundle</Button>
        </Link>
      </div>

      {(bundles?.length ?? 0) === 0 && (
        <EmptyState
          icon={<Package size={32} />}
          title="No bundles yet"
          description="Group 2 or more products together to create a bundle."
          action={{ label: "Create bundle", onClick: () => {} }}
        />
      )}

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        role="list"
        aria-label="Bundles"
      >
        {bundles?.map((bundle) => (
          <BundleCard key={bundle.id} bundle={bundle} />
        ))}
      </div>
    </div>
  );
}