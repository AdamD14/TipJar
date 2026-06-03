# KROK 5/7 — Lokalizacja (L10n) & transkreacja: „PR + Social + Video copy” (ogólny, gotowy do uruchomienia)

Cel: bezpiecznie i szybko przetłumaczyć A1/A2/A3 (PR), Social oraz Video (script+SRT+overlay) na wybrane języki, z zachowaniem ADAM-MODE (etykietowanie, brak PII, słów ryzykownych, 1 CTA) i reguł kanałowych.
Zakres: lokalizacja lingwistyczna + transkreacja (dopasowanie długości, tonu, CTA, overlay ≤ 6 słów), bez zmian w faktach.

---

1. Wejścia (minimalny pakiet dla L10n)

Źródła do lokalizacji (FREEZE v1.0.1):
A1 (PR/PL), A2 (PR/EN), A3 (summary EN) • V1_SCRIPT (PL), V1_SRT (PL) • Social szablony (X/IG/YT Comm).

Glosariusz & style: /prompts/glossary.tipjar.md, makra ADAM (/prompts/macros.adam.yaml).

KV/ALT: paczka miniatur + ALT teksty bazowe (KROK 4/7).

Reguły kanałowe: evaluator.plugins.enable.v1.yaml (CHANNEL_RULES dla PR/Social/Video/SEO).

---

1. Wyjścia (na każdy język docelowy)

PR (MD): ~400 słów, [Unverified] na początku, stopka weryfikacyjna na końcu, 1 CTA, UTM uzupełnione.

Social (X/IG/YT Comm): 120–300 znaków, ALT, 1 CTA, ≤2 hashtagi.

