'use client'
import React, { useRef } from 'react';

export interface AuthorizeContractCardProps {
  title?: string;
  defaultAddress?: string;
  onSign?: (address: string) => void;
}

export const AuthorizeContractCard: React.FC<AuthorizeContractCardProps> = ({
  title = 'Authorize Contract Card',
  defaultAddress = '0x71C...9A23',
  onSign
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSignClick = () => {
    if (onSign && inputRef.current) {
      onSign(inputRef.current.value);
    }
  };

  return (
    <div className="bg-teal-850 rounded-2xl p-6 border border-teal-800 shadow-card-rest">
      <h3 className="font-heading text-teal-25 text-xl mb-6 font-light">{title}</h3>
      <div className="relative group">
        <label className="absolute -top-2 left-3 bg-teal-850 px-2 font-mono text-[10px] text-teal-200 uppercase tracking-wider z-20 transition-colors group-focus-within:text-gold-400">
          Wallet Address
        </label>
        <input
          ref={inputRef}
          type="text"
          defaultValue={defaultAddress}
          className="w-full bg-teal-900 text-teal-25 font-mono text-sm py-4 px-4 rounded-xl border border-transparent shadow-[inset_0_2px_8px_rgba(0,0,0,0.8),inset_0_0_0_1px_rgba(0,115,115,0.3)] focus:outline-none focus:border-gold-400 focus:shadow-[inset_0_1px_3px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,215,0,0.4),0_0_20px_rgba(255,215,0,0.15)] transition-all duration-300"
        />
      </div>
      <button 
        onClick={handleSignClick}
        className="w-full mt-6 bg-teal-700 border border-teal-500 text-teal-25 py-3 rounded-xl font-body font-bold text-sm tracking-wide shadow-1 hover:bg-teal-600 hover:border-gold-400 hover:shadow-[0_0_15px_rgba(63,181,181,0.25)] active:scale-[0.98] transition-all duration-300 cursor-pointer"
      >
        SIGN TRANSACTION
      </button>
    </div>
  );
};
