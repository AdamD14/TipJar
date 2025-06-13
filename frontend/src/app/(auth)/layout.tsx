import React from 'react';
import Link from 'next/link';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-tipjar-turquoise-darker p-4">
      <Link href="/" className="mb-8">
        <h1 className="text-4xl font-heading text-tipjar-gold">TipJar</h1>
      </Link>
      <div className="w-full max-w-md bg-tipjar-turquoise-dark rounded-xl shadow-2xl p-6 sm:p-8">
        {children}
      </div>
    </div>
  );
}
