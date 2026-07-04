"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Spinner from "@/components/ui/Spinner";
import { useProduct } from "@/lib/api/premiumContent";
import { DELIVERY_MODEL_META } from "@/types/premiumContent";

export default function ProductDeliveryPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = use(params);
  const { data: product, isLoading } = useProduct(productId);

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner size="md" />
      </div>
    );
  }

  if (!product) {
    return <p className="text-sm text-white/30">Product not found.</p>;
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <Link
        href=".."
        className="inline-flex items-center gap-2 text-sm text-text-ds-tertiary hover:text-white transition-colors"
      >
        <ArrowLeft size={16} />
        Back to {product.title}
      </Link>

      <div className="flex items-center gap-3 border-l-4 border-teal-400 pl-4">
        <h1 className="text-sm font-heading font-medium text-teal-400">
          Delivery
        </h1>
      </div>

      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 space-y-4">
        <p className="text-xs text-white/30">
          Read-only preview. Delivery editing will be enabled when backend is connected.
        </p>

        <div>
          <p className="text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-white/30 mb-1">
            Model
          </p>
          <p className="text-sm text-text-ds-primary">
            {DELIVERY_MODEL_META[product.delivery].label}
          </p>
          <p className="text-xs text-white/40 mt-0.5">
            {DELIVERY_MODEL_META[product.delivery].description}
          </p>
        </div>

        {product.scheduledAt && (
          <div>
            <p className="text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-white/30 mb-1">
              Scheduled at
            </p>
            <p className="text-sm text-text-ds-primary">
              {new Date(product.scheduledAt).toLocaleString()}
            </p>
          </div>
        )}

        {product.liveSession && (
          <div className="space-y-3 pt-4 border-t border-white/5">
            <p className="text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-white/30">
              Live session details
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-white/40">Date</p>
                <p className="text-sm text-text-ds-primary">
                  {new Date(product.liveSession.scheduledAt).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-white/40">Duration</p>
                <p className="text-sm text-text-ds-primary">
                  {product.liveSession.durationMinutes} minutes
                </p>
              </div>
              {product.liveSession.capacity && (
                <div>
                  <p className="text-xs text-white/40">Capacity</p>
                  <p className="text-sm text-text-ds-primary">
                    {product.liveSession.capacity} seats
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}