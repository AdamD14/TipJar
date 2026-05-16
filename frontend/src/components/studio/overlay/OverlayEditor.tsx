"use client";

import React, { useEffect, useMemo, useState } from 'react';
import { useOverlaySettingsStore } from '@/lib/store/overlaySettingsStore';
import {
  OverlayPosition,
  OverlayEntryAnimation,
  OverlaySpecialEffectType,
  OverlayColorPreset,
} from '@/lib/types/overlay';
import Button from '@/components/ui/buttons/Button';

const POS: OverlayPosition[] = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
const ANIM: OverlayEntryAnimation[] = ['slide-up', 'slide-in-left', 'fade-in', 'typewriter'];
const FX: OverlaySpecialEffectType[] = ['sparkle', 'confetti', 'glow', 'none'];
const PRESET_BG: Record<OverlayColorPreset, string> = {
  darkTurquoise: '#07393a',
  black: '#000000',
  transparent: 'rgba(0,0,0,0)',
};

interface FieldProps {
  label: string;
  children: React.ReactNode;
}

const Field: React.FC<React.PropsWithChildren<FieldProps>> = ({ label, children }) => {
  return (
    <label className="block">
      <div className="mb-2 text-sm text-text-ds-tertiary font-heading font-medium">{label}</div>
      {children}
    </label>
  );
};

interface OverlayBoxProps {
  className?: string;
  style?: React.CSSProperties;
  entryAnimation: OverlayEntryAnimation;
  durationSec: number;
  data: { name: string; amount: number; currency: string; msg: string };
}

const OverlayBox: React.FC<OverlayBoxProps> = ({ className, style, entryAnimation, durationSec, data }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(true);
    const t = window.setTimeout(() => setVisible(false), durationSec * 1000);
    return () => window.clearTimeout(t);
  }, [durationSec, data]);

  if (!visible) return null;

  return (
    <div className={`${className} ${entryAnimation === 'typewriter' ? 'oi-typewriter' : `oi-${entryAnimation}`}`} style={{ ...style, borderRadius: 14, padding: '12px 14px', border: '1px solid rgba(255,255,255,0.1)' }}>
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 shrink-0 rounded-full bg-gradient-to-br from-gold-400 to-gold-900" />
        <div className="min-w-[200px]">
          <div className="text-sm font-bold font-heading leading-tight">{data.name} tipped {data.amount} {data.currency}</div>
          <div className="mt-0.5 text-sm tw-text italic font-body">{data.msg}</div>
        </div>
      </div>
    </div>
  );
};

