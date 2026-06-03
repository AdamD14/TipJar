# KROK 5/10 — „Starter packs”: gotowe szablony TaskSpec + szkielety OrchestrationPlan dla 7 typów zadań

Cel kroku: dostarczyć minimalne, produkcyjne szablony, które Orkiestrator może wypełnić i uruchomić natychmiast. Każdy pakiet zawiera: (A) TaskSpec (JSON) z placeholderami, (B) skrócony OrchestrationPlan (JSON) ze standardową ścieżką: Kurator → [Rola] → Evaluator → Freeze. Zgodne z Krokiem 1–4 (makra ADAM-MODE, glosariusz, API ROUTE/EXEC/REVIEW/FREEZE).

---

5.1. PR / Ogłoszenie (PL + EN)

A) TaskSpec (PR)

{
"task_id": "MKT-PR-{{yyyymmdd}}-{{seq}}",
"objective": "Przygotować ogłoszenie PR o {{temat}} dla TipJar+ (PL i EN).",
"persona": "Media tech, twórcy, inwestorzy",
"outputs": [
{"type":"markdown","length":"~400 słów","locale":"pl"},
{"type":"markdown","length":"~400 słów","locale":"en"},
{"type":"summary","length":"<=150 znaków","locale":"en"}
],
"constraints": {
"adam_mode": true,
"brand_tone": "klarowny, decyzyjny, bez żargonu",
"banned_words": ["Prevent","Guarantee","Will never","Fixes","Eliminates","Ensures that"],
"legal": ["RODO","brak obietnic finansowych"],
"style_guides": ["H2/H3","listy punktowane","CTA na końcu"]
},
"context_refs": [{"type":"doc","name":"Tipjar Growth Plan"}],
"privacy": {"pii": "none", "minimize_context": true},
"kpi_target": {"clarity_score": ">=0.8", "read_time":"<90s"},
"routing_hint": ["Curator","Copywriter","Evaluator","Freeze"],
"generation": {"max_tokens": 1200, "temperature": 0.5},
"tool_access": {"web_browse": false, "image_gen": false},
"review_policy": {"evaluator_required": true, "human_required": true},
"deadline_iso": "{{deadline_iso}}",
"logs": {"level":"brief","store_artifacts": true}
}

B) OrchestrationPlan (PR) – skrót

{
"plan_id":"PLAN-PR-{{yyyymmdd}}-{{seq}}",
"task_id":"MKT-PR-{{yyyymmdd}}-{{seq}}",
"version":"1.0.0",
"routing_hint":["Curator","Copywriter","Evaluator","Freeze"],
"artifacts_expected":[
{"id":"A1","type":"markdown","locale":"pl","desc":"PR/PL"},
{"id":"A2","type":"markdown","locale":"en","desc":"PR/EN"},
{"id":"A3","type":"summary","locale":"en","desc":"PR summary"}
],
"steps":[
{"step_id":"S1","role":"Curator","type":"CONTEXT_PACK","deps":[],"queue":"q.curator","status":"queued","max_attempts":3,"timeout_min":10},
{"step_id":"S2","role":"Copywriter","type":"GENERATE","deps":["S1"],"queue":"[q.copywriter.pl](http://q.copywriter.pl/)","status":"blocked","max_attempts":2,"timeout_min":20},
{"step_id":"S3","role":"Lokalizator","type":"LOCALIZE","deps":["S2"],"queue":"q.lokalizator.en","status":"blocked","max_attempts":2,"timeout_min":15},
{"step_id":"S4","role":"Evaluator","type":"QUALITY_CHECK","deps":["S2","S3"],"queue":"q.evaluator","status":"blocked","max_attempts":2,"timeout_min":10,"decision_gate":true},
{"step_id":"S5","role":"Freeze","type":"ARCHIVE_PUBLISH","deps":["S4"],"queue":"q.freeze","status":"blocked","max_attempts":1,"timeout_min":5}
],
"state":"planned"
}

---

5.2. Wideo krótkoformatowe (TikTok/Reels/Shorts, 30–35 s)

A) TaskSpec (Video)

