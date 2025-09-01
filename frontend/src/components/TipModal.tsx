'use client';
import { useEffect, useMemo, useState } from 'react';

export default function TipModal({ username, open, onClose }:{
  username: string;
  open: boolean;
  onClose: ()=>void;
}) {
  const [amount, setAmount] = useState(500); // cents
  const [note, setNote] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(()=>{ if (open){ setAmount(500); setNote(''); setBusy(false); } },[open]);

  const presets = useMemo(()=>[100, 200, 500, 1000, 2000],[]);
  const go = async ()=>{
    try {
      setBusy(true);
      const res = await fetch('/api/pay/create', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ creator: username, amountCents: amount, note }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || 'Error');
      window.location.href = data.checkoutUrl;
    } catch (e:any) {
      alert(e.message || 'Payment init failed');
      setBusy(false);
    }
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/60 grid place-items-center p-4">
      <div className="w-full max-w-md bg-slate-900 border border-white/10 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Tip @{username}</h3>
          <button onClick={onClose} className="text-white/70 hover:text-white">✕</button>
        </div>

        {/* Presety */}
        <div className="mt-4 flex gap-2 flex-wrap">
          {presets.map(cents=>(
            <button key={cents}
              onClick={()=>setAmount(cents)}
              className={`px-3 py-1.5 rounded-lg text-sm border ${amount===cents ? 'bg-[#FFD700] text-[#003737] border-[#FFD700]' : 'border-white/15 bg-white/5'}`}
            >
              ${(cents/100).toFixed(2)}
            </button>
          ))}
        </div>

        {/* Slider */}
        <div className="mt-4">
          <div className="flex justify-between text-sm">
            <div>Custom amount</div>
            <div className="font-semibold">${(amount/100).toFixed(2)} USDC</div>
          </div>
          <input type="range" min={50} max={20000} step={50}
            value={amount}
            onChange={e=>setAmount(Number(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Notatka */}
        <label className="block mt-4 text-sm">Note (optional)</label>
        <textarea maxLength={140}
          value={note}
          onChange={e=>setNote(e.target.value)}
          className="w-full mt-1 bg-transparent border border-white/20 rounded-lg p-2 text-sm"
          placeholder="Say thanks! (max 140 chars)"
        />

        {/* Metody – copy only */}
        <div className="mt-4 text-xs text-white/60">
          Pay with card, Apple/Google Pay, Revolut, or crypto wallet (via Circle).
        </div>

        <div className="mt-5 flex gap-2 justify-end">
          <button onClick={onClose} className="px-4 py-2 rounded-lg border border-white/15">Cancel</button>
          <button onClick={go} disabled={busy} className="px-4 py-2 rounded-lg bg-[#FFD700] text-[#003737] font-semibold disabled:opacity-60">
            {busy ? 'Redirecting…' : 'Continue to Checkout'}
          </button>
        </div>
      </div>
    </div>
  );
}

