"use client";

import { useRouter } from "next/navigation";
import ProductCreateWizardV2 from "@/components/monetization/premiumContent/products/ProductCreateWizardV2";

export default function CreateProductPage() {
  const router = useRouter();

  return (
    <ProductCreateWizardV2
      onPublished={(id) => router.push(`../${id}`)}
    />
  );
}