'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const PaymentIcon = ({ children, name }: { children: React.ReactNode; name: string }) => (
  <div title={name} className="bg-white bg-opacity-10 h-8 w-12 rounded-md flex items-center justify-center text-white p-1">
    {children}
  </div>
);

export default function Page() {
  const [tipAmount, setTipAmount] = useState(10);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    const textToCopy = 'tipjar.plus/@AdamDuda';
    const textArea = document.createElement('textarea');
    textArea.value = textToCopy;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Copy failed', err);
    }
    document.body.removeChild(textArea);
  };

  const sliderPercentage = (tipAmount / 25) * 100;
  const sliderBackground = {
    background: `linear-gradient(to right, #FFD700 ${sliderPercentage}%, rgba(255, 255, 255, 0.1) ${sliderPercentage}%)`,
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('/assets/back.png')" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          background: #FFD700;
          cursor: pointer;
          border-radius: 50%;
          border: 2px solid #0f3a4d;
        }
        input[type=range]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: #FFD700;
          cursor: pointer;
          border-radius: 50%;
          border: 2px solid #0f3a4d;
        }
      `}} />
      <div className="absolute inset-0 bg-[#0d2f3f] bg-opacity-40"></div>

      {/* Background images */}
      <Image src="/assets/icon_tipjar1.png" alt="deco" width={256} height={256} className="absolute top-1/4 left-0 opacity-10 -translate-x-1/3 z-0" />
      <Image src="/assets/logo_usdc_1.png" alt="deco 2" width={192} height={192} className="absolute bottom-1/4 left-0 opacity-5 -translate-x-1/4 z-0" />

      <div className="relative z-10 flex flex-col min-h-screen container mx-auto px-6 py-8">
        <header>
          <nav className="flex justify-between items-center">
            <a href="#" className="flex items-center space-x-2" aria-label="Strona główna TipJar+">
              <Image src="/assets/icon_tipjar1.png" alt="TipJar+ Logo" width={40} height={40} />
              <span className="text-2xl font-bold">tipjar.plus</span>
            </a>
            <div className="flex items-center space-x-6">
              <a href="#" className="font-bold bg-[#FFD700] text-gray-900 py-2 px-5 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/50 text-sm">
                Begin as a Creator
              </a>
              <a href="#" className="font-bold text-white border-2 border-white bg-transparent py-2 px-5 rounded-lg hover:bg-white hover:text-[#0d2f3f] transition-colors duration-300 text-sm">
                Login
              </a>
            </div>
          </nav>
        </header>

        <main className="flex-grow">
          {/* Hero Section */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start" style={{ minHeight: 'calc(90vh - 80px)' }}>
            {/* Left column */}
            <div className="text-left pt-20">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Support Creativity,<br />Get Paid Instantly
              </h1>
              <p className="mt-6 text-2xl text-[#b0c4de] max-w-xl">
                tipjar.plus – platform for instant micro-payments to your favorite creators...
              </p>
              <div className="flex flex-col sm:flex-row items-start gap-4 mt-10">
                <a href="#" className="font-bold bg-[#FFD700] text-gray-900 py-3 px-6 rounded-lg hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/50 w-full sm:w-auto text-center">Sign Up as Creator</a>
                <a href="#" className="font-bold text-white border-2 border-white py-3 px-6 rounded-lg hover:bg-white hover:text-[#0d2f3f] w-full sm:w-auto text-center">Explore Creators</a>
                <a href="#" className="font-bold text-white bg-white bg-opacity-20 py-3 px-6 rounded-lg hover:bg-opacity-30 w-full sm:w-auto text-center">Sign Up as a Fan</a>
              </div>
            </div>

            {/* Right column */}
            <div className="hidden lg:flex justify-end pt-24">
              <div className="bg-[#0f3a4d] rounded-2xl p-4 w-full max-w-sm border border-white border-opacity-10 shadow-2xl backdrop-blur-sm">
                <div className="relative -mt-20 flex justify-center">
                  <Image src="/assets/ja1.png" alt="Avatar Twórcy" width={160} height={160} className="bg-[#0f3a4d] rounded-full border-4 border-[#FFD700] object-cover" />
                </div>
                <div className="text-center mt-4">
                  <h3 className="text-2xl font-bold">@AdamDuda</h3>
                  <div className="flex justify-center items-center gap-2 mt-1">
                    <span className="text-sm text-[#b0c4de]">tipjar.plus/@AdamDuda</span>
                    <button onClick={handleCopy} className="text-[#b0c4de] hover:text-white" title="Copy link">
                      {isCopied ? '✅' : '📋'}
                    </button>
                  </div>
                </div>
                <div className="text-center mt-4 px-2">
                  <p className="text-sm text-[#b0c4de] max-w-xs mx-auto">
                    Founder of TipJar+ — built with a team of AI agents. Web3 & AI pro user. Paleo-contact believer.
                  </p>
                </div>

                {/* Tip slider */}
                <div className="mt-6 px-2">
                  <input type="range" min="0.1" max="25" step="0.1" value={tipAmount} onChange={(e) => setTipAmount(parseFloat(e.target.value))} className="w-full h-2 rounded-lg appearance-none cursor-pointer" style={sliderBackground} />
                  <div className="text-sm text-[#b0c4de] text-center mt-2 font-bold">${tipAmount.toFixed(2)} USDC</div>
                </div>

                {/* Tip buttons */}
                <div className="mt-4 grid grid-cols-4 gap-2 px-2">
                  {[1, 2, 5, 10].map((amount) => (
                    <button key={amount} onClick={() => setTipAmount(amount)} className={`py-2 rounded-lg text-sm transition-colors ${tipAmount === amount ? 'bg-[#FFD700] text-gray-900 font-bold' : 'bg-white bg-opacity-10 text-white hover:bg-opacity-20'}`}>${amount}</button>
                  ))}
                </div>

                {/* Tip CTA */}
                <div className="text-center mt-4">
                  <a href="#" className="w-full font-bold bg-[#FFD700] text-gray-900 py-3 px-6 rounded-lg hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/50 block text-lg">
                    Tip ${tipAmount.toFixed(2)}
                  </a>
                </div>

                {/* Payment icons */}
                <div className="mt-4 flex justify-center items-center gap-2">
                  <PaymentIcon name="Google Pay">G</PaymentIcon>
                  <PaymentIcon name="Apple Pay"></PaymentIcon>
                  <PaymentIcon name="Revolut">R</PaymentIcon>
                  <PaymentIcon name="PayPal">P</PaymentIcon>
                  <PaymentIcon name="Crypto">$</PaymentIcon>
                </div>
              </div>
            </div>
          </section>

          {/* TODO: Insert remaining sections (WhyTipJarSection, etc.) */}
        </main>
      </div>
    </div>
  );
}
