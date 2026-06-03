# KROK 3/10 — Specyfikacja OrchestrationPlan (JSON), API poleceń ROUTE / EXEC / REVIEW / FREEZE oraz wzorce kolejek z SLA

Cel kroku: sformalizować, jak Orkiestrator buduje plan pracy dla wielu modeli AI, jak zadania są wykonywane i oceniane, oraz jak wymuszamy jakość (SLA, retry, audyt).

---

3.1. Model danych: OrchestrationPlan

{
"plan_id": "PLAN-2025-000123",
"task_id": "MKT-2025-0001",
"version": "1.0.0",
"created_at": "2025-08-17T14:00:00+02:00",
"owner": "orchestrator@tipjar.plus",
"routing_hint": ["Curator","Copywriter","Evaluator","Freeze"],
"sla": {
"plan_deadline": "2025-08-18T12:00:00+02:00",
"default_step_timeout_min": 30,
"breach_policy": "ALERT_AND_ESCALATE"
},
"security": {
"pii_scope": "none",
"context_minimization": true,
"redaction_rules_id": "RR-1.0"
},
"guardrails": {
"macros": ["ADAM_BASE","LABELING","BANNED_WORDS","PRIVACY_MIN","OUTPUT_SCHEMA","QA_FOOTER","REJECTION"],
"glossary_version": "1.0"
},
"owners": [
{"role":"Curator","model":"LLM-A@vX","endpoint":"curator.svc"},
{"role":"Copywriter","model":"LLM-B@vY","endpoint":"copy.svc"},
{"role":"Evaluator","model":"LLM-C@vZ","endpoint":"eval.svc"}
],
"artifacts_expected": [
{"id":"A1","type":"markdown","locale":"pl","desc":"PR ogłoszenie PL"},
{"id":"A2","type":"markdown","locale":"en","desc":"PR ogłoszenie EN"},
{"id":"A3","type":"summary","locale":"en","desc":"150-char summary"}
],
"steps": [
{
"step_id": "S1",
"role": "Curator",
"type": "CONTEXT_PACK",
"inputs": ["TaskSpec:MKT-2025-0001"],
"outputs_expected": [{"artifact":"CTX1","type":"md"}],
"deps": [],
"queue": "q.curator",
"priority": 2,
"status": "queued",
"attempts": 0,
"max_attempts": 3,
"timeout_min": 10
},
{
"step_id": "S2",
"role": "Copywriter",
"type": "GENERATE",
"inputs": ["CTX1","Glossary:v1"],
"outputs_expected": [{"artifact":"A1"},{"artifact":"A2"},{"artifact":"A3"}],
"deps": ["S1"],
"queue": "q.copywriter",
"priority": 2,
"status": "blocked",
"attempts": 0,
"max_attempts": 2,
"timeout_min": 20
},
{
"step_id": "S3",
"role": "Evaluator",
"type": "QUALITY_CHECK",
"inputs": ["A1","A2","A3","TaskSpec","Glossary:v1"],
"outputs_expected": [{"artifact":"QA1","type":"md"}],
"deps": ["S2"],
"queue": "q.evaluator",
"priority": 1,
"status": "blocked",
"attempts": 0,
"max_attempts": 2,
"timeout_min": 10,
"decision_gate": true
},
{
"step_id": "S4",
"role": "Freeze",
"type": "ARCHIVE_PUBLISH",
"inputs": ["A1","A2","A3","QA1"],
"outputs_expected": [{"artifact":"MANIFEST","type":"json"}],
"deps": ["S3"],
"queue": "q.freeze",
"priority": 1,
"status": "blocked",
"attempts": 0,
"max_attempts": 1,
"timeout_min": 5
}
],
"audit": [],
"state": "planned"
}

Pola kluczowe:

steps[].status: queued | running | blocked | done | failed | rejected.

decision_gate:true wymaga akceptu Evaluator → accept przed przejściem dalej.

security.redaction_rules_id: wskazuje zestaw reguł anonimizacji kontekstu dla danej klasy zadań.

---

3.2. API poleceń

3.2.1 ROUTE(TaskSpec) → OrchestrationPlan

Wejście: TaskSpec (Krok 1), routing_hint, sla.

Walidacje: kompletność TaskSpec; dopasowanie outputs do artifacts_expected.

Wyjście: pełny OrchestrationPlan (status planned) lub błąd.

