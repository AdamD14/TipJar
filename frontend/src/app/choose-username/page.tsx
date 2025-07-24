"use client";

import { useState, useEffect, useMemo } from "react"; // <<< Dodajemy import useMemo
import { useRouter } from "next/navigation";
import apiClient from "@/lib/apiClient";
import { useAuthStore } from "@/lib/stores/authStore";
import { User, Check } from "lucide-react";
import axios from "axios";

const ChooseUsernamePage = () => {
  const router = useRouter();

  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const role = user?.role;
  const country = user?.country || "PL";

  const [username, setUsername] = useState("");
  const [usernameStatus, setUsernameStatus] = useState<
    "checking" | "available" | "taken" | "invalid" | null
  >(null);
  const [consents, setConsents] = useState({
    terms: false,
    privacy: false,
    age: false,
    marketing: false,
    usTax: false,
    usTerms: false,
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isUSUser = country === "US";
  
  // <<< POPRAWKA: Używamy useMemo, aby wyrażenie regularne było tworzone tylko raz
  const usernameRegex = useMemo(() => /^[A-Za-z0-9_]{3,30}$/, []);

  useEffect(() => {
    if (!username) {
      setUsernameStatus(null);
      return;
    }

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      const trimmed = username.trim().toLowerCase();
      if (!usernameRegex.test(trimmed)) {
        setUsernameStatus("invalid");
        return;
      }
      try {
        setUsernameStatus("checking");
        const res = await apiClient.get(
          `/users/username-check?username=${trimmed}`,
          { signal: controller.signal },
        );
        setUsernameStatus(res.data.available ? "available" : "taken");
      } catch {
        setUsernameStatus(null);
      }
    }, 500);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [username, usernameRegex]);

  const allRequiredConsentsGiven =
    consents.terms &&
    consents.privacy &&
    consents.age &&
    (!isUSUser || (consents.usTax && consents.usTerms));

  const handleConsentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setConsents((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!usernameRegex.test(username) || usernameStatus !== "available") {
      setError("Username is invalid or already taken.");
      return;
    }
    if (!allRequiredConsentsGiven) {
      setError("Please accept all required terms to continue.");
      return;
    }

    try {
      setLoading(true);
      const payload = { username: username.trim(), consents: consents };
      await apiClient.post("/users/set-username", payload);

      if (user) {
        setUser({ ...user, username: username.trim() });
      }

      if (role === "CREATOR") {
        router.push("/choose-username/kyc");
      } else {
        router.push("/explore");
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        setError(
          err.response.data?.message ||
            "Failed to set username. Please try again.",
        );
      } else {
        setError("Network error. Please check your connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  const getUsernameStatusUI = () => {
    if (!username) return null;
    switch (usernameStatus) {
      case "checking":
        return <p className="text-yellow-400 text-xs mt-1">Checking...</p>;
      case "available":
        return <p className="text-green-400 text-xs mt-1">✅ Available!</p>;
      case "taken":
        return <p className="text-red-400 text-xs mt-1">❌ Already taken</p>;
      case "invalid":
        return (
          <p className="text-red-400 text-xs mt-1">
            Must be 3-30 letters, numbers, or underscores.
          </p>
        );
      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-black px-4 py-8">
      <div className="w-full max-w-md bg-teal-900/20 backdrop-blur-md border border-teal-400/20 rounded-2xl shadow-2xl p-6">
        <h1 className="text-white text-2xl font-bold text-center mb-6">
          Complete Your Profile
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="username"
              className="block text-white text-sm mb-2 font-medium"
            >
              Choose a unique username
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-400 w-5 h-5" />
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. your_cool_name"
                disabled={loading}
                required
                className="w-full bg-slate-900/60 border border-teal-400/40 rounded-lg pl-11 pr-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition-all"
              />
            </div>
            {getUsernameStatusUI()}
          </div>

          <div className="space-y-3 pt-2">
            <p className="text-white text-sm font-medium">
              Please review and accept:
            </p>
            {[
              { name: 'terms', label: 'I agree to the Terms of Service' },
              { name: 'privacy', label: 'I agree to the Privacy Policy' },
              { name: 'age', label: 'I confirm I am over 18 years old' },
              {
                name: 'marketing',
                label: 'I agree to receive marketing emails (optional)',
                optional: true,
              },
              ...(isUSUser
                ? [
                    {
                      name: 'usTax',
                      label: 'I certify I am a U.S. person for tax purposes',
                    },
                    {
                      name: 'usTerms',
                      label: 'I agree to US-specific disclosures',
                    },
                  ]
                : []),
            ].map((consent) => (
              <label
                key={consent.name}
                className="flex items-center gap-3 text-white/80 text-sm cursor-pointer"
              >
                <input
                  type="checkbox"
                  name={consent.name}
                  checked={consents[consent.name as keyof typeof consents]}
                  onChange={handleConsentChange}
                  disabled={loading}
                  className="hidden peer"
                />
                <span className="w-5 h-5 border-2 border-teal-400/60 rounded-md peer-checked:bg-teal-500 peer-checked:border-teal-500 flex items-center justify-center transition-all">
                  <Check className="w-4 h-4 text-white opacity-0 peer-checked:opacity-100" />
                </span>
                {consent.label}{' '}
                {!consent.optional && (
                  <span className="text-teal-400">*</span>
                )}
              </label>
            ))}
          </div>

          {error && (
            <div className="text-red-400 text-sm text-center bg-red-900/30 border border-red-500/50 rounded-lg p-3 mt-2">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={
              loading ||
              !allRequiredConsentsGiven ||
              usernameStatus !== 'available'
            }
            className="w-full bg-gradient-to-r from-teal-500 to-purple-500 text-white font-bold py-3 rounded-lg hover:from-teal-600 hover:to-purple-600 hover:scale-[1.02] transform transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none disabled:hover:scale-100 shadow-lg"
          >
            {loading ? 'Saving...' : 'Confirm and Continue'}
          </button>
        </form>
      </div>
    </main>
  );
};

export default ChooseUsernamePage;