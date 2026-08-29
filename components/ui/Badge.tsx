import React from "react";
import { clsx } from "clsx";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "gold" | "dark" | "outline" | "discount" | "subtle";
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "gold",
  className,
}) => {
  const base =
    "inline-flex items-center text-[10px] sm:text-xs font-semibold uppercase tracking-widest px-2.5 py-0.5 rounded-full border select-none";

  const variants = {
    gold: "bg-accent/15 text-accent-dark border-accent/30 backdrop-blur-sm",
    dark: "bg-primary text-white border-neutral-700",
    outline: "bg-transparent text-neutral-800 border-neutral-300",
    discount: "bg-red-500/10 text-red-600 border-red-200 font-bold",
    subtle: "bg-neutral-100 text-neutral-600 border-neutral-200",
  };

  return <span className={clsx(base, variants[variant], className)}>{children}</span>;
};
