"use client";
import FanShell from "@/components/fan/FanShell";
import { useState } from "react";

const TABS = [
  { key: "profile", label: "Profile" },
  { key: "security", label: "Security" },
  { key: "connections", label: "Connections" },
];

export default function Page() {
  const [tab, setTab] = useState("profile");
  return (
    <FanShell title="Settings">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="mb-4 flex gap-2">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={[
                "rounded-xl px-3 py-2 text-sm font-semibold",
                tab === t.key ? "bg-[#FFD700] text-[#003737]" : "border border-white/15 text-white/80",
              ].join(" ")}
            >
              {t.label}
            </button>
          ))}
        </div>
        {tab === "profile" && <ProfileForm />}
        {tab === "security" && <SecurityForm />}
        {tab === "connections" && <Connections />}
      </div>
    </FanShell>
  );
}

function ProfileForm() {
  return (
    <form className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <label className="block">
        <span className="mb-1 block text-sm text-[#DDE0DA]">Display name</span>
        <input className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFD700]" />
      </label>
      <label className="block md:col-span-2">
        <span className="mb-1 block text-sm text-[#DDE0DA]">Bio</span>
        <textarea className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFD700]" rows={4} />
      </label>
      <button className="w-fit rounded-xl bg-gradient-to-r from-[#002828] to-[#007474] px-5 py-3 font-semibold text-white">Save changes</button>
    </form>
  );
}

function SecurityForm() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4">
        <div>
          <p className="font-semibold">Two-Factor Authentication (2FA)</p>
          <p className="text-sm text-[#BCC1B6]">Add an extra layer of security to your account.</p>
        </div>
        <button className="rounded-xl border border-white/15 px-4 py-2 font-semibold text-white/80">Enable</button>
      </div>
      <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4">
        <div>
          <p className="font-semibold">Sessions</p>
          <p className="text-sm text-[#BCC1B6]">Sign out from other devices.</p>
        </div>
        <button className="rounded-xl border border-white/15 px-4 py-2 font-semibold text-white/80">Sign out all</button>
      </div>
    </div>
  );
}

function Connections() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4">
        <div>
          <p className="font-semibold">Google</p>
          <p className="text-sm text-[#BCC1B6]">Connect your Google account for quick sign-in.</p>
        </div>
        <button className="rounded-xl bg-[#FFD700] px-4 py-2 font-semibold text-[#003737]">Connect</button>
      </div>
      <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4">
        <div>
          <p className="font-semibold">Twitch</p>
          <p className="text-sm text-[#BCC1B6]">Enable Twitch perks and overlays.</p>
        </div>
        <button className="rounded-xl border border-white/15 px-4 py-2 font-semibold text-white/80">Disconnect</button>
      </div>
    </div>
  );
}

