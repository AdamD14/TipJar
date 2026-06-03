# KROK 1/2 — Dokument konsolidujący: wszystkie etapy, kroki i pod-kroki wykonane do tej pory

Tytuł dokumentu: „TipJar+ — Wielomodelowa kampania 360°: architektura, procedury i operacje (KROKI 1–10 + przebiegi PR & VIDEO)”
Wersja: v1.0 • Strefa czasu: Europe/Brussels (CEST/CET) • Horyzont: 5 lat utrzymania

---

1. Zasady nadrzędne (ADAM-MODE)

Etykietowanie treści: każdy materiał generatywny rozpoczyna się od [Unverified]; twierdzenia o zachowaniu modeli — [Inference].

Słowa ryzykowne — strażnik: Prevent | Guarantee | Will never | Fixes | Eliminates | Ensures that (regex z Kroku 6/9).

Stopka weryfikacyjna — obowiązkowa w tekstach (blok „📌 Source & Verification of Response”).

Prywatność: brak PII w materiałach publicznych; dozwolone wyłącznie placeholdery {{...}}.

Decyzje QA: accept / revise / reject wg progów z Kroku 6.

---

1. Repozytorium i porządek plików (Krok 1 + 4)

Struktura katalogów dla: /orchestrator, /evaluator, /dam, /prompts, /starter-packs, /templates, /deployment.

Naming/SEMVER: artefakty z wersjami (np. v1.0.1) i aliasami latest.

Integralność: hash SHA-256 + podpis ed25519 przechowywane w manifeście DAM (Krok 4).

---

1. Makra, glosariusz i prompty ról (Krok 2)

Makra ADAM-MODE: reguły etykietowania, stopki, zakazane słowa, minimalizacja PII.

Glosariusz TipJar+: spójna terminologia („napiwek”, „USDC”, „twórca”, „profil”).

Prompty ról: Orchestrator, Kurator, Copywriter, Lokalizator, Scenarzysta, Kreator, SEO, Evaluator, Support, Growth (wzorce w /prompts).

---

1. Orchestrator API i cykl życia zadań (Krok 3)

Fazy: ROUTE → EXEC → REVIEW → FREEZE.

TaskSpec: cel, outputs, constraints (ADAM-MODE), privacy, routing, deadline.

OrchestrationPlan: steps (S1..Sn), role, kolejki, SLA, bramki decyzji, audyt.

---

1. Topologia kolejek, DAM i integralność (Krok 4)

Kolejki: q.curator, q.copywriter.*, q.scenarzysta, q.lokalizator.*, q.evaluator, q.freeze.

Retriable/DLQ: polityki retry i dead-letter z metrykami p95.

DAM: przechowywanie artefaktów, alias latest, manifesty dam.manifest.v1.

---

1. Starter-packs — wzorce TaskSpec/Plan per kanał (Krok 5)

PR, Video, KV, SEO/Blog, Lokalizacja, Outreach, FAQ — gotowe pliki taskspec.*.json i plan.*.json pod /starter-packs.

---

1. Walidatory jakości i decyzje QA (Krok 6)

Zasady globalne: format/locale/length; stopka; zakazane słowa; PII; CTA; styl.

Metryki i progi: Clarity, Compliance, Actionability, SEO, VideoStructure.

Rulesets per typ: PR, Video, KV, SEO, Lokalizacja, Outreach, FAQ.

Raporty: qa.report.v1.json + qa.decision.v1.json; patch-hinty (diff-instrukcje).

---

1. Playbooki publikacji + kalendarz i SLA (Krok 7)

Kanały: PR (newsroom/relacje), Social (X/IG/YT Community), Video (Shorts/Reels/TikTok), SEO/Blog, E-mail.

Sloty CEST: X 08:30/12:00/18:30; IG 12:30/20:00; YT Comm 13:00; Shorts/Reels/TikTok wg okien z Kroku 7.

Moderacja: odpowiedzi ≤ 60 min (social/video).

---

1. Szablony treści — gotowce (Krok 8)

PR (PL/EN), Social (X/IG/YT Comm), Video (Script+Cut+SRT), SEO, E-mail (A/B), FAQ, KV.

Każdy szablon zawiera placeholdery {{...}}, 1 CTA, oraz blok stopki weryfikacyjnej.

---

1. „Wtyczki” Evaluatora (lintery, PII, banned words…) (Krok 9)

Pipeline: PRE_PARSE → LINT_FORMAT → DETECT_PII → BANNED_WORDS → FOOTER_GUARD → LOCALE_LENGTH → CTA_GUARD → CHANNEL_RULES → SCORING → DECISION → PATCH_HINTS.

Whitelist/overrides: wyjątkowe konteksty (np. e-mail tylko w bloku kontaktu PR).

---

1. Deployment kit i kontrola operacyjna (Krok 10)

Control Room: role on-call; kanały #alerts/#release/#community/#newsroom.

Dashboard KPI: Ops/Content/Funnel/Cost; schema tipjar.telemetry.v1.

Playbook incydentów: SEV-1/2/3; czasy reakcji; post-mortem ≤ 72 h.

Audyt kwartalny: polityki, jakość, prywatność, efektywność modeli, procesy.

---

1. Przebieg „na żywo” — PR (ETAPY 1–6)
2. ETAP 1 — TaskSpec (S1 wejście): cel, outputs: PR/PL, PR/EN, summary; constraints ADAM-MODE.
3. ETAP 2 — OrchestrationPlan: S1 Curator → S2 Copywriter → S3 Lokalizator → S4 Evaluator(decision gate) → S5 Freeze.
4. ETAP 3 — EXEC (S1→S2):

