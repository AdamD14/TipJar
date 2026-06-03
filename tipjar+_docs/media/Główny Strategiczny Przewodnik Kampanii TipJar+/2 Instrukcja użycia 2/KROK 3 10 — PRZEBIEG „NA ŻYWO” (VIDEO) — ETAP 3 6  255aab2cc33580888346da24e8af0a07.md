# KROK 3/10 — PRZEBIEG „NA ŻYWO” (VIDEO) — ETAP 3/6: EXEC S1→S2 (Curator → Scenarzysta) i zapis artefaktów draft

KROK 3/10 — PRZEBIEG „NA ŻYWO” (VIDEO) — ETAP 3/6: EXEC S1→S2 (Curator → Scenarzysta) i zapis artefaktów draft

Cel etapu: wygenerować [CTX1.md](http://ctx1.md/) (pakiet kontekstu), V1_SCRIPT.md (script + cut-sheet) oraz V1_SRT.srt (napisy 30–35 s), oznaczyć jako draft, nie publikować.

---

1. Utwórz artefakt [CTX1.md](http://ctx1.md/) (Kurator, ≤300 słów)

Ścieżka:
/tipjar-campaigns/.artifacts/draft/PLAN-VIDEO-20250818-001/CTX1.md

Treść (wklej w całości):

[Unverified]

# Context Pack — Video (TikTok 30–35 s) — tipjar+

## Cel filmu

- Pokaż w 30–35 s jak **szybko** i **czytelnie** można przekazać napiwek w USDC twórcy na tipjar+.
- Ton: prosty, konkretny, bez żargonu. Zero obietnic finansowych.

## Persona i kanał

- PL, mobilni widzowie 18–34, twórcy/streamerzy. Oczekują natychmiastowej jasności: co to jest, jak działa, co zrobić teraz.

## Ramy narracji (wymagane)

- HOOK (0–3s) → PROBLEM (3–8s) → ROZWIĄZANIE (8–20s) → PROOF (20–28s) → CTA (28–35s).
- Copy na ekranie ≤ 6 słów, jedno **CTA** na końcu.

## Fakty dozwolone (opisowe)

- „USDC jako środek napiwku”, „prosty profil twórcy”, „link lub przycisk tip”.
- „Globalny zasięg” wyłącznie opisowo (bez liczb). Unikać claimów i gwarancji.

## Zakazy i zgodność

- Zakazane słowa: Prevent, Guarantee, Will never, Fixes, Eliminates, Ensures that.
- Brak PII; placeholdery `{{link_landing_utm}}`, `{{link_help_center}}`.

## Overlay (kierunkowe, ≤ 6 słów)

- HOOK: „Doceniasz? Wyślij napiwek”
- PROBLEM: „Za dużo klików?”
- ROZWIĄZANIE: „tipjar+ • USDC • prosto”
- PROOF: „Twórcy i fani już używają”
- CTA: „Załóż profil na tipjar.plus”

📌 Source & Verification of Response

- [Unverified] — Pakiet kontekstu złożony z wewnętrznych materiałów i wytycznych; bez zewnętrznych źródeł.

---

1. Utwórz artefakt V1_SCRIPT.md — Script + Cut-sheet (PL, ~200 słów)

Ścieżka:
/tipjar-campaigns/.artifacts/draft/launch2025/video/pl/2025/08/18/V1_SCRIPT_tipjar-plus_tiktok_v1.0.0.md

Treść:

[Unverified]

# Script — TikTok 30–35 s (PL)

**HOOK (0–3s)**

Doceniasz twórcę? Wyślij napiwek w USDC — szybko i jasno.

**PROBLEM (3–8s)**

Gubisz się w długich formularzach i nie wiesz, gdzie kliknąć?

**ROZWIĄZANIE (8–20s)**

Na tipjar+ twórca ma prosty profil. Ty wybierasz kwotę napiwku w USDC, potwierdzasz i gotowe. Interfejs prowadzi jednym torem — bez zbędnych kroków.

**PROOF (20–28s)**

Twórcy i fani już używają krótkich linków „tip”. To działa na telefonie i mieści się w kilku dotknięciach.

**CTA (28–35s)**

Załóż profil twórcy na tipjar.plus i wypróbuj napiwek w USDC. {{link_landing_utm}}

## Cut-sheet (ujęcia + overlay ≤ 6 słów)

1. HOOK: zbliżenie telefonu, klik „tip” — **„Doceniasz? Wyślij napiwek”**
2. PROBLEM: przewijanie długiego formularza — **„Za dużo klików?”**
3. ROZWIĄZANIE: ekran profilu tipjar+ i wybór kwoty — **„USDC • prosto”**
4. PROOF: szybkie ujęcia fan→twórca, potwierdzenie — **„W kilka dotknięć”**
5. CTA: plansza z logo i adresem — **„Załóż profil na tipjar.plus”**

📌 Source & Verification of Response

- [Unverified] — Materiał generatywny na bazie kontekstu wewnętrznego; brak zewnętrznych cytatów.
- [Inference] — Sformułowania UX oparte na praktykach projektowych; nie stanowią gwarancji wyników.

---

1. Utwórz artefakt V1_SRT.srt — Napisy (PL, 30–35 s)

Ścieżka:
/tipjar-campaigns/.artifacts/draft/launch2025/video/pl/2025/08/18/V1_SRT_tipjar-plus_tiktok_v1.0.0.srt

Treść (format SRT):

1
00:00:00,000 --> 00:00:02,800
Doceniasz twórcę?
Wyślij napiwek w USDC.

2
00:00:02,800 --> 00:00:07,500
Za dużo klików i formularzy?
Chcesz zrobić to prościej?

3
00:00:07,500 --> 00:00:20,000
Na tipjar+ twórca ma prosty profil.
Wybierasz kwotę napiwku w USDC i potwierdzasz.

4
00:00:20,000 --> 00:00:28,000
Fani i twórcy używają krótkich linków „tip”.
Kilka dotknięć i gotowe.

5
00:00:28,000 --> 00:00:35,000
Załóż profil twórcy na tipjar.plus
i wypróbuj napiwek w USDC.

(Spełnia: numeracja sekwencyjna, format czasu, łączny czas ≤ 35 s, jedna sekcja CTA.)

---

1. Zaktualizuj plan.video.json po EXEC (S1 i S2)

Plik: /tipjar-campaigns/starter-packs/plan.video.json — zastosuj patch:

{
"patches": [
{"op":"replace","path":"/steps/0/status","value":"done"},
{"op":"replace","path":"/steps/0/attempts","value":1},
{"op":"add","path":"/steps/0/produced","value":["CTX1"]},

```
{"op":"replace","path":"/steps/1/status","value":"done"},
{"op":"replace","path":"/steps/1/attempts","value":1},
{"op":"add","path":"/steps/1/produced","value":["V1_SCRIPT","V1_SRT"]},

{"op":"replace","path":"/steps/2/status","value":"queued"}

```

]
}

---

1. Kryteria zakończenia ETAPU 3/6 (musi być „TAK”)

CTX1, V1_SCRIPT, V1_SRT istnieją w ścieżkach draft i zawierają podaną treść.

Plan VIDEO zaktualizowany: S1.status=done, S2.status=done, S3.status=queued.

W V1_SCRIPT.md obecna stopka weryfikacyjna; w SRT poprawny format i czas.

---

Napisz „Dalej”, a przejdę do ETAPU 4/6: REVIEW (Evaluator) — kontrola jakości V1_SCRIPT/V1_SRT + patch-hinty.

---

📌 Source & Verification of Response

[Unverified] — Teksty i napisy wytworzone wg wewnętrznych wytycznych i szablonów; brak zewnętrznych źródeł.

[✓ Verified] — Zgodność z ADAM-MODE: brak słów zakazanych, 1 CTA, brak PII, wymagana stopka w pliku MD, format SRT poprawny.

[Inference] — Timingi i sformułowania zoptymalizowane praktycznie pod krótkie wideo; mogą wymagać drobnej kalibracji po podglądzie.