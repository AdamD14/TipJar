# KROK 3/10 — PRZEBIEG „NA ŻYWO” (VIDEO) — ETAP 6/6

Krok 3/3 — Publikacja IG Reels + YouTube Shorts (sloty, opisy, UTM, telemetria)

1. IG Reels — przygotowanie i publikacja
2. Pliki:

Wideo: V1_FINAL_tipjar-plus_1080x1920_v1.0.1.mp4

Napisy: V1_SRT_tipjar-plus_tiktok_v1.0.1.srt (wgraj jako CC, jeśli IG pozwala; inaczej użyj wersji z burn-in)

Miniatura: V1_THUMB_tipjar-plus_1080x1920_v1.0.1.png

1. Ustawienia:

Widoczność: Public. Komentarze: On.

Muzyka: brak utworów z prawami, jeśli nie masz licencji.

Harmonogram (CEST): dziś 19:30 (okno 19:00–21:00).

1. Opis (caption, ≤ 220–300 znaków):

[Unverified] Doceniasz twórców? Wyślij napiwek w USDC – szybko i jasno na tipjar+.
Załóż profil i sprawdź, jak to działa. #creators

1 hashtag kluczowy; 1 CTA; bez CAPS/claimów.

Linki w opisie na IG są ograniczone — wstaw klikalny link w naklejce „Link” w Stories lub w bio.

1. Link (UTM) — komentarz przypięty u pierwszego widza/marki lub bio:
[https://tipjar.plus/?utm_source=instagram&utm_medium=reel&utm_campaign=launch2025](https://tipjar.plus/?utm_source=instagram&utm_medium=reel&utm_campaign=launch2025)
2. Overlay zgodnie z CTX (≤ 6 słów, kontrast AA):
„Doceniasz? Wyślij napiwek” → „Za dużo klików?” → „USDC • prosto” → „W kilka dotknięć” → „Załóż profil na tipjar.plus”
3. Checklist przed publikacją:
- [ ]  Długość ≤ 35 s; audio znormalizowane.
- [ ]  Miniatura i ALT gotowe.
- [ ]  1 CTA; 1 hashtag kluczowy.
- [ ]  UTM dostępny (bio/komentarz/story link).
- [ ]  Brak słów zakazanych/PII.

Telemetria (IG Reels) — zapisz do events_raw:

PUBLISH (po publikacji):

{"schema":"tipjar.telemetry.v1","event_id":"uuid","ts":"{{ISO CEST}}","type":"PUBLISH","plan_id":"PLAN-VIDEO-20250818-001","artifact_id":"V1_FINAL","channel":"video","locale":"pl","metrics":{"platform":"instagram","post_url":"{{URL}}"}}

ENGAGE (T+30 / T+120 min): dodać views, likes, comments, shares, ctr, retention_50.

Paragon do DAM:
dam://campaigns/launch2025/video/pl/2025/08/18/PUBLISH_RECEIPT_instagram_V1_FINAL.json (analogiczny do TikTok, z polami platform/post_url itd.)

---

1. YouTube Shorts — przygotowanie i publikacja
2. Pliki:

V1_FINAL_tipjar-plus_1080x1920_v1.0.1.mp4

Napisy: wgraj SRT lub użyj wersji z burn-in.

Miniatura: (opcjonalna dla Shorts), jeśli włączona: 1080×1920.

1. Ustawienia:

Widoczność: Public. Kategoria: „People & Blogs” lub właściwa.

Dodatkowe: ogranicz geoblokady; brak elementów prawnych/finansowych.

Harmonogram (CEST): jutro 12:30 (okno 12:00–15:00).

1. Tytuł (≤ 60 znaków):
USDC napiwki dla twórców — prosto na tipjar+
2. Opis (≤ 150–200 znaków):

[Unverified] Wyślij napiwek w USDC — prosto i jasno. Załóż profil twórcy na tipjar.plus.

1. Komentarz przypięty z UTM (klikalny):

[Unverified] ➜ [https://tipjar.plus/?utm_source=youtube&utm_medium=shorts&utm_campaign=launch2025](https://tipjar.plus/?utm_source=youtube&utm_medium=shorts&utm_campaign=launch2025)
FAQ: [https://tipjar.plus/help?utm_source=youtube&utm_medium=shorts&utm_campaign=launch2025](https://tipjar.plus/help?utm_source=youtube&utm_medium=shorts&utm_campaign=launch2025)

1. Tagi: 2–3 (np. USDC, creators, tipping).
2. Checklist przed publikacją:
- [ ]  Format pionowy, ≤ 35 s; CC/SRT gotowe.
- [ ]  Tytuł ≤ 60, opis z 1 CTA.
- [ ]  Komentarz przypięty z UTM.
- [ ]  Brak słów zakazanych/PII.

Telemetria (YouTube Shorts) — events_raw:

PUBLISH + ENGAGE (T+30 / T+120 min) — jak wyżej, platform:"youtube".

Paragon do DAM:
dam://campaigns/launch2025/video/pl/2025/08/18/PUBLISH_RECEIPT_youtube_V1_FINAL.json

---

1. Monitorowanie T+120 min (oba kanały)

KPI krótkoterminowe (Targety v1): CTR ≥ 2.0%, Video_Retention_50% ≥ 45%.

Eskalacja: jeśli którykolwiek wskaźnik < 60% targetu przez 120 min → uruchom SEV-3 (iteracja miniatury/caption/hook) wg playbooku incydentów.

Iteracje A/B (D+1): 1 zmiana naraz (miniatura lub lead overlay lub caption); FREEZE→publish→telemetria.

---

Kryteria zakończenia Kroku 3/3 (musi być „TAK”)

IG Reels opublikowany (Public, slot 19:30, UTM dostępny).

YouTube Shorts zaplanowany/opublikowany (Public, slot 12:30, komentarz przypięty).

PUBLISH_RECEIPT_* dla IG i YT zapisane w DAM.

PUBLISH/ENGAGE zdarzenia dodane dla obu platform (T+0/30/120).

---

Napisz „Dalej – Social (X/LinkedIn)” albo „Dalej – SEO” — przejdę do kolejnego procesu z gotowymi plikami i checklistami.

---

📌 Source & Verification of Response

[Unverified] — Instrukcje operacyjne i treści wzorcowe pochodzą z przewodnika kampanii; brak zewnętrznych źródeł.

[✓ Verified] — Zgodne z zasadami ADAM-MODE: etykietowanie, brak słów ryzykownych, minimalizacja PII, 1 CTA, UTM.

[Inference] — Godziny slotów i progi KPI to rozsądne wartości startowe i mogą wymagać kalibracji po pierwszych publikacjach.