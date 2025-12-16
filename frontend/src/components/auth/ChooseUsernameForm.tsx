"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { normalize } from "@/lib/api/errors";
import { useRegistrationStore } from "@/lib/store/registrationStore";

type MeResponse = {
  id: string;
  email?: string | null;
  role?: "FAN" | "CREATOR" | null;
  username?: string | null;
  hasCompletedRegistration?: boolean;
};

// Stałe dla ścieżek - lepsze zarządzanie
const PATHS = {
  CREATOR: {
    dashboard: "/creator/dashboard",
    onboarding: "/onboarding/creator/step-1",
  },
  FAN: {
    dashboard: "/fan/dashboard",
    onboarding: "/onboarding/fan/step-1",
  },
} as const;

export default function ChooseUsernameForm() {
  const router = useRouter();
  const { drafts, setDraft, setUser, setRole } = useRegistrationStore();

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [available, setAvailable] = useState<boolean | null>(null);
  const [checking, setChecking] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // Zgody
  const [allRequired, setAllRequired] = useState(false);
  const [marketing, setMarketing] = useState(false);

  // Sprawdź stan użytkownika przy mount (po OAuth redirect)
  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        const meRes = await api<MeResponse>("/api/v1/auth/me");

        if (!isMounted) return;

        if (!meRes) {
          // Brak danych użytkownika - pokaż formularz jako fallback
          setInitialLoading(false);
          return;
        }

        const normalizedRole = meRes.role === "CREATOR" ? "CREATOR" : "FAN";
        setRole(normalizedRole);
        setUser(meRes);

        // Jeśli już ma username i completed registration -> onboarding
        if (meRes.username && meRes.hasCompletedRegistration) {
          const targetPath =
            normalizedRole === "CREATOR"
              ? PATHS.CREATOR.onboarding
              : PATHS.FAN.onboarding;
          router.replace(targetPath);
          return;
        }

        // Ma username ale nie ukończył onboarding -> następny krok
        if (meRes.username) {
          const targetPath =
            normalizedRole === "CREATOR"
              ? PATHS.CREATOR.onboarding
              : PATHS.FAN.onboarding;
          router.replace(targetPath);
          return;
        }

        // Nie ma username -> zostaje na tej stronie (nic nie robimy)
      } catch (err) {
        // User nie zalogowany lub błąd - pokaż formularz
        console.error("Failed to fetch user:", err);
      } finally {
        if (isMounted) {
          setInitialLoading(false);
        }
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [router, setRole, setUser]);

  // Debounced check dostępności username z AbortController
  useEffect(() => {
    const name = (drafts.username || "").trim().toLowerCase();

    setError(null);
    setAvailable(null);

    if (!name) return;

    if (!/^[a-z0-9._-]{3,24}$/i.test(name)) {
      setError("Use 3–24 chars: a–z, 0–9, dot, underscore or hyphen.");
      return;
    }

    setChecking(true);
    const controller = new AbortController();
    const { signal } = controller;

    const timeout = setTimeout(() => {
      (async () => {
        try {
          const res = await api<{ available: boolean }>(
            `/api/v1/users/username-check?username=${encodeURIComponent(name)}`,
            { signal }
          );

          if (signal.aborted) return;

          setAvailable(!!res.available);
          if (!res.available) {
            setError("This username is already taken.");
          }
        } catch {
          if (signal.aborted) return;

          setAvailable(null);
          setError("Check failed, try again.");
        } finally {
          if (!signal.aborted) {
            setChecking(false);
          }
        }
      })();
    }, 500);

    return () => {
      controller.abort();
      clearTimeout(timeout);
    };
  }, [drafts.username]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (busy) return;

    setBusy(true);
    setError(null);

    const username = (drafts.username || "").trim().toLowerCase();

    // Walidacja
    if (!username) {
      setError("Username is required.");
      setBusy(false);
      return;
    }

    if (!/^[a-z0-9._-]{3,24}$/i.test(username)) {
      setError("Use 3–24 chars: a–z, 0–9, dot, underscore or hyphen.");
      setBusy(false);
      return;
    }

    if (available !== true) {
      setError(
        "Please wait for username availability check or choose another one."
      );
      setBusy(false);
      return;
    }

    if (!allRequired) {
      setError("You must accept Terms, Privacy Policy and confirm age.");
      setBusy(false);
      return;
    }

    try {
      // Zapisz username i zgody
      await api<void>("/api/v1/users/set-username", {
        method: "POST",
        body: JSON.stringify({
          username,
          consents: {
            terms: true,
            privacy: true,
            age: true,
            marketing,
          },
        }),
      });

      // Odśwież dane użytkownika
      const meRes = await api<MeResponse>("/api/v1/auth/me");

      if (meRes) {
        setUser(meRes);

        // Przekieruj do następnego kroku onboarding
        const role = meRes.role === "CREATOR" ? "CREATOR" : "FAN";
        const targetPath =
          role === "CREATOR" ? PATHS.CREATOR.onboarding : PATHS.FAN.onboarding;

        router.replace(targetPath);
      } else {
        throw new Error("Failed to fetch updated user data");
      }
    } catch (err: unknown) {
      const normalized = normalize(err);
      setError(normalized?.msg || "Unable to save username. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  // Funkcja pomocnicza do aktualizacji username bez trimowania w trakcie pisania
  const handleUsernameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setDraft({ username: e.target.value });
    },
    [setDraft]
  );

  // Loading state przy sprawdzaniu initial
  if (initialLoading) {
    return (
      <section className="w-full max-w-md bg-teal-900/20 backdrop-blur-md border border-teal-400/20 rounded-2xl shadow-2xl p-8">
        <div className="flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-teal-400 border-t-transparent rounded-full animate-spin" />
        </div>
      </section>
    );
  }

  return (
    <section className="w-full max-w-md bg-teal-900/20 backdrop-blur-md border border-teal-400/20 rounded-2xl shadow-2xl p-2">
      <div className="flex justify-center mb-6">
        <div className="bg-gradient-to-r from-teal-500 to-purple-500 text-white px-4 py-2 rounded-xl font-bold text-xl shadow-lg flex items-center gap-3">
          <div
            className="inline-block select-none"
            onDragStart={(e) => e.preventDefault()}
            draggable={false}
          >
            <Image
              src="/logo.png"
              alt="TipJar+ icon"
              width={48}
              height={48}
              className="h-12 w-auto pointer-events-none"
            />
          </div>
          tipjar.plus
        </div>
      </div>

      <form className="space-y-3" onSubmit={onSubmit} noValidate>
        <div>
          <label
            htmlFor="username"
            className="block text-white text-base mb-2 font-medium"
          >
            Choose your username
          </label>
          <div className="flex items-center gap-2">
            <span className="text-[#8FA19A]">tipjar.plus/@</span>
            <input
              id="username"
              type="text"
              autoComplete="username"
              value={drafts.username ?? ""}
              onChange={handleUsernameChange}
              minLength={3}
              maxLength={24}
              className="flex-1 bg-slate-900/60 border border-teal-400/40 rounded-lg px-4 py-3 text-white text-base placeholder-gray-300 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition-all disabled:opacity-50"
              placeholder="your-handle"
              disabled={busy}
              aria-describedby="username-status username-hint"
              aria-invalid={available === false}
              aria-busy={checking}
            />
          </div>

          <div className="mt-2 text-sm" id="username-status">
            {checking && (
              <span className="text-[#BCC1B6]" aria-live="polite">
                Checking availability…
              </span>
            )}
            {!checking && available === true && (
              <span className="text-emerald-300" aria-live="polite">
                Available ✓
              </span>
            )}
            {!checking && available === false && (
              <span className="text-amber-300" aria-live="assertive">
                Username already taken
              </span>
            )}
          </div>

          <p id="username-hint" className="mt-2 text-sm text-[#8FA19A]">
            3–24 characters: letters, numbers, dot, underscore or hyphen
          </p>
        </div>

        {/* Zgody */}
        <div className="space-y-2 pt-2">
          <label className="flex items-start gap-3 text-sm">
            <input
              type="checkbox"
              className="size-4 self-start rounded border-white/20 bg-white/5 outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
              checked={allRequired}
              onChange={(e) => setAllRequired(e.target.checked)}
            />
            <span className="text-[#DDE0DA]">
              I am at least 16 years old and accept the{" "}
              <a
                href="/terms"
                className="underline hover:text-teal-300 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="/privacy"
                className="underline hover:text-teal-300 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </a>
            </span>
          </label>

          <label className="flex items-start gap-3 text-sm">
            <input
              type="checkbox"
              className="size-4 self-start rounded border-white/20 bg-white/5 outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
              checked={marketing}
              onChange={(e) => setMarketing(e.target.checked)}
            />
            <span className="text-[#DDE0DA]">
              Send me product updates and creator highlights (optional)
            </span>
          </label>
        </div>

        {error && (
          <p
            role="alert"
            className="mt-2 text-sm text-[#FFD700] bg-amber-900/20 px-4 py-3 rounded-lg border border-amber-700/30"
            aria-live="assertive"
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={busy || available === false || !allRequired}
          className="w-full bg-gradient-to-r from-teal-500 to-purple-500 text-white font-bold py-3.5 text-lg rounded-lg hover:from-teal-600 hover:to-purple-600 hover:scale-[1.02] transform transition-all duration-200 disabled:opacity-60 disabled:pointer-events-none disabled:transform-none shadow-lg relative"
          aria-busy={busy}
        >
          {busy ? (
            <>
              <span className="opacity-0" aria-hidden="true">
                Processing…
              </span>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              </div>
            </>
          ) : (
            "Continue"
          )}
        </button>
      </form>
    </section>
  );
}
