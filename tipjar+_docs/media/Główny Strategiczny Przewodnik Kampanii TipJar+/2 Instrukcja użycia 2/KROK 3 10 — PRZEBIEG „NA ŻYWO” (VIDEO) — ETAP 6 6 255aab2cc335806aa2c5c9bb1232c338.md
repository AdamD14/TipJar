# KROK 3/10 — PRZEBIEG „NA ŻYWO” (VIDEO) — ETAP 6/6

Krok 2/3 — Publikacja na TikTok (ustawienia, opis, slot, telemetria)

Wykonaj dokładnie poniższe kroki. Nie przechodzę dalej bez Twojej zgody.

---

1. Przygotuj pliki do uploadu

Wideo: V1_FINAL_tipjar-plus_1080x1920_v1.0.1.mp4 (z Kroku 1/3).

Napisy: V1_SRT_tipjar-plus_tiktok_v1.0.1.srt (CC jako osobny plik).

Miniatura: V1_THUMB_tipjar-plus_1080x1920_v1.0.1.png.

---

1. Ustawienia publikacji (TikTok)

Widoczność: Public.

Komentarze: On.

Duet/Remix: Off (domyślna polityka brandu; zmień tylko jeśli wymagane).

Automatyczne napisy (CC): On (dodatkowo wgraj własny plik SRT).

Kolejność napisów: platformowe CC + dołączony SRT (oba aktywne).

Harmonogram (CEST): zaplanuj na dziś 18:30 (okno 18:00–21:00 zgodnie z playbookiem).

---

1. Opis wideo (caption) — szablon

Skopiuj, uzupełnij link w bio i wstaw UTM w komentarzu przypiętym (patrz punkt 4).

[Unverified] Doceniasz twórców? Wyślij napiwek w USDC – szybko i jasno na tipjar+. Załóż profil i sprawdź, jak to działa. #USDC #creators

Długość: 100–150 znaków.

Hashtagi: max 2 (np. #USDC #creators).

CTA w opisie: krótkie (1 szt.).

Uwaga: linki w opisie mogą nie być klikalne — właściwy link w komentarzu przypiętym (poniżej).

---

1. Komentarz przypięty (z UTM)

Wstaw i przypnij pierwszy komentarz:

[Unverified] Startujemy! ➜ [https://tipjar.plus/?utm_source=tiktok&utm_medium=short&utm_campaign=launch2025](https://tipjar.plus/?utm_source=tiktok&utm_medium=short&utm_campaign=launch2025)
FAQ: [https://tipjar.plus/help?utm_source=tiktok&utm_medium=short&utm_campaign=launch2025](https://tipjar.plus/help?utm_source=tiktok&utm_medium=short&utm_campaign=launch2025)

---

1. Tekst overlay (zgodny z CTX)

0–3s: „Doceniasz? Wyślij napiwek”

3–8s: „Za dużo klików?”

8–20s: „USDC • prosto”

20–28s: „W kilka dotknięć”

28–35s: „Załóż profil na tipjar.plus”

(Każdy overlay ≤ 6 słów; kontrast AA.)

---

1. Lista kontrolna przed kliknięciem „Publish”
- [ ]  Wideo ≤ 35 s; dźwięk znormalizowany.
- [ ]  SRT wgrany; CC On.
- [ ]  Miniatura ustawiona; czytelny kadr.
- [ ]  Opis: 1 CTA, ≤ 2 hashtagi.
- [ ]  Komentarz przypięty zawiera klikalny link z UTM.
- [ ]  Harmonogram: dziś 18:30 CEST.

---

1. Telemetria po publikacji (T+0/T+30/T+120 min)

Utwórz wpisy events_raw (wg tipjar.telemetry.v1):

{
"schema":"tipjar.telemetry.v1",
"event_id":"uuid",
"ts":"{{czas publikacji ISO CEST}}",
"type":"PUBLISH",
"plan_id":"PLAN-VIDEO-20250818-001",
"artifact_id":"V1_FINAL",
"channel":"video",
"locale":"pl",
"metrics":{"platform":"tiktok","post_url":"{{URL}}"}
}

T+30 i T+120 min dodaj ENGAGE z metrykami:

{
"schema":"tipjar.telemetry.v1",
"event_id":"uuid",
"ts":"{{T+30/T+120 ISO}}",
"type":"ENGAGE",
"plan_id":"PLAN-VIDEO-20250818-001",
"artifact_id":"V1_FINAL",
"channel":"video",
"locale":"pl",
"metrics":{
"views": {{liczba}},
"likes": {{liczba}},
"comments": {{liczba}},
"shares": {{liczba}},
"ctr": {{ułamek}},
"retention_50": {{ułamek}}
}
}

---

1. Moderacja i reakcje (slot on-call)

Odpowiadaj na top-komentarze w ≤ 60 min.

Pytania produktowe → link do Help Center.

Sygnały ryzyka (język, zgłoszenia) → eskalacja do #community.

---

1. Zrzut publikacji do DAM (paragon)

Dodaj plik:

dam://campaigns/launch2025/video/pl/2025/08/18/PUBLISH_RECEIPT_tiktok_V1_FINAL.json

Treść (uzupełnij):

{
"platform": "tiktok",
"plan_id": "PLAN-VIDEO-20250818-001",
"published_at": "{{ISO CEST}}",
"post_url": "{{URL}}",
"caption_hash_sha256": "{{hex}}",
"comment_pinned": true,
"assets": ["V1_FINAL_tipjar-plus_1080x1920_v1.0.1.mp4","V1_SRT_tipjar-plus_tiktok_v1.0.1.srt","V1_THUMB_tipjar-plus_1080x1920_v1.0.1.png"]
}

---

Kryteria zakończenia Kroku 2/3 (musi być „TAK”)

Film zaplanowany/opublikowany (Public, CC On, miniatura ustawiona).

Opis zgodny, komentarz przypięty z UTM działa.

Wpisy telemetrii PUBLISH/ENGAGE dodane.

PUBLISH_RECEIPT_tiktok_*.json w DAM.

---

Jeśli skończone, napisz „Dalej” — przejdę do Kroku 3/3 (IG Reels + YouTube Shorts + monitoring T+120 min, z gotowymi szablonami opisów i checklistą).

---

📌 Source & Verification of Response

[Unverified] — Instrukcja i szablony publikacji oparte na wewnętrznym playbooku; brak zewnętrznych źródeł.

[✓ Verified] — Zgodność z ADAM-MODE: etykietowanie, brak słów ryzykownych, minimalizacja PII, 1 CTA.

[Inference] — Ustawienia Duet/Remix, harmonogram i długości opisów to praktyczne wartości startowe; można je dostosować do polityki kanału.