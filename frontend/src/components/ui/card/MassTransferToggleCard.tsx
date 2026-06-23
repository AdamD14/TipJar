"use client";
import React, { useState } from 'react';

export interface MassTransferToggleCardProps {
  title?: string;
  description?: string;
  defaultChecked?: boolean;
  onToggle?: (checked: boolean) => void;
}

export const MassTransferToggleCard: React.FC<MassTransferToggleCardProps> = ({
  title = 'MassTransferToggleCard',
  description = 'Sponsor network transaction fees for your fans.',
  defaultChecked = true,
  onToggle
}) => {
  const [checked, setChecked] = useState(defaultChecked);

  const handleToggle = () => {
    const nextState = !checked;
    setChecked(nextState);
    if (onToggle) {
      onToggle(nextState);
    }
  };

  return (
    <div className="bg-[#002121] rounded-xl p-5 border border-[#003737] flex items-center justify-between shadow-[0_6px_15px_rgba(0,31,31,0.6)] group hover:border-[#004545] transition-colors duration-300">
      <div className="mr-4">
        <h4 className="font-['Mukta_Malar'] text-[#E0F2F2] text-md font-semibold">{title}</h4>
        <p className="font-mono text-[#CCF7F4]/60 text-xs mt-0.5">{description}</p>
      </div>
      {/* The Mass Transfer Toggle */}
      <button 
        onClick={handleToggle}
        className="relative w-14 h-7 rounded-full bg-[#001111] shadow-[inset_0_2px_8px_rgba(0,0,0,0.9),inset_0_0_0_1px_rgba(0,55,55,0.4)] flex items-center p-1 cursor-pointer transition-colors duration-300 outline-none focus:ring-2 focus:ring-[#9932CC] focus:ring-offset-2 focus:ring-offset-[#002121]"
      >
        {/* Masa przeciskająca się do odpowiedniego bieguna */}
        <div className={`w-5 h-5 rounded-full bg-[#9932CC] shadow-[0_0_10px_#9932CC] transform transition-transform duration-[400ms] ${checked ? 'translate-x-7' : 'translate-x-0'}`}></div>
      </button>
    </div>
  );
};