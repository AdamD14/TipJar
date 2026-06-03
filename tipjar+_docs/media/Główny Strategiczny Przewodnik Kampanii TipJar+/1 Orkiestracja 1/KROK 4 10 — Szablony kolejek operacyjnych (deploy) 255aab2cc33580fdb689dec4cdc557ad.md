# KROK 4/10 — Szablony kolejek operacyjnych (deploy), polityki retry/DLQ, standardy artefaktów (naming, hashing, DAM manifest)

Cel kroku: ustandaryzować warstwę wykonawczą: topologię kolejek, parametry SLA/SLO, zasady ponowień i dead-letter, oraz jednolite normy nazewnictwa i integralności artefaktów publikowanych przez kampanię.

---

4.1. Topologia kolejek (role → kolejki → shardy)

# queues.topology.v1.yaml

queues:

- name: q.curator
role: Curator
priority: 2
concurrency: 4
visibility_timeout_s: 900
retention_h: 72
max_length: 2000
fifo: true
dlq: q.dlq.curator
- name: q.copywriter.{locale}
role: Copywriter
locales: [pl, en, es, pt-BR, id]
priority: 2
concurrency: 8 # per shard
visibility_timeout_s: 1200
retention_h: 72
max_length: 5000
fifo: true
dlq: q.dlq.copywriter
- name: q.lokalizator.{locale}
role: Lokalizator
priority: 2
concurrency: 6
visibility_timeout_s: 900
dlq: q.dlq.lokalizator
- name: q.kreator
role: KreatorWizualny
priority: 2
concurrency: 4
visibility_timeout_s: 1800
dlq: q.dlq.kreator
- name: q.scenarzysta
role: Scenarzysta
priority: 2
concurrency: 4
visibility_timeout_s: 1200
dlq: q.dlq.scenarzysta
- name: q.seo
role: SEO
priority: 3
concurrency: 4
visibility_timeout_s: 900
dlq: q.dlq.seo
- name: q.growth
role: GrowthOps
priority: 3
concurrency: 4
visibility_timeout_s: 900
dlq: q.dlq.growth
- name: q.evaluator
role: Evaluator
priority: 1 # bramka jakości
concurrency: 10
visibility_timeout_s: 600
dlq: q.dlq.evaluator
- name: q.freeze
role: Freeze
priority: 1
concurrency: 2
visibility_timeout_s: 600
dlq: q.dlq.freeze
- name: q.support
role: CommunitySupport
priority: 2
concurrency: 6
visibility_timeout_s: 600
dlq: q.dlq.support

---

4.2. Polityki retry i DLQ (dead-letter)

# retry.dlq.policy.v1.yaml

retry:
default_max_attempts: 3
backoff: exponential_jitter           # 1m, 4m, 9m ±20% losowo
non_retryable_errors:                 # natychmiast do DLQ
- VALIDATION_FAILED
- POLICY_VIOLATION
- FORMAT_MISMATCH
retryable_errors:
- TIMEOUT
- TRANSIENT_UPSTREAM
- RATE_LIMIT
dlq:
triage_labels: [DATA, POLICY, FORMAT, RUNTIME, INFRA]
on_enqueue:
- capture_context_snippet: true
- hash_inputs_outputs: sha256
- notify_channel: "#alerts"
processor_sla_min: 60                 # triage w ≤ 60 min (Europe/Brussels)
disposition:
- label: POLICY | FORMAT
action: REJECT_WITH_REPORT
- label: DATA | RUNTIME | INFRA
action: FIX_AND_REQUEUE
attempts_reset: true
incident:
breach_thresholds:
sla_breach_count_15m: 3
dlq_rate_percent: 5
create_ticket: true
severity_map: { evaluator: "SEV-2", freeze: "SEV-1", others: "SEV-3" }

Runbook DLQ (skrót):

1. Triage (oznacz etykietą: DATA/POLICY/FORMAT/RUNTIME/INFRA).
2. Diagnostyka (logi + orchestration.audit).
3. Działanie: REJECT_WITH_REPORT (raport do ownera kroku) lub FIX_AND_REQUEUE (reset prób).
4. Post-mortem (opcjonalnie): wpis do knowledge base + reguła prewencyjna (lint/validator).

---

4.3. Standard nazewnictwa artefaktów

{campaign}/{channel}/{locale}/{yyyy}/{mm}/{dd}/{artifact_id}_{slug}_v{semver}.{ext}

campaign  : np. "launch2025" | "always_on"
channel   : pr | social | blog | seo | video | creatives | faq | ads
locale    : pl | en | es | pt-BR | id ...
artifact_id: np. A1 | QA1 (zgodnie z OrchestrationPlan)
slug      : a-z0-9- (max 60 znaków, bez spacji/polskich znaków)
semver    : 1.0.0 (major.minor.patch)
ext       : md | csv | json | srt | png | svg | mp4 | pdf ...

Przykład:
launch2025/pr/pl/2025/08/17/A1_ogloszenie-startu_v1.0.1.md

---

4.4. Hashing, podpisy, integralność

# integrity.v1.yaml

