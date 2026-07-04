"use client";

import { useRouter } from "next/navigation";
import BundleForm from "@/components/monetization/premiumContent/bundles/BundleForm";

export default function CreateBundlePage() {
  const router = useRouter();

  return <BundleForm onSaved={() => router.push("../")} />;
}