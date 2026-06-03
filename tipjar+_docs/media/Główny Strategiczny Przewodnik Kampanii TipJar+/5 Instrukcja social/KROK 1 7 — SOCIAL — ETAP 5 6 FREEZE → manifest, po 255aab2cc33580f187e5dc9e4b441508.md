# KROK 1/7 — SOCIAL — ETAP 5/6: FREEZE → manifest, podpisy i publikacja do DAM (v1.0.1)

Cel etapu: zamrozić zaakceptowane artefakty SOC_* (po REVIEW), nadać wersje v1.0.1, obliczyć skróty, podpisać i opublikować do DAM. Wykonaj poniższe czynności dokładnie w tej kolejności.

---

1. Wersje i URI docelowe (SEMVER)

SOC_X_PL → v1.0.1

SOC_LI_BRAND_PL → v1.0.1

SOC_LI_CEO_EN → v1.0.1

SOC_IG_PL → v1.0.1

SOC_YT_COMM_PL → v1.0.1

SOC_ALT_PL_pack → v1.0.1

QA1_report.md → v1.0.0 (internal)

Docelowe URI DAM:

dam://campaigns/launch2025/social/pl/2025/08/18/SOC_X_PL_v1.0.1.md
dam://campaigns/launch2025/social/pl/2025/08/18/SOC_LI_BRAND_PL_v1.0.1.md
dam://campaigns/launch2025/social/en/2025/08/18/SOC_LI_CEO_EN_v1.0.1.md
dam://campaigns/launch2025/social/pl/2025/08/18/SOC_IG_PL_v1.0.1.md
dam://campaigns/launch2025/social/pl/2025/08/18/SOC_YT_COMM_PL_v1.0.1.md
dam://campaigns/launch2025/social/pl/2025/08/18/SOC_ALT_PL_pack_v1.0.1.md
dam://campaigns/launch2025/social/pl/2025/08/18/QA1_raport-qa_social_v1.0.0.md   (internal)

---

1. Kopiowanie z draft → DAM (bez zmian treści)

Źródła (z ETAPU 3/6):

/tipjar-campaigns/.artifacts/draft/launch2025/social/pl/2025/08/18/SOC_X_PL_v1.0.0.md
/tipjar-campaigns/.artifacts/draft/launch2025/social/pl/2025/08/18/SOC_LI_BRAND_PL_v1.0.0.md
/tipjar-campaigns/.artifacts/draft/launch2025/social/en/2025/08/18/SOC_LI_CEO_EN_v1.0.0.md
/tipjar-campaigns/.artifacts/draft/launch2025/social/pl/2025/08/18/SOC_IG_PL_v1.0.0.md
/tipjar-campaigns/.artifacts/draft/launch2025/social/pl/2025/08/18/SOC_YT_COMM_PL_v1.0.0.md
/tipjar-campaigns/.artifacts/draft/launch2025/social/pl/2025/08/18/SOC_ALT_PL_pack_v1.0.0.md
/tipjar-campaigns/.artifacts/draft/PLAN-SOCIAL-20250818-001/QA1_report.md

Publikując do DAM, podnieś wyłącznie wersję plików SOC_* do v1.0.1. QA1_report.md zapisz jako QA1_raport-qa_social_v1.0.0.md.

---

1. Skróty i podpisy (integralność)

Hash: SHA-256 dla każdego artefaktu.

Podpis: ed25519, key_id: "tipjar-cicd@2025", rozszerzenie .sig.

Wyniki (uzupełnij placeholdery po obliczeniu):

SOC_X_PL           → sha256:<hex_x>            | sig:<hex_sig_x>
SOC_LI_BRAND_PL    → sha256:<hex_li_brand>     | sig:<hex_sig_li_brand>
SOC_LI_CEO_EN      → sha256:<hex_li_ceo>       | sig:<hex_sig_li_ceo>
SOC_IG_PL          → sha256:<hex_ig>           | sig:<hex_sig_ig>
SOC_YT_COMM_PL     → sha256:<hex_ytc>          | sig:<hex_sig_ytc>
SOC_ALT_PL_pack    → sha256:<hex_alt>          | sig:<hex_sig_alt>
QA1_raport-qa_*    → sha256:<hex_qa1>          | (podpis opcjonalny)

---

1. Manifest FREEZE (JSON)

