"use client";

import Link from "next/link";
import { Plus, Package, Layers, Lock, CreditCard, ArrowRight } from "lucide-react";
import { useProducts, useTiers, useBundles } from "@/lib/api/premiumContent";

export default function PremiumContentDashboard() {
  const { data: products } = useProducts();
  const { data: tiers } = useTiers();
  const { data: bundles } = useBundles();

  const productCount = products?.length ?? 0;
  const tierCount = tiers?.length ?? 0;
  const bundleCount = bundles?.length ?? 0;

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
            href="./products/create"
            className="group flex flex-col items-center justify-center gap-3 p-8 bg-black/40 border border-white/10 hover:border-teal-400/40 hover:bg-teal-900/10 rounded-2xl transition-colors"
          >
            <Plus size={32} className="text-teal-400 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-heading font-medium text-text-ds-primary">
              New Product
            </span>
          </Link>

          <Link
            href="./tiers/create"
            className="group flex flex-col items-center justify-center gap-3 p-8 bg-black/40 border border-white/10 hover:border-teal-400/40 hover:bg-teal-900/10 rounded-2xl transition-colors"
          >
            <Layers size={32} className="text-teal-400 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-heading font-medium text-text-ds-primary">
              New Tier
            </span>
          </Link>

          <Link
            href="./bundles/create"
            className="group flex flex-col items-center justify-center gap-3 p-8 bg-black/40 border border-white/10 hover:border-teal-400/40 hover:bg-teal-900/10 rounded-2xl transition-colors"
          >
            <Package size={32} className="text-teal-400 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-heading font-medium text-text-ds-primary">
              New Bundle
            </span>
          </Link>
        </div>
      </section>

      {/* Manage Section */}
      <section className="space-y-4">
        <h2 className="text-sm font-heading font-medium text-teal-400 uppercase tracking-widest">
          Manage
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="./products"
            className="group flex items-center justify-between p-6 bg-black/40 border border-white/10 hover:border-white/20 rounded-2xl transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-teal-900/30 rounded-xl">
                <Package size={24} className="text-teal-400" />
              </div>
              <div>
                <h3 className="text-sm font-heading font-semibold text-text-ds-primary">
                  Products
                </h3>
                <p className="text-xs text-text-ds-secondary mt-0.5">
                  {productCount} {productCount === 1 ? "item" : "items"}
                </p>
              </div>
            </div>
            <ArrowRight size={20} className="text-white/30 group-hover:text-white group-hover:translate-x-1 transition-all" />
          </Link>

          <Link
            href="./tiers"
            className="group flex items-center justify-between p-6 bg-black/40 border border-white/10 hover:border-white/20 rounded-2xl transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-teal-900/30 rounded-xl">
                <Layers size={24} className="text-teal-400" />
              </div>
              <div>
                <h3 className="text-sm font-heading font-semibold text-text-ds-primary">
                  Tiers
                </h3>
                <p className="text-xs text-text-ds-secondary mt-0.5">
                  {tierCount} {tierCount === 1 ? "active" : "active"}
                </p>
              </div>
            </div>
            <ArrowRight size={20} className="text-white/30 group-hover:text-white group-hover:translate-x-1 transition-all" />
          </Link>

          <Link
            href="./bundles"
            className="group flex items-center justify-between p-6 bg-black/40 border border-white/10 hover:border-white/20 rounded-2xl transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-teal-900/30 rounded-xl">
                <Package size={24} className="text-teal-400" />
              </div>
              <div>
                <h3 className="text-sm font-heading font-semibold text-text-ds-primary">
                  Bundles
                </h3>
                <p className="text-xs text-text-ds-secondary mt-0.5">
                  {bundleCount} {bundleCount === 1 ? "pack" : "packs"}
                </p>
              </div>
            </div>
            <ArrowRight size={20} className="text-white/30 group-hover:text-white group-hover:translate-x-1 transition-all" />
          </Link>
        </div>
      </section>

      {/* Settings Section */}
      <section className="space-y-4">
        <h2 className="text-sm font-heading font-medium text-teal-400 uppercase tracking-widest">
          Settings
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="./access-settings"
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
            href="./billing"
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