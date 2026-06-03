# KROK 1/10 — Orkiestracja wielomodelowa: mapa ról, zasady trasowania i jednolity format zadań

Cel kroku: zdefiniować klarowny podział pracy między różnymi modelami AI oraz sposób kierowania do nich zadań w TipJar+, tak aby każdy kolejny moduł (prompty, ewaluacja, automatyzacja) mógł oprzeć się na jednej, spójnej specyfikacji.

---

1. Zasady nadrzędne (governance)

Jeden Orkiestrator (agent sterujący) wydaje dyspozycje; modele wykonawcze nie rozmawiają ze sobą bezpośrednio.

Minimalizacja danych: modele dostają wyłącznie niezbędny kontekst (privacy by design).

ADAM-MODE: praca w krokach, jawne etykiety weryfikacji, brak spekulacji, brak nieproszonych „opcji”.

Check-gates: każde wyjście przechodzi przez Evaluator LLM i ewentualny Human-in-the-Loop przed publikacją.

---

1. Katalog ról i odpowiedzialności (wielomodelowo)

A. Orkiestrator (router/planista)

Odp.: przydział zadań, harmonogram, priorytety, pilnowanie polityk (RODO, brand).

Wejścia: TaskSpec (poniżej). Wyjścia: polecenia EXEC/REVIEW do pozostałych ról.

B. Kurator Kontekstu (RAG/Knowledge)

Odp.: wyszukiwanie, destylacja i „pakowanie” kontekstu do minimalnych paczek.

Narzędzia: wewn. baza, wcześniejsze strategie, brandbook, repo promptów.

C. Copywriter LLM (teksty długie/krótkie)

Odp.: teksty PR/landing/social/email/ads; trzyma tonalność, brand i ADAM-MODE.

D. Lokalizator LLM (i transkreacja)

Odp.: tłumaczenie + adaptacja kulturowa (PL/EN/ES/PT-BR/ID itd.).

E. Kreator Wizualny (obraz/grafika)

Odp.: key-visuale, miniatury, infografiki na podstawie briefów copy.

F. Scenarzysta & Montaż Wideo (script → cut-sheet)

Odp.: skrypty Shorts/Reels/TikTok, listy ujęć, napisy, hooki 3–5 s.

G. SEO/SEM Analyst LLM (dane → rekomendacje)

Odp.: klastracja słów kluczowych, meta-tagi, struktury treści, budżety Ads.

H. Growth/Ops LLM (automatyzacje, templatki outreach)

Odp.: generowanie szablonów DM/mail, checklist operacyjnych, playbooków.

I. Evaluator LLM (QA/Compliance)

Odp.: walidacja zgodności z briefem, ADAM-MODE, RODO, zakaz słów ryzykownych.

J. Community/Support LLM (FAQ/chat)

Odp.: odpowiedzi 1. linii, eskalacje do ludzi, ekstrakcja insightów.

> Każda rola może być realizowana innym modelem/familą (np. GPT/Claude/Gemini/vision-model), ale interfejs pracy pozostaje identyczny (TaskSpec).
> 

---

1. Tablica trasowania zadań (Routing v1)

Typ zadania	Preferowana rola/model	Wejścia kluczowe	Wyjście docelowe	Gate’y

PR/ogłoszenie launch	Copywriter LLM	brief, USP, cytaty, KPI	.md + warianty 50/150/300 znaków	Evaluator → Human
Wideo 30–45 s (TikTok/Shorts)	Scenarzysta & Montaż	persona, cel, CTA, brand cues	script + cut-sheet + captions .srt	Evaluator
KV + miniatury	Kreator Wizualny	claim, layout, ograniczenia brand	3 warianty PNG/SVG + alt-text	Evaluator
SEO klaster „crypto tipping”	SEO/SEM Analyst	region, język, konkurencja	keyword-clusters.csv + outline .md	Evaluator
Lokalizacja kampanii (ID, PT-BR)	Lokalizator LLM	oryginał, glosariusz, normy kulturowe	wersje lokalne .md	Evaluator → Human (native)
Outreach do twórców (templatki)	Growth/Ops LLM	segment, tony, ograniczenia anty-spam	5 wariantów DM/email .md	Evaluator
FAQ/Help Center	Community/Support LLM + RAG	baza wiedzy, polityki	Q/A .md + zapytania brakujące	Evaluator → Human

---

1. Jednolity format zadań — TaskSpec v1 (JSON)

