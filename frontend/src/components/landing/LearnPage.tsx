// components/landing/LearnPage.tsx
'use client';

import Link from 'next/link';
import { useEffect, useState, type ElementType } from 'react';
import { Search, Clock, Shield, Zap, Globe, Coins, ArrowUp, BookOpen, ExternalLink } from 'lucide-react';
import Button from '@/components/ui/buttons/Button';
import Input from '@/components/ui/forms/Input';

const NAV = [
  { id: 'essentials', label: 'Essentials', icon: BookOpen },
  { id: 'advanced', label: 'Advanced', icon: Shield },
  { id: 'guides', label: 'Product guides', icon: ExternalLink },
] as const;

export default function LearnPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [readTopics, setReadTopics] = useState<Set<string>>(new Set());

  const markAsRead = (topicId: string) => {
    setReadTopics(prev => new Set([...prev, topicId]));
  };

  return (
    <main className="bg-gradient-main text-text-ds-secondary">
      <LearnHero searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="mx-auto grid max-w-[1480px] grid-cols-1 gap-8 px-4 py-8 lg:grid-cols-[280px_1fr]">
        <LearnNav readTopics={readTopics} />

        <div className="space-y-16">
          {/* Essentials */}
          <section id="essentials">
            <LearnEssentials
              searchTerm={searchTerm}
              onTopicRead={markAsRead}
              readTopics={readTopics}
            />
          </section>

          {/* Advanced */}
          <section id="advanced" aria-labelledby="advancedHeading" className="py-12 md:py-16">
            <h2 id="advancedHeading" className="mb-2 text-2xl md:text-3xl font-heading font-semibold">
              Advanced Topics
            </h2>
            <p className="mb-6 text-[14px] leading-[1.5] text-text-ds-tertiary font-body">
              Deep dive into smart contracts, security, and technical implementation details.
            </p>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <ArticleCard
                title="Smart Contracts & Security"
                readTime="8 min"
                description="How TipJar smart contracts work, security audits, and multi-sig protection for user funds."
                icon={Shield}
              />
              <ArticleCard
                title="On/Off-ramps & KYC"
                readTime="6 min"
                description="Circle's fiat on-ramps, verification requirements, limits, and compliance frameworks."
                icon={Globe}
              />
              <ArticleCard
                title="Multi-chain Strategy"
                readTime="10 min"
                description="Network selection, gas optimization, cross-chain bridging, and cost-effective routing."
                icon={Zap}
              />
              <ArticleCard
                title="Self-custody Best Practices"
                readTime="12 min"
                description="Hardware wallets, seed phrase security, multi-sig setups, and cold storage strategies."
                icon={Coins}
              />
            </div>
          </section>

          {/* Product guides */}
          <section id="guides" aria-labelledby="guidesHeading" className="py-12 md:py-16">
            <h2 id="guidesHeading" className="mb-2 text-2xl md:text-3xl font-heading font-semibold">
              Product Guides
            </h2>
            <p className="mb-6 text-[14px] leading-[1.5] text-text-ds-tertiary font-body">
              Step-by-step setup guides. Open the editor and configure elements in minutes.
            </p>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <GuideLink href="/creator-studio?tab=QR" title="QR Poster (A4)" readTime="3 min" />
              <GuideLink href="/creator-studio?tab=Overlay" title="Live Overlay" readTime="5 min" />
              <GuideLink href="/creator-studio?tab=Widget" title="Tip Widget" readTime="4 min" />
              <GuideLink href="/creator-studio?tab=TipModal" title="Tip Modal" readTime="3 min" />
              <GuideLink href="/creator-studio?tab=Presets" title="Custom Presets" readTime="6 min" />
              <GuideLink href="/creator-studio?tab=Profile" title="Goals & Fan Wall" readTime="8 min" />
            </div>
          </section>
        </div>
      </div>

      <BackToTop />
    </main>
  );
}

function LearnHero({ searchTerm, setSearchTerm }: {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}) {
  return (
    <section className="border-b border-white/10 bg-card/40">
      <div className="mx-auto max-w-[1480px] px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-heading font-semibold">Learn Web3 & TipJar</h1>
        <p className="mt-2 max-w-[780px] text-[14px] leading-[1.6] text-text-ds-tertiary font-body">
          Quick answers upfront. Expand for details without leaving the page.
          No jargon, just what you need to support creators and earn faster.
        </p>

        <div className="mt-6 max-w-md relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-ds-tertiary z-10" />
          <Input
            type="text"
            placeholder="Search topics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
    </section>
  );
}

