"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plus, Package, Layers, Lock, CreditCard, ArrowRight } from "lucide-react";
import { ProductsIndexV2, TiersIndexV2, BundlesIndexV2 } from "@/components/monetization/premiumContent/PremiumContentIndexesV2";
import { useProducts, useTiers, useBundles } from "@/lib/api/premiumContent";

export default function PremiumContentDashboard() {
  const pathname = usePathname();
  const { data: products } = useProducts();
  const { data: tiers } = useTiers();
  const { data: bundles } = useBundles();

  const productCount = products?.length ?? 0;
  const tierCount = tiers?.length ?? 0;
  const bundleCount = bundles?.length ?? 0;

  const basePath = pathname.endsWith("/") ? pathname : pathname + "/";

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-text-ds-primary">
            Premium Content
          </h1>
          <p className="text-sm text-text-ds-secondary mt-1">
            Manage products, tiers, and bundles
          </p>
        </div>
      </div>

      {/* Quick Create */}
      <section className="space-y-4">
        <h2 className="text-sm font-heading font-medium text-teal-400 uppercase tracking-widest">
          Quick Create
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href={`${basePath}products/create`}
            className="group flex flex-col items-center justify-center gap-3 p-8 bg-black/40 border border-white/10 hover:border-teal-400/40 hover:bg-teal-900/10 rounded-2xl transition-colors"
          >
            <Plus size={32} className="text-teal-400 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-heading font-medium text-text-ds-primary">
              New Product
            </span>
          </Link>

          <Link
            href={`${basePath}tiers/create`}
            className="group flex flex-col items-center justify-center gap-3 p-8 bg-black/40 border border-white/10 hover:border-teal-400/40 hover:bg-teal-900/10 rounded-2xl transition-colors"
          >
            <Layers size={32} className="text-teal-400 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-heading font-medium text-text-ds-primary">
              New Tier
            </span>
          </Link>

          <Link
            href={`${basePath}bundles/create`}
            className="group flex flex-col items-center justify-center gap-3 p-8 bg-black/40 border border-white/10 hover:border-teal-400/40 hover:bg-teal-900/10 rounded-2xl transition-colors"
          >
            <Package size={32} className="text-teal-400 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-heading font-medium text-text-ds-primary">
              New Bundle
            </span>
          </Link>
        </div>
      </section>

      {/* Products */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-heading font-medium text-teal-400 uppercase tracking-widest">
            Products
          </h2>
          <Link href={`${basePath}products/create`}>
            <span className="text-sm text-teal-400 hover:text-teal-300 font-medium">Create</span>
          </Link>
        </div>
        <ProductsIndexV2 createHref={`${basePath}products/create`} />
      </section>

      {/* Tiers */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-heading font-medium text-teal-400 uppercase tracking-widest">
            Tiers
          </h2>
          <Link href={`${basePath}tiers/create`}>
            <span className="text-sm text-teal-400 hover:text-teal-300 font-medium">Create</span>
          </Link>
        </div>
        <TiersIndexV2 createHref={`${basePath}tiers/create`} />
      </section>

      {/* Bundles */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-heading font-medium text-teal-400 uppercase tracking-widest">
            Bundles
          </h2>
          <Link href={`${basePath}bundles/create`}>
            <span className="text-sm text-teal-400 hover:text-teal-300 font-medium">Create</span>
          </Link>
        </div>
        <BundlesIndexV2 createHref={`${basePath}bundles/create`} />
      </section>

      {/* Settings Section */}
      <section className="space-y-4">
        <h2 className="text-sm font-heading font-medium text-teal-400 uppercase tracking-widest">
          Settings
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href={`${basePath}access-settings`}
            className="group flex items-center justify-between p-6 bg-black/40 border border-white/10 hover:border-white/20 rounded-2xl transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-teal-900/30 rounded-xl">
                <Lock size={24} className="text-teal-400" />
              </div>
              <div>
                <h3 className="text-sm font-heading font-semibold text-text-ds-primary">
                  Access Settings
                </h3>
                <p className="text-xs text-text-ds-secondary mt-0.5">
                  Regions, currencies, gating
                </p>
              </div>
            </div>
            <ArrowRight size={20} className="text-white/30 group-hover:text-white group-hover:translate-x-1 transition-all" />
          </Link>

          <Link
            href={`${basePath}billing`}
            className="group flex items-center justify-between p-6 bg-black/40 border border-white/10 hover:border-white/20 rounded-2xl transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-teal-900/30 rounded-xl">
                <CreditCard size={24} className="text-teal-400" />
              </div>
              <div>
                <h3 className="text-sm font-heading font-semibold text-text-ds-primary">
                  Billing & Payouts
                </h3>
                <p className="text-xs text-text-ds-secondary mt-0.5">
                  Cycles, proration, invoices
                </p>
              </div>
            </div>
            <ArrowRight size={20} className="text-white/30 group-hover:text-white group-hover:translate-x-1 transition-all" />
          </Link>
        </div>
      </section>
    </div>
  );
}