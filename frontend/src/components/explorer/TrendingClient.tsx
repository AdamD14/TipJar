"use client";

import TrendingNow, { type Trend } from "./TrendingNow";
import { getRecent } from "@/lib/metrics";
import { useMemo } from "react";

export default function TrendingClient({ items }: { items: Trend[] }) {
  const recent = getRecent(50);
  const filtered = useMemo(
    () => items.filter((t) => !recent.includes(t.handle)).slice(0, 12),
    [items, recent]
  );
  return <TrendingNow items={filtered} />;
}
