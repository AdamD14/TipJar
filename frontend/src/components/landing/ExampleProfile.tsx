'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Upload, Copy, Check, X } from 'lucide-react';

interface PaymentIconProps {
  name: string;
  children: React.ReactNode;
}

const PaymentIcon: React.FC<PaymentIconProps> = ({ name, children }) => (
  <div className="flex items-center justify-center bg-white bg-opacity-10 rounded-md hover:bg-opacity-20 transition-colors cursor-pointer" title={name}>
    {children}
  </div>
);

interface TipModalProps {
  isOpen: boolean;
  onClose: () => void;
  creatorName?: string;
  creatorHandle?: string;
  creatorAvatar?: string;
  creatorBio?: string;
}

export default function TipModal({ 
  isOpen, 
  onClose, 
  creatorName = "@AdamDuda",
  creatorHandle = "AdamDuda", 
  creatorAvatar = "/weeee.png",
  creatorBio = "Founder of tipjar+ - built together with a team of AI agents. Advocate of freedom, decentralization, and blockchain technology. Web3 & AI pro user. Paleo-contact believer."
}: TipModalProps) {
  const [tipAmount, setTipAmount] = useState<number>(5);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [avatarSrc, setAvatarSrc] = useState<string>(creatorAvatar);

  if (!isOpen) return null;

  const handleCopy = () => {
    const textToCopy = `tipjar.plus/${creatorName}`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(textToCopy).then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      }).catch(err => {
        console.error('Async copy failed', err);
      });
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = textToCopy;
      textArea.style.position = 'fixed';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch (err) {
        console.error('Fallback copy failed', err);
      }
      document.body.removeChild(textArea);
    }
  };

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarSrc(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const sliderPercentage = (tipAmount / 20) * 100;
  const sliderBackground = {
    background: `linear-gradient(to right, #FFD700 ${sliderPercentage}%, rgba(255, 255, 255, 0.1) ${sliderPercentage}%)`,
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-75 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-[#0f3a4d] rounded-2xl p-6 w-full max-w-sm border border-white border-opacity-10 shadow-2xl backdrop-blur-sm">
        
        {/* Custom Styles */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes pulse-glow {
            0%, 100% {
              box-shadow: 0 0 5px rgba(255, 215, 0, 0.5), 0 0 10px rgba(255, 215, 0, 0.5), 0 0 15px rgba(255, 215, 0, 0.5);
              border-color: rgba(255, 215, 0, 0.7);
            }
            50% {
              box-shadow: 0 0 15px rgba(255, 215, 0, 0.8), 0 0 25px rgba(255, 215, 0, 0.8), 0 0 35px rgba(255, 215, 0, 0.8);
              border-color: #FFD700;
            }
          }
          .pulsing-glow {
            animation: pulse-glow 4s infinite ease-in-out;
          }
          input[type=range]::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 20px;
            height: 20px;
            background: #FFD700;
            cursor: pointer;
            border-radius: 50%;
            border: 2px solid #0f3a4d;
            margin-top: -7px;
          }
          input[type=range]::-webkit-slider-runnable-track {
            height: 6px;
            border-radius: 8px;
          }
          input[type=range]:focus {
            outline: none;
          }
          input[type=range]::-moz-range-thumb {
            width: 20px;
            height: 20px;
            background: #FFD700;
            cursor: pointer;
            border-radius: 50%;
            border: 2px solid #0f3a4d;
          }
          input[type=range]::-moz-range-track {
            height: 6px;
            border-radius: 8px;
          }
        `}} />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-[#FFD700] transition-colors"
        >
          <X size={20} />
        </button>

        {/* Avatar Section with Upload */}
        <div className="flex justify-center relative -mt-12 mb-4">
          <div className="relative group">
            <div className="w-[120px] h-[120px] rounded-full overflow-hidden border-4 border-[#FFD700] bg-[#0f3a4d] flex items-center justify-center pulsing-glow">
              <Image
                src={avatarSrc}
                alt="Avatar"
                width={120}
                height={120}
                className="object-cover w-full h-full"
              />
            </div>
            
            {/* Upload Overlay */}
            <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              <Upload size={20} className="text-white" />
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Profile Info */}
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold text-white">{creatorName}</h3>
          <div className="flex justify-center items-center gap-2 mt-1">
            <span className="text-sm text-[#b0c4de]">tipjar.plus/{creatorName}</span>
            <button 
              onClick={handleCopy} 
              className="text-[#b0c4de] hover:text-white transition-colors p-1" 
              title="Copy link"
            >
              {isCopied ? (
                <Check size={14} className="text-green-400" />
              ) : (
                <Copy size={14} />
              )}
            </button>
          </div>
        </div>

        {/* Bio */}
        <div className="text-center mb-4">
          <p className="text-xs text-[#b0c4de] leading-relaxed">
            {creatorBio}
          </p>
        </div>

        {/* Tip Slider */}
        <div className="mb-4">
          <div className="text-center mb-2">
            <span className="text-lg font-bold text-[#FFD700]">${tipAmount.toFixed(2)}</span>
          </div>
          <input 
            type="range" 
            min="0.1" 
            max="20" 
            step="0.1" 
            value={tipAmount} 
            onChange={(e) => setTipAmount(parseFloat(e.target.value))} 
            className="w-full h-[6px] rounded-lg appearance-none cursor-pointer" 
            style={sliderBackground} 
          />
        </div>

        {/* Quick Amount Buttons */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          {[1, 2, 5, 10].map(amount => (
            <button 
              key={amount}
              onClick={() => setTipAmount(amount)} 
              className={`py-2 rounded-lg text-sm transition-colors ${
                tipAmount === amount 
                  ? 'bg-[#FFD700] text-gray-900 font-bold' 
                  : 'bg-white bg-opacity-10 text-white hover:bg-opacity-20'
              }`}
            >
              ${amount}
            </button>
          ))}
        </div>

        {/* Tip Button */}
        <div className="text-center mb-4">
          <button className="w-full font-bold bg-[#FFD700] text-gray-900 py-3 px-4 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/50 text-lg flex items-center justify-center gap-2">
            Tip ${tipAmount.toFixed(2)}
            <Image 
              src="/assets/logo_usdc_1.png" 
              width={24} 
              height={24} 
              className="object-cover opacity-80" 
              alt="USDC Logo" 
            />
          </button>
        </div>

        {/* Payment Methods */}
        <div className="grid grid-cols-6 gap-1 mb-3">
          <PaymentIcon name="Google Pay">
            <Image src="/assets/Google_Pay_Logo.svg" alt="Google Pay" width={20} height={20} className="object-contain" />
          </PaymentIcon>
          <PaymentIcon name="Apple Pay">
            <Image src="/assets/Apple_Pay_Mark_RGB.svg" alt="Apple Pay" width={20} height={20} className="object-contain" />
          </PaymentIcon>
          <PaymentIcon name="Metamask">
            <Image src="/assets/MetaMask-icon-fox.svg" alt="Metamask" width={20} height={20} className="object-contain" />
          </PaymentIcon>
          <PaymentIcon name="Revolut">
            <Image src="/assets/revolut.svg" alt="Revolut" width={20} height={20} className="object-contain" />
          </PaymentIcon>
          <PaymentIcon name="WalletConnect">
            <Image src="/assets/wc.svg" alt="WalletConnect" width={20} height={20} className="object-contain" />
          </PaymentIcon>
          <PaymentIcon name="Bank">
            <Image src="/assets/bank-svgrepo-com.svg" alt="Bank" width={20} height={20} className="object-contain" />
          </PaymentIcon>
        </div>

        {/* One Click Demo Text */}
        <div className="text-center">
          <p className="text-xs text-[#FFD700] font-semibold">
            ⚡ One click and done!
          </p>
        </div>
      </div>
    </div>
  );
}