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

export default function ConsentsForm() {
  const router = useRouter();
  const { role, drafts, setDraft, setUser, setStep, user } = useOnboardingStore();

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Jeśli user już wszystko skończył — przekaż dalej
  useEffect(() => {
    if (user?.hasCompletedOnboarding) {
      router.replace(role === 'CREATOR' ? '/creator/dashboard' : '/fan/dashboard');
    }
  }, [role, router, user?.hasCompletedOnboarding]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError(null);

    try {
      // 1) ZAWSZE budujemy obiekt consents o właściwym kształcie
      const payloadConsents = {
        termsAccepted: !!drafts.consents?.termsAccepted,
        marketing: !!drafts.consents?.marketing,
      };

      // 2) PATCH /users/me — zawsze JSON.stringify (fetch wrapper "api" nie serializuje automatycznie)
      await api(`/api/v1/users/me`, {
        method: 'PATCH',
        body: JSON.stringify({
          consents: payloadConsents,
          hasCompletedOnboarding: true,
        }),
      });

      // 3) Odśwież profil
      const meRes = await api<MeResponse>(`/api/v1/auth/me`);
      setUser(meRes || null);

      // 4) Ustaw krok i przekieruj po roli
      setStep('COMPLETED');
      router.push(role === 'CREATOR' ? '/creator/dashboard' : '/fan/dashboard');
    } catch (err: any) {
      // Typowy komunikat z backendu: "consents must be an object"
      const msg =
        err?.message ||
        err?.response?.data?.message ||
        'Unable to save consents.';
      setError(msg);
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="w-full max-w-md bg-teal-900/20 backdrop-blur-md border border-teal-400/20 rounded-2xl shadow-2xl p-2">
      {/* Header jak w AuthForm / ChooseUsernameForm */}
      <div className="flex justify-center mb-6">
        <div className="bg-gradient-to-r from-teal-500 to-purple-500 text-white px-4 py-2 rounded-xl font-bold text-xl shadow-lg flex items-center gap-3">
          <Image
            src="/logo.png"         /* public/logo.png */
            alt="TipJar+ icon"
            width={48}
            height={48}
            className="h-12 w-auto"
            draggable={false}
          />
          tipjar.plus
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <h1 className="text-white text-lg font-semibold">Final step: your consents</h1>
        <p className="text-white/70 text-sm">
          You can change these at any time in Settings.
        </p>

        <label className="flex items-start gap-3 text-sm text-white">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 rounded border-white/20 bg-white/5 outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
            checked={!!drafts.consents?.termsAccepted}
            onChange={(e) =>
              setDraft({
                consents: {
                  ...(drafts.consents || { marketing: false }),
                  termsAccepted: e.target.checked,
                },
              })
            }
            required
          />
          <span>
            I am at least 18 years old and accept the Terms & Privacy Policy.
          </span>
        </label>

        <label className="flex items-start gap-3 text-sm text-white">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 rounded border-white/20 bg-white/5 outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
            checked={!!drafts.consents?.marketing}
            onChange={(e) =>
              setDraft({
                consents: {
                  ...(drafts.consents || { termsAccepted: false }),
                  marketing: e.target.checked,
                },
              })
            }
          />
          <span>Send me product updates and creator highlights (optional).</span>
        </label>

        {error && (
          <div className="text-[#FFD700] text-xs bg-white/5 border border-white/10 rounded-lg p-3">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={busy || !drafts.consents?.termsAccepted}
          className="w-full bg-gradient-to-r from-teal-500 to-purple-500 text-white font-bold py-3 rounded-lg hover:from-teal-600 hover:to-purple-600 hover:scale-[1.02] transform transition-all duration-200 disabled:opacity-60 disabled:pointer-events-none shadow-lg"
        >
          {busy ? 'Saving…' : 'Finish'}
        </button>
      </form>
    </section>
  );
}
