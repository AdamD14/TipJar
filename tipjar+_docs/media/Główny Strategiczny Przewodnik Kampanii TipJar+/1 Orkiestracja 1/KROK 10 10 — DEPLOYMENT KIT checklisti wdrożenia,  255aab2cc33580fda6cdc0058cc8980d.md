# KROK 10/10 — DEPLOYMENT KIT: checklisti wdrożenia, „control room”, dashboard KPI, playbook incydentów, audyt kwartalny

Cel kroku: dostarczyć gotowy pakiet operacyjny, aby uruchomić i utrzymać wielomodelową kampanię TipJar+ zgodnie z Krokami 1–9. Zawiera listy kontrolne, definicje metryk, schematy danych, procedury incydentowe i harmonogram audytów.

---

10.1. Go-Live „Control Room” (Europa/Bruksela, CEST/CET)

A) Role dyżurne (placeholders, bez PII)

Incident Commander: {{roster_ic}}

QA Gate/Evaluator On-Call: {{roster_eval}}

Orchestrator Ops: {{roster_ops}}

Community Moderation: {{roster_comm}}

Legal Liaison: {{roster_legal}}

B) Kanały operacyjne

Alerty automatyczne: #alerts

Wydania i manifesty: #release

Moderacja i eskalacje: #community

PR i relacje z mediami: #newsroom

C) Okno publikacyjne (slot główny LAUNCH)

T-120 min: Freeze + staging postów/assetów.

T-60 min: smoke test linków/UTM, renderów, SRT.

T-15 min: status check kolejek (q.copywriter.*, q.evaluator, q.freeze).

T+15/60/120 min: inspekcje KPI krótkoterminowych (sekcja 10.3).

---

10.2. Listy kontrolne (ready-to-use)

A) Pre-Go-Live (platforma + treści)

- [ ]  TaskSpec i OrchestrationPlan zaakceptowane (state: planned).
- [ ]  Artefakty PASS przez Evaluatora (decision: accept).
- [ ]  FREEZE → manifest z hashami + podpis (ed25519).
- [ ]  DAM URI zgodne z naming (Krok 4).
- [ ]  Anti-PII: placeholdery {{...}} w treściach publicznych.
- [ ]  SEO meta (title/desc) w limitach; ALT-texty obecne.
- [ ]  SRT zweryfikowane (czas ≤ 35 s, format poprawny).
- [ ]  Posty mają 1 CTA; UTM poprawne.

B) Pre-Go-Live (infrastruktura)

- [ ]  Kolejki aktywne, concurrency i visibility_timeout zgodne z topologią (Krok 4).
- [ ]  Alerty SLA/DLQ włączone; wskaźniki p95 kolejek na dashboardzie.
- [ ]  Klucze podpisu publikacji aktywne; obrót kluczy zaplanowany.
- [ ]  Backup manifestów i audit logs = ON.

C) Post-Go-Live (T+0–120 min)

- [ ]  CTR i ER > progów startowych (sekcja 10.3, „Targets v1”).
- [ ]  Brak SEV-1/SEV-2; jeśli są, uruchom playbook incydentu (10.4).
- [ ]  Moderacja: odpowiedzi ≤ 60 min w slotach social/video.

D) Dzień 1–7

- [ ]  Iteracje A/B (copy, miniatura, hook) zgodnie z patch-hintami.
- [ ]  SEO: indeksacja w GSC; wewnętrzne linkowanie uzupełnione.
- [ ]  FAQ: dodane „knowledge gaps” z community.

---

10.3. Dashboard KPI — specyfikacja metryk i schemat danych

A) Panele

1. Ops (Orchestration): przepustowość, kolejki, QA, DLQ.
2. Content Performance: CTR/ER/retencja wideo.
3. Funnel: wizyty → rejestracje → aktywacje.
4. Cost/LLM: koszt artefaktów (tokeny, czas), rewizje.

B) Słownik metryk (kluczowe)

QueueWait_p95_s: p95 czasu oczekiwania w kolejce per rola.

ExecTime_p95_s: p95 czasu wykonania kroku.

DLQ_rate_%: (DLQ jobs / all finished)×100.

QA_Accept_Rate: accepted / (accepted+revise+reject).

Revise_Rate: revise / (accepted+revise+reject).

Video_Retention_50%: udział widzów oglądających ≥ 50% długości.

CTR: kliknięcia/link wyświetlenia.

ER: (reakcje+komentarze+udostępnienia)/wyświetlenia.

Signup_Conv: rejestracje / wizyty z kampanii.

Activation_Conv: aktywacje / rejestracje (definicja produktu).

Cost_per_Artifact: (koszt tokenów + czas) / artefakt.

Patch_Apply_Time: T od patch-hinta do ponownego FREEZE.

C) Schemat zdarzeń (telemetria)

{
"schema": "tipjar.telemetry.v1",
"event_id": "uuid",
"ts": "2025-08-18T09:00:00+02:00",
"type": "ORCH|QA|PUBLISH|ENGAGE|FUNNEL|COST",
"plan_id": "PLAN-...",
"artifact_id": "A1",
"channel": "pr|social|video|seo|email|faq",
"locale": "pl|en|...",
"metrics": {
"queue_wait_s": 42,
"exec_time_s": 180,
"qa_decision": "accept",
"ctr": 0.032,
"er": 0.045,
"retention_50": 0.51,
"signups": 123,
"activations": 47,
"token_cost_usd": 0.84
}
}

D) Tabele (minimalny model danych)

events_raw(schema, event_id, ts, type, plan_id, artifact_id, channel, locale, metrics JSONB)

