"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

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
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Szukaj po nazwie lub aliasie"
        className="flex-1 rounded-lg bg-white/5 border border-white/10 p-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-teal-400"
      />
      <button className="px-4 rounded-lg bg-teal-500 text-black font-semibold">Szukaj</button>
    </form>
  );
}

