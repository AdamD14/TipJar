"use client";

import { useEffect, useState } from "react";
import api from "@/lib/apiClient";
import { TierSchema } from "@/lib/validators";
import type { Tier } from "@/lib/types";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/buttons/Button";
import Input from "@/components/ui/forms/Input";

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
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    setError(null);
    try {
      setBusy(true);
      const payload = TierSchema.parse({
        name: f.name.trim(),
        price: Math.round(Number(f.price) * 100),
        perks: f.perks.filter((p) => p.trim().length >= 2).slice(0, 5),
      });
      const response = initial
        ? await api.put(`/api/v1/subscriptions/tiers/${initial.id}`, payload)
        : await api.post(`/api/v1/subscriptions/tiers`, payload);
      const t: Tier = response.data;
      onSaved(t);
      onClose();
    } catch (e: any) {
      setError(e?.message || "Failed to save tier.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Modal
      open
      onClose={onClose}
      size="form"
      title={initial ? "Edit tier" : "New tier"}
    >
      <div className="space-y-4">
        <div>
          <label className="block font-body text-sm text-text-ds-secondary mb-1">
            Name
          </label>
          <Input
            value={f.name}
            onChange={(e) => setF({ ...f, name: e.target.value })}
            placeholder="Tier name"
          />
        </div>

        <div>
          <label className="block font-body text-sm text-text-ds-secondary mb-1">
            Price (USDC / month)
          </label>
          <Input
            type="number"
            value={f.price}
            onChange={(e) => setF({ ...f, price: e.target.value })}
            placeholder="9.99"
            inputSize="large"
            className="tnum"
          />
        </div>

        <div>
          <div className="font-body text-sm text-text-ds-secondary mb-1">
            Perks (max 5)
          </div>
          <div className="space-y-2">
            {f.perks.map((p, i) => (
              <div key={i} className="flex gap-2">
                <Input
                  value={p}
                  onChange={(e) => setPerk(i, e.target.value)}
                  placeholder="Perk description"
                  className="flex-1"
                />
                {f.perks.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removePerk(i)}
                  >
                    –
                  </Button>
                )}
              </div>
            ))}
          </div>
          <button
            onClick={addPerk}
            className="mt-2 font-body text-xs text-gold-400 underline underline-offset-4 hover:text-gold-300 transition-colors"
          >
            Add perk
          </button>
        </div>

        {error && (
          <p className="text-sm text-error-light" role="alert">
            {error}
          </p>
        )}

        <div className="flex gap-2 justify-end pt-2">
          <Button variant="secondary" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            loading={busy}
            disabled={!f.name || !f.price}
            onClick={submit}
          >
            {initial ? "Save" : "Create"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
