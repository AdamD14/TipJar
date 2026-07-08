'use client';
import React from 'react';

interface GradientCardProps {
  children?: React.ReactNode;
  className?: string;
  variant?: 1 | 2 | 3;
}

const bgVariants: Record<NonNullable<GradientCardProps['variant']>, string> = {
  1: 'linear-gradient(110deg in oklch, oklch(0.3 0.0698 198) 0%, oklch(0.4 0.0921 197) 50%, oklch(0.31 0.0715 200) 100%)',
  2: 'linear-gradient(110deg in oklch, oklch(0.34 0.07855 200) 0%, oklch(0.425 0.095 197) 50%, oklch(0.34 0.0787 197) 100%)',
  3: 'linear-gradient(110deg in oklch, oklch(0.3 0.06975 200) 0%, oklch(0.455 0.104 201) 50%, oklch(0.34 0.07855 200) 100%)',

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
          border-radius: 36px;
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

     

      <div className={`card-surface ${className}`} tabIndex={0}>
        {children}
      </div>
    </>
  );
};

export default GradientCard;