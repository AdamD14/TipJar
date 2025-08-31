"use client";

import { useEffect, useState } from "react";
import AppHeader from "@/components/app/AppHeader";
import Section from "@/components/app/Section";
import WalletSummary from "@/components/wallet/WalletSummary";
import TransactionList, { TxItem } from "@/components/wallet/TransactionList";
import apiClient from "@/lib/apiClient";
import { API } from "@/lib/api-routes";

export default function Page() {
  const [balance, setBalance] = useState<{ balance: number; currency: string } | null>(null);
  const [txs, setTxs] = useState<TxItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const b = await apiClient.get<{ balance: number; currency: string }>(API.FAN.BALANCE);
        setBalance(b.data);
      } catch (e) {
        setError((e as Error).message);
      }
      try {
        const res = await apiClient.get<any[]>(API.FAN.TIPS_HISTORY);
        const mapped: TxItem[] = (res.data || []).map((t) => ({
          id: t.id,
          type: "tip_out",
          amount: parseFloat(t.amount),
          time: new Date(t.createdAt).toLocaleString(),
          note: t.message ? String(t.message) : undefined,
        }));
        setTxs(mapped);
      } catch (e) {
        // tips history optional
      }
    })();
  }, []);

  return (
    <main className="min-h-screen bg-[#001F1F] pb-20">
      <AppHeader />
      <Section title="Wallet">
        <div className="space-y-6">
          {error && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">{error}</div>
          )}
          <WalletSummary />
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-[#DDE0DA]">
            <div className="text-sm text-[#BCC1B6]">USDC Balance</div>
            <div className="mt-2 text-2xl font-semibold text-white">
              {balance ? `$${balance.balance.toFixed(2)} ${balance.currency}` : "Loading..."}
            </div>
          </div>
          <TransactionList items={txs} />
        </div>
      </Section>
    </main>
  );
}
