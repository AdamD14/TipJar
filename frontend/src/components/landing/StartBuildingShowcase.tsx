// components/landing/StartBuildingShowcase.tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';
import QRCode from 'react-qr-code';

type Props = {
  handle: string;     // np. "janedoe"
  creatorId: string;  // id twórcy do overlay
};

export default function StartBuildingShowcase({ handle, creatorId }: Props) {
  const profileUrl = `/${handle?.startsWith('@') ? handle : `@${handle || 'demo'}`}`;

  return (
    <section id="start" aria-labelledby="startHeading" className="py-12 md:py-16">
<div className="mx-auto max-w-[1480px] px-4 text-muted">
  <h2 id="startHeading" className="mb-2 text-2xl md:text-3xl font-semibold">
    Start building / AI Studio
  </h2>
  <p className="mb-6 text-[14px] leading-[1.5] text-muted-foreground">
          Live preview: QR poster, overlay feed, tip widget i modal, presety.
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* QR Poster (A4) — live QR */}
          <Card title="QR Poster (A4)" hint={profileUrl}>
            <div className="aspect-[210/297] w-full overflow-hidden rounded-[12px] border border-white/10 bg-gradient-to-br from-teal-900 to-teal-950 p-4">
              <div className="flex h-full w-full flex-col rounded-[10px] border border-white/10 p-3">
                <div className="mb-2 h-6 w-3/5 rounded bg-white/20" />
                <div className="mb-4 h-3 w-4/5 rounded bg-white/10" />
                <div className="mt-auto self-center rounded bg-white p-2">
                  <QRCode value={profileUrl} size={112} />
                </div>
                <div className="mt-2 text-center text-[11px] text-muted-foreground">{profileUrl}</div>
              </div>
            </div>
          </Card>

          {/* Live Overlay — iframe */}
          <Card title="Live Overlay" hint="test feed + QR">
            <div className="relative aspect-video w-full overflow-hidden rounded-[12px] border border-white/10 bg-teal-950">
              <iframe
                title="Overlay Preview"
                src={`/overlay?creatorId=${encodeURIComponent(creatorId)}&test=true&qr=true`}
                className="absolute inset-0 h-full w-full rounded-[12px] border-0"
                allow="clipboard-read; clipboard-write"
              />
            </div>
          </Card>

          {/* Tip Widget — live preview (z modalem w środku karty) */}
          <Card title="Tip Widget" hint="CTA + mini copy">
            <TipWidgetPreview />
          </Card>

          {/* Tip Modal — live demo przyciskiem */}
          <Card title="Tip Modal" hint="szybka wpłata z wiadomością">
            <TipModalDemo />
          </Card>

          {/* Presets — placeholder */}
          <Card title="Presets" hint="Minimal, Streamer Gold, Clean">
            <div className="grid grid-cols-3 gap-2">
<PresetTile label="Minimal" className="from-teal-950 to-teal-900" />
        <PresetTile label="Gold" className="from-gold-900 to-gold-800 ring-1 ring-gold-400/40" />
        <PresetTile label="Clean" className="from-teal-950 to-teal-950" />
            </div>
          </Card>

          {/* AI Studio — placeholder */}
          <Card title="AI Studio" hint="A4 copy + layout">
<div className="flex h-[180px] items-center justify-center rounded-[12px] border border-white/10 bg-gradient-to-br from-teal-950 to-teal-900">
  <div className="rounded-[12px] border border-white/10 bg-black/30 p-3 text-center text-xs text-muted-foreground">
                “Generate witty headline and poster for {profileUrl}”
              </div>
            </div>
          </Card>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <Link
            href="#start"
            className="rounded-[12px] bg-gold-400 px-4 py-2 text-sm font-semibold text-teal-900 transition hover:-translate-y-[1px]"
          >
            Open AI Studio
          </Link>
          <Link
            href="#"
            className="rounded-[12px] border border-gold-400 px-4 py-2 text-sm font-medium text-gold-400 transition hover:-translate-y-[1px]"
          >
            Read docs
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ================= components (local) ================= */

function Card(props: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <article className="rounded-[16px] border border-white/10 bg-card p-4 md:p-6">
      <div className="mb-3">
        <h3 className="text-base font-semibold leading-[1.5]">{props.title}</h3>
        {props.hint ? <p className="text-[12px] text-muted-foreground">{props.hint}</p> : null}
      </div>
      {props.children}
    </article>
  );
}

