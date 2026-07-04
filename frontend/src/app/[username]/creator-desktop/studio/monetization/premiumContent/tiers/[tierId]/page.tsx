"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import TierForm from "@/components/monetization/premiumContent/tiers/TierForm";
import Spinner from "@/components/ui/Spinner";
import { useTier } from "@/lib/api/premiumContent";

export default function EditTierPage({
  params,
}: {
  params: Promise<{ tierId: string }>;
}) {
  const { tierId } = use(params);
  const router = useRouter();
  const { data: tier, isLoading } = useTier(tierId);

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner size="md" />
      </div>
    );
  }

  if (!tier) {
    return <p className="text-sm text-white/30">Tier not found.</p>;
  }

  return (
    <TierForm
      initialTier={tier}
      onSaved={() => router.push("../")}
    />
  );
}