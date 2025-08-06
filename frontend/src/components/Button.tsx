import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";

export type ButtonProps = {
  variant: "primary" | "gradient" | "outline" | "ghost" | "icon";
  children: React.ReactNode;
  className?: string;
  href?: string;
  [key: string]: any;
};

export const Button = ({
  variant,
  children,
  className,
  href,
  ...props
}: ButtonProps) => {
  const base = "rounded-full font-semibold transition-all duration-300";
  const variants: Record<ButtonProps["variant"], string> = {
    primary: "px-6 py-3 bg-[#063250] text-white shadow-md hover:scale-[1.03]",
    gradient: "px-6 py-3 bg-gradient-to-r text-white shadow-md hover:scale-[1.03]",
    outline:
      "px-6 py-3 border border-[#063250] text-[#063250] hover:bg-[#063250]/10 hover:shadow-[0_0_10px_#063250]",
    ghost: "px-6 py-3 text-[#063250] hover:bg-[#063250]/10",
    icon: "p-3 border border-[#063250] text-[#063250] hover:bg-[#063250]/10 hover:shadow-[0_0_10px_#063250]",
  };

  const classes = cn(base, variants[variant], className);

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

