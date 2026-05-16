// components/landing/HowItWorks.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Script from 'next/script';
import PrimaryCta from '@/components/ui/buttons/PrimaryCta';
import SecondaryCta from '@/components/ui/buttons/SecondaryCta';
import Button from '@/components/ui/buttons/Button';

type Tab = 'fans' | 'creators';

export default function HowItWorks() {
  const [tab, setTab] = useState<Tab>('fans');
  const [iconsLoaded, setIconsLoaded] = useState(false);

  useEffect(() => {
    if (iconsLoaded && typeof window !== 'undefined') {
      const icons = document.querySelectorAll('lord-icon');
      icons.forEach(icon => {
        // @ts-expect-error - lord-icon is a custom web component with trigger method
        icon?.trigger?.('loop');
      });
    }
  }, [iconsLoaded, tab]);

  return (
    <>
      <Script
        src="https://cdn.lordicon.com/lordicon.js"
        strategy="afterInteractive"
        onLoad={() => setIconsLoaded(true)}
      />

      <section id="how-it-works" className="relative min-h-screen py-16 md:py-20">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <Image
            src="/3.png"
            alt=""
            fill
            priority
            sizes="100vw"
            quality={90}
            className="object-cover rounded-2xl pointer-events-none select-none"
          />
        </div>

        <div className="mx-auto max-w-[1600px] px-4 md:px-8 text-text-ds-secondary">

          {/* Mobile Tabs */}
          <div className="mb-8 flex justify-center lg:hidden">
            <div className="inline-flex gap-2">
              <Button
                type="button"
                variant={tab === 'fans' ? 'outline' : 'ghost'}
                size="sm"
                onClick={() => setTab('fans')}
                className={`px-8 py-3 text-lg font-heading font-semibold rounded-[16px] transition-all duration-300 ${
                  tab === 'fans'
                    ? 'text-purple-300 ring-2 ring-purple-300'
                    : 'text-text-ds-tertiary hover:bg-purple-300/10 hover:text-purple-300'
                }`}
              >
                For Fans
              </Button>

              <Button
                type="button"
                variant={tab === 'creators' ? 'gold' : 'ghost'}
                size="sm"
                onClick={() => setTab('creators')}
                className={`px-8 py-3 text-base font-heading font-semibold rounded-[16px] transition-all duration-300 ${
                  tab === 'creators'
                    ? 'ring-2 ring-gold-400'
                    : 'text-text-ds-tertiary hover:bg-gold-400/10 hover:text-gold-400'
                }`}
              >
                For Creators
              </Button>
            </div>
          </div>

          {/* Desktop: Both sections side by side */}
          <div className="hidden lg:grid lg:grid-cols-2 lg:gap-12">
            <div>
              <div className="flex justify-center mb-8">
                <h2 className="text-3xl xl:text-4xl font-heading font-bold text-purple-300 border-2 border-purple-300 bg-transparent rounded-[16px] py-3 px-8">
                  For Fans
                </h2>
              </div>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <TileCard
                  icon="https://cdn.lordicon.com/bhfjfgqz.json"
                  title="Sign Up"
                  description="Use email, Google, Twitch, or MetaMask. Registration isn't required to send tips."
                />

                <TileCard
                  icon="https://cdn.lordicon.com/qhviklyi.json"
                  title="Top Up"
                  description="Fund Your Tips — add or buy USDC using crypto or your preferred payment method."
                />

                <TileCard
                  icon="https://cdn.lordicon.com/nzixoeyk.json"
                  title="Explore!"
                  description="Fuel the movement."
                />

                <TileCard
                  icon="https://cdn.lordicon.com/ehfubvwr.json"
                  title="Support!"
                  description="Real people real value. Find creators sharing knowledge and experiences for the new digital era."
                />

                <TileCard
                  icon="https://cdn.lordicon.com/wpyrrmcq.json"
                  title="Enjoy the journey!"
                  description="Discover Web3 skills and inspiration — from streamers and models to musicians, educators, coaches, and influencers."
                />

                <TileCard
                  icon="https://cdn.lordicon.com/fgkmrslx.json"
                  title="Contribute"
                  description="Contribute to the culture, be part of the style."
                />
              </div>
            </div>

            <div>
              <div className="flex justify-center mb-8">
                <h2 className="text-3xl xl:text-4xl font-heading font-bold text-gold-400 border-2 border-gold-400 bg-transparent rounded-[16px] py-3 px-8">
                  For Creators
                </h2>
              </div>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <TileCard
                  icon="https://cdn.lordicon.com/kthelypq.json"
                  title="Ownership"
                  description="Editable avatar, bio, and animated/static cover. No third-party integrations. 100% creator-owned space."
                />

                <TileCard
                  icon="https://cdn.lordicon.com/pcllgpqm.json"
                  title="Engagement"
                  description="Shareable widget (iframe), QR codes, dynamic Open Graph cards, and social links (X, Instagram, YouTube, Discord, Telegram)."
                />

                <TileCard
                  icon="https://cdn.lordicon.com/vuiggmtc.json"
                  title="Usability"
                  description="Clean Web3 UI with a responsive layout, hover effects, micro-animations, and themes; works out of the box, no code needed."
                />

                <TileCard
                  icon="https://cdn.lordicon.com/yeallgsa.json"
                  title="Accessibility"
                  description="Instant, borderless access via shareable links and QR codes."
                />

                <TileCard
                  icon="https://cdn.lordicon.com/ujxzdfjx.json"
                  title="Flexibility"
                  description="One-time tips with presets, fundraising goals with progress bars and deadlines, and monthly subscriptions with customizable tiers."
                />

                <TileCard
                  icon="https://cdn.lordicon.com/itykargr.json"
                  title="Shareability"
                  description="Goal tracking that shows real impact, plus subscriptions and milestones that build loyalty and community."
                />
              </div>
            </div>
          </div>

          {/* Mobile: Conditional content based on tab */}
          <div className="lg:hidden transition-all duration-500">
            {tab === 'fans' ? <FansPanel /> : <CreatorsPanel />}
          </div>

          {/* Bottom CTAs */}
          <div className="mt-12 md:mt-16 flex items-center justify-center gap-4 flex-wrap">
            <SecondaryCta href="/signup">Sign up as a Fan</SecondaryCta>
            <PrimaryCta href="/register">Join as a Creator</PrimaryCta>
          </div>
        </div>
      </section>
    </>
  );
}

