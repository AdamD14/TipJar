"use client";
import { useEffect, useMemo, useState } from "react";
import { api } from "@/lib/api";

type OverlayCfg = { pos: "TL" | "TR" | "BL" | "BR"; duration: number; showQr: boolean; theme: "dark" | "light" | "gold" };
type FakeTip = { id: string; from: string; amount: number; note?: string };

export default function OverlayPage() {
  const [cfg, setCfg] = useState<OverlayCfg>({ pos: "TR", duration: 5000, showQr: true, theme: "dark" });
  const [url, setUrl] = useState<string>("");
  const [handle, setHandle] = useState<string>("me");
  const [queue, setQueue] = useState<FakeTip[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const me = await api<any>("/api/v1/users/me");
        setHandle(me.username);
        setCfg(me.overlayConfig || cfg);
        setUrl(`https://tipjar.plus/overlay?creator=${me.username}&theme=${(me.overlayConfig?.theme) || "dark"}`);
      } catch {}
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const save = async () => {
    await api("/api/v1/users/overlay-config", { method: "PUT", body: JSON.stringify(cfg) });
    alert("Saved");
  };

  const addTest = () => setQueue((q) => [...q, { id: crypto.randomUUID(), from: "Tester", amount: (Math.random() * 10 + 1) | 0 }]);

  return (
    <section className="space-y-8">
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <div className="text-sm text-white/70">Overlay URL (OBS Browser Source)</div>
        <div className="mt-2 flex items-center gap-3">
          <div className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm overflow-x-auto">{url}</div>
          <button className="px-3 py-2 rounded-lg border border-white/15 text-sm" onClick={() => navigator.clipboard.writeText(url)}>
            Copy
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3">
          <Select label="Position" value={cfg.pos} options={["TL", "TR", "BL", "BR"]} onChange={(v) => setCfg({ ...cfg, pos: v as any })} />
          <Range label="Duration (ms)" min={2000} max={10000} step={500} value={cfg.duration} onChange={(v) => setCfg({ ...cfg, duration: v })} />
          <Select label="Theme" value={cfg.theme} options={["dark", "light", "gold"]} onChange={(v) => setCfg({ ...cfg, theme: v as any })} />
          <Switch label="Show QR on alert" checked={cfg.showQr} onChange={(c) => setCfg({ ...cfg, showQr: c })} />
          <div className="pt-2">
            <button onClick={save} className="px-4 py-2 rounded-lg bg-[#FFD700] text-[#003737] font-semibold">
              Save
            </button>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Preview</h3>
            <button onClick={addTest} className="px-3 py-2 rounded-lg border border-white/15 text-sm">
              Trigger test tip
            </button>
          </div>
          <OverlayPreview cfg={cfg} queue={queue} onDone={(id) => setQueue((q) => q.filter((x) => x.id !== id))} handle={handle} />
          <div className="text-xs text-white/60 mt-3">W OBS: dodaj „Browser Source”, ustaw URL i wymiary 1920×1080, włącz „Refresh browser when scene becomes active”.</div>
        </div>
      </div>
    </section>
  );
}

function OverlayPreview({ cfg, queue, onDone, handle }: { cfg: any; queue: FakeTip[]; onDone: (id: string) => void; handle: string }) {
  const current = useMemo(() => queue[0], [queue]);
  useEffect(() => {
    if (!current) return;
    const t = setTimeout(() => onDone(current.id), cfg.duration);
    return () => clearTimeout(t);
  }, [current, cfg.duration, onDone]);

  return (
    <div className="relative h-60 bg-black/40 rounded-xl overflow-hidden grid place-items-center">
      {!current ? (
        <div className="text-white/50 text-sm">No alerts…</div>
      ) : (
        <div
          className={`rounded-2xl px-4 py-3 ${cfg.theme === 'gold' ? 'bg-[#FFD700] text-[#003737]' : 'bg-white/10 text-white'} shadow-lg`}
          style={{
            position: 'absolute',
            ...(cfg.pos === 'TR' ? { top: 16, right: 16 } : {}),
            ...(cfg.pos === 'TL' ? { top: 16, left: 16 } : {}),
            ...(cfg.pos === 'BR' ? { bottom: 16, right: 16 } : {}),
            ...(cfg.pos === 'BL' ? { bottom: 16, left: 16 } : {}),
          }}
        >
          <div className="text-sm">@{handle}</div>
          <div className="text-lg font-bold">+{current.amount.toFixed(2)} USDC</div>
          {cfg.showQr && <div className="text-xs opacity-80 mt-1">Scan & tip: tipjar.plus/@{handle}</div>}
        </div>
      )}
    </div>
  );
}

function Select({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <label className="block">
      {label}
      <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full mt-1 bg-transparent border border-white/20 rounded-lg p-2">
        {options.map((o) => (
          <option key={o} value={o} className="bg-[#003737]">
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}
function Range({ label, min, max, step, value, onChange }: { label: string; min: number; max: number; step: number; value: number; onChange: (v: number) => void }) {
  return (
    <div>
      <div className="flex justify-between text-sm">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-full" />
    </div>
  );
}
function Switch({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center justify-between text-sm">
      <span>{label}</span>
      <button onClick={() => onChange(!checked)} className={`w-10 h-6 rounded-full ${checked ? 'bg-emerald-500' : 'bg-white/20'} relative`}>
        <span className={`absolute top-0.5 ${checked ? 'right-0.5' : 'left-0.5'} w-5 h-5 rounded-full bg-white`} />
      </button>
    </label>
  );
}

