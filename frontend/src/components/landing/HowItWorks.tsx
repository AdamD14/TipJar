// components/landing/HowItWorks.tsx
'use client';

import Link from 'next/link';
import { useCallback } from 'react';
import { UserCheck, CircleDollarSign, Compass, HandCoins, UserPlus, Users } from 'lucide-react';

export default function HowItWorks() {
  const go = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <section id="how-it-works" className="py-12 md:py-16">
      <div className="mx-auto max-w-[1480px] px-4 text-[#DDE0DA]">
        
        {/* Główny tytuł sekcji - większy i centralny */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#DDE0DA] transition-colors duration-300 hover:text-[#FFD700] mb-4">
            How It Works
          </h2>
          <p className="text-lg text-[#BCC1B6] max-w-2xl mx-auto">
            Simple steps to get started, whether you're supporting creators or building your community
          </p>
        </div>

        {/* Sticky subnav - bardziej widoczna */}
        <div className="sticky top-16 z-20 mb-8 flex justify-center">
          <div className="inline-flex rounded-[16px] border-2 border-[#FFD700]/30 bg-card/80 backdrop-blur-md p-2 shadow-lg">
            <button
              onClick={() => go('fans')}
              className="px-6 py-3 text-base font-semibold rounded-[12px] transition-all duration-200 hover:bg-[#FFD700]/10 hover:text-[#FFD700] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD700]/60"
            >
              For Fans
            </button>
            <button
              onClick={() => go('creators')}
              className="px-6 py-3 text-base font-semibold rounded-[12px] transition-all duration-200 hover:bg-[#FFD700]/10 hover:text-[#FFD700] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD700]/60"
            >
              For Creators
            </button>
          </div>
        </div>

        {/* ===== For Fans ===== */}
        <div id="fans" className="scroll-mt-20 mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-[#FFD700] mb-2">For Fans</h3>
            <p className="text-lg text-[#BCC1B6]">
              Support and discover. Simpler than ever.
            </p>
          </div>

          {/* Row 1: Get Started (card left, text right) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:items-start mb-8">
            <div className="rounded-[16px] bg-card border border-white/10 p-6 md:p-8 flex items-center justify-center min-h-[200px]">
              <div className="flex w-full justify-around items-start text-center">
                {/* Ikona 1: Register */}
                <div className="flex flex-col items-center gap-2">
                  <UserCheck size={48} className="text-[#FFD700]" strokeWidth={1.5} />
                  <span className="text-sm font-semibold text-[#DDE0DA]">Register</span>
                </div>
                
                {/* Ikona 2: Top Up */}
                <div className="flex flex-col items-center gap-2">
                  <CircleDollarSign size={48} className="text-[#FFD700]" strokeWidth={1.5} />
                  <span className="text-sm font-semibold text-[#DDE0DA]">Top Up</span>
                </div>

                {/* Ikona 3: Explore */}
                <div className="flex flex-col items-center gap-2">
                  <Compass size={48} className="text-[#FFD700]" strokeWidth={1.5} />
                  <span className="text-sm font-semibold text-[#DDE0DA]">Explore</span>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-[16px] border border-white/10 p-6 md:p-8">
              <h4 className="mb-3 text-lg font-semibold leading-[1.5]">Get Started</h4>
              <ul className="list-disc pl-5 text-[14px] leading-[1.5] text-[#BCC1B6] space-y-2">
                <li>
                  <span className="font-medium text-[#DDE0DA]">Sign Up (Optional):</span> Use email, Google, Twitch, or MetaMask.
                  Registration isn't required to send tips.
                </li>
                <li>
                  <span className="font-medium text-[#DDE0DA]">Fund Your Tips:</span> Top up with USDC using crypto or your preferred
                  payment method.
                </li>
                <li>
                  <span className="font-medium text-[#DDE0DA]">Explore!:</span> Fuel the movement.
                </li>
              </ul>
            </div>
          </div>

          {/* Row 2: Join the Movement (text left, card right) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:items-start">
            <div className="bg-card rounded-[16px] border border-white/10 p-6 md:p-8">
              <h4 className="mb-3 text-lg font-semibold leading-[1.5]">Join the Movement</h4>
              <ul className="list-disc pl-5 text-[14px] leading-[1.5] text-[#BCC1B6] space-y-2">
                <li>
                  <span className="font-medium text-[#DDE0DA]">Support!:</span> Real people real value. Find creators sharing knowledge
                  and experiences for the new digital era.
                </li>
                <li>
                  <span className="font-medium text-[#DDE0DA]">Enjoy the journey!:</span> Discover Web3 skills and inspiration — from
                  streamers and models to musicians, educators, coaches, and influencers.
                </li>
                <li>Contribute to the culture, be part of the style.</li>
              </ul>
              <div className="mt-4">
                <Link
                  href="#explore"
                  className="inline-flex items-center gap-2 rounded-[16px] border border-[#FFD700] px-4 py-2 text-sm font-medium text-[#FFD700] transition hover:-translate-y-[1px] hover:bg-[#FFD700]/10"
                >
                  Discover Creators
                </Link>
              </div>
            </div>

            <div className="rounded-[16px] bg-card border border-white/10 p-6 md:p-8 flex items-center justify-center min-h-[200px]">
              <div className="flex w-full justify-around items-start text-center">
                <div className="flex flex-col items-center gap-2">
                  <HandCoins size={48} className="text-[#FFD700]" strokeWidth={1.5} />
                  <span className="text-sm font-semibold text-[#DDE0DA]">TIP IT</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <UserPlus size={48} className="text-[#FFD700]" strokeWidth={1.5} />
                  <span className="text-sm font-semibold text-[#DDE0DA]">JOIN</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Users size={48} className="text-[#FFD700]" strokeWidth={1.5} />
                  <span className="text-sm font-semibold text-[#DDE0DA]">CONTRIBUTE</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center my-12">
          <div className="h-px bg-gradient-to-r from-transparent via-[#FFD700]/30 to-transparent w-full max-w-md"></div>
        </div>

        {/* ===== For Creators ===== */}
        <div id="creators" className="scroll-mt-20">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-[#FFD700] mb-2">For Creators</h3>
            <p className="text-lg text-[#BCC1B6]">
              Focus on creating, we'll handle the rest.
            </p>
          </div>

          {/* Row 3: Build Your Space (card left, text right) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:items-start mb-8">
            <div className="rounded-[16px] bg-card border border-white/10 p-6 md:p-8 flex items-center justify-center min-h-[200px]">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-[#FFD700] mb-2">1</div>
                <div className="text-xl font-semibold text-[#FFD700]">Build Your Space</div>
              </div>
            </div>

            <div className="bg-card rounded-[16px] border border-white/10 p-6 md:p-8">
              <h4 className="mb-3 text-lg font-semibold leading-[1.5]">Build Your Space</h4>
              <ul className="list-disc pl-5 text-[14px] leading-[1.5] text-[#BCC1B6] space-y-2">
                <li>
                  <span className="font-medium text-[#DDE0DA]">Ownership:</span> Editable avatar, bio, animated/static cover. No
                  third-party integrations — 100% creator-owned space.
                </li>
                <li>
                  <span className="font-medium text-[#DDE0DA]">Engagement:</span> Shareable widget (iframe), QR code, dynamic
                  OpenGraph cards, social links: X, Instagram, YouTube, Discord, Telegram, perfect for bios, stories,
                  and link-in-bio tools.
                </li>
                <li>
                  <span className="font-medium text-[#DDE0DA]">Usability:</span> Clean Web3 UI with responsive layout, hover effects,
                  microanimations, color themes, works out of the box - no coding needed.
                </li>
              </ul>
            </div>
          </div>

          {/* Row 4: Grow Your Community (text left, card right) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:items-start">
            <div className="bg-card rounded-[16px] border border-white/10 p-6 md:p-8">
              <h4 className="mb-3 text-lg font-semibold leading-[1.5]">Grow Your Community</h4>
              <ul className="list-disc pl-5 text-[14px] leading-[1.5] text-[#BCC1B6] space-y-2">
                <li>
                  <span className="font-medium text-[#DDE0DA]">Flexibility:</span> One-time tips with custom presets, fundraising goals
                  with progress bars and deadlines, monthly subscriptions with customizable tiers.
                </li>
                <li>
                  <span className="font-medium text-[#DDE0DA]">Accessibility:</span> No login required, no crypto wallet needed —
                  built-in on-ramp, instant access via sharable links and QR codes.
                </li>
                <li>
                  <span className="font-medium text-[#DDE0DA]">Shareability:</span> Goal tracking that shows real impact, subscriptions
                  that build loyalty and community.
                </li>
              </ul>
              <div className="mt-4">
                <Link
                  href="#join"
                  className="inline-flex items-center gap-2 rounded-[16px] bg-[#FFD700] text-[#003737] px-4 py-2 text-sm font-semibold transition hover:-translate-y-[1px] hover:shadow-lg"
                >
                  Join as a Creator
                </Link>
              </div>
            </div>

            <div className="rounded-[16px] bg-card border border-white/10 p-6 md:p-8 flex items-center justify-center min-h-[200px]">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-[#FFD700] mb-2">2</div>
                <div className="text-xl font-semibold text-[#FFD700]">Grow Your Community</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}