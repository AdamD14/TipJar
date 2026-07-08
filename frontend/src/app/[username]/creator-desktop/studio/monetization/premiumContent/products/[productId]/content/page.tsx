"use client";

import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { use } from "react";
import Spinner from "@/components/ui/Spinner";
import { useProduct, useUpdateProductContent } from "@/lib/api/premiumContent";
import { PRODUCT_TYPE_META } from "@/types/premiumContent";
import CourseModulesEditorV2 from "@/components/monetization/premiumContent/products/content/CourseModulesEditorV2";
import LiveSessionSchedulerV2 from "@/components/monetization/premiumContent/products/content/LiveSessionSchedulerV2";
import GenericContentUploadV2 from "@/components/monetization/premiumContent/products/content/GenericContentUploadV2";
import { useToast } from "@/components/ui/notifications/Toast";

export default function ProductContentPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = use(params);
  const { data: product, isLoading } = useProduct(productId);
  const updateContent = useUpdateProductContent(productId);
  const toast = useToast();
  const [isSaving, setIsSaving] = useState(false);

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

  const handleSave = async (contentData: any) => {
    setIsSaving(true);
    try {
      await updateContent.mutateAsync(contentData);
      toast.push({ type: "success", text: "Content saved." });
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to save content.";
      toast.push({ type: "error", text: message });
    } finally {
      setIsSaving(false);
    }
  };

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
        {product.type === "course" && (
          <CourseModulesEditorV2
            modules={product.modules ?? []}
            onChange={handleSave}
            isSaving={isSaving}
          />
        )}

        {product.type === "live-session" && (
          <LiveSessionSchedulerV2
            value={
              product.liveSession ?? {
                scheduledAt: "",
                durationMinutes: 60,
              }
            }
            onChange={handleSave}
            isSaving={isSaving}
          />
        )}

        {["gallery", "video", "audio", "document"].includes(product.type) && (
          <GenericContentUploadV2
            type={product.type}
            files={[]}
            onChange={(files) => handleSave({ files })}
            isSaving={isSaving}
          />
        )}
      </div>
    </div>
  );
}