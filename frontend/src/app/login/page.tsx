"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { login, me } from "@/lib/auth";
import { Toast } from "@/components/ui/Toast";

export default function Page() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSocialLogin = (provider: "google" | "twitch") => {
    setLoading(true);
    const apiBase = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:3001";
    const payload = JSON.stringify({});
    const state = btoa(payload);
    const target = provider === "google" ? "/api/v1/auth/google" : "/api/v1/auth/twitch";
    window.location.href = `${apiBase}${target}?state=${encodeURIComponent(state)}`;
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login({ email, password });
      const user = await me().catch(() => null);
      const hasUsername = !!(user && (user.username || user.handle));
      const returnTo = params?.get("returnTo");
      if (returnTo && returnTo.startsWith("/")) {
        router.push(returnTo);
      } else {
        router.push(hasUsername ? "/fan/feed" : "/onboarding/username");
      }
    } catch (e: any) {
      setError(e.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#001F1F] p-6">
      {error && <Toast msg={error} onClose={() => setError(null)} />}
      <div className="mx-auto max-w-md rounded-2xl border border-white/10 bg-white/5 p-6">
        <h1 className="font-sans text-2xl font-bold text-white">Sign in</h1>
        <form onSubmit={onSubmit} className="mt-4 space-y-3">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
          />
          <button
            disabled={loading}
            className="font-ui w-full rounded-xl bg-[#FFD700] px-4 py-3 font-semibold text-[#003737] disabled:opacity-60"
          >
            {loading ? "Processing…" : "Sign in"}
          </button>
        </form>

        <div className="my-4 text-center text-white/60 text-sm relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/20"></div>
          </div>
          <div className="relative bg-transparent px-3 inline-block">or</div>
        </div>

        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={() => handleSocialLogin("google")}
            disabled={loading}
            className="flex items-center justify-center gap-3 bg-white/20 hover:bg-white/30 transition-all text-white font-semibold rounded-lg py-3 text-sm border border-white/10 hover:border-white/20 disabled:opacity-60"
          >
            <Image
              src="/assets/google-original-logo.svg"
              alt="Google logo"
              width={20}
              height={20}
              className="w-5 h-5"
            />
            Continue with Google
          </button>
          <button
            type="button"
            onClick={() => handleSocialLogin("twitch")}
            disabled={loading}
            className="flex items-center justify-center gap-3 bg-purple-600/70 hover:bg-purple-600/90 transition-all text-white font-semibold rounded-lg py-3 text-sm border border-purple-500/30 hover:border-purple-400/50 disabled:opacity-60"
          >
            <Image
              src="/assets/twitch-logo.svg"
              alt="Twitch logo"
              width={20}
              height={20}
              className="w-5 h-5"
            />
            Continue with Twitch
          </button>
        </div>
        <p className="mt-3 text-sm text-[#BCC1B6]">
          <a className="underline" href="/register">
            Nie masz konta?
          </a>
        </p>
      </div>
    </main>
  );
}
