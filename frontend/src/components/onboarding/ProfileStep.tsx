"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import OnboardingShell from "@/components/onboarding/OnboardingShell";
import ProfileForm from "@/components/onboarding/ProfileForm";
import OnboardingGuard from "@/components/onboarding/OnboardingGuard";

export default function ProfileStep() {
  const router = useRouter();
  const [form, setForm] = useState<
    { displayName: string; language: string; bio: string } | null
  >(null);
  const valid =
    !!form &&
    (form.displayName?.trim() ?? "").length > 0 &&
    (form.displayName?.trim() ?? "").length <= 60 &&
    (form.bio?.trim() ?? "").length > 0 &&
    (form.bio?.trim() ?? "").length <= 280;

  return (
    <OnboardingGuard>
      <OnboardingShell title="Complete your profile" step={3}>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <ProfileForm onChange={setForm} />
        </div>
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => router.back()}
            className="rounded-xl border border-white/15 px-4 py-3 text-white/80"
          >
            Back
          </button>
          <button
            disabled={!valid}
            onClick={() => router.push("/onboarding/notifications")}
            className="rounded-xl bg-[#FFD700] px-4 py-3 font-semibold text-[#003737] disabled:opacity-60"
            aria-disabled={!valid}
          >
            Continue
          </button>
        </div>
      </OnboardingShell>
    </OnboardingGuard>
  );
}
