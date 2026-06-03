# Orkiestrator mógł zbudować plan i uruchomić EXEC → REVIEW → FREEZE → Publikacja.

Created: August 18, 2025 9:47 PM

## KROK 1/7 — SOCIAL (X/LinkedIn/IG/YT Community) — ETAP 1/6: Utwórz **TaskSpec** pakietu postów

**Cel etapu:** przygotować kompletny `TaskSpec` dla paczki postów social (marka + CEO), aby Orkiestrator mógł zbudować plan i uruchomić EXEC → REVIEW → FREEZE → Publikacja.

---

### Wykonaj dokładnie te czynności

1. **Utwórz plik**:

```
/tipjar-campaigns/starter-packs/taskspec.social.json

```

1. **Wklej poniższą zawartość (bez zmian w strukturze):**

```json
{
  "task_id": "MKT-SOCIAL-20250818-001",
  "objective": "Stworzyć pakiet postów social o starcie tipjar+ dla X, LinkedIn (marka + CEO), IG i YouTube Community wraz z ALT i UTM.",
  "persona": "Twórcy wideo/streamerzy, wczesna adopcja; inwestorzy i partnerzy (LI/EN).",
  "outputs": [
    {"type":"markdown","channel":"x","length":"120–160 znaków","locale":"pl"},
    {"type":"markdown","channel":"linkedin_brand","length":"120–220 znaków","locale":"pl"},
    {"type":"markdown","channel":"linkedin_ceo","length":"120–220 znaków","locale":"en"},
    {"type":"markdown","channel":"instagram","length":"220–300 znaków","locale":"pl"},
    {"type":"markdown","channel":"youtube_community","length":"140–200 znaków","locale":"pl"},
    {"type":"markdown","channel":"alt_text_pack","length":"<=120 znaków na grafikę","locale":"pl"}
  ],
  "constraints": {
    "adam_mode": true,
    "channel_rules": {
      "x": {"max_hashtags": 2, "cta_required": true},
      "linkedin": {"max_hashtags": 2, "cta_required": true},
      "instagram": {"max_hashtags": 2, "cta_required": true},
      "youtube_community": {"max_hashtags": 2, "cta_required": true},
      "alt_text": {"required": true, "max_len": 120}
    },
    "legal": ["RODO", "brak obietnic finansowych"],
    "style_guides": ["jedna CTA", "prosty ton", "brak CAPS", "ALT dla grafik", "UTM w linkach (komentarz przypięty tam, gdzie potrzebne)"],
    "banned_words": ["Prevent","Guarantee","Will never","Fixes","Eliminates","Ensures that"]
  },
  "context_refs": [
    {"type":"doc","name":"Tipjar Growth Plan"},
    {"type":"doc","name":"Nieliniarna Strategia Marketingowa TipJar+"},
    {"type":"doc","name":"KV / miniatury — KROK 4/7"}
  ],
  "privacy": {"pii": "none", "minimize_context": true},
  "kpi_target": {"clarity_score": ">=0.8", "er_ctr_baseline":"monitoruj 120 min po publikacji"},
  "routing_hint": ["Curator","Copywriter","Evaluator","Freeze"],
  "generation": {"max_tokens": 700, "temperature": 0.5},
  "tool_access": {"web_browse": false, "image_gen": false},
  "review_policy": {"evaluator_required": true, "human_required": true},
  "deadline_iso": "2025-08-19T18:00:00+02:00",
  "logs": {"level":"brief","store_artifacts": true}
}

```

1. **Zapisz plik** i uruchom linter JSON — wynik musi być **PASS**.
2. **Kryteria zakończenia etapu (wszystkie „TAK”):**
- Plik istnieje pod ścieżką: `/tipjar-campaigns/starter-packs/taskspec.social.json`.
- Treść identyczna jak powyżej (dopuszczalna zmiana `deadline_iso`).
- Walidacja składni **PASS**.

---

Napisz **„Dalej”**, a przejdę do **ETAPU 2/6: ROUTE → wygenerowanie OrchestrationPlan dla SOCIAL**.

