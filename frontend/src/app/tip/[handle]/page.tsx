"use client";
import { useMemo, useState, useEffect } from "react";
import TipFlowShell from "@/components/payments/tip/TipFlowShell";
import AmountInput from "@/components/payments/tip/AmountInput";
import PaymentMethod, { type MethodKey } from "@/components/payments/tip/PaymentMethod";
import FeeBreakdown from "@/components/payments/tip/FeeBreakdown";
import OnrampPanel from "@/components/payments/tip/OnrampPanel";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/notifications/Toast";
import { resolveCreatorId } from "@/lib/creators";
import { useTip } from "@/lib/api/queries";
import { normalize } from "@/lib/api/errors";

export default function Page({ params }: { params: { handle: string } }) {
const router = useRouter();
const { handle } = params;
const [step, setStep] = useState<1 | 2 | 3>(1);
const [amount, setAmount] = useState<number>(5);
const [method, setMethod] = useState<MethodKey>("wallet");
const [submitting, setSubmitting] = useState(false);
const [creatorId, setCreatorId] = useState<string | null>(null);
const [resolveError, setResolveError] = useState<string | null>(null);
const toast = useToast();
const { mutateAsync } = useTip();

const canNext = useMemo(() => amount > 0, [amount]);

useEffect(() => {
let cancelled = false;
resolveCreatorId(handle)
.then((id) => {
if (!cancelled) setCreatorId(id);
})
.catch((e) => {
if (!cancelled) setResolveError(e instanceof Error ? e.message : "Unknown creator");
});
return () => { cancelled = true; };
}, [handle]);

async function onSend() {
if (!creatorId) {
toast.push({ type: "error", text: "Creator not found." });
return;
}
setSubmitting(true);
try {
const tip = await mutateAsync({ creatorId, amount, message: undefined });
const txId = tip?.id || tip?.circleTransferId || "unknown";
router.push(
`/tip/${handle}/success?amt=${amount.toFixed(2)}&tx=${encodeURIComponent(txId)}`
);
} catch (e: unknown) {
const { msg } = normalize(e);
toast.push({ type: "error", text: msg || "Payment failed" });
} finally {
setSubmitting(false);
}
}

if (resolveError) {
return (
<TipFlowShell title={`Tip @${handle}`}>
<p className="text-red-300 text-sm">{resolveError}</p>
</TipFlowShell>
);
}

return (
<TipFlowShell title={`Tip @${handle}`}>
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
onClick={() => setStep((s) => (s - 1) as 1 | 2 | 3)}
>
Back
</button>
)}
{step < 3 && (
<button
className="font-ui rounded-xl bg-[#FFD700] px-4 py-3 font-semibold text-[#003737] disabled:opacity-60"
disabled={!canNext}
onClick={() => setStep((s) => (s + 1) as 1 | 2 | 3)}
>
Continue
</button>
)}
{step === 3 && (
<button
disabled={submitting || !creatorId}
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
