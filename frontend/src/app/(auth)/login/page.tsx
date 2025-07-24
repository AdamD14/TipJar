// app/login/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import apiClient from "@/lib/apiClient";
import { useAuthStore } from "@/lib/stores/authStore";

export default function LoginPage() {
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState(""); // State for displaying messages
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError("");
    if (message) setMessage(""); // Clear message on input change
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError("All fields are required");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Enter a valid email address");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const res = await apiClient.post("/auth/login", formData);
      const { user, accessToken } = res.data;
      setUser(user);
      setAccessToken(accessToken);
      if (user.role === "CREATOR") {
        router.push("/creator/dashboard");
      } else {
        router.push("/fan/dashboard");
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data?.message || "Login failed");
      } else {
        setError("Network error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider: "google" | "twitch") => {
    setLoading(true);
    const backendUrl = (process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:3001/api/v1").replace("/api/v1", "");
    window.location.href = `${backendUrl}/api/v1/auth/${provider}`;
  };

  // Function to display terms/privacy messages
  const showInfoMessage = (infoType: string) => {
    setMessage(`${infoType} – coming soon`);
    setError(""); // Clear any previous errors
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-teal-700 to-purple-900 px-4">
      <div className="w-full max-w-md bg-teal-900/20 backdrop-blur-md border border-teal-400/20 rounded-2xl shadow-2xl p-2">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-r from-teal-500 to-purple-500 text-white px-4 py-3/2 rounded-xl font-bold text-xl shadow-lg flex items-center gap-3">
            {/* Using a placeholder image for the icon as /assets/icon-tipjarnone.svg is not available */}
            <img src="https://placehold.co/48x48/003737/FFFFFF?text=TJ+" alt="TipJar+ icon" className="h-12 rounded-lg" draggable={false} />
            tipjar.plus
          </div>
        </div>

        <h2 className="text-2xl text-center mb-6 text-white font-bold">Login to TipJar+</h2>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
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

          {error && (
            <div className="text-red-400 text-sm text-center bg-red-900/30 border border-red-500/50 rounded-lg p-3">
              {error}
            </div>
          )}

          {message && (
            <div className="text-green-400 text-sm text-center bg-green-900/30 border border-green-500/50 rounded-lg p-3">
              {message}
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
              "Login"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="my-4 text-center text-white/60 text-sm relative">
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
            {/* Inline SVG for Google icon */}
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.0003 12.7233L16.2433 15.0113C15.6583 16.5913 14.3233 17.7233 12.0003 17.7233C9.09232 17.7233 6.64932 15.2803 6.64932 12.3723C6.64932 9.46432 9.09232 7.02132 12.0003 7.02132C13.6723 7.02132 14.9313 7.64532 15.7893 8.44132L18.0863 6.14432C16.3273 4.49832 14.0003 3.72332 12.0003 3.72332C6.72332 3.72332 2.37732 8.06932 2.37732 13.3463C2.37732 18.6233 6.72332 22.9693 12.0003 22.9693C17.2773 22.9693 21.6233 18.6233 21.6233 13.3463C21.6233 12.8363 21.5793 12.3363 21.5033 11.8463H12.0003V12.7233Z" fill="#4285F4"/>
              <path d="M21.5033 11.8463H12.0003V12.7233L16.2433 15.0113C15.6583 16.5913 14.3233 17.7233 12.0003 17.7233C9.09232 17.7233 6.64932 15.2803 6.64932 12.3723C6.64932 9.46432 9.09232 7.02132 12.0003 7.02132C13.6723 7.02132 14.9313 7.64532 15.7893 8.44132L18.0863 6.14432C16.3273 4.49832 14.0003 3.72332 12.0003 3.72332C6.72332 3.72332 2.37732 8.06932 2.37732 13.3463C2.37732 18.6233 6.72332 22.9693 12.0003 22.9693C17.2773 22.9693 21.6233 18.6233 21.6233 13.3463C21.6233 12.8363 21.5793 12.3363 21.5033 11.8463Z" fill="white" fillOpacity="0.01"/>
              <path d="M12 10.3233V14.3233H18.6C18.431 15.3533 17.781 16.2033 16.891 16.8433L12 12.7233V10.3233Z" fill="#FBBC04"/>
              <path d="M6.64932 12.3723C6.64932 10.9223 7.09932 9.60232 7.84932 8.52232L12 12.7233L10.327 14.3233L6.64932 12.3723Z" fill="#EA4335"/>
              <path d="M12.0003 7.02132C13.6723 7.02132 14.9313 7.64532 15.7893 8.44132L18.0863 6.14432C16.3273 4.49832 14.0003 3.72332 12.0003 3.72332C6.72332 3.72332 2.37732 8.06932 2.37732 13.3463C2.37732 14.6163 2.66432 15.7993 3.19032 16.8463L7.84932 12.7233L12.0003 7.02132Z" fill="#34A853"/>
            </svg>
            Sign in with Google
          </button>
          <button
            type="button"
            onClick={() => handleSocialLogin("twitch")}
            disabled={loading}
            className="flex items-center justify-center gap-3 bg-purple-600/70 hover:bg-purple-600/90 transition-all text-white font-semibold rounded-lg py-3 text-sm border border-purple-500/30 hover:border-purple-400/50 disabled:opacity-60"
          >
            {/* Inline SVG for Twitch icon */}
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.9 0L0 4.2V24H6.6V18.6H11.4L16.8 24V18.6H22.8V6.6H16.2V0H3.9ZM20.4 16.2H14.4V21.6L9 16.2H5.4V2.4H20.4V16.2Z"/>
              <path d="M15.6 7.8H17.4V13.2H15.6V7.8Z"/>
              <path d="M9 7.8H10.8V13.2H9V7.8Z"/>
            </svg>
            Sign in with Twitch
          </button>
        </div>

        {/* Footer Links */}
        <div className="text-center text-xs mt-4 text-white/50">
          <p className="text-center text-sm mt-4">
            Don't have an account?{' '}
            <Link
              href="/register"
              className="text-teal-400 hover:text-teal-300 transition-colors underline decoration-dotted"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
