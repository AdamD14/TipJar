# KROK 6/10 — Biblioteka walidatorów jakości (Evaluator rulesets) per typ zadania + format raportów QA (MD/JSON)

Cel kroku: dostarczyć gotowe reguły weryfikacyjne dla Evaluatora (checklisty, progi, schematy JSON), które jednoznacznie decydują o accept / revise / reject dla każdego typu zadania z Kroku 5. Walidatory działają deterministycznie (reguły → metryki → decyzja), a rekomendacje poprawek są generowane jako patch-hinty (diff-instrukcje).

---

6.1. Zasady globalne (stosowane do wszystkich artefaktów)

G1. Spójność ze specyfikacją wyjścia

format zgodny z TaskSpec.outputs[type] (md/csv/json/srt/txt/binary).

locale zgodny z TaskSpec.outputs[locale] (np. pl, en, es, pt-BR, id).

length w tolerancji ±15% (np. „~400 słów” ⇒ 340–460 słów).

Fail-hard gdy: zły typ pliku, złe locale, długość >±30%.

G2. ADAM-MODE i etykietowanie

Jeśli jakikolwiek fragment treści nie jest weryfikowalny z kontekstu → cały artefakt musi zaczynać się od [Unverified].

Twierdzenia o zachowaniu modeli LLM muszą mieć [Inference] lub [Unverified].

Stopka weryfikacyjna obowiązkowa (patrz G7). Brak ⇒ revise.

G3. Słowa zakazane (case-insensitive, z granicami słów)

Regex: \b(Prevent|Guarantee|Will\s+never|Fixes|Eliminates|Ensures\s+that)\b

Wykryto ⇒ revise z rekomendacją zamiany (np. „aim to”, „designed to”, „helps”).

G4. Prywatność i PII

Brak danych osobowych, o ile TaskSpec nie pozwala.

Placeholdery akceptowalne: {{creator_name}}, {{link}}, {{date_iso}}.

PII wykryte ⇒ reject (POLICY_VIOLATION).

G5. CTA i użyteczność

Jeśli TaskSpec przewiduje CTA: musi być jednoznaczne i widoczne (ostatni akapit/sekcja).

Brak CTA, gdy wymagane ⇒ revise.

G6. Styl i czytelność

Zdania krótkie/średnie (≤28 słów/zdanie; p95 ≤34).

„Fluff”/wypełniacze: penalizowane, ale nie blokujące (wpływają na ocenę „Clarity”).

„All caps” słowa nie będące akronimami (≥4 litery) ⇒ revise (Outreach: reject).

G7. Stopka weryfikacyjna (wymagana w tekstach)

📌 Source & Verification of Response

- [✓ Verified] — ...
- [Unverified] — ...
- [Inference] — ...
- [Speculation] — ...

Musi istnieć i być semantycznie zgodna z treścią. Brak ⇒ revise.

---

6.2. Metryki oceny i progi decyzji

ClarityScore (0–100)

Heurystyka: długość zdań, udział konkretów (liczby, nazwy), brak „fluff”, brak żargonu.

Progi: accept ≥ 80, revise 65–79, reject < 65.

ComplianceScore (0–100)

Zero zakazanych słów, poprawne etykietowanie, brak PII, zgodność locale/formatu.

Progi: accept = 100, revise = 90–99 (np. brak stopki), reject < 90.

ActionabilityScore (0–100) (gdy dotyczy: PR, Outreach, FAQ)

Wyraźne CTA, kroki/korzyści, struktura H2/H3.

Progi: accept ≥ 75, revise 60–74, reject < 60.

SEOScore (0–100) (tylko dla SEO)

Tytuł ≤60, opis ≤155, poprawna intencja/stage, brak kanibalizacji.

Progi: accept ≥ 85, revise 70–84, reject < 70.

VideoStructureScore (0–100) (tylko dla Video)

HOOK→PROBLEM→ROZWIĄZANIE→PROOF→CTA, kompletność SRT, timing.

Progi: accept ≥ 85, revise 70–84, reject < 70.

Decyzja końcowa

Jeśli ComplianceScore < 90 ⇒ reject.

Inaczej, jeśli którykolwiek score w revise ⇒ revise.

Inaczej ⇒ accept.

---

6.3. Rulesets per typ zadania

6.3.1. PR / Ogłoszenie

Struktura wymagana: Lead (≤40 słów) → 3–5 bulletów wartości → akapit „Jak działa” → CTA.

Nagłówki: min. 2 (H2/H3).

Ton: decyzyjny, bez żargonu.

Zakres claims: wyłącznie „opisowe”, bez gwarancji finansowych/regulacyjnych.