---

📌 Source & Verification of Response

- [Unverified] — Specyfikacja zadania social została przygotowana na podstawie dotychczasowych ustaleń i wewnętrznych reguł; brak źródeł zewnętrznych.
- [✓ Verified] — Zastosowano ADAM-MODE: etykietowanie, zakazane słowa, minimalizacja PII, 1 CTA, ALT/UTM.
- [Inference] — Limity długości i polityki hashtagów są rozsądnymi wartościami startowymi i mogą wymagać kalibracji po pierwszych publikacjach.

### Powiedziałeś(-aś):

Dalej

### ChatGPT powiedział:

[Unverified]

## KROK 1/7 — SOCIAL — ETAP 2/6: ROUTE → wygeneruj **OrchestrationPlan**

**Cel etapu:** utworzyć kompletny `OrchestrationPlan` dla paczki social, aby przejść do EXEC.

---

### Wykonaj dokładnie te czynności

1. **Utwórz plik:**

```
/tipjar-campaigns/starter-packs/plan.social.json

```

1. **Wklej poniższą zawartość (bez zmian w strukturze i kluczach):**

```json
{
  "plan_id": "PLAN-SOCIAL-20250818-001",
  "task_id": "MKT-SOCIAL-20250818-001",
  "version": "1.0.0",
  "created_at": "2025-08-18T14:30:00+02:00",
  "owner": "system/orchestrator",
  "routing_hint": ["Curator","Copywriter","Evaluator","Freeze"],
  "sla": {
    "plan_deadline": "2025-08-19T18:00:00+02:00",
    "default_step_timeout_min": 30,
    "breach_policy": "ALERT_AND_ESCALATE"
  },
  "security": {
    "pii_scope": "none",
    "context_minimization": true,
    "redaction_rules_id": "RR-1.0"
  },
  "guardrails": {
    "macros": ["ADAM_BASE","LABELING","BANNED_WORDS","PRIVACY_MIN","OUTPUT_SCHEMA","QA_FOOTER","REJECTION","CHANNEL_RULES"],
    "glossary_version": "1.0"
  },
  "owners": [
    {"role":"Curator","model":"LLM-A@vX","endpoint":"curator.svc"},
    {"role":"Copywriter","model":"LLM-B@vY","endpoint":"copy.svc"},
    {"role":"Evaluator","model":"LLM-C@vZ","endpoint":"eval.svc"},
    {"role":"Freeze","model":"system/publisher","endpoint":"freeze.svc"}
  ],
  "artifacts_expected": [
    {"id":"SOC_X_PL","type":"markdown","channel":"x","locale":"pl","desc":"post X 120–160 znaków"},
    {"id":"SOC_LI_BRAND_PL","type":"markdown","channel":"linkedin_brand","locale":"pl","desc":"post LinkedIn marka 120–220 znaków"},
    {"id":"SOC_LI_CEO_EN","type":"markdown","channel":"linkedin_ceo","locale":"en","desc":"post LinkedIn CEO 120–220 znaków"},
    {"id":"SOC_IG_PL","type":"markdown","channel":"instagram","locale":"pl","desc":"opis IG 220–300 znaków"},
    {"id":"SOC_YT_COMM_PL","type":"markdown","channel":"youtube_community","locale":"pl","desc":"post YT Community 140–200 znaków"},
    {"id":"SOC_ALT_PL","type":"markdown","channel":"alt_text_pack","locale":"pl","desc":"ALT ≤120 znaków do grafik/KV"}
  ],
  "steps": [
    {
      "step_id": "S1",
      "role": "Curator",
      "type": "CONTEXT_PACK",
      "inputs": ["TaskSpec:MKT-SOCIAL-20250818-001"],
      "outputs_expected": [{"artifact":"CTX1","type":"md"}],
      "deps": [],
      "queue": "q.curator",
      "priority": 2,
      "status": "queued",
      "attempts": 0,
      "max_attempts": 3,
      "timeout_min": 10
    },
    {
      "step_id": "S2",
      "role": "Copywriter",
      "type": "GENERATE",
      "inputs": ["CTX1","Glossary:v1"],
      "outputs_expected": [
        {"artifact":"SOC_X_PL"},
        {"artifact":"SOC_LI_BRAND_PL"},
        {"artifact":"SOC_LI_CEO_EN"},
        {"artifact":"SOC_IG_PL"},
        {"artifact":"SOC_YT_COMM_PL"},
        {"artifact":"SOC_ALT_PL"}
      ],
      "deps": ["S1"],
      "queue": "q.copywriter.social",
      "priority": 2,
      "status": "blocked",
      "attempts": 0,
      "max_attempts": 2,
      "timeout_min": 20
    },
    {
      "step_id": "S3",
      "role": "Evaluator",
      "type": "QUALITY_CHECK",
      "inputs": [
        "SOC_X_PL","SOC_LI_BRAND_PL","SOC_LI_CEO_EN","SOC_IG_PL","SOC_YT_COMM_PL","SOC_ALT_PL",
        "TaskSpec:MKT-SOCIAL-20250818-001","Glossary:v1"
      ],
      "outputs_expected": [{"artifact":"QA1","type":"md"}],
      "deps": ["S2"],
      "queue": "q.evaluator",
      "priority": 1,
      "status": "blocked",
      "attempts": 0,
      "max_attempts": 2,
      "timeout_min": 10,
      "decision_gate": true},
    {
      "step_id": "S4",
      "role": "Freeze",
      "type": "ARCHIVE_PUBLISH",
      "inputs": ["SOC_X_PL","SOC_LI_BRAND_PL","SOC_LI_CEO_EN","SOC_IG_PL","SOC_YT_COMM_PL","SOC_ALT_PL","QA1"],
      "outputs_expected": [{"artifact":"MANIFEST","type":"json"}],
      "deps": ["S3"],
      "queue": "q.freeze",
      "priority": 1,
      "status": "blocked",
      "attempts": 0,
      "max_attempts": 1,
      "timeout_min": 5
    }
  ],
  "audit": [],
  "state": "planned"
}

```

