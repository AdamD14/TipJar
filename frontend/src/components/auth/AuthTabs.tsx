"use client";

import { useState } from "react";

export default function AuthTabs({ defaultTab = "login" }: { defaultTab?: "login" | "signup" }) {
  const [tab, setTab] = useState<"login" | "signup">(defaultTab);

  return (
    <div className="mx-auto w-full max-w-[460px] rounded-2xl bg-[#004A4A]/60 p-6 backdrop-blur">
      <div className="mb-6 grid grid-cols-2 gap-2">
        <button
          className={[
            "rounded-xl px-4 py-2 font-semibold transition-colors",
            tab === "login"
              ? "bg-[#FFD700] text-[#003737]"
              : "bg-[#003737] text-[#DDE0DA] border border-[#FFD700]/40",
          ].join(" ")}
          onClick={() => setTab("login")}
        >
          Zaloguj się
        </button>
        <button
          className={[
            "rounded-xl px-4 py-2 font-semibold transition-colors",
            tab === "signup"
              ? "bg-[#FFD700] text-[#003737]"
              : "bg-[#003737] text-[#DDE0DA] border border-[#FFD700]/40",
          ].join(" ")}
          onClick={() => setTab("signup")}
        >
          Zarejestruj się
        </button>
      </div>

      {tab === "login" ? <LoginForm /> : <SignupForm />}
    </div>
  );
}

function LoginForm() {
  return (
    <form className="space-y-4">
      <label className="block">
        <span className="mb-1 block text-sm text-[#DDE0DA]">Adres email</span>
        <input
          type="email"
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
          placeholder="you@example.com"
          required
        />
      </label>
      <label className="block">
        <span className="mb-1 block text-sm text-[#DDE0DA]">Hasło</span>
        <input
          type="password"
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
          placeholder="••••••••"
          required
        />
      </label>
      <button
        type="submit"
        className="w-full rounded-xl bg-gradient-to-r from-[#002828] to-[#007474] px-4 py-3 font-semibold text-white"
      >
        Zaloguj się
      </button>
      <div className="flex items-center gap-3 text-xs text-white/60">
        <span className="h-px flex-1 bg-white/10" />
        lub
        <span className="h-px flex-1 bg-white/10" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <button type="button" className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 font-semibold text-white/90">
          Kontynuuj z Google
        </button>
        <button type="button" className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 font-semibold text-white/90">
          Kontynuuj z Twitch
        </button>
      </div>
    </form>
  );
}

function SignupForm() {
  return (
    <form className="space-y-4">
      <label className="block">
        <span className="mb-1 block text-sm text-[#DDE0DA]">Adres email</span>
        <input
          type="email"
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
          placeholder="you@example.com"
          required
        />
      </label>
      <label className="block">
        <span className="mb-1 block text-sm text-[#DDE0DA]">Hasło</span>
        <input
          type="password"
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
          placeholder="••••••••"
          required
        />
      </label>
      <label className="block">
        <span className="mb-1 block text-sm text-[#DDE0DA]">Powtórz hasło</span>
        <input
          type="password"
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
          placeholder="••••••••"
          required
        />
      </label>
      <button
        type="submit"
        className="w-full rounded-xl bg-gradient-to-r from-[#002828] to-[#007474] px-4 py-3 font-semibold text-white"
      >
        Załóż konto
      </button>
    </form>
  );
}