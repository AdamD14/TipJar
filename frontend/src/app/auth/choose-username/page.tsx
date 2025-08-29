"use client";
import { useState } from "react";
import { z } from "zod";

const schema = z.object({
  username: z.string().min(3).max(24).regex(/^[a-z0-9._-]+$/i),
});

export default function ChooseUsernamePage() {
  const [v, setV] = useState<{ username: string; role: "creator" | "fan" }>({
    username: "",
    role: "creator",
  });
  const [status, setStatus] = useState<
    "idle" | "checking" | "ok" | "taken" | "error"
  >("idle");

  const onCheck = async (name: string) => {
    setStatus("checking");
    try {
      const r = await fetch(
        `/api/v1/users/username-check?name=${encodeURIComponent(name)}`
      );
      const { available } = await r.json();
      setStatus(available ? "ok" : "taken");
    } catch {
      setStatus("error");
    }
  };

  const onSubmit = async () => {
    const parse = schema.safeParse({ username: v.username });
    if (!parse.success) return setStatus("error");
    try {
      await fetch("/api/v1/users/set-username", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: v.username, role: v.role }),
      });
      window.location.href = `/@${v.username}`;
    } catch {
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen bg-[#003737] text-white flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white/5 border border-white/10 rounded-2xl p-6">
        <h1 className="text-2xl font-semibold mb-4">Choose your username</h1>
        <label className="block text-sm mb-2">Public URL</label>
        <div className="flex items-center gap-2">
          <span className="text-white/70">tipjar.plus/@</span>
          <input
            value={v.username}
            onChange={(e) => {
              setV({ ...v, username: e.target.value });
              onCheck(e.target.value);
            }}
            className="flex-1 bg-transparent border-b border-white/20 focus:border-[#FFD700] outline-none py-1"
            placeholder="newuser"
            aria-label="Username"
          />
          {status === "checking" && <span className="text-xs">checking…</span>}
          {status === "ok" && (
            <span className="text-xs text-emerald-400">available</span>
          )}
          {status === "taken" && (
            <span className="text-xs text-rose-400">taken</span>
          )}
        </div>

        <div className="mt-6 flex gap-3" role="radiogroup" aria-label="Select role">
          <button
            onClick={() => setV({ ...v, role: "creator" })}
            className={`px-3 py-2 rounded-lg border ${
              v.role === "creator"
                ? "bg-[#FFD700] text-[#003737] border-[#FFD700]"
                : "border-white/20"
            }`}
          >
            Creator
          </button>
          <button
            onClick={() => setV({ ...v, role: "fan" })}
            className={`px-3 py-2 rounded-lg border ${
              v.role === "fan"
                ? "bg-[#FFD700] text-[#003737] border-[#FFD700]"
                : "border-white/20"
            }`}
          >
            Fan
          </button>
        </div>

        <div className="mt-6">
          <button
            onClick={onSubmit}
            className="w-full bg-[#FFD700] text-[#003737] font-bold py-3 rounded-xl hover:brightness-110"
          >
            Continue
          </button>
        </div>
      </div>
    </main>
  );
}
