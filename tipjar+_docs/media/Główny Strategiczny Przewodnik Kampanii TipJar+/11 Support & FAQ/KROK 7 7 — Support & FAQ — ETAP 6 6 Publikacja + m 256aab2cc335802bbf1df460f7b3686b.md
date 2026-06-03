# KROK 7/7 — Support & FAQ — ETAP 6/6: Publikacja + monitoring — KROK 2/3: Dzień wdrożenia (paragony publikacji + sitemap + D+1 metryki)

Cel kroku: zapisać paragony publikacji dla stron FAQ PL/EN (public), zaktualizować sitemapy/hreflang/canonical, wystawić agregat D+1 (bez PII) oraz paragony internal dla makr/szablonów KB.

---

1. Paragony publikacji (public)

A. FAQ — PL
Ścieżka (DAM):

dam://campaigns/launch2025/support/publish/2025/08/19/PUBLISH_RECEIPT_help_faq_pl.json

Treść:

{
"plan_id": "PLAN-SUPPORT-20250819-001",
"published_at": "2025-08-19T10:00:00+02:00",
"url": "[https://tipjar.plus/pl/help/faq](https://tipjar.plus/pl/help/faq)",
"lang": "pl",
"canonical_url": "[https://tipjar.plus/pl/help/faq](https://tipjar.plus/pl/help/faq)",
"hreflang": [
{"lang":"pl","url":"[https://tipjar.plus/pl/help/faq](https://tipjar.plus/pl/help/faq)"},
{"lang":"en","url":"[https://tipjar.plus/en/help/faq](https://tipjar.plus/en/help/faq)"},
{"lang":"x-default","url":"[https://tipjar.plus/en/help/faq](https://tipjar.plus/en/help/faq)"}
],
"sitemaps_updated": [
"[https://tipjar.plus/sitemap.xml](https://tipjar.plus/sitemap.xml)",
"[https://tipjar.plus/sitemap_pl.xml](https://tipjar.plus/sitemap_pl.xml)"
],
"hash_sha256_html": "<hex_page_hash>",
"notes": "FAQ PL opublikowane równolegle z EN; JSON-LD=FAQPage, OG/canonical aktywne."
}

B. FAQ — EN
Ścieżka:

dam://campaigns/launch2025/support/publish/2025/08/19/PUBLISH_RECEIPT_help_faq_en.json

Treść:

{
"plan_id": "PLAN-SUPPORT-20250819-001",
"published_at": "2025-08-19T10:00:00+02:00",
"url": "[https://tipjar.plus/en/help/faq](https://tipjar.plus/en/help/faq)",
"lang": "en",
"canonical_url": "[https://tipjar.plus/en/help/faq](https://tipjar.plus/en/help/faq)",
"hreflang": [
{"lang":"en","url":"[https://tipjar.plus/en/help/faq](https://tipjar.plus/en/help/faq)"},
{"lang":"pl","url":"[https://tipjar.plus/pl/help/faq](https://tipjar.plus/pl/help/faq)"},
{"lang":"x-default","url":"[https://tipjar.plus/en/help/faq](https://tipjar.plus/en/help/faq)"}
],
"sitemaps_updated": [
"[https://tipjar.plus/sitemap.xml](https://tipjar.plus/sitemap.xml)",
"[https://tipjar.plus/sitemap_en.xml](https://tipjar.plus/sitemap_en.xml)"
],
"hash_sha256_html": "<hex_page_hash>",
"notes": "FAQ EN opublikowane równolegle z PL; JSON-LD=FAQPage, OG/canonical aktywne."
}

> Jeśli publikujesz dodatkową stronę /pl/help/status (szablony status page), dodaj analogiczny paragon PUBLISH_RECEIPT_help_status_pl.json + wpis w sitemap_pl.xml.
> 

---

1. Sitemapy i hreflang (D0 = 2025-08-19, 10:00 CEST)

Wpisy URL (PL i EN) — do odpowiednich sitemap:

