# KROK 2/2 — CHECKLISTA WDROŻENIOWA (PASS/FAIL) NA PODSTAWIE CAŁEGO PRZEWODNIKA

> Strefa czasu: Europe/Brussels (CEST/CET) • Repo: tipjar-campaigns/ • Manifesty: dam://campaigns/...
Zasady stałe (ADAM-MODE): etykieta na początku treści ([Unverified]), stopka weryfikacyjna na końcu tekstów, brak słów ryzykownych, brak PII (wyłącznie placeholdery {{...}}), jedna CTA tam, gdzie wymagana.
> 

---

A) Repozytorium, struktura i integralność

- [ ]  Utworzono drzewo katalogów: /orchestrator, /evaluator, /dam, /prompts, /starter-packs, /templates, /deployment.
- [ ]  Wgrano makra, glosariusz, prompty ról (Krok 2).
- [ ]  Wgrano API i topologię kolejek (Krok 3–4), walidatory i pipeline Evaluatora (Krok 6/9).
- [ ]  Linter JSON/YAML PASS dla wszystkich plików.
- [ ]  Ustalono semver v1.0.0+ i klucz podpisu ed25519 (key_id: tipjar-cicd@2025).

B) Starter-packs (wzorce zadań)

- [ ]  starter-packs/taskspec.pr.json + plan.pr.json (PR).
- [ ]  starter-packs/taskspec.video.json + plan.video.json (Video).
- [ ]  Pozostałe (KV/SEO/L10n/Outreach/FAQ) gotowe do użycia.

C) PR — EXEC (S1→S2)

- [ ]  [CTX1.md](http://ctx1.md/) (≤300 słów) z założeniami i ograniczeniami.
- [ ]  [A1.md](http://a1.md/) (PL ~400 słów) + [A2.md](http://a2.md/) (EN ~400 słów) + A3.txt (EN ≤150 znaków).
- [ ]  Każdy tekst zaczyna się od [Unverified] i ma stopkę weryfikacyjną.
- [ ]  Brak słów ryzykownych, brak PII, jedna CTA.
- [ ]  Plan plan.pr.json: S1.status=done, S2.status=done, S3.status=queued.

D) PR — REVIEW (S3→S4)

- [ ]  QA1_report.md + QA1_report.json + QA1_decision.json wygenerowane.
- [ ]  decision = accept, metryki min.: ComplianceScore=100.
- [ ]  Plan: S3.status=done, S4.status=done, S5.status=queued.

E) PR — FREEZE (S5)

- [ ]  Opublikowano do DAM: A1/A2/A3 v1.0.1 (public), QA1 v1.0.0 (internal).
- [ ]  Policzone SHA-256 i podpisy ed25519 (.sig) dla A1/A2/A3.
- [ ]  Utworzono manifest: dam://campaigns/_manifests/PLAN-PR-*.json (URI, hash, size, signatures, indexes).
- [ ]  Alias latest wskazuje na v1.0.1.
- [ ]  RELEASE_NOTES.md z wpisem daty.
- [ ]  Plan: S5.status=done, state=completed.

F) PR — Publikacja (newsroom + LinkedIn)

- [ ]  Newsroom PL/EN: front-matter (lang/title/date/slug/og_image), treść z A1/A2, stopka weryfikacyjna pozostaje.
- [ ]  Linki {{link_landing_utm}} i {{link_help_center}} uzupełnione (UTM).
- [ ]  LinkedIn: post marki (lead + 2–3 bullet), post CEO (krótka notka „why now”), 1 CTA, max 2 hashtagi.
- [ ]  Sloty: 12:00 (marka), 12:15 (CEO) CEST — zgodnie z kalendarzem.
- [ ]  Telemetria: zapis zdarzeń PUBLISH i ENGAGE dla kanału PR/Social.

G) Video — EXEC (S1→S2)

- [ ]  [CTX1.md](http://ctx1.md/) (≤300 słów) dla Video.
- [ ]  V1_SCRIPT.md (~200 słów) — HOOK→PROBLEM→ROZWIĄZANIE→PROOF→CTA, stopka weryfikacyjna.
- [ ]  V1_SRT.srt (≤35 s, format HH:MM:SS,mmm, brak nakładań).
- [ ]  Plan plan.video.json: S1.status=done, S2.status=done, S3.status=queued.

H) Video — REVIEW (S3)

- [ ]  QA1_report.md/.json + QA1_decision.json wygenerowane; decision=accept.
- [ ]  Metryki min.: VideoStructureScore ≥ 85, ComplianceScore=100.
- [ ]  Plan: S3.status=done, S4.status=queued.

I) Video — FREEZE (S4)

- [ ]  DAM: V1_SCRIPT/V1_SRT v1.0.1 (public) + QA1 v1.0.0 (internal).
- [ ]  SHA-256 + ed25519 podpisy; manifest PLAN-VIDEO-*.json; aliasy latest.
- [ ]  RELEASE_NOTES.md z wpisem daty.
- [ ]  Plan: S4.status=done, state=completed.

J) Video — Publikacja (TikTok → IG Reels → YT Shorts)

