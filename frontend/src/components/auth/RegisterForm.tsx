"use client";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { register as registerEmail, me } from "@/lib/auth";

type Role = "FAN" | "CREATOR";

export function RegisterForm({ role }: { role: Role }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const googleHref = useMemo(() => {
    const state = btoa(JSON.stringify({ role }));
    return `/api/v1/auth/google?state=${encodeURIComponent(state)}`;
  }, [role]);
  const twitchHref = useMemo(() => {
    const state = encodeURIComponent(JSON.stringify({ role }));
    return `/api/v1/auth/twitch?state=${state}`;
  }, [role]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        throw new Error("Enter a valid email");
      }
      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters");
      }
      if (password !== password2) {
        throw new Error("Passwords do not match");
      }
      await registerEmail({ email, password, role });
      const u = await me().catch(() => null);
      if (u && (u.username || u.handle)) {
        if (role === "CREATOR") router.push("/creator/dashboard");
        else router.push("/fan/feed");
      } else {
        router.push("/onboarding/username");
      }
    } catch (err: any) {
      setError(err?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-3">
      <div className="grid gap-3">
        <a
          href={googleHref}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 font-semibold text-[#003737] transition hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD700]"
        >
          Continue with Google
        </a>
        <a
          href={twitchHref}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#6441A5] px-4 py-3 font-semibold text-white transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD700]"
        >
          Continue with Twitch
        </a>
      </div>

      <div className="my-4 text-center text-sm text-white/60">or</div>

      {error && (
        <div className="rounded-lg border border-red-400/40 bg-red-400/10 p-3 text-sm text-red-200">
          {error}
        </div>
      )}

      <Input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        type="password"
        placeholder="Password (min 6)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Input
        type="password"
        placeholder="Repeat password"
        value={password2}
        onChange={(e) => setPassword2(e.target.value)}
        required
      />
      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Rejestrowanie..." : "Zarejestruj się"}
      </Button>
      <p className="mt-1 text-xs text-white/60">
        By registering you accept our Terms and Privacy Policy.
      </p>
    </form>
  );
}