<!-- sitemap_pl.xml -->
<url>
<loc>[https://tipjar.plus/pl/help/faq](https://tipjar.plus/pl/help/faq)</loc>
<lastmod>2025-08-19T10:00:00+02:00</lastmod>
<changefreq>weekly</changefreq>
<priority>0.7</priority>
</url>

<!-- sitemap_en.xml -->
<url>
<loc>[https://tipjar.plus/en/help/faq](https://tipjar.plus/en/help/faq)</loc>
<lastmod>2025-08-19T10:00:00+02:00</lastmod>
<changefreq>weekly</changefreq>
<priority>0.7</priority>
</url>

Hreflang (w obu stronach):

<link rel="alternate" hreflang="pl" href="[https://tipjar.plus/pl/help/faq](https://tipjar.plus/pl/help/faq)"/>
<link rel="alternate" hreflang="en" href="[https://tipjar.plus/en/help/faq](https://tipjar.plus/en/help/faq)"/>
<link rel="alternate" hreflang="x-default" href="[https://tipjar.plus/en/help/faq](https://tipjar.plus/en/help/faq)"/>

---

1. Paragony internal (niepubliczne treści wdrożone D0)

A. Makra (PL/EN)

dam://campaigns/launch2025/support/publish/2025/08/19/PUBLISH_RECEIPT_internal_macros_v1.0.1.json

{
"plan_id": "PLAN-SUPPORT-20250819-001",
"published_at": "2025-08-19T10:00:00+02:00",
"artifacts": [
"SUPPORT_MACROS_PL_v1.0.1.md",
"SUPPORT_MACROS_EN_v1.0.1.md"
],
"scope": "internal",
"hash_bundle_sha256": "<hex_bundle>",
"notes": "Makra dostępne w repo DAM; brak wpisu do sitemap."
}

B. Szablony KB (MD)

dam://campaigns/launch2025/support/publish/2025/08/19/PUBLISH_RECEIPT_internal_kb_templates_v1.0.1.json

{
"plan_id": "PLAN-SUPPORT-20250819-001",
"published_at": "2025-08-19T10:00:00+02:00",
"artifacts": ["KB_TEMPLATES_MULTI_v1.0.1.md"],
"scope": "internal",
"hash_bundle_sha256": "<hex_bundle>",
"notes": "Szablony KB wdrożone dla Helpdesk Writer; publiczne artykuły KB w fali D+2."
}

---

1. Metryki D+1 (agregat Support) — wypełnienie szablonu

Plik (już utworzony w Krok 1/3):

dam://campaigns/launch2025/support/metrics/2025/08/20/ROLLUP_D+1.json

Uzupełnij wartości (przykładowo 0) i dopisz zasób przeglądu:

{
"schema": "support.metrics.rollup.v1",
"plan_id": "PLAN-SUPPORT-20250819-001",
"window": "D+1",
"ts": "2025-08-20T10:05:00+02:00",
"metrics": {
"tickets_open": 0,
"tickets_closed": 0,
"frt_min_avg": 0,
"frt_sla_breaches": 0,
"fcr_pct": 0.0,
"csat_avg_pct": 0.0,
"self_service_ratio_pct": 0.0,
"kb_click_through_pct": 0.0,
"macro_use_rate_pct": 0.0,
"reopen_rate_pct": 0.0
},
"notes": "D+1 po starcie FAQ; patrz REVIEW_D+7.json."
}

---

1. Aktualizacja aliasów latest (Help)

Po publikacji FAQ PL/EN, ustaw:

dam://campaigns/launch2025/support/faq/pl/latest/SUPPORT_FAQ_PL.md   → v1.0.1
dam://campaigns/launch2025/support/faq/en/latest/SUPPORT_FAQ_EN.md   → v1.0.1

---

1. Rejestr zmian

CHANGELOG (Help):

dam://campaigns/launch2025/CHANGELOG_help.md

Dopisz:

[2025-08-19] Wdrożenie FAQ PL/EN (FAQPage + hreflang), publikacja makr (PL/EN) i szablonów KB (internal). Sitemapy zaktualizowane o 10:00 CEST.

RELEASE NOTES (globalne):

dam://campaigns/launch2025/RELEASE_NOTES.md

Dopisz jedną linię pod wpisem Support FREEZE v1.0.1:

[2025-08-19] Support & FAQ — publikacja: /pl|en/help/faq, wdrożone makra i szablony KB (internal), przygotowano pomiar D+1.

---

1. Checklista zamknięcia KROKU 2/3 (musi być „TAK”)

Paragony FAQ PL/EN zapisane (DAM) z poprawnym hreflang i canonical_url.

sitemap.xml + sitemap_pl.xml + sitemap_en.xml zaktualizowane (lastmod = 2025-08-19T10:00:00+02:00).

Paragony internal dla makr i szablonów KB istnieją.

ROLLUP_D+1.json wypełniony liczbami (bez PII).

Aliasy latest wskazują na v1.0.1.

CHANGELOG/RELEASE NOTES uzupełnione.

---

Napisz „Dalej”, a przejdę do KROKU 3/3: D+7/D+30 — przeglądy KPI, działania (makra/KB/ton), paragonizacja decyzji i zamknięcie pętli.

---

📌 Source & Verification of Response

[Unverified] — Instrukcja operacyjna i szablony paragonów/sitemap są wewnętrzne; brak źródeł publicznych.

[Inference] — Godzina publikacji i pola paragonów/hreflang nawiązują do standardu z pakietu SEO/Blog; metryki zgodne z monitoring.support.json i MEASUREMENT_SPEC_v1.0.0.json.