# KROK 6/7 — SEO/Blog — ETAP 6/6: Publikacja + monitoring D+14 — KROK 4/4: D+30 — raport zamknięcia, decyzje evergreen/retire oraz plan wersji v1.1.0

Cel kroku: zamknąć pętlę pomiarową dla pierwszych wpisów (PL: publikacja 2025-08-21 → D+30 = 2025-09-20; EN: publikacja 2025-08-26 → D+30 = 2025-09-25), podjąć decyzje evergreen / refresh / retire na podstawie progów KPI, przygotować artefakty zmian i (jeśli są zmiany) zamrozić v1.1.0.

---

1. Szablony metryk D+30 (PL i EN)

PL — „jak-działa-napiwek”
Ścieżka:

dam://campaigns/launch2025/seo/metrics/2025/09/20/METRICS_D+30_jak-dziala-napiwek.json

Treść:

{
"schema": "tipjar.telemetry.v1",
"plan_id": "PLAN-SEO-20250819-001",
"window": "D+30",
"ts": "2025-09-20T10:05:00+02:00",
"url": "[https://tipjar.plus/pl/blog/jak-dziala-napiwek](https://tipjar.plus/pl/blog/jak-dziala-napiwek)",
"metrics": {
"impressions": 0,
"clicks": 0,
"ctr": 0.0,
"avg_position": 0.0,
"avg_time_on_post_s": 0,
"scroll_50_pct": 0.0,
"canonical_ok": true,
"hreflang_ok": true,
"jsonld_ok": true,
"organic_clicks_trend": "up"
}
}

EN — „how-tipping-works”
Ścieżka:

dam://campaigns/launch2025/seo/metrics/2025/09/25/METRICS_D+30_how-tipping-works.json

Treść (analogiczna, ts=2025-09-25T10:05:00+02:00, url wersji EN).

---

1. Raport zbiorczy D+30 ROLLUP (PL+EN)

JSON (dla automatyki)
Ścieżka:

dam://campaigns/launch2025/seo/review/2025/09/26/ROLLUP_D+30_blog.json

Treść:

{
"schema": "seo.rollup.v1",
"plan_id": "PLAN-SEO-20250819-001",
"ts": "2025-09-26T10:30:00+02:00",
"windows": ["D+30"],
"items": [
{
"slug": "jak-dziala-napiwek",
"lang": "pl",
"metrics_ref": "dam://campaigns/launch2025/seo/metrics/2025/09/20/METRICS_D+30_jak-dziala-napiwek.json",
"kpi": {"ctr_min_pct": 3.5, "time_min_s": 120, "coverage_min_pct": 95},
"actuals": {"ctr_pct": 0.0, "time_s": 0, "coverage_pct": 0.0, "trend_clicks": "up"},
"decision": "<auto: evergreen|refresh|retire>"
},
{
"slug": "how-tipping-works",
"lang": "en",
"metrics_ref": "dam://campaigns/launch2025/seo/metrics/2025/09/25/METRICS_D+30_how-tipping-works.json",
"kpi": {"ctr_min_pct": 3.5, "time_min_s": 120, "coverage_min_pct": 95},
"actuals": {"ctr_pct": 0.0, "time_s": 0, "coverage_pct": 0.0, "trend_clicks": "up"},
"decision": "<auto: evergreen|refresh|retire>"
}
]
}

MD (dla czytelników)
Ścieżka:

dam://campaigns/launch2025/seo/review/2025/09/26/ROLLUP_D+30_blog.md

Treść:

[Unverified]

# D+30 — Raport zbiorczy (SEO/Blog)

## Progi KPI

- SERP CTR ≥ **3.5%**
- Średni czas na wpisie ≥ **120 s**
- Index coverage (D+14) ≥ **95%** (potwierdzenie)
- Trend organic clicks: **up**

## Decyzje (auto)

- PL / jak-dziala-napiwek — **<evergreen|refresh|retire>**
- EN / how-tipping-works — **<evergreen|refresh|retire>**

## Następne kroki

- Evergreen → eksport do **v1.1.0** (meta/OG/JSON-LD, linkowanie).
- Refresh → wdrożyć poprawki z `FIXES_*` i testy `AB_META_*`, potem **v1.1.0**.
- Retire → oznaczyć jako **retired** (przekierowania 301 jeśli potrzebne), linki wewnętrzne zaktualizować.

---

1. Reguły decyzji evergreen / refresh / retire

Silnik decyzyjny (do wypełnienia automatycznie w ROLLUP):

if coverage_pct < 95 → decision = "refresh" (najpierw audyt techniczny + sitemap)
else if ctr_pct ≥ 3.5 AND time_s ≥ 120 AND trend_clicks == "up" → decision = "evergreen"
else if ctr_pct < 1.5 OR time_s < 70 → decision = "retire"
else → decision = "refresh"

Zapis decyzji per wpis:
Ścieżka (PL):

dam://campaigns/launch2025/seo/review/2025/09/26/DECISION_D+30_jak-dziala-napiwek.json

Treść:

{
"plan_id": "PLAN-SEO-20250819-001",
"slug": "jak-dziala-napiwek",
"lang": "pl",
"ts": "2025-09-26T10:32:00+02:00",
"decision": "<evergreen|refresh|retire>",
"why": {"ctr_pct": 0.0, "time_s": 0, "coverage_pct": 0.0, "trend_clicks": "up"},
"actions": ["<see below>"]
}