Widoki: ops_daily, content_hourly, funnel_daily, cost_daily.

E) Targety startowe v1 (rekomendacje kalibracyjne)

DLQ_rate_% ≤ 2.5, QA_Accept_Rate ≥ 70%, Revise_Rate ≤ 25%

Video_Retention_50% ≥ 45%, CTR social ≥ 2.0%, CTR PR ≥ 1.0%

Signup_Conv ≥ 2.0%, Activation_Conv ≥ 25%

---

10.4. Playbook incydentów (SEV-1/2/3)

Klasy zdarzeń

SEV-1 (krytyczne): PII publicznie, błąd prawny/brand, publikacja błędnego assetu.

SEV-2 (poważne): brak stopki, słowa zakazane w materiale, błędne SRT, CTR/ER << progów.

SEV-3 (umiarkowane): literówki, lekka rozbieżność tonu, opóźnienia slotowe.

Procedura ogólna

1. Detekcja: alert (QA/ops/content) → ticket incydentu.
2. Stabilizacja: ukryj/wycofaj asset (alias latest → poprzednia wersja), notatka „hold”.
3. Diagnoza: QA report, audit logi, przyczyna podstawowa.
4. Remediacja: patch-hinty → rewizja → Evaluator → FREEZE → publikacja.
5. Komunikacja: komunikat wyjaśniający (PR/social), bez PII.
6. Post-mortem (≤ 72 h): przyczyna, wpływ, działania zapobiegawcze, aktualizacja reguł.

Czasy reakcji (SLA)

SEV-1: start ≤ 15 min, stabilizacja ≤ 30 min, remediacja ≤ 120 min.

SEV-2: start ≤ 30 min, remediacja ≤ 6 h.

SEV-3: w oknie dyżurowym, remediacja ≤ 24 h.

Szablony komunikatów (placeholders)

PR korekta: „Korygujemy materiał opublikowany o {{czas_local}}. Zaktualizowana wersja jest dostępna pod {{link}}.”

Social reply: „Dzięki za sygnał — poprawiliśmy materiał. Aktualny opis: {{link}}.”

---

10.5. Audyt kwartalny (Compliance & Performance)

Zakres

Polityki i makra: przegląd ADAM-MODE, lista słów zakazanych, zgodność stopki.

Jakość i skuteczność: Clarity/Compliance/Actionability; roadmap patch-hintów.

Prywatność: kontrola PII, retencja, anonimizacja w telemetrii.

Model fit: porównanie kosztów/efektywności modeli per rola (Copywriter/Lokalizator/SEO/Evaluator).

SEO/Content: trendy CTR/ER/retencja; kanibalizacja słów kluczowych.

Procesy: SLA, DLQ, capacity; potrzeby skalowania.

Artefakty audytu

Raport PDF/MD, tablice KPI, lista działań (owner, due date), PRD zmian walidatorów.

Log zmian glosariusza i style-guide’ów; wersje makr (macros.adam.yaml).

Harmonogram

Q+0: audyt startowy po pierwszym pełnym cyklu.

Co kwartał: audyt pełny (2–4 h warsztat + raport).

Po incydencie SEV-1: mini-audyt ad-hoc.

---

10.6. Harmonogram wdrożenia (D-7 → D+30)

D-7: topologia kolejek i alerty; dashboard KPI pusty, sprawdzony na danych testowych.

D-5: glosariusz/role-prompts zamrożone (v1.0); paczki Starter (Krok 5) gotowe.

D-3: dry-run publikacji: generacja → QA → FREEZE → staging (bez upublicznienia).

D-1: weryfikacja slotów, roster dyżurów, smoke test linków.

D-Day: Go-Live wg 10.1–10.2.

D+1..D+7: iteracje A/B, uzupełnienie FAQ, grooming backlogu patch-hintów.

D+30: przegląd KPI vs Targets v1, decyzja o kalibracji progów i slotów.

---

10.7. Pakiet „Ready-To-Run” (nazwy plików)

/deployment/
01_control_room.md
02_checklists_pre_post_go_live.md
03_kpi_dashboard_spec.json
04_telemetry_schema.json
05_incident_playbook.md
06_quarterly_audit_pack.md
07_calendar_slots_CEST.yaml
08_ops_runbook_queues.yaml
09_validator_rules_refs.md
10_change_log_glossary_and_macros.md

---

10.8. Standard utrzymania i zmian

Versioning: semver dla makr, glosariusza, rulesetów QA; FREEZE przy każdej istotnej zmianie.

Okna zmian: poza slotami LAUNCH; PR wymaga akceptacji Orchestratora i Evaluatora.

Szkolenia: krótkie „read-through” dla nowych członków (prowadzony z 01_control_room.md).

Retencja: artefakty/manifests ≥ 10 lat; audyty ≥ 12 miesięcy.

---

KROK 10/10 zakończony. Zestaw 1–10 stanowi kompletny przewodnik do rozdzielania pracy na różne modele AI, prowadzenia publikacji oraz utrzymania jakości i zgodności przez 5 lat.

---

📌 Source & Verification of Response

[Unverified] — Materiał operacyjny utworzony na bazie Twoich wytycznych i kroków 1–9; nie odwołuje się do zewnętrznych źródeł.

[✓ Verified] — Zgodność z przyjętymi regułami ADAM-MODE (etykietowanie, słowa ryzyka, minimalizacja PII, stopka).

[Inference] — Progi KPI/SLA i harmonogram wdrożenia są rozsądnymi założeniami operacyjnymi; mogą wymagać kalibracji po pierwszych publikacjach.