# KROK 1/10 — Utwórz „paczkę startową” i porządek plików (fundament orkiestracji)

Cel: mieć jeden, spójny katalog roboczy z makrami ADAM-MODE, glosariuszem, promptami ról, API orkiestracji, kolejkami, walidatorami i playbookami — dokładnie według przewodnika (Kroki 1–10).

1. Załóż repo i strukturę katalogów

Utwórz repozytorium (np. tipjar-campaigns) z poniższą strukturą:

/tipjar-campaigns
/orchestrator
[orchestration.api.md](http://orchestration.api.md/)               # ROUTE/EXEC/REVIEW/FREEZE (Krok 3)
queues.topology.v1.yaml            # (Krok 4.1)
retry.dlq.policy.v1.yaml           # (Krok 4.2)
slo.sla.v1.yaml                    # (Krok 4.8)
/evaluator
validators.v1.yaml                 # (Krok 4.9 + 6)
evaluator.pipeline.v1.yaml         # (Krok 9.1)
evaluator.plugins.enable.v1.yaml   # (Krok 9.2)
whitelist.v1.yaml                  # (Krok 9.5)
/dam
integrity.v1.yaml                  # (Krok 4.4)
dam.storage.v1.yaml                # (Krok 4.5)
dam.manifest.schema.json           # (Krok 4.6)
/prompts
macros.adam.yaml                   # (Krok 2.1)
[glossary.tipjar.md](http://glossary.tipjar.md/)                 # (Krok 2.2)
role.prompt.template.yaml          # (Krok 2.3)
prompts.orchestrator.yaml          # (Krok 2.4 A)
prompts.curator.yaml               # (Krok 2.4 B)
prompts.copywriter.yaml            # (Krok 2.4 C)
prompts.lokalizator.yaml           # (Krok 2.4 D)
prompts.kreator.yaml               # (Krok 2.4 E)
prompts.scenarzysta.yaml           # (Krok 2.4 F)
prompts.seo.yaml                   # (Krok 2.4 G)
prompts.growth.yaml                # (Krok 2.4 H)
prompts.evaluator.yaml             # (Krok 2.4 I)
prompts.support.yaml               # (Krok 2.4 J)
/starter-packs                        # szablony z Kroku 5
taskspec.pr.json
plan.pr.json
taskspec.video.json
plan.video.json
taskspec.kv.json
plan.kv.json
taskspec.seo.json
plan.seo.json
taskspec.l10n.json
plan.l10n.json
taskspec.outreach.json
plan.outreach.json
taskspec.faq.json
plan.faq.json
/templates                            # gotowce treści z Kroku 8
[template.pr.md](http://template.pr.md/)[template.social.x.md](http://template.social.x.md/)[template.social.ig.md](http://template.social.ig.md/)[template.yt.community.md](http://template.yt.community.md/)[template.video.md](http://template.video.md/)[template.seo.md](http://template.seo.md/)[template.email.a.md](http://template.email.a.md/)[template.email.b.md](http://template.email.b.md/)[template.faq.md](http://template.faq.md/)[template.kv.md](http://template.kv.md/)
spec.kv.json
/deployment                           # zestaw z Kroku 10
01_control_room.md
02_checklists_pre_post_go_live.md
03_kpi_dashboard_spec.json
04_telemetry_schema.json
05_incident_playbook.md
06_quarterly_audit_pack.md
07_calendar_slots_CEST.yaml
08_ops_runbook_queues.yaml
09_validator_rules_refs.md
10_change_log_glossary_and_macros.md

1. Wgraj treść do plików z przewodnika

Skopiuj makra ADAM-MODE, glosariusz i prompty ról (Krok 2) do folderu /prompts (bez zmian w treści).

Skopiuj spec. API i planów (Kroki 3–4) do /orchestrator i /dam.

Skopiuj walidatory, pipeline i wtyczki Evaluatora (Kroki 6 i 9) do /evaluator.

Skopiuj „starter packs” (Krok 5) do /starter-packs.

Skopiuj szablony treści (Krok 8) do /templates.

Skopiuj deployment kit (Krok 10) do /deployment.

1. Ustal wersje i podpisy

Nadaj semver v1.0.0 całemu zestawowi (tag w repo).

Włącz podpisy ed25519 dla publikacji w DAM (zgodnie z integrity.v1.yaml).

1. Ustaw czas i nazewnictwo

Strefa: Europe/Brussels dla logów, SLA i slotów.

Stosuj schemat nazw artefaktów (Krok 4.3) i alias latest w DAM (Krok 4.5).

1. Kontrola jakości paczki

Sprawdź składnię YAML/JSON (validators.v1.yaml, evaluator.pipeline.v1.yaml).

Zweryfikuj, że wszystkie pliki zawierają te same zakazy słów i wymaganą stopkę.

1. Kryteria zakończenia Kroku 1 (musi być „TAK”)

Repo i struktura katalogów istnieją.

Wszystkie pliki wgrane i spójne z przewodnikiem.

Semver ustawione, strefa czasu skonfigurowana.

Lint YAML/JSON PASS.

Jeśli potwierdzasz wykonanie Kroku 1, napisz „Dalej”. Przejdę do Kroku 2 (pierwszy prawdziwy przebieg: ROUTE → EXEC → REVIEW → FREEZE na przykładzie PR).

---

📌 Source & Verification of Response

[Unverified] — Instrukcja operacyjna oparta na dostarczonym przewodniku (Kroki 1–10) i Twoich wytycznych; nie odwołuje się do zewnętrznych źródeł.

[✓ Verified] — Zasady ADAM-MODE (etykietowanie, słowa ryzykowne, minimalizacja PII, wymagana stopka) są spójnie zastosowane w strukturze i plikach.

[Inference] — Nazwy katalogów i plików są rozsądną konwencją porządkującą; mogą zostać dopasowane do Twojego systemu wersjonowania.