Plik docelowy:
dam://campaigns/_manifests/PLAN-SOCIAL-20250818-001.json

Zawartość (uzupełnij <...> i {{...}}):

{
"schema": "dam.manifest.v1",
"plan_id": "PLAN-SOCIAL-20250818-001",
"frozen_at": "{{now_iso}}",
"publisher": "freeze@tipjar.plus",
"artifacts": [
{"id":"SOC_X_PL","uri":"dam://campaigns/launch2025/social/pl/2025/08/18/SOC_X_PL_v1.0.1.md","hash":{"sha256":"<hex_x>"},"size_bytes":<bytes_x>,"content_type":"text/markdown; charset=utf-8","locale":"pl","type":"social","created_by_role":"Copywriter","source_step":"S2","derived_from":[],"data_classification":"public"},
{"id":"SOC_LI_BRAND_PL","uri":"dam://campaigns/launch2025/social/pl/2025/08/18/SOC_LI_BRAND_PL_v1.0.1.md","hash":{"sha256":"<hex_li_brand>"},"size_bytes":<bytes_li_brand>,"content_type":"text/markdown; charset=utf-8","locale":"pl","type":"social","created_by_role":"Copywriter","source_step":"S2","derived_from":[],"data_classification":"public"},
{"id":"SOC_LI_CEO_EN","uri":"dam://campaigns/launch2025/social/en/2025/08/18/SOC_LI_CEO_EN_v1.0.1.md","hash":{"sha256":"<hex_li_ceo>"},"size_bytes":<bytes_li_ceo>,"content_type":"text/markdown; charset=utf-8","locale":"en","type":"social","created_by_role":"Copywriter","source_step":"S2","derived_from":[],"data_classification":"public"},
{"id":"SOC_IG_PL","uri":"dam://campaigns/launch2025/social/pl/2025/08/18/SOC_IG_PL_v1.0.1.md","hash":{"sha256":"<hex_ig>"},"size_bytes":<bytes_ig>,"content_type":"text/markdown; charset=utf-8","locale":"pl","type":"social","created_by_role":"Copywriter","source_step":"S2","derived_from":[],"data_classification":"public"},
{"id":"SOC_YT_COMM_PL","uri":"dam://campaigns/launch2025/social/pl/2025/08/18/SOC_YT_COMM_PL_v1.0.1.md","hash":{"sha256":"<hex_ytc>"},"size_bytes":<bytes_ytc>,"content_type":"text/markdown; charset=utf-8","locale":"pl","type":"social","created_by_role":"Copywriter","source_step":"S2","derived_from":[],"data_classification":"public"},
{"id":"SOC_ALT_PL","uri":"dam://campaigns/launch2025/social/pl/2025/08/18/SOC_ALT_PL_pack_v1.0.1.md","hash":{"sha256":"<hex_alt>"},"size_bytes":<bytes_alt>,"content_type":"text/markdown; charset=utf-8","locale":"pl","type":"alt_pack","created_by_role":"Copywriter","source_step":"S2","derived_from":[],"data_classification":"public"},
{"id":"QA1","uri":"dam://campaigns/launch2025/social/pl/2025/08/18/QA1_raport-qa_social_v1.0.0.md","hash":{"sha256":"<hex_qa1>"},"size_bytes":<bytes_qa1>,"content_type":"text/markdown; charset=utf-8","locale":"pl","type":"markdown","created_by_role":"Evaluator","source_step":"S3","derived_from":["SOC_X_PL","SOC_LI_BRAND_PL","SOC_LI_CEO_EN","SOC_IG_PL","SOC_YT_COMM_PL","SOC_ALT_PL"],"data_classification":"internal"}
],
"signatures": [
{"artifact_id":"SOC_X_PL","sig_uri":"dam://campaigns/launch2025/social/pl/2025/08/18/SOC_X_PL_v1.0.1.md.sig","algo":"ed25519","key_id":"tipjar-cicd@2025"},
{"artifact_id":"SOC_LI_BRAND_PL","sig_uri":"dam://campaigns/launch2025/social/pl/2025/08/18/SOC_LI_BRAND_PL_v1.0.1.md.sig","algo":"ed25519","key_id":"tipjar-cicd@2025"},
{"artifact_id":"SOC_LI_CEO_EN","sig_uri":"dam://campaigns/launch2025/social/en/2025/08/18/SOC_LI_CEO_EN_v1.0.1.md.sig","algo":"ed25519","key_id":"tipjar-cicd@2025"},
{"artifact_id":"SOC_IG_PL","sig_uri":"dam://campaigns/launch2025/social/pl/2025/08/18/SOC_IG_PL_v1.0.1.md.sig","algo":"ed25519","key_id":"tipjar-cicd@2025"},
{"artifact_id":"SOC_YT_COMM_PL","sig_uri":"dam://campaigns/launch2025/social/pl/2025/08/18/SOC_YT_COMM_PL_v1.0.1.md.sig","algo":"ed25519","key_id":"tipjar-cicd@2025"},
{"artifact_id":"SOC_ALT_PL","sig_uri":"dam://campaigns/launch2025/social/pl/2025/08/18/SOC_ALT_PL_pack_v1.0.1.md.sig","algo":"ed25519","key_id":"tipjar-cicd@2025"}
],
"indexes": {
"by_locale": {"pl":["SOC_X_PL","SOC_LI_BRAND_PL","SOC_IG_PL","SOC_YT_COMM_PL","SOC_ALT_PL"],"en":["SOC_LI_CEO_EN"]},
"by_channel": {"x":["SOC_X_PL"],"linkedin":["SOC_LI_BRAND_PL","SOC_LI_CEO_EN"],"instagram":["SOC_IG_PL"],"youtube_community":["SOC_YT_COMM_PL"],"alt_pack":["SOC_ALT_PL"]}
}
}

