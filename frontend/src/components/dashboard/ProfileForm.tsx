"use client";
import { useState } from 'react';

export type CreatorProfile = {
  name: string;
  alias: string;
  bio: string;
  links?: { youtube?: string; twitch?: string; twitter?: string };
  goal?: { target: number; current?: number };
};

export default function ProfileForm({
  initial,
  onSubmit,
}: {
  initial?: CreatorProfile;
  onSubmit: (v: CreatorProfile) => Promise<void> | void;
}) {
  const [v, setV] = useState<CreatorProfile>(initial ?? { name: '', alias: '', bio: '' });
  const [saving, setSaving] = useState(false);
  const change = (k: keyof CreatorProfile, val: any) => setV((s) => ({ ...s, [k]: val }));

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setSaving(true);
        await onSubmit(v);
        setSaving(false);
      }}
      className="grid gap-3"
    >
      <label className="grid gap-1">
        <span className="text-sm opacity-80">Nazwa</span>
        <input
          required
          value={v.name}
          onChange={(e) => change('name', e.target.value)}
          className="rounded-lg bg-white/5 border border-white/10 p-2"
        />
      </label>
      <label className="grid gap-1">
        <span className="text-sm opacity-80">Alias</span>
        <input
          required
          value={v.alias}
          onChange={(e) => change('alias', e.target.value)}
          className="rounded-lg bg-white/5 border border-white/10 p-2"
        />
      </label>
      <label className="grid gap-1">
        <span className="text-sm opacity-80">Bio</span>
        <textarea
          value={v.bio}
          onChange={(e) => change('bio', e.target.value)}
          className="rounded-lg bg-white/5 border border-white/10 p-2 min-h-[120px]"
        />
      </label>

      <fieldset className="grid sm:grid-cols-2 gap-3 p-3 rounded-xl border border-white/10">
        <legend className="px-2 text-sm opacity-80">Linki</legend>
        <input
          placeholder="YouTube URL"
          value={v.links?.youtube ?? ''}
          onChange={(e) => setV((s) => ({ ...s, links: { ...s.links, youtube: e.target.value } }))}
          className="rounded-lg bg-white/5 border border-white/10 p-2"
        />
        <input
          placeholder="Twitch URL"
          value={v.links?.twitch ?? ''}
          onChange={(e) => setV((s) => ({ ...s, links: { ...s.links, twitch: e.target.value } }))}
          className="rounded-lg bg-white/5 border border-white/10 p-2"
        />
      </fieldset>

      <fieldset className="grid sm:grid-cols-[1fr_1fr] gap-3 p-3 rounded-xl border border-white/10">
        <legend className="px-2 text-sm opacity-80">Cel</legend>
        <input
          type="number"
          min={0}
          placeholder="Kwota docelowa (USDC)"
          value={v.goal?.target ?? 0}
          onChange={(e) =>
            setV((s) => ({ ...s, goal: { ...s.goal, target: Number(e.target.value || 0) } }))
          }
          className="rounded-lg bg-white/5 border border-white/10 p-2"
        />
        <input
          type="number"
          min={0}
          placeholder="Obecny postęp"
          value={v.goal?.current ?? 0}
          onChange={(e) =>
            setV((s) => ({ ...s, goal: { ...s.goal, current: Number(e.target.value || 0) } }))
          }
          className="rounded-lg bg-white/5 border border-white/10 p-2"
        />
      </fieldset>

      <button
        disabled={saving}
        aria-busy={saving}
        className="rounded-lg bg-[var(--color-primary)] text-black font-semibold px-4 py-2"
      >
        Zapisz profil
      </button>
    </form>
  );
}
