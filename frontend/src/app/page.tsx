'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const SocialIcon = ({ children, href }: { children: React.ReactNode; href: string }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-[#b0c4de] hover:text-white transition-colors">
    {children}
  </a>
);

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

      {/* Obrazy dekoracyjne */}
      <Image src="/assets/icon_tipjar1.png" alt="deco" width={256} height={256} className="absolute top-1/4 left-0 opacity-10 -translate-x-1/3 z-0" />
      <Image src="/assets/logo_usdc_1.png" alt="deco 2" width={192} height={192} className="absolute bottom-1/4 left-0 opacity-5 -translate-x-1/4 z-0" />

      <div className="relative z-10 flex flex-col min-h-screen container mx-auto px-6 py-8">
        {/* 1. Navigation Header */}
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
          {/* 2. Hero Section */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start" style={{ minHeight: 'calc(90vh - 80px)' }}>
            {/* Lewa kolumna: Główny tekst i przyciski */}
            <div className="text-left pt-20">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Support Creativity,<br />Get Paid Instantly
              </h1>
              <p className="mt-6 text-2xl text-[#b0c4de] max-w-xl">
                tipjar.plus – platform for instant micro-payments to your favorite creators: streamers, YouTubers, digital models, musicians, artists, bloggers, coaches, educators, journalists, influencers - simply for all content creators, without high fees.
              </p>
              <div className="flex flex-col sm:flex-row items-start gap-4 mt-10">
                <a href="#" className="font-bold bg-[#FFD700] text-gray-900 py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/50 w-full sm:w-auto text-center">
                  Sign Up as Creator
                </a>
                <a href="#" className="font-bold text-white border-2 border-white bg-transparent py-3 px-6 rounded-lg hover:bg-white hover:text-[#0d2f3f] transition-colors duration-300 w-full sm:w-auto text-center">
                  Explore Creators
                </a>
                <a href="#" className="font-bold text-white bg-white bg-opacity-20 py-3 px-6 rounded-lg hover:bg-opacity-30 transition-colors duration-300 w-full sm:w-auto text-center">
                  Sign Up as a Fan
                </a>
              </div>
            </div>

            {/* Prawa kolumna: Przykładowy profil twórcy */}
            <div className="hidden lg:flex justify-end pt-24">
              <div className="bg-[#0f3a4d] rounded-2xl p-4 w-full max-w-sm border border-white border-opacity-10 shadow-2xl backdrop-blur-sm">
                <div className="relative -mt-20 flex justify-center">
                  <Image src="/assets/ja1.png" alt="Avatar Twórcy" width={160} height={160} className="bg-[#0f3a4d] rounded-full border-4 border-[#FFD700] object-cover" />
                </div>
                <div className="text-center mt-4">
                  <h3 className="text-2xl font-bold">@AdamDuda</h3>
                  <div className="flex justify-center items-center gap-2 mt-1">
                    <span className="text-sm text-[#b0c4de]">tipjar.plus/@AdamDuda</span>
                    <button onClick={handleCopy} className="text-[#b0c4de] hover:text-white transition-colors" title="Skopiuj link">
                      {isCopied ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                      )}
                    </button>
                  </div>
                </div>
                <div className="text-center mt-4 px-2">
                  <p className="text-sm text-[#b0c4de] max-w-xs mx-auto">
                    Founder of TipJar+ - built together with a team of AI agents. Advocate of freedom, decentralization, and blockchain technology. Web3 & AI pro user. Paleo-contact believer.
                  </p>
                </div>
                <div className="mt-6 px-2">
                  <input 
                    type="range" 
                    min="0.1" 
                    max="25" 
                    step="0.1" 
                    value={tipAmount}
                    onChange={(e) => setTipAmount(parseFloat(e.target.value))}
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                    style={sliderBackground}
                  />
                  <div className="text-sm text-[#b0c4de] text-center mt-2 font-bold">
                    ${tipAmount.toFixed(2)} USDC
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-4 gap-2 px-2">
                  <button onClick={() => setTipAmount(1)} className={`py-2 rounded-lg text-sm transition-colors ${tipAmount === 1 ? 'bg-[#FFD700] text-gray-900 font-bold' : 'bg-white bg-opacity-10 text-white hover:bg-opacity-20'}`}>$1</button>
                  <button onClick={() => setTipAmount(2)} className={`py-2 rounded-lg text-sm transition-colors ${tipAmount === 2 ? 'bg-[#FFD700] text-gray-900 font-bold' : 'bg-white bg-opacity-10 text-white hover:bg-opacity-20'}`}>$2</button>
                  <button onClick={() => setTipAmount(5)} className={`py-2 rounded-lg text-sm transition-colors ${tipAmount === 5 ? 'bg-[#FFD700] text-gray-900 font-bold' : 'bg-white bg-opacity-10 text-white hover:bg-opacity-20'}`}>$5</button>
                  <button onClick={() => setTipAmount(10)} className={`py-2 rounded-lg text-sm transition-colors ${tipAmount === 10 ? 'bg-[#FFD700] text-gray-900 font-bold' : 'bg-white bg-opacity-10 text-white hover:bg-opacity-20'}`}>$10</button>
                </div>
                <div className="text-center mt-4">
                  <a href="#" className="w-full font-bold bg-[#FFD700] text-gray-900 py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/50 block text-lg">
                    Tip ${tipAmount.toFixed(2)}
                  </a>
                </div>
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
          {/* Reszta sekcji (możesz podlinkować do odpowiednich komponentów lub wkleić na sztywno) */}
         {/* Sekcja "Start Building..." */}
