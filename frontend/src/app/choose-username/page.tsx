// Frontend: /app/choose-username/page.tsx
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ChooseUsername() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [usernameStatus, setUsernameStatus] = useState<"checking" | "available" | "taken" | "invalid" | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!username) return;
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      const trimmed = username.trim().toLowerCase();
      if (!/^[a-z0-9_]{3,}$/.test(trimmed)) {
        setUsernameStatus("invalid");
        return;
      }
      try {
        setUsernameStatus("checking");
        const res = await fetch(`/api/v1/user/username-check?username=${trimmed}`, {
          signal: controller.signal,
        });
        const data = await res.json();
        setUsernameStatus(data.valid ? "available" : "taken");
      } catch {
        setUsernameStatus(null);
      }
    }, 500);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [username]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const normalized = username.trim().toLowerCase();
    if (normalized.length < 3 || /[^a-z0-9_]/.test(normalized)) {
      setError("Username must be at least 3 characters, letters/numbers/underscores only");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/v1/user/username", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ username: normalized }),
      });
      if (!res.ok) throw new Error("Username taken or invalid");
      router.push("/creator/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-black px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-800 p-6 rounded-2xl border border-slate-700 w-full max-w-md space-y-4"
      >
        <h1 className="text-white text-2xl font-bold">Choose your username</h1>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="e.g. adamduda"
          className="w-full px-4 py-3 rounded-lg bg-slate-900 text-white border border-slate-600 outline-none"
        />
        {usernameStatus === "checking" && <p className="text-xs text-yellow-400">Checking...</p>}
        {usernameStatus === "available" && <p className="text-xs text-green-400">✅ Available</p>}
        {usernameStatus === "taken" && <p className="text-xs text-red-400">❌ Taken</p>}
        {usernameStatus === "invalid" && <p className="text-xs text-red-400">❌ Invalid format</p>}
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-lg"
        >
          {loading ? "Saving..." : "Confirm"}
        </button>
      </form>
    </main>
  );
}

// Hook do pobierania salda z cache + refresh
export function useBalance(token: string, pollEveryMs = 10000) {
  const [balance, setBalance] = useState<{ balance: number; currency: string } | null>(null);

  useEffect(() => {
    if (!token) return;
    const fetchBalance = async () => {
      try {
        const res = await fetch("/api/v1/circle/wallet/balance", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setBalance(data);
      } catch (err) {
        console.error("Failed to fetch balance", err);
      }
    };
    fetchBalance();
    const interval = setInterval(fetchBalance, pollEveryMs);
    return () => clearInterval(interval);
  }, [token, pollEveryMs]);

  return balance;
}
