'use client';

import PrimaryCta from '@/components/cta/PrimaryCta';

type Props = {
  label?: string;
  href?: string;
};

export default function StickyCtaDock({ label = 'Support Now', href = '#' }: Props) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[rgba(255,215,0,0.12)] bg-[rgba(0,55,55,0.92)]/95 p-3 backdrop-blur-sm sm:hidden">
      <div className="mx-auto max-w-3xl">
        <PrimaryCta href={href}>{label}</PrimaryCta>
      </div>
    </div>
  );
}
