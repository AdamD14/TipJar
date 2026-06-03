Świetnie. Zrobimy to profesjonalnie jak Streamlabs, tylko bez bloatu.

---

🔧 Edytor Nakładki dla Twórcy: /dashboard/overlay

Cel: pozwala twórcy wizualnie skonfigurować wygląd nakładki Live Feed i zapisać
ustawienia w DB.

---

🧩 Ustawienia personalizacji (przechowywane per creatorId)

Parametr

Typ

Zakres / Opcje

0.3 – 1.0

string  top-left, top-right, bottom-left, bottom-right

string  HEX lub wybór: darkTurquoise, black, transparent
string  HEX lub: white, gold, turquoise

position
opacity number
bgColor
textColor
durationSec  number
fontFamily
entryAnimation
specialEffectThreshold
specialEffectType
string  sparkle, confetti, glow, none
soundEffectUrl string  link do pliku dźwiękowego (opcjonalnie – np. mp3 z S3 lub
domyślnego folderu)

5 – 15 (czas wyświetlania tipa)
string  Open Sans, Montserrat, Comic Neue, Inter, System UI
string  slide-up, slide-in-left, fade-in, typewriter

number

50 USDC domyślnie, dowolna wartość

---

🧰 Komponent edytora (prosty układ UI)

Live Preview — renderuje nakładkę z aktualnymi ustawieniami (np. w iframe lub div)

Color Pickery — do tła, tekstu, obwódek

Range Slidery — do czasu trwania, przezroczystości

Selecty — wybór animacji i fontu

Upload lub URL do dźwięku — (można dać gotowe opcje + upload)

---

🔐 API i logika

GET /api/overlay/settings/:creatorId – pobiera zapisane ustawienia

POST /api/overlay/settings/:creatorId – zapisuje nowe ustawienia (z JWT auth)

LiveFeedOverlay na froncie korzysta z tych ustawień po załadowaniu

---

✅ Plan:

Krok 1: przygotuję overlaySettingsStore.ts w Zustand + interfejs OverlaySettings

Krok 2: utworzę komponent OverlayEditor.tsx z live preview

Krok 3: podłączymy API backendowe do pobierania i zapisywania

Potem zrobimy:

transparent version (tło rgba(0,0,0,0))

import/export ustawień

gotowe presety (np. „Minimal”, „Streamer Gold”, „Anime”)

---

Czekam na „NEXT” → zacznę od Zustand store i modelu danych OverlaySettings.

