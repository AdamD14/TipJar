"use client";

import Link from "next/link";
import Card from "@/components/ui/forms/Card";
import { recordClick } from "@/lib/metrics";

export type Suggestion = { handle: string; source: "local" | "recent" };

export default function Suggestions({
  items,
  query,
}: {
  items: Suggestion[];
  query: string;
}) {
  if (!query || items.length === 0) return null;
  return (
    <Card noPadding className="mt-2">
      <p className="mb-1 px-4 pt-4 text-xs text-text-ds-secondary">Suggestions</p>
      <ul className="divide-y divide-white/10">
        {items.map((s) => (
          <li key={`${s.source}:${s.handle}`}>
            <Link
              href={`/tip/${s.handle}`}
              className="block px-4 py-2 text-sm text-text-ds-primary hover:bg-white/10"
              onClick={() => recordClick(s.handle, "suggestion")}
            >
              @{s.handle} <span className="text-xs text-text-ds-secondary">({s.source})</span>
            </Link>
          </li>
        ))}
      </ul>
    </Card>
  );
}
