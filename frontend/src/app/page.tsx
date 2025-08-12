<<<<<<< HEAD
const GoldButtonShowcase = () => {
  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <style>{`
        /* 1. begin as a creator */
        .solid-gold-btn {
          color: #000000;
          padding: 0.4em 0.8em;
          font-size: 18px;
          border-radius: 0.5em;
          background: #FFD700;
          font-weight: 600;
          cursor: pointer;
          border: 1px solid #F6C300;
          transition: all 0.2s;
          box-shadow: 2px 2px 2px #B38600, -2px -2px 4px #FFF5CC;
        }
        .solid-gold-btn:hover {
          transform: scale(1.05); /* Effect added */
        }
        .solid-gold-btn:active {
          color: #333333;
          box-shadow: 0px 0px 0px #B38600, 0px 0px 0px #FFF5CC, inset 4px 4px 12px #5A4A00, inset -4px -4px 12px #F6C300;
          transform: translateY(2px);
        }

        /* 2. sign up */
        .outline-gold-btn {
          color: #FFD700;
          background: transparent;
          border: 2px solid #FFD700;
          padding: 0.4em 0.8em;
          font-size: 18px;
          font-weight: 600;
          border-radius: 0.5em;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .outline-gold-btn:hover {
          background: #FFD700; /* Background changed */
          color: #000000;
          box-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
        }
        .outline-gold-btn:active {
          transform: translateY(2px);
        }

        /* 3. get started */
        .ghost-gold-btn {
          color: #FFD700;
          background: transparent;
          border: 2px solid transparent; /* Added for smooth transition */
          padding: 0.4em 0.8em;
          font-weight: 600;
          font-size: 18px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .ghost-gold-btn:hover {
          border: 2px solid #FFD700;
          border-radius: 0.5em; /* Effect changed to border */
        }
        .ghost-gold-btn:active {
          transform: translateY(2px);
        }

        /* 4. register */
        .soft-gold-btn {
          color: #000000; /* Color changed for contrast */
          /* Gradient background added */
          background: #FFD700;
          border: 1px solid #FFD700;
          padding: 0.4em 0.8em;
          font-weight: 600;
          font-size: 18px;
          border-radius: 0.5em;
          cursor: pointer;
          box-shadow: 2px 2px 6px #E0C060;
          transition: all 0.2s ease;
        }
        .soft-gold-btn:hover {
          /* Gradient direction reversed and scaling added */
         color: #FFD700;
          background: transparent;
          border: 2px solid #FFD700;
          transform: scale(1.05);
        }
        .soft-gold-btn:active {
          transform: translateY(2px);
        }
      `}</style>

      <div className="flex flex-wrap items-center justify-center gap-8">
        
        <button className="solid-gold-btn">
          begin as a creator
        </button>

        <button className="outline-gold-btn">
          sign up
        </button>

        <button className="ghost-gold-btn">
          get started
        </button>
        
        <button className="soft-gold-btn">
          register
        </button>

      </div>
    </main>
=======
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
>>>>>>> 1330ff9110f1bed778bd335089fc42323d03e095
  );
};

export default GoldButtonShowcase;