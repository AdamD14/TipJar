"use client";

import React, { useEffect, useState } from "react";
import Card from "@/components/ui/forms/Card";
import Spinner from "@/components/ui/Spinner";
import { getTransactions } from "@/lib/wallet";
import { ArrowDownLeft, ArrowUpRight, Search, Filter, AlertCircle } from "lucide-react";

interface TxRow {
  id: string;
  type: string;
  status: string;
  amount?: string;
  currency?: string;
  source?: string | null;
  destination?: string | null;
  chain?: string;
  createdAt?: string;
}

export default function TransactionsPage() {
  const [txs, setTxs] = useState<TxRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError(null);
        const data = await getTransactions();
        setTxs(data || []);
      } catch (err: any) {
        console.error("Failed to load transactions:", err);
        setError("Could not retrieve transaction history.");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center space-y-4">
        <Spinner size="lg" className="text-teal-400" />
        <p className="text-sm font-body text-text-ds-tertiary animate-pulse">
          Retrieving transactions log...
        </p>
      </div>
    );
  }

  const filteredTxs = txs.filter((tx) => {
    const term = search.toLowerCase();
    return (
      tx.type?.toLowerCase().includes(term) ||
      tx.source?.toLowerCase().includes(term) ||
      tx.destination?.toLowerCase().includes(term) ||
      tx.status?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 text-white space-y-8 animate-fade-in">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-text-ds-primary">Transaction History</h1>
          <p className="text-sm text-text-ds-tertiary font-body mt-1">
            Detailed log of all incoming tips, subscriptions, and outgoing payouts.
          </p>
        </div>

        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-semibold">
            <Filter size={14} /> Filter
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-4 rounded-xl text-sm">
          {error}
        </div>
      )}

      <Card className="space-y-4">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-ds-tertiary pointer-events-none" />
          <input 
            type="text" 
            placeholder="Search transactions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {filteredTxs.length === 0 ? (
          <div className="text-center py-12 text-text-ds-tertiary font-body text-sm space-y-2">
            <AlertCircle className="mx-auto text-text-ds-tertiary/40" size={32} />
            <p>No transactions found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTxs.map((tx) => {
              const amountVal = parseFloat(tx.amount || "0");
              const isIncoming = amountVal >= 0;
              const senderLabel = isIncoming
                ? tx.source || "Incoming Deposit"
                : tx.destination || "Outgoing Withdrawal";
              const formattedDate = tx.createdAt ? new Date(tx.createdAt).toLocaleString() : "Recently";

              return (
                <div key={tx.id} className="flex items-center justify-between border-b border-white/[0.05] pb-3 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-lg border ${
                      isIncoming ? "border-green-500/20 bg-green-500/10 text-green-400" : "border-red-500/20 bg-red-500/10 text-red-400"
                    }`}>
                      {isIncoming ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-text-ds-primary block">{senderLabel}</span>
                      <span className="text-xs text-text-ds-tertiary font-body uppercase">{tx.type} • {formattedDate}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className={`text-sm font-semibold block tnum ${isIncoming ? "text-green-400" : "text-red-400"}`}>
                      {isIncoming ? "+" : ""}{amountVal.toFixed(2)} {tx.currency || "USDC"}
                    </span>
                    <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] uppercase font-bold ${
                      tx.status === "COMPLETE" || tx.status === "success" 
                        ? "bg-green-500/15 text-green-400 border border-green-500/10" 
                        : "bg-yellow-500/15 text-yellow-400 border border-yellow-500/10"
                    }`}>
                      {tx.status?.toLowerCase()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
}
