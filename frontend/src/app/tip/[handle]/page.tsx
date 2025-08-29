"use client";
import { useMemo, useState } from "react";
import TipFlowShell from "@/components/tip/TipFlowShell";
import AmountInput from "@/components/tip/AmountInput";
import PaymentMethod, { type MethodKey } from "@/components/tip/PaymentMethod";
import FeeBreakdown from "@/components/tip/FeeBreakdown";
import OnrampPanel from "@/components/tip/OnrampPanel";
import { useRouter } from "next/navigation";
import { sendTip } from "@/lib/tips";
import { resolveCreatorId } from "@/lib/creators";
import { Toast } from "@/components/ui/Toast";

export default function Page({ params }: { params: { handle: string } }) {
  const router = useRouter();
  const { handle } = params;
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [amount, setAmount] = useState<number>(5);
  const [method, setMethod] = useState<MethodKey>("wallet");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const canNext = useMemo(() => amount > 0, [amount]);

  async function onSend() {
    setError(null);
    setSubmitting(true);
    try {
 tip?.txHash || tip?.tx || tip?.id || "tx_demo";
      router.push(`/tip/${handle}/success?amt=${amount.toFixed(2)}&tx=${encodeURIComponent(String(tx))}`);
    } catch (e: any) {
      setError(e.message || "Payment failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <TipFlowShell title={`Tip @${handle}`}>
      {error && <Toast msg={error} onClose={() => setError(null)} />}
      {step === 1 && <AmountInput value={amount} onChange={setAmount} />}
      {step === 2 && (
        <div className="space-y-4">
          <PaymentMethod value={method} onChange={setMethod} />
          {method !== "wallet" && <OnrampPanel />}
        </div>
      )}
      {step === 3 && <FeeBreakdown amount={amount} />}
      <div className="mt-6 flex flex-wrap items-center gap-3">
        {step > 1 && (
          <button
            className="font-ui rounded-xl border border-white/15 px-4 py-3 text-white/80"
            onClick={() => setStep((s) => (s - 1) as any)}
          >
            Back
          </button>
        )}
        {step < 3 && (
          <button
            className="font-ui rounded-xl bg-[#FFD700] px-4 py-3 font-semibold text-[#003737] disabled:opacity-60"
            disabled={!canNext}
            onClick={() => setStep((s) => (s + 1) as any)}
          >
            Continue
          </button>
        )}
        {step === 3 && (
          <button
            disabled={submitting}
            className="font-ui rounded-xl bg-gradient-to-r from-[#002828] to-[#007474] px-4 py-3 font-semibold text-white disabled:opacity-60"
            onClick={onSend}
          >
            {submitting ? "Processing…" : "Send tip"}
          </button>
        )}
      </div>
    </TipFlowShell>
  );
}
