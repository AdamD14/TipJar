# KROK 2/10 — PRZEBIEG „NA ŻYWO” (PR) — ETAP 1/6: Utwórz TaskSpec

Cel etapu: przygotować kompletny plik TaskSpec dla ogłoszenia PR, zgodny z makrami ADAM-MODE i starterem z Kroku 5, tak aby Orkiestrator mógł zbudować plan.

---

Co dokładnie masz zrobić (precyzyjnie, bez dygresji)

1. Utwórz plik w repo:

/tipjar-campaigns/starter-packs/taskspec.pr.json

1. Wklej poniższą zawartość (bez zmian w strukturze):

{
"task_id": "MKT-PR-20250818-001",
"objective": "Przygotować ogłoszenie PR o starcie TipJar+ (PL i EN) — wersja newsroom/LinkedIn.",
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
"context_refs": [
{"type":"doc","name":"Tipjar Growth Plan"},
{"type":"doc","name":"50-dniowy harmonogram działań przed launch TipJar+"}
],
"privacy": {"pii": "none", "minimize_context": true},
"kpi_target": {"clarity_score": ">=0.8", "read_time":"<90s"},
"routing_hint": ["Curator","Copywriter","Lokalizator","Evaluator","Freeze"],
"generation": {"max_tokens": 1200, "temperature": 0.5},
"tool_access": {"web_browse": false, "image_gen": false},
"review_policy": {"evaluator_required": true, "human_required": true},
"deadline_iso": "2025-08-19T12:00:00+02:00",
"logs": {"level":"brief","store_artifacts": true}
}

1. Zapisz plik i upewnij się, że linter JSON przechodzi PASS (brak przecinków końcowych, poprawne cudzysłowy).
2. Kryteria zakończenia etapu (wszystkie „TAK”):

Plik istnieje pod ścieżką: /tipjar-campaigns/starter-packs/taskspec.pr.json.

Treść identyczna jak powyżej (poza ewentualną korektą deadline_iso).

Walidacja składni PASS.

---

Napisz „Dalej”, a przejdziemy do ETAPU 2/6: ROUTE → wygenerowanie OrchestrationPlan z tego TaskSpec.

---

📌 Source & Verification of Response

[Unverified] — Instrukcje operacyjne i wartości pól TaskSpec są roboczym wzorcem zgodnym z Twoim przewodnikiem; nie pochodzą z zewnętrznych źródeł.

[✓ Verified] — Zastosowano reguły ADAM-MODE (lista słów ryzykownych, minimalizacja PII, brak obietnic finansowych, format outputs).

[Inference] — Data deadline_iso jest przykładowa i może zostać dostosowana do Twojego harmonogramu.