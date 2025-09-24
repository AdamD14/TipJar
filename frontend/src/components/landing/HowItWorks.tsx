// components/landing/HowItWorks.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Script from 'next/script';
import PrimaryCta from '@/components/cta/PrimaryCta';
import SecondaryCta from '@/components/cta/SecondaryCta';

type Tab = 'fans' | 'creators';

export default function HowItWorks() {
  const [tab, setTab] = useState<Tab>('fans');
  const [iconsLoaded, setIconsLoaded] = useState(false);

  useEffect(() => {
    // Trigger icon animations when loaded
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
      
      <section id="how-it-works" className="relative py-12 md:py-16">
        {/* Full-bleed background */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <Image 
            src="/3.png" 
            alt="" 
            fill 
            sizes="100vw" 
            className="object-cover" 
            priority
          />
          {/* Gradient overlay for better readability */}
          <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_0%,rgba(0,0,0,.45),transparent_60%),linear-gradient(180deg,rgba(0,0,0,.35),rgba(0,0,0,.1))]" />
        </div>

        <div className="mx-auto max-w-[1480px] px-4 text-[#DDE0DA]">
          {/* Tabs */}
          <div className="mb-10 flex justify-center">
            <div className="inline-flex rounded-[16px] border-2 border-[#FFD700]/30 bg-card/80 backdrop-blur-md p-1 shadow-lg">
              <button
                type="button"
                onClick={() => setTab('fans')}
                className={`px-5 py-2.5 text-sm md:text-base font-semibold rounded-[12px] transition-all ${
                  tab === 'fans'
                    ? 'bg-[#FFD700] text-[#003737] shadow'
                    : 'hover:bg-[#FFD700]/10 hover:text-[#FFD700]'
                }`}
              >
                For Fans
              </button>
              <button
                type="button"
                onClick={() => setTab('creators')}
                className={`px-5 py-2.5 text-sm md:text-base font-semibold rounded-[12px] transition-all ${
                  tab === 'creators'
                    ? 'bg-[#FFD700] text-[#003737] shadow'
                    : 'hover:bg-[#FFD700]/10 hover:text-[#FFD700]'
                }`}
              >
                For Creators
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="transition-all duration-500">
            {tab === 'fans' ? <FansPanel /> : <CreatorsPanel />}
          </div>

          {/* Bottom CTAs - conditional based on tab */}
          <div className="mt-10 md:mt-12 flex items-center justify-center">
            {tab === 'fans' ? (
              <SecondaryCta href="/signup">Sign up as a Fan</SecondaryCta>
            ) : (
              <PrimaryCta href="/register">Join as a Creator</PrimaryCta>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function FansPanel() {
  return (
    <div className="space-y-8">
      {/* Steps with animated icons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StepCard 
          number="1"
          title="Register & Connect"
          iconUrl="https://cdn.lordicon.com/bhfjfgqz.json"
          iconColors="primary:#FFD700,secondary:#FFA500"
        >
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              {/* @ts-expect-error - lord-icon is a custom web component not recognized by TypeScript */}
              <lord-icon
                src="https://cdn.lordicon.com/jqeuwnmb.json"
                trigger="loop"
                colors="primary:#FFD700"
                style={{ width: '20px', height: '20px' }}
              />
              <span>Sign up with Email, Google, or Twitch</span>
            </li>
            <li className="flex items-start gap-2">
              {/* @ts-expect-error - lord-icon is a custom web component not recognized by TypeScript */}
              <lord-icon
                src="https://cdn.lordicon.com/qhpibbhd.json"
                trigger="loop"
                colors="primary:#FFD700"
                style={{ width: '20px', height: '20px' }}
              />
              <span>Connect your crypto wallet (optional)</span>
            </li>
            <li className="flex items-start gap-2">
              {/* @ts-expect-error - lord-icon is a custom web component not recognized by TypeScript */}
              <lord-icon
                src="https://cdn.lordicon.com/kbtmbyzy.json"
                trigger="loop"
                colors="primary:#FFD700"
                style={{ width: '20px', height: '20px' }}
              />
              <span>Get instant USDC wallet</span>
            </li>
          </ul>
        </StepCard>

        <StepCard 
          number="2"
          title="Fund Your Account"
          iconUrl="https://cdn.lordicon.com/qhviklyi.json"
          iconColors="primary:#FFD700,secondary:#FFA500"
        >
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              {/* @ts-expect-error - lord-icon is a custom web component not recognized by TypeScript */}
              <lord-icon
                src="https://cdn.lordicon.com/ujxzdfjx.json"
                trigger="loop"
                colors="primary:#FFD700"
                style={{ width: '20px', height: '20px' }}
              />
              <span>Buy USDC with card or Apple Pay</span>
            </li>
            <li className="flex items-start gap-2">
              {/* @ts-expect-error - lord-icon is a custom web component not recognized by TypeScript */}
              <lord-icon
                src="https://cdn.lordicon.com/rgyftmhc.json"
                trigger="loop"
                colors="primary:#FFD700"
                style={{ width: '20px', height: '20px' }}
              />
              <span>Transfer from external wallet</span>
            </li>
            <li className="flex items-start gap-2">
              {/* @ts-expect-error - lord-icon is a custom web component not recognized by TypeScript */}
              <lord-icon
                src="https://cdn.lordicon.com/vfczflna.json"
                trigger="loop"
                colors="primary:#FFD700"
                style={{ width: '20px', height: '20px' }}
              />
              <span>Bank transfer via Circle</span>
            </li>
          </ul>
        </StepCard>

        <StepCard 
          number="3"
          title="Support & Engage"
          iconUrl="https://cdn.lordicon.com/uukerzzv.json"
          iconColors="primary:#FFD700,secondary:#FFA500"
        >
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              {/* @ts-expect-error - lord-icon is a custom web component not recognized by TypeScript */}
              <lord-icon
                src="https://cdn.lordicon.com/ehfubvwr.json"
                trigger="loop"
                colors="primary:#FFD700"
                style={{ width: '20px', height: '20px' }}
              />
              <span>Send instant tips to creators</span>
            </li>
            <li className="flex items-start gap-2">
              {/* @ts-expect-error - lord-icon is a custom web component not recognized by TypeScript */}
              <lord-icon
                src="https://cdn.lordicon.com/aycieyht.json"
                trigger="loop"
                colors="primary:#FFD700"
                style={{ width: '20px', height: '20px' }}
              />
              <span>Subscribe for monthly support</span>
            </li>
            <li className="flex items-start gap-2">
              {/* @ts-expect-error - lord-icon is a custom web component not recognized by TypeScript */}
              <lord-icon
                src="https://cdn.lordicon.com/kfzfxczd.json"
                trigger="loop"
                colors="primary:#FFD700"
                style={{ width: '20px', height: '20px' }}
              />
              <span>Track your impact & rewards</span>
            </li>
          </ul>
        </StepCard>
      </div>

      {/* Feature highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        <FeatureCard icon="https://cdn.lordicon.com/nzixoeyk.json" title="No Crypto Knowledge" />
        <FeatureCard icon="https://cdn.lordicon.com/wpyrrmcq.json" title="Instant Delivery" />
        <FeatureCard icon="https://cdn.lordicon.com/fgkmrslx.json" title="Global Access" />
        <FeatureCard icon="https://cdn.lordicon.com/jfhbogmw.json" title="Low Fees (5%)" />
      </div>
    </div>
  );
}

function CreatorsPanel() {
  return (
    <div className="space-y-8">
      {/* Steps with animated icons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StepCard 
          number="1"
          title="Create Your Profile"
          iconUrl="https://cdn.lordicon.com/kthelypq.json"
          iconColors="primary:#FFD700,secondary:#FFA500"
        >
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              {/* @ts-expect-error - lord-icon is a custom web component not recognized by TypeScript */}
              <lord-icon
                src="https://cdn.lordicon.com/bfqckgdm.json"
                trigger="loop"
                colors="primary:#FFD700"
                style={{ width: '20px', height: '20px' }}
              />
              <span>Custom URL & branding</span>
            </li>
            <li className="flex items-start gap-2">
              {/* @ts-expect-error - lord-icon is a custom web component not recognized by TypeScript */}
              <lord-icon
                src="https://cdn.lordicon.com/pflszboa.json"
                trigger="loop"
                colors="primary:#FFD700"
                style={{ width: '20px', height: '20px' }}
              />
              <span>Add bio, avatar & cover</span>
            </li>
            <li className="flex items-start gap-2">
              {/* @ts-expect-error - lord-icon is a custom web component not recognized by TypeScript */}
              <lord-icon
                src="https://cdn.lordicon.com/rehjpyyh.json"
                trigger="loop"
                colors="primary:#FFD700"
                style={{ width: '20px', height: '20px' }}
              />
              <span>Set goals & tiers</span>
            </li>
          </ul>
        </StepCard>

        <StepCard 
          number="2"
          title="Share & Grow"
          iconUrl="https://cdn.lordicon.com/pcllgpqm.json"
          iconColors="primary:#FFD700,secondary:#FFA500"
        >
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              {/* @ts-expect-error - lord-icon is a custom web component not recognized by TypeScript */}
              <lord-icon
                src="https://cdn.lordicon.com/vuiggmtc.json"
                trigger="loop"
                colors="primary:#FFD700"
                style={{ width: '20px', height: '20px' }}
              />
              <span>Generate QR codes & widgets</span>
            </li>
            <li className="flex items-start gap-2">
              {/* @ts-expect-error - lord-icon is a custom web component not recognized by TypeScript */}
              <lord-icon
                src="https://cdn.lordicon.com/kipaqhoz.json"
                trigger="loop"
                colors="primary:#FFD700"
                style={{ width: '20px', height: '20px' }}
              />
              <span>Stream overlays & alerts</span>
            </li>
            <li className="flex items-start gap-2">
              {/* @ts-expect-error - lord-icon is a custom web component not recognized by TypeScript */}
              <lord-icon
                src="https://cdn.lordicon.com/veoexymv.json"
                trigger="loop"
                colors="primary:#FFD700"
                style={{ width: '20px', height: '20px' }}
              />
              <span>Social media integration</span>
            </li>
          </ul>
        </StepCard>

        <StepCard 
          number="3"
          title="Earn & Withdraw"
          iconUrl="https://cdn.lordicon.com/itykargr.json"
          iconColors="primary:#FFD700,secondary:#FFA500"
        >
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              {/* @ts-expect-error - lord-icon is a custom web component not recognized by TypeScript */}
              <lord-icon
                src="https://cdn.lordicon.com/yeallgsa.json"
                trigger="loop"
                colors="primary:#FFD700"
                style={{ width: '20px', height: '20px' }}
              />
              <span>Instant USDC payments</span>
            </li>
            <li className="flex items-start gap-2">
              {/* @ts-expect-error - lord-icon is a custom web component not recognized by TypeScript */}
              <lord-icon
                src="https://cdn.lordicon.com/tftaqjwp.json"
                trigger="loop"
                colors="primary:#FFD700"
                style={{ width: '20px', height: '20px' }}
              />
              <span>Convert to local currency</span>
            </li>
            <li className="flex items-start gap-2">
              {/* @ts-expect-error - lord-icon is a custom web component not recognized by TypeScript */}
              <lord-icon
                src="https://cdn.lordicon.com/xcxzayqr.json"
                trigger="loop"
                colors="primary:#FFD700"
                style={{ width: '20px', height: '20px' }}
              />
              <span>Detailed analytics</span>
            </li>
          </ul>
        </StepCard>
      </div>

      {/* Feature highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        <FeatureCard icon="https://cdn.lordicon.com/lenjvibx.json" title="100% Ownership" />
        <FeatureCard icon="https://cdn.lordicon.com/ofwpzftr.json" title="No Platform Lock" />
        <FeatureCard icon="https://cdn.lordicon.com/ujxzdfjx.json" title="Instant Payouts" />
        <FeatureCard icon="https://cdn.lordicon.com/xljvqlng.json" title="Global Reach" />
      </div>
    </div>
  );
}

function StepCard({ 
  number, 
  title, 
  iconUrl, 
  iconColors,
  children 
}: {
  number: string;
  title: string;
  iconUrl: string;
  iconColors: string;
  children: React.ReactNode;
}) {
  return (
    <article className="rounded-[16px] border border-white/10 bg-card p-6 md:p-7 transition hover:-translate-y-[2px] hover:border-[#FFD700]/60 hover:shadow-[0_0_0_4px_rgba(255,215,0,0.10)_inset] shadow-[inset_0_1px_0_rgba(255,255,255,.06),inset_0_-10px_16px_rgba(0,0,0,.35),0_10px_22px_rgba(0,0,0,.30)]">
      <div className="flex items-start gap-4 mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFD700]/10 ring-1 ring-[#FFD700]/30 shrink-0">
          <span className="text-[#FFD700] font-bold">{number}</span>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold leading-[1.5] mb-2">{title}</h3>
          {/* @ts-expect-error - lord-icon is a custom web component not recognized by TypeScript */}
          <lord-icon
            src={iconUrl}
            trigger="loop"
            colors={iconColors}
            style={{ width: '40px', height: '40px' }}
          />
        </div>
      </div>
      <div className="text-[14px] leading-[1.6] text-[#BCC1B6]">
        {children}
      </div>
    </article>
  );
}

function FeatureCard({ icon, title }: { icon: string; title: string }) {
  return (
    <div className="rounded-[12px] border border-white/10 bg-card/60 backdrop-blur p-4 hover:bg-card/80 hover:border-white/20 transition-all duration-300">
      <div className="flex items-center gap-3">
        {/* @ts-expect-error - lord-icon is a custom web component not recognized by TypeScript */}
        <lord-icon
          src={icon}
          trigger="loop"
          colors="primary:#FFD700,secondary:#FFA500"
          style={{ width: '28px', height: '28px' }}
        />
        <span className="text-sm font-medium text-[#DDE0DA]">{title}</span>
      </div>
    </div>
  );
}