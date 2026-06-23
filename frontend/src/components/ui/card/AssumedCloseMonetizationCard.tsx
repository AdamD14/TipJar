'use client';
import React, { useState } from 'react';

export interface AssumedCloseMonetizationCardProps {
  title?: string;
  buttonText?: string;
  pricingPresets?: number[];
  defaultAmount?: number;
  onDeploy?: (amount: number) => void;
}

/**
 * LOKALIZACJA W DRZEWIE: creator-desktop/studio/monetization/tip-page/ (alternatywnie: monetization/support-options/)
 * Bezwzględna karta wymuszenia konwersji ze strukturą "Assumed Close".
 */
export const AssumedCloseMonetizationCard: React.FC<AssumedCloseMonetizationCardProps> = ({
  title = 'AssumedCloseMonetizationCard',
  buttonText = 'Deploy Support',
  pricingPresets = [5, 10, 25],
  defaultAmount = 10,
  onDeploy
}) => {
  const [selectedAmount, setSelectedAmount] = useState<number>(defaultAmount);

  const handlePresetSelect = (amount: number) => {
    setSelectedAmount(amount);
  };

  const handleCheckout = () => {
    if (onDeploy) {
      onDeploy(selectedAmount);
    }
  };

  return (
    <article className="monetization-card bg-[#003737] rounded-2xl p-8 flex flex-col gap-8">
      <div className="monetization-header">
        <h3 className="text-[clamp(1.5rem,2.5vw+1rem,2.5rem)] font-bold text-white font-['Mukta_Malar']">
          {title}
        </h3>
      </div>
      <div className="quick-amounts grid grid-cols-3 gap-4">
        {pricingPresets.map((amount) => (
          <button
            key={amount}
            type="button"
            onClick={() => handlePresetSelect(amount)}
            className={`anchor-btn bg-[#001F1F] text-white border border-[#004C4C] rounded-lg py-4 font-semibold font-['Mukta_Malar'] text-[clamp(1.2rem,1.5vw+0.875rem,1.5rem)] cursor-pointer transition-all duration-[150ms] ${
              selectedAmount === amount ? 'active bg-[#4D194D] border-[#4D194D] text-white -translate-y-1 shadow-[0_8px_16px_rgba(77,25,77,0.4)]' : ''
            }`}
          >
            {amount}
          </button>
        ))}
      </div>
      <button 
        type="button"
        onClick={handleCheckout}
        className="checkout-cta bg-[#FFD700] text-[#001F1F] p-4 rounded-lg font-bold text-[clamp(1rem,0.5vw+0.875rem,1.125rem)] border-none cursor-pointer hover:bg-[#FFC107] transition-colors"
      >
        {buttonText}
      </button>
    </article>
  );
};

export default AssumedCloseMonetizationCard;