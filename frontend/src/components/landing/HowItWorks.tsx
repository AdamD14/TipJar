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
} from 'lucide-react';
import Button from '@/components/ui/buttons/Button';

type LucideIcon = React.ComponentType<React.SVGProps<SVGSVGElement> & { size?: number | string }>;

interface BentoCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  accent?: 'gold' | 'purple' | 'teal';
  span?: string;
}

const accentStyles = {
  gold: {
    iconBg: 'bg-gold-400/10 group-hover:bg-gold-400/20',
    iconText: 'text-gold-400',
    border: 'hover:border-gold-400/40',
    glow: 'hover:shadow-[0_0_0_4px_rgba(255,215,0,0.08)_inset]',
  },
  purple: {
    iconBg: 'bg-purple-300/10 group-hover:bg-purple-300/20',
    iconText: 'text-purple-300',
    border: 'hover:border-purple-300/40',
    glow: 'hover:shadow-[0_0_0_4px_rgba(77,25,77,0.15)_inset]',
  },
  teal: {
    iconBg: 'bg-teal-300/10 group-hover:bg-teal-300/20',
    iconText: 'text-teal-300',
    border: 'hover:border-teal-300/40',
    glow: 'hover:shadow-[0_0_0_4px_rgba(63,181,181,0.10)_inset]',
  },
};

function BentoCard({ icon: Icon, title, description, accent = 'gold', span }: BentoCardProps) {
  const s = accentStyles[accent];
  return (
    <article
      className={`group rounded-xl border border-white/10 bg-surface-base/60 backdrop-blur-sm p-6
        transition-all duration-200 ease-standard
        ${s.border} ${s.glow}
        hover:-translate-y-0.5
        ${span ?? ''}`}
    >
      <div className="flex flex-col gap-4">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors duration-200 ${s.iconBg}`}
        >
          <Icon size={20} className={s.iconText} />
        </div>
        <div>
          <h3 className="text-lg font-heading font-semibold text-text-ds-secondary uppercase tracking-wide">
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
    accent: 'teal',
    span: 'md:col-span-1',
  },
  {
    icon: Wallet,
    title: 'Top Up',
    description:
      'Fund your tips — add or buy USDC using crypto or your preferred payment method.',
    accent: 'gold',
    span: 'md:col-span-1',
  },
  {
    icon: Compass,
    title: 'Explore',
    description: 'Discover creators sharing knowledge and experiences for the new digital era.',
    accent: 'purple',
    span: 'md:col-span-1',
  },
  {
    icon: Heart,
    title: 'Support',
    description:
      'Real people, real value. Send one-time tips or set up recurring support for creators you love.',
    accent: 'gold',
    span: 'md:col-span-2',
  },
  {
    icon: Sparkles,
    title: 'Enjoy the Journey',
    description:
      'From streamers and models to musicians, educators, coaches, and influencers — find your community.',
    accent: 'teal',
    span: 'md:col-span-1',
  },
];

const creatorSteps: BentoCardProps[] = [
  {
    icon: Palette,
    title: 'Ownership',
    description:
      'Editable avatar, bio, and animated/static cover. No third-party integrations. 100% creator-owned space.',
    accent: 'gold',
    span: 'md:col-span-1',
  },
  {
    icon: Share2,
    title: 'Engagement',
    description:
      'Shareable widget (iframe), QR codes, dynamic Open Graph cards, and social links (X, Instagram, YouTube, Discord, Telegram).',
    accent: 'purple',
    span: 'md:col-span-2',
  },
  {
    icon: LayoutGrid,
    title: 'Usability',
    description:
      'Clean Web3 UI with a responsive layout, hover effects, micro-animations, and themes; works out of the box, no code needed.',
    accent: 'teal',
    span: 'md:col-span-1',
  },
  {
    icon: QrCode,
    title: 'Accessibility',
    description: 'Instant, borderless access via shareable links and QR codes.',
    accent: 'gold',
    span: 'md:col-span-1',
  },
  {
    icon: Layers,
    title: 'Flexibility',
    description:
      'One-time tips with presets, fundraising goals with progress bars and deadlines, and monthly subscriptions with customizable tiers.',
    accent: 'purple',
    span: 'md:col-span-1',
  },
  {
    icon: TrendingUp,
    title: 'Shareability',
    description:
      'Goal tracking that shows real impact, plus subscriptions and milestones that build loyalty and community.',
    accent: 'teal',
    span: 'md:col-span-1',
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative py-20 md:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden
      >
        <div className="absolute inset-0 bg-[radial-gradient(800px_500px_at_50%_0%,rgba(255,215,0,0.06)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(600px_400px_at_80%_100%,rgba(77,25,77,0.08)_0%,transparent_55%)]" />
      </div>

      <div className="mx-auto max-w-[1600px] px-4 md:px-8">
        <div className="mb-14 text-center">
          <h2 className="text-[length:var(--fs-h1)] font-heading font-bold text-text-ds-primary">
            How It Works
          </h2>
          <p className="mt-3 text-lg text-text-ds-tertiary font-body max-w-2xl mx-auto">
            Whether you&apos;re supporting creators or building your own presence — TipJar+ makes Web3 simple.
          </p>
        </div>

        {/* Fans */}
        <div className="mb-16">
          <h3 className="mb-8 flex items-center gap-3 text-xl font-heading font-semibold text-purple-300">
            <Users size={22} className="text-purple-300" />
            For Fans
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {fanSteps.map((step) => (
              <BentoCard key={step.title} {...step} />
            ))}
          </div>
        </div>

        {/* Creators */}
        <div className="mb-14">
          <h3 className="mb-8 flex items-center gap-3 text-xl font-heading font-semibold text-gold-400">
            <Sparkles size={22} className="text-gold-400" />
            For Creators
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {creatorSteps.map((step) => (
              <BentoCard key={step.title} {...step} />
            ))}
          </div>
        </div>

        {/* Bottom CTAs */}
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Button variant="secondary" href="/signup">
            Sign up as a Fan
          </Button>
          <Button variant="primary" href="/register">
            Join as a Creator
          </Button>
        </div>
      </div>
    </section>
  );
}
