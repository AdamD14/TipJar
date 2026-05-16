"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Input from "@/components/ui/forms/Input";
import Button from "@/components/ui/buttons/Button";

export default function SearchBar() {
  const router = useRouter();
  const params = useSearchParams();
  const [q, setQ] = useState(params.get('q') ?? '');

  useEffect(() => {
    setQ(params.get('q') ?? '');
  }, [params]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const sp = new URLSearchParams(Array.from(params.entries()));
    if (q) sp.set('q', q);
    else sp.delete('q');
    router.push(`/explore?${sp.toString()}`);
  };

  return (
    <form onSubmit={submit} className="flex gap-2">
      <Input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search by name or alias"
        className="flex-1"
      />
      <Button variant="solid" type="submit">Search</Button>
    </form>
  );
}

