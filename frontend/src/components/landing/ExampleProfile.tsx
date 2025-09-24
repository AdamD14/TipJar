// components/landing/ExampleProfile.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Copy, Check } from 'lucide-react';

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
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-[#0f3847] rounded-3xl p-8 w-full max-w-md border border-[#FFD700]/20">
        
        {/* Avatar z żółtym obramowaniem */}
        <div className="w-32 h-32 mx-auto mb-4 rounded-full border-4 border-[#FFD700] overflow-hidden bg-gray-700">
          <Image
            src="/weeee.png"
            alt="AdamDuda"
            width={128}
            height={128}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to placeholder
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>

        {/* Profile Info */}
        <div className="text-center mb-4">
          <h3 className="text-2xl font-bold text-white mb-2">@AdamDuda</h3>
          <div className="flex items-center justify-center gap-2">
            <span className="text-gray-400 text-sm">tipjar.plus/@AdamDuda</span>
            <button 
              onClick={handleCopy}
              className="text-gray-400 hover:text-white transition-colors"
            >
              {isCopied ? (
                <Check size={16} className="text-green-400" />
              ) : (
                <Copy size={16} />
              )}
            </button>
          </div>
        </div>

        {/* Bio */}
        <p className="text-center text-gray-300 text-sm mb-6 px-4">
          Founder of tipjar+ - built together with a team of AI agents. 
          Advocate of freedom, decentralization, and blockchain technology. 
          Web3 & AI pro user. Paleo-contact believer.
        </p>

        {/* Slider */}
        <div className="mb-6">
          <input
            type="range"
            min="1"
            max="100"
            value={tipAmount}
            onChange={(e) => setTipAmount(Number(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #FFD700 0%, #FFD700 ${tipAmount}%, #374151 ${tipAmount}%, #374151 100%)`
            }}
          />
          <style jsx>{`
            .slider::-webkit-slider-thumb {
              appearance: none;
              width: 20px;
              height: 20px;
              border-radius: 50%;
              background: #FFD700;
              cursor: pointer;
            }
            .slider::-moz-range-thumb {
              width: 20px;
              height: 20px;
              border-radius: 50%;
              background: #FFD700;
              cursor: pointer;
              border: none;
            }
          `}</style>
        </div>

        {/* Amount Buttons */}
        <div className="flex gap-3 mb-6">
          <button 
            onClick={() => setTipAmount(1)}
            className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
              tipAmount === 1 
                ? 'bg-[#FFD700] text-black' 
                : 'bg-gray-700 text-white hover:bg-gray-600'
            }`}
          >
            $1
          </button>
          <button 
            onClick={() => setTipAmount(2)}
            className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
              tipAmount === 2 
                ? 'bg-[#FFD700] text-black' 
                : 'bg-gray-700 text-white hover:bg-gray-600'
            }`}
          >
            $2
          </button>
          <button 
            onClick={() => setTipAmount(5)}
            className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
              tipAmount === 5
                ? 'bg-[#FFD700] text-black' 
                : 'bg-gray-700 text-white hover:bg-gray-600'
            }`}
          >
            $5
          </button>
          <button 
            onClick={() => setTipAmount(10)}
            className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
              tipAmount === 10 
                ? 'bg-[#FFD700] text-black' 
                : 'bg-gray-700 text-white hover:bg-gray-600'
            }`}
          >
            $10
          </button>
        </div>

        {/* Tip Button */}
        <button className="w-full bg-[#FFD700] text-black py-4 rounded-lg font-bold text-lg hover:bg-[#FFC700] transition-all flex items-center justify-center gap-2">
          Tip ${tipAmount}.00
          <Image 
            src="/assets/logo_usdc_1.png" 
            alt="USDC"
            width={20} 
            height={20}
            className="inline-block"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </button>

        {/* Payment Methods */}
        <div className="flex justify-center gap-3 mt-4">
          <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center">
            <span className="text-xs">G</span>
          </div>
          <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center">
            <span className="text-xs">A</span>
          </div>
          <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center">
            <span className="text-xs">M</span>
          </div>
          <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center">
            <span className="text-xs">R</span>
          </div>
          <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center">
            <span className="text-xs">W</span>
          </div>
          <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center">
            <span className="text-xs">B</span>
          </div>
        </div>
      </div>
    </div>
  );
}