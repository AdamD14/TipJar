"use client";
import Link from "next/link";
import RequireAuth from "@/components/onboarding/auth/RequireAuth";

export default function StudioPayoutsPage() {
  return (
    <RequireAuth>
      <main className="min-h-screen px-6 py-8">
        <h1 className="text-2xl font-semibold text-[#DDE0DA]">Payouts</h1>
        <p className="mt-2 text-[#BCC1B6] text-sm">Zleć wypłatę środków – fiat lub krypto (USDC).</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h2 className="font-medium text-[#DDE0DA]">Withdraw (FIAT)</h2>
            <p className="text-sm text-teal-25/60 mt-1">Przelew na IBAN / karta / Revolut.</p>
            <Link href="/creator/wallet/withdraw-fiat" className="inline-block mt-3 rounded-lg bg-[#FFD700] px-4 py-2 font-semibold text-[#003737]">Open</Link>
          </section>
          <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h2 className="font-medium text-[#DDE0DA]">Withdraw (Crypto)</h2>
            <p className="text-sm text-teal-25/60 mt-1">USDC → zewnętrzny adres (EVM).</p>
            <Link href="/creator/wallet/withdraw-crypto" className="inline-block mt-3 rounded-lg bg-[#FFD700] px-4 py-2 font-semibold text-[#003737]">Open</Link>
          </section>
        </div>
      </main>
    </RequireAuth>
  );
}

