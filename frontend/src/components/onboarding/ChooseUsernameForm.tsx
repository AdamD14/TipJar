'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from '@/lib/apiClient';
import { useOnboardingStore } from '@/lib/stores/onboardingStore';
import useHydrateAuth from '@/hooks/useHydrateAuth';
import useOnboardingGuard from '@/hooks/useOnboardingGuard';

const TEXT = { primary: '#DDE0DA', secondary: '#BCC1B6' };

export default function ChooseUsernameForm() {
  useHydrateAuth();
  useOnboardingGuard();

  const router = useRouter();
  const { drafts, user, setDraft, setUser, setStep } = useOnboardingStore();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user?.username) {
      setStep('CONSENTS');
      router.replace('/consents');
    }
  }, [router, setStep, user?.username]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await apiClient.patch('/users/me', { username: drafts.username });
      if (res?.data) setUser(res.data);
      setStep('CONSENTS');
      router.push('/consents');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Unable to set username.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="w-full max-w-lg rounded-2xl border border-[rgba(255,215,0,0.14)] bg-[rgba(0,55,55,0.78)] p-6 backdrop-blur-md">
      <h1 className="text-2xl font-semibold" style={{ color: TEXT.primary }}>
        Choose your username
      </h1>
      <p className="mt-1 text-sm" style={{ color: TEXT.secondary }}>
        This will be your public profile URL.
      </p>

      <form onSubmit={onSubmit} className="mt-4">
        <label className="block text-sm" style={{ color: TEXT.primary }}>
          Username
          <input
            type="text"
            autoComplete="username"
            value={drafts.username ?? ''}
            onChange={(e) => setDraft({ username: e.target.value.trim() })}
            required
            minLength={3}
            className="mt-1 w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-[#DDE0DA] placeholder-[#8FA19A] outline-none focus-visible:ring-2 focus-visible:ring-[rgba(255,215,0,0.70)]"
            placeholder="your-handle"
          />
        </label>

        {error && (
          <p role="alert" className="mt-2 text-xs text-[#FFD700]">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={busy}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#FFD700] px-5 py-2.5 text-sm font-semibold text-[#0B0F12] shadow-[0_6px_16px_rgba(255,215,0,0.18)] transition hover:bg-[#E6C200] active:bg-[#C9A500] disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(255,215,0,0.70)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#003737]"
          aria-busy={busy || undefined}
          aria-label="Save username"
        >
          {busy && <span aria-hidden className="h-4 w-4 animate-spin rounded-full border-2 border-[#0B0F12] border-t-transparent" />}
          <span>Continue</span>
        </button>
      </form>
    </section>
  );
}