Schemat żądania:

{
"cmd": "ROUTE",
"task_spec_ref": "MKT-2025-0001",
"routing_hint": ["Curator","Copywriter","Evaluator","Freeze"],
"sla": {"plan_deadline":"2025-08-18T12:00:00+02:00"}
}

Schemat odpowiedzi (skrót):

{"ok": true, "plan": { "...": "OrchestrationPlan JSON" }}

Kody błędów:

E-ROUTE-001 brak wymaganych pól TaskSpec.

E-ROUTE-002 niespójne outputs vs artifacts_expected.

E-ROUTE-003 brak dostępnego ownera danej roli.

---

3.2.2 EXEC(plan_id, step_id) → JobHandle

Działanie: wrzuca krok do odpowiedniej kolejki roli (steps[].queue).

Idempotencja: klucz plan_id:step_id:attempts.

Wyjście: job_id, status enqueued.

Żądanie:

{"cmd":"EXEC","plan_id":"PLAN-2025-000123","step_id":"S2"}

Odpowiedź:

{"ok": true, "job_id":"JOB-9fd31", "queue":"q.copywriter", "status":"enqueued"}

Kody błędów:
E-EXEC-001 krok nie w stanie queued; E-EXEC-002 brak zależności (deps niespełnione); E-EXEC-003 timeout/SLA już naruszone.

---

3.2.3 REVIEW(plan_id, step_id, artifact_ids[]) → QA Report + decision

Działanie: uruchamia Evaluatora dla artefaktów; zapisuje QA1 i decyzję.

Decyzje: accept | revise | reject.

Efekt: jeśli accept → odblokuj następny krok; jeśli revise → dodaj krok poprawkowy; jeśli reject → failed.

Żądanie:

{
"cmd":"REVIEW",
"plan_id":"PLAN-2025-000123",
"step_id":"S3",
"artifacts":["A1","A2","A3"]
}

Odpowiedź (skrót):

{
"ok": true,
"qa_artifact": "QA1",
"decision": "revise",
"violations": ["BANNED_WORDS: 'Guarantee'"],
"recommendations": ["zamień 'Guarantee' na 'aim' lub usuń"]
}

Kody błędów:
E-REV-001 artefakt nie istnieje; E-REV-002 brak uprawnienia do bramki; E-REV-003 niespójny format outputu.

---

3.2.4 FREEZE(plan_id) → Manifest (publication)

Działanie: finalizuje plan, zapisuje artefakty do DAM/Repo, generuje manifest (ścieżki, sumy SHA256, metadane).

Efekt: state: completed.

Żądanie:

{"cmd":"FREEZE","plan_id":"PLAN-2025-000123"}

Odpowiedź (skrót):

{
"ok": true,
"manifest": {
"plan_id":"PLAN-2025-000123",
"artifacts": [
{"id":"A1","uri":"dam://campaigns/PR/A1.md","sha256":"..."},
{"id":"A2","uri":"dam://campaigns/PR/A2.md","sha256":"..."},
{"id":"A3","uri":"dam://campaigns/PR/A3.txt","sha256":"..."},
{"id":"QA1","uri":"dam://campaigns/PR/QA1.md","sha256":"..."}
]
}
}

Kody błędów:
E-FRZ-001 brak QA accept; E-FRZ-002 brak wymaganych artefaktów; E-FRZ-003 błąd zapisu w DAM.

---

3.3. Maszyna stanów (tekstowa)

1. planned → (EXEC S1) → running
2. po sukcesie S1: S2 queued → (EXEC S2) → running
3. po sukcesie S2: S3 queued → (REVIEW) → decision: accept|revise|reject

accept → S4 queued

revise → wstaw krok S2R (rewizja) i powtórz S3

reject → state: failed

1. po sukcesie S4 → state: completed

Błędy/timeouty: krok → failed; jeśli attempts < max_attempts → retry z backoffem; inaczej → DLQ + alert SLA.

---

3.4. Wzorce kolejek z SLA

Kolejki per rola: q.curator, q.copywriter, q.evaluator, q.freeze (możliwe shardy per locale: np. q.copywriter.en).

Priorytety (1 wysoki – 3 niski): Launch/PR = 1; content evergreen = 3.

Retry policy: wykładniczy backoff (np. 1′, 4′, 9′), max_attempts per step.