Analogicznie dla EN.

---

1. Artefakty zmian (twórz tylko gdy decyzja ≠ „pass”)

A) „evergreen” → eksport v1.1.0

Ujednolić meta (wygrany wariant z AB_META_*), uzupełnić image/publisher.logo w JSON-LD.

Zwiększyć łączność wewnętrzną: dodać linki z 3 nowych wpisów do filaru.

Pliki (PL, przykład):

dam://campaigns/launch2025/seo/evergreen/2025/09/26/EVERGREEN_jak-dziala-napiwek_v1.1.0.md
dam://campaigns/launch2025/seo/schema/2025/09/26/SCHEMA_jak-dziala-napiwek_v1.1.0.json

B) „refresh” → poprawki

Dodać tabelę kroków, 1–2 pytania do FAQ, doprecyzować lead, wzmocnić anchor-linki.

Uruchomić A/B meta na 14 dni.

Plik (PL):

dam://campaigns/launch2025/seo/content-fixes/2025/09/26/FIXES_jak-dziala-napiwek_v1.1.0.md

C) „retire” → wycofanie

Oznaczyć jako retired, dodać 301 do najbardziej zbliżonego filaru.

Zmienić linkowanie wewnętrzne (usunąć/zmienić anchory wskazujące na ten URL).

Plik (PL):

dam://campaigns/launch2025/seo/retired/2025/09/26/RETIRE_jak-dziala-napiwek.json

---

1. FREEZE v1.1.0 (tylko jeśli powstały nowe treści/meta/schema)

Manifest v1.1.0 (SEO/Blog)
Ścieżka:

dam://campaigns/_manifests/PLAN-SEO-20250819-001_v1.1.0.json

Treść (szablon — uzupełnij tylko zmienione ID/URI/hash):

{
"schema": "dam.manifest.v1",
"plan_id": "PLAN-SEO-20250819-001",
"frozen_at": "2025-09-26T11:00:00+02:00",
"publisher": "freeze@tipjar.plus",
"artifacts_updated": [
{"id":"META_PACK_BLOG","uri":"dam://campaigns/launch2025/seo/meta/2025/09/26/META_PACK_BLOG_v1.1.0.md","hash":{"sha256":"<hex_meta_v110>"}},
{"id":"SCHEMA_BLOG_JSONLD","uri":"dam://campaigns/launch2025/seo/schema/2025/09/26/SCHEMA_BLOG_JSONLD_v1.1.0.json","hash":{"sha256":"<hex_schema_v110>"}},
{"id":"INTERNAL_LINKING_SCHEMA","uri":"dam://campaigns/launch2025/seo/linking/2025/09/26/INTERNAL_LINKING_SCHEMA_v1.1.0.md","hash":{"sha256":"<hex_link_v110>"}}
],
"signatures": [
{"artifact_id":"SCHEMA_BLOG_JSONLD","sig_uri":"dam://campaigns/launch2025/seo/schema/2025/09/26/SCHEMA_BLOG_JSONLD_v1.1.0.json.sig","algo":"ed25519","key_id":"tipjar-cicd@2025"}
],
"notes": "Evergreen/refresh wdrożone w v1.1.0; emisyjność linkowania zwiększona."
}

Alias latest → wskazuje na v1.1.0 dla zaktualizowanych plików.

---

1. CHANGELOG i RELEASE NOTES

CHANGELOG (SEO/Blog):

dam://campaigns/launch2025/CHANGELOG_seo.md

Dopisz:

[2025-09-26] v1.1.0 — Evergreen/refresh po D+30: meta (A/B zwycięzcy), JSON-LD (image/logo), linkowanie (3 nowe odnośniki/hub).

RELEASE NOTES (globalne):

dam://campaigns/launch2025/RELEASE_NOTES.md

Dopisz jedną linię pod wpisem z 2025-08-19:

[2025-09-26] PLAN-SEO-20250819-001 — FREEZE v1.1.0 (evergreen/refresh po D+30; aktualizacje meta/JSON-LD/linkowanie).

---

1. Checklista zamknięcia KROKU 4/4 (musi być „TAK”)

METRICS_D+30_* (PL i EN) istnieją i walidują się.

ROLLUP_D+30_blog.json i .md zapisane.

DECISION_D+30_* utworzone; akcje dobrane wg reguł.

Jeżeli były zmiany: manifest v1.1.0 zamrożony, aliasy latest wskazują na v1.1.0.

CHANGELOG_seo.md oraz RELEASE_NOTES.md zaktualizowane.

Brak PII w jakichkolwiek plikach.

---

KONIEC KROKU 6/7 (SEO/Blog).
Aby przejść dalej, wpisz: „Dalej — KROK 7/7: Support & FAQ (ETAP 1/6)”.

---

📌 Source & Verification of Response

[✓ Verified] — Progi i okna zgodne z wcześniej ustalonym monitoring.seo.json oraz taskspec.seo.json (CTR ≥3.5%, czas ≥120 s, coverage ≥95%, trend „up”).

[Unverified] — To plan operacyjny i szablony artefaktów; brak zewnętrznych źródeł publicznych.

[Inference] — Daty D+30 wyliczone z publikacji: 2025-08-21 → 2025-09-20 (PL), 2025-08-26 → 2025-09-25 (EN); decyzje i v1.1.0 zależne od rzeczywistych metryk.

[Speculation] — Brak.