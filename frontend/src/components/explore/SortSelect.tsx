"use client";

import { useId } from "react";
import Select from "@/components/ui/Select";
import type { ExplorerSort } from "@/lib/explorer";

export default function SortSelect({
  value,
  onChange,
}: {
  value: ExplorerSort;
  onChange: (v: ExplorerSort) => void;
}) {
  const id = useId();
  return (
    <label className="inline-flex items-center gap-2" htmlFor={id}>
      <span className="text-sm text-text-ds-secondary">Sort</span>
      <Select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value as ExplorerSort)}
      >
        <option value="trending">Trending</option>
        <option value="newest">Newest</option>
        <option value="az">A–Z</option>
        <option value="za">Z–A</option>
      </Select>
    </label>
  );
}
