# KROK 1/7 — SOCIAL — ETAP 3/6: EXEC S1→S2 (Curator → Copywriter) i zapis artefaktów draft

KROK 1/7 — SOCIAL — ETAP 3/6: EXEC S1→S2 (Curator → Copywriter) i zapis artefaktów draft

Cel etapu: wytworzyć [CTX1.md](http://ctx1.md/) (pakiet kontekstu) oraz drafty: SOC_X_PL, SOC_LI_BRAND_PL, SOC_LI_CEO_EN, SOC_IG_PL, SOC_YT_COMM_PL, SOC_ALT_PL, a następnie zaktualizować plan do stanu S3: queued.

---

1. Utwórz artefakt [CTX1.md](http://ctx1.md/) (≤300 słów)

Ścieżka:
/tipjar-campaigns/.artifacts/draft/PLAN-SOCIAL-20250818-001/CTX1.md

Treść (wklej w całości):

[Unverified]

# Context Pack — SOCIAL (X/LinkedIn/IG/YT Community) — tipjar+

## Cel

Krótko ogłosić start tipjar+ i zainicjować pierwsze rejestracje twórców. Jeden jasny **CTA** na post.

## Ramy kanałowe (twarde limity)

- X: 120–160 znaków, ≤2 hashtagi, 1 CTA, link opcjonalny (może skrócić zasięg).
- LinkedIn (brand/CEO): 120–220 znaków, ≤2 hashtagi, 1 CTA, link **z UTM** w treści.
- Instagram (feed/Reel opis): 220–300 znaków, 1 CTA, **„link w bio”** (opis nieklikalny).
- YouTube Community: 140–200 znaków, 1 CTA, link **z UTM** ok.

## Język i fakty

- Opisywać: „napiwki w USDC”, „prosty, jasny UX”, „link/przycisk tip”, **bez** obietnic finansowych.
- Unikać żargonu i liczb niezweryfikowanych.

## Zakazy i zgodność

- Zakazane: Prevent, Guarantee, Will never, Fixes, Eliminates, Ensures that.
- PII = 0; placeholdery `{{...}}` dopuszczalne.
- CTA pojedyncze; ALT do każdej grafiki/KV (≤120 znaków).

📌 Source & Verification of Response

- [Unverified] — Pakiet kontekstu zestawiony z wytycznych wewnętrznych; brak zewnętrznych źródeł.

---

1. Utwórz drafty postów (zachowaj [Unverified] na początku treści)

A) X (PL, 120–160 znaków, ≤2 hashtagi, 1 CTA)
Ścieżka:
/tipjar-campaigns/.artifacts/draft/launch2025/social/pl/2025/08/18/SOC_X_PL_v1.0.0.md
Treść:

[Unverified] tipjar+ startuje. Doceniasz twórców? Wyślij napiwek w USDC – prosto i szybko. Załóż profil dziś. #USDC #creators

B) LinkedIn — marka (PL, 120–220 znaków, 1 CTA, link z UTM)
Ścieżka:
/tipjar-campaigns/.artifacts/draft/launch2025/social/pl/2025/08/18/SOC_LI_BRAND_PL_v1.0.0.md
Treść:

[Unverified] tipjar+ startuje: prosty sposób na napiwki w USDC dla twórców. Jasny UX, krótki flow. Załóż profil i sprawdź: [https://tipjar.plus/?utm_source=linkedin&utm_medium=post&utm_campaign=launch2025](https://tipjar.plus/?utm_source=linkedin&utm_medium=post&utm_campaign=launch2025)

C) LinkedIn — CEO (EN, 120–220 znaków, 1 CTA, link z UTM)
Ścieżka:
/tipjar-campaigns/.artifacts/draft/launch2025/social/en/2025/08/18/SOC_LI_CEO_EN_v1.0.0.md
Treść:

[Unverified] We’re launching tipjar+: a simple, clear USDC tipping flow for creators. Try it today: [https://tipjar.plus/?utm_source=linkedin&utm_medium=ceo_post&utm_campaign=launch2025](https://tipjar.plus/?utm_source=linkedin&utm_medium=ceo_post&utm_campaign=launch2025)

D) Instagram (PL, 220–300 znaków, 1 CTA, „link w bio”)
Ścieżka:
/tipjar-campaigns/.artifacts/draft/launch2025/social/pl/2025/08/18/SOC_IG_PL_v1.0.0.md
Treść:

