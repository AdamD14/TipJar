# KROK 2/10 — PRZEBIEG „NA ŻYWO” (PR) — ETAP 5/6: FREEZE → manifest, podpisy i publikacja do DAM (v1.0.1)

Cel etapu: zamrozić zaakceptowane artefakty (A1/A2/A3 + QA1), nadać wersje, policzyć skróty, podpisać i opublikować do przestrzeni DAM zgodnie z namingiem (Krok 4.3) i integralnością (Krok 4.4–4.6). Poniżej czynności do wykonania — wykonaj je w tej kolejności.

---

1. Ustal wersje i ścieżki docelowe (SEMVER)

A1 (PL): v1.0.1

A2 (EN): v1.0.1

A3 (EN, summary): v1.0.1

QA1 (raport MD): v1.0.0 (wewnętrzne)

Docelowe URI DAM (zgodnie z namingiem):

dam://campaigns/launch2025/pr/pl/2025/08/18/A1_ogloszenie-startu-tipjar-plus_v1.0.1.md
dam://campaigns/launch2025/pr/en/2025/08/18/A2_tipjar-plus-launch-announcement_v1.0.1.md
dam://campaigns/launch2025/pr/en/2025/08/18/A3_summary_v1.0.1.txt
dam://campaigns/launch2025/pr/pl/2025/08/18/QA1_raport-qa_v1.0.0.md     (internal)

---

1. Skopiuj artefakty z draft → DAM (bez zmian treści)

Źródła (z poprzedniego etapu):

/tipjar-campaigns/.artifacts/draft/launch2025/pr/pl/2025/08/18/A1_ogloszenie-startu-tipjar-plus_v1.0.0.md
/tipjar-campaigns/.artifacts/draft/launch2025/pr/en/2025/08/18/A2_tipjar-plus-launch-announcement_v1.0.0.md
/tipjar-campaigns/.artifacts/draft/launch2025/pr/en/2025/08/18/A3_summary_v1.0.0.txt
/tipjar-campaigns/.artifacts/draft/PLAN-PR-20250818-001/QA1_report.md

Dla A1/A2/A3 zmień wyłącznie wersję w nazwie pliku na v1.0.1 przy publikacji do DAM. QA1_report.md zapisz jako QA1_raport-qa_v1.0.0.md (klasa: internal).

---

1. Policz skróty i wygeneruj podpisy (integrity)

Algorytm hash: SHA-256 dla każdego artefaktu.

Podpis: ed25519, key_id: "tipjar-cicd@2025"; rozszerzenie .sig.

Wynik (placeholdery do uzupełnienia):

A1 → sha256: <hex_A1>  | sig: <hex_sig_A1>
A2 → sha256: <hex_A2>  | sig: <hex_sig_A2>
A3 → sha256: <hex_A3>  | sig: <hex_sig_A3>
QA1 → sha256: <hex_QA1> | (podpis opcjonalny; zalecany)

---

1. Utwórz manifest FREEZE (JSON) i zapisz go w DAM

Plik docelowy:

dam://campaigns/_manifests/PLAN-PR-20250818-001.json

Zawartość (wklej, uzupełnij wartości w <> i {{…}}):

