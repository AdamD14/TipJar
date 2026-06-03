4.2.2 Portfel Fana / Wpłaty i Wypłaty

---

Atomizacja (elementy składowe, “atomy”):

A. Layout & Tło

Centralny kontener (max-width 650–750px), wyśrodkowany, padding

Tło: ciemny turkus (#003737) lub gradient

Nagłówek sekcji: “Twój Portfel” + ikona portfela/USDC (złota)

B. Panel Salda

Duży, wyraźny box z bieżącym saldem USDC

Obok mini-ikona USDC

(opcjonalnie) Pokazanie salda w EUR/USD jako orientacja (kurs z API)

Przycisk “Zasil portfel” (gold CTA)

Przycisk “Wypłać” (white border CTA)

C. Historia Transakcji

Lista transakcji w formie tabeli lub kart:

Typ: Wpłata / Wypłata / Napiwek

Data/godzina

Kwota (+/-), kolory: zielony wpłata, czerwony wypłata, złoty napiwek

Szczegóły: np. “Zasilenie portfela” / “Wysłano napiwek do @Twórca” / “Wypłata na 0x...”

Ikona USDC lub typ transakcji

D. Formularz/Widok “Zasil Portfel”

Modal z wyborem metody:

[ ] “Wpłać krypto” – generowany adres USDC fana (QR + kopiuje adres)

[ ] “Wpłać kartą” (jeśli Circle Payments API, przyszłość) – wejście do płatności kartą

Info o minimalnej kwocie/deadlinie (np. “Wpłata od 1 USDC, środki pojawią się po
potwierdzeniu transakcji”)

E. Formularz/Widok “Wypłać”

Modal do wpisania adresu zewnętrznego (EOA) i kwoty

Info o prowizji i czasie transferu (np. “Prowizja 3.5%, wypłata w ciągu kilku minut”)

Przycisk “Wyślij wszystko” (ułatwienie)

(opcjonalnie) Pokazanie historii wypłat poniżej

F. Mobile

Wszystko w jednej kolumnie, duże przyciski

Transakcje pod saldem, modale na pełen ekran

---

Wireframe (ASCII):

+-----------------------------------------------------------+
|     [Twój Portfel]        (ikona portfela)                |
|-----------------------------------------------------------|
|  [  7.45 USDC  ] [USDC logo]     [Zasil portfel] [Wypłać] |
|-----------------------------------------------------------|
|   Ostatnie transakcje                                     |
|   +-----------------+-----------------+----------+-------+|
|   | Typ             | Data             | Kwota    | Info  |
|   +-----------------+-----------------+----------+-------+|
|   | Wpłata          | 2024-06-25 10:15 | +15.00   | Krypto|
|   | Napiwek @X      | 2024-06-26 15:11 | -5.00    |       |
|   | Wypłata         | 2024-06-27 12:20 | -2.50    | 0x... |
|   +-----------------+-----------------+----------+-------+|
|                                                           |
|  [Zasilenie portfela] (modal po kliknięciu)               |

|    > Wpłać krypto: [adres] [QR] [Kopiuj]                  |
|    > Wpłać kartą (jeśli wdrożone)                         |
|                                                           |
|  [Wypłata środków] (modal po kliknięciu)                  |
|    > Wpisz adres EOA                                      |
|    > Kwota [ ] USDC   [Wyślij wszystko]                   |
|    > Info o prowizji i czasie                             |
+-----------------------------------------------------------+

---

Checklista implementacyjna:

A. Layout

[ ] Centralny kontener, padding, max-width 650–750px

[ ] Ciemnoturkusowe tło, nagłówek z ikoną

B. Panel Salda

[ ] Widoczny box z saldem USDC

[ ] Ikona USDC

[ ] Przyciski: “Zasil portfel” (gold), “Wypłać” (white border)

C. Historia Transakcji

[ ] Lista (tabela/karty) ostatnich transakcji z typem, datą, kwotą, opisem

[ ] Kolorowanie wg typu: zielony (+), czerwony (-), złoty (tip)

D. Modal Zasilenia

[ ] Modal z opcjami: Krypto (adres + QR + kopia), Karta (w przyszłości)

[ ] Info o min. kwocie i oczekiwaniu na potwierdzenie

E. Modal Wypłaty

[ ] Modal: adres EOA, pole kwoty, info o prowizji/czasie

[ ] Przycisk “Wyślij wszystko”

[ ] (opcjonalnie) Podsumowanie historii wypłat

F. Mobile

[ ] Responsywność: wszystkie sekcje w kolumnie, modale na full-screen

---

Następny ekran: 4.2.3 Obserwowani (Lista Twórców Wspieranych)
Napisz NEXT lub wybierz, co rozbić szerzej.

Kod do 4.2.2 Portfel Fana (Fan Wallet):

---

app/fan/wallet/page.tsx

'use client';

import React, { useState } from 'react';

const MOCK_BALANCE = 24.17; // przykładowe saldo USDC fana
const MOCK_TXS = [
  { id: 1, type: 'deposit', amount: 30, date: '2025-06-22 18:34', status: 'Zaksięgowano' },
  { id: 2, type: 'tip', amount: -5, date: '2025-06-24 10:11', status: 'Wysłano do @Streamerka' },
  { id: 3, type: 'withdraw', amount: -0.83, date: '2025-06-25 12:44', status: 'Opłata/fee' },
];

export default function FanWalletPage() {
  const [showDeposit, setShowDeposit] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);

  return (
    <main className="min-h-screen bg-[#006D6D] py-10">
      <div className="max-w-lg mx-auto px-4">
        <h1 className="text-2xl font-bold text-[#FFD700] mb-6">Twój Portfel</h1>
        <div className="bg-[#008080]/80 p-6 rounded-xl mb-8 flex flex-col gap-2 shadow-lg
border border-[#FFD700]/20">
          <span className="text-lg text-white font-semibold">Saldo USDC:</span>
          <span className="text-4xl font-mono text-[#FFD700]
mb-2">${MOCK_BALANCE.toFixed(2)} <span className="text-base
text-[#E0F2F1]">USDC</span></span>

          <div className="flex gap-3 mt-2">
            <button
              className="bg-[#FFD700] text-[#006D6D] font-bold rounded-lg px-4 py-2
hover:bg-[#B8860B] transition"
              onClick={() => setShowDeposit(true)}
            >
              Wpłać
            </button>
            <button
              className="bg-transparent border border-[#FFD700] text-[#FFD700] font-bold
rounded-lg px-4 py-2 hover:bg-[#FFD700]/20 transition"
              onClick={() => setShowWithdraw(true)}
            >
              Wypłać
            </button>
          </div>
        </div>

        {/* Historia transakcji */}
        <div className="mb-8">
          <h2 className="text-lg text-[#FFD700] font-semibold mb-2">Historia transakcji</h2>
          <ul className="space-y-2">
            {MOCK_TXS.map(tx => (
              <li key={tx.id} className="bg-[#003737]/70 rounded-md px-4 py-3 flex items-center
gap-3">
                <span className="text-xl">{tx.type === 'deposit' ? '➕' : tx.type === 'tip' ? '💸' :
'⬇'}</span>
                <div className="flex-1">
                  <div className="text-white">
                    {tx.type === 'deposit' && `Wpłata +$${tx.amount}`}
                    {tx.type === 'tip' && `Napiwek $${Math.abs(tx.amount)} wysłany`}
                    {tx.type === 'withdraw' && `Opłata $${Math.abs(tx.amount)}`}
                  </div>
                  <div className="text-xs text-gray-400">{tx.date} – {tx.status}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Modal: Wpłać */}
        {showDeposit && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-[#008080] p-8 rounded-lg shadow-xl w-full max-w-xs
text-center">
              <h3 className="text-lg font-bold text-[#FFD700] mb-4">Wpłać USDC</h3>
              <p className="text-white mb-3">Prześlij USDC na adres portfela lub skorzystaj z
on-ramp:</p>

              <div className="bg-[#003737] rounded p-3 text-sm text-[#E0F2F1] break-all mb-4
select-all">0xABCD...1234</div>
              {/* Możesz dodać komponent QR */}
              <button className="mt-2 text-white underline" onClick={() =>
setShowDeposit(false)}>Zamknij</button>
            </div>
          </div>
        )}

        {/* Modal: Wypłać */}
        {showWithdraw && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-[#008080] p-8 rounded-lg shadow-xl w-full max-w-xs
text-center">
              <h3 className="text-lg font-bold text-[#FFD700] mb-4">Wypłać USDC</h3>
              <p className="text-white mb-3">Wpisz adres zewnętrzny (np. MetaMask):</p>
              <input
                className="w-full rounded p-2 mb-4 text-[#003737]"
                placeholder="0x..."
                type="text"
              />
              <button className="bg-[#FFD700] text-[#006D6D] font-bold px-4 py-2 rounded-lg
w-full mb-2">Wyślij</button>
              <button className="text-white underline" onClick={() =>
setShowWithdraw(false)}>Zamknij</button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

---

Opis funkcji i elementów:

Wyraźny panel salda i transakcji USDC fana

Przycisk „Wpłać” (modal z adresem/QR), „Wypłać” (modal do podania adresu wypłaty)

Historia transakcji (napiwki, wpłaty, opłaty)

Gotowe podpięcie pod API, obecnie mock

Wszystko w stylu TipJar (turkus, złoto, Montserrat)

NEXT = 4.2.3 Obserwowani (lista obserwowanych twórców). Kontynuować?

