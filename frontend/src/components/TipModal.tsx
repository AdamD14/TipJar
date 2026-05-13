"use client";

import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import Textarea from "@/components/ui/Textarea";

export default function TipModal({
  username,
  open,
  onClose,
}: {
  username: string;
  open: boolean;
  onClose: () => void;
}) {
  const [amount, setAmount] = useState(500);
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (open) {
      setAmount(500);
      setNote("");
      setBusy(false);
    }
  }, [open]);

  const presets = useMemo(() => [100, 200, 500, 1000, 2000], []);

  const go = async () => {
    try {
      setBusy(true);
      const res = await fetch("/api/pay/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ creator: username, amountCents: amount, note }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Error");
      window.location.href = data.checkoutUrl;
    } catch (e: any) {
      alert(e.message || "Payment init failed");
      setBusy(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} size="form" title={`Tip @${username}`}>
      <div className="mt-2 flex gap-2 flex-wrap">
        {presets.map((cents) => (
          <button
            key={cents}
            type="button"
            onClick={() => setAmount(cents)}
            className={clsx(
              "px-3 py-1.5 rounded-lg text-sm border font-body transition-colors duration-150 tnum",
              amount === cents
                ? "bg-gold-400 text-teal-900 border-gold-400 font-semibold"
                : "border-white/[0.05] bg-teal-850 text-text-ds-secondary hover:border-teal-600",
            )}
          >
            ${(cents / 100).toFixed(2)}
          </button>
        ))}
      </div>

      <div className="mt-4">
        <div className="flex justify-between font-body text-sm">
          <span className="text-text-ds-secondary">Custom amount</span>
          <span className="font-heading font-semibold text-text-ds-primary tnum">
            ${(amount / 100).toFixed(2)} USDC
          </span>
        </div>
        <input
          type="range"
          min={50}
          max={20000}
          step={50}
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full accent-gold-400 mt-2"
        />
      </div>

      <div className="mt-4">
        <label className="block font-body text-sm text-text-ds-secondary mb-1">
          Note (optional)
        </label>
        <Textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          maxLength={140}
          placeholder="Say thanks! (max 140 chars)"
          rows={2}
        />
      </div>

      <div className="mt-4 font-body text-xs text-text-ds-tertiary">
        Pay with card, Apple/Google Pay, Revolut, or crypto wallet (via Circle).
      </div>

      <div className="mt-5 flex gap-2 justify-end">
        <Button variant="secondary" size="sm" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="primary"
          size="sm"
          disabled={busy}
          loading={busy}
          onClick={go}
        >
          {busy ? "Redirecting..." : "Continue to Checkout"}
        </Button>
      </div>
    </Modal>
  );
}