{
"task_id": "MKT-VIDEO-{{yyyymmdd}}-{{seq}}",
"objective": "Stworzyć scenariusz + cut-sheet + napisy .srt dla wideo 30–35 s na {{platforma}} o {{temat}}.",
"persona": "{{rynek}}: {{persona_opis}}",
"outputs": [
{"type":"markdown","length":"~200 słów","locale":"{{locale}}"},
{"type":"file","format":"srt","locale":"{{locale}}"}
],
"constraints": {
"adam_mode": true,
"structure": "HOOK(0–3s)>PROBLEM>ROZWIĄZANIE>PROOF>CTA",
"style_guides": ["zdania krótkie","czas teraźniejszy","CTA jedno"],
"legal": ["RODO","brak roszczeń/zysków"],
"banned_words": ["Prevent","Guarantee","Will never","Fixes","Eliminates","Ensures that"]
},
"context_refs": [{"type":"doc","name":"Nieliniarna Strategia Marketingowa TipJar+"}],
"routing_hint": ["Curator","Scenarzysta","Evaluator","Freeze"],
"review_policy": {"evaluator_required": true, "human_required": true},
"deadline_iso": "{{deadline_iso}}"
}

B) OrchestrationPlan (Video) – skrót

{
"plan_id":"PLAN-VIDEO-{{yyyymmdd}}-{{seq}}",
"task_id":"MKT-VIDEO-{{yyyymmdd}}-{{seq}}",
"steps":[
{"step_id":"S1","role":"Curator","type":"CONTEXT_PACK","queue":"q.curator","status":"queued","max_attempts":3,"timeout_min":10},
{"step_id":"S2","role":"Scenarzysta","type":"GENERATE","deps":["S1"],"queue":"q.scenarzysta","status":"blocked","max_attempts":2,"timeout_min":20},
{"step_id":"S3","role":"Evaluator","type":"QUALITY_CHECK","deps":["S2"],"queue":"q.evaluator","status":"blocked","max_attempts":2,"timeout_min":10,"decision_gate":true},
{"step_id":"S4","role":"Freeze","type":"ARCHIVE_PUBLISH","deps":["S3"],"queue":"q.freeze","status":"blocked","max_attempts":1,"timeout_min":5}
],
"state":"planned"
}

---

5.3. Key Visual / Miniatury (3 warianty: Trust / Speed / Global)

A) TaskSpec (KV)

{
"task_id": "MKT-KV-{{yyyymmdd}}-{{seq}}",
"objective": "Zaprojektować 3 briefy KV (Trust/Speed/Global) + spec plików dla {{kanał}}.",
"persona": "Top-of-funnel odbiorcy",
"outputs": [
{"type":"markdown","length":"~250 słów","locale":"{{locale}}"},
{"type":"json","length":"spec","locale":"neutral"}
],
"constraints": {
"adam_mode": true,
"brand_colors": ["#003737","#FFD700","#4D194D","#DDE0DA","#BCC1B6"],
"accessibility": ["kontrast WCAG AA"],
"legal": ["RODO (brak PII)"]
},
"routing_hint": ["Curator","Kreator","Evaluator","Freeze"],
"review_policy": {"evaluator_required": true, "human_required": true},
"deadline_iso": "{{deadline_iso}}"
}

B) OrchestrationPlan (KV) – skrót

{
"plan_id":"PLAN-KV-{{yyyymmdd}}-{{seq}}",
"task_id":"MKT-KV-{{yyyymmdd}}-{{seq}}",
"steps":[
{"step_id":"S1","role":"Curator","type":"CONTEXT_PACK","queue":"q.curator","status":"queued","max_attempts":3,"timeout_min":8},
{"step_id":"S2","role":"Kreator","type":"GENERATE","deps":["S1"],"queue":"q.kreator","status":"blocked","max_attempts":2,"timeout_min":25},
{"step_id":"S3","role":"Evaluator","type":"QUALITY_CHECK","deps":["S2"],"queue":"q.evaluator","status":"blocked","max_attempts":2,"timeout_min":10,"decision_gate":true},
{"step_id":"S4","role":"Freeze","type":"ARCHIVE_PUBLISH","deps":["S3"],"queue":"q.freeze","status":"blocked","max_attempts":1,"timeout_min":5}
]
}

---

5.4. SEO: klastracja słów kluczowych + outline + meta

A) TaskSpec (SEO)

