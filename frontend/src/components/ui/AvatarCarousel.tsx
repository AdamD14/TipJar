"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

/**
 * Helper: Calculate circular offset for infinite loop logic.
 */
const getCircularOffset = (
  index: number,
  focusedIndex: number,
  total: number
): number => {
  let diff = index - focusedIndex;
  if (diff > total / 2) diff -= total;
  if (diff < -total / 2) diff += total;
  return diff;
};

interface CarouselSlot {
  id: number;
  url: string;
}

interface AvatarCarouselSlideProps {
  slot: CarouselSlot;
  offset: number;
  onClickAction: () => void;
}

/**
 * Single slide component - 200x280px, sharp edges, slow motion transition.
 */
function AvatarCarouselSlide({
  slot,
  offset,
  onClickAction,
}: AvatarCarouselSlideProps) {
  const isActive = offset === 0;
  const isFilled = !!slot.url;

  let positionClasses = "";
  const baseCenter = "left-1/2 top-1/2";

  if (isActive) {
    positionClasses = `${baseCenter} -translate-x-1/2 -translate-y-1/2 scale-[1.05] z-30 opacity-100 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.9)] border-teal-500 ring-1 ring-teal-500/30`;
  } else if (offset === -1) {
    positionClasses = `${baseCenter} -translate-x-[90%] -translate-y-[50%] scale-90 z-20 opacity-60 grayscale-[80%] blur-[1px] cursor-pointer border-white/10`;
  } else if (offset === 1) {
    positionClasses = `${baseCenter} -translate-x-[10%] -translate-y-[50%] scale-90 z-20 opacity-60 grayscale-[80%] blur-[1px] cursor-pointer border-white/10`;
  } else {
    positionClasses = `${baseCenter} -translate-x-1/2 -translate-y-1/2 scale-50 z-10 opacity-0 pointer-events-none`;
  }

  const bgClasses = "bg-transparent";

  return (
    <div
      className={`
        absolute w-[200px] h-[280px] rounded-none 
        transition-all duration-[1500ms] ease-[cubic-bezier(0.3,0.1,0.4,0.7)] 
        flex flex-col items-center justify-center overflow-hidden border group
        ${positionClasses} ${bgClasses}
      `}
      onClick={() => !isActive && onClickAction()}
    >
      {isActive && (
        <div className="absolute -inset-10 bg-teal-500/5 blur-[80px] pointer-events-none transition-opacity duration-[1200ms]" />
      )}

      {isFilled && (
        <Image
          src={slot.url}
          alt="Avatar"
          width={200}
          height={280}
          className="w-full h-full object-cover"
        />
      )}

      {!isFilled && (
        <div className="text-white/5 uppercase font-black tracking-widest text-[8px]">
          Empty
        </div>
      )}
    </div>
  );
}

interface AvatarCarouselProps {
  avatarUrls: string[];
  autoRotate?: boolean;
  rotateInterval?: number;
}

/**
 * AvatarCarousel - displays 3 slots with user avatars.
 * Fills missing slots with logo.png and usdc.png fallbacks.
 */
export default function AvatarCarousel({
  avatarUrls,
  autoRotate = true,
  rotateInterval = 20000,
}: AvatarCarouselProps) {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Build 3 slots with fallbacks
  const buildSlots = (): CarouselSlot[] => {
    const slots: CarouselSlot[] = [];
    const count = avatarUrls.length;

    if (count >= 3) {
      // User has 3+ photos, use first 3
      return avatarUrls.slice(0, 3).map((url, i) => ({ id: i, url }));
    } else if (count === 2) {
      // 2 photos + logo.png
      slots.push({ id: 0, url: avatarUrls[0] });
      slots.push({ id: 1, url: avatarUrls[1] });
      slots.push({ id: 2, url: "/logo.png" });
    } else if (count === 1) {
      // 1 photo + usdc.png + logo.png
      slots.push({ id: 0, url: avatarUrls[0] });
      slots.push({ id: 1, url: "/usdc.png" });
      slots.push({ id: 2, url: "/logo.png" });
    } else {
      // 0 photos - logo, usdc, logo rotation
      slots.push({ id: 0, url: "/logo.png" });
      slots.push({ id: 1, url: "/usdc.png" });
      slots.push({ id: 2, url: "/logo.png" });
    }

    return slots;
  };

  const slots = buildSlots();

  // Auto-rotate every X seconds unless paused
  useEffect(() => {
    if (!autoRotate || isPaused) return;

    const timer = setInterval(() => {
      setFocusedIndex((prev) => (prev + 1) % slots.length);
    }, rotateInterval);

    return () => clearInterval(timer);
  }, [slots.length, isPaused, autoRotate, rotateInterval]);

  return (
    <div
      className="w-full relative h-[360px] flex items-center justify-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative w-full max-w-2xl h-full mx-auto">
        {slots.map((slot, index) => {
          const offset = getCircularOffset(index, focusedIndex, slots.length);
          return (
            <AvatarCarouselSlide
              key={slot.id}
              slot={slot}
              offset={offset}
              onClickAction={() => setFocusedIndex(index)}
            />
          );
        })}
      </div>
    </div>
  );
}
