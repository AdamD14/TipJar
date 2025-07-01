'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      // TODO: wywołaj tu API logowania
    } catch {
      setError('Błąd logowania');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#003737]">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-slate-700">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src="/assets/tipjar_logo.svg" alt="TipJar+" className="h-10" />
        </div>

        {/* Taby */}
        <div className="flex mb-8 bg-[#008080]/20 rounded-lg overflow-hidden">
          <Link
            href="/login"
            className="flex-1 py-3 font-semibold bg-[#FFD700] text-[#003737] text-center"
          >
            Zaloguj się
          </Link>
          <Link
            href="/register"
            className="flex-1 py-3 font-semibold text-white hover:bg-[#008080]/30 text-center"
          >
            Zarejestruj się
          </Link>
        </div>

        {/* Formularz */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* OAuth */}
          <div className="flex flex-col gap-3">
            <button
              type="button"
              className="flex items-center justify-center gap-3 bg-white/20 hover:bg-white/30 rounded-lg py-2 font-semibold text-white"
            >
              <img src="/assets/Google_Pay_Logo.svg" alt="Google" className="h-6" />
              Kontynuuj przez Google
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-3 bg-[#6441a5]/70 hover:bg-[#6441a5]/90 rounded-lg py-2 font-semibold text-white"
            >
              <img src="/assets/twitch.svg" alt="Twitch" className="h-6" />
              Kontynuuj przez Twitch
            </button>
          </div>

          <div className="text-center my-4 text-[#D3D3D3]">lub</div>

          {/* E-mail */}
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

          {/* Hasło */}
          <div className="relative">
            <label className="block mb-2 text-white font-semibold">Hasło</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-[#003737]/60 border border-[#008080]/40 text-white placeholder-gray-300 focus:ring-2 focus:ring-[#FFD700]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-10 right-3 text-sm text-gray-400"
            >
              {showPassword ? 'ukryj' : 'pokaż'}
            </button>
          </div>

          {/* Błąd */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Wyślij */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full font-bold py-3 rounded-lg mt-2 transition ${
              loading ? 'bg-[#FFD700]/60 cursor-not-allowed' : 'bg-[#FFD700] hover:scale-105'
            }`}
          >
            {loading ? 'Logowanie...' : 'Zaloguj się'}
          </button>

          {/* Zapomniałeś hasła? */}
          <div className="flex justify-end text-sm">
            <Link href="/forgot-password" className="text-[#FFD700] hover:underline">
              Zapomniałeś hasła?
            </Link>
          </div>

          {/* Link do rejestracji */}
          <div className="text-center text-sm mt-4">
            <p className="text-white">
              Nie masz konta?{' '}
              <Link href="/register" className="text-[#FFD700] hover:underline">
                Zarejestruj się
              </Link>
            </p>
          </div>
        </form>

        {/* Stopka */}
        <p className="mt-6 text-center text-xs text-[#D3D3D3]">
          Korzystając akceptujesz{' '}
          <Link href="/terms" className="underline">
            Regulamin
          </Link>{' '}
          i{' '}
          <Link href="/privacy" className="underline">
            Politykę Prywatności
          </Link>.
        </p>
      </div>
    </main>
  );
}
