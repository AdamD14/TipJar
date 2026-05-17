'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '@/components/ui/buttons/Button';

const AVATARS = ['/ja.webp', '/ja2.webp', '/ja3.webp'] as const;

const EXAMPLE_CREATORS = [
  {
    category: 'Digital Art',
    initial: 'E',
    name: 'Elena Moreau',
    handle: '@elenart',
    role: 'Illustrator',
    bio: 'Creating vibrant worlds with a touch of magic and surrealism.',
    goalPercent: 68,
  },
  {
    category: 'Music',
    initial: 'L',
    name: 'Leo Maxwell',
    handle: '@leosonix',
    role: 'Producer',
    bio: 'Crafting electronic beats that move your soul and feet.',
    goalPercent: 45,
  },
  {
    category: 'Gaming',
    initial: 'R',
    name: 'Riley Chen',
    handle: '@rileyplays',
    role: 'Streamer',
    bio: 'Exploring new worlds and sharing the adventure with you.',
    goalPercent: 89,
  },
  {
    category: 'Education',
    initial: 'S',
    name: 'Sarah Mitchell',
    handle: '@teachsarah',
    role: 'Educator',
    bio: 'Making complex topics simple and fun to learn.',
    goalPercent: 72,
  },
  {
    category: 'Fitness',
    initial: 'M',
    name: 'Marcus Johnson',
    handle: '@fitmarc',
    role: 'Coach',
    bio: 'Your journey to a healthier you starts here.',
    goalPercent: 55,
  },
];

export default function StartBuildingShowcase() {
  const [avatarIdx, setAvatarIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setAvatarIdx((i) => (i + 1) % AVATARS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const prevAvatar = useCallback(
    () => setAvatarIdx((i) => (i - 1 + AVATARS.length) % AVATARS.length),
    [],
  );
  const nextAvatar = useCallback(
    () => setAvatarIdx((i) => (i + 1) % AVATARS.length),
    [],
  );

  return (
    <section id="studio" className="relative py-20 md:py-28">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden
      >
        <div className="absolute inset-0 bg-[radial-gradient(900px_450px_at_20%_50%,rgba(255,215,0,0.05)_0%,transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(700px_400px_at_80%_40%,rgba(77,25,77,0.06)_0%,transparent_50%)]" />
      </div>

      <div className="mx-auto max-w-[1600px] px-4 md:px-8">
        <div className="mb-14 text-center">
          <h2 className="text-[length:var(--fs-h1)] font-heading font-bold text-text-ds-primary">
            Start Building
          </h2>
          <p className="mt-3 text-lg text-text-ds-tertiary font-body max-w-2xl mx-auto">
            Your creator profile, your community, your income — all in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          {/* LEFT — Profile card with avatar carousel */}
          <div className="flex flex-col items-center lg:items-start">
            <article className="w-full max-w-md rounded-xl border border-white/10 bg-surface-base/60 backdrop-blur-sm p-8 shadow-1">
              <div className="relative mb-6 flex items-center gap-5">
                <div className="relative h-28 w-28 flex-shrink-0 overflow-hidden rounded-xl border-2 border-gold-400/40">
                  {AVATARS.map((src, i) => (
                    <Image
                      key={src}
                      src={src}
                      alt=""
                      width={112}
                      height={112}
                      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                        i === avatarIdx ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  ))}
                </div>
                <div className="min-w-0">
                  <h3 className="text-xl font-heading font-bold text-text-ds-primary truncate">
                    Adam Duda
                  </h3>
                  <p className="text-sm text-gold-400 font-heading font-semibold">
                    @AdamDuda
                  </p>
                  <p className="mt-1 text-sm text-text-ds-tertiary font-body">
                    Founder &amp; Creator
                  </p>
                </div>
              </div>

              <p className="mb-6 text-sm leading-relaxed text-text-ds-secondary font-body">
                Founder of TipJar+ — built together with a team of AI agents.
                Advocate of freedom, decentralization, and blockchain technology.
                Web3 &amp; AI pro user.
              </p>

              <div className="flex items-center gap-2 mb-6">
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface-elevated">
                  <div
                    className="h-full rounded-full bg-gold-400 transition-all duration-500"
                    style={{ width: '68%' }}
                  />
                </div>
                <span className="text-sm font-heading font-bold text-gold-400 tabular-nums">
                  68%
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex gap-1.5">
                  {AVATARS.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setAvatarIdx(i)}
                      aria-label={`Avatar ${i + 1}`}
                      className={`h-2 w-2 rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-app ${
                        i === avatarIdx ? 'bg-gold-400' : 'bg-white/20 hover:bg-white/40'
                      }`}
                    />
                  ))}
                </div>
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={prevAvatar}
                    aria-label="Previous avatar"
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-text-ds-tertiary hover:bg-white/10 hover:text-text-ds-primary transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-app"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={nextAvatar}
                    aria-label="Next avatar"
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-text-ds-tertiary hover:bg-white/10 hover:text-text-ds-primary transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-app"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </article>

            <div className="mt-6 flex gap-3">
              <Button variant="primary" href="/register">
                Create your profile
              </Button>
              <Button variant="ghost" href="/@AdamDuda">
                View live profile
              </Button>
            </div>
          </div>

          {/* RIGHT — Explore Creators */}
          <div className="flex flex-col">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xl font-heading font-semibold text-text-ds-primary">
                Explore Creators
              </h3>
              <Button variant="link" href="/explore">
                Discover all
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {EXAMPLE_CREATORS.map((creator) => (
                <CreatorCard key={creator.handle} {...creator} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CreatorCard({
  category,
  initial,
  name,
  handle,
  role,
  bio,
  goalPercent,
}: {
  category: string;
  initial: string;
  name: string;
  handle: string;
  role: string;
  bio: string;
  goalPercent: number;
}) {
  return (
    <article
      className="group rounded-xl border border-white/10 bg-surface-base/60 backdrop-blur-sm p-5
        transition-all duration-200 ease-standard
        hover:border-gold-400/40 hover:-translate-y-0.5
        hover:shadow-[0_0_0_4px_rgba(255,215,0,0.08)_inset]"
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="rounded-full bg-surface-elevated px-2.5 py-0.5 text-xs text-text-ds-tertiary font-body">
          {category}
        </span>
        {goalPercent > 0 && (
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-14 overflow-hidden rounded-full bg-surface-elevated">
              <div
                className="h-full rounded-full bg-gold-400 transition-all duration-300"
                style={{ width: `${goalPercent}%` }}
              />
            </div>
            <span className="text-xs font-heading font-bold text-gold-400 tabular-nums">
              {goalPercent}%
            </span>
          </div>
        )}
      </div>

      <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-gold-600">
        <span className="text-2xl font-heading font-bold text-teal-900">
          {initial}
        </span>
      </div>

      <div className="mb-2 text-center">
        <h4 className="text-base font-heading font-semibold text-text-ds-primary">
          {name}
        </h4>
        <p className="text-xs text-text-ds-tertiary font-body">
          {handle} · {role}
        </p>
      </div>

      <p className="mb-4 text-center text-sm text-text-ds-tertiary font-body line-clamp-2">
        {bio}
      </p>

      <div className="flex gap-2">
        <Button variant="secondary" size="sm" fullWidth>
          View
        </Button>
        <Button variant="primary" size="sm" className="px-4">
          Tip
        </Button>
      </div>
    </article>
  );
}
