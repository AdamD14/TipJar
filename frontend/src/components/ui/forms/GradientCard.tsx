'use client';
import React from 'react';

interface GradientCardProps {
  children?: React.ReactNode;
  className?: string;
  variant?: 1 | 2 | 3;
}

const bgVariants: Record<NonNullable<GradientCardProps['variant']>, string> = {
  1: 'linear-gradient(110deg in oklch, oklch(0.3699 0.0848 198.05) 0%, oklch(0.3516 0.0742 198.14) 50%, oklch(0.3699 0.0848 198.05) 100%)',
  2: 'linear-gradient(110deg in oklch, oklch(0.3699 0.0848 196.05) 0%, oklch(0.3444 0.0794 198.05) 50%, oklch(0.3699 0.0848 196.05) 100%)',
  3: 'linear-gradient(110deg in oklch, oklch(0.3854 0.0881 199.66) 0%, oklch(0.3444 0.0794 200.05) 50%, oklch(0.3699 0.0848 200.05) 100%)',

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
          transition: background-position 0.6s ease-out;
          border: 1px solid var(--color-teal-300);
         box-shadow: var(--shadow-card-rest);
         contain: layout paint; 
          corner-shape: bevel;
          border-radius: 16px;
          transform: translateZ(0);
         position: relative;
          outline: none;
          
        }

        .card-surface:hover {
          background-position: 100% center;
          transform: translateY(0);
         overflow: hidden;
}
         
        

        .card-surface::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center,
            rgb(0, 76, 83) 0%,
            rgb(0, 73, 76) 50%,
            rgba(0, 51, 53, 0.97) 98%,
            rgba(0, 31, 31, 1) 100%
          );
          opacity: 0;
          border: 1px solid var(--color-teal-200);
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

     

      <div className={`card-surface ${className}`} tabIndex={0}>
        {children}
      </div>
    </>
  );
};

export default GradientCard;