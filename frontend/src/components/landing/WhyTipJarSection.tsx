// frontend/src/components/landing/WhyTipJarSection.tsx
'use client';

import { motion } from 'framer-motion';
import { Coins, CreditCard, ShieldCheck, Zap } from 'lucide-react';
import Image from 'next/image';

const features = [
  {
    icon: <Coins size={56} className="text-tipjar-gold" />, // Lekko powiększamy ikony dla lepszej równowagi wizualnej
    title: 'Via Crypto',
    description: '(MIN 2% PLATFORM FEE)',
  },
  {
    icon: <CreditCard size={56} className="text-tipjar-gold" />, // Lekko powiększamy ikony
    title: 'Fiat-Easy',
    description: 'Google Pay, Revolut & bank',
  },
  {
    icon: <Image src="/assets/logo_usdc_1.png" alt="USDC Logo" width={80} height={80} />,
    title: 'Receive in USDC',
    description: 'Secure, backed by Circle.com',
  },
  {
    icon: <Zap size={56} className="text-tipjar-gold" />, // Lekko powiększamy ikony
    title: 'Instant Payouts',
    description: 'Crypto, USD, EUR & local currency',
  },
];

export function WhyTipJarSection() {
  return (
    <section className="bg-tipjar-turquoise-dark py-20 px-4">
      <div className="container mx-auto">
        <h2 className="text-4xl font-heading text-center text-tipjar-gold mb-16">
          Dlaczego TipJar?
        </h2>
        <div className="grid grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-tipjar-turquoise p-8 rounded-xl text-center flex flex-col items-center shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* === POPRAWIONY FRAGMENT PONIŻEJ === */}
              <div className="mb-4 flex h-20 w-20 items-center justify-center">
                {feature.icon}
              </div>
              {/* ===================================== */}
              <h3 className="text-2xl font-heading text-white mb-2">
                {feature.title}
              </h3>
              <p className="font-sans text-tipjar-gray-light">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}