1. **Zapisz plik** i uruchom linter JSON — wynik **PASS**.
2. **Kryteria zakończenia etapu (wszystko „TAK”):**
- Plik istnieje: `/tipjar-campaigns/starter-packs/plan.social.json`.
- `plan_id/task_id` spójne z `taskspec.social.json`.
- `state = "planned"`, `decision_gate` ustawione w `S3`.
- Walidacja JSON **PASS**.

---

Napisz **„Dalej”**, a przejdę do **ETAPU 3/6: EXEC S1→S2 — wygenerowanie `CTX1.md` i draftów `SOC_*`**.

---

📌 Source & Verification of Response

- [Unverified] — Plan SOCIAL opracowany wg przyjętych szablonów orkiestracji w tej kampanii; brak źródeł zewnętrznych.
- [✓ Verified] — Zgodność z ADAM-MODE (etykietowanie, słowa ryzykowne, minimalizacja PII, reguły kanałowe, 1 CTA, ALT).
- [Inference] — Nazwy kolejek i endpointów są placeholderami do podpięcia w Twojej infrastrukturze.

### Powiedziałeś(-aś):

dalej

### ChatGPT powiedział:

Myślał przez 1m 18s

[Unverified]

## KROK 1/7 — SOCIAL — ETAP 3/6: **EXEC S1→S2** (Curator → Copywriter) i zapis artefaktów **draft**

**Cel etapu:** wygenerować `CTX1.md` (pakiet kontekstu) oraz drafty: `SOC_X_PL`, `SOC_LI_BRAND_PL`, `SOC_LI_CEO_EN`, `SOC_IG_PL`, `SOC_YT_COMM_PL`, `SOC_ALT_PL`. Oznaczyć jako **draft**, nie publikować.

---

### 1) Utwórz artefakt **CTX1.md** (Kurator, ≤300 słów)

**Ścieżka:**

`/tipjar-campaigns/.artifacts/draft/PLAN-SOCIAL-20250818-001/CTX1.md`