{
"task_id": "MKT-SEO-{{yyyymmdd}}-{{seq}}",
"objective": "Zbudować klaster słów kluczowych i outline artykułu dla tematu {{temat}} w {{locale}}.",
"persona": "Użytkownicy poszukujący rozwiązań napiwków USDC",
"outputs": [
{"type":"csv","length":"cluster","locale":"{{locale}}"},
{"type":"markdown","length":"outline H2/H3 + meta","locale":"{{locale}}"}
],
"constraints": {
"adam_mode": true,
"seo_rules": ["title<=60","desc<=155","keyword_intent","stage: TOFU/MOFU/BOFU"],
"banned_words": ["Guarantee","Ensures that"]
},
"routing_hint": ["Curator","SEO","Evaluator","Freeze"],
"review_policy": {"evaluator_required": true, "human_required": false},
"deadline_iso": "{{deadline_iso}}"
}

B) OrchestrationPlan (SEO) – skrót

{
"plan_id":"PLAN-SEO-{{yyyymmdd}}-{{seq}}",
"task_id":"MKT-SEO-{{yyyymmdd}}-{{seq}}",
"steps":[
{"step_id":"S1","role":"Curator","type":"CONTEXT_PACK","queue":"q.curator","status":"queued","max_attempts":3,"timeout_min":6},
{"step_id":"S2","role":"SEO","type":"GENERATE","deps":["S1"],"queue":"q.seo","status":"blocked","max_attempts":2,"timeout_min":20},
{"step_id":"S3","role":"Evaluator","type":"QUALITY_CHECK","deps":["S2"],"queue":"q.evaluator","status":"blocked","max_attempts":2,"timeout_min":8,"decision_gate":true},
{"step_id":"S4","role":"Freeze","type":"ARCHIVE_PUBLISH","deps":["S3"],"queue":"q.freeze","status":"blocked","max_attempts":1,"timeout_min":5}
]
}

---

5.5. Lokalizacja / Transkreacja (np. EN → ID, PT-BR)

A) TaskSpec (L10n)

{
"task_id": "MKT-L10N-{{yyyymmdd}}-{{seq}}",
"objective": "Zlokalizować materiał {{artifact_id_src}} z {{src_locale}} do {{dst_locale}} (transkreacja).",
"persona": "Odbiorcy lokalni ({{dst_locale}})",
"outputs": [
{"type":"markdown","length":"jak oryginał","locale":"{{dst_locale}}"},
{"type":"markdown","length":"lista zmian semantycznych","locale":"{{src_locale}}"}
],
"constraints": {
"adam_mode": true,
"keep_cta_intent": true,
"cultural_adaptation": true,
"legal": ["brak obietnic finansowych","lokalne normy językowe"]
},
"context_refs": [{"type":"artifact","name":"{{artifact_id_src}}"}],
"routing_hint": ["Curator","Lokalizator","Evaluator","Freeze"],
"review_policy": {"evaluator_required": true, "human_required": true},
"deadline_iso": "{{deadline_iso}}"
}

B) OrchestrationPlan (L10n) – skrót

{
"plan_id":"PLAN-L10N-{{yyyymmdd}}-{{seq}}",
"task_id":"MKT-L10N-{{yyyymmdd}}-{{seq}}",
"steps":[
{"step_id":"S1","role":"Curator","type":"CONTEXT_PACK","queue":"q.curator","status":"queued","max_attempts":3,"timeout_min":6"},
{"step_id":"S2","role":"Lokalizator","type":"LOCALIZE","deps":["S1"],"queue":"q.lokalizator.{{dst_locale}}","status":"blocked","max_attempts":2,"timeout_min":20},
{"step_id":"S3","role":"Evaluator","type":"QUALITY_CHECK","deps":["S2"],"queue":"q.evaluator","status":"blocked","max_attempts":2,"timeout_min":8,"decision_gate":true},
{"step_id":"S4","role":"Freeze","type":"ARCHIVE_PUBLISH","deps":["S3"],"queue":"q.freeze","status":"blocked","max_attempts":1,"timeout_min":5}
]
}

---

5.6. Outreach (DM/E-mail do twórców) + checklisty

A) TaskSpec (Outreach)

{
"task_id": "MKT-OUTREACH-{{yyyymmdd}}-{{seq}}",
"objective": "Przygotować 5 szablonów DM/E-mail do segmentu {{segment}} (A/B ton) oraz checklistę wykonawczą.",
"persona": "{{segment_opis}}",
"outputs": [
{"type":"markdown","length":"~300 słów","locale":"{{locale}}"},
{"type":"markdown","length":"checklista 15–25 punktów","locale":"{{locale}}"}
],
"constraints": {
"adam_mode": true,
"anti_spam": ["1 CTA","brak CAPS","personalizacja {{placeholder}}"],
"legal": ["RODO","opt-out w e-mailu"]
},
"routing_hint": ["Curator","Growth","Evaluator","Freeze"],
"review_policy": {"evaluator_required": true, "human_required": true},
"deadline_iso": "{{deadline_iso}}"
}

