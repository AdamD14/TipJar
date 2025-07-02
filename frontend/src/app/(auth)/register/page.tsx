'use client';
import { useState } from 'react';
import Image from 'next/image';
import {
  FaGoogle,
  FaTwitch,
  FaWallet,
  FaEye,
  FaEyeSlash
} from 'react-icons/fa';

export default function Page() {
  const [tab, setTab] = useState<'login' | 'register'>('register');
  const [showPwd, setShowPwd] = useState(false);
  const [showPwd2, setShowPwd2] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setTimeout(() => {
      setLoading(false);
      // simulate backend
    }, 1500);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#003737] px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-sm border border-slate-700 rounded-2xl shadow-xl p-6">
        {/* Logo + Tab */}
        <div className="flex justify-center mb-4">
          <Image src="/assets/tipjar_logo.svg" alt="TipJar" width={100} height={40} />
        </div>

        <div className="flex mb-6 overflow-hidden rounded-lg border border-[#008080]/40">
          <button
            className={`flex-1 py-3 font-semibold text-sm sm:text-base transition ${
              tab === 'login'
                ? 'bg-[#FFD700] text-[#003737]'
                : 'text-white hover:bg-[#008080]/20'
            }`}
            onClick={() => setTab('login')}
          >
            Zaloguj się
          </button>
          <button
            className={`flex-1 py-3 font-semibold text-sm sm:text-base transition ${
              tab === 'register'
                ? 'bg-[#FFD700] text-[#003737]'
                : 'text-white hover:bg-[#008080]/20'
            }`}
            onClick={() => setTab('register')}
          >
            Zarejestruj się
          </button>
        </div>

        {/* Formularz */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-white text-sm mb-1">Email</label>
            <input
              type="email"
              required
              className="w-full bg-[#003737]/60 border border-[#008080]/40 rounded-lg px-4 py-2 text-white placeholder-gray-300 focus:ring-2 focus:ring-[#FFD700] outline-none"
              placeholder="np. jan@tipjar.pl"
            />
          </div>
          <div className="relative">
            <label className="block text-white text-sm mb-1">Hasło</label>
            <input
              type={showPwd ? 'text' : 'password'}
              required
              className="w-full bg-[#003737]/60 border border-[#008080]/40 rounded-lg px-4 py-2 pr-10 text-white placeholder-gray-300 focus:ring-2 focus:ring-[#FFD700] outline-none"
            />
            <span
              className="absolute right-3 top-[39px] text-[#FFD700] cursor-pointer"
              onClick={() => setShowPwd(!showPwd)}
            >
              {showPwd ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {tab === 'register' && (
            <div className="relative">
              <label className="block text-white text-sm mb-1">
                Powtórz hasło
              </label>
              <input
                type={showPwd2 ? 'text' : 'password'}
                required
                className="w-full bg-[#003737]/60 border border-[#008080]/40 rounded-lg px-4 py-2 pr-10 text-white placeholder-gray-300 focus:ring-2 focus:ring-[#FFD700] outline-none"
              />
              <span
                className="absolute right-3 top-[39px] text-[#FFD700] cursor-pointer"
                onClick={() => setShowPwd2(!showPwd2)}
              >
                {showPwd2 ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          )}

          {error && (
            <div className="text-red-400 text-sm text-center">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#FFD700] text-[#003737] font-semibold py-2 rounded-lg hover:scale-105 transition disabled:opacity-60 disabled:pointer-events-none"
          >
            {loading
              ? 'Ładowanie...'
              : tab === 'login'
              ? 'Zaloguj się'
              : 'Zarejestruj się'}
          </button>

          {tab === 'login' && (
            <div className="text-right text-sm">
              <a
                href="#"
                className="text-[#FFD700] hover:underline transition"
              >
                Zapomniałeś hasła?
              </a>
            </div>
          )}
        </form>

        {/* lub */}
        <div className="my-4 text-center text-[#D3D3D3] text-sm">lub</div>

        <div className="flex flex-col gap-3">
          <button className="flex items-center justify-center gap-3 bg-white/20 hover:bg-white/30 transition text-white font-semibold rounded-lg py-2 text-sm">
            <FaGoogle className="text-xl" /> Kontynuuj przez Google
          </button>
          <button className="flex items-center justify-center gap-3 bg-[#6441a5]/70 hover:bg-[#6441a5]/90 transition text-white font-semibold rounded-lg py-2 text-sm">
            <FaTwitch className="text-xl" /> Kontynuuj przez Twitch
          </button>
          <button className="flex items-center justify-center gap-3 bg-black/40 hover:bg-black/60 transition text-white font-semibold rounded-lg py-2 text-sm">
            <FaWallet className="text-xl" /> Zaloguj przez portfel (Web3)
          </button>
        </div>

        {/* Linki pomocnicze */}
        <div className="text-center mt-6 text-sm text-white/60">
          {tab === 'login' ? (
            <>
              Nie masz konta?{' '}
              <button
                className="text-[#FFD700] underline"
                onClick={() => setTab('register')}
              >
                Zarejestruj się
              </button>
            </>
          ) : (
            <>
              Masz już konto?{' '}
              <button
                className="text-[#FFD700] underline"
                onClick={() => setTab('login')}
              >
                Zaloguj się
              </button>
            </>
          )}
        </div>

        <div className="text-center text-xs mt-2 text-white/40">
          <a href="#" className="underline decoration-dotted hover:text-white">
            Regulamin
          </a>{' '}
          ·{' '}
          <a href="#" className="underline decoration-dotted hover:text-white">
            Polityka Prywatności
          </a>
        </div>
      </div>
    </main>
  );
}
