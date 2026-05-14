"use client";
import { useState, useMemo } from 'react';
import type { CreatorProfile } from '@/lib/api/contracts';

export type ProfileFormProps = {
  initial?: CreatorProfile;
  onSubmit: (v: CreatorProfile) => Promise<void> | void;
  onUpload?: (f: File) => Promise<string>;
};

export default function ProfileForm({ initial, onSubmit, onUpload }: ProfileFormProps) {
  const [v, setV] = useState<CreatorProfile>(initial ?? { id: '', name: '', alias: '' });
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [fileAvatar, setFileAvatar] = useState<File | null>(null);
  const [fileBanner, setFileBanner] = useState<File | null>(null);

  const avatarPreview = useMemo(
    () => (fileAvatar ? URL.createObjectURL(fileAvatar) : v.avatarUrl),
    [fileAvatar, v.avatarUrl],
  );
  const bannerPreview = useMemo(
    () => (fileBanner ? URL.createObjectURL(fileBanner) : v.bannerUrl),
    [fileBanner, v.bannerUrl],
  );

  function change<K extends keyof CreatorProfile>(k: K, val: CreatorProfile[K]) {
    setV((s) => ({ ...s, [k]: val }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    if (!v.name?.trim()) return setErr('Nazwa jest wymagana.');
    if (!v.alias?.trim()) return setErr('Alias jest wymagany.');
    setSaving(true);
    try {
      const payload = { ...v };
      if (fileAvatar && onUpload) payload.avatarUrl = await onUpload(fileAvatar);
      if (fileBanner && onUpload) payload.bannerUrl = await onUpload(fileBanner);
      await onSubmit(payload as CreatorProfile);
    } catch (e: any) {
      setErr(e?.message || 'Nie udało się zapisać profilu.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={submit} className="grid gap-4">
      <div>
        <label className="block text-sm opacity-80 mb-1">Baner</label>
        <div
          className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 h-40"
          style={
            bannerPreview
              ? {
                  backgroundImage: `url(${bannerPreview})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }
              : {}
          }
        />
        <input
          type="file"
          accept="image/*"
          className="mt-2"
          onChange={(e) => setFileBanner(e.currentTarget.files?.[0] ?? null)}
        />
      </div>

      <div className="grid sm:grid-cols-[96px_1fr] gap-4 items-start">
        <div>
          <label className="block text-sm opacity-80 mb-1">Avatar</label>
          <div
            className="w-24 h-24 rounded-full overflow-hidden border border-white/10 bg-white/10"
            style={
              avatarPreview
                ? {
                    backgroundImage: `url(${avatarPreview})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }
                : {}
            }
          />
          <input
            type="file"
            accept="image/*"
            className="mt-2"
            onChange={(e) => setFileAvatar(e.currentTarget.files?.[0] ?? null)}
          />
        </div>
        <div className="grid gap-3">
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
        </div>
      </div>

      <label className="grid gap-1">
        <span className="text-sm opacity-80">Bio</span>
        <textarea
          value={v.bio ?? ''}
          onChange={(e) => change('bio', e.target.value)}
          className="rounded-lg bg-white/5 border border-white/10 p-2 min-h-[120px]"
        />
      </label>

      <fieldset className="grid sm:grid-cols-2 gap-3 p-3 rounded-xl border border-white/10">
        <legend className="px-2 text-sm opacity-80">Linki</legend>
        <input
          placeholder="YouTube URL"
          value={v.links?.youtube ?? ''}
          onChange={(e) => change('links', { ...v.links, youtube: e.target.value })}
          className="rounded-lg bg-white/5 border border-white/10 p-2"
        />
        <input
          placeholder="Twitch URL"
          value={v.links?.twitch ?? ''}
          onChange={(e) => change('links', { ...v.links, twitch: e.target.value })}
          className="rounded-lg bg-white/5 border border-white/10 p-2"
        />
        <input
          placeholder="Twitter/X URL"
          value={v.links?.twitter ?? ''}
          onChange={(e) => change('links', { ...v.links, twitter: e.target.value })}
          className="rounded-lg bg-white/5 border border-white/10 p-2"
        />
        <input
          placeholder="Instagram URL"
          value={v.links?.instagram ?? ''}
          onChange={(e) => change('links', { ...v.links, instagram: e.target.value })}
          className="rounded-lg bg-white/5 border border-white/10 p-2"
        />
      </fieldset>

      <fieldset className="grid sm:grid-cols-2 gap-3 p-3 rounded-xl border border-white/10">
        <legend className="px-2 text-sm opacity-80">Cel</legend>
        <input
          type="number"
          min={0}
          placeholder="Kwota docelowa (USDC)"
          value={v.goal?.target ?? 0}
          onChange={(e) =>
            change('goal', {
              ...v.goal,
              target: Number(e.target.value || 0),
              current: v.goal?.current ?? 0,
            })
          }
          className="rounded-lg bg-white/5 border border-white/10 p-2"
        />
        <input
          type="number"
          min={0}
          placeholder="Obecny postęp"
          value={v.goal?.current ?? 0}
          onChange={(e) =>
            change('goal', {
              ...v.goal,
              current: Number(e.target.value || 0),
              target: v.goal?.target ?? 0,
            })
          }
          className="rounded-lg bg-white/5 border border-white/10 p-2"
        />
      </fieldset>

      {err && <p className="text-red-300 text-sm">{err}</p>}
      <div className="flex gap-2">
        <button
          disabled={saving}
          aria-busy={saving}
          className="rounded-lg bg-[var(--color-primary)] text-black font-semibold px-4 py-2"
        >
          Zapisz profil
        </button>
        <button
          type="button"
          onClick={() => setV(initial ?? v)}
          className="rounded-lg border border-white/20 px-4 py-2"
        >
          Reset
        </button>
      </div>
    </form>
  );
}
