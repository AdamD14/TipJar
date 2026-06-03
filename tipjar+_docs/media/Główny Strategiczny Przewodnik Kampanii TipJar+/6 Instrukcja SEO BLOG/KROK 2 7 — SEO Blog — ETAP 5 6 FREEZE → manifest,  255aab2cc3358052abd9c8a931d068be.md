# KROK 2/7 — SEO/Blog — ETAP 5/6: FREEZE → manifest, podpisy i publikacja do DAM (v1.0.1)

Cel etapu: zamrozić zaakceptowane artefakty SEO/Blog (po REVIEW), nadać wersje v1.0.1, obliczyć skróty, podpisać i opublikować do DAM. Wykonaj poniższe kroki dokładnie w tej kolejności.

---

1. Wersje i docelowe URI (SEMVER)

BLOG_PL → v1.0.1
dam://campaigns/launch2025/seo/pl/2025/08/18/BLOG_PL_usdc-napiwki-tipjar-plus_v1.0.1.md

BLOG_EN → v1.0.1
dam://campaigns/launch2025/seo/en/2025/08/18/BLOG_EN_usdc-tipping-for-creators_tipjar-plus_v1.0.1.md

LANDING_PL → v1.0.1
dam://campaigns/launch2025/seo/pl/2025/08/18/LANDING_PL_tipjar-plus_usdc-napiwki_v1.0.1.md

META_PACK (multi) → v1.0.1
dam://campaigns/launch2025/seo/multi/2025/08/18/META_PACK_v1.0.1.json

SCHEMA_PACK (multi) → v1.0.1
dam://campaigns/launch2025/seo/multi/2025/08/18/SCHEMA_PACK_v1.0.1.json

INTERNAL_LINKS (multi) → v1.0.1
dam://campaigns/launch2025/seo/multi/2025/08/18/INTERNAL_LINKS_v1.0.1.md

QA1_report.md (wewn.) → v1.0.0
dam://campaigns/launch2025/seo/pl/2025/08/18/QA1_raport-qa_seo_v1.0.0.md

---

1. Skopiuj z draft → DAM (bez zmian treści)

Źródła z ETAPU 3/6:

/tipjar-campaigns/.artifacts/draft/launch2025/seo/pl/2025/08/18/BLOG_PL_usdc-napiwki-tipjar-plus_v1.0.0.md
/tipjar-campaigns/.artifacts/draft/launch2025/seo/en/2025/08/18/BLOG_EN_usdc-tipping-for-creators_tipjar-plus_v1.0.0.md
/tipjar-campaigns/.artifacts/draft/launch2025/seo/pl/2025/08/18/LANDING_PL_tipjar-plus_usdc-napiwki_v1.0.0.md
/tipjar-campaigns/.artifacts/draft/PLAN-SEO-20250818-001/META_PACK_v1.0.0.json
/tipjar-campaigns/.artifacts/draft/PLAN-SEO-20250818-001/SCHEMA_PACK_v1.0.0.json
/tipjar-campaigns/.artifacts/draft/PLAN-SEO-20250818-001/INTERNAL_LINKS_v1.0.0.md
/tipjar-campaigns/.artifacts/draft/PLAN-SEO-20250818-001/QA1_report.md

Podnosząc wersje do v1.0.1 dla wszystkich artefaktów public, a raport QA zapisz jako QA1_raport-qa_seo_v1.0.0.md.

---

1. Oblicz SHA-256 i wygeneruj podpisy ed25519

Klucz: key_id: "tipjar-cicd@2025", rozszerzenie podpisu: .sig.

Zapisz notatkę (uzupełnij placeholdery):

BLOG_PL        → sha256:<hex_blog_pl>     | sig:<hex_sig_blog_pl>
BLOG_EN        → sha256:<hex_blog_en>     | sig:<hex_sig_blog_en>
LANDING_PL     → sha256:<hex_landing_pl>  | sig:<hex_sig_landing_pl>
META_PACK      → sha256:<hex_meta>        | sig:<hex_sig_meta>
SCHEMA_PACK    → sha256:<hex_schema>      | sig:<hex_sig_schema>
INTERNAL_LINKS → sha256:<hex_links>       | sig:<hex_sig_links>
QA1_report     → sha256:<hex_qa1>         | (podpis opcjonalny)

