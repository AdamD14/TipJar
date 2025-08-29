"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { register, me } from "@/lib/auth";
import { API } from "@/lib/api-routes";
import FormError from "@/components/ui/FormError";
import { toUiError } from "@/lib/errors";

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await register({
        email,
        password,
        displayName: displayName || undefined,
      });
      const user = await me().catch(() => null);
      const hasUsername = !!(user && (user.username || user.handle));
      router.push(hasUsername ? "/fan/feed" : "/onboarding/username");
    } catch (e: any) {
      setError(toUiError(e).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#001F1F] p-6">
      <div className="mx-auto max-w-md rounded-2xl border border-white/10 bg-white/5 p-6">
        <h1 className="font-sans text-2xl font-bold text-white">
          Create account
        </h1>
        <form onSubmit={onSubmit} className="mt-4 space-y-3">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
          />
          <input
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Display name (optional)"
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
            {loading ? "Processing…" : "Create account"}
          </button>
          <FormError message={error || undefined} />
        </form>
        <div className="mt-4 grid grid-cols-1 gap-2">
          <a href={API.AUTH.GOOGLE} className="font-ui rounded-xl bg-white px-4 py-2 text-center font-semibold text-[#003737]">Continue with Google</a>
          <a href={API.AUTH.TWITCH} className="font-ui rounded-xl border border-white/15 px-4 py-2 text-center font-semibold text-white/90">Continue with Twitch</a>
        </div>
        <p className="mt-3 text-sm text-[#BCC1B6]">
          <a className="underline" href="/login">
            Masz konto?
          </a>
        </p>
      </div>
    </main>
  );
}