B) OrchestrationPlan (Outreach) – skrót

{
"plan_id":"PLAN-OUTREACH-{{yyyymmdd}}-{{seq}}",
"task_id":"MKT-OUTREACH-{{yyyymmdd}}-{{seq}}",
"steps":[
{"step_id":"S1","role":"Curator","type":"CONTEXT_PACK","queue":"q.curator","status":"queued","max_attempts":3,"timeout_min":6},
{"step_id":"S2","role":"Growth","type":"GENERATE","deps":["S1"],"queue":"q.growth","status":"blocked","max_attempts":2,"timeout_min":18},
{"step_id":"S3","role":"Evaluator","type":"QUALITY_CHECK","deps":["S2"],"queue":"q.evaluator","status":"blocked","max_attempts":2,"timeout_min":8,"decision_gate":true},
{"step_id":"S4","role":"Freeze","type":"ARCHIVE_PUBLISH","deps":["S3"],"queue":"q.freeze","status":"blocked","max_attempts":1,"timeout_min":5}
]
}

---

5.7. FAQ / Help Center (RAG) + „knowledge gaps”

A) TaskSpec (FAQ)

{
"task_id": "MKT-FAQ-{{yyyymmdd}}-{{seq}}",
"objective": "Wygenerować artykuł FAQ na temat {{temat}} + listę 3 braków wiedzy.",
"persona": "Twórcy i fani (self-service support)",
"outputs": [
{"type":"markdown","length":"~500 słów","locale":"{{locale}}"},
{"type":"markdown","length":"3 knowledge gaps","locale":"{{locale}}"}
],
"constraints": {
"adam_mode": true,
"rag_required": true,
"style_guides": ["H2 pytania","krótkie odpowiedzi","linki do Help Center"],
"legal": ["RODO","brak porad finansowo-prawnych"]
},
"context_refs": [{"type":"kb","name":"Help Center Core"}],
"routing_hint": ["Curator","Community/Support","Evaluator","Freeze"],
"review_policy": {"evaluator_required": true, "human_required": true},
"deadline_iso": "{{deadline_iso}}"
}

B) OrchestrationPlan (FAQ) – skrót

{
"plan_id":"PLAN-FAQ-{{yyyymmdd}}-{{seq}}",
"task_id":"MKT-FAQ-{{yyyymmdd}}-{{seq}}",
"steps":[
{"step_id":"S1","role":"Curator","type":"CONTEXT_PACK","queue":"q.curator","status":"queued","max_attempts":3,"timeout_min":8},
{"step_id":"S2","role":"CommunitySupport","type":"GENERATE_RAG","deps":["S1"],"queue":"q.support","status":"blocked","max_attempts":2,"timeout_min":20},
{"step_id":"S3","role":"Evaluator","type":"QUALITY_CHECK","deps":["S2"],"queue":"q.evaluator","status":"blocked","max_attempts":2,"timeout_min":10,"decision_gate":true},
{"step_id":"S4","role":"Freeze","type":"ARCHIVE_PUBLISH","deps":["S3"],"queue":"q.freeze","status":"blocked","max_attempts":1,"timeout_min":5}
]
}

---

Instrukcja: KROK 5/10 ukończony — 7 gotowych pakietów startowych (TaskSpec + OrchestrationPlan) dla głównych typów zadań.
Aby przejść dalej, wpisz „Dalej” — przygotuję KROK 6/10: Biblioteka walidatorów jakości (Evaluator rulesets) per typ zadania + raporty QA w formacie MD/JSON.

---

📌 Source & Verification of Response

[Unverified] — Szablony operacyjne opracowane na podstawie wcześniej zdefiniowanych zasad i materiałów projektowych; nie zawierają danych zewnętrznych.

[✓ Verified] — Zgodność z ADAM-MODE (etykiety, zakazane słowa, minimalizacja danych, stopka) oraz z krokami 1–4 (router, API, kolejki, DAM).

[Inference] — Dobór domyślnych timeoutów/retencji i struktur kroków odzwierciedla standardowe praktyki orkiestracji; nie stanowi gwarancji skuteczności w każdej infrastrukturze.