function PresetTile({ label, className }: { label: string; className: string }) {
  return (
    <div
      className={`aspect-[4/3] w-full rounded-[10px] bg-gradient-to-br ${className} flex items-end p-2`}
      aria-label={label}
    >
      <span className="rounded-[8px] border border-white/10 bg-black/30 px-2 py-0.5 text-[10px] text-muted">
        {label}
      </span>
    </div>
  );
}

/* Tip Widget live preview: przycisk otwiera lokalny modal w obszarze karty */
function TipWidgetPreview() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative h-[180px] overflow-hidden rounded-[12px] border border-white/10 bg-gradient-to-tr from-teal-900 to-teal-950 p-4">
      <div className="flex h-full w-full flex-col justify-end">
        <div className="rounded-[12px] border border-white/15 bg-white/5 p-3">
          <div className="mb-2 h-3 w-2/3 rounded bg-white/15" />
          <div className="flex items-center justify-between">
            <div className="h-3 w-1/3 rounded bg-white/10" />
            <button
              onClick={() => setOpen(true)}
              className="rounded-[10px] bg-gold-400 px-3 py-1.5 text-xs font-semibold text-teal-900 hover:-translate-y-[1px] transition"
            >
              Tip now
            </button>
          </div>
        </div>
      </div>

      {/* Lokalny modal w obrębie karty */}
      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          className="absolute inset-0 z-10 flex items-center justify-center bg-black/60 p-3"
        >
          <div className="w-full max-w-[360px] rounded-[12px] border border-white/10 bg-card p-4">
            <div className="mb-2 h-5 w-1/3 rounded bg-white/20" />
            <div className="mb-3 h-3 w-3/4 rounded bg-white/10" />
            <input
              placeholder="Amount (USDC)"
              className="mb-2 w-full rounded-[10px] border border-white/10 bg-black/20 px-3 py-2 text-sm"
            />
            <textarea
              placeholder="Message (optional)"
              className="mb-3 w-full rounded-[10px] border border-white/10 bg-black/20 px-3 py-2 text-sm"
              rows={3}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setOpen(false)}
                className="rounded-[10px] border border-white/10 px-3 py-1.5 text-xs hover:bg-white/5"
              >
                Cancel
              </button>
              <button
                onClick={() => setOpen(false)}
                className="rounded-[10px] bg-gold-400 px-3 py-1.5 text-xs font-semibold text-teal-900"
              >
                Send tip
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

/* Tip Modal demo: przycisk otwiera modal, ten sam wzór co wyżej */
function TipModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative h-[180px] overflow-hidden rounded-[12px] border border-white/10 bg-teal-950 p-4">
      <div className="flex h-full items-center justify-center">
        <button
          onClick={() => setOpen(true)}
          className="rounded-[12px] border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10"
        >
          Open demo
        </button>
      </div>

      {open ? (
        <div role="dialog" aria-modal="true" className="absolute inset-0 z-10 flex items-center justify-center bg-black/60 p-3">
          <div className="w-full max-w-[360px] rounded-[12px] border border-white/10 bg-card p-4">
            <div className="mb-2 h-5 w-1/3 rounded bg-white/20" />
            <div className="mb-3 h-3 w-3/4 rounded bg-white/10" />
            <input
              placeholder="Amount (USDC)"
              className="mb-2 w-full rounded-[10px] border border-white/10 bg-black/20 px-3 py-2 text-sm"
            />
            <textarea
              placeholder="Message (optional)"
              className="mb-3 w-full rounded-[10px] border border-white/10 bg-black/20 px-3 py-2 text-sm"
              rows={3}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setOpen(false)}
                className="rounded-[10px] border border-white/10 px-3 py-1.5 text-xs hover:bg-white/5"
              >
                Cancel
              </button>
              <button
                onClick={() => setOpen(false)}
                className="rounded-[10px] bg-gold-400 px-3 py-1.5 text-xs font-semibold text-teal-900"
              >
                Send tip
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
