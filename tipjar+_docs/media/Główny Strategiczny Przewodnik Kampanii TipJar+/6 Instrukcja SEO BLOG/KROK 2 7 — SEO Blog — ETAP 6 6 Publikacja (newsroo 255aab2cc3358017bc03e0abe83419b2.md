# KROK 2/7 — SEO/Blog — ETAP 6/6: Publikacja (newsroom/blog + landing) + monitoring T+120 min

Cel etapu: opublikować zaakceptowane artefakty BLOG_PL, BLOG_EN, LANDING_PL z FREEZE v1.0.1, wdrożyć META_PACK i SCHEMA_PACK, uruchomić telemetrię i monitoring. Strefa czasu: Europe/Brussels (CEST).

---

A) Przygotowanie (z FREEZE v1.0.1)

Pliki treści: BLOG_PL_v1.0.1.md, BLOG_EN_v1.0.1.md, LANDING_PL_v1.0.1.md.

Pakiety: META_PACK_v1.0.1.json, SCHEMA_PACK_v1.0.1.json, INTERNAL_LINKS_v1.0.1.md.

KV/OG: OG_image_1200x630_v1.0.0.* (publiczne), ALT ≤ 120 znaków.

Zasady ADAM-MODE: [Unverified] na początku treści MD, 1 CTA, brak PII, brak słów ryzykownych.

---

B) Publikacja — BLOG_PL (newsroom/blog PL)

1. Front-matter (w CMS/Hugo/Next itp.) — uzupełnij z META_PACK:

title: "Napiwki w USDC dla twórców — prosto z tipjar+"
description: "Doceniaj twórców w kilku dotknięciach. Zobacz, jak działa prosty przepływ napiwków w USDC w tipjar+."
slug: "usdc-napiwki-tipjar-plus"
date: "2025-08-18T12:45:00+02:00"
lastmod: "2025-08-18T12:45:00+02:00"
lang: "pl"
tags: ["twórcy", "USDC", "tipjar+"]
og_image: "OG_image_1200x630_v1.0.0.png"
canonical: "[https://tipjar.plus/pl/blog/usdc-napiwki-tipjar-plus](https://tipjar.plus/pl/blog/usdc-napiwki-tipjar-plus)"

1. Treść: wklej BLOG_PL_v1.0.1.md (bez zmian).
2. Schema (JSON-LD): z SCHEMA_PACK (pozycja Article PL) w <script type="application/ld+json">.
3. Linkowanie wewnętrzne: zgodnie z INTERNAL_LINKS (3–5 linków; UTM do produktu/pomocy).
4. Slot publikacji: dziś 12:45 CEST.
5. Paragon DAM:
dam://campaigns/launch2025/seo/pl/2025/08/18/PUBLISH_RECEIPT_blog_pl.json

{"platform":"blog","plan_id":"PLAN-SEO-20250818-001","published_at":"{{ISO CEST}}","post_url":"{{URL}}","caption_hash_sha256":"{{sha256(blog_pl)}}"}

---

C) Publikacja — BLOG_EN (newsroom/blog EN)

1. Front-matter z META_PACK.blog_en; lang: "en", slug: "usdc-tipping-for-creators".
2. Treść: BLOG_EN_v1.0.1.md.
3. Schema: Article EN (z SCHEMA_PACK).
4. Linkowanie: 3–5 kotwic, UTM.
5. Slot publikacji: dziś 13:15 CEST.
6. Paragon DAM:
dam://campaigns/launch2025/seo/en/2025/08/18/PUBLISH_RECEIPT_blog_en.json.

---

D) Publikacja — LANDING_PL

1. Ścieżka URL: /pl/landing/tipjar-plus/ (lub analogiczna).
2. Front-matter/meta: użyj META_PACK.landing_pl. Dodaj:

noindex: false
robots: "index,follow"

1. Treść: LANDING_PL_v1.0.1.md (1 CTA w sekcji hero).
2. Mini-FAQ (opcjonalne): możesz dodać 2–3 Q/A; zgodne z FAQPage (jeśli rozszerzasz SCHEMA_PACK).
3. Techniczne: lazy-load obrazów, kompresja WebP, sprawdź LCP < 2.5 s (test lokalny).
4. Slot publikacji: dziś 14:00 CEST.
5. Paragon DAM:
dam://campaigns/launch2025/seo/pl/2025/08/18/PUBLISH_RECEIPT_landing_pl.json.

