"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Card from "@/components/ui/forms/Card";
import Spinner from "@/components/ui/Spinner";
import { getWallet, getBalance, createWallet } from "@/lib/wallet";
import {
  Coins,
  History,
  Link2,
  ArrowDownLeft,
  Settings,
  Copy,
  Check,
  ShieldCheck,
  Sparkles,
  ChevronRight,
  AlertCircle
} from "lucide-react";

interface WalletInfo {
  walletId: string;
  address: string;
  chain: string;
}

interface BalanceInfo {
  balance: number;
  currency: string;
}

export default function FanWalletPage() {
  const { username } = useParams<{ username: string }>();
  const [wallet, setWallet] = useState<WalletInfo | null>(null);
  const [balance, setBalance] = useState<BalanceInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        let walletData;
        try {
          walletData = await getWallet();
        } catch (err: any) {
          if (err.response?.status === 404 || err.message?.includes("not found")) {
            // Auto-provision wallet immediately
            setCreating(true);
            walletData = await createWallet();
          } else {
            throw err;
          }
        }
        setWallet(walletData);
        
        try {
          const balanceData = await getBalance();
          setBalance(balanceData);
        } catch (bErr) {
          console.error("Failed to load balance:", bErr);
          setBalance({ balance: 0, currency: "USDC" });
        }
      } catch (err: any) {
        console.error("Error loading wallet details:", err);
        setError("Failed to initialize or fetch your secure wallet. Please try again later.");
      } finally {
        setLoading(false);
        setCreating(false);
      }
    }

    fetchData();
  }, []);

  const handleCopy = () => {
    if (!wallet?.address) return;
    navigator.clipboard.writeText(wallet.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Tailored options for fans
  const fanOptions = [
    {
      href: "deposit", // This can route to creator-desktop's or a dedicated deposit page if desired, or we keep it clean
      title: "Deposit Funds",
      desc: "Top up your USDC balance with a credit card or direct transfer",
      icon: ArrowDownLeft,
      color: "text-teal-400"
    },
    {
      href: "transactions",
      title: "Tip & Subscription History",
      desc: "Review your completed tips, subscriptions, and supportive payments",
      icon: History,
      color: "text-blue-400"
    },
    {
      href: "connected-wallets",
      title: "Connected Web3 Wallets",
      desc: "Connect MetaMask, Coinbase, or Phantom to transfer assets directly",
      icon: Link2,
      color: "text-indigo-400"
    },
    {
      href: "settings",
      title: "Security & Settings",
      desc: "Manage spending limits and general wallet credentials",
      icon: Settings,
      color: "text-slate-400"
    }
  ];

  if (loading || creating) {
    return (
      <div className="flex h-[70vh] flex-col items-center justify-center space-y-4">
        <Spinner size="lg" className="text-teal-400" />
        <p className="text-sm font-body text-text-ds-tertiary animate-pulse">
          {creating ? "Provisioning your secure Circle wallet..." : "Retrieving secure wallet..."}
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 text-white space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-gold-400 text-xs font-semibold tracking-wider uppercase mb-1">
            <Sparkles size={14} className="animate-spin-slow" />
            <span>Secure Web3 Account</span>
          </div>
          <h1 className="text-4xl font-heading font-extrabold text-text-ds-primary tracking-tight">
            My Wallet
          </h1>
          <p className="text-sm text-text-ds-tertiary font-body mt-1">
            Keep track of your USDC balance, make secure deposits, and inspect supporting history.
          </p>
        </div>

        {wallet && (
          <div className="flex items-center gap-2 text-xs bg-teal-500/10 border border-teal-500/20 text-teal-400 px-3 py-1.5 rounded-full self-start font-semibold">
            <ShieldCheck size={14} />
            <span>Circle Secured</span>
          </div>
        )}
      </div>

      {error && (
        <div className="flex items-start gap-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 p-4 rounded-xl">
          <AlertCircle className="shrink-0 mt-0.5" size={18} />
          <p className="text-sm font-body">{error}</p>
        </div>
      )}

      {/* Main Wallet Panel */}
      {!wallet ? (
        <Card className="max-w-xl mx-auto text-center py-12 px-6 space-y-6 border-white/[0.05]">
          <div className="mx-auto bg-rose-500/10 p-4 rounded-full w-16 h-16 flex items-center justify-center text-rose-400 border border-rose-500/20 animate-pulse">
            <AlertCircle size={32} />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-heading font-extrabold text-text-ds-primary">
              Initialization Failed
            </h2>
            <p className="text-sm text-text-ds-tertiary font-body leading-relaxed">
              We encountered an issue retrieving or creating your secure onchain account. Every account must have an active Circle wallet. Please refresh the page to retry.
            </p>
          </div>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          {/* Fan Balance view */}
          <Card className="md:col-span-2 relative overflow-hidden bg-gradient-to-br from-teal-950/40 to-teal-900/10 border-teal-500/20 shadow-xl flex flex-col justify-between min-h-[180px]">
            <div className="absolute right-4 top-4 opacity-5 pointer-events-none">
              <Coins size={120} className="text-gold-400" />
            </div>
            <div>
              <span className="text-xs text-text-ds-tertiary uppercase font-heading tracking-wider">
                Available USDC Balance
              </span>
              <h2 className="text-4xl md:text-5xl font-heading font-black text-gold-400 mt-2 tracking-tight tnum flex items-baseline gap-2">
                {balance?.balance !== undefined ? balance.balance.toFixed(2) : "0.00"}{" "}
                <span className="text-lg font-bold text-white">USDC</span>
              </h2>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-white/[0.05]">
              <div className="space-y-1">
                <span className="text-[10px] text-text-ds-tertiary uppercase tracking-wider font-heading">
                  Deposit / Wallet Address ({wallet.chain})
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-text-ds-secondary truncate max-w-[200px] sm:max-w-xs">
                    {wallet.address}
                  </span>
                  <button
                    onClick={handleCopy}
                    className="text-text-ds-tertiary hover:text-text-ds-primary p-1 hover:bg-white/5 rounded transition-all duration-200"
                    title="Copy address"
                  >
                    {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </button>
                </div>
              </div>
              <div>
                {/* Routing deposit to creator-desktop's wallet sub-view or keeping it simple */}
                <Link
                  href={`/@${username}/creator-desktop/wallet/deposit`}
                  className="bg-gold-400 hover:bg-gold-500 text-black px-4 py-2 rounded-lg text-xs font-bold tracking-wide transition-all block text-center shadow-md shadow-gold-400/10"
                >
                  Deposit Funds
                </Link>
              </div>
            </div>
          </Card>

          {/* Quick network details */}
          <Card className="flex flex-col justify-between border-white/[0.05]">
            <div className="space-y-3">
              <h3 className="text-sm font-heading font-semibold text-text-ds-primary uppercase tracking-wider">
                Wallet Details
              </h3>
              <div className="space-y-2 text-xs font-body">
                <div className="flex justify-between border-b border-white/[0.05] pb-2">
                  <span className="text-text-ds-tertiary">Network</span>
                  <span className="text-text-ds-secondary font-semibold">{wallet.chain}</span>
                </div>
                <div className="flex justify-between border-b border-white/[0.05] pb-2">
                  <span className="text-text-ds-tertiary">Gas Status</span>
                  <span className="text-teal-400 font-semibold flex items-center gap-1">
                    <ShieldCheck size={12} /> Abstracted
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-ds-tertiary">Custodian</span>
                  <span className="text-text-ds-secondary font-semibold">Circle Enclave</span>
                </div>
              </div>
            </div>
            <div className="text-[10px] text-text-ds-tertiary font-body mt-4 leading-relaxed">
              * Support creators with single clicks. Tips are settled instantly without gas costs.
            </div>
          </Card>
        </div>
      )}

      {/* Fan Options Navigation grid */}
      {wallet && (
        <div className="space-y-4">
          <h2 className="text-xl font-heading font-bold text-text-ds-primary">
            Manage My Funds
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {fanOptions.map((opt) => {
              const Icon = opt.icon;
              return (
                <Link
                  key={opt.href}
                  href={
                    opt.href === "deposit" || opt.href === "transactions" || opt.href === "settings" || opt.href === "connected-wallets"
                      ? `/@${username}/creator-desktop/wallet/${opt.href}`
                      : `/@${username}/fan-desktop/wallet/${opt.href}`
                  }
                  className="group"
                >
                  <Card
                    interactive
                    className="flex flex-col justify-between h-full min-h-[120px] border-white/[0.05] hover:border-teal-500/30 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between">
                      <div className={`p-2 rounded-lg bg-white/[0.03] border border-white/[0.05] ${opt.color}`}>
                        <Icon size={20} />
                      </div>
                      <ChevronRight size={16} className="text-text-ds-tertiary group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </div>
                    <div className="mt-4">
                      <h4 className="text-sm font-heading font-bold text-text-ds-primary group-hover:text-gold-400 transition-colors">
                        {opt.title}
                      </h4>
                      <p className="text-xs text-text-ds-tertiary font-body mt-1 leading-relaxed">
                        {opt.desc}
                      </p>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
