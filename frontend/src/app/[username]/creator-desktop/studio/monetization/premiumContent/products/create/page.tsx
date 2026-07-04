"use client";

import { useRouter } from "next/navigation";
import ProductCreateWizard from "@/components/monetization/premiumContent/products/ProductCreateWizard";

export default function CreateProductPage() {
  const router = useRouter();

  return (
    <ProductCreateWizard
      onPublished={(id) => router.push(`../${id}`)}
    />
  );
}