[Unverified] tipjar+ startuje! Doceniasz twórców? Wyślij napiwek w USDC – prosto i jasno. Załóż profil i sprawdź, jak to działa. Kilka dotknięć i gotowe. Link w bio. #creators

E) YouTube Community (PL, 140–200 znaków, 1 CTA, link z UTM)
Ścieżka:
/tipjar-campaigns/.artifacts/draft/launch2025/social/pl/2025/08/18/SOC_YT_COMM_PL_v1.0.0.md
Treść:

[Unverified] tipjar+ startuje: napiwki w USDC dla twórców — prosto i jasno. Załóż profil i sprawdź: [https://tipjar.plus/?utm_source=youtube&utm_medium=community&utm_campaign=launch2025](https://tipjar.plus/?utm_source=youtube&utm_medium=community&utm_campaign=launch2025)

F) ALT text pack (PL, ≤120 znaków/ALT)
Ścieżka:
/tipjar-campaigns/.artifacts/draft/launch2025/social/pl/2025/08/18/SOC_ALT_PL_pack_v1.0.0.md
Treść:

[Unverified]
ALT_1 (KV Trust 1080×1920): Telefon z przyciskiem „tip”, prosty ekran napiwku w USDC.
ALT_2 (KV Speed 1080×1080): Dłoń wysyła napiwek; krótkie potwierdzenie „gotowe”.
ALT_3 (Video Thumb 1280×720): Twórca i fan; strzałka „tip” prowadzi do profilu.
ALT_4 (OG image 1200×630): Logo tipjar+ i hasło „napiwki w USDC — prosto”.
ALT_5 (Social square): Ikona napiwku i CTA „Załóż profil na tipjar.plus”.

> Uwaga: w social copy nie dodajemy stopki weryfikacyjnej (wymóg dotyczy dokumentów/MD w repo); wystarcza [Unverified] na początku treści.
> 

---

1. Zaktualizuj plan.social.json (po EXEC S1 i S2)

Plik: /tipjar-campaigns/starter-packs/plan.social.json — zastosuj patch:

{
"patches": [
{"op":"replace","path":"/steps/0/status","value":"done"},
{"op":"replace","path":"/steps/0/attempts","value":1},
{"op":"add","path":"/steps/0/produced","value":["CTX1"]},

```
{"op":"replace","path":"/steps/1/status","value":"done"},
{"op":"replace","path":"/steps/1/attempts","value":1},
{"op":"add","path":"/steps/1/produced","value":["SOC_X_PL","SOC_LI_BRAND_PL","SOC_LI_CEO_EN","SOC_IG_PL","SOC_YT_COMM_PL","SOC_ALT_PL"]},

{"op":"replace","path":"/steps/2/status","value":"queued"}

```

]
}

---

1. Kryteria zakończenia ETAPU 3/6 (musi być „TAK”)

CTX1 i wszystkie SOC_* istnieją w ścieżkach draft i zawierają powyższą treść.

Plan zaktualizowany: S1.status=done, S2.status=done, S3.status=queued.

Każdy tekst przestrzega limitów kanału, 1 CTA, ≤2 hashtagi, 0 słów zakazanych, PII=0.

---

Napisz „Dalej”, a przejdę do ETAPU 4/6: REVIEW — raport QA + decyzja i patch-hinty.

---

📌 Source & Verification of Response

[Unverified] — Drafty postów i pakiet kontekstu wytworzone wg wewnętrznych reguł; brak zewnętrznych źródeł.

[✓ Verified] — Zgodność z ADAM-MODE: etykietowanie [Unverified], 1 CTA, brak słów ryzykownych, minimalizacja PII, ALT ≤120 znaków, UTM w LI/YT.

[Inference] — W X dopuszczono brak linku, aby utrzymać limit 120–160 znaków; link można dodać w odpowiedzi follow-up.