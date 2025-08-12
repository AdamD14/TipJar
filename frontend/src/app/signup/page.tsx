"use client";
import { useState } from "react";
import { Button } from "@/components/Button";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"creator" | "fan">("creator");
  return (
    <div className="mx-auto max-w-md">
      <h1 className="text-2xl font-bold">Create your account</h1>
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
        <div>
          <label className="block text-sm text-white/80">I am</label>
          <div className="mt-1 flex gap-2">
            <button
              type="button"
              onClick={() => setRole("creator")}
              className={`rounded-xl px-3 py-2 text-sm ${
                role === "creator" ? "bg-white/10" : "border border-white/20 hover:bg-white/5"
              }`}
            >
              Creator
            </button>
            <button
              type="button"
              onClick={() => setRole("fan")}
              className={`rounded-xl px-3 py-2 text-sm ${
                role === "fan" ? "bg-white/10" : "border border-white/20 hover:bg-white/5"
              }`}
            >
              Fan
            </button>
          </div>
        </div>
        <Button className="w-full">Sign up</Button>
      </form>
    </div>
  );
}
