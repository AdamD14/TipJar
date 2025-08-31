"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import OnboardingShell from "@/components/onboarding/OnboardingShell";
import OnboardingGuard from "@/components/onboarding/OnboardingGuard";

export default function NotificationsStep() {
  const router = useRouter();
  const [prefs, setPrefs] = useState({
    emailTips: true,
    followers: true,
    productUpdates: false,
    hideSupporters: false,
  });

  function toggle<K extends keyof typeof prefs>(k: K) {
    setPrefs((p) => ({ ...p, [k]: !p[k] }));
  }

  return (
    <OnboardingGuard>
      <OnboardingShell title="Notifications & privacy" step={4}>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Switch label="Email tips" checked={prefs.emailTips} onChange={() => toggle("emailTips")} />
            <Switch label="New followers" checked={prefs.followers} onChange={() => toggle("followers")} />
            <Switch label="Product updates" checked={prefs.productUpdates} onChange={() => toggle("productUpdates")} />
            <Switch label="Privacy: hide my supporters" checked={prefs.hideSupporters} onChange={() => toggle("hideSupporters")} />
          </div>
          <p className="mt-3 text-xs text-[#BCC1B6]">
            Ustawienia zapiszesz później w profilu — tu tylko preferencje startowe (UI).
          </p>
        </div>
        <div className="mt-6 flex gap-3">
          <button type="button" onClick={() => router.back()} className="rounded-xl border border-white/15 px-4 py-3 text-white/80">
            Back
          </button>
          <button
            type="button"
            onClick={() => router.push("/onboarding/done")}
            className="rounded-xl bg-[#FFD700] px-4 py-3 font-semibold text-[#003737]"
          >
            Finish
          </button>
        </div>
      </OnboardingShell>
    </OnboardingGuard>
  );
}

function Switch({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className={`flex w-full items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 p-4 ${
        checked ? "ring-2 ring-[#FFD700]" : ""
      }`}
    >
      <span className="text-sm text-white/90">{label}</span>
      <span aria-hidden="true" className={`relative h-5 w-10 rounded-full ${checked ? "bg-[#FFD700]" : "bg-white/20"}`}>
        <span
          className={`absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-white transition-transform ${
            checked ? "translate-x-5" : "translate-x-1"
          }`}
        />
      </span>
    </button>
  );
}

