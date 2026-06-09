import React, { forwardRef } from "react";
import clsx from "clsx";

type ButtonCtaVariant = "primary" | "secondary" | "tertiary" | "quaternary";

interface ButtonCtaProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonCtaVariant;
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const ButtonCta = forwardRef<HTMLButtonElement, ButtonCtaProps>(
  ({ variant = "primary", fullWidth = false, className, children, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          "cta-btn",
          {
            "cta-btn-primary": variant === "primary",
            "cta-btn-secondary": variant === "secondary",
            "cta-btn-tertiary": variant === "tertiary",
            "cta-btn-quaternary": variant === "quaternary",
            "w-full": fullWidth,
          },
          className
        )}
        {...rest}
      >
        {variant === "primary" && (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 300" className="cta-btn-svg">
            <polyline points="0,50 450,50 450,250 900,250" fill="none" stroke="#80bfbf" strokeWidth="1" />
            <polyline points="0,62 438,62 438,262 850,262" fill="none" stroke="#e0f2f2" strokeWidth="1" />
            <polyline points="150,300 150,120 800,120" fill="none" stroke="#b3d9d9" strokeWidth="1" />
            <polyline points="172,300 172,142 800,142" fill="none" stroke="#80bfbf" strokeWidth="1" />
            <circle cx="150" cy="120" r="1.5" fill="#b3d9d9" />
          </svg>
        )}

        {(variant === "secondary" || variant === "tertiary") && (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 300" className="cta-btn-svg">
            <polyline points="0,80 600,80 600,200 900,200" fill="none" stroke="#e0f2f2" strokeWidth="1" />
            <polyline points="30,94 586,94 586,214 900,214" fill="none" stroke="#b3d9d9" strokeWidth="1" />
            <polyline points="250,0 250,140 750,140 750,300" fill="none" stroke="#80bfbf" strokeWidth="1" />
            <polyline points="285,0 285,175 715,175 715,300" fill="none" stroke="#e0f2f2" strokeWidth="1" />
            <circle cx="250" cy="140" r="1.5" fill="#80bfbf" />
          </svg>
        )}

        {variant === "quaternary" && (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 300" className="cta-btn-svg">
            <polyline points="0,50 400,50 550,200 900,200" fill="none" stroke="#e0f2f2" strokeWidth="1" />
            <polyline points="30,66 438.6,66 588.6,216 900,216" fill="none" stroke="#b3d9d9" strokeWidth="1" />
            <polyline points="200,300 350,150 750,150" fill="none" stroke="#80bfbf" strokeWidth="1" />
            <polyline points="168.9,300 296.9,172 820,172" fill="none" stroke="#e0f2f2" strokeWidth="1" />
            <circle cx="350" cy="150" r="1.5" fill="#80bfbf" />
          </svg>
        )}

        <span className="cta-btn-text">{children}</span>
      </button>
    );
  }
);

ButtonCta.displayName = "ButtonCta";
export default ButtonCta;