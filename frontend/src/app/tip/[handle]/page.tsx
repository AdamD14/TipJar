"use client";
import { useState } from "react";
import { sendTip } from "@/lib/tips";
import { Toast } from "@/components/ui/Toast";
import { useRouter } from "next/navigation";

export default function Page({ params }: { params: { handle: string } }) {
  const router = useRouter();
  const { handle } = params;
  const [amount, setAmount] = useState("5.00");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSend() {
    setError(null);
    setLoading(true);
    try {
      const payload = { creatorId: handle, amount };
      const { tip } = await sendTip(payload);
      const tx = tip?.txHash || tip?.tx || tip?.id || "tx_demo";
      router.push(
        `/tip/${handle}/success?amt=${encodeURIComponent(amount)}&tx=${encodeURIComponent(String(tx))}`,
      );
    } catch (e: any) {
      setError(e.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#001F1F] p-6 text-white">
      {error && <Toast msg={error} onClose={() => setError(null)} />}
      <div className="mx-auto max-w-md space-y-4">
        <h1 className="text-xl font-semibold">Tip @{handle}</h1>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white"
        />
        <button
          disabled={loading}
          onClick={onSend}
          className="font-ui w-full rounded-xl bg-[#FFD700] px-4 py-3 font-semibold text-[#003737] disabled:opacity-60"
        >
          {loading ? "Processing…" : "Send tip"}
        </button>
      </div>
    </main>
  );
}