function LearnNav({ readTopics }: { readTopics: Set<string> }) {
  const progressCount = readTopics.size;
  const totalTopics = 5;

  return (
    <nav className="lg:sticky lg:top-20 space-y-4">
      <div className="rounded-lg border border-white/10 bg-card p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-heading font-medium">Reading Progress</span>
          <span className="text-xs text-text-ds-tertiary font-body">{progressCount}/{totalTopics}</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2">
          <div
            className="bg-gold-400 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(progressCount / totalTopics) * 100}%` }}
          />
        </div>
      </div>

      <ul className="space-y-1">
        {NAV.map((n) => {
          const Icon = n.icon;
          return (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                className="flex items-center gap-3 rounded-[10px] border border-white/10 bg-card px-3 py-2 text-sm font-body text-text-ds-secondary hover:bg-white/5 transition-colors"
              >
                <Icon size={16} className="text-gold-400" />
                {n.label}
              </a>
            </li>
          );
        })}
      </ul>

      <div className="mt-3">
        <Button
          href="/"
          variant="outline"
          size="sm"
          fullWidth
          className="gap-2"
        >
          <ArrowUp size={14} className="rotate-180" />
          Back to Home
        </Button>
      </div>
    </nav>
  );
}

function ArticleCard({
  title,
  readTime,
  description,
  icon: Icon
}: {
  title: string;
  readTime: string;
  description: string;
  icon: ElementType;
}) {
  return (
    <article className="rounded-[16px] border border-white/10 bg-card p-4 md:p-6 hover:border-white/20 transition-colors">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-lg bg-gold-400/10 flex items-center justify-center shrink-0">
          <Icon size={20} className="text-gold-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-base font-heading font-semibold leading-[1.5] mb-1">{title}</h3>
          <div className="flex items-center gap-2 text-xs text-text-ds-tertiary font-body">
            <Clock size={12} />
            {readTime} read
          </div>
        </div>
      </div>

      <p className="text-[13px] leading-[1.6] text-text-ds-tertiary mb-4 font-body">
        {description}
      </p>

      <Button variant="link" size="sm" className="text-sm">
        Read article →
      </Button>
    </article>
  );
}

function GuideLink({ href, title, readTime }: { href: string; title: string; readTime: string }) {
  return (
    <Link
      href={href}
      className="block rounded-[16px] border border-white/10 bg-card p-4 transition-all hover:-translate-y-[1px] hover:border-white/20"
    >
      <div className="mb-2 text-base font-heading font-semibold leading-[1.5]">{title}</div>
      <div className="flex items-center gap-2 text-xs text-text-ds-tertiary font-body mb-2">
        <Clock size={12} />
        {readTime} setup
      </div>
      <div className="text-[13px] leading-[1.6] text-text-ds-tertiary mb-3 font-body">
        Open the editor and configure in a few steps with live preview.
      </div>
      <div className="inline-flex items-center gap-2 text-sm text-gold-400 font-body">
        Open guide <ExternalLink size={14} />
      </div>
    </Link>
  );
}

function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 300);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!show) return null;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={scrollToTop}
      aria-label="Back to top"
      className="fixed bottom-4 right-4 z-50 h-10 w-10 rounded-full border border-gold-400/60 bg-black/40 text-gold-400 backdrop-blur hover:-translate-y-[1px] hover:bg-black/60"
    >
      <ArrowUp size={16} />
    </Button>
  );
}

