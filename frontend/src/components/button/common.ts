import { ibm } from "@/fonts";
import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ColorToken = {
  base: string;
  hover: string;
  soft: string;
  ring: string;
};

export const TEAL: ColorToken = {
  base: "#003737",
  hover: "#002C2C",
  soft: "#4D7070",
  ring: "#00373733",
};

export const PURPLE: ColorToken = {
  base: "#5D2A72",
  hover: "#4A215B",
  soft: "#8A649D",
  ring: "#5D2A7233",
};

export const GOLD: ColorToken = {
  base: "#FFD700",
  hover: "#CCAC00",
  soft: "#FFE680",
  ring: "#FFD70033",
};

export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export const liftShadow =
  "shadow-[0_10px_25px_rgba(0,0,0,0.15)] hover:shadow-[0_14px_30px_rgba(0,0,0,0.25)] hover:-translate-y-[1px]";

export const baseBtn = (
  extra?: string,
  opts?: { textDark?: boolean; ring?: string }
) =>
  cx(
    "relative inline-flex items-center justify-center select-none",
    "rounded-xl px-6 py-3 text-base font-medium",
    "transition-transform duration-200 ease-out",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "active:translate-y-[1px]",
    ibm?.className,
    opts?.textDark ? "text-gray-900" : "text-white",
    opts?.ring || "focus-visible:ring-white/30 focus-visible:ring-offset-black/10",
    extra
  );

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  color: ColorToken;
};
