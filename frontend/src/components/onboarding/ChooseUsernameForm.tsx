// /src/components/onboarding/ChooseUsernameForm.tsx
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { useOnboardingStore } from '@/lib/stores/onboardingStore';

type MeResponse = {
  id: string;
  email?: string | null;
  role?: 'FAN' | 'CREATOR' | null;
  username?: string | null;
  hasCompletedOnboarding?: boolean;
};

const TEXT = { primary: '#DDE0DA', secondary: '#BCC1B6' };

export default function ChooseUsernameForm() {
  const router = useRouter();
  const { drafts, user, role, setDraft, setUser } = useOnboardingStore();

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [available, setAvailable] = useState<boolean | null>(null);
  const [checking, setChecking] = useState(false);
  const [acceptAll, setAcceptAll] = useState(false);

  // jeśli user ma już username — wyślij wg roli na dashboard
  useEffect(() => {
    if (user?.username) {
      const r = (user.role ?? role) === 'FAN' ? '/fan/dashboard' : '/creator/dashboard';
      router.replace(r);
    }
  }, [router, role, user?.role, user?.username]);

  // debounced live-check dostępności (?username=) + walidacja
  useEffect(() => {
    const name = (drafts.username || '').trim().toLowerCase();

    setError(null);
    setAvailable(null);
    if (!name) return;

    if (!/^[a-z0-9._-]{3,24}$/i.test(name)) {
      setError('Use 3–24 chars: a–z, 0–9, dot, underscore or hyphen.');
      return;
    }

    setChecking(true);
    let alive = true;

    const handler = setTimeout(() => {
      (async () => {
        try {
          const res = await api<{ available: boolean }>(
            `/api/v1/users/username-check?username=${encodeURIComponent(name)}`
          );
          if (!alive) return;
          setAvailable(!!res.available);
        } catch {
          if (!alive) return;
          setAvailable(null);
          setError('Check failed, try again.');
        } finally {
          if (alive) setChecking(false);
        }
      })();
    }, 500);

    return () => {
      alive = false;
      clearTimeout(handler);
    };
  }, [drafts.username]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError(null);

    const username = (drafts.username || '').trim().toLowerCase();
    if (!username) {
      setBusy(false);
      setError('Username is required.');
      return;
    }
    if (!acceptAll) {
      setBusy(false);
      setError('Please accept the terms.');
      return;
    }
    if (available !== true) {
      setBusy(false);
      setError('Username is not available.');
      return;
    }

    try {
      // ZGODNIE Z WYMAGANIAMI BACKENDU: consents = { terms, privacy, age }
      await api<unknown>(`/api/v1/users/set-username`, {
        method: 'POST',
        body: JSON.stringify({
          username,
          consents: {
            terms: true,
            privacy: true,
            age: true,
          },
        }),
      });

      // odśwież profil
      const meRes = await api<MeResponse>(`/api/v1/auth/me`);
      setUser(meRes || null);

      // przekierowanie wg roli
      const finalRole = (meRes?.role ?? role) === 'FAN' ? 'FAN' : 'CREATOR';
      router.push(finalRole === 'FAN' ? '/fan/dashboard' : '/creator/dashboard');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unable to set username.';
      setError(msg);
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="w-full max-w-md bg-teal-900/20 backdrop-blur-md border border-teal-400/20 rounded-2xl shadow-2xl p-2">
      {/* header jak w AuthForm */}
      <div className="flex justify-center mb-6">
        <div className="bg-gradient-to-r from-teal-500 to-purple-500 text-white px-4 py-2 rounded-xl font-bold text-xl shadow-lg flex items-center gap-3">
          <Image
            src="/logo.png" // public/logo.png
            alt="TipJar+ icon"
            width={48}
            height={48}
            className="h-12 w-auto"
            draggable={false}
          />
          tipjar.plus
        </div>
      </div>

      <form className="space-y-3" onSubmit={onSubmit}>
        <div>
          <label htmlFor="username" className="block text-white text-sm mb-2 font-medium">
            Choose your username
          </label>
          <div className="flex items-center gap-2">
            <span className="text-[#8FA19A]">tipjar.plus/@</span>
            <input
              id="username"
              type="text"
              autoComplete="username"
              value={drafts.username ?? ''}
              onChange={(e) => setDraft({ username: e.target.value.trim() })}
              required
              minLength={3}
              maxLength={24}
              className="flex-1 bg-slate-900/60 border border-teal-400/40 rounded-lg px-3 py-2 text-white placeholder-gray-300 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition-all"
              placeholder="your-handle"
              disabled={busy}
            />
          </div>

          {/* status dostępności */}
          <div className="mt-2 text-xs">
            {checking && <span style={{ color: TEXT.secondary }}>Checking…</span>}
            {!checking && available === true && <span className="text-emerald-300">Available ✓</span>}
            {!checking && available === false && <span className="text-amber-300">Taken</span>}
          </div>
        </div>

        {/* pojedynczy checkbox – wymagana akceptacja (consents) */}
        <label className="mt-1 flex items-start gap-3 text-sm text-[#DDE0DA]">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 rounded border-white/20 bg-white/5 outline-none focus-visible:ring-2 focus-visible:ring-[rgba(255,215,0,0.70)]"
            checked={acceptAll}
            onChange={(e) => setAcceptAll(e.target.checked)}
            required
          />
          <span>I am at least 16 years old and accept the Terms & Privacy Policy.</span>
        </label>

        {error && (
          <p role="alert" className="text-xs text-[#FFD700]">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={busy || available !== true || !acceptAll}
          className="w-full bg-gradient-to-r from-teal-500 to-purple-500 text-white font-bold py-3 rounded-lg hover:from-teal-600 hover:to-purple-600 hover:scale-[1.02] transform transition-all duration-200 disabled:opacity-60 disabled:pointer-events-none shadow-lg"
        >
          {busy ? 'Processing…' : 'Continue'}
        </button>
      </form>
    </section>
  );
}
