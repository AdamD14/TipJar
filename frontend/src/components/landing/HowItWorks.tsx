'use client';

import {
  UserPlus,
  Wallet,
  Compass,
  Heart,
  Sparkles,
  Users,
  Palette,
  Share2,
  LayoutGrid,
  QrCode,
  Layers,
  TrendingUp,
  HandHeart,
} from 'lucide-react';
import Button from '@/components/ui/buttons/Button';

type LucideIcon = React.ComponentType<React.SVGProps<SVGSVGElement> & { size?: number | string }>;

interface BentoCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

function BentoCard({ icon: Icon, title, description }: BentoCardProps) {
  return (
    <article
      className="group rounded-lg border border-border-subtle bg-surface-base p-6 shadow-1
        transition-all duration-300 ease-standard
        hover:border-gold-400/60 hover:shadow-2 hover:shadow-gold-glow hover:-translate-y-1.5"
    >
      <div className="flex flex-col gap-4">
        <div
          className="flex h-8 w-8 items-center justify-center rounded bg-gold-400/10 transition-colors duration-300 group-hover:bg-gold-400/20"
        >
          <Icon size={20} className="text-gold-400" />
        </div>
        <div>
          <h3 className="text-lg font-heading font-semibold text-text-ds-secondary">
            {title}
          </h3>
          <p className="mt-1.5 text-base leading-relaxed text-text-ds-tertiary font-body">
            {description}
          </p>
        </div>
      </div>
    </article>
  );
}

const fanSteps: BentoCardProps[] = [
  {
    icon: UserPlus,
    title: 'Sign Up',
    description:
      'Use email, Google, Twitch, or MetaMask. Registration is optional — you can tip without an account.',
  },
  {
    icon: Wallet,
    title: 'Top Up',
    description:
      'Fund your tips — add or buy USDC using crypto or your preferred payment method.',
  },
  {
    icon: Compass,
    title: 'Explore',
    description: 'Discover creators sharing knowledge and experiences for the new digital era.',
  },
  {
    icon: Heart,
    title: 'Support',
    description:
      'Real people, real value. Send one-time tips or set up recurring support for creators you love.',
  },
  {
    icon: Sparkles,
    title: 'Enjoy the Journey',
    description:
      'From streamers and models to musicians, educators, coaches, and influencers — find your community.',
  },
  {
    icon: HandHeart,
    title: 'Contribute',
    description: 'Contribute to the culture, be part of the style.',
  },
];

const creatorSteps: BentoCardProps[] = [
  {
    icon: Palette,
    title: 'Ownership',
    description:
      'Editable avatar, bio, and animated/static cover. No third-party integrations. 100% creator-owned space.',
  },
  {
    icon: Share2,
    title: 'Engagement',
    description:
      'Shareable widget (iframe), QR codes, dynamic Open Graph cards, and social links (X, Instagram, YouTube, Discord, Telegram).',
  },
  {
    icon: LayoutGrid,
    title: 'Usability',
    description:
      'Clean Web3 UI with a responsive layout, hover effects, micro-animations, and themes; works out of the box, no code needed.',
  },
  {
    icon: QrCode,
    title: 'Accessibility',
    description: 'Instant, borderless access via shareable links and QR codes.',
  },
  {
    icon: Layers,
    title: 'Flexibility',
    description:
      'One-time tips with presets, fundraising goals with progress bars and deadlines, and monthly subscriptions with customizable tiers.',
  },
  {
    icon: TrendingUp,
    title: 'Shareability',
    description:
      'Goal tracking that shows real impact, plus subscriptions and milestones that build loyalty and community.',
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative w-full min-h-screen"
    >
      <img
        src="/how.webp"
        alt=""
        className="pointer-events-none absolute inset-0 -z-10 w-full h-full object-cover"
      />

      <div className="relative z-10 w-full min-h-screen py-20 px-4 md:px-8">
        <div className="w-full h-full flex flex-col justify-center gap-10 md:gap-16 lg:gap-20">

          <h2 className="text-center font-heading text-2xl lg:text-3xl text-text-ds-quaternary font-semibold">
            how it works ?
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 lg:gap-16">

            {/* For Fans */}
            <div>
              <h3 className="mb-8 flex items-center gap-3 text-xl font-heading font-semibold text-gold-400">
                <Users size={22} className="text-gold-400" />
                For Fans
              </h3>
              <div className="grid grid-cols-2 gap-5">
                {fanSteps.map((step) => (
                  <BentoCard key={step.title} {...step} />
                ))}
              </div>
              <div className="mt-6">
                <Button variant="secondary" href="/signup">
                  Sign up as a Fan
                </Button>
              </div>
            </div>

            {/* For Creators */}
            <div>
              <h3 className="mb-8 flex items-center gap-3 text-xl font-heading font-semibold text-gold-400">
                <Sparkles size={22} className="text-gold-400" />
                For Creators
              </h3>
              <div className="grid grid-cols-2 gap-5">
                {creatorSteps.map((step) => (
                  <BentoCard key={step.title} {...step} />
                ))}
              </div>
              <div className="mt-6">
                <Button variant="primary" href="/register">
                  Join as a Creator
                </Button>
              </div>
            </div>

          </div>

          {/* Navigation arrows */}
          <div className="w-full mt-6">
            <div className="flex items-center justify-between">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                aria-label="Back to top"
                title="Back to top"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="h-12 w-12 rounded-full border border-text-ds-tertiary/60 text-text-ds-tertiary hover:brightness-[1.15] hover:bg-white/10"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 19V5" />
                  <path d="M5 12l7-7 7 7" />
                </svg>
              </Button>

              <Button
                type="button"
                variant="ghost"
                size="sm"
                aria-label="Scroll to next section"
                title="See more"
                onClick={() => document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' })}
                className="h-12 w-12 rounded-full border border-text-ds-tertiary/60 text-text-ds-tertiary hover:brightness-[1.15] hover:bg-white/10"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14" />
                  <path d="M19 12l-7 7-7-7" />
                </svg>
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}