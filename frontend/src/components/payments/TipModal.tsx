"use client";
import { useState } from "react";
import { useTip } from "@/lib/api/queries";
import { useToast } from "@/components/ui/notifications/Toast";
import { formatUSDC, parseAmount, isValidUsdc } from "@/lib/currency";
import { track } from "@/lib/analytics/track";
import { normalize } from "@/lib/api/errors";
import Button from "@/components/ui/buttons/Button";
import Input from "@/components/ui/forms/Input";
import Textarea from "@/components/ui/forms/Textarea";

export default function TipModal({
  open,
  onClose,
  creatorId,
  onSuccess,
}: { open: boolean; onClose: () => void; creatorId: string; onSuccess: () => void }) {
  const presets = [3, 5, 10, 25];
  const [amountStr, setAmountStr] = useState(String(presets[1]));
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { mutateAsync, isPending } = useTip();
  const toast = useToast();

  if (!open) return null;

  const amount = parseAmount(amountStr);
  const valid = isValidUsdc(amount);

  async function submit() {
    setError(null);
    if (!valid) {
      setError("Amount must be between 0.5 and 10,000 USDC.");
      return;
    }
    try {
      await mutateAsync({ creatorId, amount, message: message?.trim() || undefined });
      toast.push({ type: "success", text: `Thank you! ${formatUSDC(amount)} sent.` });
      track("tip_success", { creatorId, amount });
      onSuccess();
    } catch (e: unknown) {
      toast.push({ type: "error", text: "Failed to process tip." });
      const { msg } = normalize(e);
      setError(msg || "Server error");
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        className="w-full max-w-sm rounded-2xl bg-white/5 border border-white/10 p-4 text-white"
        role="dialog"
        aria-modal="true"
        aria-labelledby="tip-title"
      >
        <h3 id="tip-title" className="font-heading text-lg font-semibold">
          Send a tip
        </h3>

        <div className="mt-3 flex gap-2 flex-wrap">
          {presets.map((p) => (
            <Button
              key={p}
              type="button"
              onClick={() => setAmountStr(String(p))}
              variant={parseAmount(amountStr) === p ? "primary" : "ghost"}
              size="sm"
              className={parseAmount(amountStr) !== p ? "border border-white/15" : undefined}
            >
              {p} USDC
            </Button>
          ))}
        </div>

        <label className="mt-3 block font-body text-sm opacity-80">Other amount (USDC)</label>
        <Input
          inputMode="decimal"
          value={amountStr}
          onChange={(e) => setAmountStr(e.target.value)}
          placeholder="e.g. 7.50"
          className="mt-1"
        />

        <label className="mt-3 block font-body text-sm opacity-80">Message (optional)</label>
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          placeholder="Thanks for the content!"
          className="mt-1"
        />

        {error && <p className="mt-2 text-red-300 text-sm">{error}</p>}

        <div className="mt-4 flex gap-2">
          <Button
            onClick={submit}
            disabled={isPending}
            variant="primary"
            fullWidth
            loading={isPending}
          >
            {isPending ? "Sending…" : `Send ${valid ? formatUSDC(amount) : ""}`}
          </Button>
          <Button
            onClick={onClose}
            variant="ghost"
            fullWidth
            className="border border-white/20"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
