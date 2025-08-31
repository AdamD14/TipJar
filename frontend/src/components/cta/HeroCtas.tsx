// frontend/src/components/cta/HeroCtas.tsx
'use client';

import React from 'react';
import PrimaryCta from './PrimaryCta';
import SecondaryCta from './SecondaryCta';

type Props = {
  primaryHref?: string;   // default: /onboarding/start
  secondaryHref?: string; // default: /discover
};

export default function HeroCtas({ primaryHref = '/onboarding/start', secondaryHref = '/discover' }: Props) {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4">
      <PrimaryCta href={primaryHref}>Begin as a Creator</PrimaryCta>
      <SecondaryCta href={secondaryHref}>Explore Creators</SecondaryCta>
    </div>
  );
}
