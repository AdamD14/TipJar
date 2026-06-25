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
    if (onToggle) onToggle(nextState);
  };

  return (
    <div
      className="glass-liquid gpu-layer relative w-full rounded-xl p-5 flex items-center justify-between"
      style={{
        border: '1px solid color-mix(in oklch, var(--teal-100) 15%, transparent)',
        transition: 'filter 0.3s ease',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.filter = 'brightness(1.05)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.filter = ''; }}
    >
      <div className="mr-4">
        <h4
          className="text-md font-semibold font-heading"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          {title}
        </h4>
        <p
          className="text-xs mt-0.5"
          style={{ color: 'color-mix(in oklch, var(--color-text-tertiary) 60%, transparent)' }}
        >
          {description}
        </p>
      </div>
      <button
        onClick={handleToggle}
        className="relative w-14 h-7 rounded-full flex items-center p-1 cursor-pointer outline-none focus:ring-2 focus:ring-offset-2"
        style={{
          backgroundColor: 'var(--teal-900)',
          boxShadow: 'inset 0 2px 8px color-mix(in oklch, #000 90%, transparent), inset 0 0 0 1px color-mix(in oklch, var(--teal-800) 40%, transparent)',
          transition: 'background-color 0.3s',
          ['--tw-ring-color' as string]: 'var(--gold-400)',
          ['--tw-ring-offset-color' as string]: 'var(--teal-800)',
        }}
      >
        <div
          className="w-5 h-5 rounded-full transform"
          style={{
            backgroundColor: 'var(--gold-400)',
            boxShadow: `0 0 10px color-mix(in oklch, var(--gold-400) 60%, transparent)`,
            transition: 'transform 400ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease',
            transform: checked ? 'translateX(28px)' : 'translateX(0)',
          }}
        />
      </button>
    </div>
  );
};

export default MassTransferToggleCard;
