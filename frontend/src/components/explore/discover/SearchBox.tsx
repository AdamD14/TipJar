"use client";

import { useState } from "react";

export type SearchResult = { handle: string; exists: boolean };

export default function SearchBox({
  onResults,
  onQueryChange,
}: {
  onResults: (rows: SearchResult[]) => void;
  onQueryChange?: (q: string) => void;
}) {
  const [value, setValue] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const q = e.target.value;
    setValue(q);
    onQueryChange?.(q);
    if (q.startsWith("@")) {
      onResults([{ handle: q.slice(1), exists: true }]);
    } else {
      onResults([]);
    }
  }

  return (
    <input
      value={value}
      onChange={handleChange}
      placeholder="Search @handle"
      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-gold-400"
    />
  );
}
