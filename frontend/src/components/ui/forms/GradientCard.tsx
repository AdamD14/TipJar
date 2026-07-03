import React from 'react';

interface GradientCardProps {
  children?: React.ReactNode;
  className?: string;
  variant?: 1 | 2 | 3; // NOWE: 3 warianty kolorystyczne
}

export const GradientCard: React.FC<GradientCardProps> = ({ children, className = '', variant = 1 }) => {
  // 3 warianty kolorystyczne - tylko background, nic więcej
  const bgVariants = {
    1: 'linear-gradient(110deg in oklch, oklch(0.74 0.085 205))',
    2: 'linear-gradient(110deg in oklch, oklch(0.39 0.08 204))',
    3: 'linear-gradient(110deg in oklch, oklch(0.38 0.08 204))',
  };

  return (
    <>
      <style>{`
        .card-surface {
          /* --- BAZOWA FIZYKA ŚWIATŁA (Hover) --- */
          background: ${bgVariants[variant]};
          background-size: 200% 100%;
          background-position: 0% center;
          transition: background-position 0.5s ease-out;

        

          /* --- Setup pod Focus State --- */
          position: relative;
          outline: none; /* Ukrywa standardowy ring focusa */
        }

        .card-surface:hover {
          background-position: 100% center;
          transform: translateY(0); 
          border: 1px solid;
          border-image: url(#chromatic-prism) 30;
        }

        /* --- REZONANS JĄDROWY (Focus State) --- */
        /* Pseudo-element ::before dla promieniowania fioletowego na środku */
        .card-surface::before {
          content: "";
          position: absolute;
          inset: 0;
          
          /* Radialny gradient fioletowy:
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

      {/* DODANY BLOK SVG Z TWOIM FILTREM */}
      <svg width="0" height="0" style={{ position: 'absolute', pointerEvents: 'none' }}>
        <defs>
          {/* Model Snella-Descartesa: POPRAWIONE WARTOŚCI MACIERZY KANAŁÓW RGB */}
          <filter id="chromatic-prism" x="-50%" y="-50%" width="200%" height="200%">
            {/* Przesunięcia warstw bocznych dla efektu rozszczepienia */}
            <feOffset dx="-2" dy="0" in="SourceGraphic" result="red_layer" />
            <feOffset dx="2" dy="0" in="SourceGraphic" result="blue_layer" />

            {/* Izolacja kanału czerwonego (R) */}
            <feColorMatrix
              type="matrix"
              in="red_layer"
              result="red_only"
              values="
              1 0 0 0 0
              0 0 0 0 0
              0 0 0 0 0
              0 0 0 1 0"
            />

            {/* Izolacja kanału zielonego (G) */}
            <feColorMatrix
              type="matrix"
              in="SourceGraphic"
              result="green_only"
              values="
              1 0 0 0 0
              0 1 0 0 0
              0 0 0 0 0
              0 0 0 1 0"
            />

            {/* Izolacja kanału niebieskiego (B) */}
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

            {/* Łączenie kanałów w finalny pryzmat trybem Screen */}
            <feBlend
              mode="screen"
              in="red_only"
              in2="green_only"
              result="rg_mix"
            />
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