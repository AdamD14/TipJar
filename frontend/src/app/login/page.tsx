"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { login, me } from "@/lib/auth";
import { Toast } from "@/components/ui/Toast";

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null); setLoading(true);
    try {
      await login({ email, password });
      const user = await me().catch(() => null);
      const hasUsername = !!(user && (user.username || user.handle));
      router.push(hasUsername ? "/fan/feed" : "/onboarding/username");
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
          <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFD700]"/>
          <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Password" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFD700]"/>
          <button disabled={loading} className="font-ui w-full rounded-xl bg-[#FFD700] px-4 py-3 font-semibold text-[#003737] disabled:opacity-60">{loading?"Processing…":"Sign in"}</button>
        </form>
        <p className="mt-3 text-sm text-[#BCC1B6]"><a className="underline" href="/register">Nie masz konta?</a></p>
      </div>
    </main>
  );
}