---

1. Utwórz manifest FREEZE i zapisz w DAM

Plik docelowy:
dam://campaigns/_manifests/PLAN-SEO-20250818-001.json

Zawartość (uzupełnij <...> i {{...}}):

{
"schema": "dam.manifest.v1",
"plan_id": "PLAN-SEO-20250818-001",
"frozen_at": "{{now_iso}}",
"publisher": "freeze@tipjar.plus",
"artifacts": [
{"id":"BLOG_PL","uri":"dam://campaigns/launch2025/seo/pl/2025/08/18/BLOG_PL_usdc-napiwki-tipjar-plus_v1.0.1.md","hash":{"sha256":"<hex_blog_pl>"},"size_bytes":<bytes_blog_pl>,"content_type":"text/markdown; charset=utf-8","locale":"pl","type":"blog","created_by_role":"SEO Writer","source_step":"S2","derived_from":[],"data_classification":"public"},
{"id":"BLOG_EN","uri":"dam://campaigns/launch2025/seo/en/2025/08/18/BLOG_EN_usdc-tipping-for-creators_tipjar-plus_v1.0.1.md","hash":{"sha256":"<hex_blog_en>"},"size_bytes":<bytes_blog_en>,"content_type":"text/markdown; charset=utf-8","locale":"en","type":"blog","created_by_role":"SEO Writer","source_step":"S2","derived_from":[],"data_classification":"public"},
{"id":"LANDING_PL","uri":"dam://campaigns/launch2025/seo/pl/2025/08/18/LANDING_PL_tipjar-plus_usdc-napiwki_v1.0.1.md","hash":{"sha256":"<hex_landing_pl>"},"size_bytes":<bytes_landing_pl>,"content_type":"text/markdown; charset=utf-8","locale":"pl","type":"landing","created_by_role":"SEO Writer","source_step":"S2","derived_from":[],"data_classification":"public"},
{"id":"META_PACK","uri":"dam://campaigns/launch2025/seo/multi/2025/08/18/META_PACK_v1.0.1.json","hash":{"sha256":"<hex_meta>"},"size_bytes":<bytes_meta>,"content_type":"application/json","locale":"multi","type":"meta_pack","created_by_role":"SEO Writer","source_step":"S2","derived_from":[],"data_classification":"public"},
{"id":"SCHEMA_PACK","uri":"dam://campaigns/launch2025/seo/multi/2025/08/18/SCHEMA_PACK_v1.0.1.json","hash":{"sha256":"<hex_schema>"},"size_bytes":<bytes_schema>,"content_type":"application/ld+json","locale":"multi","type":"schema_pack","created_by_role":"SEO Writer","source_step":"S2","derived_from":[],"data_classification":"public"},
{"id":"INTERNAL_LINKS","uri":"dam://campaigns/launch2025/seo/multi/2025/08/18/INTERNAL_LINKS_v1.0.1.md","hash":{"sha256":"<hex_links>"},"size_bytes":<bytes_links>,"content_type":"text/markdown; charset=utf-8","locale":"multi","type":"internal_links","created_by_role":"SEO Writer","source_step":"S2","derived_from":[],"data_classification":"public"},
{"id":"QA1","uri":"dam://campaigns/launch2025/seo/pl/2025/08/18/QA1_raport-qa_seo_v1.0.0.md","hash":{"sha256":"<hex_qa1>"},"size_bytes":<bytes_qa1>,"content_type":"text/markdown; charset=utf-8","locale":"pl","type":"markdown","created_by_role":"Evaluator","source_step":"S3","derived_from":["BLOG_PL","BLOG_EN","LANDING_PL","META_PACK","SCHEMA_PACK","INTERNAL_LINKS"],"data_classification":"internal"}
],
"signatures": [
{"artifact_id":"BLOG_PL","sig_uri":"dam://campaigns/launch2025/seo/pl/2025/08/18/BLOG_PL_usdc-napiwki-tipjar-plus_v1.0.1.md.sig","algo":"ed25519","key_id":"tipjar-cicd@2025"},
{"artifact_id":"BLOG_EN","sig_uri":"dam://campaigns/launch2025/seo/en/2025/08/18/BLOG_EN_usdc-tipping-for-creators_tipjar-plus_v1.0.1.md.sig","algo":"ed25519","key_id":"tipjar-cicd@2025"},
{"artifact_id":"LANDING_PL","sig_uri":"dam://campaigns/launch2025/seo/pl/2025/08/18/LANDING_PL_tipjar-plus_usdc-napiwki_v1.0.1.md.sig","algo":"ed25519","key_id":"tipjar-cicd@2025"},
{"artifact_id":"META_PACK","sig_uri":"dam://campaigns/launch2025/seo/multi/2025/08/18/META_PACK_v1.0.1.json.sig","algo":"ed25519","key_id":"tipjar-cicd@2025"},
{"artifact_id":"SCHEMA_PACK","sig_uri":"dam://campaigns/launch2025/seo/multi/2025/08/18/SCHEMA_PACK_v1.0.1.json.sig","algo":"ed25519","key_id":"tipjar-cicd@2025"},
{"artifact_id":"INTERNAL_LINKS","sig_uri":"dam://campaigns/launch2025/seo/multi/2025/08/18/INTERNAL_LINKS_v1.0.1.md.sig","algo":"ed25519","key_id":"tipjar-cicd@2025"}
],
"indexes": {
"by_locale": { "pl":["BLOG_PL","LANDING_PL","QA1"], "en":["BLOG_EN"], "multi":["META_PACK","SCHEMA_PACK","INTERNAL_LINKS"] },
"by_type": { "blog":["BLOG_PL","BLOG_EN"], "landing":["LANDING_PL"], "meta_pack":["META_PACK"], "schema_pack":["SCHEMA_PACK"], "internal_links":["INTERNAL_LINKS"], "markdown":["QA1"] }
}
}

