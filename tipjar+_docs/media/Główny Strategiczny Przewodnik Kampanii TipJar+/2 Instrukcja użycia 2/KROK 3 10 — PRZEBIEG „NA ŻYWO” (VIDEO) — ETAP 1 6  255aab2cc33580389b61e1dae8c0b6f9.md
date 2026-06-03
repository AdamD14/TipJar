# KROK 3/10 — PRZEBIEG „NA ŻYWO” (VIDEO) — ETAP 1/6: Utwórz TaskSpec dla krótkiego wideo (30–35 s)

Cel etapu: przygotować kompletny TaskSpec dla jednego krótkiego wideo (TikTok, 30–35 s), aby Orkiestrator mógł zbudować plan i uruchomić produkcję (script + cut-sheet + SRT).

---

Wykonaj dokładnie te czynności

1. Utwórz plik:

/tipjar-campaigns/starter-packs/taskspec.video.json

1. Wklej poniższą zawartość (bez zmian w strukturze):

{
"task_id": "MKT-VIDEO-20250818-001",
"objective": "Stworzyć scenariusz + cut-sheet + napisy .srt dla wideo 30–35 s na TikTok o starcie tipjar+.",
"persona": "PL: twórcy wideo, streamerzy; odbiorcy mobilni 18–34",
"outputs": [
{"type":"markdown","length":"~200 słów","locale":"pl"},
{"type":"file","format":"srt","locale":"pl"}
],
"constraints": {
"adam_mode": true,
"structure": "HOOK(0–3s)>PROBLEM(3–8s)>ROZWIĄZANIE(8–20s)>PROOF(20–28s)>CTA(28–35s)",
"style_guides": ["zdania krótkie","czas teraźniejszy","1 CTA","copy na ekranie ≤ 6 słów"],
"legal": ["RODO","brak obietnic finansowych"],
"banned_words": ["Prevent","Guarantee","Will never","Fixes","Eliminates","Ensures that"]
},
"context_refs": [
{"type":"doc","name":"Nieliniarna Strategia Marketingowa TipJar+"},
{"type":"doc","name":"Tipjar Growth Plan"}
],
"privacy": {"pii": "none", "minimize_context": true},
"routing_hint": ["Curator","Scenarzysta","Evaluator","Freeze"],
"generation": {"max_tokens": 900, "temperature": 0.5},
"tool_access": {"web_browse": false, "image_gen": false},
"review_policy": {"evaluator_required": true, "human_required": true},
"deadline_iso": "2025-08-19T17:00:00+02:00",
"logs": {"level":"brief","store_artifacts": true}
}

1. Zapisz plik i uruchom linter JSON — wynik musi być PASS.
2. Kryteria zakończenia etapu (wszystkie „TAK”):

Plik istnieje pod ścieżką: /tipjar-campaigns/starter-packs/taskspec.video.json.

Treść identyczna jak powyżej (możesz dopasować deadline_iso do realnego slotu).

Walidacja składni PASS.

---

Napisz „Dalej”, a przejdę do ETAPU 2/6: ROUTE → wygenerowanie OrchestrationPlan dla VIDEO.

---

📌 Source & Verification of Response

[Unverified] — Zadaniowy TaskSpec przygotowany według wewnętrznych wzorców orkiestracji i szablonów z wcześniejszych kroków; brak zewnętrznych źródeł.

[✓ Verified] — Zgodność z ADAM-MODE (etykietowanie, słowa ryzyka, minimalizacja PII, struktura wyjść).

[Inference] — Wyboru platformy „TikTok” i metadanych person dokonano pragmatycznie dla uruchomienia przepływu; można je później doprecyzować.