"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { login, me } from "@/lib/auth";
import { useOnboardingStore } from "@/lib/store/onboardingStore";
import { useToast } from "@/components/ui/Toast";

export default function Page() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { setRole, setUser: setOnboardingUser } = useOnboardingStore();

  const handleSocialLogin = (provider: "google" | "twitch") => {
    if (loading) return;
    setLoading(true);

    const ORIGIN = (
      process.env.NEXT_PUBLIC_BACKEND_ORIGIN || "http://localhost:3001"
    ).replace(/\/+$/, "");

    const target =
      provider === "google" ? "/api/v1/auth/google" : "/api/v1/auth/twitch";

    const state =
      provider === "google" ? btoa(JSON.stringify({})) : JSON.stringify({});

    window.location.href = `${ORIGIN}${target}?state=${encodeURIComponent(
      state
    )}`;
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      await login({ email, password });
      const user = await me().catch(() => null);
      if (user) {
        const normalizedRole = user.role === "CREATOR" ? "CREATOR" : "FAN";
        setRole(normalizedRole);
        setOnboardingUser({
          id: user.id,
          email: user.email ?? undefined,
          role: normalizedRole,
          username: user.username ?? undefined,
          hasCompletedOnboarding: user.hasCompletedOnboarding,
        });
      } else {
        setOnboardingUser(null);
      }

      const hasUsername = Boolean(user?.username);
      const onboardingDone = Boolean(user?.hasCompletedOnboarding);
      const normalizedRole = user?.role === "CREATOR" ? "CREATOR" : "FAN";
      const fallbackTarget =
        hasUsername && onboardingDone
          ? normalizedRole === "CREATOR"
            ? "/creator/dashboard"
            : "/fan/dashboard"
          : "/choose-username";
      const returnTo = params?.get("returnTo");
      if (
        returnTo &&
        returnTo.startsWith("/") &&
        hasUsername &&
        onboardingDone
      ) {
        router.push(returnTo);
      } else {
        router.push(fallbackTarget);
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Login failed";
      toast.push({ type: "error", text: msg });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-[80vh] max-w-6xl items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-teal-900/20 backdrop-blur-md border border-teal-400/20 rounded-2xl shadow-2xl p-2">
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-r from-teal-500 to-purple-500 text-white px-4 py-2 rounded-xl font-bold text-xl shadow-lg flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="TipJar+ icon"
              width={48}
              height={48}
              className="h-12 w-auto"
              draggable={false}
            />
            tipjar.plus
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-2">
          <div>
            <label
              htmlFor="email"
              className="block text-white text-sm mb-2 font-medium"
            >
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-400 w-5 h-5" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-slate-900/60 border border-teal-400/40 rounded-lg pl-11 pr-4 py-3 text-white placeholder-gray-300 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition-all"
                placeholder="e.g. john@tipjar.plus"
                disabled={loading}
              />
            </div>
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="block text-white text-sm mb-2 font-medium"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-400 w-5 h-5" />
              <input
                id="password"
                type={showPwd ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-slate-900/60 border border-teal-400/40 rounded-lg pl-11 pr-12 py-3 text-white placeholder-gray-300 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition-all"
                placeholder="Enter your password"
                disabled={loading}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-teal-400 hover:text-teal-300 transition-colors"
                onClick={() => setShowPwd(!showPwd)}
                aria-label={showPwd ? "Hide password" : "Show password"}
                disabled={loading}
              >
                {showPwd ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-teal-500 to-purple-500 text-white font-bold py-3 rounded-lg hover:from-teal-600 hover:to-purple-600 hover:scale-[1.02] transform transition-all duration-200 disabled:opacity-60 disabled:pointer-events-none shadow-lg"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processing...
              </span>
            ) : (
              "Sign in"
            )}
          </button>
        </form>

        <div className="my-2 text-center text-white/60 text-sm relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/20"></div>
          </div>
          <div className="relative bg-teal-900/60 px-4">or</div>
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

        <p className="mt-4 text-sm text-center text-white/70">
          Don't have an account?{" "}
          <Link
            className="underline text-teal-300 hover:text-teal-200"
            href="/register"
          >
            Register
          </Link>
        </p>
      </div>
    </main>
  );
}
