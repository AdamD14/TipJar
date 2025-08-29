"use client";
import type { Tier } from '@/lib/types';

export default function TierCard({ t, onEdit, onArchive }: { t: Tier; onEdit: (t: Tier) => void; onArchive: (id: string) => void }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 flex flex-col">
      <div className="flex items-start justify-between">
        <div>
          <div className="font-semibold">{t.name}</div>
          <div className="text-2xl font-bold mt-1">
            {(t.price / 100).toFixed(2)} <span className="text-sm">USDC/mo</span>
          </div>
        </div>
        <span className={`text-xs px-2 py-1 rounded ${t.active ? 'bg-emerald-400/20 text-emerald-300' : 'bg-white/10 text-white/60'}`}>{t.active ? 'Active' : 'Inactive'}</span>
      </div>

      <ul className="mt-3 space-y-1 text-sm text-white/80 flex-1">
        {t.perks.map((p, i) => (
          <li key={i}>• {p}</li>
        ))}
      </ul>

      <div className="mt-4 flex gap-2">
        <button onClick={() => onEdit(t)} className="px-3 py-1.5 rounded-lg border border-white/15 text-sm">Edit</button>
        <button onClick={() => onArchive(t.id)} className="px-3 py-1.5 rounded-lg text-sm bg-white/10">Archive</button>
      </div>
    </div>
  );
}

