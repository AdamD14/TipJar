'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import { useAuthStore } from '@/stores/authStore';
import type { CreatorProfile } from '@/types';

export const TipSection = ({ creator }: { creator: CreatorProfile }) => {
  const [amount, setAmount] = useState<number>(5);
  const [message, setMessage] = useState('');
  const { user } = useAuthStore();

  const handleTipSubmit = () => {
    console.log(`Submitting tip of ${amount} USDC to ${creator.displayName}`);
    if (user) {
      console.log('User is logged in. Show all payment options.');
    } else {
      console.log('User is a guest. Show only fiat payment options.');
    }
  };

  return (
    <div className="bg-tipjar-turquoise rounded-xl p-6 mt-8 text-center shadow-lg">
      <h2 className="text-3xl font-heading text-tipjar-gold mb-4">Okaż Wsparcie!</h2>
      <div className="my-6">
        <div className="text-5xl font-bold text-white mb-4">${amount.toFixed(2)}</div>
        <input type="range" min="1" max="100" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="w-full h-2 bg-tipjar-turquoise-darker rounded-lg appearance-none cursor-pointer accent-tipjar-gold" />
        <div className="flex justify-between text-xs text-tipjar-gray-light mt-2">
          <span>$1</span>
          <span>$100</span>
        </div>
      </div>
      <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder={`Zostaw wiadomość dla ${creator.displayName}... (opcjonalnie)`} className="w-full bg-tipjar-turquoise-darker border-tipjar-turquoise rounded-md p-3 focus:border-tipjar-gold focus:ring focus:ring-tipjar-gold focus:ring-opacity-50 transition" rows={3}></textarea>
      <Button onClick={handleTipSubmit} size="lg" className="w-full mt-6">
        Wyślij {amount.toFixed(2)} USDC
      </Button>
    </div>
  );
};
