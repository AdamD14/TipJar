# KROK 3/10 — PRZEBIEG „NA ŻYWO” (VIDEO) — ETAP 5/6: FREEZE → manifest, podpisy i publikacja do DAM (v1.0.1)

Cel etapu: zamrozić V1_SCRIPT.md i V1_SRT.srt zaakceptowane w REVIEW, nadać wersje, obliczyć skróty, podpisać i opublikować do DAM. Wykonaj poniższe kroki po kolei.

---

1. Ustal wersje i docelowe URI (SEMVER)

V1_SCRIPT (PL): v1.0.1

V1_SRT (PL): v1.0.1

QA1_report.md (wewn., MD): v1.0.0

Docelowe URI DAM:

dam://campaigns/launch2025/video/pl/2025/08/18/V1_SCRIPT_tipjar-plus_tiktok_v1.0.1.md
dam://campaigns/launch2025/video/pl/2025/08/18/V1_SRT_tipjar-plus_tiktok_v1.0.1.srt
dam://campaigns/launch2025/video/pl/2025/08/18/QA1_raport-qa_video_v1.0.0.md      (internal)

---

1. Skopiuj z draft → DAM (bez zmian treści)

Źródła z poprzedniego etapu:

/tipjar-campaigns/.artifacts/draft/launch2025/video/pl/2025/08/18/V1_SCRIPT_tipjar-plus_tiktok_v1.0.0.md
/tipjar-campaigns/.artifacts/draft/launch2025/video/pl/2025/08/18/V1_SRT_tipjar-plus_tiktok_v1.0.0.srt
/tipjar-campaigns/.artifacts/draft/PLAN-VIDEO-20250818-001/QA1_report.md

Publikując do DAM, podnieś wyłącznie wersję SCRIPT/SRT do v1.0.1. QA zapisz jako QA1_raport-qa_video_v1.0.0.md.

---

1. Oblicz skróty i wygeneruj podpisy

Hash: SHA-256 każdego artefaktu.

Podpis: ed25519, key_id: "tipjar-cicd@2025", rozszerzenie .sig.

Do wklejenia w notatce (placeholdery):

V1_SCRIPT → sha256:<hex_script> | sig:<hex_sig_script>
V1_SRT    → sha256:<hex_srt>    | sig:<hex_sig_srt>
QA1       → sha256:<hex_qa1>    | (podpis opcjonalny)

---

1. Utwórz manifest FREEZE i zapisz w DAM

Plik docelowy:
dam://campaigns/_manifests/PLAN-VIDEO-20250818-001.json

Zawartość (uzupełnij <...> i {{...}}):

{
"schema": "dam.manifest.v1",
"plan_id": "PLAN-VIDEO-20250818-001",
"frozen_at": "{{now_iso}}",
"publisher": "freeze@tipjar.plus",
"artifacts": [
{
"id": "V1_SCRIPT",
"uri": "dam://campaigns/launch2025/video/pl/2025/08/18/V1_SCRIPT_tipjar-plus_tiktok_v1.0.1.md",
"hash": { "sha256": "<hex_script>" },
"size_bytes": <bytes_script>,
"content_type": "text/markdown; charset=utf-8",
"locale": "pl",
"type": "markdown",
"created_by_role": "Scenarzysta",
"source_step": "S2",
"derived_from": [],
"data_classification": "public"
},
{
"id": "V1_SRT",
"uri": "dam://campaigns/launch2025/video/pl/2025/08/18/V1_SRT_tipjar-plus_tiktok_v1.0.1.srt",
"hash": { "sha256": "<hex_srt>" },
"size_bytes": <bytes_srt>,
"content_type": "application/x-subrip; charset=utf-8",
"locale": "pl",
"type": "srt",
"created_by_role": "Scenarzysta",
"source_step": "S2",
"derived_from": ["V1_SCRIPT"],
"data_classification": "public"
},
{
"id": "QA1",
"uri": "dam://campaigns/launch2025/video/pl/2025/08/18/QA1_raport-qa_video_v1.0.0.md",
"hash": { "sha256": "<hex_qa1>" },
"size_bytes": <bytes_qa1>,
"content_type": "text/markdown; charset=utf-8",
"locale": "pl",
"type": "markdown",
"created_by_role": "Evaluator",
"source_step": "S3",
"derived_from": ["V1_SCRIPT","V1_SRT"],
"data_classification": "internal"
}
],
"signatures": [
{
"artifact_id": "V1_SCRIPT",
"sig_uri": "dam://campaigns/launch2025/video/pl/2025/08/18/V1_SCRIPT_tipjar-plus_tiktok_v1.0.1.md.sig",
"algo": "ed25519",
"key_id": "tipjar-cicd@2025"
},
{
"artifact_id": "V1_SRT",
"sig_uri": "dam://campaigns/launch2025/video/pl/2025/08/18/V1_SRT_tipjar-plus_tiktok_v1.0.1.srt.sig",
"algo": "ed25519",
"key_id": "tipjar-cicd@2025"
}
],
"indexes": {
"by_locale": { "pl": ["V1_SCRIPT","V1_SRT"] },
"by_type": { "markdown": ["V1_SCRIPT","QA1"], "srt": ["V1_SRT"] }
}
}

---

1. Zaktualizuj plan.video.json (S4 → done, plan → completed)

Plik: /tipjar-campaigns/starter-packs/plan.video.json
Patch:

{
"patches": [
{ "op": "replace", "path": "/steps/3/status", "value": "done" },
{ "op": "replace", "path": "/steps/3/attempts", "value": 1 },
{ "op": "add",     "path": "/steps/3/produced", "value": ["MANIFEST"] },
{ "op": "replace", "path": "/state", "value": "completed" }
]
}

---

1. Ustaw aliasy latest (ułatwia osadzenia)

dam://campaigns/launch2025/video/pl/latest/V1_SCRIPT_tipjar-plus_tiktok.md → v1.0.1
dam://campaigns/launch2025/video/pl/latest/V1_SRT_tipjar-plus_tiktok.srt → v1.0.1

---

1. Release notes (dopisz wpis)

Plik: dam://campaigns/launch2025/RELEASE_NOTES.md
Dodaj:

[2025-08-18] PLAN-VIDEO-20250818-001 — FREEZE v1.0.1 (V1_SCRIPT/V1_SRT) + QA1 v1.0.0

- Scenariusz i napisy zaakceptowane (Evaluator: accept).
- Manifest, skróty i podpisy dodane; aliasy latest ustawione.

---

1. Kryteria zakończenia ETAPU 5/6 (musi być „TAK”)

V1_SCRIPT i V1_SRT znajdują się w DAM (v1.0.1) z hashami i podpisami.

QA1 zapisany jako internal.

Manifest JSON istnieje i jest spójny.

plan.video.json: S4.status = done, state = completed.

Aliasy latest wskazują na v1.0.1.

---

Napisz „Dalej”, a przejdę do ETAPU 6/6: Publikacja kanałowa — TikTok/IG Reels/YouTube Shorts + monitoring KPI (T+120 min).

---

📌 Source & Verification of Response

[Unverified] — Procedura FREEZE/manifest/aliasy oparta na Twoim przewodniku (Kroki 4, 7, 10); brak zewnętrznych źródeł.

[✓ Verified] — Zastosowano ADAM-MODE: etykietowanie, minimalizacja PII, brak słów ryzykownych, integralność (hash + podpis).

[Inference] — Wersje/aliasy i typ MIME SRT są standardową praktyką i mogą zostać dopasowane do Twojej infrastruktury.