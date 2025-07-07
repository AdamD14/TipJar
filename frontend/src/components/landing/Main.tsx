'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Search,
  HandCoins,
  Star,
  UserPlus,
  Share2,
  Wallet,
  Percent,
  Globe,
  Shield,
  Twitter,
  Ghost,
} from 'lucide-react';

export default function Main() {
  return (
    <div className="min-h-screen bg-[#006D6D]">
      <nav className="py-4 px-6 flex justify-between items-center bg-[#004C4C]">
        <div className="flex items-center gap-2">
          <Image
            src="https://ucarecdn.com/d4d8a322-c95c-4915-a4fd-9c8457d25325/-/format/auto/"
            alt="TipJar Logo"
            width={32}
            height={32}
            className="h-8 w-8"
          />
          <div className="text-[#FFD700] text-3xl font-bold">TipJar</div>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <Link href="/discover" className="text-white hover:text-[#FFD700] transition-colors">
            Discover Creators
          </Link>
          <Link href="/how-it-works" className="text-white hover:text-[#FFD700] transition-colors">
            How it Works
          </Link>
          <Link href="/learn" className="text-white hover:text-[#FFD700] transition-colors">
            Learn
          </Link>
          <button className="text-white hover:text-[#FFD700] transition-colors">Login</button>
          <button className="bg-[#FFD700] text-[#004C4C] px-6 py-2 rounded-full hover:bg-[#FFE55C] transition-all transform hover:scale-105">
            Sign Up
          </button>
        </div>
        <button className="md:hidden text-[#FFD700]" aria-label="Menu">
          <Ghost className="h-6 w-6" />
        </button>
      </nav>

      <main>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-[#FFD700] text-6xl md:text-7xl font-bold mb-6 animate-fadeIn">TipIT</h1>
          <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto">
            Support your favorite creators instantly and without borders, using stable USDC. Simple,
            fast, global.
          </p>
          <div className="mb-12">
            <Image
              src="https://www.circle.com/hs-fs/hubfs/USDC%20logo.png?width=200"
              alt="USDC Logo"
              width={200}
              height={64}
              className="h-16 mx-auto w-auto"
            />
          </div>
          <div className="flex flex-col md:flex-row gap-6 justify-center mb-16">
            <button
              className="bg-[#FFD700] text-[#004C4C] px-8 py-4 rounded-full font-bold text-lg hover:bg-[#FFE55C] transition-all transform hover:scale-105"
            >
              Register as Creator
            </button>
            <Link href="/discover" className="bg-transparent border-2 border-[#FFD700] text-[#FFD700] px-8 py-4 rounded-full font-bold text-lg hover:bg-[#FFD700] hover:text-[#004C4C] transition-all text-center">
              Discover Creators
            </Link>
          </div>

          <section className="mb-20">
            <h2 className="text-[#FFD700] text-4xl font-bold mb-12">How it Works</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-[#008080] p-8 rounded-xl">
                <h3 className="text-[#FFD700] text-2xl font-bold mb-4">For Fans</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Search className="text-[#FFD700] h-6 w-6 mt-1" />
                    <p className="text-left text-white">Find your favorite creators on TipJar</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <HandCoins className="text-[#FFD700] h-6 w-6 mt-1" />
                    <p className="text-left text-white">Send tips easily with USDC</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <Star className="text-[#FFD700] h-6 w-6 mt-1" />
                    <p className="text-left text-white">Get exclusive perks and recognition</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#008080] p-8 rounded-xl">
                <h3 className="text-[#FFD700] text-2xl font-bold mb-4">For Creators</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <UserPlus className="text-[#FFD700] h-6 w-6 mt-1" />
                    <p className="text-left text-white">Create your TipJar profile</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <Share2 className="text-[#FFD700] h-6 w-6 mt-1" />
                    <p className="text-left text-white">Share your unique tipping link</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <Wallet className="text-[#FFD700] h-6 w-6 mt-1" />
                    <p className="text-left text-white">Receive tips directly to your wallet</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-20">
            <h2 className="text-[#FFD700] text-4xl font-bold mb-12">Why TipJar?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-[#008080] p-8 rounded-xl transform hover:scale-105 transition-transform">
                <Percent className="text-[#FFD700] h-8 w-8 mb-4" />
                <h3 className="text-[#FFD700] text-xl font-bold mb-2">Low Fees</h3>
                <p className="text-white">Only <span className="text-[#FFD700]">1%</span> platform fee</p>
              </div>
              <div className="bg-[#008080] p-8 rounded-xl transform hover:scale-105 transition-transform">
                <Globe className="text-[#FFD700] h-8 w-8 mb-4" />
                <h3 className="text-[#FFD700] text-xl font-bold mb-2">Global & Instant</h3>
                <p className="text-white">Send tips worldwide with USDC</p>
              </div>
              <div className="bg-[#008080] p-8 rounded-xl transform hover:scale-105 transition-transform">
                <Shield className="text-[#FFD700] h-8 w-8 mb-4" />
                <h3 className="text-[#FFD700] text-xl font-bold mb-2">Secure & Stable</h3>
                <p className="text-white">Your funds are always safe</p>
              </div>
            </div>
          </section>

          <section className="mb-20">
            <h2 className="text-[#FFD700] text-4xl font-bold mb-8">Join Our Community</h2>
            <div className="flex justify-center gap-8">
              <a href="#" className="text-[#FFD700] hover:text-[#FFE55C] transition-colors">
                <Twitter className="h-8 w-8" />
              </a>
              <a href="#" className="text-[#FFD700] hover:text-[#FFE55C] transition-colors">
                <Ghost className="h-8 w-8" />
              </a>
            </div>
          </section>
        </div>
      </main>

      <footer className="bg-[#004C4C] py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Image
                src="https://ucarecdn.com/d4d8a322-c95c-4915-a4fd-9c8457d25325/-/format/auto/"
                alt="TipJar Logo"
                width={24}
                height={24}
                className="h-6 w-6"
              />
              <div className="text-[#FFD700] text-xl font-bold">TipJar</div>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="/about" className="text-[#FFD700] hover:text-[#FFE55C] transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-[#FFD700] hover:text-[#FFE55C] transition-colors">
                Contact
              </Link>
              <Link href="/terms" className="text-[#FFD700] hover:text-[#FFE55C] transition-colors">
                Terms
              </Link>
              <Link href="/privacy" className="text-[#FFD700] hover:text-[#FFE55C] transition-colors">
                Privacy
              </Link>
              <Link href="/learn" className="text-[#FFD700] hover:text-[#FFE55C] transition-colors">
                Learn
              </Link>
            </div>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out;
        }
      `}</style>
    </div>
  );
}
