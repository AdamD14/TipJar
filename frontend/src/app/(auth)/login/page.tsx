'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export default function AuthPage() {
  const [tab, setTab] = useState<'login' | 'register'>('login');

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#006D6F]">
      <div className="w-full max-w-md mx-auto bg-[#004953]/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-[#006D6F]/30">
        {/* Nagłówek z logo i zakładkami */}
          <Image src="/assets/tipjar_logo.svg" alt="TipJar+" width={40} height={40} className="h-10 mr-4" />
          <Image src="/assets/tipjar_logo.svg" alt="TipJar+" width={40} height={40} className="h-10 mr-4" />
          <button
            className={`px-4 py-2 font-semibold ${tab === 'login' ? 'text-white' : 'text-[#006D6F]'}`}
            onClick={() => setTab('login')}
          >
            Zaloguj się
          </button>
          <button
            className={`px-4 py-2 ml-4 font-semibold ${tab === 'register' ? 'text-white' : 'text-[#006D6F]'}`}
            onClick={() => setTab('register')}
          >
            Dołącz do TipJar
          </button>
        </div>

        {/* Przyciski logowania społecznościowego */}
        <div className="space-y-4 mb-4">
          <button className="w-full py-2 rounded-lg border border-[#36454F] text-white bg-[#36454F]">
            {/* TODO: ikonka Google */}
            Kontynuuj z Google
          </button>
          <button className="w-full py-2 rounded-lg border border-[#301934] text-white bg-[#301934]">
            {/* TODO: ikonka Twitch */}
            Kontynuuj z Twitch
          </button>
        </div>

        {/* Separator */}
        <div className="flex items-center justify-center my-4">
          <span className="text-[#36454F]">--- lub ---</span>
        </div>

        {/* Formularz email/hasło */}
        <form>
          <div className="mb-4">
            <label className="block mb-1 text-white">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 rounded-md bg-[#36454F] text-white placeholder:text-[#94A3B8] border border-[#006D6F]"
              placeholder="Twój email"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-white">Hasło</label>
            <div className="relative">
              <input
                type="password"
                className="w-full px-3 py-2 rounded-md bg-[#36454F] text-white placeholder:text-[#94A3B8] border border-[#006D6F]"
                placeholder="Twoje hasło"
              />
              {/* TODO: Dodaj funkcję pokaż/ukryj hasło */}
              <button
                type="button"
                className="absolute top-2 right-2 text-white"
              >
                Pokaż
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-[#68246D] text-white font-bold rounded-lg"
          >
            {tab === 'login' ? 'Zaloguj się' : 'Zarejestruj'}
          </button>
        </form>

        {/* Link zapomnianego hasła */}
        {tab === 'login' && (
          <div className="text-center mt-4">
            <a href="#" className="text-[#006D6F] hover:underline">
              Zapomniałeś hasła?
            </a>
          </div>
        )}

        {/* Linki pomocnicze */}
        <div className="text-center mt-6 text-sm text-[#94A3B8]">
          {tab === 'login' ? (
            <p>
              Nie masz konta?{' '}
              <button className="text-[#006D6F] hover:underline" onClick={() => setTab('register')}>
                Zarejestruj się
              </button>
            </p>
          ) : (
            <p>
              Masz już konto?{' '}
              <button className="text-[#006D6F] hover:underline" onClick={() => setTab('login')}>
                Zaloguj się
              </button>
            </p>
          )}
          <p className="mt-2">
            <a href="#" className="hover:underline">
              Regulamin
            </a>{' '}
            •{' '}
            <a href="#" className="hover:underline">
              Polityka Prywatności
            </a>
          </p>
        </div>
    </main>
  );
}