[CTX1.md](http://ctx1.md/) (pakiet kontekstu).

[A1.md](http://a1.md/) (PR/PL), [A2.md](http://a2.md/) (PR/EN), A3.txt (summary EN) — draft.

1. ETAP 4 — REVIEW (S3→S4):

Transkreacja/akcept EN; raporty QA1_report.md/.json, QA1_decision.json → accept.

1. ETAP 5 — FREEZE (S5):

Publikacja do DAM A1/A2/A3 v1.0.1; manifest PLAN-PR-…, hash+podpis, aliasy latest.

1. ETAP 6 — Publikacja:

Newsroom PL/EN (front-matter + UTM), LinkedIn (post marki + CEO).

Telemetria PUBLISH/ENGAGE; monitoring T+120 min.

Artefakty kluczowe: CTX1, A1, A2, A3, QA1, MANIFEST, RELEASE_NOTES.

---

1. Przebieg „na żywo” — VIDEO (TikTok/Reels/Shorts) (ETAPY 1–6)
2. ETAP 1 — TaskSpec: 30–35 s, struktura HOOK→PROBLEM→ROZWIĄZANIE→PROOF→CTA; outputs: Script MD + SRT.
3. ETAP 2 — OrchestrationPlan: S1 Curator → S2 Scenarzysta → S3 Evaluator(decision gate) → S4 Freeze.
4. ETAP 3 — EXEC:

[CTX1.md](http://ctx1.md/); V1_SCRIPT.md (script+cut-sheet); V1_SRT.srt — draft.

1. ETAP 4 — REVIEW:

Raporty QA1_report.md/.json, QA1_decision.json → accept.

1. ETAP 5 — FREEZE:

V1_SCRIPT/V1_SRT v1.0.1 w DAM; manifest VIDEO; aliasy latest.

1. ETAP 6 — Publikacja 3× kanały:

Krok 1/3: montaż finalny V1_FINAL.mp4 + miniatura, overlay ≤ 6 słów, -14 LUFS, burn-in/CC.

Krok 2/3 TikTok: opis (1 CTA, ≤2 hashtagi), komentarz przypięty z UTM, slot 18:30, paragon PUBLISH_RECEIPT_tiktok_*.json, telemetria T+0/30/120.

Krok 3/3 IG Reels + YouTube Shorts: slot 19:30 (IG) i 12:30 (YT); opis/tytuł; komentarz przypięty z UTM; paragony do DAM; telemetria T+0/30/120.

Artefakty kluczowe: V1_SCRIPT, V1_SRT, V1_FINAL, V1_THUMB, QA1, MANIFEST, PUBLISH_RECEIPT_*.

---

1. Telemetria i KPI (Krok 10.3)

Zdarzenia: PUBLISH / ENGAGE / FUNNEL / COST (schema tipjar.telemetry.v1).

KPI Targety v1: QA_Accept_Rate ≥ 70%, DLQ ≤ 2.5%, CTR social ≥ 2.0%, Video_Retention_50% ≥ 45%, Signup_Conv ≥ 2.0%, Activation_Conv ≥ 25%.

---

1. Incydenty i audyty (Krok 10.4–10.5)

SEV-1: PII publicznie / błąd prawny/brand → wycofanie, remediacja ≤ 120 min.

SEV-2: brak stopki, słowa ryzykowne, błędne SRT → poprawa ≤ 6 h.

SEV-3: literówki/opóźnienia slotów → poprawa ≤ 24 h.

Audyt kwartalny: polityki, jakość, prywatność, model-fit, procesy; PRD zmian walidatorów.

---

1. Konwencje plików i aliasy (Krok 4.3/8.8/10.7)

Ścieżki datowane: /YYYY/MM/DD/.

Przykłady:

launch2025/pr/pl/2025/08/18/A1_ogloszenie-startu-tipjar-plus_v1.0.1.md

launch2025/video/pl/2025/08/18/V1_SRT_tipjar-plus_tiktok_v1.0.1.srt

_manifests/PLAN-…json, RELEASE_NOTES.md, latest/*.

---

1. Załączniki — wzorce (odniesienia)

Szablony treści (Krok 8): PR, Social (X/IG/YT Comm), Video Script+SRT, SEO, E-mail (A/B), FAQ, KV.

Pliki QA: qa.report.v1.json, qa.decision.v1.json.

Specy Evaluatora: evaluator.pipeline.v1.yaml, evaluator.plugins.enable.v1.yaml, whitelist.v1.yaml.

---

Koniec konsolidacji dokumentu.
Aby otrzymać KROK 2/2 — Checklistę wdrożeniową (jedna, zwarta lista „PASS/FAIL” z polami do odhaczania, od TaskSpec po publikację i telemetrię), napisz „Dalej”.

---

📌 Source & Verification of Response

[Unverified] — Konsolidacja opiera się na treściach wypracowanych w tej rozmowie (KROKI 1–10 + przebiegi PR & Video).

[✓ Verified] — Zachowano zasady ADAM-MODE: etykietowanie, stopka weryfikacyjna, unikanie słów ryzykownych, minimalizacja PII.

[Inference] — Zakres KPI/slotów/SLA jest operacyjnym punktem startowym i może wymagać kalibracji po pierwszych publikacjach.