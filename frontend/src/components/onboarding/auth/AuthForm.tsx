"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import clsx from "clsx";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { normalize } from "@/lib/api/errors";
import { register as registerUser } from "@/lib/auth";
import { useRegistrationStore } from "@/lib/store/registrationStore";
import { registerSchema, RegisterFormValues } from "@/lib/schemas/authSchema";
import Input from "@/components/ui/forms/Input";
import Button from "@/components/ui/buttons/Button";
import Spinner from "@/components/ui/Spinner";

export default function AuthForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialRole = searchParams.get("role") === "FAN" ? "FAN" : "CREATOR";
  const [tab, setTab] = useState<"CREATOR" | "FAN">(initialRole);
  const [showPwd, setShowPwd] = useState(false);
  const [showPwd2, setShowPwd2] = useState(false);
  const [apiError, setApiError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { setRole, setUser, setTokens } = useRegistrationStore();

  const methods = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  useEffect(() => {
    setRole(tab);
  }, [setRole, tab]);

  const handleTabChange = (role: "CREATOR" | "FAN") => {
    if (loading) return;
    setTab(role);
    setRole(role);
  };

  const onEmailSubmit = async (data: RegisterFormValues) => {
    if (loading) return;
    setLoading(true);
    setApiError("");
    setMessage("");
    try {
      const response = await registerUser({
        email: data.email,
        password: data.password,
        role: tab,
      });

      const nextRole = response.user.role === "FAN" ? "FAN" : "CREATOR";

      setRole(nextRole);
      setUser({
        id: response.user.id,
        email: response.user.email ?? undefined,
        role: nextRole,
        username: response.user.username ?? undefined,
        hasCompletedRegistration: response.user.hasCompletedRegistration,
      });
      setTokens({ accessToken: response.accessToken });

      const hasUsername = Boolean(response.user.username);
      const completed = Boolean(response.user.hasCompletedOnboarding);
      const target = hasUsername && completed
        ? nextRole === "FAN"
          ? `/@${response.user.username}/fan-desktop/explore`
          : `/@${response.user.username}/creator/dashboard`
        : "/choose-username";

      router.replace(target);
      methods.reset();
    } catch (err: unknown) {
      const { code, msg } = normalize(err);
      if (code === 409) {
        router.push("/login");
      } else {
        setApiError(msg || "An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider: "google" | "twitch") => {
    if (loading) return;
    setLoading(true);

    const ORIGIN = (
      process.env.NEXT_PUBLIC_BACKEND_ORIGIN || "http://localhost:3001"
    ).replace(/\/+$/, "");

    const target =
      provider === "google" ? "/api/v1/auth/google" : "/api/v1/auth/twitch";

    const statePayload = {
      role: tab,
      timestamp: Date.now(),
    };
    const state = btoa(JSON.stringify(statePayload));

    window.location.href = `${ORIGIN}${target}?state=${encodeURIComponent(
      state,
    )}`;
  };

  const showInfoMessage = (infoType: string) => {
    setMessage(`${infoType} – coming soon`);
  };

  return (
    <div className="w-full max-w-md bg-surface-base backdrop-blur-md border border-white/[0.05] rounded-2xl shadow-2xl p-2">
      <div className="flex justify-center mb-6">
        <div className="bg-gradient-to-r from-teal-500 to-purple-500 text-text-ds-primary px-4 py-2 rounded-xl font-heading font-bold text-xl shadow-lg flex items-center gap-3">
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

      <div className="flex mb-6 overflow-hidden rounded-xl border border-white/[0.05] bg-teal-900/20">
        <Button
          type="button"
          variant="ghost"
          className={clsx(
            "flex-1 py-3 font-heading font-semibold text-base transition-all duration-200",
            tab === "FAN"
              ? "bg-gradient-to-r from-teal-500 to-purple-500 text-text-ds-primary shadow-lg"
              : "text-text-ds-secondary hover:bg-teal-500/20",
          )}
          onClick={() => handleTabChange("FAN")}
          disabled={loading}
        >
          Register as a Fan
        </Button>
        <Button
          type="button"
          variant="ghost"
          className={clsx(
            "flex-1 py-3 font-heading font-semibold text-base transition-all duration-200",
            tab === "CREATOR"
              ? "bg-gradient-to-r from-teal-500 to-purple-500 text-text-ds-primary shadow-lg"
              : "text-text-ds-secondary hover:bg-teal-500/20",
          )}
          onClick={() => handleTabChange("CREATOR")}
          disabled={loading}
        >
          Register as a Creator
        </Button>
      </div>

      <FormProvider {...methods}>
        <form
          className="space-y-2"
          onSubmit={methods.handleSubmit(onEmailSubmit)}
        >
          <div>
            <label
              htmlFor="email"
              className="block font-body text-base mb-2 font-medium text-text-ds-primary"
            >
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gold-400 w-5 h-5 pointer-events-none" />
              <input
                id="email"
                type="email"
                required
                className="w-full bg-teal-850 border border-white/[0.05] rounded-lg pl-11 pr-4 py-3 text-text-ds-primary text-base font-body placeholder-text-ds-tertiary focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-surface-app focus-visible:ring-offset-2 focus-visible:border-gold-400 outline-none transition-all"
                placeholder="e.g. john@tipjar.plus"
                {...methods.register("email")}
                disabled={loading}
              />
            </div>
            {methods.formState.errors.email && (
              <p className="text-error-light text-sm mt-1 ml-1 font-body">
                {methods.formState.errors.email.message}
              </p>
            )}
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="block font-body text-base mb-2 font-medium text-text-ds-primary"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gold-400 w-5 h-5 pointer-events-none z-20" />
              <input
                id="password"
                type={showPwd ? "text" : "password"}
                required
          className="w-full bg-teal-850 border border-white/[0.05] rounded-lg pl-11 pr-12 py-3 text-text-ds-primary text-base font-body placeholder-text-ds-tertiary focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-surface-app focus-visible:ring-offset-2 focus-visible:border-gold-400 outline-none transition-all"
          placeholder="Enter your password"
                {...methods.register("password")}
                disabled={loading}
              />
              <button
            type="button"
            
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gold-400 hover:text-gold-300 transition-colors"
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
            {methods.formState.errors.password && (
              <p className="text-error-light text-sm mt-1 ml-1 font-body">
                {methods.formState.errors.password.message}
              </p>
            )}
          </div>

          <div className="relative">
            <label
              htmlFor="confirmPassword"
              className="block font-body text-base mb-2 font-medium text-text-ds-primary"
            >
              Repeat password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gold-400 w-5 h-5 pointer-events-none z-20" />
              <input
                id="confirmPassword"
                type={showPwd2 ? "text" : "password"}
                required
          className="w-full bg-teal-850 border border-white/[0.05] rounded-lg pl-11 pr-12 py-3 text-text-ds-primary text-base font-body placeholder-text-ds-tertiary focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-surface-app focus-visible:ring-offset-2 focus-visible:border-gold-400 outline-none transition-all"
          placeholder="Repeat your password"
                {...methods.register("confirmPassword")}
                disabled={loading}
              />
              <button
            type="button"
            
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gold-400 hover:text-gold-300 transition-colors"
            onClick={() => setShowPwd2(!showPwd2)}
            aria-label={showPwd2 ? "Hide password" : "Show password"}
            disabled={loading}
          >
            {showPwd2 ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
            </div>
            {methods.formState.errors.confirmPassword && (
              <p className="text-error-light text-sm mt-1 ml-1 font-body">
                {methods.formState.errors.confirmPassword.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            variant="primary"
            fullWidth
            size="lg"
            loading={loading}
            disabled={loading}
          >
            Register
          </Button>

          {apiError && (
            <div className="text-error-light text-sm text-center bg-error-dark/30 border border-error-light/50 rounded-lg p-3 mt-4 font-body">
              {apiError}
            </div>
          )}
          {message && (
            <div className="text-gold-400 text-sm text-center bg-gold-400/10 border border-gold-400/40 rounded-lg p-3 mt-4 font-body">
              {message}
            </div>
          )}
        </form>
      </FormProvider>

      <div className="my-2 text-center text-text-ds-tertiary text-sm relative font-body">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/[0.05]" />
        </div>
        <div className="relative bg-teal-900/60 px-4">or</div>
      </div>

    
     <div className="flex flex-col gap-3">
      <Button
    type="button"
    variant="ghost"
    onClick={() => handleSocialLogin("google")}
    disabled={loading}
    className="flex items-center justify-center gap-3 bg-teal-850 hover:bg-teal-700 transition-all text-text-ds-primary font-heading font-semibold rounded-lg py-3.5 text-base border border-white/[0.05] hover:border-white/[0.10] disabled:opacity-60"
    leftIcon={<img src="/g_logo.svg" className="w-5 h-5" alt="Google" />}
  >
    Continue with Google
  </Button>
  
  <Button
    type="button"
    variant="ghost"
    onClick={() => handleSocialLogin("twitch")}
    disabled={loading}
    className="flex items-center justify-center gap-3 bg-purple-300 hover:bg-purple-200 transition-all text-text-ds-primary font-heading font-semibold rounded-lg py-3.5 text-base border border-white/[0.05] hover:border-white/[0.10] disabled:opacity-60"
    leftIcon={<img src="/t_logo.svg" className="w-5 h-5" alt="Twitch" />}
  >
    Continue with Twitch
  </Button>
</div>
      <div className="text-center text-xs mt-4 text-text-ds-tertiary font-body">
        <Button
          type="button"
          variant="link"
          size="sm"
          onClick={() => showInfoMessage("Terms of Service")}
        >
          Terms of Service
        </Button>
        {" · "}
        <Button
          type="button"
          variant="link"
          size="sm"
          onClick={() => showInfoMessage("Privacy Policy")}
        >
          Privacy Policy
        </Button>
      </div>
    </div>
  );
}
