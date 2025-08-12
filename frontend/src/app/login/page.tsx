"use client";
import { useState } from "react";
import { Button } from "@/components/Button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="mx-auto max-w-md">
      <h1 className="text-2xl font-bold">Welcome back</h1>
      <form className="mt-4 space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className="block text-sm text-white/80">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-xl border border-white/20 bg-transparent px-3 py-2 outline-none focus:border-white/40"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block text-sm text-white/80">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-xl border border-white/20 bg-transparent px-3 py-2 outline-none focus:border-white/40"
            placeholder="••••••••"
          />
        </div>
        <Button className="w-full">Log in</Button>
        <div className="text-center text-sm text-white/70">or</div>
        <div className="grid grid-cols-2 gap-3">
          <button className="rounded-xl border border-white/20 px-3 py-2 text-sm hover:bg-white/5">
            Continue with Google
          </button>
          <button className="rounded-xl border border-white/20 px-3 py-2 text-sm hover:bg-white/5">
            Continue with Twitch
          </button>
        </div>
      </form>
    </div>
  );
}
