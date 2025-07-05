"use client";
import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, Wallet } from "lucide-react";
import { FaTwitch } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa6";

export default function AuthForm() {
  const [tab, setTab] = useState<"creator" | "fan">("creator");
  const [showPwd, setShowPwd] = useState(false);
  const [showPwd2, setShowPwd2] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError("");
  };

  const validateForm = () => {
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      setError("All fields are required");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Enter a valid email address");
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    setError("");
    // Tu podłącz własny backend / API do rejestracji
    setTimeout(() => {
      setLoading(false);
      alert("Account created!");
    }, 1500);
  };

  const handleSocialLogin = async (provider: "google" | "twitch" | "web3") => {
    setLoading(true);
    setError("");
    try {
      // Tu wywołaj redirect do OAuth Twojego backendu lub zewnętrznej usługi
      window.location.href = `/api/auth/${provider}`; // przykładowa ścieżka do OAuth
    } catch (err) {
      setError("Social login failed");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-teal-700 to-purple-900 px-4">
      <div className="w-full max-w-md bg-teal-900/20 backdrop-blur-md border border-teal-400/20 rounded-2xl shadow-2xl p-2">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-r from-teal-500 to-purple-500 text-white px-4 py-3/2 rounded-xl font-bold text-xl shadow-lg flex items-center gap-3">
            <img src="/assets/icon-tipjarnone.svg" alt="TipJar+ icon" className="h-12" draggable={false} />
            tipjar.plus
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex mb-6 overflow-hidden rounded-xl border border-teal-400/30 bg-teal-900/20">
          <button
            className={`flex-1 py-2 font-semibold text-sm sm:text-base transition-all duration-200 ${
              tab === 'fan'
                ? 'bg-gradient-to-r from-teal-500 to-purple-500 text-white shadow-lg'
                : 'text-white hover:bg-teal-500/20'
            }`}
            onClick={() => setTab('fan')}
            type="button"
          >
            Register as a Fan
          </button>
          <button
            className={`flex-1 py-2 font-semibold text-sm sm:text-base transition-all duration-200 ${
              tab === 'creator'
                ? 'bg-gradient-to-r from-teal-500 to-purple-500 text-white shadow-lg'
                : 'text-white hover:bg-teal-500/20'
            }`}
            onClick={() => setTab('creator')}
            type="button"
          >
            Register as a Creator
          </button>
        </div>

        {/* Form */}
        <form className="space-y-2" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-white text-sm mb-2 font-medium">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-400 w-5 h-5" />
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-slate-900/60 border border-teal-400/40 rounded-lg pl-11 pr-4 py-3 text-white placeholder-gray-300 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition-all"
                placeholder="e.g. john@tipjar.plus"
              />
            </div>
          </div>

          <div className="relative">
            <label htmlFor="password" className="block text-white text-sm mb-2 font-medium">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-400 w-5 h-5" />
              <input
                id="password"
                name="password"
                type={showPwd ? 'text' : 'password'}
                required
                value={formData.password}
                onChange={handleInputChange}
                className="w-full bg-slate-900/60 border border-teal-400/40 rounded-lg pl-11 pr-12 py-3 text-white placeholder-gray-300 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition-all"
                placeholder="Enter your password"
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
          </div>

          <div className="relative">
            <label htmlFor="confirmPassword" className="block text-white text-sm mb-2 font-medium">
              Repeat password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-400 w-5 h-5" />
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showPwd2 ? 'text' : 'password'}
                required
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full bg-slate-900/60 border border-teal-400/40 rounded-lg pl-11 pr-12 py-3 text-white placeholder-gray-300 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition-all"
                placeholder="Repeat your password"
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
          </div>

          {error && (
            <div className="text-red-400 text-sm text-center bg-red-900/30 border border-red-500/50 rounded-lg p-3">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-teal-500 to-purple-500 text-white font-bold py-3 rounded-lg hover:from-teal-600 hover:to-purple-600 hover:scale-[1.02] transform transition-all duration-200 disabled:opacity-60 disabled:pointer-events-none shadow-lg"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Loading...
              </span>
            ) : (
              "Register"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="my-2 text-center text-white/60 text-sm relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/20"></div>
          </div>
          <div className="relative bg-teal-900/60 px-4">or</div>
        </div>

        {/* Social Login */}
        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={() => handleSocialLogin("google")}
            disabled={loading}
            className="flex items-center justify-center gap-3 bg-white/20 hover:bg-white/30 transition-all text-white font-semibold rounded-lg py-3 text-sm border border-white/10 hover:border-white/20 disabled:opacity-60"
          >
            <FaGoogle className="w-5 h-5" /> Continue with Google
          </button>
          <button
            type="button"
            onClick={() => handleSocialLogin("twitch")}
            disabled={loading}
            className="flex items-center justify-center gap-3 bg-purple-600/70 hover:bg-purple-600/90 transition-all text-white font-semibold rounded-lg py-3 text-sm border border-purple-500/30 hover:border-purple-400/50 disabled:opacity-60"
          >
            <FaTwitch className="w-5 h-5" /> Continue with Twitch
          </button>
          <button
            type="button"
            onClick={() => handleSocialLogin("web3")}
            disabled={loading}
            className="flex items-center justify-center gap-3 bg-black/40 hover:bg-black/60 transition-all text-white font-semibold rounded-lg py-3 text-sm border border-white/10 hover:border-white/20 disabled:opacity-60"
          >
            <Wallet className="w-5 h-5" /> Sign up with Wallet (Web3)
          </button>
        </div>

        {/* Footer Links */}
        <div className="text-center text-xs mt-4 text-white/50">
          <button
            type="button"
            className="underline decoration-dotted hover:text-white/80 transition-colors"
            onClick={() => alert("Terms of Service – coming soon")}
          >
            Terms of Service
          </button>
          {" · "}
          <button
            type="button"
            className="underline decoration-dotted hover:text-white/80 transition-colors"
            onClick={() => alert("Privacy Policy – coming soon")}
          >
            Privacy Policy
          </button>
        </div>
      </div>
    </main>
  );
}