hash:
algorithm_primary: sha-256
algorithm_alt: blake3           # opcjonalnie
signing:
enabled: true
algo: ed25519
key_id: "tipjar-cicd@2025"
artifact_sig_ext: ".sig"
verify:
on_publish: true
on_read: true
metadata:
required:
- content_type
- size_bytes
- created_at_iso
- created_by_role
- task_id
- plan_id
- locale
- data_classification   # public | internal | sensitive

---

4.5. DAM – schemat URI i ACL

# dam.storage.v1.yaml

base_uri: "dam://campaigns"
uris:
artifacts: "dam://campaigns/{path_from_naming}"
manifests: "dam://campaigns/_manifests/{plan_id}.json"
acl:
roles:
Reader:
can: [read]
Publisher:
can: [read, write_artifact, write_manifest]
Admin:
can: [read, write_artifact, write_manifest, revoke]
policies:
immutability: write_once_per_version   # nowa wersja => nowy semver/URI
latest_alias: create_pointer: true     # symlink/alias na najnowszą wersję
retention_days:
artifacts: 3650
manifests: 3650
audit_logs: 365

---

4.6. Manifest publikacji (FREEZE) – schemat

{
"schema": "dam.manifest.v1",
"plan_id": "PLAN-2025-000123",
"frozen_at": "2025-08-17T18:03:22+02:00",
"publisher": "freeze@tipjar.plus",
"artifacts": [
{
"id": "A1",
"uri": "dam://campaigns/launch2025/pr/pl/2025/08/17/A1_ogloszenie-startu_v1.0.1.md",
"hash": {"sha256":"<hex>"},
"size_bytes": 18432,
"content_type": "text/markdown; charset=utf-8",
"locale": "pl",
"type": "markdown",
"created_by_role": "Copywriter",
"source_step": "S2",
"derived_from": [],
"data_classification": "public"
},
{
"id": "QA1",
"uri": "dam://campaigns/launch2025/pr/pl/2025/08/17/QA1_raport-qa_v1.0.0.md",
"hash": {"sha256":"<hex>"},
"type": "markdown",
"created_by_role": "Evaluator",
"source_step": "S3",
"data_classification": "internal"
}
],
"signatures": [
{"artifact_id":"A1","sig_uri":".../A1_...md.sig","algo":"ed25519","key_id":"tipjar-cicd@2025"}
],
"indexes": {
"by_locale": ["A1"],
"by_type": {"markdown":["A1","QA1"]}
}
}

---

4.7. Stany życia artefaktu

flowchart LR
draft --> qa_passed --> frozen --> published --> deprecated --> archived
draft -.fail.-> rejected
frozen -.policy.-> rejected

---

4.8. SLO/SLA operacyjne (monitoring)

# slo.sla.v1.yaml

slo:
p95_queue_wait_s: { q.evaluator: 60, default: 180 }
p95_exec_time_s: { q.copywriter.*: 300, q.scenarzysta: 420, default: 240 }
dlq_rate_percent: { global_max: 2.5, hard_cap: 5.0 }
publish_time_s: { freeze_manifest_p95: 30 }
alerts:

- metric: dlq_rate_percent
threshold: 5.0
window: 15m
action: SEV-2_INCIDENT
- metric: p95_queue_wait_s.q.evaluator
threshold: 60
window: 10m
action: SCALE_OUT | REPRIORITIZE

---

4.9. Walidatory i lintery publikacji

# validators.v1.yaml

validators:

- name: format.guard
rules: [schema_match(TaskSpec.outputs), locale_match, length_bounds]
- name: banned.words.guard
rules: [detect_banned_words, enforce_labels]
- name: integrity.guard
rules: [hash_present, size_match, content_type_present]
- name: footer.guard
rules: [verification_footer_present_for_text]

---

4.10. Przykład E2E (skrót, z czasem Europy/Bruksela)

1. EXEC S2 → [A1.md](http://a1.md/) (pl), [A2.md](http://a2.md/) (en), A3.txt zapisane tymczasowo (state: draft).
2. REVIEW S3 → [QA1.md](http://qa1.md/), decyzja accept → automatyczne validators.
3. FREEZE → generuje manifest, podpisuje A1/A2, przenosi do dam://campaigns/.../v1.0.1.*.
4. Alias latest zaktualizowany → publikacja (jeśli data_classification: public).
5. Audit log zapisuje zdarzenia STEP_COMPLETED, QA_DECISION, PLAN_COMPLETED.

---

Instrukcja: KROK 4/10 gotowy. Aby przejść dalej, wpisz „Dalej” — przygotuję KROK 5/10: Pakiety „starterowe” TaskSpec + OrchestrationPlan dla 7 typów zadań (PR, video, KV, SEO, lokalizacja, outreach, FAQ).

---

📌 Source & Verification of Response

[Unverified] — Specyfikacje opracowane na potrzeby orkiestracji wielomodelowej TipJar+; brak zewnętrznych źródeł.

[✓ Verified] — Zastosowano reguły ADAM-MODE (etykiety, zakazane słowa, minimalizacja danych, stopka).

[Inference] — Parametry SLA/SLO i wartości domyślne oparte na praktykach inżynierskich; nie są gwarancją skuteczności.