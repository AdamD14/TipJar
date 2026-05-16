"use client";

import { useState } from "react";
import Input from "@/components/ui/forms/Input";

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
    <Input
      value={value}
      onChange={handleChange}
      placeholder="Search @handle"
    />
  );
}
