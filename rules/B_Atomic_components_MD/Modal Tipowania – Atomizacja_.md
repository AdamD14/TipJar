Trzeci etap: Modal tipowania (Tip Modal) – atomizacja, wireframe, checklist.

---

1. Modal Tipowania – Atomizacja

A. Overlay:

Cały ekran, półprzezroczyste tło (#003737/80% opacity), zablokowane scrollowanie

B. Okno modalne (widget płatności):

Zaokrąglony kontener, szerokość max 400px na desktopie, pełna szerokość na mobile

Cień, backdrop-blur, border gold/white, padding duży (p-6)

C. Nagłówek:

Tytuł “Wyślij napiwek” (Montserrat Bold, złoty/white)

Podtytuł “dla [Nazwa Twórcy]” + avatar mini

D. Ustawianie kwoty:

Slider kwoty (min $1, max np. $100, step $1) – track złoty, thumb złoty, tło szare

Pole do wpisania kwoty ręcznie (input z walidacją, font-mono, border gold)

Szybkie przyciski: $1, $2, $5, $10 – duże, gold, state active po kliknięciu

E. Wiadomość dla twórcy (opcjonalne):

Textarea z placeholderem (“Dodaj wiadomość (opcjonalnie)”)

Limit znaków np. 140, licznik pozostałych

F. Wybór metody płatności:

Ikony: portfel (internal), portfel MetaMask, karta, Google Pay, Apple Pay

Każda ikona = select, podświetlenie po wyborze, pod tooltipem krótki opis (“płacisz bez
prowizji”, “karta: +3,5% fee”)

Jeśli internal wallet: wyświetl saldo fana (jeśli zalogowany)

G. Podsumowanie:

Wyliczenie kwoty, fee, finalnej wartości

Pokazanie “Twórca otrzyma: $X”

H. CTA:

Duży przycisk “Wyślij napiwek” (złoty, z efektem shine, loading spinner podczas submitu)

Jeśli wymaga podpisu transakcji w portfelu – wyświetl krótki opis/alert

I. Feedback:

Po sukcesie: ekran “Dziękujemy za wsparcie!”, animacja confetti/checkmark, podsumowanie
transakcji

Po błędzie: komunikat error (czerwony, przycisk spróbuj ponownie)

J. Zamknięcie modala:

X w rogu, klik poza modalem = zamyka

---

2. Wireframe ASCII: Modal Tipowania

+--------------------------------------------------------+
|    [X]                                                |
|    Wyślij napiwek    dla  [avatar][Nazwa Twórcy]       |
|                                                        |
|  Kwota:  [---$5---]  [slider]   [$1][$2][$5][$10]      |
|                                                        |
|  Wiadomość (opcjonalnie)                              |
|  [ textarea ...           (0/140) ]                    |
|                                                        |
|  Metoda płatności:                                    |
|   [INTERNAL][MetaMask][Google Pay][Apple Pay][Karta]   |
|   Saldo: $18.00                                       |

|                                                        |
|  Twórca otrzyma: $4.83   | Fee: $0.17                  |
|                                                        |
|   [ Wyślij napiwek ]                                   |
|                                                        |
|  [Komunikat sukcesu lub błędu po submit]               |
+--------------------------------------------------------+

---

3. Checklista implementacyjna (fragment po fragmencie):

A. Overlay

[ ] Full screen, bg: #003737/80%, z-index 50+

[ ] Scroll block na body

B. Modal

[ ] Max-w-sm, full-w na mobile, p-6, rounded-2xl, shadow-xl, border gold/white

[ ] Center (flex items-center justify-center min-h-screen)

C. Nagłówek

[ ] Tytuł, bold, gold/white, left

[ ] Avatar twórcy mini, nazwa, subheadline

D. Kwota

[ ] Slider: min 1, max 100, step 1, gold bar

[ ] Input kwoty: border gold, numeric only, font-mono

[ ] Przyciski quick tip: $1/$2/$5/$10, active state, hover effect

E. Wiadomość

[ ] Textarea, 140 znaków, licznik, border gold, placeholder

[ ] Walidacja max length

F. Metoda płatności

[ ] Ikony metod, grid/row, highlight selected, tooltip info

[ ] Saldo fana wyświetlone jeśli internal wallet

G. Podsumowanie

[ ] Fee wyliczony dynamicznie (3.5% lub inny), kwota netto dla twórcy

[ ] Komponent “Twórca otrzyma” (font-bold, gold), fee (smaller, szary)

H. CTA

[ ] Przycisk gold, efekt scale+shine, full-w, loading na submit

[ ] Disabled jeśli invalid

I. Feedback

[ ] Alert success (zielony/animacja), error (czerwony), focus na feedback

J. Zamknięcie

[ ] Ikona X (prawy górny róg), klik poza modalem zamyka

[ ] Esc key obsługuje zamknięcie

---

Komponenty React (propsy na poziomie atomu):

<TipModal /> (props: creator, isOpen, onClose)

<AmountSlider />

<QuickTipButtons />

<MessageTextarea />

<PaymentMethodSelector />

<TipSummary />

<SubmitTipButton />

<TipFeedback />

---

Napisz NEXT jeśli chcesz rozbicie kolejnej podstrony lub precyzyjne propsy/finalny kod
struktur!
Albo podaj co kodować w pierwszej kolejności.

