"use client";

import React, { useState } from 'react';

// Zakładamy, że Tailwind CSS jest skonfigurowany w projekcie
// i nie trzeba dołączać go w tym pliku.

// Komponent dla ikon social media
const SocialIcon = ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-[#b0c4de] hover:text-white transition-colors">
        {children}
    </a>
);

// Komponent dla ikon metod płatności
const PaymentIcon = ({ children, name }: { children: React.ReactNode; name: string }) => (
    <div title={name} className="bg-white bg-opacity-10 h-8 w-12 rounded-md flex items-center justify-center text-white p-1">
        {children}
    </div>
);


export default function Page() {
    // --- State Management using React Hooks ---
    const [tipAmount, setTipAmount] = useState(10);
    const [isCopied, setIsCopied] = useState(false);
    
    // Logika AI (nieaktywna w tym przykładzie, ale gotowa do użycia)
    const callGemini = async (prompt: string, type: 'thank-you' | 'idea') => {
      // Logika wywołania API Gemini
    };
    
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
            console.error('Błąd podczas kopiowania', err);
        }
        document.body.removeChild(textArea);
    };

    const sliderPercentage = (tipAmount / 25) * 100;
    const sliderBackground = {
      background: `linear-gradient(to right, #FFD700 ${sliderPercentage}%, rgba(255, 255, 255, 0.1) ${sliderPercentage}%)`
    };

    // --- Render Component ---

    return (
        <div 
            className="relative min-h-screen overflow-x-hidden bg-cover bg-center bg-fixed"
            style={{ backgroundImage: "url('/assets/back.png')" }}
        >
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
            <div className="absolute inset-0 bg-[#0d2f3f] bg-opacity-40 "></div>
            
            {/* Obrazy dekoracyjne */}
            <img src="/assets/icon_tipjar1.png" alt="deco" className="absolute top-1/4 left-0 w-64 h-auto opacity-10 -translate-x-1/3 z-0"/>
            <img src="/assets/logo_usdc_1.png" alt="deco 2" className="absolute bottom-1/4 left-0 w-48 h-auto opacity-5 -translate-x-1/4 z-0"/>

            <div className="relative z-10 flex flex-col min-h-screen container mx-auto px-6 py-8">
                {/* 1. Navigation Header */}
                <header>
                    <nav className="flex justify-between items-center">
                        <a href="#" className="flex items-center space-x-2" aria-label="Strona główna TipJar+">
                            <img src="/assets/icon_tipjar1.png" alt="TipJar+ Logo" className="h-10 w-auto" />
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
                                   <img src="/assets/ja1.png" alt="Avatar Twórcy" className="bg-[#0f3a4d] rounded-full border-4 border-[#FFD700] w-40 h-40 object-cover"/>
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
                               <div className="flex justify-center items-center gap-5 mt-4">
                                    <SocialIcon href="#"><svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg></SocialIcon>
                                    <SocialIcon href="#"><svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.069-4.85.069s-3.584-.011-4.85-.069c-3.225-.149-4.771-1.664-4.919-4.919-.058-1.265-.069-1.645-.069-4.85 0-3.204.012-3.584.069-4.85.149-3.252 1.664-4.771 4.919-4.919C8.416 2.175 8.796 2.163 12 2.163zm0 1.442c-3.143 0-3.505.012-4.73.068-2.693.124-3.878 1.318-3.999 3.999-.056 1.224-.067 1.585-.067 4.73s.011 3.505.067 4.73c.12 2.682 1.306 3.878 3.999 3.999 1.225.056 1.587.068 4.73.068s3.505-.012 4.73-.068c2.693-.124 3.878-1.318 3.999-3.999.056-1.224.067-1.585.067-4.73s-.011-3.505-.067-4.73c-.12-2.682-1.306-3.878-3.999-3.999-1.225-.056-1.587-.068-4.73-.068zm0 5.838a4.557 4.557 0 100 9.114 4.557 4.557 0 000-9.114zm0 7.672a3.114 3.114 0 110-6.228 3.114 3.114 0 010 6.228zM16.965 6.57a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z"></path></svg></SocialIcon>
                                    <SocialIcon href="#"><svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M21.582 6.186A2.694 2.694 0 0019.96 4.91a27.688 27.688 0 00-7.96-.51c-2.93 0-5.83.18-7.96.51A2.694 2.694 0 002.418 6.186 28.163 28.163 0 002 12a28.163 28.163 0 00.418 5.814 2.694 2.694 0 001.622 1.276c2.13.33 5.03.51 7.96.51s5.83-.18 7.96-.51a2.694 2.694 0 001.622-1.276A28.163 28.163 0 0022 12a28.163 28.163 0 00-.418-5.814zM9.996 15.32V8.68l6 3.32-6 3.32z"></path></svg></SocialIcon>
                                    <SocialIcon href="#"><svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M11.999 2.007a10 10 0 100 19.986 10 10 0 000-19.986zM9.255 16.98l1.047-4.996-3.08-1.554 8.705-4.14-2.864 8.75-2.76-2.06zm.743-3.94l.87 4.144-.543-3.868-3.04-1.528 4.76-2.264-1.932 5.86-.115-2.344z"></path></svg></SocialIcon>
                                    <SocialIcon href="#"><svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M19.467 4.5a.5.5 0 00-.632-.61L4.5 9.07a.5.5 0 00.076.92l4.853 1.213a.5.5 0 00.434-.055l5.594-3.567a.5.5 0 01.68.66l-4.15 6.07a.5.5 0 00.03.626l3.356 3.835a.5.5 0 00.785-.098l3.356-8.053a.5.5 0 00-.01-.486z"></path></svg></SocialIcon>
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
                    
                   {/* Sekcja "Why Choose TipJar?" */}
                    <section className="py-20">
                        <div className="text-center">
                            <h2 className="text-4xl font-bold">Why Choose TipJar?</h2>
                            <p className="mt-4 text-lg max-w-3xl mx-auto text-[#b0c4de]">
                                TipJar offers a secure, transparent, and efficient way for creators to monetize their content and for fans to support their favorite creators.
                            </p>
                        </div>
                        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                            <div className="bg-[#0f3a4d] p-6 rounded-xl border border-white border-opacity-10">
                                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-yellow-400 bg-opacity-20 mb-4">
                                   <svg className="w-6 h-6 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                                </div>
                                <h3 className="text-xl font-bold">Secure and Transparent</h3>
                                <p className="mt-2 text-[#b0c4de]">Built on Web3 technology, TipJar ensures secure and transparent transactions, giving both creators and fans peace of mind.</p>
                            </div>
                            <div className="bg-[#0f3a4d] p-6 rounded-xl border border-white border-opacity-10">
                                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-yellow-400 bg-opacity-20 mb-4">
                                   <svg className="w-6 h-6 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                                </div>
                                <h3 className="text-xl font-bold">Direct Support</h3>
                                <p className="mt-2 text-[#b0c4de]">Creators receive tips directly from their fans, eliminating intermediaries and maximizing earnings.</p>
                            </div>
                            <div className="bg-[#0f3a4d] p-6 rounded-xl border border-white border-opacity-10">
                                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-yellow-400 bg-opacity-20 mb-4">
                                   <svg className="w-6 h-6 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01M12 6v.01M12 18v-2m0-4v-2m0-4V7m0 11v-2m0-4v-2m0-4V7" ></path></svg>
                                </div>
                                <h3 className="text-xl font-bold">Low Fees</h3>
                                <p className="mt-2 text-[#b0c4de]">TipJar charges minimal fees, ensuring that creators receive the majority of their earnings and fans' tips go directly to supporting creators.</p>
                            </div>
                        </div>
                    </section>
                   
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
                    
                    {/* Kreatywne Studio AI */}
                    <section className="py-20 text-center">
                        <div className="flex justify-center items-center gap-4 mb-12">
                            <h2 className="text-4xl font-bold">Kreatywne Studio AI</h2>
                            <span className="bg-[#FFD700] text-gray-900 text-sm font-bold px-3 py-1 rounded-full">PREMIUM</span>
                        </div>
                        <p className="max-w-3xl mx-auto text-[#b0c4de] mt-4 mb-12">Odblokuj pełen potencjał swojej kreatywności z naszymi narzędziami AI, dostępnymi w planie Premium.</p>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-4xl mx-auto">
                            <div className="relative bg-white bg-opacity-5 p-6 rounded-lg border border-white border-opacity-10">
                                <div className="opacity-40">
                                    <h3 className="text-2xl font-bold mb-4">Asystent Podziękowań</h3>
                                    <p className="text-[#b0c4de] mb-6 min-h-[72px]">Stwórz spersonalizowane podziękowanie dla fana. Wpisz kontekst napiwku (np. "5 USD za super stream").</p>
                                    <div className="flex flex-col gap-4">
                                        <input type="text" placeholder="Wpisz kontekst napiwku..." className="flex-grow bg-white bg-opacity-10 border border-transparent rounded-lg px-4 py-3 text-white placeholder-[#b0c4de] cursor-not-allowed" disabled />
                                        <button className="font-bold bg-[#FFD700] text-gray-900 py-3 px-6 rounded-lg flex items-center justify-center gap-2 opacity-50 cursor-not-allowed" disabled>
                                            ✍️ Generuj Wiadomość
                                        </button>
                                    </div>
                                </div>
                                <div className="absolute inset-0 bg-[#0d2f3f] bg-opacity-80 flex flex-col justify-center items-center rounded-lg backdrop-blur-sm">
                                   <svg className="w-12 h-12 text-[#FFD700] mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>
                                    <a href="#" className="font-bold bg-[#FFD700] text-gray-900 py-3 px-8 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/50">
                                        Odblokuj w Premium
                                    </a>
                                </div>
                            </div>
                            <div className="relative bg-white bg-opacity-5 p-6 rounded-lg border border-white border-opacity-10">
                                 <div className="opacity-40">
                                    <h3 className="text-2xl font-bold mb-4">Generator Pomysłów</h3>
                                    <p className="text-[#b0c4de] mb-6 min-h-[72px]">Brakuje Ci inspiracji? Opisz tematykę swojego kanału (np. "gotowanie", "gry retro"), a my podrzucimy Ci kilka pomysłów.</p>
                                    <div className="flex flex-col gap-4">
                                        <input type="text" placeholder="Opisz tematykę kanału..." className="flex-grow bg-white bg-opacity-10 border border-transparent rounded-lg px-4 py-3 text-white placeholder-[#b0c4de] cursor-not-allowed" disabled />
                                        <button className="font-bold bg-[#FFD700] text-gray-900 py-3 px-6 rounded-lg flex items-center justify-center gap-2 opacity-50 cursor-not-allowed" disabled>
                                            💡 Generuj Pomysły
                                        </button>
                                    </div>
                                </div>
                                <div className="absolute inset-0 bg-[#0d2f3f] bg-opacity-80 flex flex-col justify-center items-center rounded-lg backdrop-blur-sm">
                                   <svg className="w-12 h-12 text-[#FFD700] mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>
                                    <a href="#" className="font-bold bg-[#FFD700] text-gray-900 py-3 px-8 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/50">
                                        Odblokuj w Premium
                                    </a>
                                </div>
                            </div>
                        </div>
                    </section>
                    
 

                    {/* Social Proof */}
                    <section className="py-20">
                        <div className="text-center">
                            <h2 className="text-4xl font-bold">500+ creators trust TipJar</h2>
                            <div className="flex justify-center items-center mt-4 space-x-2">
                                 <img src="https://placehold.co/40x40/ffffff/000000?text=S" alt="Secondead logo" className="h-8 w-8 rounded-full" />
                                <p className="text-lg font-semibold">Secondead & <span className="text-[#FFD700]">hcm</span></p>
                            </div>
                        </div>

                        <div className="relative mt-12">
                            <div className="flex justify-center -space-x-4">
                                <img className="h-12 w-12 rounded-full border-2 border-[#0d2f3f]" src="https://placehold.co/48x48" alt="Creator 1" />
                                <img className="h-12 w-12 rounded-full border-2 border-[#0d2f3f]" src="https://placehold.co/48x48" alt="Creator 2" />
                                <img className="h-12 w-12 rounded-full border-2 border-[#0d2f3f]" src="https://placehold.co/48x48" alt="Creator 3" />
                                <img className="h-12 w-12 rounded-full border-2 border-[#0d2f3f]" src="https://placehold.co/48x48" alt="Creator 4" />
                                <img className="h-12 w-12 rounded-full border-2 border-[#0d2f3f]" src="https://placehold.co/48x48" alt="Creator 5" />
                            </div>
                            <div className="text-center mt-12">
                                <h3 className="text-3xl font-bold">Get Started Today</h3>
                                <a href="#" className="mt-6 inline-block font-bold bg-[#FFD700] text-gray-900 py-3 px-8 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/50">
                                    Get Started
                                </a>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};
