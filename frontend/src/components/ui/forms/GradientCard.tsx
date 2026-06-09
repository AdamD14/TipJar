import React from 'react';

interface GradientCardProps {
  children?: React.ReactNode;
  className?: string;
}

export const GradientCard: React.FC<GradientCardProps> = ({ children, className = '' }) => {
  return (
    <>
      <style>{`
        .card-surface {
          /* --- BAZOWA FIZYKA ŚWIATŁA (Hover) --- */
          background: linear-gradient(110deg,
            var(--color-teal-600) 10%,
            var(--color-teal-500) 40%,
            var(--color-teal-600) 90%
          );
          background-size: 200% 100%;
          background-position: 0% center;
          transition: background-position 0.5s ease-out;

          /* --- Usunięto clip-path, powrót do klasycznego kształtu --- */

          /* --- Setup pod Focus State --- */
          position: relative;
          outline: none; /* Ukrywa standardowy ring focusa */
        }

        .card-surface:hover {
          background-position: 100% center;
          transform: translateY(0); /* Blokuje uniesienie z globals.css */
        }

        /* --- REZONANS JĄDROWY (Focus State) --- */
        /* Pseudo-element ::before dla promieniowania fioletowego na środku */
        .card-surface::before {
          content: "";
          position: absolute;
          inset: 0;
          
          /* Radialny gradient fioletowy ze slajdu:
             - startuje na środku (at center)
             - Core Intensity: 100% fiolet (używam magenty dla żywotności)
             - Inverted Halo Effect: ciemny teal wokół
             - Edge Cutoff: 98% (gwałtowne odcięcie przy krawędzi)
          */
          background: radial-gradient(circle at center,
            rgba(255, 0, 255, 1) 0%,      /* Fioletowy rdzeń (100% intensity) */
            rgba(255, 0, 255, 0.5) 50%,   /* Fading core */
            rgba(0, 31, 31, 0.97) 98%,    /* Inverted Halo edge cutoff (Dims bg to 3%) */
            rgba(0, 31, 31, 1) 100%       /* Edge blend */
          );
          
          opacity: 0;
          transition: opacity 0.5s ease-in-out;
          
          /* Upewnia się, że gradient nie zasłoni treści */
          z-index: -1; 
        }

        /* Aktywacja promieniowania na focus */
        .card-surface:focus-within::before {
          opacity: 1;
        }

        /* Aby treść karty była czytelna na ciemnym tle fioletowym */
        .card-surface * {
          position: relative; /* Utrzymuje treść nad pseudoelementem */
          z-index: 1; 
        }
      `}</style>

      {/* Usunięto cały blok SVG z maską */}

      {/* Dodałem tabindex="0", żeby div był "focusable" */}
      <div className={`card-surface ${className}`} tabIndex={0}>
        {children}
      </div>
    </>
  );
};

export default GradientCard;