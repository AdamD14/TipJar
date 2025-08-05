import Link from "next/link";
import type { ReactNode } from "react";

interface IconButtonProps {
  href?: string;
  children: ReactNode;
}

export const IconButton = ({ href = "#", children }: IconButtonProps) => {
  return (
    <Link
      href={href}
      className="p-3 rounded-full border border-[#063250] text-[#063250] hover:bg-[#063250]/10 hover:shadow-[0_0_10px_#063250] transition-all duration-300"
    >
      {children}
    </Link>
  );
};

