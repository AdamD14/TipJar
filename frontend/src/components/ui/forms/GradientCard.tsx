'use client';
import React from 'react';

interface GradientCardProps {
  children?: React.ReactNode;
  className?: string;
  variant?: 1 | 2 | 3;
}

const bgVariants: Record<NonNullable<GradientCardProps['variant']>, string> = {
  1: 'linear-gradient(110deg in oklch, oklch(0.2301 0.0394 203) 0%, oklch(0.27 0.055 203) 10%, oklch(0.25 0.0425 203) 20%, oklch(0.295 0.059 203) 30%,  oklch(0.32 0.07 204) 39%, oklch(0.36 0.073 204) 48%, oklch(0.35 0.072 202) 56%, oklch(0.39 0.08 204) 64%, oklch(0.38 0.08 203) 72%, oklch(0.402 0.085 205) 84%, oklch(0.39 0.08 204) 92%, oklch(0.43 0.085 204) 100%)',
  2: 'linear-gradient(110deg in oklch, oklch(0.2301 0.0394 203) 0%, oklch(0.27 0.055 203) 10%, oklch(0.25 0.0425 203) 20%, oklch(0.295 0.059 203) 30%,  oklch(0.32 0.07 204) 39%, oklch(0.36 0.073 204) 48%, oklch(0.35 0.072 202) 56%, oklch(0.39 0.08 204) 64%, oklch(0.38 0.08 203) 72%, oklch(0.402 0.085 205) 84%, oklch(0.39 0.08 204) 92%, oklch(0.43 0.085 204) 100%)',
  3: 'linear-gradient(110deg in oklch, oklch(0.2301 0.0394 203) 0%, oklch(0.27 0.055 203) 10%, oklch(0.32 0.07 204) 20%, oklch(0.35 0.072 202) 30%, oklch(0.402 0.085 205) 40%, oklch(0.39 0.08 204) 50%, oklch(0.43 0.085 204) 60%, oklch(0.38 0.08 203) 70%, oklch(0.32 0.07 204) 80%, oklch(0.27 0.055 203) 90%, oklch(0.295 0.059 203) 100%)',

};

export const GradientCard: React.FC<GradientCardProps> = ({
  children,
  className = '',
  variant = 1,
}) => {
  const bgColor = bgVariants[variant];

  return (
    <>
      <style jsx>{`
        .card-surface {
          background: ${bgColor};
          background-size: 200% 100%;
          background-position: 0% center;
          transition: background-position 0.5s ease-out;
          position: relative;
          outline: none;
        }

        .card-surface:hover {
          background-position: 100% center;
          transform: translateY(0);
          border: 1px solid;
          border-image: url(#chromatic-prism) 30;
        }

        .card-surface::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center,
            rgba(255, 0, 255, 1) 0%,
            rgba(255, 0, 255, 0.5) 50%,
            rgba(0, 31, 31, 0.97) 98%,
            rgba(0, 31, 31, 1) 100%
          );
          opacity: 0;
          transition: opacity 0.5s ease-in-out;
          z-index: -1;
        }

        .card-surface:focus-within::before {
          opacity: 1;
        }

        .card-surface * {
          position: relative;
          z-index: 1;
        }
      `}</style>

      <svg width="0" height="0" style={{ position: 'absolute', pointerEvents: 'none' }}>
        <defs>
          <filter id="chromatic-prism" x="-50%" y="-50%" width="200%" height="200%">
            <feOffset dx="-2" dy="0" in="SourceGraphic" result="red_layer" />
            <feOffset dx="2" dy="0" in="SourceGraphic" result="blue_layer" />

            <feColorMatrix
              type="matrix"
              in="red_layer"
              result="red_only"
              values="
                0 0 0 0 0
                0 1 0 0 0
                0 0 0 0 0
                0 0 0 1 0"
            />

            <feColorMatrix
              type="matrix"
              in="SourceGraphic"
              result="green_only"
              values="
                0 0 0 0 0
                0 1 0 0 0
                0 0 0 0 0
                0 0 0 1 0"
            />

            <feColorMatrix
              type="matrix"
              in="blue_layer"
              result="blue_only"
              values="
                0 0 0 0 0
                0 0 0 0 0
                0 0 1 0 0
                0 0 0 1 0"
            />

            <feBlend mode="screen" in="red_only" in2="green_only" result="rg_mix" />
            <feBlend mode="screen" in="rg_mix" in2="blue_only" />
          </filter>
        </defs>
      </svg>

      <div className={`card-surface ${className}`} tabIndex={0}>
        {children}
      </div>
    </>
  );
};

export default GradientCard;