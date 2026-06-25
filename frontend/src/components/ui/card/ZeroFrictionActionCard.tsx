"use client";
import React, { useRef, useState } from 'react';

export interface ZeroFrictionActionCardProps {
  title?: string;
  buttonText?: string;
  onExecute?: () => void;
}

export const ZeroFrictionActionCard: React.FC<ZeroFrictionActionCardProps> = ({
  title = 'ZeroFrictionActionCard',
  buttonText = 'Sign Transaction',
  onExecute
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const isScrollingRef = useRef(false);
  const pressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const SCROLL_TOLERANCE = 10;

  const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (e.pointerType !== 'touch' && e.pointerType !== 'mouse') return;
    isScrollingRef.current = false;

    pressTimerRef.current = setTimeout(() => {
      if (!isScrollingRef.current) {
        setIsPressed(true);
      }
    }, 60);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (Math.abs(e.movementY) > SCROLL_TOLERANCE || Math.abs(e.movementX) > SCROLL_TOLERANCE) {
      isScrollingRef.current = true;
      if (pressTimerRef.current) clearTimeout(pressTimerRef.current);
      setIsPressed(false);
    }
  };

  const handleRelease = () => {
    if (pressTimerRef.current) clearTimeout(pressTimerRef.current);
    if (!isScrollingRef.current) {
      setIsPressed(true);
      setTimeout(() => {
        setIsPressed(false);
        if (onExecute) onExecute();
      }, 150);
    }
  };

  return (
    <>
      <style>{`
        .card-zero-friction:hover {
          filter: brightness(1.04);
        }
        .card-zero-friction:hover .action-cta {
          filter: brightness(1.08);
        }
        .action-cta {
          transition: transform 150ms ease, filter 150ms ease;
        }
        .is-physically-pressed {
          transform: scale(0.97);
          filter: brightness(0.92);
        }
      `}</style>

      <article
        className="card-zero-friction rounded-xl p-6 glass-liquid gpu-layer"
        style={{
          backgroundColor: 'var(--teal-800, #003737)',
        }}
      >
        <div className="card-header mb-4">
          <h3
            className="text-[clamp(1.2rem,1.5vw+0.875rem,1.5rem)] font-semibold"
            style={{
              color: 'var(--color-text-secondary, #E0F2F2)',
              fontFamily: 'var(--font-heading)',
            }}
          >
            {title}
          </h3>
        </div>
        <button
          id="cta-contract"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handleRelease}
          onPointerCancel={handleRelease}
          className={`action-cta font-bold border-none rounded-lg py-4 px-8 w-full cursor-pointer ${
            isPressed ? 'is-physically-pressed' : ''
          }`}
          style={{
            touchAction: 'pan-y pinch-zoom',
            backgroundColor: 'var(--gold-400, #FFD700)',
            color: 'var(--teal-900, #001F1F)',
            fontSize: 'clamp(1rem, 0.5vw + 0.875rem, 1.125rem)',
          }}
        >
          {buttonText}
        </button>
      </article>
    </>
  );
};

export default ZeroFrictionActionCard;