function FansPanel() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <TileCard
        icon="https://cdn.lordicon.com/bhfjfgqz.json"
        title="Sign Up"
        description="Use email, Google, Twitch, or MetaMask. Registration isn't required to send tips."
      />

      <TileCard
        icon="https://cdn.lordicon.com/qhviklyi.json"
        title="Top Up"
        description="Fund Your Tips — add or buy USDC using crypto or your preferred payment method."
      />

      <TileCard
        icon="https://cdn.lordicon.com/nzixoeyk.json"
        title="Explore!"
        description="Fuel the movement."
      />

      <TileCard
        icon="https://cdn.lordicon.com/ehfubvwr.json"
        title="Support!"
        description="Real people real value. Find creators sharing knowledge and experiences for the new digital era."
      />

      <TileCard
        icon="https://cdn.lordicon.com/wpyrrmcq.json"
        title="Enjoy the journey!"
        description="Discover Web3 skills and inspiration — from streamers and models to musicians, educators, coaches, and influencers."
      />

      <TileCard
        icon="https://cdn.lordicon.com/fgkmrslx.json"
        title="Contribute"
        description="Contribute to the culture, be part of the style."
      />
    </div>
  );
}

function CreatorsPanel() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <TileCard
        icon="https://cdn.lordicon.com/kthelypq.json"
        title="Ownership"
        description="Editable avatar, bio, and animated/static cover. No third-party integrations. 100% creator-owned space."
      />

      <TileCard
        icon="https://cdn.lordicon.com/pcllgpqm.json"
        title="Engagement"
        description="Shareable widget (iframe), QR codes, dynamic Open Graph cards, and social links (X, Instagram, YouTube, Discord, Telegram)."
      />

      <TileCard
        icon="https://cdn.lordicon.com/vuiggmtc.json"
        title="Usability"
        description="Clean Web3 UI with a responsive layout, hover effects, micro-animations, and themes; works out of the box, no code needed."
      />

      <TileCard
        icon="https://cdn.lordicon.com/yeallgsa.json"
        title="Accessibility"
        description="Instant, borderless access via shareable links and QR codes."
      />

      <TileCard
        icon="https://cdn.lordicon.com/ujxzdfjx.json"
        title="Flexibility"
        description="One-time tips with presets, fundraising goals with progress bars and deadlines, and monthly subscriptions with customizable tiers."
      />

      <TileCard
        icon="https://cdn.lordicon.com/itykargr.json"
        title="Shareability"
        description="Goal tracking that shows real impact, plus subscriptions and milestones that build loyalty and community."
      />
    </div>
  );
}

function TileCard({
  icon,
  title,
  description
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <article className="group rounded-xl border border-white/10 bg-black/40 backdrop-blur-sm p-6 transition-all duration-300 hover:border-gold-400/60 hover:shadow-[0_0_0_4px_rgba(255,215,0,0.10)_inset]">
      <div className="flex flex-col items-center text-center space-y-3">
        <div className="w-8 h-8 bg-gold-400/10 rounded flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-gold-400/20">
          {/* @ts-expect-error - lord-icon is a custom web component */}
          <lord-icon
            src={icon}
            trigger="loop"
            colors="primary:#FFD700,secondary:#FFA500"
            style={{ width: '20px', height: '20px' }}
          />
        </div>

        <h3 className="text-lg sm:text-lg md:text-lg lg:text-xl font-heading font-semibold text-text-ds-secondary uppercase">
          {title}
        </h3>

        <p className="text-base md:text-base lg:text-md text-text-ds-tertiary leading-relaxed font-body">
          {description}
        </p>
      </div>
    </article>
  );
}
