Zrozumiano – będę rozbijał każdy punkt po kolei dokładnie jak dotychczas: atomy →
graficzny wireframe → szczegółowa checklista, bez kodowania, bez lania wody.

---

4.1.3 Rejestracja/Logowanie (Public Signup / Login Page)

---

Atomizacja (najmniejsze składniki interfejsu):

A. Układ główny

Centered card (frosted-glass effect), max width 420–450px, shadow, rounded

Ciemnoturkusowe tło strony (#003737)

B. Nagłówek i nawigacja

Tytuł: “Zaloguj się” / “Dołącz do TipJar”

Przełącznik: Taby – [Logowanie] [Rejestracja]

Logo TipJar u góry lub obok tytułu (gold/turkus)

C. Akcje logowania/rejestracji

Przycisk “Google” (z logo, duży, kolorystyka Google)

Przycisk “Twitch” (z logo, fiolet)

Separator (“lub”/“albo” z kreską)

Pola e-mail, hasło (z labelami, placeholderami, show/hide password)

Przycisk submit (“Zaloguj się” / “Zarejestruj” – gold, duży)

Link “Zapomniałeś hasła?”

D. Web3 login (opcjonalnie)

Przycisk “Zaloguj się przez Web3” (ikona portfela, mniejszy, szare tło)

E. Powiadomienia

Komunikaty błędów/walidacji (na czerwono nad przyciskiem)

Toast/alert po wysłaniu linku aktywacyjnego

Loading spinner na przycisku

F. Linki pomocnicze

Link “Nie masz konta? Zarejestruj się” (na logowaniu) / “Masz już konto? Zaloguj się” (na
rejestracji)

Link do regulaminu i polityki prywatności (stopka karty, mały tekst)

G. Mobile

Wszystko wyśrodkowane, elementy pełnej szerokości na ekranie <450px

---

ASCII Wireframe:

+-----------------------------------------------------+
|               [Logo TipJar+]                        |
|     [ Zaloguj się ]   [ Zarejestruj się ]           |
|  +---------------------------------------------+    |
|  |    [Google]     [Twitch]                    |    |
|  |        --- lub ---                          |    |
|  |  Email:    [___________]                    |    |
|  |  Hasło:    [____*_____]  [pokaż/ukryj]      |    |
|  |  [Zaloguj się / Zarejestruj] (gold, big)    |    |
|  |  [Zaloguj się przez Web3]                   |    |
|  |  [Zapomniałeś hasła?]                       |    |
|  |  [Błąd: nieprawidłowy email/hasło]          |    |
|  +---------------------------------------------+    |
|      [Nie masz konta? Zarejestruj się]              |
|  Regulamin • Polityka Prywatności (stopka)          |
+-----------------------------------------------------+

---

Checklista implementacyjna:

A. Layout

[ ] Centered, max-width 450px, rounded, shadow

[ ] Frosted-glass bg (bg-white/10, blur-sm, border-slate-700)

B. Header/nav

[ ] Logo TipJar

[ ] Taby [Logowanie] [Rejestracja], aktywna zakładka bold

C. Social/OAuth

[ ] Przycisk Google – działa, redirectuje do Google OAuth

[ ] Przycisk Twitch – działa, redirectuje do Twitch OAuth

D. Pola formularza

[ ] E-mail: input z validacją, typ email

[ ] Hasło: input typu password, toggle show/hide

[ ] Przycisk submit – złoty, szeroki, disabled w trakcie ładowania

E. Web3

[ ] Przycisk Web3 login – Metamask/SIWE, szary przycisk, info po kliknięciu

F. Komunikaty i obsługa błędów

[ ] Błędy walidacji – wyświetlane nad przyciskiem

[ ] Toast/alert po sukcesie rejestracji / odzyskiwania hasła

[ ] Link “Zapomniałeś hasła?” – przechodzi do resetu

G. Linki pomocnicze

[ ] “Nie masz konta? Zarejestruj się” (i odwrotnie)

[ ] Regulamin i Polityka Prywatności – na dole

H. Mobile UX

[ ] Wszystko w 1 kolumnie, elementy max szerokość, bez scrolla poziomego

---

'use client';

import React, { useState } from 'react';

export default function AuthPage() {
  const [tab, setTab] = useState<'login' | 'register'>('login');

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#006D6D]">
      <div className="w-full max-w-md mx-auto bg-[#003737]/80 backdrop-blur-lg
rounded-2xl shadow-2xl p-8 border border-[#008080]/30">
        <div className="flex justify-center mb-6">
          <img src="/assets/tipjar_logo.svg" alt="TipJar+" className="h-10" />
        </div>
        <div className="flex mb-8 bg-[#008080]/20 rounded-lg overflow-hidden">
          <button
            className={`flex-1 py-3 font-semibold transition ${tab === 'login' ? 'bg-[#FFD700]
text-[#003737]' : 'text-white hover:bg-[#008080]/30'}`}
            onClick={() => setTab('login')}
          >
            Zaloguj się
          </button>
          <button
            className={`flex-1 py-3 font-semibold transition ${tab === 'register' ? 'bg-[#FFD700]
text-[#003737]' : 'text-white hover:bg-[#008080]/30'}`}
            onClick={() => setTab('register')}
          >
            Zarejestruj się
          </button>
        </div>

        {/* Login */}
        {tab === 'login' && (
          <form className="space-y-6">
            <div>

              <label className="block mb-2 text-white font-semibold">Email</label>
              <input type="email" autoComplete="email" required className="w-full px-4 py-3
rounded-lg bg-[#003737]/60 border border-[#008080]/40 text-white placeholder-gray-300
focus:ring-2 focus:ring-[#FFD700]"/>
            </div>
            <div>
              <label className="block mb-2 text-white font-semibold">Hasło</label>
              <input type="password" autoComplete="current-password" required
className="w-full px-4 py-3 rounded-lg bg-[#003737]/60 border border-[#008080]/40
text-white placeholder-gray-300 focus:ring-2 focus:ring-[#FFD700]"/>
            </div>
            <button type="submit" className="w-full bg-[#FFD700] text-[#003737] font-bold
py-3 rounded-lg mt-2 hover:scale-105 transition">
              Zaloguj się
            </button>
            <div className="flex justify-between text-sm mt-2">
              <a href="#" className="text-[#FFD700] hover:underline">Nie pamiętasz
hasła?</a>
            </div>
            <div className="text-center my-4 text-[#D3D3D3]">lub</div>
            <div className="flex flex-col gap-3">
              <button type="button" className="flex items-center justify-center gap-3 bg-white
bg-opacity-20 hover:bg-opacity-30 rounded-lg py-2 font-semibold text-white transition">
                <img src="/assets/Google_Pay_Logo.svg" alt="Google" className="h-6" />
                Kontynuuj przez Google
              </button>
              <button type="button" className="flex items-center justify-center gap-3
bg-[#6441a5] bg-opacity-70 hover:bg-opacity-90 rounded-lg py-2 font-semibold text-white
transition">
                <img src="/assets/twitch.svg" alt="Twitch" className="h-6" />
                Kontynuuj przez Twitch
              </button>
              {/* Odkomentuj poniżej jeśli SIWE */}
              {/* <button type="button" className="flex items-center justify-center gap-3
bg-black/50 hover:bg-black/70 rounded-lg py-2 font-semibold text-white transition">
                <img src="/assets/metamask.svg" alt="Metamask" className="h-6" />
                Zaloguj przez portfel (Web3)
              </button> */}
            </div>
          </form>
        )}

        {/* Register */}
        {tab === 'register' && (
          <form className="space-y-6">
            <div>
              <label className="block mb-2 text-white font-semibold">Email</label>

              <input type="email" autoComplete="email" required className="w-full px-4 py-3
rounded-lg bg-[#003737]/60 border border-[#008080]/40 text-white placeholder-gray-300
focus:ring-2 focus:ring-[#FFD700]"/>
            </div>
            <div>
              <label className="block mb-2 text-white font-semibold">Hasło</label>
              <input type="password" autoComplete="new-password" required
className="w-full px-4 py-3 rounded-lg bg-[#003737]/60 border border-[#008080]/40
text-white placeholder-gray-300 focus:ring-2 focus:ring-[#FFD700]"/>
            </div>
            <div>
              <label className="block mb-2 text-white font-semibold">Powtórz hasło</label>
              <input type="password" required className="w-full px-4 py-3 rounded-lg
bg-[#003737]/60 border border-[#008080]/40 text-white placeholder-gray-300 focus:ring-2
focus:ring-[#FFD700]"/>
            </div>
            <button type="submit" className="w-full bg-[#FFD700] text-[#003737] font-bold
py-3 rounded-lg mt-2 hover:scale-105 transition">
              Zarejestruj się
            </button>
            <div className="text-center my-4 text-[#D3D3D3]">lub</div>
            <div className="flex flex-col gap-3">
              <button type="button" className="flex items-center justify-center gap-3 bg-white
bg-opacity-20 hover:bg-opacity-30 rounded-lg py-2 font-semibold text-white transition">
                <img src="/assets/Google_Pay_Logo.svg" alt="Google" className="h-6" />
                Zarejestruj przez Google
              </button>
              <button type="button" className="flex items-center justify-center gap-3
bg-[#6441a5] bg-opacity-70 hover:bg-opacity-90 rounded-lg py-2 font-semibold text-white
transition">
                <img src="/assets/twitch.svg" alt="Twitch" className="h-6" />
                Zarejestruj przez Twitch
              </button>
              {/* Odkomentuj poniżej jeśli SIWE */}
              {/* <button type="button" className="flex items-center justify-center gap-3
bg-black/50 hover:bg-black/70 rounded-lg py-2 font-semibold text-white transition">
                <img src="/assets/metamask.svg" alt="Metamask" className="h-6" />
                Zarejestruj przez portfel (Web3)
              </button> */}
            </div>
          </form>
        )}
      </div>
    </main>
  );
}
Checklist UX/UI:

Frosted glass panel (backdrop-blur-lg, bg-turkus z przezroczystością, border)

Przełącznik login/rejestracja

Oba tryby: email/hasło i logowanie przez Google/Twitch

Przyciski wyraźne, złoty akcent na CTA

Całość responsywna, mobilna, max-width 450 px, typografia Montserrat, przyciski
zaokrąglone

Możliwość podpięcia SIWE (portfel Web3)

Wyraźny podział na “lub” dla OAUTH/social

