import Link from "next/link";
import { Button } from "@/components/Button";

export default function Page() {
  return (
    <div>
      {/* Hero */}
      <section className="grid gap-8 md:grid-cols-2 md:items-center" id="hero">
        <div>
          <h1 className="font-[var(--font-mukta)] text-4xl font-extrabold leading-tight md:text-5xl">
            Tip. Subscribe. <span className="bg-gradient-to-r from-[#6B46C1] to-[#00A8A8] bg-clip-text text-transparent">Own your support.</span>
          </h1>
          <p className="mt-4 max-w-xl text-white/80">
            Direct USDC micro-tips to the creators you love — no gatekeepers, fast payouts, simple onboarding.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link href="/signup"><Button variant="gold">Begin as a creator</Button></Link>
            <Link href="/explore"><Button variant="outline">Explore creators</Button></Link>
            <Link href="#how" className="text-sm text-white/70 hover:text-white">How it works</Link>
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[#120a24] p-4">
          <div className="grid grid-cols-3 gap-3">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="h-20 rounded-xl bg-gradient-to-br from-[#6B46C1]/30 to-[#00A8A8]/20" />
            ))}
          </div>
        </div>
      </section>
      {/* Benefits */}
      <section className="mt-16 grid gap-4 md:grid-cols-4" id="why">
        {[
          ["Direct & instant", "Tips go straight to creators with fast settlement."],
          [
            "Simple onboarding",
            "Start with email/OAuth; connect a wallet when you’re ready.",
          ],
          ["Borderless by design", "USDC micro-tips that work worldwide."],
          ["Own your audience", "Your link, your supporters—no opaque feeds."],
        ].map(([t, s]) => (
          <div key={t} className="rounded-2xl border border-white/10 bg-[#140a2a] p-4">
            <h3 className="font-semibold">{t}</h3>
            <p className="mt-2 text-sm text-white/80">{s}</p>
          </div>
        ))}
      </section>
      {/* How it works */}
      <section className="mt-16" id="how">
        <h2 className="text-2xl font-bold">How it works</h2>
        <ol className="mt-4 grid gap-4 md:grid-cols-3">
          {[
            ["Discover", "Find creators you love."],
            ["Tip in USDC", "Pay by card or crypto."],
            ["Celebrate", "Leave a message and an optional NFT badge."],
          ].map(([t, s], i) => (
            <li key={t} className="rounded-2xl border border-white/10 bg-[#140a2a] p-4">
              <div className="text-3xl font-bold text-white/40">{i + 1}</div>
              <h3 className="mt-2 font-semibold">{t}</h3>
              <p className="text-sm text-white/80">{s}</p>
            </li>
          ))}
        </ol>
      </section>
      {/* Trust strip */}
      <section className="mt-16 rounded-2xl border border-white/10 bg-[#120a24] p-6 text-center">
        <p className="text-white/80">Built for creators, loved by fans.</p>
        <div className="mt-3 flex justify-center gap-3">
          <Link href="/signup"><Button variant="gold">Start now</Button></Link>
          <Link href="/learn"><Button variant="outline">Learn more</Button></Link>
        </div>
      </section>
    </div>


  );
};
