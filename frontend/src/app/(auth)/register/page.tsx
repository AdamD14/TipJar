'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords must match');
      return;
    }
    setLoading(true);
    try {
      // TODO: call registration API
    } catch {
      setError('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#003737]">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-slate-700">
        <div className="flex justify-center mb-6">
          <img src="/assets/tipjar_logo.svg" alt="TipJar+" className="h-10" />
        </div>
        <div className="flex mb-8 bg-[#008080]/20 rounded-lg overflow-hidden">
          <Link
            href="/login"
            className="flex-1 py-3 font-semibold text-white hover:bg-[#008080]/30 text-center"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="flex-1 py-3 font-semibold bg-[#FFD700] text-[#003737] text-center"
          >
            Register
          </Link>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col gap-3">
            <button type="button" className="flex items-center justify-center gap-3 bg-white/20 hover:bg-white/30 rounded-lg py-2 font-semibold text-white">
              <img src="/assets/Google_Pay_Logo.svg" alt="Google" className="h-6" />
              Register with Google
            </button>
            <button type="button" className="flex items-center justify-center gap-3 bg-[#6441a5]/70 hover:bg-[#6441a5]/90 rounded-lg py-2 font-semibold text-white">
              <img src="/assets/twitch.svg" alt="Twitch" className="h-6" />
              Register with Twitch
            </button>
          </div>
          <div className="text-center my-4 text-[#D3D3D3]">or</div>
          <div>
            <label className="block mb-2 text-white font-semibold">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-[#003737]/60 border border-[#008080]/40 text-white placeholder-gray-300 focus:ring-2 focus:ring-[#FFD700]"
            />
          </div>
          <div className="relative">
            <label className="block mb-2 text-white font-semibold">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-[#003737]/60 border border-[#008080]/40 text-white placeholder-gray-300 focus:ring-2 focus:ring-[#FFD700]"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute top-10 right-3 text-sm text-gray-400">
              {showPassword ? 'hide' : 'show'}
            </button>
          </div>
          <div className="relative">
            <label className="block mb-2 text-white font-semibold">Confirm Password</label>
            <input
              type={showConfirm ? 'text' : 'password'}
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-[#003737]/60 border border-[#008080]/40 text-white placeholder-gray-300 focus:ring-2 focus:ring-[#FFD700]"
            />
            <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute top-10 right-3 text-sm text-gray-400">
              {showConfirm ? 'hide' : 'show'}
            </button>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className={`w-full font-bold py-3 rounded-lg mt-2 transition ${
              loading ? 'bg-[#FFD700]/60 cursor-not-allowed' : 'bg-[#FFD700] hover:scale-105'
            }`}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
          <div className="text-center text-sm mt-4">
            Already have an account?{' '}
            <Link href="/login" className="text-[#FFD700] hover:underline">
              Login
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