export default function OverlayEditor({ creatorId }: { creatorId: string }) {
  const { settings, set, load, save, reset, pending, error } = useOverlaySettingsStore();
  const [previewKey, setPreviewKey] = useState(0);
  const [nowFx, setNowFx] = useState<OverlaySpecialEffectType>('none');

  useEffect(() => {
    void load(creatorId);
  }, [creatorId, load]);

  const bg = useMemo(() => {
    if (['darkTurquoise', 'black', 'transparent'].includes(settings.bgColor)) {
      return PRESET_BG[settings.bgColor as OverlayColorPreset];
    }
    return settings.bgColor;
  }, [settings.bgColor]);

  const textColor = useMemo(() => {
    if (settings.textColor === 'white') return '#ffffff';
    if (settings.textColor === 'gold') return '#FFD700';
    if (settings.textColor === 'turquoise') return '#6FE7E7';
    return settings.textColor;
  }, [settings.textColor]);

  const posClass = useMemo(() => {
    const base = 'absolute m-4';
    switch (settings.position) {
      case 'top-left': return `${base} left-0 top-0`;
      case 'top-right': return `${base} right-0 top-0`;
      case 'bottom-left': return `${base} left-0 bottom-0`;
      case 'bottom-right': return `${base} right-0 bottom-0`;
      default: return `${base} right-0 top-0`;
    }
  }, [settings.position]);

  const triggerPreview = () => {
    setPreviewKey((k) => k + 1);
    setNowFx(settings.specialEffectType);
    window.setTimeout(() => setNowFx('none'), 1500);
  };

  const demoTip = { name: 'alice.eth', amount: 12.34, currency: 'USDC', msg: 'Love your stream! \u2615' };

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      {/* LIVE PREVIEW */}
      <div className="rounded-[16px] border border-white/10 bg-black/40 p-4">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-semibold font-heading text-text-ds-primary">Live Preview</h3>
          <div className="flex gap-2">
            <Button variant="gold" size="sm" onClick={triggerPreview}>
              Trigger test tip
            </Button>
            <Button variant="ghost" size="sm" onClick={() => reset()}>
              Reset
            </Button>
          </div>
        </div>

        <div className="relative h-[400px] w-full overflow-hidden rounded-[12px] bg-black/40 border border-white/5">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,215,0,0.04),transparent_40%),radial-gradient(ellipse_at_70%_80%,rgba(0,255,255,0.04),transparent_40%)]" />

          <OverlayBox
            key={previewKey}
            className={posClass}
            style={{ opacity: settings.opacity, background: bg, color: textColor, fontFamily: settings.fontFamily }}
            entryAnimation={settings.entryAnimation}
            durationSec={settings.durationSec}
            data={demoTip}
          />

          {nowFx === 'confetti' && <div className="absolute inset-0 flex items-center justify-center text-6xl animate-bounce">{'\uD83C\uDF89'}</div>}
          {nowFx === 'sparkle' && <div className="absolute inset-0 flex items-center justify-center text-6xl animate-ping">{'\u2728'}</div>}
        </div>
        <div className="mt-3 text-[11px] text-text-ds-tertiary italic font-body">
          Position reflects selected corner. Preview restarts on trigger.
        </div>
      </div>

      {/* CONTROLS */}
      <form
        className="rounded-[16px] border border-white/10 bg-black/20 p-6 space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          void save(creatorId);
        }}
      >
        <Field label="Position">
          <select
            value={settings.position}
            onChange={(e) => set({ position: e.target.value as OverlayPosition })}
            className="w-full rounded-[10px] border border-white/10 bg-teal-950 text-text-ds-tertiary px-4 py-2 text-sm font-body focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface-app"
          >
            {POS.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </Field>

        <Field label={`Opacity: ${settings.opacity.toFixed(2)}`}>
          <input
            type="range" min={0.3} max={1} step={0.01}
            value={settings.opacity}
            onChange={(e) => set({ opacity: Number(e.target.value) })}
            className="w-full h-1.5 bg-white/5 rounded-full appearance-none cursor-pointer accent-gold-400"
          />
        </Field>

        <Field label="Background Color">
          <div className="grid grid-cols-2 gap-3">
            <select
              value={['darkTurquoise', 'black', 'transparent'].includes(settings.bgColor) ? settings.bgColor : 'custom'}
              onChange={(e) => {
                const v = e.target.value;
                set({ bgColor: v === 'custom' ? '#07393a' : v });
              }}
              className="rounded-[10px] border border-white/10 bg-teal-950 text-text-ds-tertiary px-4 py-2 text-sm font-body focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface-app"
            >
              <option value="darkTurquoise">darkTurquoise</option>
              <option value="black">black</option>
              <option value="transparent">transparent</option>
              <option value="custom">custom HEX</option>
            </select>
            <input
              type="color"
              value={bg.startsWith('#') ? bg : '#07393a'}
              onChange={(e) => set({ bgColor: e.target.value })}
              className="h-10 w-full cursor-pointer rounded-[10px] border border-white/10 bg-transparent p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface-app"
            />
          </div>
        </Field>

        <Field label="Entry Animation">
          <select
            value={settings.entryAnimation}
            onChange={(e) => set({ entryAnimation: e.target.value as OverlayEntryAnimation })}
            className="w-full rounded-[10px] border border-white/10 bg-teal-950 text-text-ds-tertiary px-4 py-2 text-sm font-body focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface-app"
          >
            {ANIM.map((a) => <option key={a} value={a}>{a}</option>)}
          </select>
        </Field>

        <div className="pt-4">
          <Button
            type="submit"
            variant="solid"
            fullWidth
            disabled={pending}
          >
            {pending ? 'Saving settings...' : 'Save All Changes'}
          </Button>
          {error && <p className="mt-2 text-xs text-error-base text-center font-body">{error}</p>}
        </div>
      </form>

      <style>{`
.oi-slide-up { animation: oislideup 0.4s ease-out both; }
.oi-fade-in { animation: oifade 0.4s ease-out both; }
.oi-typewriter .tw-text { overflow: hidden; white-space: nowrap; border-right: 2px solid #FFD700; animation: oitw 1s steps(20) both, oicaret 0.75s step-end infinite; }

@keyframes oislideup { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
@keyframes oifade { from { opacity: 0; } to { opacity: 1; } }
@keyframes oitw { from { width: 0; } to { width: 100%; } }
@keyframes oicaret { 50% { border-color: transparent; } }
`}</style>
    </div>
  );
}