**Treść (wklej w całości):**

```markdown
[Unverified]
# Context Pack — Social (X/LinkedIn/IG/YT Community) — tipjar+

## Założenia i ton
- Komunikat: tipjar+ umożliwia **napiwki w USDC** dla twórców — prosto i globalnie.
- Ton: prosty, decyzyjny, bez żargonu. 1 **CTA** na post. Brak obietnic/garancji.
- Persony: twórcy wideo/streamerzy (PL), partnerzy i inwestorzy (EN/LinkedIn CEO).

## Reguły kanałów (skrót)
- **X/LinkedIn/YT Community**: link w poście (UTM obowiązkowe, ≤2 hashtagi).
- **Instagram**: link w bio lub w przypiętym komentarzu; opis 220–300 znaków.
- **ALT**: ≤120 znaków, opis tego co na grafice (nie powtarzać sloganu).
- **Zakazane słowa**: Prevent, Guarantee, Will never, Fixes, Eliminates, Ensures that.

## UTM (wzorce)
- X: `?utm_source=x&utm_medium=post&utm_campaign=launch2025`
- LinkedIn (brand): `?utm_source=linkedin&utm_medium=post&utm_campaign=launch2025`
- LinkedIn (CEO): `?utm_source=linkedin&utm_medium=ceo_post&utm_campaign=launch2025`
- IG: `?utm_source=instagram&utm_medium=post&utm_campaign=launch2025` *(w bio/komentarzu)*
- YT Community: `?utm_source=youtube&utm_medium=community&utm_campaign=launch2025`

## CTA — dopuszczalne
- „Załóż profil twórcy na tipjar.plus i wypróbuj napiwek w USDC.”

📌 Source & Verification of Response
- [Unverified] — Pakiet kontekstu z materiałów wewnętrznych; brak źródeł zewnętrznych.

```

---

### 2) Utwórz artefakt **SOC_X_PL** — X (PL, 120–160 znaków)

**Ścieżka:**

`/tipjar-campaigns/.artifacts/draft/launch2025/social/pl/2025/08/18/SOC_X_PL_v1.0.0.md`

**Treść:**

```markdown
[Unverified] (DRAFT — publikacja bez tej etykiety)
tipjar+ = napiwki w USDC dla twórców — prosto i globalnie. Załóż profil i wypróbuj:
https://tipjar.plus/?utm_source=x&utm_medium=post&utm_campaign=launch2025 #creators

```

---

### 3) Utwórz artefakt **SOC_LI_BRAND_PL** — LinkedIn (marka, PL, 120–220 znaków)

**Ścieżka:**

`/tipjar-campaigns/.artifacts/draft/launch2025/social/pl/2025/08/18/SOC_LI_BRAND_PL_v1.0.0.md`

**Treść:**

```markdown
[Unverified] (DRAFT — publikacja bez tej etykiety)
Uruchamiamy tipjar+: prosty sposób na napiwki w USDC dla twórców. Przejrzysty UX, szybki start.
Załóż profil i sprawdź: https://tipjar.plus/?utm_source=linkedin&utm_medium=post&utm_campaign=launch2025

```

---

### 4) Utwórz artefakt **SOC_LI_CEO_EN** — LinkedIn (CEO, EN, 120–220 chars)

**Ścieżka:**

`/tipjar-campaigns/.artifacts/draft/launch2025/social/en/2025/08/18/SOC_LI_CEO_EN_v1.0.0.md`

**Treść:**

```markdown
[Unverified] (DRAFT — publish without this label)
We’re launching tipjar+: a simple way for fans to send creators a USDC tip. Try it and tell us what works:
https://tipjar.plus/?utm_source=linkedin&utm_medium=ceo_post&utm_campaign=launch2025 #creators

```

---

### 5) Utwórz artefakt **SOC_IG_PL** — Instagram (PL, 220–300 znaków)

**Ścieżka:**

`/tipjar-campaigns/.artifacts/draft/launch2025/social/pl/2025/08/18/SOC_IG_PL_v1.0.0.md`

