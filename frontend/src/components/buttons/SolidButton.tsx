import Link from "next/link";
import type { ReactNode } from "react";

interface SolidButtonProps {
  href?: string;
  children: ReactNode;
}

export const SolidButton = ({ href = "#", children }: SolidButtonProps) => {
  return (
    <Link
      href={href}
      className="px-6 py-3 rounded-full bg-[#063250] text-white font-semibold shadow-md hover:scale-[1.03] transition-transform"
    >
      {children}
    </Link>
  );
};

