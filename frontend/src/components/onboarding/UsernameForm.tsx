"use client";
import { useEffect, useId, useState } from "react";
import { checkUsername } from "@/lib/users";

export default function UsernameForm({
  onValid,
}: {
  onValid: (username: string) => void;
}) {
  const [value, setValue] = useState("");
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [available, setAvailable] = useState<boolean | null>(null);
  const id = useId();

  useEffect(() => {
    const handle = value.trim().toLowerCase();
    if (!handle) {
      setAvailable(null);
      setError(null);
      return;
    }
    if (!/^[a-z0-9_]{3,20}$/.test(handle)) {
      setAvailable(null);
      setError("Use 3–20 chars: a–z, 0–9, _");
      return;
    }
    let alive = true;
    setChecking(true);
    setError(null);
    checkUsername(handle)
      .then((res: any) => {
        if (!alive) return;
        setAvailable(res?.available === true);
      })
      .catch((e: any) => {
        if (!alive) return;
        setAvailable(null);
        setError(e?.message || "Check failed");
      })
      .finally(() => {
        if (alive) setChecking(false);
      });
    return () => {
      alive = false;
    };
  }, [value]);

  useEffect(() => {
    if (available === true) onValid(value.trim().toLowerCase());
  }, [available, onValid, value]);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <label
        htmlFor={`u_${id}`}
        className="block text-sm text-[#DDE0DA]"
      >
        Choose your @handle
      </label>
      <div className="mt-2 flex gap-2">
        <input
          id={`u_${id}`}
          value={value}
          onChange={(e) => setValue(e.target.value.toLowerCase())}
          placeholder="e.g. adam_creator"
          aria-invalid={!!error}
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
        />
        <button
          type="button"
          disabled={checking}
          className="rounded-xl bg-[#FFD700] px-4 py-3 font-semibold text-[#003737] disabled:opacity-60"
        >
          {checking ? "Checking…" : available ? "Available" : "Reserve"}
        </button>
      </div>
      {error && <p className="mt-2 text-sm text-red-300">{error}</p>}
      {!error && available === false && (
        <p className="mt-2 text-sm text-amber-300">Taken</p>
      )}
      {!error && available === true && (
        <p className="mt-2 text-sm text-emerald-300">Available ✓</p>
      )}
      <p className="mt-2 text-xs text-[#BCC1B6]">
        Unique public identifier for your profile URL.
      </p>
    </div>
  );
}