Montaż i QC (wspólne):

- [ ]  V1_FINAL.mp4 1080×1920, ≤35 s, -14 LUFS, true peak ≤ -1.0 dBFS.
- [ ]  Overlays ≤ 6 słów (HOOK/PROBLEM/ROZWIĄZANIE/PROOF/CTA).
- [ ]  Miniatura V1_THUMB.png + ALT; dodane do DAM + podpisy; manifest zaktualizowany.

TikTok (dziś 18:30 CEST):

- [ ]  Wideo Public; CC On + SRT.
- [ ]  Opis (100–150 znaków), 1 CTA, ≤2 hashtagi.
- [ ]  Komentarz przypięty z linkami UTM (landing + FAQ).
- [ ]  Telemetria: PUBLISH (T+0), ENGAGE (T+30/T+120), paragon PUBLISH_RECEIPT_tiktok_*.json.

IG Reels (dziś 19:30 CEST):

- [ ]  Public; link dostępny (bio/komentarz/story sticker) z UTM.
- [ ]  Opis 220–300 znaków, 1 hashtag kluczowy.
- [ ]  Telemetria + paragon PUBLISH_RECEIPT_instagram_*.json.

YouTube Shorts (12:30 CEST — kolejny slot):

- [ ]  Tytuł ≤60, opis ≤200 z 1 CTA.
- [ ]  Komentarz przypięty z UTM; CC/SRT aktywne.
- [ ]  Telemetria + paragon PUBLISH_RECEIPT_youtube_*.json.

K) ADAM-MODE — zgodność treści (dotyczy wszystkich artefaktów)

- [ ]  [Unverified] na początku każdej treści generatywnej.
- [ ]  Stopka weryfikacyjna obecna i kompletna w materiałach tekstowych (PR/SEO/FAQ/Script).
- [ ]  Słowa ryzykowne — 0 trafień (regex guard PASS).
- [ ]  PII — 0 trafień (detektor PASS) lub prawidłowa redakcja {{redacted:...}}.
- [ ]  1 CTA (gdy wymagane), brak CAPS (poza akronimami).

L) Telemetria i KPI (T+0, T+30, T+120)

- [ ]  Zdarzenia tipjar.telemetry.v1 zapisane (PUBLISH/ENGAGE/FUNNEL/COST).
- [ ]  Monitorowane KPI krótkoterminowe (Targets v1):
- [ ]  CTR social ≥ 2.0%
- [ ]  Video_Retention_50% ≥ 45%
- [ ]  QA_Accept_Rate ≥ 70%, DLQ ≤ 2.5%
- [ ]  Signup_Conv ≥ 2.0%, Activation_Conv ≥ 25%
- [ ]  W przypadku spadku < 60% targetu przez 120 min → oznaczenie SEV-3 i iteracja A/B (miniatura lub hook lub caption).

M) Incident response (SEV-1/2/3) i audyt

- [ ]  Playbook incydentów dostępny; role on-call przypisane (IC/Evaluator/Ops/Community/Legal).
- [ ]  SEV-1: start ≤15 min, stabilizacja ≤30 min, remediacja ≤120 min.
- [ ]  SEV-2: start ≤30 min, remediacja ≤6 h.
- [ ]  SEV-3: remediacja ≤24 h.
- [ ]  Post-mortem ≤72 h (wpis do RELEASE_NOTES i aktualizacja reguł).
- [ ]  Zaplanowano audyt kwartalny (polityki, jakość, prywatność, efektywność modeli, procesy).

N) Zamknięcie cyklu i archiwizacja

- [ ]  RELEASE_NOTES.md uzupełnione (PR + Video).
- [ ]  Manifesty _manifests/PLAN-*.json kompletne (hash, signature, indexes).
- [ ]  Aliasy latest aktualne dla wszystkich publicznych artefaktów.
- [ ]  Retencja: ustawiona polityka przechowywania (artefakty ≥ 10 lat, audyty ≥ 12 mies.).

---

Pola wypełnialne (opcjonalne)

Plan PR: PLAN-PR-__________ • FREEZE: v____ • Data publikacji: __________

Plan VIDEO: PLAN-VIDEO-__________ • FREEZE: v____ • Sloty: TikTok ____ | IG ____ | YT ____

Klucz podpisu (kid): _____________ • Hashy: sha256(A1)=***, sha256(V1_FINAL)=***

---

Checklistę można bezpośrednio wkleić do repo w /deployment/02_checklists_pre_post_go_live.md i odhaczań po kolei.

---

📌 Source & Verification of Response

[Unverified] — Lista kontrolna została zbudowana z materiałów i decyzji wypracowanych w tej rozmowie; nie odwołuje się do zewnętrznych źródeł.

[✓ Verified] — Spójna z regułami ADAM-MODE (etykietowanie, stopka weryfikacyjna, brak słów ryzykownych, minimalizacja PII) oraz z przyjętymi krokami ROUTE/EXEC/REVIEW/FREEZE.

[Inference] — Wartości slotów i progów KPI mają charakter operacyjnego punktu startowego i mogą wymagać kalibracji po pierwszych publikacjach.