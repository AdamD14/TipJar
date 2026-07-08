"use client";

import { use } from "react";
import { TierFormV2 } from "@/components/monetization/premiumContent/tiers/TierFormV2";

export default function EditTierPage({
  params,
}: {
  params: Promise<{ tierId: string }>;
}) {
  const { tierId } = use(params);

  return <TierFormV2 mode="edit" tierId={tierId} />;
}