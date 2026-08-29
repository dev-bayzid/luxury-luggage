"use client";

import React, { forwardRef } from "react";
import { clsx } from "clsx";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "gold" | "secondary" | "outline" | "ghost" | "gold-outline";
  size?: "sm" | "md" | "lg" | "xl" | "icon";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-300 rounded-full focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]";

    const variants = {
      primary:
        "bg-primary text-white hover:bg-neutral-900 border border-neutral-800 shadow-md hover:shadow-lg hover:border-neutral-700",
      gold:
        "bg-accent text-primary font-semibold hover:bg-accent-light shadow-gold-glow hover:shadow-lg transition-all",
      secondary:
        "bg-white text-primary hover:bg-neutral-100 border border-neutral-200 shadow-sm hover:shadow",
      outline:
        "bg-transparent text-primary hover:bg-neutral-900 hover:text-white border border-neutral-300 hover:border-primary",
      "gold-outline":
        "bg-transparent text-accent hover:bg-accent hover:text-primary border border-accent/60 hover:border-accent shadow-sm",
      ghost:
        "bg-transparent text-neutral-700 hover:text-primary hover:bg-neutral-100/80",
    };

    const sizes = {
      sm: "text-xs px-4 py-2 gap-1.5",
      md: "text-sm px-6 py-2.5 gap-2",
      lg: "text-base px-8 py-3.5 gap-2.5 tracking-wide",
      xl: "text-base px-10 py-4 gap-3 font-semibold tracking-wider uppercase text-xs",
      icon: "w-10 h-10 p-0 rounded-full",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={clsx(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-current" />
        ) : (
          <>
            {leftIcon && <span className="shrink-0">{leftIcon}</span>}
            <span>{children}</span>
            {rightIcon && <span className="shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
