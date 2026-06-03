"use client";

import React, { useState, useCallback } from "react";
import clsx from "clsx";
import { DollarSign, Send, ChevronDown, ChevronUp } from "lucide-react";
import { useTip } from "@/lib/api/queries";
import { useToast } from "@/components/ui/notifications/Toast";
import { parseAmount, isValidUsdc } from "@/lib/currency";
import { track } from "@/lib/analytics/track";
import { normalize } from "@/lib/api/errors";
import { useAuthStore } from "@/lib/store/authStore";
import Button from "@/components/ui/buttons/Button";
import Input from "@/components/ui/forms/Input";
import type { Goal } from "@/components/studio/modal/GoalBar";

const PRESETS = [3, 5, 10, 25];
const FEE_BPS = 250;
const MAX_MESSAGE = 80;

function computeFee(amount: number): number {
  return Math.floor(amount * FEE_BPS) / 10000;
}

function formatDeadline(dateStr: string) {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-");
  return `${day}-${month}-${year}`;
}

interface TipWidgetProps {
  goal: Goal;
  creatorId: string;
}

export default function TipWidget({ goal, creatorId }: TipWidgetProps) {
  const [expanded, setExpanded] = useState(false);
  const [amountStr, setAmountStr] = useState(String(PRESETS[1]));
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const { mutateAsync, isPending } = useTip();
  const toast = useToast();
  const user = useAuthStore((s) => s.user);
  const hydrated = useAuthStore((s) => s._hasHydrated);
  const isLoggedIn = hydrated && !!user;

  const amount = parseAmount(amountStr);
  const valid = isValidUsdc(amount);
  const fee = valid ? computeFee(amount) : 0;
  const net = valid ? amount - fee : 0;
  const percentage = Math.min((goal.current / (goal.target || 1)) * 100, 100);
  const displayCurrent = goal.current > 0 ? `$${goal.current.toLocaleString()}` : "—";

  const handlePreset = useCallback((p: number) => {
    setAmountStr(String(p));
    setError(null);
    setSuccess(false);
  }, []);

  const submit = useCallback(async () => {
    setError(null);
    if (!valid) {
      setError("Amount must be between 0.5 and 10,000 USDC.");
      return;
    }
    if (!isLoggedIn) {
      setError("Log in to send a tip.");
      return;
    }
    try {
      await mutateAsync({
        creatorId,
        amount,
        message: message.trim() || undefined,
      });
      toast.push({ type: "success", text: `Thank you! ${amount} USDC sent.` });
      track("tip_success", { creatorId, amount });
      setSuccess(true);
      setMessage("");
      setTimeout(() => setSuccess(false), 4000);
    } catch (e: unknown) {
      const { msg } = normalize(e);
      setError(msg || "Failed to process tip.");
      toast.push({ type: "error", text: "Failed to process tip." });
    }
  }, [valid, isLoggedIn, creatorId, amount, message, mutateAsync, toast]);

  return (
    <div
      className={clsx(
        "relative overflow-hidden",
        "bg-gradient-to-br from-teal-900 to-teal-800",
        "border border-teal-500/20",
        "rounded-xl shadow-2 backdrop-blur-md",
        "transition-all duration-300",
      )}
    >
      {/* ── Goal Header (always visible) ── */}
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="w-full text-left p-6 flex flex-col gap-4 cursor-pointer"
        aria-expanded={expanded}
      >
        <div className="flex justify-between items-center gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-heading font-bold text-teal-500/40 uppercase tracking-widest mb-1">
              Goal
            </p>
            <h3 className="text-xl font-heading font-bold text-text-ds-primary tracking-tight leading-tight line-clamp-2">
              {(goal.title || "Goal Title").slice(0, 40)}
            </h3>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="flex flex-col border-l border-teal-500/20 pl-3">
              <span className="text-[10px] font-heading font-bold text-teal-500/40 uppercase tracking-widest">
                Target
              </span>
              <span className="text-xl font-heading font-bold text-gold-400 tracking-tight tnum">
                ${goal.target.toLocaleString()}
              </span>
            </div>
            <span className="text-teal-500/40">
              {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </span>
          </div>
        </div>

        {goal.deadline && (
          <div className="flex justify-end">
            <span className="text-[10px] font-heading font-bold text-teal-500/40 uppercase tracking-widest">
              Deadline: {formatDeadline(goal.deadline)}
            </span>
          </div>
        )}

        {/* Progress Bar */}
        <div className="relative">
          <div className="h-2 bg-teal-850 rounded-full overflow-hidden border border-white/[0.05]">
            <div
              className="h-full bg-gradient-to-r from-teal-600 to-gold-400 transition-all duration-700 ease-standard"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] font-heading font-bold text-teal-500/40 uppercase tracking-widest mt-2">
            <span>Funds raised</span>
            <span className="text-lg font-heading font-bold text-text-ds-primary tnum">
              {displayCurrent}
            </span>
          </div>
        </div>

        {/* CTA when collapsed */}
        {!expanded && (
          <div className="flex items-center justify-center gap-2 pt-1">
            <DollarSign size={14} className="text-gold-400" />
            <span className="text-sm font-heading font-bold text-gold-400 uppercase tracking-widest">
              TIP IT
            </span>
          </div>
        )}
      </button>

      {/* ── Tip Input (expandable) ── */}
      {expanded && (
        <div className="px-6 pb-6 pt-0 space-y-4 border-t border-teal-500/10">
          {/* Presets */}
          <div className="pt-4 flex gap-2 flex-wrap">
            {PRESETS.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => handlePreset(p)}
                className={clsx(
                  "h-9 px-4 rounded-lg font-heading font-bold text-sm tracking-wider transition-all",
                  parseAmount(amountStr) === p
                    ? "bg-gradient-to-r from-gold-400 to-gold-300 text-teal-900 shadow-md"
                    : "bg-white/5 text-white/70 border border-white/10 hover:bg-white/10 hover:border-white/20",
                )}
              >
                {p} USDC
              </button>
            ))}
          </div>

          {/* Amount Input */}
          <div>
            <label className="block text-[10px] font-heading font-bold text-teal-500/40 uppercase tracking-widest mb-1.5">
              Amount (USDC)
            </label>
            <Input
              inputMode="decimal"
              value={amountStr}
              onChange={(e) => {
                setAmountStr(e.target.value);
                setError(null);
                setSuccess(false);
              }}
              placeholder="e.g. 7.50"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-[10px] font-heading font-bold text-teal-500/40 uppercase tracking-widest mb-1.5">
              Message <span className="text-teal-500/30 normal-case tracking-normal">({MAX_MESSAGE} chars max)</span>
            </label>
            <input
              type="text"
              maxLength={MAX_MESSAGE}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Thanks for the content!"
              className="w-full h-10 px-4 rounded-[6px] font-body text-base bg-teal-800 text-teal-25 placeholder:text-teal-100 border border-teal-700 hover:border-teal-450 focus:border-gold-300 focus:shadow-[0_0_0_1px_var(--teal-200),0_0_0_4px_rgba(255,215,0,0.25)] outline-none transition-all duration-200"
            />
            <p className="text-right text-[10px] text-teal-500/30 mt-1 tnum">
              {message.length}/{MAX_MESSAGE}
            </p>
          </div>

          {/* Fee Breakdown */}
          {valid && amount > 0 && (
            <div className="rounded-lg bg-white/[0.03] border border-white/[0.06] p-3 space-y-1.5">
              <div className="flex justify-between text-xs text-white/60">
                <span>Tip amount</span>
                <span className="tnum">{amount.toFixed(2)} USDC</span>
              </div>
              <div className="flex justify-between text-xs text-white/60">
                <span>Platform fee (2.5%, paid by receiver)</span>
                <span className="tnum">&minus;{fee.toFixed(2)} USDC</span>
              </div>
              <div className="border-t border-white/[0.08] pt-1.5 flex justify-between text-sm font-heading font-semibold">
                <span>Creator receives</span>
                <span className="tnum text-gold-400">{net.toFixed(2)} USDC</span>
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <p className="text-red-300 text-sm">{error}</p>
          )}

          {/* Success */}
          {success && (
            <div className="rounded-lg bg-green-500/10 border border-green-500/20 p-3 text-sm text-green-300">
              Tip sent successfully!
            </div>
          )}

          {/* Send Button */}
          <Button
            onClick={submit}
            disabled={isPending || !valid}
            variant="primary"
            fullWidth
            loading={isPending}
            size="md"
            className="gap-2"
          >
            {isPending ? (
              "Sending..."
            ) : (
              <>
                <Send size={16} />
                Send {valid ? `${amount.toFixed(2)} USDC` : ""}
              </>
            )}
          </Button>

          {!isLoggedIn && (
            <p className="text-center text-xs text-teal-500/40">
              Log in to send a tip
            </p>
          )}
        </div>
      )}
    </div>
  );
}
