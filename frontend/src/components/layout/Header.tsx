"use client";

import React, { useState, useEffect } from 'react';

// Ten komponent zawiera wyłącznie kod nagłówka/nawigacji
// wyciągnięty z Twojego pliku page.tsx
const Header = () => {
  // Cała logika stanu związana z headerem została przeniesiona tutaj
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header
      className={`fixed top-1 left-1 right-0 w-full border-b border-[#E7E3C1] border-opacity-10 transition-colors duration-300
        ${isScrolled ? "bg-[#0d2f3f] bg-opacity-95" : "bg-[#144552] bg-opacity-30 backdrop-blur-lg"}
      `}
    >
      <nav className="grid grid-cols-3 w-full ">
        <div className="flex mb-3/2 top-2">
          <div className="bg-gradient-to-r from-[#E7E3C1] to-[#144552] text-white px-2 rounded font-bold text-xl shadow-lg flex items-center ">
            <img src="/assets/icon-tipjarnone.svg" alt="TipJar+ icon" width={48} height={48} className="h-12 w-auto" />
            tipjar.plus
          </div>
        </div>
        
        {/* Linki – środek */}
        <div className="hidden xl:flex items-center justify-center gap-10 text-base whitespace-nowrap">
          <a href="#why" className="text-white hover:text-[#E7E3C1] transition">Why tipjar+?</a>
          <a href="#how-it-works" className="text-white hover:text-[#E7E3C1] transition">How it works?</a>
          <a href="#start-building" className="text-white hover:text-[#E7E3C1] transition">Start Building</a>
          <a href="#explore" className="text-white hover:text-[#E7E3C1] transition">Explore</a>
          <a href="#learn" className="text-white hover:text-[#E7E3C1] transition">Learn</a>
          <a href="#ai-studio" className="text-white hover:text-[#E7E3C1] transition">AI Studio</a>
        </div>

        {/* CTA – prawa strona */}
        <div className="hidden xl:flex justify-end items-center gap-4 pr-6">
          <a href="#" className="bg-[#E7E3C1] text-gray-900 font-bold py-2 px-4 rounded text-full hover:scale-105 transition">
            Begin as a Creator
          </a>
          <a href="#" className="border border-[#E7E3C1] text-[#E7E3C1] font-bold py-2 px-4 rounded text-full hover:bg-[#E7E3C1] hover:text-[#0d2f3f] -105 transition">
            Login
          </a>
        </div>

        {/* Hamburger – mobile */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white justify-self-end pr-4"
          aria-label="Menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
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
  );
};

export default Header;
