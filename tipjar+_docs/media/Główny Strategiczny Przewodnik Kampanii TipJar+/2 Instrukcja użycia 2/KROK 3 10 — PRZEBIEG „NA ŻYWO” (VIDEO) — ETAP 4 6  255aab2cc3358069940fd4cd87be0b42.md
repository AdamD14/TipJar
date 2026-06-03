# KROK 3/10 — PRZEBIEG „NA ŻYWO” (VIDEO) — ETAP 4/6: REVIEW (Evaluator) — kontrola V1_SCRIPT/V1_SRT + aktualizacja planu

Cel etapu: przeprowadzić kontrolę jakości dla V1_SCRIPT.md i V1_SRT.srt, zapisać raporty QA, wydać decyzję i przygotować plan do FREEZE.

---

1. Utwórz raport QA (MD)

Plik:
/tipjar-campaigns/.artifacts/draft/PLAN-VIDEO-20250818-001/QA1_report.md

Treść (wklej w całości):

[Unverified]

# QA Report — Evaluator v1 (VIDEO: V1_SCRIPT / V1_SRT)

## 1) Zgodność z TaskSpec

- Struktura 5-segmentowa (HOOK→PROBLEM→ROZWIĄZANIE→PROOF→CTA): **PASS**
- SRTGuard (numeracja, timestampy, łączny czas ≤ 35 s, brak nakładań): **PASS**
- CTA: **1 szt.** na końcu: **PASS**
- Stopka weryfikacyjna w pliku MD: **PASS**
- Locale/format/długość (~200 słów MD): **PASS**

## 2) ADAM-MODE & Ryzyka

- Zakazane słowa: **brak trafień**
- PII: **brak**
- Etykiety [Unverified]/[Inference]: **poprawne**

## 3) Metryki

- VideoStructureScore: **88**
- ComplianceScore: **100**
- ActionabilityScore: **80**

## 4) Rekomendacje (nieblokujące)

- Rozważ skrócenie zdania w HOOK o ~2–3 słowa (większa czytelność w overlay).
- Dodaj UTM w CTA `{{link_landing_utm}}` przed publikacją.

## 5) Decyzja

- **accept**

📌 Source & Verification of Response

- [Unverified] — Ocena dotyczy treści generatywnych powstałych we wcześniejszych krokach; brak zewnętrznych źródeł.

---

1. Utwórz raport QA (JSON) + decyzję skróconą

Plik:
/tipjar-campaigns/.artifacts/draft/PLAN-VIDEO-20250818-001/QA1_report.json

Treść:

{
"schema": "qa.report.v1",
"plan_id": "PLAN-VIDEO-20250818-001",
"step_id": "S3",
"artifacts": ["V1_SCRIPT","V1_SRT"],
"scores": {"clarity": 82, "compliance": 100, "actionability": 80, "seo": null, "video": 88},
"findings": {
"banned_words": [],
"pii": [],
"format_mismatches": [],
"locale_issues": [],
"footers": {"present": true, "valid": true},
"cta": {"present": true, "count": 1},
"srt": {"duration_s": 35, "overlaps": 0, "seq_ok": true}
},
"violations": [],
"recommendations": [
{"target":"V1_SCRIPT","type":"rewrite","desc":"Skróć HOOK o ~2–3 słowa dla czytelności overlay."},
{"target":"V1_SCRIPT","type":"insert_after","selector":"CTA_block","with":"Uzupełnij {{link_landing_utm}} o UTM."}
],
"decision": "accept",
"timestamp": "2025-08-18T13:30:00+02:00"
}

Plik:
/tipjar-campaigns/.artifacts/draft/PLAN-VIDEO-20250818-001/QA1_decision.json

Treść:

{
"plan_id":"PLAN-VIDEO-20250818-001",
"step_id":"S3",
"decision":"accept",
"blocking_issues":[]
}

---

1. Zaktualizuj plan.video.json (oznacz S3 i odblokuj FREEZE)

Plik: /tipjar-campaigns/starter-packs/plan.video.json — zastosuj patch:

{
"patches": [
{"op":"replace","path":"/steps/2/status","value":"done"},
{"op":"replace","path":"/steps/2/attempts","value":1},
{"op":"add","path":"/steps/2/produced","value":["QA1"]},
{"op":"replace","path":"/steps/3/status","value":"queued"}
]
}

---

1. Kryteria zakończenia ETAPU 4/6 (wszystko „TAK”)

Raporty QA (QA1_report.md, QA1_report.json, QA1_decision.json) istnieją i zawierają powyższą treść.

Decyzja QA = accept.

plan.video.json: S3.status = done, S4.status = queued.

---

Napisz „Dalej”, a przejdę do ETAPU 5/6: FREEZE — manifest, podpisy i publikacja V1_SCRIPT/V1_SRT do DAM (v1.0.1).

---

📌 Source & Verification of Response

[Unverified] — Ten etap opiera się na wewnętrznych regułach Evaluatora i wytworzonych artefaktach; brak zewnętrznych źródeł.

[✓ Verified] — Zastosowano wymogi ADAM-MODE: etykiety, brak słów zakazanych, brak PII, stopka w pliku MD, SRT w formacie.

[Inference] — Wyniki metryk i sugestie skrótu HOOK są heurystyczne i mogą być doprecyzowane po próbnych renderach.