function LearnEssentials({
  searchTerm,
  onTopicRead,
  readTopics
}: {
  searchTerm: string;
  onTopicRead: (id: string) => void;
  readTopics: Set<string>;
}) {
  const topics = [
    {
      id: 'usdc',
      title: 'What is USDC? Why it matters',
      teaser: 'Fully-reserved stablecoin issued by Circle. 1 USDC ≈ 1 USD.',
      icon: Coins,
      readTime: '3 min',
      bullets: [
        'Stability for tips and payouts',
        'Fast settlement, global reach',
        'Works without a bank account',
      ],
      more: (
        <div className="space-y-2 font-body">
          <p>
            USDC is a regulated, fully-reserved stablecoin. Funds are redeemable for USD through
            licensed partners. It reduces volatility and enables instant, low-fee transfers.
          </p>
          <p className="text-gold-400">TipJar pays creators in USDC by default.</p>
        </div>
      ),
    },
    {
      id: 'wallets',
      title: 'Wallet basics: custody & safety',
      teaser: 'Two models: self-custody and custodial.',
      icon: Shield,
      readTime: '4 min',
      bullets: [
        'Self-custody: you own keys; back up seed',
        'Custodial: third party manages keys',
        'Never share seed phrase or private key',
      ],
      more: (
        <div className="space-y-2 font-body">
          <p>
            For beginners, start without a wallet. You can receive tips and later withdraw via
            on/off-ramps. When ready, use a reputable wallet and hardware device for larger balances.
          </p>
        </div>
      ),
    },
  ];

  const filteredTopics = topics.filter(topic =>
    topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    topic.teaser.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="essentials" aria-labelledby="essentialsHeading" className="py-12 md:py-16">
      <h2 id="essentialsHeading" className="mb-2 text-2xl md:text-3xl font-heading font-semibold">
        Essentials
      </h2>
      <p className="mb-6 text-[14px] leading-[1.5] text-text-ds-tertiary font-body">
        Short answers up front. Tap <span className="text-gold-400">More</span> to expand without leaving the page.
      </p>

      {filteredTopics.length === 0 ? (
        <div className="text-center py-8 text-text-ds-tertiary font-body">
          No topics found matching &quot;{searchTerm}&quot;
        </div>
      ) : (
        <div className="space-y-4">
          {filteredTopics.map((topic) => (
            <EssentialItem
              key={topic.id}
              topic={topic}
              onRead={onTopicRead}
              isRead={readTopics.has(topic.id)}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function EssentialItem({
  topic,
  onRead,
  isRead
}: {
  topic: {
    id: string;
    title: string;
    teaser: string;
    icon: ElementType;
    readTime: string;
    bullets: string[];
    more: React.ReactNode;
  };
  onRead: (id: string) => void;
  isRead: boolean;
}) {
  const [open, setOpen] = useState(false);
  const Icon = topic.icon;

  const copyAnchor = async () => {
    try {
      const href = `${location.origin}${location.pathname}#${topic.id}`;
      await navigator.clipboard.writeText(href);
    } catch (_: unknown) {
      // Clipboard API may not be available
    }
  };

  const handleToggle = () => {
    setOpen(!open);
    if (!open && !isRead) {
      onRead(topic.id);
    }
  };

  return (
    <article
      id={topic.id}
      className={`rounded-[16px] border border-white/10 bg-card p-4 md:p-6 transition-colors ${
        isRead ? 'border-gold-400/30' : ''
      }`}
    >
      <header className="mb-3 flex items-start justify-between gap-3">
        <div className="flex gap-3 flex-1">
          <div className="w-8 h-8 rounded-lg bg-gold-400/10 flex items-center justify-center shrink-0 mt-1">
            <Icon size={16} className="text-gold-400" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-base font-heading font-semibold leading-[1.5]">{topic.title}</h3>
              {isRead && (
                <div className="w-2 h-2 rounded-full bg-gold-400" title="Read" />
              )}
            </div>
            <p className="text-[13px] text-text-ds-tertiary mb-1 font-body">{topic.teaser}</p>
            <div className="flex items-center gap-2 text-xs text-text-ds-tertiary font-body">
              <Clock size={12} />
              {topic.readTime}
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={copyAnchor}
            title="Copy link"
            className="text-[12px] border border-white/10 hover:bg-white/5"
          >
            Link
          </Button>
          <Button
            variant="gold"
            size="sm"
            onClick={handleToggle}
            aria-expanded={open}
            aria-controls={`${topic.id}-more`}
            className="text-[12px]"
          >
            {open ? 'Less' : 'More'}
          </Button>
        </div>
      </header>

      <ul className="mb-2 list-disc pl-5 text-[13px] leading-[1.6] font-body text-text-ds-secondary">
        {topic.bullets.map((bullet: string, i: number) => (
          <li key={i}>{bullet}</li>
        ))}
      </ul>

      <div
        id={`${topic.id}-more`}
        className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${
          open ? 'max-h-[480px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="mt-3 border-t border-white/10 pt-3 text-[13px] leading-[1.6] font-body text-text-ds-secondary">
          {topic.more}
        </div>
      </div>
    </article>
  );
}