DLQ (dead-letter queue): q.dlq.role; automatyczny incident + skrót logów do #alerts.

SLA monitor: timer na step i plan; przy t_remaining < 20% → WARN, po przekroczeniu → BREACH (eskalacja).

Idempotencja: job_id wyliczany z (plan_id, step_id, attempts); wielokrotne dostarczenie ignorowane.

Konkurencja: limiter równoległości per rola (np. concurrency.copywriter = 5); fairness przez round-robin między planami.

---

3.5. Schemat audit log

{
"ts":"2025-08-17T14:21:05+02:00",
"actor":"system/queue",
"plan_id":"PLAN-2025-000123",
"step_id":"S2",
"event":"STEP_COMPLETED",
"meta":{"duration_ms":7123,"artifacts":["A1","A2","A3"],"sha256":["...","...","..."]}
}

Zdarzenia: PLAN_CREATED, STEP_ENQUEUED, STEP_STARTED, STEP_COMPLETED, STEP_FAILED, QA_DECISION, SLA_WARN, SLA_BREACH, PLAN_COMPLETED.

---

3.6. Walidacje i reguły jakości

Format outputs: zgodny z TaskSpec.outputs (typ, locale, długości); twarde odrzucenie przy niezgodności.

Guardrails makr: Evaluator wykrywa naruszenia (np. zakazane słowa) i zwraca revise z punktowymi rekomendacjami.

Redakcja PII: przed EXEC każdy payload przechodzi redaction_rules_id.

Stopka weryfikacyjna: obowiązkowa w materiałach tekstowych (nie dotyczy artefaktów binarnych).

---

3.7. Przykład end-to-end (skrót)

1. ROUTE → plan PLAN-2025-000123.
2. EXEC S1 (Curator) → [CTX1.md](http://ctx1.md/).
3. EXEC S2 (Copywriter) → [A1.md](http://a1.md/) (PL), [A2.md](http://a2.md/) (EN), A3.txt.
4. REVIEW S3 (Evaluator) → [QA1.md](http://qa1.md/), decyzja revise (wykryto „Ensures that”).
5. EXEC S2R (Copywriter-revise) → poprawione A1,A2,A3.
6. REVIEW S3 → accept.
7. FREEZE → manifest + publikacja do DAM → completed.

---

3.8. Minimalne schematy JSON (walidacja)

{
"$id": "OrchestrationPlan.step.v1",
"type": "object",
"required": ["step_id","role","type","queue","status","max_attempts","timeout_min"],
"properties": {
"step_id":{"type":"string"},
"role":{"enum":["Curator","Copywriter","Lokalizator","Kreator","Scenarzysta","SEO","Growth","Evaluator","Freeze"]},
"type":{"type":"string"},
"queue":{"type":"string"},
"status":{"enum":["queued","running","blocked","done","failed","rejected"]},
"deps":{"type":"array","items":{"type":"string"}},
"attempts":{"type":"integer","minimum":0},
"max_attempts":{"type":"integer","minimum":1},
"timeout_min":{"type":"integer","minimum":1},
"priority":{"type":"integer","minimum":1,"maximum":3}
}
}

---

3.9. Bezpieczeństwo i zgodność

Minimalizacja kontekstu (PII → placeholdery) zgodnie z security.context_minimization:true.

Ślady danych: wszystkie wejścia/wyjścia wersjonowane i haszowane.

Odmowa automatyczna: jeśli TaskSpec wymusza treści sprzeczne z makrami/brand-policy → reject z raportem.

---

Instrukcja: KROK 3/10 dostarczony. Aby kontynuować, wpisz „Dalej” — przejdę do KROKU 4/10 — Szablony kolejek operacyjnych (deploy), polityki retry/DLQ, oraz standardy artefaktów (naming, hashing, DAM manifest).

---

📌 Source & Verification of Response

[Unverified] — Specyfikacja zaprojektowana na potrzeby orkiestracji wielomodelowej TipJar+; brak zewnętrznych źródeł.

[✓ Verified] — Spójność z zasadami ADAM-MODE: etykietowanie, brak obietnic ryzykownych, minimalizacja kontekstu, stopka weryfikacyjna.

[Inference] — Dobór wartości domyślnych SLA/priorytetów stanowi rozsądny wzorzec inżynieryjny, nie jest potwierdzony danymi produkcyjnymi.