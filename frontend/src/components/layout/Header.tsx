'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TipJarLogo = () => (
  <Link href="/" className="flex items-center gap-2 z-50">
    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center p-1">
      <div className="w-full h-full bg-teal-800 rounded-sm flex items-center justify-center text-yellow-400 font-bold text-lg">
        +
      </div>
    </div>
    <span className="text-xl font-bold text-white tracking-wider">TipJar</span>
  </Link>
);

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/discover', label: 'Odkrywaj Twórców' },
    { href: '/how-it-works', label: 'Jak to działa?' },
    { href: '/learn', label: 'Strona Learn' },
  ];

  return (
    <header className="bg-teal-800 text-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto flex items-center justify-between p-4">
        <TipJarLogo />
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-teal-100 hover:text-yellow-400 transition-colors relative after:content-[''] after:absolute after:w-full after:h-0.5 after:bottom-0 after:left-0 after:bg-yellow-400 after:scale-x-0 after:origin-bottom-left after:transition-transform after:duration-300 hover:after:scale-x-100"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-4">
          <Link href="/login" className="text-sm font-semibold text-teal-100 hover:text-yellow-400 transition-colors">
            Logowanie
          </Link>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Otwórz menu">
            <Menu className="h-6 w-6 text-white" />
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden fixed inset-0 bg-teal-900/95 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto p-4">
              <div className="flex justify-between items-center mb-8">
                <TipJarLogo />
                <button onClick={() => setIsMobileMenuOpen(false)} aria-label="Zamknij menu">
                  <X className="h-6 w-6 text-white" />
                </button>
              </div>
              <nav className="flex flex-col items-center gap-6 text-lg mt-16">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="font-semibold text-teal-100 hover:text-yellow-400 transition-colors py-2"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="mt-8 flex flex-col items-center gap-4 w-full max-w-xs">
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full text-center py-3 font-semibold text-teal-100 hover:text-yellow-400 transition-colors"
                  >
                    Logowanie
                  </Link>
                    Zarejestruj się
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
