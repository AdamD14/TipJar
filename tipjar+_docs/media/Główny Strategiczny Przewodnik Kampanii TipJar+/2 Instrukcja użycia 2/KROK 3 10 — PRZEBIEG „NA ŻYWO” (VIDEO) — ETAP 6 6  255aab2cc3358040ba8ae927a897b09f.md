# KROK 3/10 — PRZEBIEG „NA ŻYWO” (VIDEO) — ETAP 6/6: Publikacja kanałowa (TikTok/IG Reels/YouTube Shorts)

Krok 1/3 — Finalny montaż pliku, miniatury i kontrola jakości (QC)

Zrób dokładnie to:

1. Zmontuj finalny plik wideo

Wejście: V1_SCRIPT.md, V1_SRT.srt.

Wyjście: V1_FINAL_tipjar-plus_1080x1920_v1.0.1.mp4

Parametry eksportu: 1080×1920 (9:16), 24–30 fps, h.264, bitrate 8–12 Mb/s, długość ≤ 00:00:35.

Napisy: wgraj jako osobny plik SRT oraz wykonaj wersję z „burn-in” (dwie kopie: CC on platform i burn-in).

Głośność: normalizacja -14 LUFS (integrated), true peak ≤ -1.0 dBFS.

1. Nałóż krótkie overlaye (≤ 6 słów) zgodnie z CTX

HOOK: „Doceniasz? Wyślij napiwek” (0–3s)

PROBLEM: „Za dużo klików?” (3–8s)

ROZWIĄZANIE: „USDC • prosto” (8–20s)

PROOF: „W kilka dotknięć” (20–28s)

CTA: „Załóż profil na tipjar.plus” (28–35s)

1. Przygotuj miniaturę (KV) i ALT

Rozdzielczość: 1080×1920.

Copy na grafice ≤ 8 słów (np. „USDC napiwki — prosto”).

ALT: „Telefon z przyciskiem tip, prosty przepływ napiwku.”

1. Uzupełnij linki UTM (placeholdery)

{{link_landing_utm}} →

TikTok: [https://tipjar.plus/?utm_source=tiktok&utm_medium=short&utm_campaign=launch2025](https://tipjar.plus/?utm_source=tiktok&utm_medium=short&utm_campaign=launch2025)

IG Reels: [https://tipjar.plus/?utm_source=instagram&utm_medium=reel&utm_campaign=launch2025](https://tipjar.plus/?utm_source=instagram&utm_medium=reel&utm_campaign=launch2025)

YT Shorts: [https://tipjar.plus/?utm_source=youtube&utm_medium=shorts&utm_campaign=launch2025](https://tipjar.plus/?utm_source=youtube&utm_medium=shorts&utm_campaign=launch2025)

1. Zapisz artefakty do DAM (FREEZE już wykonany dla SCRIPT/SRT)

dam://campaigns/launch2025/video/pl/2025/08/18/V1_FINAL_tipjar-plus_1080x1920_v1.0.1.mp4

dam://campaigns/launch2025/video/pl/2025/08/18/V1_THUMB_tipjar-plus_1080x1920_v1.0.1.png

Policz sha256, wygeneruj podpisy ed25519 (.sig) i dopisz do istniejącego manifestu VIDEO (jako V1_FINAL, V1_THUMB).

1. QC — lista kontrolna (PASS/FAIL)
- [ ]  Długość ≤ 35 s; brak nagłych pików głośności.
- [ ]  Napisy: brak nałożeń, czytelne, polskie znaki OK.
- [ ]  Overlaye zgodne z CTX; jedno CTA na końcu.
- [ ]  Miniatura + ALT gotowe; kontrast AA.
- [ ]  Link UTM w opisie gotowy (placeholder wstawiony pod platformę).
- [ ]  Plik i miniatura dodane do DAM, hash + podpis obecne, manifest zaktualizowany.

---

Napisz „Dalej”, aby przejść do Kroku 2/3 — szczegółowa publikacja na TikTok (pola, ustawienia prywatności, godzina slotu, opis i link).

---

📌 Source & Verification of Response

[Unverified] — Procedura montażu i QC oparta na wewnętrznych wytycznych i wcześniejszych krokach (Video/Playbook/Freeze); brak zewnętrznych źródeł.

[✓ Verified] — Zachowana zgodność z ADAM-MODE (etykietowanie, brak ryzykownych słów, minimalizacja PII).

[Inference] — Parametry eksportu i normalizacji dźwięku to powszechnie stosowane praktyki i mogą wymagać kalibracji do Twojego pipeline’u.