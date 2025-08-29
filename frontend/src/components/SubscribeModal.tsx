'use client';
import { useEffect, useState } from 'react';

export type TierPub = { id:string; name:string; price:number; perks:string[]; active:boolean };

export default function SubscribeModal({
  username, open, onClose, tiers,
}:{ username:string; open:boolean; onClose:()=>void; tiers:TierPub[] }) {
  const [tierId, setTierId] = useState<string>('');
  const [busy, setBusy] = useState(false);

  useEffect(()=>{ if (open){ setBusy(false); setTierId(tiers?.[0]?.id || ''); } }, [open, tiers]);

  const go = async ()=>{
    try {
      setBusy(true);
      const res = await fetch('/api/subscriptions/checkout', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ creator: username, tierId })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || 'Error');
      window.location.href = data.checkoutUrl;
    } catch (e:any) {
      alert(e.message || 'Checkout init failed');
      setBusy(false);
    }
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/60 grid place-items-center p-4">
      <div className="w-full max-w-lg bg-slate-900 border border-white/10 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Subscribe @{username}</h3>
          <button onClick={onClose} className="text-white/70 hover:text-white">✕</button>
        </div>

        <div className="grid sm:grid-cols-2 gap-3 mt-4">
          {tiers.map(t=>(
            <button key={t.id}
              onClick={()=>setTierId(t.id)}
              className={`text-left rounded-xl border p-4 ${tierId===t.id?'border-[#FFD700] bg-[#FFD700]/10':'border-white/15 bg-white/5'}`}>
              <div className="font-semibold">{t.name}</div>
              <div className="text-xl font-bold mt-1">{(t.price/100).toFixed(2)} <span className="text-sm">USDC/mo</span></div>
              <ul className="mt-2 text-sm text-white/85 space-y-1">
                {t.perks.slice(0,4).map((p,i)=><li key={i}>• {p}</li>)}
              </ul>
            </button>
          ))}
        </div>

        <div className="mt-5 text-xs text-white/60">
          Billed monthly in USDC via Circle. Cancel anytime in your account.
        </div>

        <div className="mt-5 flex gap-2 justify-end">
          <button onClick={onClose} className="px-4 py-2 rounded-lg border border-white/15">Cancel</button>
          <button onClick={go} disabled={!tierId || busy} className="px-4 py-2 rounded-lg bg-[#FFD700] text-[#003737] font-semibold disabled:opacity-60">
            {busy ? 'Redirecting…' : 'Continue to Checkout'}
          </button>
        </div>
      </div>
    </div>
  );
}