{
"task_id": "MKT-2025-0001",
"objective": "Stworzyć ogłoszenie PR (PL/EN) o starcie TipJar+",
"persona": "Media tech + twórcy",
"outputs": [
{"type":"markdown","length":"~400 słów","locale":"pl"},
{"type":"markdown","length":"~400 słów","locale":"en"},
{"type":"summary","length":"150 znaków","locale":"en"}
],
"constraints": {
"adam_mode": true,
"brand_tone": "klarowny, decyzyjny, bez żargonu",
"banned_words": ["Guarantee","Ensures that","Fixes"],
"legal": ["RODO","brak roszczeń finansowych"],
"style_guides": ["nagłówki H2/H3","listy punktowane"]
},
"context_refs": [
{"type":"doc","name":"Tipjar Growth Plan"},
{"type":"doc","name":"50-dniowy harmonogram"}
],
"privacy": {"pii": "none", "minimize_context": true},
"kpi_target": {"read_time":"<90s","clarity_score":">=0.8"},
"routing_hint": ["Copywriter LLM","Lokalizator LLM","Evaluator LLM"],
"generation": {"max_tokens": 900, "temperature": 0.5},
"tool_access": {"web_browse": false, "image_gen": false},
"review_policy": {"evaluator_required": true, "human_required": false},
"deadline_iso": "2025-08-17T23:59:00+02:00",
"logs": {"level": "brief", "store_artifacts": true}
}

Uwagi implementacyjne:

context_refs wskazują tylko nazwy pakietów wiedzy; Kurator Kontekstu wstrzykuje skrót (≤300 słów).

constraints.banned_words wspiera ADAM-MODE (modele mają oznaczać naruszenia lub odrzucić zadanie).

review_policy definiuje bramki jakości; Evaluator LLM porównuje wynik z objective/constraints i generuje raport QA.

---

1. Polityki jakości i zgodności (quality gates)

Evaluator LLM – szablon oceny (QA-form):

1. Zgodność z objective (0/1)
2. Spełnienie constraints (lista PASS/FAIL)
3. Etykiety weryfikacji: [✓ Verified] vs [Unverified] dla treści niedowodliwych
4. Ryzyka prawne/RODO (opis + rekomendacje)
5. Rekomendacja: accept / revise / reject + lista poprawek

Human check wymuszony dla: materiałów prasowych, wideo długich, treści lokalizowanych w nowych krajach, tematów wrażliwych.

---

1. Interfejs poleceń (dla Orkiestratora i ludzi)

ROUTE(TaskSpec) → przydziela: Kurator → [Rola_X] → Evaluator → (Human?).

EXEC(Role, Payload) → wymusza wykonanie przez wskazaną rolę.

REVIEW(Evaluator, Output) → raport QA + zalecenia poprawek.

FREEZE(v1.0) → zamraża artefakty (wersjonowanie) i publikuje do DAM/CRM.

---

1. RACI (wybrane przypadki)

Obszar	Responsible	Accountable	Consulted	Informed

Copy PR	Copywriter LLM	Orkiestrator	Evaluator, Legal	Zespół Marketing
Lokalizacja	Lokalizator LLM	Orkiestrator	Native Reviewer	Zespół Regionu
KV Grafika	Kreator Wizualny	Orkiestrator	Brand Lead	Growth/Ads
SEO Klastery	SEO/SEM Analyst	Orkiestrator	Content Lead	Dev/Website

---

1. Przykłady tras (minimalne)

PR Launch (PL/EN): ROUTE → Kurator (skrót z Growth Plan) → Copywriter (2 wersje) → Lokalizator (EN) → Evaluator (QA) → FREEZE v1.0.

TikTok 30 s (ID): ROUTE → Kurator (lokalny insight) → Scenarzysta (script + hook + CTA) → Lokalizator (ID) → Evaluator (brand/ADAM-MODE) → FREEZE.

SEO „USDC tipping” (ES): ROUTE → SEO Analyst (cluster + outline) → Copywriter (draft) → Evaluator (on-page checklist) → FREEZE.

---

Instrukcja: To jest KROK 1/10. Jeśli akceptujesz mapę ról, zasady trasowania i TaskSpec v1, napisz „Dalej”, a przejdę do KROKU 2/10 — Biblioteka promptów rolowych (role-prompts), glosariusz brandowy i makra ADAM-MODE dla każdej roli.

---

📌 Source & Verification of Response

[Unverified] — Dokument roboczy opracowany na podstawie Twoich wytycznych i wcześniejszych materiałów projektowych; nie zawiera treści wymagających zewnętrznej weryfikacji.

[✓ Verified] — Zasady ADAM-MODE i wymagania proceduralne zastosowane konsekwentnie w strukturze kroku.

[KROK 2/10 — Biblioteka promptów rolowych + glosariusz marki + makra ADAM-MODE](KROK%201%2010%20%E2%80%94%20Orkiestracja%20wielomodelowa%20mapa%20r%C3%B3l,%20z/KROK%202%2010%20%E2%80%94%20Biblioteka%20prompt%C3%B3w%20rolowych%20+%20glosari%20255aab2cc335800f85b8c3b748535989.md)