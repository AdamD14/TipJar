4.2.5 Ustawienia Konta Fana – Atomizacja, Wireframe, Checklista

---

Atomizacja (elementy składowe):

A. Layout & Topbar

Kontener max-width 540px, padding 24px, ciemny turkus

Nagłówek: “Ustawienia konta” (ikona ⚙ lub avatar fana)

B. Sekcje Ustawień

1. Dane profilu

Wyświetlana nazwa (input, np. “JurekFan123”)

E-mail (readonly jeśli OAuth, edytowalny jeśli rejestracja email)

(Opcjonalnie) Avatar – upload/zmień (może być placeholder)

2. Bezpieczeństwo

Zmień hasło (jeśli ma hasło, nie OAuth)

(Opcjonalnie) Lista powiązanych kont OAuth (Google/Twitch) – z możliwością
rozłączenia/podpięcia

3. Krypto / Portfele

Podłącz portfel (przycisk “Dodaj portfel Web3”, np. Metamask)

Lista podłączonych portfeli (adresy skrócone, możliwość usunięcia)

4. Preferencje

Przełączniki (checkbox):

Otrzymuj powiadomienia email (on/off)

Newsletter, newsy platformy (on/off)

5. Akcje

Przycisk “Zapisz zmiany” (CTA na dole)

(Opcjonalnie) Przycisk “Usuń konto” (danger zone, mały)

C. Mobile

Pola jedno pod drugim, CTA zawsze na dole, większe tap-area

---

Wireframe (ASCII):

+---------------------------------------------+
|   [Ustawienia konta]      [⚙ / avatar]     |
|---------------------------------------------|
| Dane profilu:                              |
|  Nazwa: [_____]                            |
|  E-mail: [_______]                         |
|  Avatar: (zdjęcie) [zmień]                 |
|---------------------------------------------|
| Bezpieczeństwo:                            |
|  [Zmień hasło]                             |
|  Powiązane konta:  Google ✓  Twitch ×      |
|---------------------------------------------|
| Krypto / Portfele:                         |
|  [Podłącz portfel]                         |
|  0x12ab...f90c  [usuń]                     |
|---------------------------------------------|
| Preferencje:                               |
|  [✓] Powiadomienia email                   |
|  [ ] Newsletter                            |
|---------------------------------------------|
| [Zapisz zmiany]      [Usuń konto]          |
+---------------------------------------------+

---

Checklista implementacyjna:

A. Layout

[ ] Kontener max-width 540px, padding 24px, ciemny turkus

[ ] Nagłówek “Ustawienia konta” z ikoną

B. Sekcje Ustawień

[ ] Dane profilu: edycja nazwy, e-mail, avatar (upload)

[ ] Bezpieczeństwo: zmiana hasła (jeśli dotyczy), lista kont OAuth

[ ] Portfele: podłączenie i usuwanie portfeli Web3

[ ] Preferencje: przełączniki powiadomień/newslettera

C. Akcje

[ ] Przycisk “Zapisz zmiany”

[ ] (Opcjonalnie) “Usuń konto” (danger zone)

D. Mobile

[ ] Pola jedno pod drugim, CTA zawsze na dole, większe tap-area

---

Następny ekran: 4.3.1 Creator Dashboard / Sidebar
Napisz NEXT lub wybierz inną sekcję do rozbicia.
Kod do 4.2.5 Ustawienia Konta Fana
(edycja profilu fana, zmiana e-maila/hasła, preferencje powiadomień, połączenie portfela)

---

app/fan/settings/page.tsx

'use client';

import React, { useState } from 'react';

export default function FanSettingsPage() {
  const [email, setEmail] = useState('fan@email.com');
  const [nick, setNick] = useState('fan123');
  const [notif, setNotif] = useState(true);
  const [wallet, setWallet] = useState('0x0...abc123');
  const [message, setMessage] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('Zmiany zapisane.');
    setTimeout(() => setMessage(''), 2000);
  };

  return (
    <main className="min-h-screen bg-[#006D6D] py-10">
      <div className="max-w-lg mx-auto bg-[#008080]/60 rounded-2xl p-6 shadow-lg">
        <h1 className="text-2xl font-bold text-[#FFD700] mb-6">Ustawienia konta</h1>
        <form onSubmit={handleSave} className="space-y-5">
          <div>
            <label className="block text-[#FFD700] font-semibold mb-1">Nick (do wyświetlania
przy napiwkach):</label>
            <input
              type="text"
              className="w-full rounded-lg px-3 py-2 bg-slate-900 text-white"
              value={nick}
              onChange={e => setNick(e.target.value)}
              maxLength={32}
              required
            />
          </div>
          <div>
            <label className="block text-[#FFD700] font-semibold mb-1">E-mail:</label>
            <input
              type="email"
              className="w-full rounded-lg px-3 py-2 bg-slate-900 text-white"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-[#FFD700] font-semibold mb-1">Połączony portfel
(EOA):</label>
            <input

              type="text"
              className="w-full rounded-lg px-3 py-2 bg-slate-900 text-white"
              value={wallet}
              readOnly
            />
            <button
              type="button"
              className="mt-2 px-4 py-2 rounded-lg bg-[#FFD700] text-[#006D6D] font-bold
hover:bg-[#B8860B] transition-all"
              // tutaj podpiąć logikę połączenia z MetaMask
            >
              Połącz portfel
            </button>
          </div>
          <div className="flex items-center gap-2">
            <input
              id="notif"
              type="checkbox"
              checked={notif}
              onChange={e => setNotif(e.target.checked)}
              className="accent-[#FFD700] scale-125"
            />
            <label htmlFor="notif" className="text-[#FFD700] font-semibold">
              Otrzymuj powiadomienia e-mail o nowych napiwkach/odznakach
            </label>
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-[#FFD700] text-[#006D6D] font-bold mt-2
hover:bg-[#B8860B] transition-all"
            >
              Zapisz zmiany
            </button>
            {message && <p className="text-green-400 text-center mt-2">{message}</p>}
          </div>
        </form>
      </div>
    </main>
  );
}

---

Co masz:

Edycja nicku, e-maila, preferencji powiadomień (checkbox), podgląd i przycisk podpięcia
portfela, UX pod TipJar

Czytelny, mobile-first, stylistyka spójna z całym MVP

Gotowe do integracji z API (trzymane w stanie, symulacja zapisu)

Następny ekran – 4.3.1 Sidebar (Creator Dashboard)?
Potwierdź lub wskaż kolejną podstronę.