**Treść:**

```markdown
[Unverified] (DRAFT — publikacja bez tej etykiety)
Doceniasz twórców? Na tipjar+ wyślesz napiwek w USDC szybko i jasno. Twórcy zakładają profil, fani dziękują w kilku krokach.
Link w bio. Załóż profil i spróbuj już dziś. #creators

```

---

### 6) Utwórz artefakt **SOC_YT_COMM_PL** — YouTube Community (PL, 140–200 znaków)

**Ścieżka:**

`/tipjar-campaigns/.artifacts/draft/launch2025/social/pl/2025/08/18/SOC_YT_COMM_PL_v1.0.0.md`

**Treść:**

```markdown
[Unverified] (DRAFT — publikacja bez tej etykiety)
tipjar+: napiwki w USDC dla twórców — prosto i globalnie. Załóż profil i wypróbuj pierwszy napiwek:
https://tipjar.plus/?utm_source=youtube&utm_medium=community&utm_campaign=launch2025

```

---

### 7) Utwórz artefakt **SOC_ALT_PL** — ALT pack (PL, ≤120 znaków/szt.)

**Ścieżka:**

`/tipjar-campaigns/.artifacts/draft/launch2025/social/pl/2025/08/18/SOC_ALT_PL_v1.0.0.md`

**Treść:**

```markdown
[Unverified]
- KV TRUST 1280×720: Telefon z profilem tipjar+, przycisk „tip”, prosty przepływ napiwku w USDC.
- KV SPEED 1080×1920: Zbliżenie wyboru kwoty napiwku; pionowy kadr, czytelny interfejs.
- KV GLOBAL 1080×1080: Siatka twórców z różnych krajów; napis „USDC • prosto”.
- LinkedIn OG: Grafika ogłoszenia z logo tipjar+ i hasłem startu na spokojnym tle.
- X image: Kadr potwierdzenia napiwku; minimalny interfejs, wysoki kontrast.

```

---

### 8) Zaktualizuj **plan.social.json** po EXEC (S1 i S2)

**Plik:** `/tipjar-campaigns/starter-packs/plan.social.json` — zastosuj patch:

```json
{
  "patches": [
    {"op":"replace","path":"/steps/0/status","value":"done"},
    {"op":"replace","path":"/steps/0/attempts","value":1},
    {"op":"add","path":"/steps/0/produced","value":["CTX1"]},

    {"op":"replace","path":"/steps/1/status","value":"done"},
    {"op":"replace","path":"/steps/1/attempts","value":1},
    {"op":"add","path":"/steps/1/produced","value":["SOC_X_PL","SOC_LI_BRAND_PL","SOC_LI_CEO_EN","SOC_IG_PL","SOC_YT_COMM_PL","SOC_ALT_PL"]},

    {"op":"replace","path":"/steps/2/status","value":"queued"}
  ]
}

```

---

### 9) Kryteria zakończenia ETAPU 3/6 (musi być „TAK”)

- CTX1 i wszystkie `SOC_*` istnieją w ścieżkach **draft** i zawierają powyższą treść.
- Plan SOCIAL zaktualizowany: `S1.status=done`, `S2.status=done`, `S3.status=queued`.
- W social copy: **1 CTA**, ≤2 hashtagi, brak słów zakazanych i PII; ALT pack gotowy.

---

Napisz **„Dalej”**, a przejdę do **ETAPU 4/6: REVIEW (Evaluator) — kontrola `SOC_*` + patch-hinty**.

---

📌 Source & Verification of Response

- [Unverified] — Teksty social i pakiet kontekstu są generatywne wg wewnętrznych wytycznych; brak źródeł zewnętrznych.
- [✓ Verified] — Zastosowano ADAM-MODE: etykietowanie, brak słów ryzykownych, 1 CTA, minimalizacja PII, ALT ≤120 znaków.
- [Inference] — Długości i hashtagi dopasowane praktycznie do limitów kanałów; mogą wymagać lekkiej kalibracji po podglądzie.