---

E) Mapy witryny i indeksacja (operacyjne)

Zaktualizuj sitemap.xml (sekcje: /pl/blog/, /en/blog/, /pl/landing/).

Dodaj lastmod dla nowych URL.

(Jeśli używasz Search Console) — wykonaj zgłoszenie nowych URL (operacyjnie).

---

F) Telemetria — zapisy T+0 / T+30 / T+120 min (on-site)

T+0 PUBLISH (każdy URL):

{"schema":"tipjar.telemetry.v1","event_id":"uuid","ts":"{{ISO CEST}}","type":"PUBLISH","plan_id":"PLAN-SEO-20250818-001","channel":"seo","platform":"blog|landing","locale":"pl|en","metrics":{"url":"{{URL}}"}}

T+30 / T+120 ENGAGE (on-site):

{"schema":"tipjar.telemetry.v1","event_id":"uuid","ts":"{{ISO CEST}}","type":"ENGAGE","plan_id":"PLAN-SEO-20250818-001","channel":"seo","platform":"blog|landing","metrics":{"pageviews":{{n}},"avg_time_on_page_s":{{n}},"cta_clicks":{{n}},"scroll_depth_75":{{0.x}}}}

(CTR/pozycje SERP nie są natychmiastowe — monitoruj trend D+1/D+7.)

---

G) Monitoring i reakcje (T+120 min)

Krytyczne (SEV-2): brak OG/Schema lub błędy renderu → poprawa ≤ 6 h.

Użyteczność: avg_time_on_page_s < 60 albo scroll_depth_75 < 0.4 → popraw lead, H2 i CTA.

Linki: sprawdź 200/OK na wszystkich UTM do produktu i pomocy.

---

H) Checklista „PRZED publikacją” (PASS/FAIL)

- [ ]  [Unverified] na początku treści MD; 1 CTA w każdym dokumencie.
- [ ]  Meta: title ≤ 60, description ≤ 155, OG ustawione.
- [ ]  Schema Article/FAQPage wstrzyknięte i poprawne.
- [ ]  3–5 linków wewnętrznych; ≥1 zewnętrzny (ogólny, wiarygodny).
- [ ]  ALT ≤ 120 znaków; kontrast AA w grafikach.
- [ ]  UTM w linkach do produktu/Help.
- [ ]  Sloty: PL 12:45, EN 13:15, LANDING 14:00 (CEST).

I) Checklista „PO publikacji” (T+120)

- [ ]  Paragony PUBLISH_RECEIPT_* w DAM dla BLOG_PL / BLOG_EN / LANDING_PL.
- [ ]  Zdarzenia PUBLISH i ENGAGE zapisane (T+0/30/120).
- [ ]  Brak błędów OG/Schema w narzędziu walidacji (lokalnym).
- [ ]  avg_time_on_page_s ≥ 90, scroll_depth_75 ≥ 0.4 (startowe progi).
- [ ]  Notatka w RELEASE_NOTES: publikacja SEO/landing (data/godzina/URL).

---

J) Kryteria zakończenia ETAPU 6/6 (musi być „TAK”)

BLOG_PL, BLOG_EN, LANDING_PL są public i dostępne (HTTP 200).

META/Schema wdrożone; sitemap zaktualizowana.

Telemetria PUBLISH/ENGAGE zapisana (T+0/30/120).

Paragony publikacji w DAM dla wszystkich 3 URL.

---

Jeśli to wykonane, napisz „Dalej — E-mail/Outreach (KROK 3/7, ETAP 1/6)” a przejdę do kolejnego obszaru w tym samym trybie krokowym.

---

📌 Source & Verification of Response

[Unverified] — Instrukcja publikacji/monitoringu oparta na wypracowanym playbooku; brak zewnętrznych źródeł.

[✓ Verified] — Zastosowano ADAM-MODE: etykietowanie, 1 CTA, brak słów ryzykownych, brak PII, meta/OG/Schema/ALT/UTM.

[Inference] — Sloty i progi on-site (czas, scroll) to wartości startowe do kalibracji po pierwszych emisjach.