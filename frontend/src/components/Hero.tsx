// components/hero/Hero.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import CtaGoldButton from '@/components/ui/CtaGoldButton';

export default function Hero() {
  return (
    <section className="relative overflow-hidden text-white">
      {/* ==== BACKGROUND (multi-layer) ==== */}
      <div className="absolute inset-0 -z-10">
        {/* base brand gradient: deep teal -> night violet */}
        <div className="absolute inset-0 bg-[linear-gradient(120deg,#003737_0%,#1A2D3E_45%,#2B2643_70%,#441C4B_100%)]" />
        {/* auroras / brand accents */}
        <div className="absolute inset-0 mix-blend-screen opacity-35
                        bg-[radial-gradient(1000px_500px_at_20%_15%,#2CA4A4,transparent_60%),radial-gradient(900px_450px_at_85%_10%,#83509F,transparent_60%)]" />
        {/* subtle dotted noise to kill flatness */}
        <div className="absolute inset-0 opacity-[0.15]
                        bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)]
                        [background-size:3px_3px]" />
        {/* vignette */}
        <div className="pointer-events-none absolute inset-0 bg-black/30
                        [mask-image:radial-gradient(ellipse_at_center,black_55%,transparent_100%)]" />
      </div>

      {/* ==== CONTENT ==== */}
      <div className="mx-auto max-w-6xl px-6 pt-28 pb-20">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm uppercase tracking-[0.2em] text-white/70">
            tipjar.plus
          </p>

          <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.05]">
            support creativity,<br className="hidden sm:block" />
            <span className="text-[#FFD700]">get paid instantly</span>
          </h1>

          <p className="mt-6 text-lg md:text-2xl text-white/80 max-w-2xl">
            Instant micro-payments in USDC for creators — streamers, YouTubers,
            digital models, musicians, artists, bloggers, coaches, educators,
            journalists, influencers.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <CtaGoldButton href="/register" label="Create profil" />
            <Link
              href="/explore"
              className="inline-flex items-center justify-center rounded-3xl px-8 py-3
                         border border-white/20 text-white transition
                         hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
            >
              Explore as a fan
            </Link>
          </div>

          {/* trust row */}
          <div className="mt-10 flex items-center gap-5 text-white/70">
            <Image
              src="/usdc.png"
              width={28}
              height={28}
              alt="USDC"
              className="opacity-80"
              priority
            />
            <span className="text-sm">
              Powered by Circle · USDC on/off-ramp
            </span>
          </div>
        </div>
      </div>

      {/* ==== DECOR SHAPES (subtle, responsive) ==== */}
      <DecorAurora />
    </section>
  );
}

function DecorAurora() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      {/* soft blobs */}
      <div className="absolute -right-20 -top-20 h-[360px] w-[360px] rounded-full
                      bg-[radial-gradient(circle,#2CA4A4_0%,transparent_60%)]
                      opacity-25 blur-3xl" />
      <div className="absolute -left-24 bottom-[-80px] h-[420px] w-[420px] rounded-full
                      bg-[radial-gradient(circle,#83509F_0%,transparent_60%)]
                      opacity-20 blur-3xl" />
      {/* translucent coins */}
      <div className="absolute right-[10%] top-[46%] h-24 w-24 rounded-full bg-white/6 ring-1 ring-white/15 backdrop-blur-sm" />
      <div className="absolute right-[13%] top-[48%] h-24 w-24 rounded-full bg-white/4 ring-1 ring-white/10 translate-x-10 -translate-y-6" />
    </div>
  );
}
