# KROK 6/7 — SEO/Blog — ETAP 3/6: EXEC S1→S3 (SEO Strategist → Content Writer) + artefakty draft

KROK 6/7 — SEO/Blog — ETAP 3/6: EXEC S1→S3 (SEO Strategist → Content Writer) + artefakty draft

Cel etapu: utworzyć [CTX1.md](http://ctx1.md/) i komplet draftów: strategia (PL/EN), mapa słów, klastry, outline’y pillar/postów (PL/EN), meta/OG, JSON-LD, linkowanie wewn., kalendarz, style guide, CMS blocks, UTM, social, słownik, FAQ. Następnie zaktualizować plan do S4: queued.

---

1. [CTX1.md](http://ctx1.md/) (≤300 słów)

Ścieżka: /tipjar-campaigns/.artifacts/draft/PLAN-SEO-20250819-001/CTX1.md

[Unverified]

# Context Pack — SEO/Blog — tipjar+

## Teza

Użytkownik szuka krótkich, praktycznych odpowiedzi: jak docenić twórcę kilkoma dotknięciami (USDC), jak dodać link „tip” i jak zadbać o dostępność. Artykuły mają być informacyjne, produktowe, bez obietnic finansowych. 1 CTA/post.

## Filar tematyczny

1. „Jak działa napiwek” (flow, UX, dostępność).
2. „Dla twórców” (profil, umieszczenie linku, dobre praktyki).
3. „Dla widzów” (jak wesprzeć, bezpieczeństwo treści, prywatność).
4. „Materiały pomocnicze” (FAQ, słownik, poradniki ALT/napisy).

## Zasady redakcyjne

- Lead ≤ 40 słów, akapity 100–140 słów, H2/H3, 1 CTA.
- ALT ≤ 120 znaków; kontrast ≥ AA; wideo zawsze z napisami.
- Linki do produktu/pomocy z UTM; hreflang PL/EN; canonical/OG/JSON-LD.

## KPI i mierzenie

SERP CTR ≥ 3.5% (PL/EN), czas na stronie ≥ 120 s, index coverage ≥ 95% (D+14). Checkpointy: T+7/T+14/D+30.

## Odsyłacze

Spójność z PR/Newsroom/ Paid (hook „Kilka dotknięć”). Słowa zakazane — patrz guardrails.

---

1. SEO_STRATEGY_BRIEF_PL (1–2 strony)

Ścieżka: /tipjar-campaigns/.artifacts/draft/seo/brief/pl/2025/08/19/SEO_STRATEGY_BRIEF_PL_v1.0.0.md

[Unverified]

# Strategia SEO — tipjar+ (PL)

## Cel

Zwiększyć ruch organiczny oparte na intencjach informacyjnych i produktowych: „jak wesprzeć twórcę”, „jak dodać przycisk tip”, „USDC — co to w kontekście napiwku”. Treści zorientowane na UX i dostępność, bez porad/obietnic finansowych. 1 CTA/post.

## Filar 1 — Jak działa napiwek

Tematy o przepływie (profil → kwota → potwierdzenie), przejrzystości i napisy/ALT. SERP: People Also Ask, Featured Snippet, wideo short.

## Filar 2 — Dla twórców

Instrukcje umieszczenia linku „tip”, integracje w bio/opisie wideo, miniatury i CTA.

## Filar 3 — Dla widzów

Szybkie odpowiedzi „jak wesprzeć bez przerywania seansu”, ustawienia prywatności i podstawy bezpieczeństwa treści.

## Filar 4 — Materiały pomocnicze

FAQ, słownik pojęć, checklisty dostępności, krótkie poradniki (ALT, napisy).

## Techniczne

- Hreflang PL/EN; canonical; OG; Article/BlogPosting JSON-LD.
- Mapy adresów: `/pl/blog/…` i `/en/blog/…`; sitemap update.
- Tagi: `twórcy`, `widzowie`, `dostępność`, `USDC`.
- Internal linking: 3–5 linków/post; układ hub↔spoke.

## Pomiary

SERP CTR, czas na stronie, kliki do profilu twórcy (agregaty UTM). Checkpointy T+7/T+14/D+30.

## Governance

Style guide, checklisty, compliance (brak roszczeń finansowych). Editor pass przed publikacją.

**CTA (meta):** Przejrzyj przewodniki i zacznij od „Jak dodać link ‘tip’”.

---

1. SEO_STRATEGY_BRIEF_EN

Ścieżka: /tipjar-campaigns/.artifacts/draft/seo/brief/en/2025/08/19/SEO_STRATEGY_BRIEF_EN_v1.0.0.md

[Unverified]

# SEO Strategy — tipjar+ (EN)

## Goal

Grow organic traffic on informational/product intents: “how to tip a creator,” “add a tip link,” “USDC in tipping context.” UX-first, accessible, no financial promises. One CTA per post.

## Pillars

1. How tipping works (flow, clarity, captions/ALT).
2. For creators (profile, placements, thumbnails/CTA).
3. For fans (support without breaking the watch, privacy basics).
4. Aids (FAQ, glossary, accessibility checklists).

## Technical

Hreflang PL/EN, canonical, OG, Article/BlogPosting JSON-LD; sitemap updates; internal links 3–5 per post (hub↔spoke).

## Measurement

SERP CTR, time on page, clicks to creator profiles via UTM (aggregates). Checkpoints T+7/T+14/D+30.

**CTA (meta):** Start with “How to add the ‘tip’ link”.

---

1. KEYWORD_MAP_MULTI.json

Ścieżka: /tipjar-campaigns/.artifacts/draft/seo/keywords/2025/08/19/KEYWORD_MAP_MULTI_v1.0.0.json

{
"schema": "keyword.map.v1",
"items": [
{"cluster":"tipping_flow","kw":"jak działa napiwek online","intent":"informational","locale":"pl","difficulty_hint":"med","priority":1,"serp_features":["featured_snippet","paa","video"]},
{"cluster":"tipping_flow","kw":"how tipping works for creators","intent":"informational","locale":"en","difficulty_hint":"med","priority":1,"serp_features":["featured_snippet","paa"]},
{"cluster":"tipping_flow","kw":"przycisk tip na profilu","intent":"transactional","locale":"pl","difficulty_hint":"low","priority":1,"serp_features":["site_links","video"]},
{"cluster":"tipping_flow","kw":"tip button on creator profile","intent":"transactional","locale":"en","difficulty_hint":"low","priority":1,"serp_features":["video"]},

```
{"cluster":"usdc_context","kw":"USDC co to w napiwkach","intent":"informational","locale":"pl","difficulty_hint":"med","priority":2,"serp_features":["paa"]},
{"cluster":"usdc_context","kw":"USDC tipping explained","intent":"informational","locale":"en","difficulty_hint":"med","priority":2,"serp_features":["featured_snippet"]},
{"cluster":"usdc_context","kw":"napiwek w USDC jak wysłać","intent":"transactional","locale":"pl","difficulty_hint":"med","priority":2,"serp_features":["video"]},
{"cluster":"usdc_context","kw":"send a tip in USDC","intent":"transactional","locale":"en","difficulty_hint":"med","priority":2,"serp_features":["video"]},

{"cluster":"creators_setup","kw":"jak dodać link tip do bio","intent":"transactional","locale":"pl","difficulty_hint":"low","priority":1,"serp_features":["featured_snippet"]},
{"cluster":"creators_setup","kw":"how to add tip link to bio","intent":"transactional","locale":"en","difficulty_hint":"low","priority":1,"serp_features":["featured_snippet"]},
{"cluster":"creators_setup","kw":"miniatury z CTA dla twórców","intent":"informational","locale":"pl","difficulty_hint":"med","priority":3,"serp_features":["images"]},
{"cluster":"creators_setup","kw":"thumbnails with CTA creators","intent":"informational","locale":"en","difficulty_hint":"med","priority":3,"serp_features":["images"]},

{"cluster":"fans_support","kw":"jak wesprzeć twórcę bez przerywania","intent":"informational","locale":"pl","difficulty_hint":"low","priority":1,"serp_features":["paa","video"]},
{"cluster":"fans_support","kw":"how to support a creator quickly","intent":"informational","locale":"en","difficulty_hint":"low","priority":1,"serp_features":["paa","video"]},
{"cluster":"fans_support","kw":"dostępność napisów do wideo","intent":"informational","locale":"pl","difficulty_hint":"med","priority":2,"serp_features":["featured_snippet"]},
{"cluster":"fans_support","kw":"video captions accessibility","intent":"informational","locale":"en","difficulty_hint":"med","priority":2,"serp_features":["featured_snippet"]},

{"cluster":"accessibility","kw":"ALT do obrazów przykłady","intent":"informational","locale":"pl","difficulty_hint":"low","priority":2,"serp_features":["images"]},
{"cluster":"accessibility","kw":"ALT text examples","intent":"informational","locale":"en","difficulty_hint":"low","priority":2,"serp_features":["images"]},
{"cluster":"accessibility","kw":"kontrast AA w praktyce","intent":"informational","locale":"pl","difficulty_hint":"low","priority":3,"serp_features":["featured_snippet"]},
{"cluster":"accessibility","kw":"AA contrast checklist","intent":"informational","locale":"en","difficulty_hint":"low","priority":3,"serp_features":["featured_snippet"]}

```

]
}

---

1. TOPICAL_CLUSTER_PLAN.json

Ścieżka: /tipjar-campaigns/.artifacts/draft/seo/clusters/2025/08/19/TOPICAL_CLUSTER_PLAN_v1.0.0.json

{
"schema":"topical.cluster.v1",
"pillars":[
{
"id":"p1_tipping_flow",
"title_pl":"Jak działa napiwek w tipjar+",
"title_en":"How tipping works in tipjar+",
"subtopics":[
{"slug":"flow-overview","targets":[{"locale":"pl","kw":["jak działa napiwek online"]},{"locale":"en","kw":["how tipping works for creators"]}]},
{"slug":"tip-button-profile","targets":[{"locale":"pl","kw":["przycisk tip na profilu"]},{"locale":"en","kw":["tip button on creator profile"]}]},
{"slug":"confirmation-ux","targets":[{"locale":"pl","kw":["potwierdzenie napiwku UX"]},{"locale":"en","kw":["clear confirmation flow"]}]}
],
"internal_links":["/pl/blog/faq","/en/blog/faq"]
},
{
"id":"p2_creators_setup",
"title_pl":"Dla twórców — konfiguracja i dobre praktyki",
"title_en":"For creators — setup and best practices",
"subtopics":[
{"slug":"add-tip-link","targets":[{"locale":"pl","kw":["jak dodać link tip do bio"]},{"locale":"en","kw":["how to add tip link to bio"]}]},
{"slug":"thumbnails-cta","targets":[{"locale":"pl","kw":["miniatury z CTA dla twórców"]},{"locale":"en","kw":["thumbnails with CTA creators"]}]},
{"slug":"placements","targets":[{"locale":"pl","kw":["gdzie wstawić link tip"]},{"locale":"en","kw":["where to place tip link"]}]}
],
"internal_links":["/pl/blog/style-guide","/en/blog/style-guide"]
},
{
"id":"p3_fans_support",
"title_pl":"Dla widzów — szybkie wsparcie twórców",
"title_en":"For fans — quick creator support",
"subtopics":[
{"slug":"support-quickly","targets":[{"locale":"pl","kw":["jak wesprzeć twórcę bez przerywania"]},{"locale":"en","kw":["how to support a creator quickly"]}]},
{"slug":"captions","targets":[{"locale":"pl","kw":["dostępność napisów do wideo"]},{"locale":"en","kw":["video captions accessibility"]}]}
],
"internal_links":["/pl/help","/en/help"]
},
{
"id":"p4_accessibility_aids",
"title_pl":"Dostępność i materiały pomocnicze",
"title_en":"Accessibility and helpful materials",
"subtopics":[
{"slug":"alt-text","targets":[{"locale":"pl","kw":["ALT do obrazów przykłady"]},{"locale":"en","kw":["ALT text examples"]}]},
{"slug":"contrast","targets":[{"locale":"pl","kw":["kontrast AA w praktyce"]},{"locale":"en","kw":["AA contrast checklist"]}]},
{"slug":"glossary","targets":[{"locale":"pl","kw":["słownik twórcy"]},{"locale":"en","kw":["creator economy glossary"]}]}
],
"internal_links":["/pl/blog/glossary","/en/blog/glossary"]
}
]
}

---

1. PILLAR_OUTLINES_PL (3)

Ścieżka: /tipjar-campaigns/.artifacts/draft/seo/pillars/pl/2025/08/19/PILLAR_OUTLINES_PL_v1.0.0.md

[Unverified]

# P1 — Jak działa napiwek w tipjar+

## H2: Krótki przepływ: profil → kwota → potwierdzenie

### H3: Dlaczego krótkie ścieżki zmniejszają rezygnacje

## H2: Przycisk „tip” — rola i umiejscowienie

### H3: Widoczność na profilu i w linkach zewnętrznych

## H2: Potwierdzenie i informacyjny język

### H3: Przykłady komunikatów bez roszczeń finansowych

**CTA:** Zobacz przepływ w tipjar+.

# P2 — Dla twórców: konfiguracja i dobre praktyki

## H2: Gdzie umieścić link „tip”

### H3: Bio, opis wideo, strona www

## H2: Miniatury i CTA

### H3: Czytelność i kontrast AA

## H2: Podstawy dostępności

### H3: Napisy, ALT ≤ 120 znaków

**CTA:** Dodaj link „tip” do swoich kanałów.

# P3 — Dla widzów: szybkie wsparcie

## H2: Jak wesprzeć bez przerywania seansu

### H3: Krótkie decyzje i przewidywalne kroki

## H2: Napisy i czytelność komunikatów

### H3: Wsparcie oglądania bez dźwięku

## H2: Najczęstsze pytania

### H3: Krótkie odpowiedzi i odsyłacze do pomocy

**CTA:** Otwórz profil twórcy i wypróbuj tip.

---

1. PILLAR_OUTLINES_EN (3)

Ścieżka: /tipjar-campaigns/.artifacts/draft/seo/pillars/en/2025/08/19/PILLAR_OUTLINES_EN_v1.0.0.md

[Unverified]

# P1 — How tipping works in tipjar+

## H2: A short path: profile → amount → confirmation

### H3: Why shorter paths reduce drop-off

## H2: The “tip” button — role and placement

### H3: Visibility on profile and external links

## H2: Confirmation and descriptive copy

### H3: Examples without financial claims

**CTA:** See the flow in tipjar+.

# P2 — For creators: setup and best practices

## H2: Where to place the “tip” link

### H3: Bio, video descriptions, website

## H2: Thumbnails and CTA clarity

### H3: Readability and AA contrast

## H2: Accessibility basics

### H3: Captions, ALT ≤ 120 chars

**CTA:** Add the “tip” link to your channels.

# P3 — For fans: quick support

## H2: Support without breaking the watch

### H3: Quick decisions and predictable steps

## H2: Captions and clear messaging

### H3: Watching without sound

## H2: Common questions

### H3: Short answers and Help links

**CTA:** Open a creator profile and try tipping.

---

1. ARTICLE_OUTLINES_PL (12)

Ścieżka: /tipjar-campaigns/.artifacts/draft/seo/posts/pl/2025/08/19/ARTICLE_OUTLINES_PL_v1.0.0.md

[Unverified]

1. Tytuł: Jak dodać link „tip” do bio
    
    TL;DR: Krótkie kroki w najpopularniejszych miejscach.
    
    Sekcje: Gdzie kliknąć; Przykładowe treści; Błędy do uniknięcia.
    
    FAQ: 3 pytania.  **CTA:** Dodaj link.
    
2. Tytuł: Miniatury z czytelnym CTA — szybki przewodnik
    
    TL;DR: Jak uprościć grafikę dla widza.
    
    Sekcje: Rozmiary; Kontrast; Tekst; Test A/B.
    
    FAQ. **CTA:** Pobierz checklistę.
    
3. Tytuł: Napisy do wideo — podstawy
    
    TL;DR: Dlaczego napisy pomagają.
    
    Sekcje: Format; Długość linii; Synchronizacja.
    
    FAQ. **CTA:** Włącz napisy.
    
4. Tytuł: Jak działa potwierdzenie napiwku
    
    TL;DR: Co widzi użytkownik i kiedy.
    
    Sekcje: Kopie; Mikrointerakcje; Dostępność.
    
    FAQ. **CTA:** Zobacz przepływ.
    
5. Tytuł: Gdzie wstawić link „tip” na stronie
    
    TL;DR: Najczęstsze miejsca i układ.
    
    Sekcje: Header; Sidebar; Stopka.
    
    FAQ. **CTA:** Dodaj link.
    
6. Tytuł: Krótki przewodnik ALT (≤120 znaków)
    
    TL;DR: Opisz informacyjnie.
    
    Sekcje: Co opisać; Czego unikać; Przykłady.
    
    FAQ. **CTA:** Zastosuj ALT.
    
7. Tytuł: Wsparcie bez przerywania seansu
    
    TL;DR: Jak nie tracić rytmu oglądania.
    
    Sekcje: 3 kroki; Potwierdzenie; Powrót do treści.
    
    FAQ. **CTA:** Sprawdź tip.
    
8. Tytuł: Słownik pojęć twórcy — szybki start
    
    TL;DR: Definicje używane w product copy.
    
    Sekcje: Terminy; Zastosowania.
    
    FAQ. **CTA:** Przejdź do słownika.
    
9. Tytuł: UTM w linkach produktowych — krótkie zasady
    
    TL;DR: Jak nazwać kampanie i treści.
    
    Sekcje: source/medium/campaign/content/term.
    
    FAQ. **CTA:** Skopiuj wzór.
    
10. Tytuł: Checklisty dostępności dla grafik
    
    TL;DR: Kontrast AA i czytelność.
    
    Sekcje: Rozmiary; Kolor; Tekst.
    
    FAQ. **CTA:** Pobierz checklistę.
    
11. Tytuł: Jak osadzić link „tip” pod wideo
    
    TL;DR: Opisy i przypięte komentarze.
    
    Sekcje: Szablony; Miejsca; Błędy.
    
    FAQ. **CTA:** Dodaj link.
    
12. Tytuł: Jak napisać krótkie potwierdzenie
    
    TL;DR: Jednoznaczny komunikat.
    
    Sekcje: Ton; Długość; Przykłady.
    
    FAQ. **CTA:** Użyj szablonu.
    

---

1. ARTICLE_OUTLINES_EN (10)

Ścieżka: /tipjar-campaigns/.artifacts/draft/seo/posts/en/2025/08/19/ARTICLE_OUTLINES_EN_v1.0.0.md

[Unverified]

1. Title: Add a “tip” link to your bio
    
    TL;DR: Quick placements and copy.
    
    Sections: Where to place; Example copy; Mistakes.
    
    FAQ. **CTA:** Add the link.
    
2. Title: Thumbnails with clear CTA — a quick guide
    
    TL;DR: Make graphics readable.
    
    Sections: Sizes; Contrast; Text; A/B.
    
    FAQ. **CTA:** Get the checklist.
    
3. Title: Video captions — the basics
    
    TL;DR: Accessibility and retention.
    
    Sections: Format; Line length; Sync.
    
    FAQ. **CTA:** Turn on captions.
    
4. Title: Tip confirmation — what users see
    
    TL;DR: Copy + micro-interactions.
    
    Sections: Messages; States; Accessibility.
    
    FAQ. **CTA:** See the flow.
    
5. Title: Where to place the “tip” link on a website
    
    TL;DR: Header, sidebar, footer.
    
    Sections: Patterns; Examples; Errors.
    
    FAQ. **CTA:** Add the link.
    
6. Title: ALT text in 120 characters
    
    TL;DR: Informative descriptions.
    
    Sections: What to include; What to avoid; Examples.
    
    FAQ. **CTA:** Apply ALT.
    
7. Title: Support a creator without breaking the watch
    
    TL;DR: Keep the moment.
    
    Sections: Steps; Confirmation; Return.
    
    FAQ. **CTA:** Try tipping.
    
8. Title: Creator glossary — quick start
    
    TL;DR: Definitions used in product copy.
    
    Sections: Terms; Usage.
    
    FAQ. **CTA:** Read the glossary.
    
9. Title: UTM rules for product links
    
    TL;DR: Naming conventions.
    
    Sections: source/medium/campaign/content/term.
    
    FAQ. **CTA:** Copy the template.
    
10. Title: Accessibility checklists for images
    
    TL;DR: Contrast AA and clarity.
    
    Sections: Sizes; Color; Text.
    
    FAQ. **CTA:** Download the checklist.
    

---

1. META_PACK_BLOG (title ≤60, desc ≤155)

Ścieżka: /tipjar-campaigns/.artifacts/draft/seo/meta/2025/08/19/META_PACK_BLOG_v1.0.0.md

[Unverified]

- /pl/blog/jak-dziala-napiwek
    
    Title: Jak działa napiwek w tipjar+
    
    Description: Poznaj krótki przepływ: profil, kwota, potwierdzenie — i zobacz, jak działa tipjar+.
    
- /en/blog/how-tipping-works
    
    Title: How tipping works in tipjar+
    
    Description: A short path from profile to confirmation — see how tipping works in tipjar+.
    
- /pl/blog/dodaj-link-tip-do-bio
    
    Title: Jak dodać link „tip” do bio
    
    Description: Najczęstsze miejsca, przykładowe treści i błędy do uniknięcia — szybki przewodnik.
    
- /en/blog/add-tip-link-to-bio
    
    Title: Add a “tip” link to your bio
    
    Description: Top placements, example copy and mistakes to avoid — a quick guide.
    
- /pl/blog/miniatury-z-cta
    
    Title: Miniatury z czytelnym CTA
    
    Description: Jak uprościć grafikę i zachować kontrast AA — praktyczna checklista.
    
- /en/blog/thumbnails-with-cta
    
    Title: Thumbnails with a clear CTA
    
    Description: Make graphics readable and keep AA contrast — a practical checklist.
    
- /pl/blog/alt-w-120-znakach
    
    Title: ALT w 120 znakach — przykłady
    
    Description: Informacyjne opisy obrazów. Co ująć, czego unikać i wzory do skopiowania.
    
- /en/blog/alt-in-120-chars
    
    Title: ALT in 120 characters — examples
    
    Description: Informative image descriptions. What to include, avoid and copy-ready samples.
    
- /pl/blog/napisy-do-wideo
    
    Title: Napisy do wideo — podstawy
    
    Description: Dlaczego warto, jak przygotować i zsynchronizować napisy — krótki poradnik.
    
- /en/blog/video-captions-basics
    
    Title: Video captions — the basics
    
    Description: Why captions help and how to format, limit line length and sync them fast.
    

---

1. SCHEMA_BLOG_JSONLD.json

Ścieżka: /tipjar-campaigns/.artifacts/draft/seo/schema/2025/08/19/SCHEMA_BLOG_JSONLD_v1.0.0.json

{
"@context": "[https://schema.org](https://schema.org/)",
"items": [
{
"@type": "BlogPosting",
"headline": "Jak działa napiwek w tipjar+",
"inLanguage": "pl-PL",
"datePublished": "2025-08-21",
"dateModified": "2025-08-21",
"author": {"@type":"Organization","name":"tipjar+"},
"publisher": {"@type":"Organization","name":"tipjar+"},
"mainEntityOfPage": {"@type":"WebPage","@id":"[https://tipjar.plus/pl/blog/jak-dziala-napiwek](https://tipjar.plus/pl/blog/jak-dziala-napiwek)"},
"description": "Krótki przepływ: profil, kwota, potwierdzenie."
},
{
"@type": "BlogPosting",
"headline": "How tipping works in tipjar+",
"inLanguage": "en-US",
"datePublished": "2025-08-26",
"dateModified": "2025-08-26",
"author": {"@type":"Organization","name":"tipjar+"},
"publisher": {"@type":"Organization","name":"tipjar+"},
"mainEntityOfPage": {"@type":"WebPage","@id":"[https://tipjar.plus/en/blog/how-tipping-works](https://tipjar.plus/en/blog/how-tipping-works)"},
"description": "A short path from profile to confirmation."
},
{
"@type": "BlogPosting",
"headline": "Jak dodać link „tip” do bio",
"inLanguage": "pl-PL",
"datePublished": "2025-08-28",
"dateModified": "2025-08-28",
"author": {"@type":"Organization","name":"tipjar+"},
"publisher": {"@type":"Organization","name":"tipjar+"},
"mainEntityOfPage": {"@type":"WebPage","@id":"[https://tipjar.plus/pl/blog/dodaj-link-tip-do-bio](https://tipjar.plus/pl/blog/dodaj-link-tip-do-bio)"},
"description": "Najczęstsze miejsca i przykłady treści."
},
{
"@type": "BlogPosting",
"headline": "Add a “tip” link to your bio",
"inLanguage": "en-US",
"datePublished": "2025-09-02",
"dateModified": "2025-09-02",
"author": {"@type":"Organization","name":"tipjar+"},
"publisher": {"@type":"Organization","name":"tipjar+"},
"mainEntityOfPage": {"@type":"WebPage","@id":"[https://tipjar.plus/en/blog/add-tip-link-to-bio](https://tipjar.plus/en/blog/add-tip-link-to-bio)"},
"description": "Top placements and example copy."
}
]
}

---

1. INTERNAL_LINKING_SCHEMA

Ścieżka: /tipjar-campaigns/.artifacts/draft/seo/linking/2025/08/19/INTERNAL_LINKING_SCHEMA_v1.0.0.md

[Unverified]

# Linkowanie wewnętrzne (hub ↔ spoke)

- **Hubs (pillars):** /pl/blog/jak-dziala-napiwek, /pl/blog/dla-tworcow-setup, /pl/blog/dla-widzow, /pl/blog/dostepnosc
- **Spokes:** posty szczegółowe (np. /pl/blog/alt-w-120-znakach).
- Każdy post: **3–5** linków wewn. (2→hub, 1–3→spokes powiązane tematycznie).
- Używaj anchorów opisowych („jak dodać link ‘tip’”), unikaj „kliknij tutaj”.
- Sekcje „Zobacz też” na końcu (lista 3 pozycji).

---

1. IMAGE_BRIEF_LIST

Ścieżka: /tipjar-campaigns/.artifacts/draft/seo/images/2025/08/19/IMAGE_BRIEF_LIST_v1.0.0.md

[Unverified]

- KV do filaru „Jak działa napiwek” — **ALT:** Schemat: profil, kwota, potwierdzenie.
- Zrzut profilu twórcy z przyciskiem „tip” — **ALT:** Profil twórcy z przyciskiem „tip”.
- Zrzut wyboru kwoty — **ALT:** Ekran wyboru kwoty napiwku w USDC.
- Zrzut potwierdzenia — **ALT:** Ekran potwierdzenia napiwku po wysyłce.
- Miniatura „Miniatury z CTA” — **ALT:** Grafika z wyraźnym wezwaniem do działania.

---

1. STYLE_GUIDE_BLOG

Ścieżka: /tipjar-campaigns/.artifacts/draft/seo/style/2025/08/19/STYLE_GUIDE_BLOG_v1.0.0.md

[Unverified]

- Lead ≤ 40 słów; 1 CTA/post.
- Akapity 100–140 słów; H2/H3 logiczne.
- Język opisowy (produkt/dostępność), bez roszczeń finansowych.
- ALT ≤ 120 znaków; kontrast ≥ AA.
- UTM w linkach do produktu/pomocy; canonical + OG + JSON-LD.
- Tabele/checklisty dla rzeczy „krok po kroku”.

---

1. COMPLIANCE_NOTES

Ścieżka: /tipjar-campaigns/.artifacts/draft/seo/compliance/2025/08/19/COMPLIANCE_NOTES_v1.0.0.md

[Unverified]

- Brak porad inwestycyjnych i obietnic wyników.
- USDC opisywane informacyjnie (bez gwarancji korzyści).
- PII=0 w treściach i metadanych.
- Zgodność z zasadami dostępności (napisy/ALT/kontrast).

---

1. EDITORIAL_CALENDAR.csv (8 tygodni)

Ścieżka: /tipjar-campaigns/.artifacts/draft/seo/calendar/2025/08/19/EDITORIAL_CALENDAR_v1.0.0.csv

date,language,title_working,owner,status,url
2025-08-21,pl,Jak działa napiwek w tipjar+,Content Writer,planned,[https://tipjar.plus/pl/blog/jak-dziala-napiwek](https://tipjar.plus/pl/blog/jak-dziala-napiwek)
2025-08-26,en,How tipping works in tipjar+,Content Writer,planned,[https://tipjar.plus/en/blog/how-tipping-works](https://tipjar.plus/en/blog/how-tipping-works)
2025-08-28,pl,Jak dodać link „tip” do bio,Content Writer,planned,[https://tipjar.plus/pl/blog/dodaj-link-tip-do-bio](https://tipjar.plus/pl/blog/dodaj-link-tip-do-bio)
2025-09-02,en,Add a “tip” link to your bio,Content Writer,planned,[https://tipjar.plus/en/blog/add-tip-link-to-bio](https://tipjar.plus/en/blog/add-tip-link-to-bio)
2025-09-04,pl,Miniatury z czytelnym CTA — przewodnik,Content Writer,planned,[https://tipjar.plus/pl/blog/miniatury-z-cta](https://tipjar.plus/pl/blog/miniatury-z-cta)
2025-09-09,en,Thumbnails with a clear CTA — guide,Content Writer,planned,[https://tipjar.plus/en/blog/thumbnails-with-cta](https://tipjar.plus/en/blog/thumbnails-with-cta)
2025-09-11,pl,Napisy do wideo — podstawy,Content Writer,planned,[https://tipjar.plus/pl/blog/napisy-do-wideo](https://tipjar.plus/pl/blog/napisy-do-wideo)
2025-09-16,en,Video captions — the basics,Content Writer,planned,[https://tipjar.plus/en/blog/video-captions-basics](https://tipjar.plus/en/blog/video-captions-basics)
2025-09-18,pl,ALT w 120 znakach — przykłady,Content Writer,planned,[https://tipjar.plus/pl/blog/alt-w-120-znakach](https://tipjar.plus/pl/blog/alt-w-120-znakach)
2025-09-23,en,ALT in 120 characters — examples,Content Writer,planned,[https://tipjar.plus/en/blog/alt-in-120-chars](https://tipjar.plus/en/blog/alt-in-120-chars)
2025-09-25,pl,UTM w linkach produktowych — zasady,Editor,planned,[https://tipjar.plus/pl/blog/utm-zasady](https://tipjar.plus/pl/blog/utm-zasady)
2025-09-30,en,UTM rules for product links,Editor,planned,[https://tipjar.plus/en/blog/utm-rules](https://tipjar.plus/en/blog/utm-rules)
2025-10-02,pl,Checklisty dostępności dla grafik,Editor,planned,[https://tipjar.plus/pl/blog/checklisty-dostepnosci-grafik](https://tipjar.plus/pl/blog/checklisty-dostepnosci-grafik)
2025-10-07,en,Accessibility checklists for images,Editor,planned,[https://tipjar.plus/en/blog/accessibility-checklists-images](https://tipjar.plus/en/blog/accessibility-checklists-images)
2025-10-09,pl,Słownik pojęć twórcy — szybki start,Editor,planned,[https://tipjar.plus/pl/blog/slownik-tworcy](https://tipjar.plus/pl/blog/slownik-tworcy)
2025-10-14,en,Creator glossary — quick start,Editor,planned,[https://tipjar.plus/en/blog/creator-glossary](https://tipjar.plus/en/blog/creator-glossary)

---

1. CMS_BLOCKS_SPEC.json

Ścieżka: /tipjar-campaigns/.artifacts/draft/seo/cms/2025/08/19/CMS_BLOCKS_SPEC_v1.0.0.json

{
"schema":"cms.blocks.v1",
"blocks":{
"hero":{"fields":["title","lede","cta_text","cta_url"],"required":["title","lede"]},
"keypoints":{"fields":["items[]"],"required":["items[]"]},
"steps":{"fields":["items[].title","items[].desc"],"required":["items[]"]},
"faq":{"fields":["items[].q","items[].a"],"required":["items[]"]},
"cite":{"fields":["quote","attr"],"required":["quote"]},
"card":{"fields":["title","body","cta_text","cta_url"],"required":["title"]},
"alert":{"fields":["type","text"],"required":["type","text"]}
}
}

---

1. UTM_RULES_BLOG

Ścieżka: /tipjar-campaigns/.artifacts/draft/seo/utm/2025/08/19/UTM_RULES_BLOG_v1.0.0.md

[Unverified]
utm_source: blog

utm_medium: organic

utm_campaign: blog_launch2025_{pillar|post}

utm_content: {locale}*{slug}*{section} (np. pl_alt-w-120-znakach_body)

utm_term: (opcjonalnie dla Search embedding)

**Przykład:** [https://tipjar.plus/pl/blog/jak-dziala-napiwek?utm_source=blog&utm_medium=organic&utm_campaign=blog_launch2025_pillar&utm_content=pl_jak-dziala-napiwek_body](https://tipjar.plus/pl/blog/jak-dziala-napiwek?utm_source=blog&utm_medium=organic&utm_campaign=blog_launch2025_pillar&utm_content=pl_jak-dziala-napiwek_body)

---

1. SOCIAL_SNIPPETS_DIST (PL/EN, 70–110 znaków + link UTM)

Ścieżka: /tipjar-campaigns/.artifacts/draft/seo/social/2025/08/19/SOCIAL_SNIPPETS_DIST_v1.0.0.md

[Unverified]
**PL**

- Kilka dotknięć od zamiaru do potwierdzenia. Zobacz, jak działa tipjar+: {{url_utm}}
- Dodaj link „tip” tam, gdzie decyduje widz — bio i opis: {{url_utm}}
- Miniatury z czytelnym CTA? Tu masz krótką checklistę: {{url_utm}}
- Napisy pomagają także bez dźwięku. Szybki przewodnik: {{url_utm}}

**EN**

- A few taps to confirmation. See how tipping works in tipjar+: {{url_utm}}
- Place the “tip” link where fans decide — bio and descriptions: {{url_utm}}
- Thumbnails with a clear CTA — grab a short checklist: {{url_utm}}
- Captions help even without sound. Quick guide: {{url_utm}}

---

1. GLOSSARY_CREATOR_ECON

Ścieżka: /tipjar-campaigns/.artifacts/draft/seo/glossary/2025/08/19/GLOSSARY_CREATOR_ECON_v1.0.0.md

[Unverified]

- **Profil twórcy / Creator profile** — strona z przyciskiem „tip”.
- **Napiwek / Tip** — gest wsparcia twórcy, inicjowany przez widza.
- **USDC** — opisowo: jednostka odniesiona do USD 1:1.
- **CTA** — wezwanie do działania („tip”, „zobacz flow”).
- **ALT** — tekst alternatywny obrazu (≤ 120 znaków).
- **Kontrast AA** — poziom czytelności elementów graficznych.
- **Hreflang** — wskazanie wariantów językowych PL/EN.

---

1. FAQ_BLOG (10 Q/A)

Ścieżka: /tipjar-campaigns/.artifacts/draft/seo/faq/2025/08/19/FAQ_BLOG_v1.0.0.md

[Unverified]

1. **O czym jest blog tipjar+?**
    
    O prostym sposobie docenienia twórców i krótkich poradach produktowych.
    
2. **Czy publikujecie porady finansowe?**
    
    Nie. Opisujemy doświadczenie użytkownika i dostępność.
    
3. **Co to znaczy „kilka dotknięć”?**
    
    Przepływ: profil, wybór kwoty, potwierdzenie.
    
4. **Gdzie dodać link „tip”?**
    
    W bio, opisie wideo lub na stronie — tam, gdzie zapada decyzja.
    
5. **Po co napisy?**
    
    Wspierają odbiorców bez dźwięku i zwiększają czytelność.
    
6. **Czym jest ALT?**
    
    Opis obrazu do 120 znaków, ułatwiający zrozumienie grafiki.
    
7. **Czy blog ma wersję EN?**
    
    Tak — artykuły PL/EN z hreflang.
    
8. **Czy używacie UTM?**
    
    Tak — linki do produktu/pomocy mają znaczniki kampanii.
    
9. **Jak często publikujecie?**
    
    Dwa wpisy tygodniowo w pierwszych 8 tygodniach.
    
10. **Jak skontaktować się z zespołem?**
    
    Najszybciej przez stronę pomocy/FAQ (bez PII).
    

---

1. Patch plan.seo.json po EXEC (S1,S2,S3 → done; S4 → queued)

Plik: /tipjar-campaigns/starter-packs/plan.seo.json

{
"patches": [
{"op":"replace","path":"/steps/0/status","value":"done"},
{"op":"replace","path":"/steps/0/attempts","value":1},
{"op":"add","path":"/steps/0/produced","value":["CTX1"]},

```
{"op":"replace","path":"/steps/1/status","value":"done"},
{"op":"replace","path":"/steps/1/attempts","value":1},
{"op":"add","path":"/steps/1/produced","value":[
  "SEO_STRATEGY_BRIEF_PL","SEO_STRATEGY_BRIEF_EN",
  "KEYWORD_MAP_MULTI","TOPICAL_CLUSTER_PLAN",
  "INTERNAL_LINKING_SCHEMA","STYLE_GUIDE_BLOG",
  "CMS_BLOCKS_SPEC","UTM_RULES_BLOG",
  "COMPLIANCE_NOTES","GLOSSARY_CREATOR_ECON",
  "FAQ_BLOG","IMAGE_BRIEF_LIST","EDITORIAL_CALENDAR"
]},

{"op":"replace","path":"/steps/2/status","value":"done"},
{"op":"replace","path":"/steps/2/attempts","value":1},
{"op":"add","path":"/steps/2/produced","value":[
  "PILLAR_OUTLINES_PL","PILLAR_OUTLINES_EN",
  "ARTICLE_OUTLINES_PL","ARTICLE_OUTLINES_EN",
  "META_PACK_BLOG","SCHEMA_BLOG_JSONLD","SOCIAL_SNIPPETS_DIST"
]},

{"op":"replace","path":"/steps/3/status","value":"queued"}

```

]
}

---

1. Kryteria zakończenia ETAPU 3/6 (musi być „TAK”)

Wszystkie artefakty znajdują się w ścieżkach draft i zawierają powyższą treść.

plan.seo.json: S1=done, S2=done, S3=done, S4=queued.

Każdy materiał: 1 CTA, brak słów zakazanych, ALT ≤ 120 (gdzie dotyczy), canonical/OG/JSON-LD przewidziane.

---

Napisz „Dalej”, a przejdę do ETAPU 4/6: REVIEW (Editor/Evaluator) — raport QA + decyzja i patch-hinty dla paczki SEO/Blog.

---

📌 Source & Verification of Response

[✓ Verified] — Confirmed via official documentation, code, or direct source.

[Unverified] — Not confirmed; generated output or unsupported by source.

[Inference] — Reasoned deduction based on known context; not a guarantee.→ If a p plic a ble: in clu d e e x a c t file n a m e, lin e r e f e r e n c e, o r s o u r c e U R L.

[Speculation] — Hypothesis or estimate; not grounded in verified data.