'use client';

import React, { useState } from 'react';

// The 'Image' component from 'next/image' has been replaced with the standard 'img' tag 
// to resolve the compilation error in an environment that does not support Next.js components.

const PaymentIcon = ({ children, name }: { children: React.ReactNode; name: string }) => (
  <div title={name} className="bg-white bg-opacity-10 h-10 w-16 rounded-lg flex items-center justify-center text-white p-2 transition-transform hover:scale-110">
    {children}
  </div>
);


export default function Page() {
  const [tipAmount, setTipAmount] = useState(10);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    const textToCopy = 'tipjar.plus/@AdamDuda';
    // Using navigator.clipboard for modern browsers, with a fallback.
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(textToCopy).then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      }).catch(err => {
        console.error('Async copy failed', err);
      });
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = textToCopy;
      textArea.style.position = 'fixed'; // Prevent scrolling to bottom of page in MS Edge.
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

  const sliderPercentage = (tipAmount / 20) * 100; // Max value is 20
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
    margin-top: -7px; /* Align thumb with track */
  }
  input[type=range]::-webkit-slider-runnable-track {
    height: 6px;
    border-radius: 8px;
  }
  input[type=range']:focus {
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
      <div className="absolute inset-0 bg-[#0d2f3f] bg-opacity-40"></div>

      <img src="/assets/logo_usdc_1.png" alt="deco 2" width="480" height="480" className="absolute left-1/2 opacity-30 -translate-x-1/4 top-40 -translate-y-3/2 pointer-events-none" />

      <div className="relative z-10 flex flex-col min-h-screen container mx-auto px-6 py-8">
        <header className="pb-8 border-b border-white border-opacity-10">
          <nav className="flex justify-between items-center">
            <a href="#" className="flex items-center space-x-2" aria-label="Strona główna TipJar+">
              <img src="/assets/icon_tipjar1.png" alt="TipJar+ Logo" width="40" height="40" />
              <span className="text-2xl font-bold">tipjar.plus</span>
            </a>
            
            <div className="flex items-center gap-6">
                <div className="hidden md:flex items-center gap-8">
                    <a href="#why" className="font-semibold text-white hover:text-yellow-400 transition-colors">Why tipjar+?</a>
                    <a href="#how-it-works" className="font-semibold text-white hover:text-yellow-400 transition-colors">How it works?</a>
                    <a href="#start-building" className="font-semibold text-white hover:text-yellow-400 transition-colors">Start Building</a>
                    <a href="#explore" className="font-semibold text-white hover:text-yellow-400 transition-colors">Explore</a>
                    <a href="#learn" className="font-semibold text-white hover:text-yellow-400 transition-colors">Learn</a>
                    <a href="#ai-studio" className="font-semibold text-white hover:text-yellow-400 transition-colors">AI Studio</a>
                </div>
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
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start" style={{ minHeight: 'calc(90vh - 80px)' }}>
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
                   <img
                     src="/assets/we.png"
                     alt="Avatar Twórcy"
                     width="200"
                     height="200"
                     className="object-cover w-full h-full" />
                 </div>
               </div>
                <div className="text-center mt-2">
                  <h3 className="text-2xl font-bold">@AdamDuda</h3>
                  <div className="flex justify-center items-center gap-2 mt-1">
                    <span className="text-sm text-[#b0c4de]">tipjar.plus/@AdamDuda</span>
                    <button onClick={handleCopy} className="text-[#b0c4de] hover:text-white transition-colors" title="Skopiuj link">
                      {isCopied ? ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> ) : ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg> )}
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
                 <a href="#" className="w-full font-bold bg-[#FFD700] text-gray-900 py-3 px-4 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/50 block text-lg inline-flex items-center justify-center gap-2" >
                   Tip ${tipAmount.toFixed(2)}
                   <img src="/assets/logo_usdc_1.png" width="28" height="28" className="object-cover opacity-80" alt="USDC Logo" />
                 </a>
               </div>
                <div className="mt-4 grid grid-cols-6 gap-1 px-1">
                    <PaymentIcon name="Google Pay"><img src="/assets/Google_Pay_Logo.svg" alt="Google Pay" className="h-full"/></PaymentIcon>
                    <PaymentIcon name="Apple Pay"><img src="/assets/Apple_Pay_Mark_RGB.svg" alt="Apple Pay" className="h-full"/></PaymentIcon>
                    <PaymentIcon name="Metamask"><img src="/assets/MetaMask-icon-fox.svg" alt="Metamask" className="h-full"/></PaymentIcon>
                    <PaymentIcon name="Revolut"><svg className="h-4" viewBox="0 0 182 40" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M130.614 0H123.505V39.664H130.614V0Z"/><path d="M181.076 10.5555V16.7106H173.725V30.5541C173.725 31.7085 173.972 32.711 174.353 33.1078C174.768 33.5415 175.485 33.7611 176.484 33.7611H181.076V39.9161H174.8C172.036 39.9161 169.959 39.23 168.626 37.8765C167.292 36.5241 166.616 34.4755 166.616 31.7873V2.53058H173.725V10.5555H181.076Z"/><path d="M75.2146 31.9437L82.5652 10.5547H90.0337L79.4226 39.6643H71.0067L60.3955 10.5547H67.8641L75.2146 31.9437Z"/><path d="M154.199 29.9025C154.749 28.5835 155.028 26.9802 155.028 25.1374V10.5555H162.138V39.6639H155.898L155.261 36.2704C154.421 37.224 153.348 38.0744 152.067 38.8017C150.664 39.5969 148.824 40 146.601 40C145.058 40 143.579 39.7808 142.204 39.3479C140.821 38.9127 139.582 38.1736 138.521 37.1503C137.46 36.1257 136.606 34.7456 135.985 33.049C135.364 31.3575 135.05 29.2241 135.05 26.7089V10.5555H142.159V25.9231C142.159 28.5697 142.667 30.5867 143.67 31.9174C144.662 33.2341 146.195 33.9022 148.228 33.9022C149.648 33.9022 150.875 33.5618 151.872 32.891C152.87 32.2201 153.652 31.2144 154.199 29.9025Z"/><path fillRule="evenodd" clipRule="evenodd" d="M112.637 12.0906C110.397 10.8484 107.737 10.2191 104.731 10.2191C101.763 10.2191 99.1123 10.8484 96.8534 12.0902C94.5918 13.3351 92.8149 15.0932 91.5716 17.3156C90.3302 19.536 89.7009 22.1677 89.7009 25.1374C89.7009 28.0707 90.3302 30.684 91.5716 32.9044C92.8141 35.126 94.5915 36.8837 96.8534 38.1286C99.1123 39.3703 101.763 39.9996 104.731 39.9996C107.737 39.9996 110.397 39.3703 112.637 38.1282C114.88 36.8841 116.648 35.1263 117.891 32.9043C119.132 30.6827 119.762 28.0694 119.762 25.1374C119.762 22.1688 119.132 19.5371 117.891 17.3155C116.647 15.0928 114.88 13.3347 112.637 12.0906ZM108.882 32.8894C107.736 33.6352 106.34 34.0136 104.732 34.0136C103.16 34.0136 101.773 33.6352 100.608 32.8891C99.442 32.1421 98.5272 31.0878 97.8889 29.7551C97.2479 28.4212 96.9224 26.8677 96.9224 25.1374C96.9224 23.3714 97.2475 21.809 97.8889 20.4931C98.5269 19.1784 99.4424 18.1237 100.61 17.358C101.774 16.593 103.161 16.2052 104.732 16.2052C106.339 16.2052 107.735 16.593 108.88 17.3572C110.029 18.1233 110.936 19.1784 111.575 20.4935C112.216 21.8125 112.541 23.375 112.541 25.1375C112.541 26.8639 112.216 28.4177 111.575 29.7551C110.936 31.0882 110.03 32.1425 108.882 32.8894Z"/><path d="M0 9.78894H7.3882V39.6643H0V9.78894Z"/><path d="M30.5573 11.4973C30.5573 5.15798 25.395 0.000427246 19.0494 0.000427246H0V6.38053H18.1437C21.0154 6.38053 23.3941 8.63663 23.4467 11.4095C23.4729 12.7979 22.9519 14.1082 21.9795 15.0991C21.0067 16.0903 19.707 16.6365 18.3197 16.6365H11.2519C11.0009 16.6365 10.7966 16.8404 10.7966 17.0913V22.7618C10.7966 22.8582 10.8264 22.9504 10.8825 23.028L22.8743 39.6645H31.6524L19.6328 22.9825C25.6859 22.6786 30.5573 17.5928 30.5573 11.4973Z"/><path fillRule="evenodd" clipRule="evenodd" d="M45.7645 10.2191C48.6201 10.2191 51.1471 10.7916 53.2754 11.9212C55.4032 13.0508 57.0955 14.676 58.3051 16.7514C59.51 18.8244 60.1404 21.3052 60.1785 24.1255C60.1785 24.5427 60.1683 24.9559 60.1506 25.3696C60.1299 25.7942 60.082 26.2165 60.0075 26.6262L59.9836 26.7568H38.6284V26.9905C38.7017 28.4855 39.0444 29.8026 39.6466 30.8973C40.2465 31.9881 41.1127 32.8444 42.2203 33.4431C43.3335 34.0454 44.6207 34.3508 46.046 34.3508C47.7276 34.3508 49.1792 33.9446 50.3609 33.144C51.4619 32.3994 52.2171 31.3466 52.6064 30.0143L52.6398 29.8998H59.7096L59.6708 30.0903C59.3101 31.8767 58.5729 33.5188 57.4802 34.9707C56.3298 36.4982 54.7908 37.7322 52.9056 38.6383C51.0209 39.5421 48.8259 40 46.3816 40C43.3006 40 40.5939 39.3801 38.3374 38.1572C36.0766 36.9343 34.3083 35.1855 33.0822 32.9596C31.8589 30.7388 31.239 28.1263 31.239 25.1943C31.239 22.1858 31.8495 19.5356 33.054 17.3172C34.2597 15.0936 35.9798 13.3351 38.1661 12.0914C40.3489 10.8488 42.9053 10.2191 45.7645 10.2191ZM52.9323 21.7235C52.6551 19.8779 51.8995 18.4252 50.6848 17.403C49.4297 16.3475 47.7931 15.8123 45.8205 15.8123C44.6536 15.8123 43.5538 16.0621 42.552 16.5542C41.5514 17.0447 40.712 17.7457 40.0568 18.6381C39.4322 19.4889 39.0346 20.526 38.8738 21.7235H52.9323Z"/></svg></PaymentIcon>
                    <PaymentIcon name="WalletConnect"><img src="/assets/wc.svg" alt="WalletConnect" className="h-full"/></PaymentIcon>
                    <PaymentIcon name="Bank"><img src="/assets/bank-svgrepo-com.svg" alt="Bank" className="h-full"/></PaymentIcon>
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
                    <h3 className="text-3xl font-bold mb-4 text-yellow-400">ULTRA-LOW FEES & Direct Support</h3>
                    <p className="text-lg text-gray-200 max-w-3xl mx-auto">
                        A simple, flat <strong className="text-yellow-400">2% service fee</strong> ensures creators receive the majority of their earnings. Creators receive tips directly from their fans, eliminating intermediaries and maximizing earnings.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                    <div className="bg-[#123647] p-6 rounded-xl text-center text-white transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                         <h3 className="text-2xl font-bold mb-2">Global</h3>
                        <p className="text-[#b0c4de]">Send or receive support from anywhere in the world — no banks, no borders, no limits. Circle enables fans to tip using over <strong className="text-yellow-400">80</strong> fiat currencies including USD, EUR, GBP, JPY. Creators get paid instantly in USDC, directly to their wallets. Fast, borderless, censorship-free.</p>
                    </div>
                    <div className="bg-[#123647] p-6 rounded-xl text-center text-white transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                        <h3 className="text-2xl font-bold mb-2">Instant Payouts</h3>
                        <p className="text-[#b0c4de]">Funds are delivered instantly to the creator&rsquo;s wallet — with no delays, no holds, and no frozen assets. You earn it, you own it — right away. Need cash? You can easily convert and withdraw to your <strong className="text-yellow-400">local currency</strong> anytime via Circle&rsquo;s off-ramps.</p>
                    </div>
                </div>
            </div>
          </section>

          <section id="how-it-works" className="py-20">
            <h2 className="text-4xl font-bold text-center text-white mb-12">How it works?</h2>
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
              
              {/* For Fans Column */}
              <div className="bg-white bg-opacity-5 p-8 rounded-xl border border-white border-opacity-10">
                <h3 className="text-3xl font-bold text-center text-yellow-400 mb-8">For Fans</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col items-center text-center">
                        <img src="/assets/regi.png" alt="Register Icon" className="h-40 w-50 mb-4" />
                        <h4 className="text-xl font-semibold mb-2">Sign Up (Optional)</h4>
                        <p className="text-[#b0c4de] text-sm">Use email, Google, Twitch, or MetaMask. Registration isn&#39;t required to send tips.</p>
                    </div>

                    <div className="flex flex-col items-center text-center">
                        <img src="/assets/opup.png" alt="Fund your tips icon" className="h-40 w-50 mb-4" />
                        <h4 className="text-xl font-semibold mb-2">Fund Your Tips</h4>
                        <p className="text-[#b0c4de] text-sm mb-3">Top up with USDC via crypto or your favorite payment method.</p>
                        
                    </div>

                    <div className="flex flex-col items-center text-center">
                        <img src="/assets/explore.png" alt="Tip" className="h-40 w-50 mb-4" />
                        <h4 className="text-xl font-semibold mb-2">Explore!</h4>
                        <p className="text-[#b0c4de] text-sm">Discover Web3-world skills.</p>
                    </div>
 <div className="flex flex-col items-center text-center">
                        <img src="/assets/tipit3.png" alt="Tip" className="h-40 w-50 mb-4" />
                        <h4 className="text-xl font-semibold mb-2">Support!</h4>
                        <p className="text-[#b0c4de] text-sm">Real people real value.</p>
                    </div>
 <div className="flex flex-col items-center text-center">
                        <img src="/assets/beapart.png" alt="Tip" className="h-40 w-50 mb-4" />
                        <h4 className="text-xl font-semibold mb-2">Enjoy the journey!</h4>
                        <p className="text-[#b0c4de] text-sm">Fuel the movement</p>
                    </div>


                    <div className="flex flex-col items-center text-center">
                        <img src="/assets/getaccess.png" alt="Enjoy" className="h-40 w-50 mb-4" />
                        <h4 className="text-xl font-semibold mb-2">Contribute to the culture,</h4>
                        <p className="text-[#b0c4de] text-sm">be part of the style.</p>
                    </div>
                </div>
              </div>

              {/* For Creators Column */}
              <div className="bg-white bg-opacity-5 p-8 rounded-xl border border-white border-opacity-10">
                <h3 className="text-3xl font-bold mb-6 text-center text-yellow-400">For Creators</h3>
                <div className="text-center text-[#b0c4de]">
                    <p>Content for this section is coming soon.</p>
                </div>
              </div>
            </div>
          </section>

          <section id="start-building" className="py-20 text-left">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold mb-6">🌍 Start Building</h2>
              <p className="text-lg text-[#b0c4de] mb-6">Accept tips in USDC — instantly, globally, and without borders. Support from fans via crypto, Google Pay, Apple Pay, bank transfer, PayPal, and Revolut has never been faster or more accessible.</p>
              <div className="bg-white bg-opacity-10 p-6 rounded-lg mb-8">
                <p className="text-xl font-semibold text-center">💡 No bank accounts. No delays. No restrictions.</p>
              </div>
              <div className="bg-white bg-opacity-5 p-6 rounded-lg border border-white border-opacity-10 mb-8">
                <p className="text-lg text-[#b0c4de] mb-4">🪙 Powered by Circle.com, every contribution lands in your USDC wallet — a fully reserved, dollar-pegged stablecoin trusted by millions worldwide.</p>
                <ul className="space-y-2 text-lg text-white">
                  <li className="flex items-center"><span className="text-green-400 mr-2">✅</span> Over $200B processed</li>
                  <li className="flex items-center"><span className="text-green-400 mr-2">✅</span> Regulated infrastructure</li>
                  <li className="flex items-center"><span className="text-green-400 mr-2">✅</span> Backed 1:1 with USD in cash and short-term U.S. Treasuries</li>
                </ul>
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
