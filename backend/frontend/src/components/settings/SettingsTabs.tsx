"use client";

import { useState } from "react";

const TABS = ["Profile", "Security", "Preferences", "Payouts"] as const;

type Tab = typeof TABS[number];

export default function SettingsTabs() {
  const [tab, setTab] = useState<Tab>("Profile");

  return (
    <div className="rounded-2xl bg-white/5 p-6 text-[#DDE0DA]">
      <div className="mb-6 flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={[
              "rounded-xl px-4 py-2 text-sm font-semibold",
              tab === t ? "bg-[#FFD700] text-[#003737]" : "bg-[#003737] text-[#DDE0DA] border border-[#FFD700]/40",
            ].join(" ")}
            aria-pressed={tab === t}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Profile" && <ProfileForm />}
      {tab === "Security" && <SecurityForm />}
      {tab === "Preferences" && <PreferencesForm />}
      {tab === "Payouts" && <PayoutsForm />}
    </div>
  );
}

function ProfileForm() {
  return (
    <form className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <label className="block">
        <span className="mb-1 block text-sm">Display name</span>
        <input className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFD700]" placeholder="Your name" />
      </label>
      <label className="block">
        <span className="mb-1 block text-sm">Handle</span>
        <input className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFD700]" placeholder="@handle" />
      </label>
      <label className="md:col-span-2 block">
        <span className="mb-1 block text-sm">Bio</span>
        <textarea className="min-h-[120px] w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFD700]" placeholder="Tell fans about you..." />
      </label>
      <div className="md:col-span-2">
        <button className="rounded-xl bg-gradient-to-r from-[#002828] to-[#007474] px-5 py-3 font-semibold text-white">Save</button>
      </div>
    </form>
  );
}

function SecurityForm() {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
        <h4 className="font-semibold text-white">Password</h4>
        <p className="text-sm text-white/70">Change your account password.</p>
        <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-3">
          <input type="password" placeholder="Current" className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white" />
          <input type="password" placeholder="New" className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white" />
          <input type="password" placeholder="Confirm" className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white" />
        </div>
        <button className="mt-3 rounded-xl bg-[#FFD700] px-5 py-3 font-semibold text-[#003737]">Update</button>
      </div>
      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
        <h4 className="font-semibold text-white">Two‑Factor Authentication</h4>
        <p className="text-sm text-white/70">Add an extra layer of security (coming soon).</p>
        <button className="mt-3 rounded-xl border border-white/15 px-5 py-3 font-semibold text-white/90" disabled>Enable</button>
      </div>
    </div>
  );
}

function PreferencesForm() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <label className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
        <input type="checkbox" className="h-4 w-4" />
        <span className="text-sm">Email notifications</span>
      </label>
      <label className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
        <input type="checkbox" className="h-4 w-4" />
        <span className="text-sm">Push notifications</span>
      </label>
      <label className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
        <input type="checkbox" className="h-4 w-4" />
        <span className="text-sm">Dark mode</span>
      </label>
    </div>
  );
}

function PayoutsForm() {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <h4 className="font-semibold text-white">Payout Destinations</h4>
      <p className="text-sm text-white/70">Link your bank or exchange account (coming soon).</p>
      <button className="mt-3 rounded-xl border border-white/15 px-5 py-3 font-semibold text-white/90" disabled>Connect</button>
    </div>
  );
}

