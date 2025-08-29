"use client";
import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

declare global {
  interface Window {
    analytics?: {
      track: (event: string, data?: Record<string, unknown>) => void;
    };
  }
}

function trackEvent(event: string, data?: Record<string, unknown>) {
  if (typeof window !== "undefined" && window.analytics?.track) {
    window.analytics.track(event, data);
  } else {
    console.log("analytics", event, data);
  }
}

export default function ChooseUsername() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [role, setRole] = useState<"CREATOR" | "FAN">("CREATOR");
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!username) {
      setIsAvailable(null);
      return;
    }
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `${API_BASE}/api/v1/users/username-check?username=${encodeURIComponent(
            username,
          )}`,
          { signal: controller.signal },
        );
        if (res.ok) {
          const data = await res.json();
          setIsAvailable(data.available);
          trackEvent("username_check", { username, available: data.available });
        } else {
          setIsAvailable(false);
        }
      } catch {
        setIsAvailable(false);
      }
    }, 300);
    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [username]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!username) {
      setError("Please enter a username");
      return;
    }
    if (isAvailable === false) {
      setError("This username is already taken");
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/api/v1/users/set-username`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
        credentials: "include",
      });
      if (!res.ok) throw new Error(await res.text());
      trackEvent("username_set_success", { username, role });
      router.push(`/${username}`);
    } catch {
      setError("Failed to save username");
    }
  };

  return (
    <main className="mx-auto max-w-md p-6">
      <h1 className="text-2xl font-bold mb-4">Choose your username</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="username" className="block font-medium mb-1">
            Username
          </label>
          <div className="flex rounded border focus-within:ring-2 focus-within:ring-teal-500">
            <span className="px-2 py-2 text-gray-500">tipjar.plus/@</span>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value.toLowerCase());
                setError("");
              }}
              minLength={3}
              maxLength={24}
              pattern="[a-z0-9_]+"
              className="flex-1 p-2 outline-none rounded-r bg-transparent"
              aria-describedby="username-status"
              required
            />
          </div>
          <p id="username-status" role="status" className="text-sm mt-1">
            {isAvailable === false && (
              <span className="text-red-500">This username is taken</span>
            )}
            {isAvailable === true && (
              <span className="text-green-600">This username is available</span>
            )}
            {isAvailable === null && (
              <span className="text-gray-500">Use 3-24 lowercase letters, numbers, or _</span>
            )}
          </p>
        </div>
        <fieldset className="flex items-center gap-4" aria-label="Select role">
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="role"
              value="CREATOR"
              checked={role === "CREATOR"}
              onChange={() => setRole("CREATOR")}
            />
            Creator
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="role"
              value="FAN"
              checked={role === "FAN"}
              onChange={() => setRole("FAN")}
            />
            Fan
          </label>
        </fieldset>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full px-6 py-3 bg-teal-600 text-white rounded hover:bg-teal-700 disabled:opacity-50"
          disabled={isAvailable === false || username.length < 3}
        >
          Continue
        </button>
      </form>
    </main>
  );
}

