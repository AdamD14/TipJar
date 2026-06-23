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
    <div className="bg-[#002121] rounded-2xl p-6 border border-[#003737] shadow-[0_4px_12px_rgba(0,31,31,0.8)]">
      <h3 className="font-['Mukta_Malar'] text-[#E0F2F2] text-xl mb-6 font-light">{title}</h3>
      <div className="relative group">
        {/* Floating Label */}
        <label className="absolute -top-2 left-3 bg-[#002121] px-2 font-mono text-[10px] text-[#76CBCB] uppercase tracking-wider z-20 transition-colors group-focus-within:text-[#FFD700]">
          Wallet Address
        </label>
        {/* Liquid Input Field */}
        <input
          ref={inputRef}
          type="text"
          defaultValue={defaultAddress}
          className="w-full bg-[#001717] text-[#E0F2F2] font-mono text-sm py-4 px-4 rounded-xl border border-transparent shadow-[inset_0_2px_8px_rgba(0,0,0,0.8),inset_0_0_0_1px_rgba(0,115,115,0.3)] focus:outline-none focus:border-[#FFD700] focus:shadow-[inset_0_1px_3px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,215,0,0.4),0_0_20px_rgba(255,215,0,0.15)] transition-all duration-300"
        />
      </div>
      {/* Przycisk aktywacyjny */}
      <button 
        onClick={handleSignClick}
        className="w-full mt-6 bg-[#004545] border border-[#007373] text-[#E0F2F2] py-3 rounded-xl font-sans font-bold text-sm tracking-wide shadow-[0_2px_4px_rgba(0,0,0,0.4)] hover:bg-[#005959] hover:border-[#FFD700] hover:shadow-[0_0_15px_rgba(63,181,181,0.25)] active:scale-[0.98] transition-all duration-300 cursor-pointer"
      >
        SIGN TRANSACTION
      </button>
    </div>
  );
};