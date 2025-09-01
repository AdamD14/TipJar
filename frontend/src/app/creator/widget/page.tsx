"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import QrDownloadPanel from "@/components/QrDownloadPanel";

export default function WidgetPage() {
  const [handle, setHandle] = useState<string>("me");
  const [cfg, setCfg] = useState({
    size: "md",
    shape: "rounded",
    label: "Tip me",
    icon: "usdc",
    mode: "modal",
    color: "#FFD700",
    text: "#003737",
  });

  useEffect(() => {
    (async () => {
      try {
        const me = await api<any>("/api/v1/users/me");
        setHandle(me.username);
        setCfg(me.widgetConfig || cfg);
      } catch {}
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const save = async () => {
    await api("/api/v1/users/widget-config", {
      method: "PUT",
      body: JSON.stringify(cfg),
    });
    alert("Saved");
  };

  const snippet = `<script src="https://tipjar.plus/widget.js" data-creator="@${handle}" data-mode="${cfg.mode}" data-size="${cfg.size}" data-shape="${cfg.shape}" data-label="${cfg.label}" data-color="${cfg.color}" data-text="${cfg.text}"></script>`;

  return (
    <section className="space-y-8">
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <div className="text-sm text-white/70">Your link</div>
        <div className="flex items-center gap-3 mt-1">
          <div className="px-3 py-2 rounded-lg bg-white/5 border border-white/10">tipjar.plus/@{handle}</div>
          <button
            className="px-3 py-2 rounded-lg border border-white/15 text-sm"
            onClick={() => navigator.clipboard.writeText(`https://tipjar.plus/@${handle}`)}
          >
            Copy
          </button>
        </div>
      </div>

      {/* QR – możesz podmienić na własny generator, patrz QrDownloadPanel */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">QR</h3>
          <div className="text-sm text-white/60">Download PNG / PDF</div>
        </div>
        <div className="mt-4">
          <QrDownloadPanel url={`https://tipjar.plus/@${handle}`} />
        </div>
      </div>

      {/* Config + snippet */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <Select label="Size" value={cfg.size} onChange={(v) => setCfg({ ...cfg, size: v })} options={["sm", "md", "lg"]} />
          <Select label="Shape" value={cfg.shape} onChange={(v) => setCfg({ ...cfg, shape: v })} options={["pill", "rounded", "square"]} />
          <Select label="Mode" value={cfg.mode} onChange={(v) => setCfg({ ...cfg, mode: v })} options={["modal", "redirect"]} />
          <Text label="Label" value={cfg.label} onChange={(v) => setCfg({ ...cfg, label: v })} />
          <Text label="Icon" value={cfg.icon} onChange={(v) => setCfg({ ...cfg, icon: v })} />
          <Text label="Color" value={cfg.color} onChange={(v) => setCfg({ ...cfg, color: v })} />
          <Text label="Text color" value={cfg.text} onChange={(v) => setCfg({ ...cfg, text: v })} />
          <button onClick={save} className="mt-2 px-4 py-2 rounded-lg bg-[#FFD700] text-[#003737] font-semibold">
            Save
          </button>
        </div>
        <div>
          <div className="text-sm text-white/70 mb-2">Embed snippet</div>
          <pre className="bg-black/40 p-3 rounded-lg text-xs overflow-auto">{snippet}</pre>
          <button
            className="mt-2 px-3 py-2 rounded-lg border border-white/15 text-sm"
            onClick={() => navigator.clipboard.writeText(snippet)}
          >
            Copy
          </button>
        </div>
      </div>
    </section>
  );
}

function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
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
function Text({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      {label}
      <input value={value} onChange={(e) => onChange(e.target.value)} className="w-full mt-1 bg-transparent border border-white/20 rounded-lg p-2" />
    </label>
  );
}