---

1. Zaktualizuj plan.seo.json (S4 → done; plan → completed)

Plik: /tipjar-campaigns/starter-packs/plan.seo.json
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

1. Ustaw aliasy latest (ułatwia osadzanie)

dam://campaigns/launch2025/seo/pl/latest/BLOG_PL_usdc-napiwki-tipjar-plus.md   → v1.0.1
dam://campaigns/launch2025/seo/en/latest/BLOG_EN_usdc-tipping-for-creators_tipjar-plus.md → v1.0.1
dam://campaigns/launch2025/seo/pl/latest/LANDING_PL_tipjar-plus_usdc-napiwki.md → v1.0.1
dam://campaigns/launch2025/seo/multi/latest/META_PACK.json     → v1.0.1
dam://campaigns/launch2025/seo/multi/latest/SCHEMA_PACK.json   → v1.0.1
dam://campaigns/launch2025/seo/multi/latest/INTERNAL_LINKS.md  → v1.0.1

---

1. Release notes (dopisz wpis)

Plik: dam://campaigns/launch2025/RELEASE_NOTES.md
Dodaj:

[2025-08-18] PLAN-SEO-20250818-001 — FREEZE v1.0.1 (BLOG_PL, BLOG_EN, LANDING_PL, META_PACK, SCHEMA_PACK, INTERNAL_LINKS) + QA1 v1.0.0

- Paczka SEO zaakceptowana (Evaluator: accept).
- Manifest, skróty i podpisy dodane; aliasy latest ustawione.

---

1. Kryteria zakończenia ETAPU 5/6 (musi być „TAK”)

Wszystkie artefakty SEO/Blog znajdują się w DAM (v1.0.1) z hashami i podpisami.

QA1 zapisany jako internal.

Manifest JSON istnieje i jest spójny.

plan.seo.json: S4.status = done, state = completed.

Aliasy latest wskazują na v1.0.1.

---

Napisz „Dalej”, a przejdę do ETAPU 6/6: Publikacja (newsroom/blog + landing) + monitoring SEO (T+120 min).

---

📌 Source & Verification of Response

[Unverified] — Procedura FREEZE/manifest/aliasy oparta na wewnętrznych wzorcach kampanii; brak zewnętrznych źródeł.

[✓ Verified] — Zastosowano ADAM-MODE: etykietowanie, brak słów ryzykownych, brak PII, integralność (hash + podpis), aliasy latest.

[Inference] — Lokalizacja ścieżek multi/pl/en i nazewnictwo to konwencje wdrożeniowe; dostosuj do swojej infrastruktury, jeśli potrzebne.