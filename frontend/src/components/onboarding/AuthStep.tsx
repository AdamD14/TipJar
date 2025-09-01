"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Mail, Lock, Wallet } from "lucide-react";
import { SiweMessage } from "siwe";
import { useAccount, useConnect, useSignMessage, useChainId } from "wagmi";

import { useOnboardingStore } from '@/lib/stores/onboardingStore';
import apiClient from '@/lib/apiClient';
import { normalize } from '@/lib/api/errors';
import { API } from '@/lib/api-routes';
import { registerSchema, RegisterFormValues } from '@/lib/schemas/authSchema';

export default function AuthStep() {
  const router = useRouter();
  const [showPwd, setShowPwd] = useState(false);
  const [showPwd2, setShowPwd2] = useState(false);
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  const currentRole = useOnboardingStore((s) => s.role);
  const actions = useOnboardingStore((s) => s.actions);

  const { connectAsync, connectors } = useConnect();
  const { address, isConnected } = useAccount();
  const chainIdHook = useChainId();
  const { signMessageAsync } = useSignMessage();

  const methods = useForm<RegisterFormValues>({ resolver: zodResolver(registerSchema) });

  const onEmailSubmit = async (data: RegisterFormValues) => {
    setLoading(true);
    setApiError("");
    try {
      await apiClient.post('/auth/register', { email: data.email, password: data.password, role: currentRole });
      actions.setUserData({ email: data.email });
      actions.nextStep();
    } catch (err: unknown) {
      const { msg } = normalize(err as any);
      setApiError(msg || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider: "google" | "twitch") => {
    setLoading(true);
    const apiBase = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3001';
    const payload = JSON.stringify({ role: currentRole });
    const state = btoa(payload);
    const target = provider === 'google' ? API.AUTH.GOOGLE : API.AUTH.TWITCH;
    window.location.href = `${apiBase}${target}?state=${encodeURIComponent(state)}`;
  };

  const handleSiweRegister = async () => {
    setLoading(true);
    setApiError("");
    try {
      const connector = connectors.find((c) => c.id === 'injected') ?? connectors[0];
      let addr = address as string | undefined;
      let cid = chainIdHook as number | undefined;
      if (!isConnected) {
        const res = await connectAsync({ connector });
        // wagmi v2 returns accounts[] and chainId
        // @ts-ignore
        addr = (res?.accounts?.[0] as string) || addr;
        // @ts-ignore
        cid = (res?.chainId as number) ?? cid;
      }
      if (!addr || !cid) throw new Error('Wallet not connected');

      const nonceRes = await apiClient.post(`/auth/siwe/nonce`, { address: addr, role: currentRole });
      const { nonce } = nonceRes.data;

      const message = new SiweMessage({
        domain: window.location.host,
        address: addr,
        statement: "Sign in with Ethereum to TipJar+.",
        uri: window.location.origin,
        version: "1",
        chainId: cid,
        nonce,
      });

      const messageToSign = message.prepareMessage();
      const signature = await signMessageAsync({ message: messageToSign });

      const verifyRes = await apiClient.post('/auth/siwe/login', {
        message: messageToSign,
        signature,
        address: addr,
        chainId: cid,
        nonce
      });

      const { user, accessToken } = verifyRes.data;
      actions.setTokens({ accessToken });
      actions.setUserData({ email: user.email, walletAddress: user.providerId, username: user.displayName });
      router.push("/choose-username");
    } catch (err: unknown) {
      const { msg } = normalize(err as any);
      setApiError(msg || 'Web3 registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white">Create your account</h2>
        <p className="text-gray-400 mt-2">You are one step away from joining as a {currentRole === "CREATOR" ? "Creator" : "Fan"}.</p>
      </div>

      <div className="flex flex-col gap-3">
        <button type="button" onClick={() => handleSocialLogin("google")} disabled={loading} className="flex items-center justify-center gap-3 bg-white/20 hover:bg-white/30 transition-all text-white font-semibold rounded-lg py-3 text-sm border border-white/10 hover:border-white/20 disabled:opacity-60">
          <img src="/assets/google-original-logo.svg" alt="Google logo" className="w-5 h-5" />
          Continue with Google
        </button>
        <button type="button" onClick={() => handleSocialLogin("twitch")} disabled={loading} className="flex items-center justify-center gap-3 bg-purple-600/70 hover:bg-purple-600/90 transition-all text-white font-semibold rounded-lg py-3 text-sm border border-purple-500/30 hover:border-purple-400/50 disabled:opacity-60">
          <img src="/assets/twitch-logo.svg" alt="Twitch logo" className="w-5 h-5" />
          Continue with Twitch
        </button>
        <button type="button" onClick={handleSiweRegister} disabled={loading} className="flex items-center justify-center gap-3 bg-black/40 hover:bg-black/60 transition-all text-white font-semibold rounded-lg py-3 text-sm border border-white/10 hover:border-white/20 disabled:opacity-60">
          <Wallet className="w-5 h-5" /> Sign up with Wallet (Web3)
        </button>
      </div>

      <div className="my-6 text-center text-white/60 text-sm relative">
        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/20"></div></div>
        <div className="relative bg-gray-900 px-4 inline-block">or</div>
      </div>
      
      <FormProvider {...methods}>
        <form className="space-y-4" onSubmit={methods.handleSubmit(onEmailSubmit)}>
          <div>
            <label htmlFor="email" className="block text-white text-sm mb-2 font-medium">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-400 w-5 h-5" />
              <input id="email" type="email" placeholder="e.g. john@tipjar.plus" className="w-full bg-slate-900/60 border border-teal-400/40 rounded-lg pl-11 pr-4 py-3 text-white placeholder-gray-300 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition-all" {...methods.register("email")} />
            </div>
            {methods.formState.errors.email && <p className="text-red-400 text-xs mt-1 ml-1">{methods.formState.errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-white text-sm mb-2 font-medium">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-400 w-5 h-5" />
              <input id="password" type={showPwd ? 'text' : 'password'} placeholder="Enter your password" className="w-full bg-slate-900/60 border border-teal-400/40 rounded-lg pl-11 pr-12 py-3 text-white placeholder-gray-300 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition-all" {...methods.register("password")} />
              <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-teal-400 hover:text-teal-300" onClick={() => setShowPwd(!showPwd)}>
                {showPwd ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {methods.formState.errors.password && <p className="text-red-400 text-xs mt-1 ml-1">{methods.formState.errors.password.message}</p>}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-white text-sm mb-2 font-medium">Repeat password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-400 w-5 h-5" />
              <input id="confirmPassword" type={showPwd2 ? 'text' : 'password'} placeholder="Repeat your password" className="w-full bg-slate-900/60 border border-teal-400/40 rounded-lg pl-11 pr-12 py-3 text-white placeholder-gray-300 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition-all" {...methods.register("confirmPassword")} />
              <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-teal-400 hover:text-teal-300" onClick={() => setShowPwd2(!showPwd2)}>
                {showPwd2 ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {methods.formState.errors.confirmPassword && <p className="text-red-400 text-xs mt-1 ml-1">{methods.formState.errors.confirmPassword.message}</p>}
          </div>

          {apiError && <div className="text-red-400 text-sm text-center bg-red-900/30 border border-red-500/50 rounded-lg p-3">{apiError}</div>}

          <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-teal-500 to-purple-500 text-white font-bold py-3 rounded-lg hover:from-teal-600 hover:to-purple-600 hover:scale-[1.02] transform transition-all duration-200 disabled:opacity-60 disabled:pointer-events-none shadow-lg">
            {loading ? "Processing..." : "Register with Email"}
          </button>
        </form>
      </FormProvider>
    </div>
  );
}