Testy:

ClarityScore ≥ 80, ComplianceScore = 100, ActionabilityScore ≥ 75.

Zakazane słowa = 0 trafień.

CTA obecne i jednoznaczne.

Etykieta [Unverified] na początku jeśli brak źródeł → wymagana dla treści generatywnej.

6.3.2. Wideo krótkoformatowe (script + SRT)

Struktura: HOOK(0–3s) / PROBLEM(3–8s) / ROZWIĄZANIE(8–20s) / PROOF(20–28s) / CTA(28–35s).

SRT walidacja:

Numeracja sekwencyjna od 1.

Format czasu HH:MM:SS,mmm --> HH:MM:SS,mmm.

Każdy wpis oddzielony pustą linią.

Łączny czas ≤ 00:00:35, pierwsza ramka start 00:00:00,000–00:00:00,800.

Testy:

VideoStructureScore ≥ 85, ComplianceScore = 100.

CTA jedno; zakazane słowa = 0; brak obietnic finansowych.

6.3.3. Key Visual / Miniatury (brief + spec JSON)

Brief MD: trzy warianty (Trust/Speed/Global), każdy z opisem motywu, kompozycji, copy na grafice (≤8 słów), alt-text.

Spec JSON: WIDTH, HEIGHT, SAFE_MARGINS, TEXT_AREAS, COLORS_USED (muszą zawierać brandowe), CONTRAST_AA:true.

Testy:

ComplianceScore = 100.

Kolory zawierają #003737 oraz jedno z: #FFD700 lub #4D194D.

Alt-text obecny; copy ≤8 słów; zakaz PII.

6.3.4. SEO (klastry + outline)

CSV: kolumny keyword,intent,locale,stage,priority(1–3). intent ∈ {informational, transactional, navigational}, stage ∈ {TOFU,MOFU,BOFU}.

Outline MD: H2/H3, meta-title ≤60, meta-description ≤155.

Testy:

SEOScore ≥ 85, ComplianceScore = 100.

Brak duplikatów słów kluczowych; locale zgodne; co najmniej 1 BOFU.

6.3.5. Lokalizacja / Transkreacja

Wymogi: zachowanie intencji CTA; lista zmian semantycznych (MD) z tagiem [Inference] przy interpretacjach.

Testy:

ComplianceScore = 100, ClarityScore ≥ 80.

Terminologia zgodna z glosariuszem (np. „napiwek”, „USDC”).

Brak kalek językowych; naturalna składnia lokalna.

6.3.6. Outreach (DM/E-mail + checklista)

Szablony: 5 wariantów (A/B ton: factual vs energetic), max. 120 słów, 1 CTA, brak CAPS (poza akronimami).

Checklista: 15–25 punktów, w tym opt-out (e-mail), personalizacja {{placeholder}}.

Testy:

ComplianceScore = 100, ActionabilityScore ≥ 80.

Anti-spam: ≤1 link, brak „spam trigger words” (np. „FREE!!!”).

Brak zbędnych załączników/obrazów (opisowo, bez binariów).

6.3.7. FAQ / Help Center (RAG)

Struktura: Min. 6 pytań H2; odpowiedzi ≤80 słów; linki do Help Center w nawiasach ({{link}}).

Knowledge gaps: 3 pozycje, każda z krótkim opisem brakującej odpowiedzi w KB.

Testy:

ComplianceScore = 100, ClarityScore ≥ 80, ActionabilityScore ≥ 75.

Jeśli rag_required:true w TaskSpec, sprawdź cytaty/odniesienia do KB; brak ⇒ revise.

---

6.4. Schematy JSON dla raportów QA

A) Raport pełny (qa.report.v1.json)

{
"schema": "qa.report.v1",
"plan_id": "PLAN-XXXX",
"step_id": "S3",
"artifacts": ["A1","A2"],
"scores": {
"clarity": 82,
"compliance": 100,
"actionability": 78,
"seo": null,
"video": null
},
"findings": {
"banned_words": [],
"pii": [],
"format_mismatches": [],
"locale_issues": [],
"footers": {"present": true, "valid": true},
"cta": {"present": true, "count": 1}
},
"violations": [],
"recommendations": [
{"target":"A1","type":"rewrite","desc":"Wzmocnij CTA","hint":"Zamknij lead krótkim wezwaniem do działania."}
],
"decision": "revise",
"evidence": {"hashes": {"A1":"<sha256>"}, "length_words": {"A1": 415}},
"timestamp": "2025-08-17T18:40:00+02:00"
}

B) Decyzja skrócona (qa.decision.v1.json)

