'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Copy, Check } from 'lucide-react';
import Button from '@/components/ui/buttons/Button';

const TIP_PRESETS = [1, 2, 5, 10] as const;

interface ExampleProfileProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ExampleProfile({ isOpen, onClose }: ExampleProfileProps) {
  const [tipAmount, setTipAmount] = useState<number>(10);
  const [isCopied, setIsCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText('tipjar.plus/@AdamDuda');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-surface-modal rounded-3xl p-8 w-full max-w-md border border-gold-400/20">

        <div className="w-32 h-32 mx-auto mb-4 rounded-full border-4 border-gold-400 overflow-hidden bg-surface-elevated">
          <Image
            src="/weeee.png"
            alt="AdamDuda"
            width={128}
            height={128}
            className="w-full h-full object-cover"
            onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>

        <div className="text-center mb-4">
          <h3 className="font-heading font-bold text-2xl text-text-ds-primary mb-2">@AdamDuda</h3>
          <div className="flex items-center justify-center gap-2">
            <span className="text-text-ds-tertiary text-sm">tipjar.plus/@AdamDuda</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="text-text-ds-tertiary hover:text-text-ds-primary"
            >
              {isCopied ? (
                <Check size={16} className="text-success-base" />
              ) : (
                <Copy size={16} />
              )}
            </Button>
          </div>
        </div>

        <p className="text-center text-text-ds-secondary text-sm mb-6 px-4 font-body">
          Founder of tipjar+ - built together with a team of AI agents.
          Advocate of freedom, decentralization, and blockchain technology.
          Web3 & AI pro user. Paleo-contact believer.
        </p>

        <div className="mb-6">
          <input
            type="range"
            min={1}
            max={100}
            value={tipAmount}
            onChange={(e) => setTipAmount(Number(e.target.value))}
            className="w-full h-2 bg-surface-elevated rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, var(--color-gold-400) 0%, var(--color-gold-400) ${tipAmount}%, #374151 ${tipAmount}%, #374151 100%)`
            }}
          />
          <style jsx>{`
            .slider::-webkit-slider-thumb {
              appearance: none;
              width: 20px;
              height: 20px;
              border-radius: 50%;
              background: var(--color-gold-400);
              cursor: pointer;
            }
            .slider::-moz-range-thumb {
              width: 20px;
              height: 20px;
              border-radius: 50%;
              background: var(--color-gold-400);
              cursor: pointer;
              border: none;
            }
          `}</style>
        </div>

        <div className="flex gap-3 mb-6">
          {TIP_PRESETS.map((amount) => (
            <Button
              key={amount}
              variant={tipAmount === amount ? 'gold' : 'ghost'}
              fullWidth
              onClick={() => setTipAmount(amount)}
              className={tipAmount !== amount ? 'bg-surface-elevated border border-white/10 hover:bg-teal-700' : ''}
            >
              ${amount}
            </Button>
          ))}
        </div>

        <Button variant="gold" fullWidth size="lg" className="text-lg">
          Tip ${tipAmount}.00
          <Image
            src="/assets/logo_usdc_1.png"
            alt="USDC"
            width={20}
            height={20}
            className="inline-block"
            onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </Button>

        <div className="flex justify-center gap-3 mt-4">
          {['G', 'A', 'M', 'R', 'W', 'B'].map((letter) => (
            <div key={letter} className="w-10 h-10 bg-surface-elevated rounded-lg flex items-center justify-center">
              <span className="text-xs text-text-ds-tertiary">{letter}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}