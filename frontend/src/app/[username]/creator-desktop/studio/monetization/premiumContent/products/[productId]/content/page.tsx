"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Spinner from "@/components/ui/Spinner";
import { useProduct } from "@/lib/api/premiumContent";
import { PRODUCT_TYPE_META } from "@/types/premiumContent";
import CourseModulesEditor from "@/components/monetization/premiumContent/products/content/CourseModulesEditor";
import LiveSessionScheduler from "@/components/monetization/premiumContent/products/content/LiveSessionScheduler";
import GenericContentUpload from "@/components/monetization/premiumContent/products/content/GenericContentUpload";

export default function ProductContentPage({
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
          Content · {PRODUCT_TYPE_META[product.type].label}
        </h1>
      </div>

      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 space-y-6">
        <p className="text-xs text-white/30">
          Content editing is read-only in this preview. Connect to backend to enable mutations.
        </p>

        {product.type === "course" && (
          <CourseModulesEditor
            modules={product.modules ?? []}
            onChange={() => {}}
          />
        )}

        {product.type === "live-session" && (
          <LiveSessionScheduler
            value={
              product.liveSession ?? {
                scheduledAt: "",
                durationMinutes: 60,
              }
            }
            onChange={() => {}}
          />
        )}

        {product.type !== "course" && product.type !== "live-session" && (
          <GenericContentUpload
            type={product.type}
            files={[]}
            onChange={() => {}}
          />
        )}
      </div>
    </div>
  );
}