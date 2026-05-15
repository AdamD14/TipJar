// components/landing/ExploreCreators.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

// Przykładowe dane twórców
const EXAMPLE_CREATORS = [
  {
    category: 'Digital Art',
    initial: 'E',
    name: 'Elena Moreau',
    handle: '@elenart',
    role: 'Illustrator',
    bio: 'Creating vibrant worlds with a touch of magic and surrealism.',
    avatarUrl: '/avatar-fallback.png',
    goalPercent: 68,
  },
  {
    category: 'Music',
    initial: 'L',
    name: 'Leo Maxwell',
    handle: '@leosonix',
    role: 'Producer',
    bio: 'Crafting electronic beats that move your soul and feet.',
    avatarUrl: '/avatar-fallback.png',
    goalPercent: 45,
  },
  {
    category: 'Gaming',
    initial: 'R',
    name: 'Riley Chen',
    handle: '@rileyplays',
    role: 'Streamer',
    bio: 'Exploring new worlds and sharing the adventure with you.',
    avatarUrl: '/avatar-fallback.png',
    goalPercent: 89,
  },
  {
    category: 'Education',
    initial: 'S',
    name: 'Sarah Mitchell',
    handle: '@teachsarah',
    role: 'Educator',
    bio: 'Making complex topics simple and fun to learn.',
    avatarUrl: '/avatar-fallback.png',
    goalPercent: 72,
  },
  {
    category: 'Fitness',
    initial: 'M',
    name: 'Marcus Johnson',
    handle: '@fitmarc',
    role: 'Coach',
    bio: 'Your journey to a healthier you starts here.',
    avatarUrl: '/avatar-fallback.png',
    goalPercent: 55,
  },
];

export default function ExploreCreators() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      setAtStart(scrollLeft <= 2);
      setAtEnd(scrollLeft + clientWidth >= scrollWidth - 2);
    };
    onScroll();
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  const scrollByView = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.round(el.clientWidth * 0.8);
    el.scrollBy({ left: dir * amount, behavior: 'smooth' });
  };

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-teal-950 to-teal-950">
      <div className="mx-auto max-w-[1480px] px-4">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Explore creators</h2>
            <p className="text-gray-400">Featured by category. Scroll or use arrows.</p>
          </div>
          <Link
            href="#"
            className="hidden md:inline-flex rounded-full border-2 border-gold-400 px-6 py-2 text-gold-400 font-semibold hover:bg-gold-400 hover:text-black transition-all"
          >
            Discover all creators
          </Link>
        </div>

        <div className="relative">
          {/* Karuzela */}
          <div
            ref={scrollerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {EXAMPLE_CREATORS.map((creator) => (
              <CreatorCard key={creator.handle} {...creator} />
            ))}
          </div>

          {/* Strzałki nawigacji */}
          <button
            onClick={() => scrollByView(-1)}
            disabled={atStart}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/60 text-white rounded-full w-10 h-10 flex items-center justify-center disabled:opacity-30 hover:bg-black/80 transition-all"
          >
            ‹
          </button>
          <button
            onClick={() => scrollByView(1)}
            disabled={atEnd}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/60 text-white rounded-full w-10 h-10 flex items-center justify-center disabled:opacity-30 hover:bg-black/80 transition-all"
          >
            ›
          </button>
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
    <article className="min-w-[320px] bg-teal-800 rounded-2xl p-6 border border-gray-700/50">
      <div className="flex items-center justify-between mb-6">
        <span className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm">{category}</span>
        {goalPercent && (
          <div className="flex items-center gap-2">
            <div className="w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gold-400 rounded-full"
                style={{ width: `${goalPercent}%` }}
              />
            </div>
            <span className="text-gold-400 text-sm font-bold">{goalPercent}%</span>
          </div>
        )}
      </div>

      {/* Avatar placeholder */}
      <div className="w-32 h-32 mx-auto mb-4 bg-gold-400 rounded-full flex items-center justify-center">
        <span className="text-5xl font-bold text-black">{initial}</span>
      </div>

      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-white mb-1">{name}</h3>
        <p className="text-gray-400 text-sm">{handle} · {role}</p>
      </div>

      <p className="text-gray-300 text-center mb-6 text-sm">{bio}</p>

      <div className="flex gap-3">
        <button className="flex-1 py-2 px-4 bg-transparent border border-gray-600 text-white rounded-lg hover:bg-gray-700/50 transition-all">
          View profile
        </button>
        <button className="py-2 px-6 bg-gold-400 text-black font-bold rounded-lg hover:bg-gold-600 transition-all">
          Tip
        </button>
      </div>
    </article>
  );
}