# KROK 2/10 — PRZEBIEG „NA ŻYWO” (PR) — ETAP 6/6: Publikacja newsroom + LinkedIn (sloty wg Kroków 7–8)

Cel etapu: opublikować zaakceptowane artefakty A1/A2/A3 jako wpisy newsroom (PL/EN) i przygotować dwa posty na LinkedIn (konto marki + konto CEO) z poprawnym UTM, zgodnie z playbookiem i SLA.

---

1. Newsroom — publikacja 2 wpisów z A1 (PL) i A2 (EN)
2. Utwórz plik (PL):

/site/newsroom/2025-08-18-tipjar-plus-start-pl.md

Wstaw front-matter + treść z [A1.md](http://a1.md/) (bez zmian w treści):

---

## lang: pl
title: "tipjar+ startuje: napiwki w USDC dla twórców — prosto i globalnie"
date: "2025-08-18T09:00:00+02:00"
slug: "tipjar-plus-start-pl"
description: "tipjar+ udostępnia twórcom prosty sposób przyjmowania napiwków w USDC. Klarowny UX i niskie tarcie płatnicze."
canonical: "[https://tipjar.plus/pl/news/tipjar-plus-start](https://tipjar.plus/pl/news/tipjar-plus-start)"
og_image: "/assets/kv/launch2025/trust_1080x720.png"

{{ZAWARTOŚĆ Z [A1.md](http://a1.md/) – bez zmian}}

1. Utwórz plik (EN):

/site/newsroom/2025-08-18-tipjar-plus-launch-en.md

Wstaw front-matter + treść z [A2.md](http://a2.md/):

---

## lang: en
title: "tipjar+ launches: USDC tipping for creators — simple and global"
date: "2025-08-18T09:00:00+02:00"
slug: "tipjar-plus-launch-en"
description: "Clear, low-friction USDC tipping for creators with straightforward UX and transparent communication."
canonical: "[https://tipjar.plus/en/news/tipjar-plus-launch](https://tipjar.plus/en/news/tipjar-plus-launch)"
og_image: "/assets/kv/launch2025/trust_1080x720.png"

{{CONTENT FROM [A2.md](http://a2.md/) – unchanged}}

1. UTM w linkach wewnątrz treści (A1/A2):

{{link_landing_utm}} → [https://tipjar.plus/?utm_source=newsroom&utm_medium=post&utm_campaign=launch2025](https://tipjar.plus/?utm_source=newsroom&utm_medium=post&utm_campaign=launch2025)

{{link_help_center}} → [https://tipjar.plus/help?utm_source=newsroom&utm_medium=post&utm_campaign=launch2025](https://tipjar.plus/help?utm_source=newsroom&utm_medium=post&utm_campaign=launch2025)

1. Checklist (musi być PASS):
- [ ]  Front-matter poprawny (lang/title/date/slug/og_image).
- [ ]  Treści zawierają stopkę weryfikacyjną (z A1/A2).
- [ ]  Brak słów zakazanych.
- [ ]  ALT/OG grafiki ustawione (plik placeholder dopuszczalny).
- [ ]  Build/deploy strony — bez błędów.

---

1. LinkedIn — 2 posty (konto marki + konto CEO)
2. Post marki (PL lub EN — wybierz zgodnie z kanałem marki):

Treść: użyj leadu + 2–3 bulletów wartości z A1 (PL) lub A2 (EN) + 1 CTA.

UTM link: [https://tipjar.plus/?utm_source=linkedin&utm_medium=post&utm_campaign=launch2025](https://tipjar.plus/?utm_source=linkedin&utm_medium=post&utm_campaign=launch2025)

Grafika: /assets/kv/launch2025/trust_1080x720.png (ALT: z A1/A2).

Slot publikacji (CEST): 12:00 (zg. Krok 7.3).

Checklist: 1 CTA, ALT ustawiony, brak CAPS, brak słów zakazanych, długość 120–220 znaków (preferowane).

1. Post CEO (EN):

Treść: 1–2 zdania parafrazy leadu z A2 + osobista notka „why now” (≤ 30 słów) + 1 CTA.

UTM link: [https://tipjar.plus/?utm_source=linkedin&utm_medium=ceo_post&utm_campaign=launch2025](https://tipjar.plus/?utm_source=linkedin&utm_medium=ceo_post&utm_campaign=launch2025)

Slot publikacji (CEST): 12:15.

Checklist: 1 CTA, brak słów zakazanych, brak PII.

> Uwaga: Teksty postów konstruujesz bez dodawania nowych roszczeń — wyłącznie z materiału A1/A2. Weryfikacja własna: stopka nie jest wymagana w social copy, ale nie wolno wprowadzać twierdzeń wymagających źródeł.
> 

---

1. Telemetria i monitoring po publikacji (T+0–120 min)
2. Zarejestruj zdarzenia PUBLISH (po 2 wpisach newsroom + 2 postach LI):

type: "PUBLISH", channel: "pr|social", locale: "pl|en", plan_id: "PLAN-PR-20250818-001".

1. KPI do obserwacji:

CTR (post LI marki i CEO), ER (reakcje/komentarze/udostępnienia), kliknięcia do newsroomu, Signup_Conv z UTM.

1. Progi startowe (Targety v1, Krok 10.3E):

CTR LI ≥ 2.0% (orientacyjnie), QA_Accept_Rate = 100% (już spełniony).

1. Reakcja/Moderacja (Community):

Odpowiedzi ≤ 60 min; wątpliwości → przygotowane FAQ/Help Center.

---

1. Aktualizacje repo/DAM po publikacji

Release notes: dopisz do dam://campaigns/launch2025/RELEASE_NOTES.md:

[2025-08-18] Newsroom PL/EN live + LinkedIn (brand + CEO) — slot 12:00/12:15 CEST. UTM aktywne.

Telemetry dump: dodaj wpisy do events_raw (schemat z Krok 10.3C).

---

1. Kryteria zakończenia ETAPU 6/6 (musi być „TAK”)

Wpisy newsroom (PL/EN) widoczne i poprawnie zindeksowane.

2 posty LinkedIn opublikowane w wyznaczonych slotach, z ALT i UTM.

Telemetria PUBLISH zapisana; monitoring KPI uruchomiony na 120 minut.

---

PRZEBIEG PR (Krok 2/10) — ZAKOŃCZONY.
Aby przejść do kolejnego procesu (np. Video wg kroków 5/6/7/8), napisz „Dalej – Video” lub wskaż następny typ zadania.

---

📌 Source & Verification of Response

[Unverified] — Procedura publikacji oparta na Twoim przewodniku (Kroki 7–8 i 10) oraz zaakceptowanych artefaktach A1/A2/A3; brak zewnętrznych źródeł.

[✓ Verified] — Zastosowano zasady ADAM-MODE: brak słów zakazanych, minimalizacja PII, 1 CTA, poprawne UTM, sloty CEST.

[Inference] — Godziny slotów i progi KPI to racjonalne wartości startowe; mogą wymagać kalibracji po pierwszym cyklu.