"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, FileText, Lock, DollarSign, Truck } from "lucide-react";
import Spinner from "@/components/ui/Spinner";
import { useProduct } from "@/lib/api/premiumContent";
import { PRODUCT_TYPE_META, ACCESS_MODEL_META, DELIVERY_MODEL_META } from "@/types/premiumContent";
import { ErrorBanner } from "@/components/ui/feedback/ErrorBanner";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = use(params);
  const { data: product, isLoading, isError, error, refetch } = useProduct(productId);

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner size="md" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-5xl mx-auto space-y-6">
        <Link
          href=".."
          className="inline-flex items-center gap-2 text-sm text-text-ds-tertiary hover:text-white transition-colors"
        >
          <ArrowLeft size={16} />
          Back to products
        </Link>
        <ErrorBanner
          message={error instanceof Error ? error.message : "Failed to load product"}
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  if (!product) {
    return <p className="text-sm text-white/30">Product not found.</p>;
  }

  const meta = PRODUCT_TYPE_META[product.type];

  const tabs = [
    { href: "content", label: "Content", icon: FileText },
    { href: "access", label: "Access", icon: Lock },
    { href: "pricing", label: "Pricing", icon: DollarSign },
    { href: "delivery", label: "Delivery", icon: Truck },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <Link
        href=".."
        className="inline-flex items-center gap-2 text-sm text-text-ds-tertiary hover:text-white transition-colors"
      >
        <ArrowLeft size={16} />
        Back to products
      </Link>

      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
        <p className="text-[10px] font-heading font-bold text-teal-500/40 uppercase tracking-widest mb-1">
          {meta.label}
        </p>
        <h1 className="text-xl font-heading font-bold text-text-ds-primary tracking-tight">
          {product.title}
        </h1>
        {product.description && (
          <p className="text-sm text-text-ds-secondary mt-2">
            {product.description}
          </p>
        )}

        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/5">
          <div>
            <p className="text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-white/30 mb-1">
              Access
            </p>
            <p className="text-sm text-text-ds-primary">
              {ACCESS_MODEL_META[product.accessModel].label}
            </p>
          </div>
          <div>
            <p className="text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-white/30 mb-1">
              Price
            </p>
            <p className="text-sm text-gold-400 font-heading font-bold tnum">
              {product.accessModel === "tier-included"
                ? "Included in tier"
                : product.price
                ? `$${product.price.toLocaleString()} ${product.currency}`
                : "—"}
            </p>
          </div>
          <div>
            <p className="text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-white/30 mb-1">
              Delivery
            </p>
            <p className="text-sm text-text-ds-primary">
              {DELIVERY_MODEL_META[product.delivery].label}
            </p>
          </div>
          <div>
            <p className="text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-white/30 mb-1">
              Status
            </p>
            <p className="text-sm text-text-ds-primary capitalize">
              {product.status}
            </p>
          </div>
        </div>
      </div>

      <nav
        className="grid grid-cols-2 sm:grid-cols-4 gap-3"
        role="tablist"
        aria-label="Product sections"
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              role="tab"
              aria-selected={false}
              className="flex flex-col items-center gap-2 p-5 bg-black/40 border border-white/10 hover:border-gold-400/40 hover:bg-gold-400/5 rounded-2xl transition-colors"
            >
              <Icon size={20} className="text-teal-400" />
              <span className="text-sm font-heading font-medium text-text-ds-primary">
                {tab.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}