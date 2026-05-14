"use client";
import { useState } from "react";
import { useTip } from "@/lib/api/queries";
import { useToast } from "@/components/ui/notifications/Toast";
import { formatUSDC, parseAmount, isValidUsdc } from "@/lib/currency";
import { track } from "@/lib/analytics/track";

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
      setError("Kwota musi mieć wartość 0.5–10 000 USDC.");
      return;
    }
    try {
      await mutateAsync({ creatorId, amount, message: message?.trim() || undefined });
      toast.push({ type: "success", text: `Dziękujemy! ${formatUSDC(amount)} wysłane.` });
      track("tip_success", { creatorId, amount });
      onSuccess();
    } catch (e: unknown) {
      toast.push({ type: "error", text: "Nie udało się przetworzyć napiwku." });
      const err = e as { response?: { data?: { message?: string } } };
      const msg = err.response?.data?.message || "Błąd serwera";
      setError(msg);
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
        <h3 id="tip-title" className="text-lg font-semibold">
          Wyślij napiwek
        </h3>

        <div className="mt-3 flex gap-2 flex-wrap">
          {presets.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setAmountStr(String(p))}
              className={`px-3 py-2 rounded-lg ${parseAmount(amountStr) === p ? "bg-teal-500 text-black" : "bg-white/10 border border-white/15"}`}
            >
              {p} USDC
            </button>
          ))}
        </div>

        <label className="mt-3 block text-sm opacity-80">Inna kwota (USDC)</label>
        <input
          inputMode="decimal"
          value={amountStr}
          onChange={(e) => setAmountStr(e.target.value)}
          className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 p-2 text-white"
          placeholder="np. 7.50"
        />

        <label className="mt-3 block text-sm opacity-80">Wiadomość (opcjonalnie)</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 p-2 text-white"
          placeholder="Dziękuję za treści!"
        />

        {error && <p className="mt-2 text-red-300 text-sm">{error}</p>}

        <div className="mt-4 flex gap-2">
          <button
            onClick={submit}
            disabled={isPending}
            aria-busy={isPending}
            className="flex-1 rounded-lg bg-teal-500 text-black py-2 font-semibold disabled:opacity-50"
          >
            {isPending ? "Wysyłanie…" : `Wyślij ${valid ? formatUSDC(amount) : ""}`}
          </button>
          <button onClick={onClose} className="flex-1 rounded-lg border border-white/20 py-2">
            Anuluj
          </button>
        </div>
      </div>
    </div>
  );
}
