"use client";

import PrimaryCta from "@/components/cta/PrimaryCta";
import SecondaryCta from "@/components/cta/SecondaryCta";

type Props = {
  primaryHref?: string;
  secondaryHref?: string;
};

export default function HeroCtas({
  primaryHref = "/register",
  secondaryHref = "/explore",
}: Props) {
  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
      <PrimaryCta href={primaryHref} className="lg:h-14 lg:px-8 lg:text-lg">
        Begin as a Creator
      </PrimaryCta>
      <SecondaryCta href={secondaryHref} className="lg:h-14 lg:px-8 lg:text-lg">
        Explore as a Fan
      </SecondaryCta>
    </div>
  );
}
