"use client";

import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-80px)] flex flex-col px-6 items-start justify-start text-left mt-20 overflow-hidden">
     {/* Ikona USDC w tle */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Image
          src="/usdc.png"   // plik w /public/usdc.png
          alt="USDC Background"
          width={100}
          height={100}
          className="opacity-10 blur-xl select-none pointer-events-none"
          priority
        />
      </div>

      <div className="relative z-10 max-w-4xl">
        {/* Hasło główne */}
        <h1 className="text-5xl md:text-7xl font-bold mb-10 text-primary">
          support creativity, 
          get paid instantly
        </h1>

        {/* Tekst opisowy */}
        <p className="text-lg md:text-2xl text-text-secondary mb-10 max-w-2xl mx-auto">
          tipjar+ is a platform for instant micro-paymets in USDC 
          to your favorite creators: streamers, YouTubers, digital models, 
          musicians, artists, bloggers, coaches, educators, journalists, 
          influencers simply for all content maker.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link
            href="/register"
            className="px-8 py-4 rounded-full font-semibold text-lg bg-[#FFD700] text-brand-dark shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300"
          >
            Begin as a creator
          </Link>
          <Link
            href="/explore"
            className="px-8 py-4 rounded-full font-semibold text-lg bg-brand-purple text-white shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300"
          >
            Explore as fun
          </Link>
        </div>
      </div>
    </section>
  );
}