{
"plan_id":"PLAN-XXXX",
"step_id":"S3",
"decision":"accept",
"blocking_issues": []
}

---

6.5. Patch-hinty (instrukcje poprawek)

Format „diff-propozycji” dla roli poprawiającej (np. Copywriter):

{
"patches": [
{
"artifact": "A1",
"action": "replace",
"selector": "last_paragraph",
"with": "Dodaj CTA: \"Załóż profil twórcy na tipjar.plus\"."
},
{
"artifact": "A1",
"action": "regex_replace",
"pattern": "\\b(Guarantee|Ensures\\s+that)\\b",
"with": "aim to"
}
]
}

---

6.6. Walidatory techniczne (pseudokody)

BannedWordsGuard

hits = regex_find(text, /\b(Prevent|Guarantee|Will\s+never|Fixes|Eliminates|Ensures\s+that)\b/i)
if hits.count > 0 => violation("BANNED_WORDS", hits)

LocaleGuard

if output.locale != task.expected_locale => violation("WRONG_LOCALE")

LengthGuard

expected = task.length_words   # np. 400
tol = 0.15
if words < expected*(1-tol) or words > expected*(1+tol) => warning("LENGTH_OUT_OF_TOL")
if |Δ| > 0.30 => violation("LENGTH_HARD_FAIL")

FooterGuard

if not contains_footer_block(text) => violation("FOOTER_MISSING")

SRTGuard (Video)

assert sequential_indices()
assert valid_timestamps()
assert duration <= 35s
assert gaps <= 1s

SEOGuard

assert len(title)<=60; assert len(description)<=155
assert intent in {informational, transactional, navigational}
assert stage in {TOFU, MOFU, BOFU}

PIIGuard

if detect_email/phone/address/names without placeholders => violation("PII_DETECTED")

---

6.7. Mapowanie reguł → decyzji

Warunek	Decyzja

ComplianceScore < 90	reject
Zakazane słowa ≥ 1	revise
Brak stopki / zły format / złe locale	revise
PII naruszenie	reject
ClarityScore lub ActionabilityScore w „revise”	revise
Wszystko PASS	accept

---

6.8. Raport QA (MD) — szablon tekstowy

# QA Report — Evaluator v1

## 1) Zgodność z TaskSpec

- Format/Locale/Length: PASS
- CTA: PASS | REVISE
- Stopka weryfikacyjna: PASS | REVISE

## 2) ADAM-MODE & Ryzyka

- Zakazane słowa: brak / [lista]
- PII: brak / [opis]
- Etykiety [Unverified]/[Inference]: poprawne / brak

## 3) Metryki

- ClarityScore: 82
- ComplianceScore: 100
- ActionabilityScore: 78
- SEOScore / VideoStructureScore: n/d

## 4) Rekomendacje (patch-hinty)

- [artifact A1] Dodaj CTA na końcu.
- Zamień „Ensures that” → „aim to”.

## 5) Decyzja

- **revise**

---

6.9. Mapowanie severity i eskalacje

Naruszenie	Severity	Działanie

PII / brak zgodności prawnej	SEV-1	reject, zgłoszenie do #alerts (legal)
Format/locale/stopka brak	SEV-2	revise, automatyczny patch-hint
Zakazane słowa	SEV-2	revise, wskazanie alternatyw
SRT błędy strukturalne	SEV-2	revise lub reject (jeśli >3 błędy)
Niska czytelność/CTA brak	SEV-3	revise, rekomendacje copy

---

6.10. Integracja z Orchestrator/Queues

Evaluator wywoływany przez REVIEW(...); zapisuje qa.report.v1.json + qa.decision.v1.json.

Jeśli decision = revise → Orchestrator dodaje krok rewizyjny (np. S2R) z patches.

Jeśli decision = reject → plan failed i bilet incident (severity wg tabeli).

Po FREEZE do manifestu dołączane są skróty hash i wskaźniki na raport QA.

---

Instrukcja: KROK 6/10 ukończony. Aby przejść dalej, wpisz „Dalej” — przygotuję KROK 7/10: Operacyjne „playbooks” publikacji per kanał (PR, Social, Video, SEO, E-mail) + kalendarz treści i sloty SLA.

---

📌 Source & Verification of Response

[Unverified] — Reguły walidacji i progi zostały opracowane na potrzeby orkiestracji TipJar+; nie odwołują się do zewnętrznych źródeł.

[✓ Verified] — Spójność z ADAM-MODE: etykietowanie, zakazane słowa, wymóg stopki, minimalizacja PII.

[Inference] — Heurystyki Clarity/Actionability/Video/SEO oparte na dobrych praktykach; nie stanowią gwarancji wyników.