"use client";
import Input from './Input';
import { useState } from 'react';

export function TierForm({ onSubmit }: { onSubmit: (v: { name: string; priceCents: number; perks: string[]; active: boolean }) => void }) {
  const [name, setName] = useState('Starter');
  const [price, setPrice] = useState(500);
  const [perks, setPerks] = useState<string>('Badge; Thanks mention');
  const [active, setActive] = useState(true);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ name, priceCents: Number(price), perks: perks.split(';').map((s) => s.trim()).filter(Boolean), active });
      }}
      className="grid gap-3"
    >
      <Input label="Tier name" value={name} onChange={(e) => setName(e.currentTarget.value)} />
      <Input label="Monthly price (cents)" type="number" value={price as any} onChange={(e) => setPrice(Number(e.currentTarget.value))} />
      <label className="block">
        <span className="text-sm text-white/80">Perks (oddzielone `;`)</span>
        <input className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2" value={perks} onChange={(e) => setPerks(e.currentTarget.value)} />
      </label>
      <label className="inline-flex items-center gap-2 text-sm">
        <input type="checkbox" checked={active} onChange={(e) => setActive(e.currentTarget.checked)} /> Active
      </label>
      <button className="mt-2 rounded-lg bg-[#FFD700] px-4 py-2 font-bold text-[#0d2f3f]">Save tier</button>
    </form>
  );
}

