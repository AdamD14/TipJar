"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Mail, Lock, Wallet } from "lucide-react";
import { SiweMessage } from "siwe";
import { useConnect, useSignMessage } from "wagmi";
import { injected } from "wagmi/connectors";
import apiClient from "@/lib/apiClient";
import { registerSchema, RegisterFormValues } from "@/lib/schemas/authSchema";

// import { useAuthStore } from "@/lib/stores/authStore"; 

export default function AuthForm() {
  const router = useRouter();
  const [tab, setTab] = useState<'CREATOR' | 'FAN'>("CREATOR");
  const [showPwd, setShowPwd] = useState(false);
  const [showPwd2, setShowPwd2] = useState(false);
  const [apiError, setApiError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { connectAsync } = useConnect();
  const { signMessageAsync } = useSignMessage();

  const methods = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onEmailSubmit = async (data: RegisterFormValues) => {
    setLoading(true);
    setApiError("");
    setMessage("");
    try {
      await apiClient.post('/auth/register', {
        email: data.email,
        password: data.password,
        role: tab,
      });
      setMessage("Registration successful! Please check your email to verify your account.");
      methods.reset();
    } catch (err: any) {
      setApiError(err.response?.data?.message || "An unexpected error occurred during registration.");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider: "google" | "twitch") => {
    setLoading(true);
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
    window.location.href = `${backendUrl}/api/v1/auth/${provider}?role=${tab}`;
  };

  const handleSiweRegister = async () => {
    setLoading(true);
    setApiError("");
    setMessage("");
    try {
      const { address, chainId } = await connectAsync({ connector: injected() });
      if (!address) {
        throw new Error("Wallet connection was cancelled or failed. Please try again.");
      }

      const nonceRes = await apiClient.post(`/auth/siwe/nonce`, { address, role: tab });
      const { nonce } = nonceRes.data;

      const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement: "Sign in with Ethereum to TipJar+.",
        uri: window.location.origin,
        version: "1",
        chainId,
        nonce,
      });

      const messageToSign = message.prepareMessage();
      const signature = await signMessageAsync({ message: messageToSign });

      const verifyRes = await apiClient.post('/auth/siwe/login', {
        message: messageToSign,
        signature,
        address,
        chainId,
        nonce,
      });

      const { user, accessToken } = verifyRes.data;
      // useAuthStore.getState().login(user, accessToken);
      console.log("Login successful, token:", accessToken);

      router.push("/choose-username");

    } catch (err: any) {
      setApiError(err.response?.data?.message || err.message || "Web3 registration failed.");
    } finally {
      setLoading(false);
    }
  };

  const showInfoMessage = (infoType: string) => {
    setMessage(`${infoType} – coming soon`);
  };

  return (
    <div className="w-full max-w-md bg-teal-900/20 backdrop-blur-md border border-teal-400/20 rounded-2xl shadow-2xl p-2">
      <div className="flex justify-center mb-6">
        <div className="bg-gradient-to-r from-teal-500 to-purple-500 text-white px-4 py-2 rounded-xl font-bold text-xl shadow-lg flex items-center gap-3">
          <Image src="/assets/icon-tipjarnone.svg" alt="TipJar+ icon" width={48} height={48} className="h-12 w-auto" draggable={false} />
          tipjar.plus
        </div>
      </div>
      <div className="flex mb-6 overflow-hidden rounded-xl border border-teal-400/30 bg-teal-900/20">
        <button
          className={`flex-1 py-2 font-semibold text-sm sm:text-base transition-all duration-200 ${
            tab === 'FAN'
              ? 'bg-gradient-to-r from-teal-500 to-purple-500 text-white shadow-lg'
              : 'text-white hover:bg-teal-500/20'
          }`}
          onClick={() => setTab('FAN')}
          type="button"
        >
          Register as a Fan
        </button>
        <button
          className={`flex-1 py-2 font-semibold text-sm sm:text-base transition-all duration-200 ${
            tab === 'CREATOR'
              ? 'bg-gradient-to-r from-teal-500 to-purple-500 text-white shadow-lg'
              : 'text-white hover:bg-teal-500/20'
          }`}
          onClick={() => setTab('CREATOR')}
          type="button"
        >
          Register as a Creator
        </button>
      </div>

      <FormProvider {...methods}>
        <form className="space-y-2" onSubmit={methods.handleSubmit(onEmailSubmit)}>
          <div>
            <label htmlFor="email" className="block text-white text-sm mb-2 font-medium">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-400 w-5 h-5" />
              <input
                id="email"
                type="email"
                required
                className="w-full bg-slate-900/60 border border-teal-400/40 rounded-lg pl-11 pr-4 py-3 text-white placeholder-gray-300 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition-all"
                placeholder="e.g. john@tipjar.plus"
                {...methods.register("email")}
              />
            </div>
            {methods.formState.errors.email && <p className="text-red-400 text-xs mt-1 ml-1">{methods.formState.errors.email.message}</p>}
          </div>
          <div className="relative">
            <label htmlFor="password" className="block text-white text-sm mb-2 font-medium">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-400 w-5 h-5" />
              <input
                id="password"
                type={showPwd ? 'text' : 'password'}
                required
                className="w-full bg-slate-900/60 border border-teal-400/40 rounded-lg pl-11 pr-12 py-3 text-white placeholder-gray-300 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition-all"
                placeholder="Enter your password"
                {...methods.register("password")}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-teal-400 hover:text-teal-300 transition-colors"
                onClick={() => setShowPwd(!showPwd)}
                aria-label={showPwd ? 'Hide password' : 'Show password'}
              >
                {showPwd ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {methods.formState.errors.password && <p className="text-red-400 text-xs mt-1 ml-1">{methods.formState.errors.password.message}</p>}
          </div>
          <div className="relative">
            <label htmlFor="confirmPassword" className="block text-white text-sm mb-2 font-medium">Repeat password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-400 w-5 h-5" />
              <input
                id="confirmPassword"
                type={showPwd2 ? 'text' : 'password'}
                required
                className="w-full bg-slate-900/60 border border-teal-400/40 rounded-lg pl-11 pr-12 py-3 text-white placeholder-gray-300 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition-all"
                placeholder="Repeat your password"
                {...methods.register("confirmPassword")}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-teal-400 hover:text-teal-300 transition-colors"
                onClick={() => setShowPwd2(!showPwd2)}
                aria-label={showPwd2 ? 'Hide password' : 'Show password'}
              >
                {showPwd2 ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {methods.formState.errors.confirmPassword && <p className="text-red-400 text-xs mt-1 ml-1">{methods.formState.errors.confirmPassword.message}</p>}
          </div>

          {apiError && <div className="text-red-400 text-sm text-center bg-red-900/30 border border-red-500/50 rounded-lg p-3">{apiError}</div>}
          {message && <div className="text-green-400 text-sm text-center bg-green-900/30 border border-green-500/50 rounded-lg p-3">{message}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-teal-500 to-purple-500 text-white font-bold py-3 rounded-lg hover:from-teal-600 hover:to-purple-600 hover:scale-[1.02] transform transition-all duration-200 disabled:opacity-60 disabled:pointer-events-none shadow-lg"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </span>
            ) : "Register"}
          </button>
        </form>
      </FormProvider>

      <div className="my-2 text-center text-white/60 text-sm relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/20"></div>
        </div>
        <div className="relative bg-teal-900/60 px-4">or</div>
      </div>
      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={() => handleSocialLogin("google")}
          disabled={loading}
          className="flex items-center justify-center gap-3 bg-white/20 hover:bg-white/30 transition-all text-white font-semibold rounded-lg py-3 text-sm border border-white/10 hover:border-white/20 disabled:opacity-60"
        >
          <Image src="/assets/google-original-logo.svg" alt="Google logo" width={20} height={20} />
          Continue with Google
        </button>
        <button
          type="button"
          onClick={() => handleSocialLogin("twitch")}
          disabled={loading}
          className="flex items-center justify-center gap-3 bg-purple-600/70 hover:bg-purple-600/90 transition-all text-white font-semibold rounded-lg py-3 text-sm border border-purple-500/30 hover:border-purple-400/50 disabled:opacity-60"
        >
          <Image src="/assets/twitch-logo.svg" alt="Twitch logo" width={20} height={20} />
          Continue with Twitch
        </button>
        <button
          type="button"
          onClick={handleSiweRegister}
          disabled={loading}
          className="flex items-center justify-center gap-3 bg-black/40 hover:bg-black/60 transition-all text-white font-semibold rounded-lg py-3 text-sm border border-white/10 hover:border-white/20 disabled:opacity-60"
        >
          <Wallet className="w-5 h-5" /> Sign up with Wallet (Web3)
        </button>
      </div>
      <div className="text-center text-xs mt-4 text-white/50">
        <button type="button" className="underline decoration-dotted hover:text-white/80 transition-colors" onClick={() => showInfoMessage("Terms of Service")}>
          Terms of Service
        </button>
        {" · "}
        <button type="button" className="underline decoration-dotted hover:text-white/80 transition-colors" onClick={() => showInfoMessage("Privacy Policy")}>
          Privacy Policy
        </button>
      </div>
    </div>
  );
}