'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from '@/lib/apiClient';
import { useOnboardingStore } from '@/lib/stores/onboardingStore';
import useHydrateAuth from '@/hooks/useHydrateAuth';
import useOnboardingGuard from '@/hooks/useOnboardingGuard';

const TEXT = { primary: '#DDE0DA', secondary: '#BCC1B6' };

export default function ConsentsForm() {
  useHydrateAuth();
  useOnboardingGuard();

  const router = useRouter();
  const { role, drafts, setDraft, setUser, setStep, user } = useOnboardingStore();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user?.hasCompletedOnboarding) {
      // jeśli już po – puść do odpowiedniego dashboardu
      router.replace(role === 'CREATOR' ? '/dashboard/creator' : '/dashboard/fan');
    }
  }, [role, router, user?.hasCompletedOnboarding]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await apiClient.patch('/users/me', {
        consents: drafts.consents,
        hasCompletedOnboarding: true,
      });
      if (res?.data) setUser(res.data);
      setStep('COMPLETED');
      router.push(role === 'CREATOR' ? '/dashboard/creator' : '/dashboard/fan');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Unable to save consents.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="w-full max-w-lg rounded-2xl border border-[rgba(255,215,0,0.14)] bg-[rgba(0,55,55,0.78)] p-6 backdrop-blur-md">
      <h1 className="text-2xl font-semibold" style={{ color: TEXT.primary }}>
        Final step: your consents
      </h1>
      <p className="mt-1 text-sm" style={{ color: TEXT.secondary }}>
        You can change these at any time in Settings.
      </p>

      <form onSubmit={onSubmit} className="mt-4 space-y-4">
        <label className="flex items-start gap-3 text-sm" style={{ color: TEXT.primary }}>
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 rounded border-white/20 bg-white/5 outline-none focus-visible:ring-2 focus-visible:ring-[rgba(255,215,0,0.70)]"
            checked={!!drafts.consents?.termsAccepted}
            onChange={(e) =>
              setDraft({ consents: { ...(drafts.consents || { marketing: false }), termsAccepted: e.target.checked } })
            }
            required
          />
          <span>I am at least 18 years old and accept the Terms & Privacy Policy.</span>
        </label>

        <label className="flex items-start gap-3 text-sm" style={{ color: TEXT.primary }}>
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 rounded border-white/20 bg-white/5 outline-none focus-visible:ring-2 focus-visible:ring-[rgba(255,215,0,0.70)]"
            checked={!!drafts.consents?.marketing}
            onChange={(e) =>
              setDraft({ consents: { ...(drafts.consents || { termsAccepted: false }), marketing: e.target.checked } })
            }
          />
          <span>Send me product updates and creator highlights (optional).</span>
        </label>

        {error && (
          <p role="alert" className="text-xs text-[#FFD700]">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={busy || !drafts.consents?.termsAccepted}
          className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#FFD700] px-5 py-2.5 text-sm font-semibold text-[#0B0F12] shadow-[0_6px_16px_rgba(255,215,0,0.18)] transition hover:bg-[#E6C200] active:bg-[#C9A500] disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(255,215,0,0.70)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#003737]"
          aria-busy={busy || undefined}
          aria-label="Finish onboarding"
        >
          {busy && <span aria-hidden className="h-4 w-4 animate-spin rounded-full border-2 border-[#0B0F12] border-t-transparent" />}
          <span>Finish</span>
        </button>
      </form>
    </section>
  );
}

