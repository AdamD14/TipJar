"use client";
import { useState } from 'react';
import type { Goal } from '@/lib/api/contracts';

export default function GoalForm({
  initial,
  onSubmit,
}: {
  initial?: Goal;
  onSubmit: (v: Goal) => Promise<void> | void;
}) {
  const [v, setV] = useState<Goal>(initial ?? { title: '', target: 0, deadline: '' });
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await onSubmit(v);
      }}
      className="grid gap-3"
    >
      <input
        className="rounded-lg bg-white/5 border border-white/10 p-2"
        placeholder="Tytuł"
        value={v.title}
        onChange={(e) => setV((s) => ({ ...s, title: e.target.value }))}
      />
      <input
        type="number"
        min={0}
        className="rounded-lg bg-white/5 border border-white/10 p-2"
        placeholder="Kwota docelowa (USDC)"
        value={v.target}
        onChange={(e) => setV((s) => ({ ...s, target: Number(e.target.value || 0) }))}
      />
      <input
        type="date"
        className="rounded-lg bg-white/5 border border-white/10 p-2"
        value={v.deadline}
        onChange={(e) => setV((s) => ({ ...s, deadline: e.target.value }))}
      />
      <button className="rounded-lg bg-[var(--color-primary)] text-black font-semibold px-4 py-2">
        Zapisz cel
      </button>
    </form>
  );
}
