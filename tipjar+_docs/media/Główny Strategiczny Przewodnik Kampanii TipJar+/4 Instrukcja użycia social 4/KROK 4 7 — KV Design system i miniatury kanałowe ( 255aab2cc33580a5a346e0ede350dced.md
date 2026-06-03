# KROK 4/7 — KV / Design system i miniatury kanałowe (ogólny)

Cel: ujednolicić identyfikację wizualną kampanii oraz dostarczyć komplet miniatur/kreacji dla PR, Social, Video, SEO/Blog i E-mail – gotowych do natychmiastowego użycia i walidacji przez Evaluatora.

Wejścia

Paleta i typografia robocza (brand): #003737 (primary), #FFD700 lub #4D194D (accent), neutralne: #DDE0DA, #BCC1B6.

Szablony z Kroku 8 (KV briefy Trust/Speed/Global + spec JSON).

Wymogi dostępności (kontrast AA), safe margins, pola tekstowe.

Wyjścia

Design tokens (JSON) dla palety, typografii, promieni i cieni.

Trzy warianty KV (Trust / Speed / Global) w pakietach eksportowych dla kluczowych formatów.

Miniatury kanałowe (video thumb, OG image, social square/portrait).

Spec i checklisty do automatycznej walidacji (Evaluator: CHANNEL_RULES KV).

Manifest DAM + aliasy latest.

---

Proces (wysoki poziom)

1. Zdefiniuj design tokens
Utwórz /dam/kv/tokens_v1.json:

{
"colors": { "primary":"#003737", "accent1":"#FFD700", "accent2":"#4D194D", "neutral1":"#DDE0DA", "neutral2":"#BCC1B6" },
"typography": { "headline":"Inter-ExtraBold", "body":"Inter-Regular" },
"radius": { "xl": 16, "2xl": 24 },
"shadow": { "card":"0 8px 24px rgba(0,0,0,0.08)" }
}

1. Zbuduj 3 warianty KV (Trust / Speed / Global)
Dla każdego wariantu przygotuj pliki źródłowe i eksporty:

Źródła: *.fig/*.psd/*.ai + kv_spec.json (z Kroku 8).

Eksporty: 1080x1080, 1080x1920, 1280x720 (PNG/WebP), ALT ≤120 znaków, copy ≤8 słów.

1. Miniatury kanałowe (zestaw obowiązkowy)

Video thumb (portrait): 1080×1920 → Reels/Shorts/TikTok.

Video thumb (landscape): 1280×720 → YouTube OG.

OG image (newsroom/blog): 1200×630.

Social square: 1080×1080 → IG grid / LI image.

Wszystkie: safe margins (top 96, bottom 128, left/right 64), kontrast AA, 1 CTA max.

1. Walidacja dostępności i copy

Kontrast AA (WCAG) między copy a tłem – PASS.

Długość copy ≤8 słów, brak słów ryzykownych, brak PII.

ALT tekst zgodny z treścią i kanałem.

1. Eksport + nazewnictwo + DAM

Ścieżki (przykład, PL):

dam://campaigns/launch2025/kv/2025/08/18/TRUST_1080x1920_v1.0.0.png
dam://campaigns/launch2025/kv/2025/08/18/SPEED_1080x1080_v1.0.0.webp
dam://campaigns/launch2025/kv/2025/08/18/GLOBAL_1280x720_v1.0.0.png
dam://campaigns/launch2025/kv/2025/08/18/OG_image_1200x630_v1.0.0.png

Policz SHA-256 każdej kreacji i podpisz ed25519 (.sig).

Dodaj manifest dam://campaigns/_manifests/PLAN-KV-YYYYMMDD.json, indeksy by_format i by_variant.

Ustaw aliasy latest/*.

1. Integracja z Evaluatorem

Włącz w evaluator.plugins.enable.v1.yaml profil kv_spec z CHANNEL_RULES(KV) i CONTRAST_AA:true.

Zdefiniuj BANNED_WORDS i FOOTER_GUARD dla plików opisowych (MD).

---

Checklist (PASS/FAIL)

- [ ]  tokens_v1.json istnieje i jest spójny (paleta, typografia, radius, shadow).
- [ ]  3 warianty KV (Trust/Speed/Global) – każdy w 3 rozmiarach (1080×1080, 1080×1920, 1280×720).
- [ ]  Copy ≤8 słów; 0 słów ryzykownych; 1 CTA max.
- [ ]  ALT dla każdego eksportu (≤120 znaków).
- [ ]  Kontrast AA PASS (raport z Evaluatora).
- [ ]  Safe margins zachowane; pola tekstowe nieprzekroczone.
- [ ]  SHA-256 + ed25519 podpisy wygenerowane; manifest w DAM; aliasy latest.

---

KPI (start)

CTR uplift z miniatur: baseline PR/Video vs. KV (cel: ≥ +10% uplift na pierwszych slotach).

AA Compliance Rate: 100% (wszystkie eksporty przechodzą kontrast).

Time-to-Export (p95): ≤ 30 min od briefu do paczki eksportów.

QA Accept Rate (KV): ≥ 90% przy pierwszym przebiegu.

---

Telemetria (skrót)

PUBLISH {channel:"kv", variant:"trust|speed|global", format:"1080x1920|..."}

ENGAGE {impressions, ctr, saves} (jeśli minatura użyta w social/video).

COST {render_time_s, file_size, retries}.
Wszystko w tipjar.telemetry.v1.

---

Artefakty / Pliki (przykład)

/dam/kv/tokens_v1.json
/dam/kv/spec/kv_spec.json
/campaigns/launch2025/kv/2025/08/18/{TRUST|SPEED|GLOBAL}_<size>_v1.0.0.{png|webp}
_campaigns/_manifests/PLAN-KV-20250818.json

---

Instrukcja: Aby przejść do KROKU 5/7 — Lokalizacja (L10n) & transkreacja pakietu „PR + Social + Video copy” (ogólny), napisz „Dalej”.

---

📌 Source & Verification of Response

[Unverified] — Specyfikacja KV/miniatur została opracowana na bazie ustaleń w tej rozmowie; brak zewnętrznych źródeł.

[✓ Verified] — Uwzględniono reguły ADAM-MODE (etykietowanie, brak słów ryzykownych, minimalizacja PII) i walidacje Evaluatora (kontrast AA, spec KV).

[Inference] — KPI i wskaźniki wydajności są wartościami startowymi do kalibracji po pierwszych publikacjach.