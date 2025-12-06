'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { normalize } from '@/lib/api/errors';
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
  const { drafts, user, setDraft, setUser, setStep, setRole } = useOnboardingStore();

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [available, setAvailable] = useState<boolean | null>(null);
  const [checking, setChecking] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // Zgody
  const [allRequired, setAllRequired] = useState(false);
  const [marketing, setMarketing] = useState(false);

  // Sprawdź stan użytkownika przy mount (po OAuth redirect)
  useEffect(() => {
    (async () => {
      try {
        const meRes = await api<MeResponse>(`/api/v1/auth/me`);
        if (meRes) {
          const normalizedRole = meRes.role === 'CREATOR' ? 'CREATOR' : 'FAN';
          setRole(normalizedRole);
          setUser(meRes);

          // Jeśli już ma username i completed onboarding -> dashboard
          if (meRes.username && meRes.hasCompletedOnboarding) {
            router.replace(
              normalizedRole === 'CREATOR' ? '/creator/dashboard' : '/fan/dashboard'
            );
            return;
          } else if (meRes.username) {
             // Ma username ale nie ukonczyl onboarding
             router.replace(
               normalizedRole === 'CREATOR' ? '/onboarding/creator/step-1' : '/onboarding/fan/step-1'
             );
             return;
          }

// ... (in cleanup skip)

    // Redirect wg roli
    const role = (meRes?.role === 'CREATOR' ? 'CREATOR' : 'FAN') as 'CREATOR' | 'FAN';
    router.replace(role === 'CREATOR' ? '/onboarding/creator/step-1' : '/onboarding/fan/step-1');
        }
      } catch {
        // User nie zalogowany lub błąd - pokaż formularz
      } finally {
        setInitialLoading(false);
      }
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Jeśli onboarding już skończony → dashboard
  useEffect(() => {
    if (!initialLoading && user?.hasCompletedOnboarding && user?.username) {
      const role = user.role === 'CREATOR' ? 'CREATOR' : 'FAN';
      router.replace(role === 'CREATOR' ? '/creator/dashboard' : '/fan/dashboard');
    }
  }, [router, user?.hasCompletedOnboarding, user?.username, user?.role, initialLoading]);

  // Debounced check dostępności username
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

    const handle = setTimeout(() => {
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
      clearTimeout(handle);
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
    if (available !== true) {
      setBusy(false);
      setError('Username must be available.');
      return;
    }
    if (!allRequired) {
      setBusy(false);
      setError('You must accept Terms, Privacy Policy and confirm age.');
      return;
    }

    try {
      // Jeden request z username + consents
      await api<unknown>(`/api/v1/users/set-username`, {
        method: 'POST',
        body: JSON.stringify({
          username,
          consents: {
            terms: true,
            privacy: true,
            age: true,
            marketing,
          },
        }),
      });

      // Odśwież profil
      const meRes = await api<MeResponse>(`/api/v1/auth/me`);
      setUser(meRes || null);
      setStep('COMPLETED');

      // Redirect wg roli
      const role = (meRes?.role === 'CREATOR' ? 'CREATOR' : 'FAN') as 'CREATOR' | 'FAN';
      router.replace(role === 'CREATOR' ? '/onboarding/creator/step-1' : '/onboarding/fan/step-1');
    } catch (err: unknown) {
      const { msg } = normalize(err);
      setError(msg || 'Unable to save data.');
    } finally {
      setBusy(false);
    }
  };

  // Loading state przy sprawdzaniu initial
  if (initialLoading) {
    return (
      <section className="w-full max-w-md bg-teal-900/20 backdrop-blur-md border border-teal-400/20 rounded-2xl shadow-2xl p-8">
        <div className="flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-teal-400 border-t-transparent rounded-full animate-spin" />
        </div>
      </section>
    );
  }

  return (
    <section className="w-full max-w-md bg-teal-900/20 backdrop-blur-md border border-teal-400/20 rounded-2xl shadow-2xl p-2">
      <div className="flex justify-center mb-6">
        <div className="bg-gradient-to-r from-teal-500 to-purple-500 text-white px-4 py-2 rounded-xl font-bold text-xl shadow-lg flex items-center gap-3">
          <Image
            src="/logo.png"
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

          <div className="mt-2 text-xs">
            {checking && <span style={{ color: TEXT.secondary }}>Checking…</span>}
            {!checking && available === true && <span className="text-emerald-300">Available ✓</span>}
            {!checking && available === false && <span className="text-amber-300">Taken</span>}
          </div>
        </div>

        {/* Zgody */}
        <div className="space-y-2 pt-2">
          <label className="flex items-start gap-3 text-sm">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 rounded border-white/20 bg-white/5 outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
              checked={allRequired}
              onChange={(e) => setAllRequired(e.target.checked)}
              required
            />
            <span className="text-[#DDE0DA]">
              I am at least 16 years old and accept the <span className="underline">Terms of Service</span> and <span className="underline">Privacy Policy</span>
            </span>
          </label>

          <label className="flex items-start gap-3 text-sm">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 rounded border-white/20 bg-white/5 outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
              checked={marketing}
              onChange={(e) => setMarketing(e.target.checked)}
            />
            <span className="text-[#DDE0DA]">
              Send me product updates and creator highlights (optional)
            </span>
          </label>
        </div>

        {error && (
          <p role="alert" className="mt-1 text-xs text-[#FFD700]">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={busy || available !== true || !allRequired}
          className="w-full bg-gradient-to-r from-teal-500 to-purple-500 text-white font-bold py-3 rounded-lg hover:from-teal-600 hover:to-purple-600 hover:scale-[1.02] transform transition-all duration-200 disabled:opacity-60 disabled:pointer-events-none shadow-lg"
        >
          {busy ? 'Processing…' : 'Continue'}
        </button>
      </form>
    </section>
  );
}