{
"schema": "dam.manifest.v1",
"plan_id": "PLAN-PR-20250818-001",
"frozen_at": "{{now_iso}}",
"publisher": "freeze@tipjar.plus",
"artifacts": [
{
"id": "A1",
"uri": "dam://campaigns/launch2025/pr/pl/2025/08/18/A1_ogloszenie-startu-tipjar-plus_v1.0.1.md",
"hash": { "sha256": "<hex_A1>" },
"size_bytes": <bytes_A1>,
"content_type": "text/markdown; charset=utf-8",
"locale": "pl",
"type": "markdown",
"created_by_role": "Copywriter",
"source_step": "S2",
"derived_from": [],
"data_classification": "public"
},
{
"id": "A2",
"uri": "dam://campaigns/launch2025/pr/en/2025/08/18/A2_tipjar-plus-launch-announcement_v1.0.1.md",
"hash": { "sha256": "<hex_A2>" },
"size_bytes": <bytes_A2>,
"content_type": "text/markdown; charset=utf-8",
"locale": "en",
"type": "markdown",
"created_by_role": "Copywriter",
"source_step": "S2",
"derived_from": [],
"data_classification": "public"
},
{
"id": "A3",
"uri": "dam://campaigns/launch2025/pr/en/2025/08/18/A3_summary_v1.0.1.txt",
"hash": { "sha256": "<hex_A3>" },
"size_bytes": <bytes_A3>,
"content_type": "text/plain; charset=utf-8",
"locale": "en",
"type": "summary",
"created_by_role": "Copywriter",
"source_step": "S2",
"derived_from": [],
"data_classification": "public"
},
{
"id": "QA1",
"uri": "dam://campaigns/launch2025/pr/pl/2025/08/18/QA1_raport-qa_v1.0.0.md",
"hash": { "sha256": "<hex_QA1>" },
"size_bytes": <bytes_QA1>,
"content_type": "text/markdown; charset=utf-8",
"locale": "pl",
"type": "markdown",
"created_by_role": "Evaluator",
"source_step": "S4",
"derived_from": ["A1", "A2", "A3"],
"data_classification": "internal"
}
],
"signatures": [
{ "artifact_id": "A1", "sig_uri": "dam://campaigns/launch2025/pr/pl/2025/08/18/A1_ogloszenie-startu-tipjar-plus_v1.0.1.md.sig", "algo": "ed25519", "key_id": "tipjar-cicd@2025" },
{ "artifact_id": "A2", "sig_uri": "dam://campaigns/launch2025/pr/en/2025/08/18/A2_tipjar-plus-launch-announcement_v1.0.1.md.sig", "algo": "ed25519", "key_id": "tipjar-cicd@2025" },
{ "artifact_id": "A3", "sig_uri": "dam://campaigns/launch2025/pr/en/2025/08/18/A3_summary_v1.0.1.txt.sig", "algo": "ed25519", "key_id": "tipjar-cicd@2025" }
],
"indexes": {
"by_locale": { "pl": ["A1"], "en": ["A2","A3"] },
"by_type": { "markdown": ["A1","A2","QA1"], "summary": ["A3"] }
}
}

---

1. Zaktualizuj plan.pr.json (krok S5 oraz stan planu)

Otwórz /tipjar-campaigns/starter-packs/plan.pr.json i zastosuj patch:

{
"patches": [
{ "op": "replace", "path": "/steps/4/status", "value": "done" },
{ "op": "replace", "path": "/steps/4/attempts", "value": 1 },
{ "op": "add",     "path": "/steps/4/produced", "value": ["MANIFEST"] },
{ "op": "replace", "path": "/state", "value": "completed" }
]
}

---

1. Ustaw aliasy latest (ułatwia osadzanie/publicację)

Utwórz/odśwież wskaźniki:

dam://campaigns/launch2025/pr/pl/latest/A1_ogloszenie-startu-tipjar-plus.md   → v1.0.1
dam://campaigns/launch2025/pr/en/latest/A2_tipjar-plus-launch-announcement.md → v1.0.1
dam://campaigns/launch2025/pr/en/latest/A3_summary.txt                        → v1.0.1

---

1. Notatka wydania (krótki changelog)

Plik: dam://campaigns/launch2025/RELEASE_NOTES.md
Dodaj wpis:

[2025-08-18] PLAN-PR-20250818-001 — FREEZE v1.0.1 (A1/A2/A3) + QA1 v1.0.0

- Treści PR (PL/EN) zaakceptowane (Evaluator: accept).
- Summary (EN) opublikowane.
- Manifest i podpisy dodane; aliasy latest ustawione.

---

1. Kryteria zakończenia ETAPU 5/6 (wszystko „TAK”)

A1/A2/A3 znajdują się w DAM pod wskazanymi URI z wersją v1.0.1.

QA1 zapisany jako wewnętrzny artefakt (klasa: internal).

Manifest JSON istnieje, zawiera skróty, rozmiary, podpisy.

plan.pr.json: S5.status = done, state = completed.

Aliasy latest wskazują poprawne wersje.

---

Aby przejść do ETAPU 6/6 (publikacja kanałowa: newsroom/LinkedIn + sloty z Kroków 7–8), napisz „Dalej”.

---

📌 Source & Verification of Response

[Unverified] — Procedura FREEZE/manifest/aliasy wynika z Twojego przewodnika (Kroki 3–4, 7, 10) i nie bazuje na źródłach zewnętrznych.

[✓ Verified] — Zasady ADAM-MODE zachowane: brak sformułowań ryzykownych, minimalizacja PII, wymóg stopki w materiałach tekstowych, hash + podpis w manifeście.

[Inference] — Wersjonowanie v1.0.1 i struktura aliasów są praktycznymi konwencjami wdrożeniowymi i mogą zostać dopasowane do Twojej infrastruktury.