"use client";

import TierCompareView from "@/components/monetization/premiumContent/tiers/TierCompareView";

export default function TierComparePage() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center gap-3 border-l-4 border-teal-400 pl-4 mb-6">
        <h1 className="text-base font-heading font-medium text-teal-400">
          Compare Tiers
        </h1>
        <p className="text-xs text-white/30">Fan-facing public preview</p>
      </div>
      <TierCompareView />
    </div>
  );
}