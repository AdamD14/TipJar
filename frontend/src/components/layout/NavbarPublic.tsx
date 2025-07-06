// frontend/src/components/layout/NavbarPublic.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';

export function NavbarPublic() {
  return (
    <header className="bg-tipjar-turquoise-darker py-3 px-6 flex justify-start items-center shadow-lg sticky top-0 z-50">
      {/* Logo + napis obok siebie */}
      <Link href="/" className="flex items-center space-x-2">
        <Image
          src="/assets/icon_tipjar1.png"
          alt="TipJar Logo"
          width={180}
          height={48}
          priority
        />
        <span className="font-logo font-light text-4xl text-tipjar-gold">
          tipjar.plus
        </span>
      </Link>
    </header>
  );
}
