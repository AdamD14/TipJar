import Receipt from "@/components/payments/tip/Receipt";
import Link from "next/link";

export default function Page({
  params,
  searchParams,
}: {
  params: { handle: string };
  searchParams: { amt?: string; tx?: string };
}) {
  const handle = params.handle;
  const amount = normAmt(searchParams?.amt);
  const tx = String(searchParams?.tx || "");

  if (!amount || !tx) {
    return (
      <main className="grid min-h-[60vh] place-items-center bg-[#001F1F] p-6 text-white">
        <div className="max-w-md text-center">
          <p className="text-white/90">Missing transaction data.</p>
          <Link
            href={`/tip/${handle}`}
            className="mt-4 inline-block font-ui rounded-xl bg-[#FFD700] px-4 py-2 font-semibold text-[#003737]"
          >
            Back to tip
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#001F1F] p-6">
      <div className="mx-auto max-w-2xl">
        <Receipt handle={handle} amount={amount} tx={tx} />
      </div>
    </main>
  );
}

function normAmt(a?: string) {
  if (!a) return "";
  const n = Number(a);
  if (!isFinite(n) || n <= 0) return "";
  return n.toFixed(2);
}
