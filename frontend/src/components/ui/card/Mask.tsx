import React from 'react';

const OkragKrzyz = () => {
  return (
    <div
      style={{
        width: 480,
        height: 480,
        background: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <svg width="440" height="440" viewBox="0 0 440 440">
        {/* Okrąg - środek w (220,220), promień 200, grubość 10px */}
        <circle
          cx="220"
          cy="220"
          r="180"
          fill="none"
          stroke="black"
          strokeWidth="10"
        />
        {/* Krzyż - pionowy prostokąt o grubości 10px, kończy się 2px od krawędzi SVG */}
        <rect
          x="215"  // wyśrodkowanie (440-10)/2 = 215
          y="2"    // odstęp 2px od góry
          width="10"
          height="436" // 440 - 4 = 436
          fill="black"
        />
        {/* Krzyż - poziomy prostokąt o grubości 10px */}
        <rect
          x="2"     // odstęp 2px od lewej
          y="215"   // wyśrodkowanie
          width="436" // 440 - 4 = 436
          height="10"
          fill="black"
        />
      </svg>
    </div>
  );
};

export default OkragKrzyz;