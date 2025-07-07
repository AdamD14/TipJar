'use client';


import React, { useState, useEffect } from 'react';
import QRGenerator from "../components/QRGenerator.tsx";
import Image from "next/image";

type PaymentIconProps = {
  children: React.ReactNode;
  name: string;
};

const PaymentIcon = ({ children, name }: PaymentIconProps) => (
  <div
    title={name}
    className="w-full h-full bg-white bg-opacity-10 rounded-lg flex items-center justify-center text-white hover:scale-105 transition-transform"
    style={{
      minHeight: 0,
      minWidth: 0,
      padding: 0,
      margin: 0
    }}
  >
    {children}
  </div>
);


export default function Page() {
  const [tipAmount, setTipAmount] = useState(10);
  const [isCopied, setIsCopied] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

useEffect(() => {
  const onScroll = () => setIsScrolled(window.scrollY > 20);
  window.addEventListener('scroll', onScroll);
  return () => window.removeEventListener('scroll', onScroll);
}, []);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleCopy = () => {
    const textToCopy = 'tipjar.plus/@AdamDuda';
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

  const sliderPercentage = (tipAmount / 20) * 100;
  const sliderBackground = {
    background: `linear-gradient(to right, #FFD700 ${sliderPercentage}%, rgba(255, 255, 255, 0.1) ${sliderPercentage}%)`,
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-cover bg-center bg-fixed text-white" style={{ backgroundImage: "url('/assets/back.png')" }}>
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
        input[type=range]::-ms-track {
          width: 100%;
          height: 6px;
          cursor: pointer;
          background: transparent;
          border-color: transparent;
          color: transparent;
        }
        input[type=range]::-ms-fill-lower {
          background: #FFD700;
          border-radius: 8px;
        }
        input[type=range]::-ms-fill-upper {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 8px;
        }
        input[type=range]::-ms-thumb {
          width: 20px;
          height: 20px;
          background: #FFD700;
          cursor: pointer;
          border-radius: 50%;
          border: 2px solid #0f3a4d;
          margin-top: 0;
        }
      `}} />

      <div className="relative">
  <Image
    src="/assets/usdc.png"
    alt="deco 2"
    width={640}
    height={640}
    className="absolute left-1/2 top-40 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-10"
    priority
  />
  <div className="absolute inset-0 bg-[#0d2f3f] bg-opacity-70"></div>
</div>

      <div className="relative z-10 flex flex-col min-h-screen container mx-auto px-4">
        <header className={`fixed top-0 left-0 right-0 z-50 w-full border-b border-white border-opacity-10 transition-colors duration-300
  ${isScrolled ? 'bg-[#0d2f3f] bg-opacity-95' : 'bg-[#0d2f3f] bg-opacity-30 backdrop-blur-lg'}
`}>
          <nav className="grid grid-cols-3 items-center w-full h-15">
            <div className="flex justify-start">
              <a href="#" className="flex items-center space-x-2" aria-label="Strona główna TipJar+">
                <Image src="/assets/icon_tipjarnone.png" alt="TipJar+ Logo" width={60} height={60} />
                <span className="text-2xl font-bold text-white">tipjar.plus</span>
              </a>
            </div>
    {/* Linki – środek */}
    <div className="hidden md:flex items-center justify-center gap-6 text-base whitespace-nowrap">
      <a href="#why" className="text-white hover:text-yellow-400 transition">Why tipjar+?</a>
      <a href="#how-it-works" className="text-white hover:text-yellow-400 transition">How it works?</a>
      <a href="#start-building" className="text-white hover:text-yellow-400 transition">Start Building</a>
      <a href="#explore" className="text-white hover:text-yellow-400 transition">Explore</a>
      <a href="#learn" className="text-white hover:text-yellow-400 transition">Learn</a>
      <a href="#ai-studio" className="text-white hover:text-yellow-400 transition">AI Studio</a>
    </div>

    {/* CTA – prawa strona */}
    <div className="hidden md:flex justify-end items-center gap-3 pr-6">
      <a href="#" className="bg-[#FFD700] text-gray-900 font-bold py-2 px-4 rounded-lg text-sm hover:scale-105 transition">
        Begin as a Creator
      </a>
      <a href="#" className="border border-white text-white font-bold py-2 px-4 rounded-lg text-sm hover:bg-white hover:text-[#0d2f3f] transition">
        Login
      </a>
    </div>

    {/* Hamburger – mobile */}
    <button onClick={toggleMenu} className="md:hidden text-white justify-self-end pr-4" aria-label="Menu">
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {isMenuOpen ? (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        )}
      </svg>
    </button>
  </nav>

  {/* Menu mobile */}
  {isMenuOpen && (
    <div className="md:hidden bg-[#0f3a4d] bg-opacity-90 p-4 space-y-2 text-center border-t border-white border-opacity-10">
      {[
        ['#why', 'Why tipjar+?'],
        ['#how-it-works', 'How it works?'],
        ['#start-building', 'Start Building'],
        ['#explore', 'Explore'],
        ['#learn', 'Learn'],
        ['#ai-studio', 'AI Studio']
      ].map(([href, label]) => (
        <a key={href} href={href} onClick={toggleMenu} className="block text-white hover:text-yellow-400 transition">
          {label}
        </a>
      ))}
      <a href="#" onClick={toggleMenu} className="block bg-[#FFD700] text-[#0d2f3f] font-bold py-2 px-4 rounded-lg hover:scale-105 transition">
        Begin as a Creator
      </a>
      <a href="#" onClick={toggleMenu} className="block border border-white text-white font-bold py-2 px-4 rounded-lg hover:bg-white hover:text-[#0d2f3f] transition">
        Login
      </a>
    </div>
  )}
</header>


        <main className="flex-grow">
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start pt-20" style={{ minHeight: 'calc(90vh - 80px)' }}>
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

            <div className="hidden lg:flex justify-end pt-20">
              <div className="bg-[#0f3a4d] rounded-2xl p-2 pb-4 w-full max-w-xs border border-white border-opacity-10 shadow-2xl backdrop-blur-sm">
                <div className="flex justify-center relative -mt-16 shadow-xl">
                  <div className="w-[180px] h-[180px] rounded-full overflow-hidden border-4 border-[#FFD700] bg-[#0f3a4d] flex items-center justify-center">
                    <Image
                      src="/assets/we.png"
                      alt="Avatar Twórcy"
                      width={200}
                      height={200}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
                <div className="text-center mt-2">
                  <h3 className="text-2xl font-bold">@AdamDuda</h3>
                  <div className="flex justify-center items-center gap-2 mt-1">
                    <span className="text-sm text-[#b0c4de]">tipjar.plus/@AdamDuda</span>
                    <button onClick={handleCopy} className="text-[#b0c4de] hover:text-white transition-colors" title="Skopiuj link">
                      {isCopied ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
                <div className="text-center mt-2 px-1">
                  <p className="text-sm text-[#b0c4de] max-w-xs mx-auto">
                    Founder of tipjar+ - built together with a team of AI agents. Advocate of freedom, decentralization, and blockchain technology. Web3 & AI pro user. Paleo-contact believer.
                  </p>
                </div>
                <div className="mt-4 px-2">
                  <input type="range" min="0.1" max="20" step="0.1" value={tipAmount} onChange={(e) => setTipAmount(parseFloat(e.target.value))} className="w-full h-[6px] rounded-lg appearance-none cursor-pointer" style={sliderBackground} />
                </div>
                <div className="mt-4 grid grid-cols-4 gap-2 px-2">
                  <button onClick={() => setTipAmount(1)} className={`py-2 rounded-lg text-sm transition-colors ${tipAmount === 1 ? 'bg-[#FFD700] text-gray-900 font-bold' : 'bg-white bg-opacity-10 text-white hover:bg-opacity-20'}`}>$1</button>
                  <button onClick={() => setTipAmount(2)} className={`py-2 rounded-lg text-sm transition-colors ${tipAmount === 2 ? 'bg-[#FFD700] text-gray-900 font-bold' : 'bg-white bg-opacity-10 text-white hover:bg-opacity-20'}`}>$2</button>
                  <button onClick={() => setTipAmount(5)} className={`py-2 rounded-lg text-sm transition-colors ${tipAmount === 5 ? 'bg-[#FFD700] text-gray-900 font-bold' : 'bg-white bg-opacity-10 text-white hover:bg-opacity-20'}`}>$5</button>
                  <button onClick={() => setTipAmount(10)} className={`py-2 rounded-lg text-sm transition-colors ${tipAmount === 10 ? 'bg-[#FFD700] text-gray-900 font-bold' : 'bg-white bg-opacity-10 text-white hover:bg-opacity-20'}`}>$10</button>
                </div>
                <div className="text-center mt-4 px-2">
                  <a href="#" className="w-full font-bold bg-[#FFD700] text-gray-900 py-3 px-4 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/50 text-lg inline-flex items-center justify-center gap-2">
                    Tip ${tipAmount.toFixed(2)}
                    <Image src="/assets/logo_usdc_1.png" width={28} height={28} className="object-cover opacity-80" alt="USDC Logo" />
                  </a>
                </div>
               <div className="mt-2 grid grid-cols-6 gap-[4px] px-2 h-8">
  <PaymentIcon name="Google Pay">
    <Image src="/assets/Google_Pay_Logo.svg" alt="Google Pay"  width={36}
      height={36} className="object-contain"/>
  </PaymentIcon>
  <PaymentIcon name="Apple Pay">
    <Image src="/assets/Apple_Pay_Mark_RGB.svg" alt="Apple Pay"  width={32}
      height={32} className="object-contain"/>  
  </PaymentIcon>
  <PaymentIcon name="Metamask">
    <Image src="/assets/MetaMask-icon-fox.svg" alt="Metamask"  width={30}
      height={30} className="object-contain"/>
  </PaymentIcon>
  <PaymentIcon name="Revolut">
     <Image src="/assets/revolut.svg" alt="Revolut"  width={36}
      height={36} className="object-contain" />
  </PaymentIcon>
  <PaymentIcon name="WalletConnect">
    <Image src="/assets/wc.svg" alt="WalletConnect"  width={36}
      height={36} className="object-contain" />
  </PaymentIcon>
  <PaymentIcon name="Bank">
    <Image src="/assets/bank-svgrepo-com.svg" alt="Bank"  width={26}
      height={26} className="object-contain"/>
  </PaymentIcon>
</div>
              </div>
            </div>
          </section>

          {/* --- SECTIONS IN ORDER --- */}

          <section id="why" className="py-20">
            <h2 className="text-4xl font-bold text-center text-white mb-16">Why tipjar+?</h2>
            <div className="max-w-6xl mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-[#123647] p-6 rounded-xl text-center text-white transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                  <h3 className="text-2xl font-bold mb-2">Simplicity & Payment Flexibility</h3>
                  <p className="text-[#b0c4de]">No sign-up required, no crypto experience needed. Fans can tip using <strong className="text-yellow-400">cards</strong>, <strong className="text-yellow-400">Google Pay</strong>, <strong className="text-yellow-400">Apple Pay</strong>, <strong className="text-yellow-400">Revolut</strong>, <strong className="text-yellow-400">bank transfer</strong> or <strong className="text-yellow-400">Crypto wallet</strong> — creators always receive USDC. Just tap, scan, or click — done in seconds.</p>
                </div>
                <div className="bg-[#123647] p-6 rounded-xl text-center text-white transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                  <h3 className="text-2xl font-bold mb-2">Secure and Transparent</h3>
                  <p className="text-[#b0c4de]">Built on Web3 technology, tipjar ensures secure and transparent transactions. Powered by blockchain and USDC — a fully-reserved, regulated stablecoin <strong className="text-yellow-400">issued by Circle.com</strong>. No custodians, no banks — you stay in full control.</p>
                </div>
              </div>
              
              <div className="bg-[#0f3a4d] p-8 rounded-2xl text-center text-white border-2 border-yellow-400 pulsing-glow transform transition-transform duration-500 hover:scale-105 my-8">
                <h3 className="text-3xl font-bold mb-4 text-yellow-400">LOW FEES & Direct Support</h3>
                <p className="text-lg text-gray-200 max-w-3xl mx-auto">
                  A simple, flat <strong className="text-yellow-400">5% service fee</strong> ensures creators receive the majority of their earnings. Creators receive tips directly from their fans, eliminating intermediaries and maximizing earnings.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                <div className="bg-[#123647] p-6 rounded-xl text-center text-white transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                  <h3 className="text-2xl font-bold mb-2">Global</h3>
                  <p className="text-[#b0c4de]">Send or receive support from anywhere in the world — no banks, no borders, no limits. Circle enables fans to tip using over <strong className="text-yellow-400">80</strong> fiat currencies including USD, EUR, GBP, JPY. Creators get paid instantly in USDC, directly to their wallets. Fast, borderless, censorship-free.</p>
                </div>
                <div className="bg-[#123647] p-6 rounded-xl text-center text-white transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                  <h3 className="text-2xl font-bold mb-2">Instant Payouts</h3>
                  <p className="text-[#b0c4de]">Funds are delivered instantly to the creator’s wallet — with no delays, no holds, and no frozen assets. You earn it, you own it — right away. Need cash? You can easily convert and withdraw to your <strong className="text-yellow-400">local currency</strong> anytime via Circle’s off-ramps.</p>
                </div>
              </div>
            </div>
          </section>

        <section id="how-it-works" className="py-20">
  <h2 className="text-4xl font-bold text-center text-white mb-12">How it works?</h2>
  <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-24">
    {/* For Fans */}
    <div className="bg-white bg-opacity-5 p-8 rounded-xl border border-white border-opacity-10">
      <h3 className="text-3xl font-bold text-center text-yellow-400 mb-8">For Fans</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-stretch">
        <div className="flex flex-col items-center text-center h-full">
          <Image src="/assets/regi.png" alt="Register Icon" width={176} height={176} className="w-32 h-32 sm:w-44 sm:h-44 object-contain mx-auto mb-4" />
          <h4 className="text-xl font-semibold mb-2">Sign Up (Optional)</h4>
          <p className="text-[#b0c4de] text-sm">Use email, Google, Twitch, or MetaMask. Registration isn&apos;t required to send tips.</p>
        </div>
        <div className="flex flex-col items-center text-center h-full">
          <Image src="/assets/opup.png" alt="Fund your tips icon" width={176} height={176} className="w-32 h-32 sm:w-44 sm:h-44 object-contain mx-auto mb-4" />
          <h4 className="text-xl font-semibold mb-2">Fund Your Tips</h4>
          <p className="text-[#b0c4de] text-sm mb-3">Top up with USDC using crypto or your preferred payment method.</p>
          <div className="grid grid-cols-3 gap-2 w-full max-w-[200px]">
            {/* Payment icons (nie zmieniaj tutaj rozmiaru) */}
          </div>
        </div>
        <div className="flex flex-col items-center text-center h-full">
          <Image src="/assets/explore.png" alt="Tip" width={176} height={176} className="w-32 h-32 sm:w-44 sm:h-44 object-contain mx-auto mb-4" />
          <h4 className="text-xl font-semibold mb-2">Explore!</h4>
          <p className="text-[#b0c4de] text-sm">Discover Web3 skills and inspiration — from streamers and models to musicians, educators, coaches, and influencers.
.</p>
        </div>
        <div className="flex flex-col items-center text-center h-full">
          <Image src="/assets/tipit3.png" alt="Tip" width={176} height={176} className="w-32 h-32 sm:w-44 sm:h-44 object-contain mx-auto mb-4" />
          <h4 className="text-xl font-semibold mb-2">Support!</h4>
          <p className="text-[#b0c4de] text-sm">Real people real value. Find creators sharing knowledge and experiences for the new digital era.</p>
        </div>
        <div className="flex flex-col items-center text-center h-full">
          <Image
            src="/assets/beapart.png"
            alt="Tip"
            width={176}
            height={176}
            className="w-32 h-32 sm:w-44 sm:h-44 object-contain mx-auto mb-4"
          />
          <h4 className="text-xl font-semibold mb-2">Enjoy the journey!</h4>
          <p className="text-[#b0c4de] text-sm">Fuel the movement</p>
        </div>
        <div className="flex flex-col items-center text-center h-full">
          <Image
            src="/assets/getaa.png"
            alt="Enjoy"
            width={176}
            height={176}
            className="w-32 h-32 sm:w-44 sm:h-44 object-contain mx-auto mb-4"
          />
          <h4 className="text-xl font-semibold mb-2">Contribute to the culture,</h4>
          <p className="text-[#b0c4de] text-sm">be part of the style.</p>
        </div>
      </div>
    </div>

    {/* For Creators Column */}
    <div className="bg-white bg-opacity-5 p-8 rounded-xl border border-white border-opacity-10">
      <h3 className="text-3xl font-bold text-center text-yellow-400 mb-8">For Creators</h3>
      <div className="grid grid-cols-3 sm:grid-cols-2 gap-3 items-stretch">
        <div className="flex flex-col items-center text-center h-full">
          <Image
            src="/assets/ful.png"
            alt="Stylized avatar icon with a golden crown representing creator ownership and independence, set against a vibrant digital background. The image conveys empowerment and confidence."
            width={176}
            height={176}
            className="w-32 h-32 sm:w-44 sm:h-44 object-contain mx-auto mb-4"
          />
          <h4 className="text-xl font-semibold mb-2">Ownership</h4>
          <p className="text-[#b0c4de] text-sm">Editable avatar, bio, animated/static cover. No third-party integrations — 100% creator-owned space</p>
        </div>
        <div className="flex flex-col items-center text-center h-full">
          <Image
            src="/assets/real.png"
            alt="Fund your tips icon"
            width={176}
            height={176}
            className="w-32 h-32 sm:w-44 sm:h-44 object-contain mx-auto mb-4"
          />
          <h4 className="text-xl font-semibold mb-2">Engagement</h4>
          <p className="text-[#b0c4de] text-sm">Goal tracking that shows real impact, subscriptions that build loyalty and community</p>
        </div>
        <div className="flex flex-col items-center text-center h-full">
          <Image
            src="/assets/moder.png"
            alt="Tip"
            width={176}
            height={176}
            className="w-32 h-32 sm:w-44 sm:h-44 object-contain mx-auto mb-4"
          />
          <h4 className="text-xl font-semibold mb-2">Usability</h4>
          <p className="text-[#b0c4de] text-sm">Clean Web3 UI with responsive layout, hover effects, microanimations, color themes, works out of the box - no coding needed.</p>
        </div>
        <div className="flex flex-col items-center text-center h-full">
          <Image
            src="/assets/fle.png"
            alt="Tip"
            width={176}
            height={176}
            className="w-32 h-32 sm:w-44 sm:h-44 object-contain mx-auto mb-4"
          />
          <h4 className="text-xl font-semibold mb-2">Flexibility</h4>
          <p className="text-[#b0c4de] text-sm">One-time tips with custom presets, fundraising goals with progress bars and deadlines, monthly subscriptions with customizable tiers.</p>
        </div>
        <div className="flex flex-col items-center text-center h-full">
          <Image
            src="/assets/zero.png"
            alt="Tip"
            width={176}
            height={176}
            className="w-32 h-32 sm:w-44 sm:h-44 object-contain mx-auto mb-4"
          />
          <h4 className="text-xl font-semibold mb-2">Accessibility</h4>
          <p className="text-[#b0c4de] text-sm">No login required, no crypto wallet needed — built-in on-ramp, instant access via sharable links and QR codes.</p>
        </div>
        <div className="flex flex-col items-center text-center h-full">
          <Image
            src="/assets/easy.png"
            alt="Tip"
            width={176}
            height={176}
            className="w-32 h-32 sm:w-44 sm:h-44 object-contain mx-auto mb-4"
          />
          <h4 className="text-xl font-semibold mb-2">Shareability</h4>
          <p className="text-[#b0c4de] text-sm">Shareable widget (iframe), QR code, dynamic OpenGraph cards, social links: X, Instagram, YouTube, Discord, Telegram, perfect for bios, stories, and link-in-bio tools.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="Start building" className="py-20">
  <h2 className="text-4xl font-bold text-center text-white mb-12">Start building your own tipjar+ page!</h2>
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

    {/* QR Generator */}
    <div>
      <div className="relative p-8 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg flex flex-col items-center min-h-[530px] h-full">
        <h3 className="font-semibold mb-4 text-slate-300">QR Generator</h3>
        <div className="flex-1 w-full flex items-center justify-center">
          <QRGenerator />
        </div>
        <p className="absolute bottom-5 left-0 w-full text-center text-slate-400 text-base">Share your code anywhere</p>
      </div>
    </div>

<div className="relative py-8 px-0 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg min-h-[530px] h-full flex flex-col">
  <h3 className="font-semibold mb-4 text-slate-300 text-center">Widget</h3>
  <div className="flex-1 flex items-center justify-center relative">
    <div className="relative w-[98%] h-auto flex items-center justify-center">
      <Image
        src="/assets/widget.png"
        alt="Widget"
        width={600}
        height={400}
        className="w-full h-auto object-contain rounded-lg"
        style={{ display: 'block' }}
      />
      <span
        style={{
          position: 'absolute',
          left: '50%',
          bottom: '46px',
          transform: 'translateX(-50%)',
          color: '#077d77',
          border: '2px solid #FFD700',
          borderRadius: '7px',
          padding: '2px 18px',
          fontWeight: 700,
          fontSize: '1rem',
          background: 'none',
          whiteSpace: 'nowrap',
          letterSpacing: '0.03em',
          boxShadow: '0 2px 8px 0 rgba(0,0,0,0.09)'
        }}
      >
        tipjar.plus/@AdamDuda
      </span>
    </div>
  </div>
  <p className="text-slate-400 text-base text-center mt-4">Integrate with your page</p>
</div>

    {/* Customize */}
    <div>
      <div className="relative py-8 px-0 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg flex flex-col items-center min-h-[530px] h-full">
        <h3 className="font-semibold mb-4 text-slate-300">Customize</h3>
        <div className="flex-1 w-full flex items-center justify-center">
          <Image
            src="/assets/ikonybuild.png"
            alt="Customize"
            width={500}
            height={250}
            className="w-[90%] max-h-[250px] object-contain"
          />
        </div>
        <p className="absolute bottom-5 left-0 w-full text-center text-slate-400 text-base">Personalize your TipJar+</p>
      </div>
    </div>

  </div>
</section>

          <section id="explore" className="py-20">
            <h2 className="text-4xl font-bold text-center text-white mb-12">Explore Creators</h2>
            <div className="text-center text-[#b0c4de]">
              <p>This section is under construction. Come back later to discover talented creators!</p>
            </div>
          </section>

          <section id="learn" className="py-20">
            <h2 className="text-4xl font-bold text-center text-white mb-12">Learn</h2>
            <div className="text-center text-[#b0c4de]">
              <p>Learn more about Web3, USDC, and how to maximize your earnings. Content coming soon.</p>
            </div>
          </section>

          <section id="ai-studio" className="py-20 my-10 bg-[#0a2836] rounded-2xl border-2 border-yellow-400/50 shadow-2xl shadow-yellow-400/20">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-white mb-6">🤖 AI Studio</h2>
              <p className="text-xl text-yellow-400 mb-6">
                This platform is a living experiment in human-AI collaboration.
              </p>
              <p className="text-lg text-white max-w-3xl mx-auto">
                From concept and coding to design and copywriting, this entire project was built by a human founder working in tandem with a team of specialized AI agents. It stands as a testament to the power of combining human vision with artificial intelligence to build functional, modern applications.
              </p>
            </div>
          </section>

          <footer className="mt-24 py-12 border-t border-white border-opacity-10 text-center text-white text-sm opacity-50">
            © {new Date().getFullYear()} TipJar+. All rights reserved.
          </footer>
        </main>
      </div>
    </div>
  );
}

