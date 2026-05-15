"use client";
import { useEffect, useState } from "react";
import { createWallet, getBalance } from "@/lib/wallet";

export default function WalletConnect() {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);
  const [bal, setBal] = useState<number | null>(null);

  useEffect(() => {
    let alive = true;
    getBalance()
      .then((b: any) => {
        if (alive) setBal(Number(b?.usdc ?? b?.balance ?? 0));
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  async function onCreate() {
    setBusy(true);
    setErr(null);
    setOk(null);
    try {
      const w = await createWallet();
      setOk(`Wallet created: ${w?.id || w?.walletId || "OK"}`);
      try {
        const b = await getBalance();
        setBal(Number(b?.usdc ?? b?.balance ?? 0));
      } catch {}
    } catch (e: any) {
      setErr(e?.message || "Create failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <h3 className="text-sm text-muted">Hosted wallet (Circle DCW)</h3>
      <p className="mt-1 text-sm text-white/90">
        Create a custodial wallet to receive tips in USDC.
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <button
          onClick={onCreate}
          disabled={busy}
          className="rounded-xl bg-gold-400 px-4 py-3 font-semibold text-teal-900 disabled:opacity-60"
        >
          {busy ? "Processing…" : "Create wallet"}
        </button>
        <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/90">
          Balance: {bal === null ? "—" : `$ ${bal.toFixed(2)}`}
        </div>
      </div>
      {ok && <p className="mt-2 text-sm text-emerald-400">{ok}</p>}
      {err && <p className="mt-2 text-sm text-red-400">{err}</p>}
      <p className="mt-2 text-xs text-muted">
        Self-custody przyjdzie później; ten moduł obsługuje DCW.
      </p>
    </div>
  );
}

