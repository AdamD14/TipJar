4.2.1 Feed Aktywności (Tablica Aktywności Fana)

---

Atomizacja (elementy składowe, “atomy”):

A. Layout i tło

Centralny kontener (max width 650–750px), wyśrodkowany, padding góra/dół

Tło: ciemny turkus lub gradient

Sekcja nagłówka z nazwą strony (np. “Twoja Aktywność”)

Ewentualny złoty akcent – pasek, ikonka

B. Sekcja “Aktywność” (feed)

Lista chronologiczna (“timeline”) ostatnich działań fana i jego twórców

Każdy wpis = blok/karta z:

Ikona aktywności (np. napiwek, podziękowanie, nowy post)

Tytuł/typ akcji: np. “Wysłałeś napiwek do @Twórca”

Szczegóły: kwota, data/godzina, opcjonalnie krótka wiadomość od twórcy

Mini-avatar twórcy (po prawej lub jako badge)

Oddzielenie dat (np. “Dziś”, “Wczoraj”, “W tym tygodniu”) – delikatny separator

C. Sugestie Twórców

Box pod feedem (“Możesz polubić” / “Propozycje do wsparcia”)

Karuzela lub 2–3 karty z profilami innych twórców (mini-avatar, nazwa, kategoria, “Wesprzyj”
gold CTA)

D. Panel Saldowy

(opcjonalnie, jeśli fan ma portfel) – box po prawej lub nad feedem

Informacja: “Twoje saldo w TipJar” + kwota USDC + mini ikona USDC

Przycisk “Zasil portfel”/“Dodaj środki” (jeśli funkcja aktywna)

E. Mobile

Feed na całą szerokość

Propozycje twórców pod spodem, nie obok

---

Wireframe (ASCII):

+---------------------------------------------------------+
|   [Twoja Aktywność]    (nagłówek, złota ikona)          |
|                                                         |
|  [Saldo: 8.95 USDC]  [Zasil portfel]                    |
|                                                         |
|  — Dzisiaj —                                            |
|   [•] Wysłałeś napiwek 5 USDC do @TwórcaX    [avatar]   |
|        “Dzięki za super stream!”        12:40            |
|   [•] Otrzymałeś podziękowanie od @TwórcaX   [avatar]   |
|        “Doceniam Twoje wsparcie!”         12:41          |
|                                                         |
|  — Wczoraj —                                            |
|   [•] Wysłałeś napiwek 3 USDC do @TwórcaY    [avatar]   |
|                                                         |
|  [Możesz polubić]                                       |
|  [@MuzykaPL][avatar][Wesprzyj] [@Gamerka][avatar][... ] |
+---------------------------------------------------------+

---

Checklista implementacyjna:

A. Layout

[ ] Max width 650–750px, padding góra/dół

[ ] Tło ciemnoturkusowe, delikatny gradient

[ ] Nagłówek: “Twoja Aktywność”, złota ikona

B. Feed Aktywności

[ ] Lista chronologiczna, każda karta:

Ikona aktywności

Tytuł/typ akcji (wysłałeś napiwek, podziękowanie, nowy post, badge)

Szczegóły: kwota, data, wiadomość (jeśli jest)

Mini-avatar twórcy

[ ] Separator “Dziś”, “Wczoraj”, “W tym tygodniu”

C. Propozycje Twórców

[ ] Box lub karuzela 2–3 profile, avatar, nazwa, kategoria, gold CTA “Wesprzyj”

D. Panel Saldowy (opcjonalnie)

[ ] Box z aktualnym saldem fana

[ ] Przycisk “Zasil portfel” (jeśli włączone)

E. Mobile

[ ] Feed full-width, propozycje pod spodem, duże przyciski

---

Następny ekran: 4.2.2 Portfel Fana / Wpłaty i Wypłaty
Napisz NEXT lub wybierz, co rozbić szerzej.

Kod do 4.2.1 Feed Aktywności (strona główna fana po zalogowaniu):

---

app/fan/feed/page.tsx

'use client';

import React from 'react';

// Mockowane dane przykładowe (do podpięcia pod API)
const FEED = [
  {
    id: 1,
    type: 'tip',
    msg: 'Wysłałeś napiwek $5 dla @Streamerka',
    date: '2025-06-27 13:11',
  },
  {
    id: 2,
    type: 'thanks',
    msg: '@Streamerka podziękowała za Twój napiwek!',
    date: '2025-06-27 13:12',
  },
  {
    id: 3,
    type: 'new-post',
    msg: '@Artysta dodał nowy post: "Nowa grafika na sprzedaż"',
    date: '2025-06-27 09:22',
  },
];

export default function FanFeedPage() {
  return (
    <main className="min-h-screen bg-[#006D6D] py-10">
      <div className="max-w-xl mx-auto px-4">
        <h1 className="text-2xl font-bold font-montserrat text-[#FFD700] mb-6">Twój Feed
Aktywności</h1>
        <p className="text-gray-200 mb-8">Wszystko, co ważne z Twoich wsparć i
obserwowanych twórców.</p>
        <div className="space-y-4">
          {FEED.map(event => (
            <div
              key={event.id}
              className="bg-[#008080]/70 rounded-lg p-4 flex items-center gap-4 border-l-4
border-[#FFD700]"
            >
              {/* Ikona zależna od typu */}
              <span className="text-2xl">
                {event.type === 'tip' && '💸'}
                {event.type === 'thanks' && '🙏'}
                {event.type === 'new-post' && '🖼'}
              </span>
              <div>
                <div className="text-white">{event.msg}</div>

                <div className="text-xs text-gray-400">{event.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

---

Co masz w tym kodzie:

Prosty feed fana: każde zdarzenie (napiwek, podziękowanie, nowy post) z ikoną i
timestampem

Stonowana turkusowo-złota paleta, pełna responsywność, Montserrat

Do podpięcia pod realne API i dynamiczne typy eventów (np. WebSocket lub REST)

Gotowy pod dodanie filtra (np. tylko napiwki/tylko nowości) lub paginację

NEXT = kod do 4.2.2 Portfel Fana. Lecę dalej?