Video: [SCRIPT.md](http://script.md/) (≤200 słów), SRT.srt (≤35 s, bez zmian timecodów), overlay ≤ 6 słów (5 segmentów).

ALT (KV/OG): ≤120 znaków; zgodne z grafiką.

Pliki pomocnicze: pamięć tłumaczeniowa TMX/CSV, lista terminów nieprzetłumaczalnych, mapa skrótów (USDC, CTA).

---

1. Proces (wysoki poziom, deterministyczny ROUTE→EXEC→REVIEW→FREEZE)

ETAP L1 — ROUTE (Kurator L10n)

1. Utwórz taskspec.l10n.json (per język lub batch), outputs: [PR.md](http://pr.md/), [Social.md](http://social.md/), [SCRIPT.md](http://script.md/), SRT.srt, ALT.txt.
2. Zbuduj plan.l10n.json: S1 Curator → S2 Lokalizator → S3 Evaluator(decision gate) → S4 Freeze.

ETAP L2 — EXEC (Lokalizator/Transkreacja)
3. Tłumacz zgodnie z glosariuszem, bez wprowadzania liczb/faktów nieobecnych w źródle.
4. Dostosuj długości: leady PR (≤40 słów), tytuły SEO (≤60 znaków), meta (≤155), overlay (≤6 słów), SRT – te same timecody.
5. Zachowaj placeholdery {{...}} i UTM; nie tłumacz nazw własnych z listy „do not translate”.

ETAP L3 — REVIEW (Evaluator)
6. Walidacja LOCALE_LENGTH (±15% miękko; >±30% → reject), BANNED_WORDS, FOOTER_GUARD, PII=0, CTA=1.
7. Raport qa.report.v1.json + qa.decision.v1.json (accept/revise/reject) + patch-hinty.

ETAP L4 — FREEZE (Publisher)
8. Publikuj do DAM: wersje v1.0.1 per plik/language, oblicz SHA-256, podpisz ed25519, zaktualizuj manifest _manifests/PLAN-L10N-*.json, ustaw aliasy latest.

---

1. Zasady transkreacji (skrót operacyjny)

Ton: prosty, decyzyjny, bez żargonu; lokalne idiomy dopuszczalne, jeśli nie zmieniają sensu.

Długość: priorytet czytelności i limitów kanału (np. X ≤ 140–160 znaków).

Pismo/RTL: dla RTL (ar/iw) — odwrócenie overlay/kerning; SRT bez zmian timecodów; test wyświetlania.

Interpunkcja/spacing: „twarde” spacje dla skrótów, znaki narodowe, lokalne cudzysłowy.

Liczby/jednostki: bez konwersji walut; USDC pozostaje USDC; liczby jak w źródle (brak nowych roszczeń).

Linki/UTM: dodaj utm_locale=<kod ISO 639-1> jeśli twoja analityka to wymaga.

---

1. Integracja z Evaluatorem (reguły kluczowe)

LOCALE_LENGTH: ±15% PASS, >±30% REJECT (raportuje length_delta).

CTA_GUARD: dokładnie 1 CTA; wielokrotne → revise.

SRTGuard: format HH:MM:SS,mmm, brak overlap, łączny czas ≤ 35 s.

ALT_GUARD: ALT ≤120 znaków, zgodne z grafiką; kontrast AA sprawdzany osobno na KV.

FOOTER_GUARD: obowiązkowy blok w PR/Script MD.

BANNED_WORDS / PII: 0 trafień; wyjątki tylko w whiteliście (np. e-mail w bloku „media contact” PR).

---

1. Checklist L10n (PASS/FAIL)
- [ ]  taskspec.l10n.json + plan.l10n.json utworzone (per język/batch).
- [ ]  PR (MD) ma [Unverified] i stopkę weryfikacyjną; lead ≤ 40 słów, 1 CTA.
- [ ]  Social: 1 CTA, ≤2 hashtagi, ALT; UTM poprawne.
- [ ]  Video: [SCRIPT.md](http://script.md/) (≤200 słów), overlay ≤ 6 słów x5, SRT.srt zgodny, czas ≤ 35 s.
- [ ]  ALT (KV/OG): ≤120 znaków; zgodne z obrazem.
- [ ]  0 słów ryzykownych; 0 PII; placeholdery {{...}} zachowane.
- [ ]  qa.report.v1.json + qa.decision.v1.json (accept albo revise z patch-hintami).
- [ ]  FREEZE: artefakty w DAM v1.0.1, hash + podpis, manifest zaktualizowany, aliasy latest.

---

1. KPI (start do kalibracji)

QA_Accept_Rate (L10n): ≥ 85% przy pierwszym przebiegu.

Time-to-Localize (p95): ≤ 90 min na pakiet (PR + Social + Script + SRT + ALT).

Length Deviation (avg): ≤ ±10%.

CTR uplift lokalny vs EN/PL: ≥ +5% w Social / ≥ +8% w Newsroom.

Video_Retention_50% (lokalne): ≥ 45%.

---

1. Telemetria (schemat skrótowy)

PUBLISH {channel:"l10n", locale:"xx", artifacts:["PR","Social","Script","SRT","ALT"]}

ENGAGE {ctr, er, retention_50} (per kanał).

COST {tokens, time_s, revise_count}.
Wszystko w tipjar.telemetry.v1 z utm_locale.

---

1. Nazewnictwo i ścieżki (ISO 639-1 / 3166-1)

dam://campaigns/launch2025/pr/<locale>/YYYY/MM/DD/A1_tipjar-plus_<LOCALE>[*v1.0.1.md](http://v1.0.1.md/)
dam://campaigns/launch2025/social/<locale>/YYYY/MM/DD/SOCIAL_pack_v1.0.1.md
dam://campaigns/launch2025/video/<locale>/YYYY/MM/DD/V1_SCRIPT*<LOCALE>[*v1.0.1.md](http://v1.0.1.md/)
dam://campaigns/launch2025/video/<locale>/YYYY/MM/DD/V1_SRT*<LOCALE>_v1.0.1.srt
dam://campaigns/_manifests/PLAN-L10N-YYYYMMDD.json

---

1. Patch-hinty (najczęstsze)

LOCALE_LENGTH_EXCESS: „Skróć lead o 2–3 słowa; usuń zdania podrzędne.”

MULTIPLE_CTA: „Zredukuj CTA do jednego; zachowaj w ostatnim akapicie.”

SRT_OVERLAP: „Dostosuj czas końca poprzedniego bloku (−200 ms).”

BANNED_WORD: „Zamień ‘Ensures that’ → ‘is designed to’ / ‘helps’.”

ALT_TOO_LONG: „Skróć ALT do ≤120 znaków; zachowaj opis warstwy wizualnej.”

---

Instrukcja: Aby przejść do KROKU 6/7 — Growth & Partnerships (ogólny: współprace, referral, UGC), wpisz „Dalej”.

---

📌 Source & Verification of Response

[Unverified] — Specyfikacja L10n/transkreacji została opracowana na bazie materiałów tej kampanii; brak zewnętrznych źródeł.

[✓ Verified] — Uwzględniono reguły ADAM-MODE: etykietowanie, stopka, brak słów ryzykownych, minimalizacja PII, 1 CTA, evaluatory LOCALE/LENGTH/SRT/ALT.

[Inference] — KPI i progi są wartościami startowymi i mogą wymagać kalibracji po pierwszych publikacjach.