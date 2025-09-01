// frontend/src/components/cta/HeroCtas.tsx
'use client';

import React from 'react';
import PrimaryCta from './PrimaryCta';
import SecondaryCta from './SecondaryCta';

type Props = {
  primaryHref?: string;   // default: /register
  secondaryHref?: string; // default: /explore
};

export default function HeroCtas({ primaryHref = '/register', secondaryHref = '/explore' }: Props) {
  return (
    <div className="flex flex-col font-body font-ui sm:flex-row items-center gap-4">
      <PrimaryCta href={primaryHref}>Begin as a Creator</PrimaryCta>
      <SecondaryCta href={secondaryHref}>Explore as a Fan</SecondaryCta>
    </div>
  );
}
