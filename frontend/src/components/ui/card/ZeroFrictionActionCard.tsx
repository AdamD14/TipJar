"use client";
import React, { useRef, useState } from 'react';

export interface ZeroFrictionActionCardProps {
  title?: string;
  buttonText?: string;
  onExecute?: () => void;
}

/**
 * LOKALIZACJA W DRZEWIE: creator-desktop/desktop/quick-actions/ (alternatywnie: wallet/deposit/)
 * Zabezpieczony przed scroll-swipe interfejs aktywacyjny oparty na GPU.
 */
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
    <article className="action-card bg-[#003737] rounded-xl p-6">
      <div className="card-header mb-4">
        <h3 className="text-[clamp(1.2rem,1.5vw+0.875rem,1.5rem)] font-semibold text-[#E0F2F2] font-['Mukta_Malar']">
          {title}
        </h3>
      </div>
      <button
        id="cta-contract"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handleRelease}
        onPointerCancel={handleRelease}
        className={`action-cta font-bold bg-[#FFD700] text-[#001F1F] text-[clamp(1rem,0.5vw+0.875rem,1.125rem)] border-none rounded-lg py-4 px-8 w-full transition-all duration-[400ms] cursor-pointer ${
          isPressed ? 'is-physically-pressed' : ''
        }`}
        style={{ touchAction: 'pan-y pinch-zoom' }}
      >
        {buttonText}
      </button>
    </article>
  );
};

export default ZeroFrictionActionCard;