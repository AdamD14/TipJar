"use client";

import React, { useCallback, useState } from "react";
import clsx from "clsx";
import { Send } from "lucide-react";
import Button from "@/components/ui/buttons/Button";
import Checkbox from "@/components/ui/forms/Checkbox";
import { AmountSlider } from "@/components/payments/tip/AmountSlider";
import { useTip } from "@/lib/api/queries";
import { useToast } from "@/components/ui/notifications/Toast";
import { isValidUsdc } from "@/lib/currency";
import { track } from "@/lib/analytics/track";
import { normalize } from "@/lib/api/errors";
import { useAuthStore } from "@/lib/store/authStore";

const TIP_PRESETS = [1, 2, 5, 10, 20];
const MAX_MESSAGE = 80;

interface GoalTipFormProps {
  creatorId: string;
  /** Called after a successful tip (e.g. to close the parent Modal). */
  onSuccess?: () => void;
}

/**
 * Tip form rendered inside the GoalBar "Tip" drawer on the public
 * creator profile (/@username). Extracted from the previously inline
 * TipPanel in page.tsx — same presets/AmountSlider/useTip() mutation,
 * transfer logic unchanged. Adds a "Send as anonymous" checkbox
 * (backend's Tip.isAnonymous already existed, the live flow just never
 * sent it).
 */
export function GoalTipForm({ creatorId, onSuccess }: GoalTipFormProps) {
  const [amount, setAmount] = useState(5);
  const [message, setMessage] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [tipError, setTipError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const { mutateAsync, isPending } = useTip();
  const toast = useToast();
  const user = useAuthStore((s) => s.user);
  const hydrated = useAuthStore((s) => s._hasHydrated);
  const isLoggedIn = hydrated && !!user;
  const valid = isValidUsdc(amount);

  const handlePreset = useCallback((p: number) => {
    setAmount(p);
    setTipError(null);
    setSuccess(false);
  }, []);

  const submit = useCallback(async () => {
    setTipError(null);
    if (!valid) {
      setTipError("Amount must be between 0.5 and 10,000 USDC.");
      return;
    }
    if (!isLoggedIn) {
      setTipError("Log in to send a tip.");
      return;
    }

    try {
      await mutateAsync({
        creatorId,
        amount,
        message: message.trim() || undefined,
        isAnonymous,
      });
      toast.push({ type: "success", text: `Thank you! ${amount} USDC sent.` });
      track("tip_success", { creatorId, amount });
      setSuccess(true);
      setMessage("");
      // Briefly show the success state before closing the drawer, mirroring
      // the original TipPanel's setTimeout(() => setSuccess(false), 4000).
      setTimeout(() => {
        setSuccess(false);
        onSuccess?.();
      }, 1200);
    } catch (e: unknown) {
      const { msg } = normalize(e);
      setTipError(msg || "Failed to process tip.");
      toast.push({ type: "error", text: "Failed to process tip." });
    }
  }, [valid, isLoggedIn, creatorId, amount, message, isAnonymous, mutateAsync, toast, onSuccess]);

  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        {TIP_PRESETS.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => handlePreset(p)}
            className={clsx(
              "w-12 h-12 rounded-lg font-heading font-bold text-sm tracking-wider transition-all",
              amount === p
                ? "bg-gradient-to-r from-gold-400 to-gold-300 text-teal-900 shadow-md"
                : "bg-white/5 text-white/70 border border-white/10 hover:bg-white/10 hover:border-white/20",
            )}
          >
            ${p}
          </button>
        ))}
      </div>

      <AmountSlider
        value={amount}
        min={1}
        max={100}
        onChange={(v) => {
          setAmount(v);
          setTipError(null);
          setSuccess(false);
        }}
      />

      <div>
        <input
          type="text"
          maxLength={MAX_MESSAGE}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Your message (optional)"
          className="w-full h-10 px-4 rounded-[6px] font-body text-base bg-teal-800 text-teal-25 placeholder:text-teal-100 border border-teal-700 hover:border-teal-450 focus:border-gold-300 focus:shadow-[0_0_0_1px_var(--teal-200),0_0_0_4px_rgba(255,215,0,0.25)] outline-none transition-all duration-200"
        />
        <p className="text-right text-[10px] text-teal-500/30 mt-1 tnum">
          {message.length}/{MAX_MESSAGE}
        </p>
      </div>

      <label className="flex items-center gap-2 cursor-pointer">
        <Checkbox checked={isAnonymous} onChange={(e) => setIsAnonymous(e.target.checked)} />
        <span className="font-body text-sm text-text-ds-secondary">Send as anonymous</span>
      </label>

      {tipError && <p className="text-red-300 text-sm">{tipError}</p>}
      {success && (
        <div className="rounded-lg bg-green-500/10 border border-green-500/20 p-3 text-sm text-green-300">
          Tip sent successfully!
        </div>
      )}

      <Button
        onClick={submit}
        disabled={isPending || !valid}
        variant="primary"
        fullWidth
        loading={isPending}
        size="md"
        leftIcon={!isPending ? <Send size={16} /> : undefined}
      >
        {isPending ? "Sending..." : `Send ${valid ? `${amount.toFixed(2)} USDC` : ""}`}
      </Button>

      {!isLoggedIn && (
        <p className="text-center text-xs text-teal-500/40">Log in to send a tip</p>
      )}
    </div>
  );
}