---

1. Patch planu (S4 → done; plan → completed)

Plik: /tipjar-campaigns/starter-packs/plan.social.json
Patch:

{
"patches": [
{"op":"replace","path":"/steps/3/status","value":"done"},
{"op":"replace","path":"/steps/3/attempts","value":1},
{"op":"add","path":"/steps/3/produced","value":["MANIFEST"]},
{"op":"replace","path":"/state","value":"completed"}
]
}

---

1. Alias latest (ułatwia osadzanie)

dam://campaigns/launch2025/social/pl/latest/SOC_X_PL.md            → v1.0.1
dam://campaigns/launch2025/social/pl/latest/SOC_LI_BRAND_PL.md     → v1.0.1
dam://campaigns/launch2025/social/en/latest/SOC_LI_CEO_EN.md       → v1.0.1
dam://campaigns/launch2025/social/pl/latest/SOC_IG_PL.md           → v1.0.1
dam://campaigns/launch2025/social/pl/latest/SOC_YT_COMM_PL.md      → v1.0.1
dam://campaigns/launch2025/social/pl/latest/SOC_ALT_PL_pack.md     → v1.0.1

---

1. Release notes (dopisz wpis)

Plik: dam://campaigns/launch2025/RELEASE_NOTES.md
Wpis:

[2025-08-18] PLAN-SOCIAL-20250818-001 — FREEZE v1.0.1 (SOC_X_PL, SOC_LI_BRAND_PL, SOC_LI_CEO_EN, SOC_IG_PL, SOC_YT_COMM_PL, SOC_ALT_PL) + QA1 v1.0.0

- Pakiet social zaakceptowany (Evaluator: accept).
- Manifest, skróty i podpisy dodane; aliasy latest ustawione.

---

1. Kryteria zakończenia ETAPU 5/6 (musi być „TAK”)

SOC_* znajdują się w DAM (v1.0.1) z hashami i podpisami.

QA1 zapisany jako internal.

Manifest JSON istnieje i jest spójny.

plan.social.json: S4.status = done, state = completed.

Aliasy latest wskazują na v1.0.1.

---

Napisz „Dalej”, a przejdę do ETAPU 6/6: Publikacja kanałowa (X/LinkedIn/IG/YT Community) + telemetria T+120 min.

---

📌 Source & Verification of Response

[Unverified] — Procedura FREEZE/manifest/aliasy oparta na wcześniej ustalonych regułach i wzorcach w tej kampanii; brak zewnętrznych źródeł.

[✓ Verified] — Zgodność z ADAM-MODE: etykietowanie, brak słów ryzykownych, minimalizacja PII, integralność (hash + podpis), aliasy latest.

[Inference] — Nazwy i ścieżki w DAM są konwencjami wdrożeniowymi; dopasuj do własnej infrastruktury, jeśli różni się.