<section className="py-20 text-left">
  <div className="max-w-4xl mx-auto">
    <h2 className="text-4xl font-bold mb-6">🌍 Start Building Your Page with tipjar+</h2>
    <p className="text-lg text-[#b0c4de] mb-6">Accept tips in USDC — instantly, globally, and without borders.</p>
    
    <p className="text-lg text-[#b0c4de] mb-6">
      Support from fans via crypto, Google Pay, Apple Pay, bank transfer, PayPal, and Revolut has never been faster or more accessible.
    </p>

    <div className="bg-white bg-opacity-10 p-6 rounded-lg mb-8">
      <p className="text-xl font-semibold text-center">💡 No bank accounts. No delays. No restrictions.</p>
    </div>

    <p className="text-lg text-[#b0c4de] mb-6">
      Whether you're a streamer, educator, or meme legend — TipJar+ gives you a modern, customizable Web3 page to collect tips in minutes.
    </p>
    
    <div className="bg-white bg-opacity-5 p-6 rounded-lg border border-white border-opacity-10 mb-8">
      <p className="text-lg text-[#b0c4de] mb-4">🪙 Powered by Circle.com, every contribution lands in your USDC wallet — a fully reserved, dollar-pegged stablecoin trusted by millions worldwide.</p>
      <ul className="space-y-2 text-lg text-white">
        <li className="flex items-center"><span className="text-green-400 mr-2">✅</span> Over $200B processed</li>
        <li className="flex items-center"><span className="text-green-400 mr-2">✅</span> Regulated infrastructure</li>
        <li className="flex items-center"><span className="text-green-400 mr-2">✅</span> Backed 1:1 with USD in cash and short-term U.S. Treasuries</li>
      </ul>
    </div>
    
    <p className="text-lg text-[#b0c4de] font-bold mb-4">💸 PAYOUTS AVAILABLE IN: USDC, USD, EURO AND YOUR LOCAL CURRENCY.</p>

    <p className="text-lg text-[#b0c4de] mb-8">
      Circle enables seamless conversion from USDC into over 80+ fiat currencies — including PLN, GBP, CHF, AUD, CAD, MXN, JPY, SEK, NOK, CZK, and many more.
      Funds can be withdrawn via SWIFT, SEPA, or local banking rails, depending on your region.
    </p>

    <p className="text-lg text-[#b0c4de]">
      📲 Share your tipjar+ via QR code, widget, smart link, or image — and start receiving tips anytime, anywhere.
    </p>
  </div>
</section>
         
          {/* Sekcja Dlaczego TipJar, Start Building, AI Studio, Social Proof */}
          <section className="mt-24">
            <h2 className="text-4xl font-bold text-center text-white mb-12">Why TipJar+?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-[#123647] p-6 rounded-xl text-center text-white">
                <h3 className="text-xl font-bold mb-2">Fiat & Crypto</h3>
                <p>Send tips using card, Apple Pay, GPay, Revolut or any crypto.</p>
              </div>
              <div className="bg-[#123647] p-6 rounded-xl text-center text-white">
                <h3 className="text-xl font-bold mb-2">No Wallet Needed</h3>
                <p>Fans can tip instantly – no login or wallet required.</p>
              </div>
              <div className="bg-[#123647] p-6 rounded-xl text-center text-white">
                <h3 className="text-xl font-bold mb-2">Built on USDC</h3>
                <p>Tips are paid out in stablecoin backed by Circle.com</p>
              </div>
              <div className="bg-[#123647] p-6 rounded-xl text-center text-white">
                <h3 className="text-xl font-bold mb-2">Built by AI</h3>
                <p>This project is fully created with AI agents + human alignment.</p>
              </div>
            </div>
          </section>

          {/* Footer Placeholder */}
          <footer className="mt-24 py-12 border-t border-white border-opacity-10 text-center text-white text-sm opacity-50">
            © {new Date().getFullYear()} TipJar+. All rights reserved.
          </footer>
        </main>
      </div>
    </div>
  );
}
