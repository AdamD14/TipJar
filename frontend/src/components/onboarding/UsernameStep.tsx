"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import OnboardingShell from "@/components/onboarding/OnboardingShell";
import UsernameForm from "@/components/onboarding/UsernameForm";
import { setUsername } from "@/lib/users";
import OnboardingGuard from "@/components/onboarding/OnboardingGuard";

export default function UsernameStep() {
  const router = useRouter();
  const [reserved, setReserved] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onContinue() {
    if (!reserved) return;
    setBusy(true);
    setErr(null);
    try {
      await setUsername(reserved);
      router.push("/onboarding/wallet");
    } catch (e: any) {
      setErr(e?.message || "Could not reserve username");
    } finally {
      setBusy(false);
    }
  }

  return (
    <OnboardingGuard>
      <OnboardingShell title="Welcome — pick your @handle" step={1}>
        <UsernameForm onValid={setReserved} />
        {err && <p className="mt-3 text-sm text-red-300">{err}</p>}
        <div className="mt-6 flex gap-3">
          <button
<<<<<<< HEAD
            type="button"
=======
>>>>>>> aacff4d735ea83b0bd34eefd4e7b953f32009701
            disabled={!reserved || busy}
            onClick={onContinue}
            className="rounded-xl bg-[#FFD700] px-4 py-3 font-semibold text-[#003737] disabled:opacity-60"
          >
            {busy ? "Saving…" : "Continue"}
          </button>
          <button
<<<<<<< HEAD
            type="button"
=======
>>>>>>> aacff4d735ea83b0bd34eefd4e7b953f32009701
            onClick={() => router.push("/")}
            className="rounded-xl border border-white/15 px-4 py-3 text-white/80"
          >
            Exit
          </button>
        </div>
      </OnboardingShell>
    </OnboardingGuard>
  );
}
<<<<<<< HEAD

=======
>>>>>>> aacff4d735ea83b0bd34eefd4e7b953f32009701
