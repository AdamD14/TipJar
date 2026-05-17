"use client";

import Button from "@/components/ui/buttons/Button";

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
      <Button
        variant="primary"
        href={primaryHref}
        size="lg"
      >
        Begin as a Creator
      </Button>
      <Button
        variant="secondary"
        href={secondaryHref}
        size="lg"
      >
        Explore as a Fan
      </Button>
    </div>
  );
}
