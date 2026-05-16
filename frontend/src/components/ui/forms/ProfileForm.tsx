"use client";
import { useState, useMemo, useEffect, useRef } from 'react';
import type { CreatorProfile } from '@/lib/api/contracts';
import Field from '@/components/ui/forms/Field';
import Input from '@/components/ui/forms/Input';
import Textarea from '@/components/ui/forms/Textarea';
import FormError from '@/components/ui/forms/FormError';
import Button from '@/components/ui/buttons/Button';

export type ProfileFormProps = {
  initial?: CreatorProfile;
  onSubmit: (v: CreatorProfile) => Promise<void> | void;
  onUpload?: (f: File) => Promise<string>;
};

function isFetchError(e: unknown): e is { message?: string } {
  return typeof e === 'object' && e !== null && 'message' in e;
}

export default function ProfileForm({ initial, onSubmit, onUpload }: ProfileFormProps) {
  const [v, setV] = useState<CreatorProfile>(initial ?? { id: '', name: '', alias: '' });
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [fileAvatar, setFileAvatar] = useState<File | null>(null);
  const [fileBanner, setFileBanner] = useState<File | null>(null);

  const avatarUrlRef = useRef<string | null>(null);
  const bannerUrlRef = useRef<string | null>(null);

  const avatarPreview = useMemo(() => {
    if (fileAvatar) {
      if (avatarUrlRef.current) URL.revokeObjectURL(avatarUrlRef.current);
      const url = URL.createObjectURL(fileAvatar);
      avatarUrlRef.current = url;
      return url;
    }
    avatarUrlRef.current = null;
    return v.avatarUrl;
  }, [fileAvatar, v.avatarUrl]);

  const bannerPreview = useMemo(() => {
    if (fileBanner) {
      if (bannerUrlRef.current) URL.revokeObjectURL(bannerUrlRef.current);
      const url = URL.createObjectURL(fileBanner);
      bannerUrlRef.current = url;
      return url;
    }
    bannerUrlRef.current = null;
    return v.bannerUrl;
  }, [fileBanner, v.bannerUrl]);

  useEffect(() => {
    return () => {
      if (avatarUrlRef.current) URL.revokeObjectURL(avatarUrlRef.current);
      if (bannerUrlRef.current) URL.revokeObjectURL(bannerUrlRef.current);
    };
  }, []);

  function change<K extends keyof CreatorProfile>(k: K, val: CreatorProfile[K]) {
    setV((s) => ({ ...s, [k]: val }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    if (!v.name?.trim()) return setErr('Name is required.');
    if (!v.alias?.trim()) return setErr('Alias is required.');
    setSaving(true);
    try {
      const payload = { ...v };
      if (fileAvatar && onUpload) payload.avatarUrl = await onUpload(fileAvatar);
      if (fileBanner && onUpload) payload.bannerUrl = await onUpload(fileBanner);
      await onSubmit(payload as CreatorProfile);
    } catch (e: unknown) {
      setErr(isFetchError(e) ? e.message || 'Failed to save profile.' : 'Failed to save profile.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={submit} className="grid gap-4">
      <Field label="Banner">
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
          className="mt-2 text-sm text-text-ds-tertiary file:mr-2 file:rounded-lg file:border-0 file:bg-surface-elevated file:px-3 file:py-1 file:text-sm file:text-text-ds-secondary file:cursor-pointer"
          onChange={(e) => setFileBanner(e.currentTarget.files?.[0] ?? null)}
        />
      </Field>

      <div className="grid sm:grid-cols-[96px_1fr] gap-4 items-start">
        <Field label="Avatar">
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
            className="mt-2 text-sm text-text-ds-tertiary file:mr-2 file:rounded-lg file:border-0 file:bg-surface-elevated file:px-3 file:py-1 file:text-sm file:text-text-ds-secondary file:cursor-pointer"
            onChange={(e) => setFileAvatar(e.currentTarget.files?.[0] ?? null)}
          />
        </Field>
        <div className="grid gap-3">
          <Field label="Name">
            <Input
              required
              value={v.name}
              onChange={(e) => change('name', e.target.value)}
            />
          </Field>
          <Field label="Alias">
            <Input
              required
              value={v.alias}
              onChange={(e) => change('alias', e.target.value)}
            />
          </Field>
        </div>
      </div>

      <Field label="Bio">
        <Textarea
          value={v.bio ?? ''}
          onChange={(e) => change('bio', e.target.value)}
          rows={4}
        />
      </Field>

      <fieldset className="grid sm:grid-cols-2 gap-3 p-3 rounded-xl border border-white/10">
        <legend className="px-2 text-sm text-text-ds-secondary font-body">Links</legend>
        <Input
          placeholder="YouTube URL"
          value={v.links?.youtube ?? ''}
          onChange={(e) => change('links', { ...v.links, youtube: e.target.value })}
        />
        <Input
          placeholder="Twitch URL"
          value={v.links?.twitch ?? ''}
          onChange={(e) => change('links', { ...v.links, twitch: e.target.value })}
        />
        <Input
          placeholder="Twitter/X URL"
          value={v.links?.twitter ?? ''}
          onChange={(e) => change('links', { ...v.links, twitter: e.target.value })}
        />
        <Input
          placeholder="Instagram URL"
          value={v.links?.instagram ?? ''}
          onChange={(e) => change('links', { ...v.links, instagram: e.target.value })}
        />
      </fieldset>

      <fieldset className="grid sm:grid-cols-2 gap-3 p-3 rounded-xl border border-white/10">
        <legend className="px-2 text-sm text-text-ds-secondary font-body">Goal</legend>
        <Input
          type="number"
          min={0}
          placeholder="Target amount (USDC)"
          value={v.goal?.target ?? 0}
          onChange={(e) =>
            change('goal', {
              ...v.goal,
              target: Number(e.target.value || 0),
              current: v.goal?.current ?? 0,
            })
          }
        />
        <Input
          type="number"
          min={0}
          placeholder="Current progress"
          value={v.goal?.current ?? 0}
          onChange={(e) =>
            change('goal', {
              ...v.goal,
              current: Number(e.target.value || 0),
              target: v.goal?.target ?? 0,
            })
          }
        />
      </fieldset>

      {err && <FormError message={err} />}
      <div className="flex gap-2">
        <Button type="submit" loading={saving}>
          Save profile
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={() => setV(initial ?? v)}
        >
          Reset
        </Button>
      </div>
    </form>
  );
}
