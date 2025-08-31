"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import OnboardingGuard from "@/components/onboarding/OnboardingGuard";
import OnboardingShell from "@/components/onboarding/OnboardingShell";
import { setUsernameAndConsents } from "@/lib/users";
import { me } from "@/lib/auth";

type Consents = {
  terms: boolean;
  privacy: boolean;
  age: boolean;
  marketing?: boolean;
};

export default function ConsentsPage() {
  const router = useRouter();
  const sp = useSearchParams();
  const username = useMemo(() => (sp.get("u") || "").trim().toLowerCase(), [sp]);
  const [consents, setConsents] = useState<Consents>({ terms: false, privacy: false, age: false, marketing: false });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!username) {
      router.replace("/onboarding/username");
    }
  }, [username, router]);

  async function onAccept() {
    if (!username) return;
    setBusy(true);
    setErr(null);
    try {
      await setUsernameAndConsents(username, consents);
      // Ustal trasę zależnie od roli
      const u = await me().catch(() => null);
      const role = (u?.role as string) || '';
      if (role === 'FAN') router.replace('/fan/dashboard');
      else router.replace('/dashboard');
    } catch (e: any) {
      setErr(e?.message || "Could not save consents");
    } finally {
      setBusy(false);
    }
  }

  const allRequiredChecked = consents.terms && consents.privacy && consents.age;

  return (
    <OnboardingGuard>
      <OnboardingShell title="Accept terms and consents" step={2}>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm text-[#DDE0DA]">Username: <strong>@{username}</strong></p>
          <div className="mt-4 space-y-3 text-[#DDE0DA]">
            <label className="flex items-center gap-3">
              <input type="checkbox" className="h-4 w-4 accent-[#FFD700]" checked={consents.terms} onChange={(e) => setConsents((c) => ({ ...c, terms: e.target.checked }))} />
              <span>I accept the Terms of Service</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" className="h-4 w-4 accent-[#FFD700]" checked={consents.privacy} onChange={(e) => setConsents((c) => ({ ...c, privacy: e.target.checked }))} />
              <span>I accept the Privacy Policy</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" className="h-4 w-4 accent-[#FFD700]" checked={consents.age} onChange={(e) => setConsents((c) => ({ ...c, age: e.target.checked }))} />
              <span>I confirm I am at least 16 years old</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" className="h-4 w-4 accent-[#FFD700]" checked={!!consents.marketing} onChange={(e) => setConsents((c) => ({ ...c, marketing: e.target.checked }))} />
              <span>Send me product updates (optional)</span>
            </label>
          </div>
          {err && <p className="mt-3 text-sm text-red-300">{err}</p>}
          <div className="mt-6 flex gap-3">
            <button
              type="button"
              disabled={!allRequiredChecked || busy}
              onClick={onAccept}
              className="rounded-xl bg-[#FFD700] px-4 py-3 font-semibold text-[#003737] disabled:opacity-60"
            >
              {busy ? "Saving…" : "Continue to dashboard"}
            </button>
            <button
              type="button"
              onClick={() => router.push("/onboarding/username")}
              className="rounded-xl border border-white/15 px-4 py-3 text-white/80"
            >
              Back
            </button>
          </div>
        </div>
      </OnboardingShell>
    </OnboardingGuard>
  );
}
