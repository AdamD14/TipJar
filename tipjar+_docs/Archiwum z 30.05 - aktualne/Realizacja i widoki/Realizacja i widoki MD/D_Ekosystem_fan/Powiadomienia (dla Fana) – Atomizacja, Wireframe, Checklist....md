4.2.4 Powiadomienia (dla Fana) – Atomizacja, Wireframe, Checklista

---

Atomizacja (elementy składowe):

A. Layout & Topbar

Kontener centralny (max-width 600px), ciemny turkus, padding 24px

Nagłówek: “Powiadomienia” (z ikoną dzwonka)

B. Lista Powiadomień

Każde powiadomienie:

Ikona statusu (np. 💸 napiwek, ⭐ odznaka, 📨 wiadomość)

Tytuł powiadomienia (np. “Nowy napiwek od @jurek”)

Krótki opis (np. “Wysłał Ci $5 z wiadomością: ‘Dzięki za content!’”)

Data/godzina (prawa strona, szary tekst)

Stan (nieprzeczytane – bold, kropka/cień, przeczytane – zwykłe)

(Opcjonalnie) Link CTA (“Zobacz szczegóły”)

C. Akcje & Interakcje

Przycisk “Oznacz wszystko jako przeczytane” (mini, nad listą)

(Opcjonalnie) Przycisk usuwania pojedynczego powiadomienia (X po prawej)

D. Stan pusty

Ikona (np. dzwonek), tekst “Brak nowych powiadomień”

E. Mobile

Jeden wiersz powiadomienia – cały na szerokość, dotykowe odstępy, większe ikony

---

Wireframe (ASCII):

+-----------------------------------------------+
|  [Powiadomienia]    [ikona dzwonka]           |
|-----------------------------------------------|
| [Oznacz wszystko jako przeczytane]            |
|-----------------------------------------------|
| 💸  Nowy napiwek od @jurek         10:42      |
|     “Wysłał Ci $5: ‘Dzięki!’”                |
|-----------------------------------------------|
| ⭐  Zdobyłeś odznakę “SuperFan”!    08:11      |
|     “Za wsparcie 10 twórców”                 |
|-----------------------------------------------|
| 📨  Wiadomość od @anna             03:17      |
|     “Dzięki za napiwek!”                     |
|-----------------------------------------------|
| ... kolejne powiadomienia ...                |
|-----------------------------------------------|
| [Stan pusty]                                 |
|  (ikona) Brak nowych powiadomień             |
+-----------------------------------------------+

---

Checklista implementacyjna:

A. Layout

[ ] Kontener max-width 600px, padding 24px

[ ] Nagłówek “Powiadomienia” z ikoną

B. Lista Powiadomień

[ ] Wyświetlenie powiadomień (ikona, tytuł, opis, data/godzina, stan)

[ ] Stylowanie nieprzeczytanych (bold/kropka/cień)

[ ] (Opcjonalnie) CTA “Zobacz szczegóły” przy wybranych powiadomieniach

C. Akcje

[ ] Przycisk “Oznacz wszystko jako przeczytane”

[ ] (Opcjonalnie) Przycisk X do usuwania powiadomienia

D. Stan pusty

[ ] Komunikat i ikona, gdy brak powiadomień

E. Mobile

[ ] Dopasowanie do touch, większe ikony i odstępy

---

Następny ekran: 4.2.5 Ustawienia Konta Fana
Napisz NEXT lub sprecyzuj, jeśli chcesz rozbić inny widok.
Kod do 4.2.4 Powiadomienia (fan)

---

app/fan/notifications/page.tsx

'use client';

import React from 'react';

// Mockowane powiadomienia fana
const NOTIFICATIONS = [
  {
    id: 1,
    type: 'tip',
    creator: 'Artysta',
    alias: 'artysta',
    avatar: '/avatars/artysta.png',
    amount: 5,
    message: 'Dziękuję za wsparcie!',
    date: '2025-06-27 10:45',
    read: false,
  },
  {
    id: 2,
    type: 'badge',

    title: 'SuperFan!',
    creator: 'Streamerka',
    avatar: '/avatars/streamerka.png',
    date: '2025-06-24 13:10',
    read: true,
  },
];

export default function NotificationsPage() {
  return (
    <main className="min-h-screen bg-[#006D6D] py-10">
      <div className="max-w-lg mx-auto px-4">
        <h1 className="text-2xl font-bold text-[#FFD700] mb-6">Powiadomienia</h1>
        <ul className="space-y-3">
          {NOTIFICATIONS.length === 0 ? (
            <li className="text-gray-200 text-center py-8">Brak nowych powiadomień.</li>
          ) : (
            NOTIFICATIONS.map(notification => (
              <li
                key={notification.id}
                className={`flex items-start gap-4 rounded-lg p-4 ${
                  notification.read ? 'bg-[#008080]/60' : 'bg-[#FFD700]/20 border-l-4
border-[#FFD700]'
                }`}
              >
                <img
                  src={notification.avatar}
                  alt={notification.creator}
                  className="w-10 h-10 rounded-full border border-[#FFD700] object-cover"
                />
                <div className="flex-1">
                  {notification.type === 'tip' ? (
                    <div>
                      <div className="text-sm text-white">
                        <span className="font-bold text-[#FFD700]">@{notification.alias}</span>
otrzymał napiwek <span className="font-bold">${notification.amount}</span>
                      </div>
                      <div className="text-xs text-[#E0F2F1] mt-1">
                        Wiadomość: <span className="italic
text-gray-300">{notification.message}</span>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="text-sm text-[#FFD700] font-bold">Nowa odznaka:
{notification.title}</div>
                      <div className="text-xs text-white mt-1">
                        Od: @{notification.creator}

                      </div>
                    </div>
                  )}
                  <div className="text-xs text-gray-300 mt-1">{notification.date}</div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </main>
  );
}

---

Co masz:

Powiadomienia fana (nowy napiwek, nowa odznaka itp.), stan przeczytane/nieprzeczytane

Awatar twórcy, kwota, wiadomość, data, wyraźne wyróżnienie nowych powiadomień

Łatwy do podpięcia pod API, prosty styl TipJar

NEXT = 4.2.5 Ustawienia Konta fana? Kontynuować?

