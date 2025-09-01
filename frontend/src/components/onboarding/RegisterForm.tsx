'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from '@/lib/apiClient';
import { useOnboardingStore } from '@/lib/stores/onboardingStore';
import useHydrateAuth from '@/hooks/useHydrateAuth';

const TEXT = { primary: '#DDE0DA', secondary: '#BCC1B6' };
const BRAND = { dark: '#003737', gold: '#FFD700', purple: '#4D194D' };

export default function RegisterForm() {
  useHydrateAuth();
  const router = useRouter();
  const { role, drafts, setRole, setDraft, setUser, setTokens, setStep } = useOnboardingStore();
  const [busy, setBusy] = useState<'email' | 'google' | 'twitch' | null>(null);
  const [error, setError] = useState<string | null>(null);

  const apiBase = useMemo(
    () => process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001/api',
    [],
  );

  // jeśli użytkownik wrócił już zalogowany (np. po OAuth), przejdź dalej
  useEffect(() => {
    const u = useOnboardingStore.getState().user;
    if (u && !u.hasCompletedOnboarding) {
      setStep('CHOOSE_USERNAME');
      router.replace('/choose-username');
    }
  }, [router, setStep]);

  const submitEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy('email');
    setError(null);
    try {
      const res = await apiClient.post('/auth/register', {
        email: drafts.email,
        password: drafts.password,
        role,
      });
      const { user, accessToken } = res.data ?? {};
      setTokens({ accessToken: accessToken ?? null });
      setUser(user ?? null);
      setStep('CHOOSE_USERNAME');
      router.push('/choose-username');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Registration failed.');
    } finally {
      setBusy(null);
    }
  };

  const startOAuth = (provider: 'google' | 'twitch') => {
    setBusy(provider);
    setError(null);
    // Backend powinien po OAuth zrobić redirect na /choose-username
    window.location.href = `${apiBase}/auth/${provider}?state=${role}`;
  };

  return (
    <section className="w-full max-w-lg rounded-2xl border border-[rgba(255,215,0,0.14)] bg-[rgba(0,55,55,0.78)] p-6 shadow-[0_8px_24px_rgba(0,0,0,0.25)] backdrop-blur-md">
      <h1 className="text-2xl font-semibold" style={{ color: TEXT.primary }}>
        Create your account
      </h1>
      <p className="mt-1 text-sm" style={{ color: TEXT.secondary }}>
        Choose your role and sign up using email or OAuth.
      </p>

      {/* Role switch (on one screen) */}
      <div className="mt-4 grid grid-cols-2 gap-2" role="group" aria-label="Choose role">
        <button
          type="button"
          onClick={() => setRole('CREATOR')}
          className={`rounded-lg px-3 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(255,215,0,0.70)] ${role === 'CREATOR' ? 'bg-[#FFD700] text-[#0B0F12]' : 'bg-white/5 text-[#DDE0DA] hover:bg-white/10'} `}
          aria-pressed={role === 'CREATOR'}
        >
          Register as a Creator
        </button>
        <button
          type="button"
          onClick={() => setRole('FAN')}
          className={`rounded-lg px-3 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(255,215,0,0.70)] ${role === 'FAN' ? 'bg-[#FFD700] text-[#0B0F12]' : 'bg-white/5 text-[#DDE0DA] hover:bg-white/10'} `}
          aria-pressed={role === 'FAN'}
        >
          Register as a Fan
        </button>
      </div>

      {/* OAuth */}
      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => startOAuth('google')}
          disabled={!!busy}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-[#DDE0DA] hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(255,215,0,0.70)] disabled:opacity-60"
          aria-busy={busy === 'google' || undefined}
          aria-label="Continue with Google"
        >
          {busy === 'google' && <span aria-hidden className="h-4 w-4 animate-spin rounded-full border-2 border-[#FFD700] border-t-transparent" />}
          <span>Continue with Google</span>
        </button>
        <button
          type="button"
          onClick={() => startOAuth('twitch')}
          disabled={!!busy}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-[#DDE0DA] hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(255,215,0,0.70)] disabled:opacity-60"
          aria-busy={busy === 'twitch' || undefined}
          aria-label="Continue with Twitch"
        >
          {busy === 'twitch' && <span aria-hidden className="h-4 w-4 animate-spin rounded-full border-2 border-[#FFD700] border-t-transparent" />}
          <span>Continue with Twitch</span>
        </button>
      </div>

      {/* Divider */}
      <div className="my-5 flex items-center gap-3 text-xs" style={{ color: TEXT.secondary }}>
        <div className="h-px flex-1 bg-white/10" aria-hidden />
        <span>or</span>
        <div className="h-px flex-1 bg-white/10" aria-hidden />
      </div>

      {/* Email form */}
      <form onSubmit={submitEmail} noValidate aria-label="Register with email">
        <label className="block text-sm" style={{ color: TEXT.primary }}>
          Email
          <input
            type="email"
            autoComplete="email"
            value={drafts.email ?? ''}
            onChange={(e) => setDraft({ email: e.target.value })}
            required
            className="mt-1 w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-[#DDE0DA] placeholder-[#8FA19A] outline-none focus-visible:ring-2 focus-visible:ring-[rgba(255,215,0,0.70)]"
            placeholder="you@example.com"
          />
        </label>

        <label className="mt-3 block text-sm" style={{ color: TEXT.primary }}>
          Password
          <input
            type="password"
            autoComplete="new-password"
            value={drafts.password ?? ''}
            onChange={(e) => setDraft({ password: e.target.value })}
            required
            className="mt-1 w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-[#DDE0DA] placeholder-[#8FA19A] outline-none focus-visible:ring-2 focus-visible:ring-[rgba(255,215,0,0.70)]"
            placeholder="••••••••"
            minLength={8}
          />
        </label>

        {error && (
          <p role="alert" className="mt-2 text-xs" style={{ color: BRAND.gold }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={!!busy}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#FFD700] px-5 py-2.5 text-sm font-semibold text-[#0B0F12] shadow-[0_6px_16px_rgba(255,215,0,0.18)] transition hover:bg-[#E6C200] active:bg-[#C9A500] disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(255,215,0,0.70)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#003737]"
          aria-busy={busy === 'email' || undefined}
          aria-label="Create account with email"
        >
          {busy === 'email' && <span aria-hidden className="h-4 w-4 animate-spin rounded-full border-2 border-[#0B0F12] border-t-transparent" />}
          <span>Create account</span>
        </button>
      </form>

      <p className="mt-3 text-[11px] leading-snug" style={{ color: '#8FA19A' }}>
        By signing up you agree to our Terms and Privacy Policy.
      </p>
    </section>
  );
}

