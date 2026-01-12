"use client";
import { useEffect, useState } from "react";
import api from "@/lib/apiClient";
import { TierSchema } from "@/lib/validators";
import type { Tier } from "@/lib/types";

export default function TierModal({
  onClose,
  onSaved,
  initial,
}: {
  onClose: () => void;
  onSaved: (t: Tier) => void;
  initial?: Tier;
}) {
  const [f, setF] = useState({ name: "", price: "", perks: [""] as string[] });
  useEffect(() => {
    if (initial)
      setF({
        name: initial.name,
        price: String(initial.price / 100),
        perks: initial.perks?.length ? initial.perks : [""],
      });
  }, [initial]);

  const setPerk = (i: number, val: string) =>
    setF((s) => ({
      ...s,
      perks: s.perks.map((p, idx) => (idx === i ? val : p)),
    }));
  const addPerk = () => setF((s) => ({ ...s, perks: [...s.perks, ""] }));
  const removePerk = (i: number) =>
    setF((s) => ({ ...s, perks: s.perks.filter((_, idx) => idx !== i) }));

  const submit = async () => {
    const payload = TierSchema.parse({
      name: f.name.trim(),
      price: Math.round(Number(f.price) * 100),
      perks: f.perks.filter((p) => p.trim().length >= 2).slice(0, 5),
    });
    const t: Tier = initial
      ? await api(`/api/v1/subscriptions/tiers/${initial.id}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        })
      : await api(`/api/v1/subscriptions/tiers`, {
          method: "POST",
          body: JSON.stringify(payload),
        });
    onSaved(t);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 grid place-items-center p-4">
      <div className="w-full max-w-md bg-slate-900 border border-white/10 rounded-2xl p-6">
        <h3 className="font-semibold mb-4">
          {initial ? "Edit tier" : "New tier"}
        </h3>

        <label className="text-sm">Name</label>
        <input
          value={f.name}
          onChange={(e) => setF({ ...f, name: e.target.value })}
          className="w-full bg-transparent border-b border-white/20 mb-3"
        />

        <label className="text-sm">Price (USDC / month)</label>
        <input
          type="number"
          value={f.price}
          onChange={(e) => setF({ ...f, price: e.target.value })}
          className="w-full bg-transparent border-b border-white/20 mb-3"
        />

        <div className="text-sm mb-1">Perks (max 5)</div>
        <div className="space-y-2">
          {f.perks.map((p, i) => (
            <div key={i} className="flex gap-2">
              <input
                value={p}
                onChange={(e) => setPerk(i, e.target.value)}
                className="flex-1 bg-transparent border-b border-white/20"
              />
              {f.perks.length > 1 && (
                <button
                  onClick={() => removePerk(i)}
                  className="text-xs px-2 rounded border border-white/15"
                >
                  –
                </button>
              )}
            </div>
          ))}
        </div>
        <button
          onClick={addPerk}
          className="mt-2 text-xs text-[#FFD700] underline"
        >
          Add perk
        </button>

        <div className="mt-5 flex gap-2 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-white/15"
          >
            Cancel
          </button>
          <button
            onClick={submit}
            className="px-4 py-2 rounded-lg bg-[#FFD700] text-[#003737] font-semibold"
          >
            {initial ? "Save" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}
