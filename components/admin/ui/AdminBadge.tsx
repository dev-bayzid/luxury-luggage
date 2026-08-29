import React from "react";
import { clsx } from "clsx";

export type AdminBadgeVariant =
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "gold"
  | "neutral";

interface AdminBadgeProps {
  children: React.ReactNode;
  variant?: AdminBadgeVariant;
  size?: "sm" | "md";
  className?: string;
  dot?: boolean;
}

export const AdminBadge: React.FC<AdminBadgeProps> = ({
  children,
  variant = "neutral",
  size = "sm",
  className,
  dot = false,
}) => {
  const variantStyles: Record<AdminBadgeVariant, { bg: string; text: string; border: string; dotColor: string }> = {
    success: {
      bg: "bg-emerald-500/10",
      text: "text-emerald-400",
      border: "border-emerald-500/20",
      dotColor: "bg-emerald-400",
    },
    warning: {
      bg: "bg-amber-500/10",
      text: "text-amber-400",
      border: "border-amber-500/20",
      dotColor: "bg-amber-400",
    },
    danger: {
      bg: "bg-red-500/10",
      text: "text-red-400",
      border: "border-red-500/20",
      dotColor: "bg-red-400",
    },
    info: {
      bg: "bg-sky-500/10",
      text: "text-sky-400",
      border: "border-sky-500/20",
      dotColor: "bg-sky-400",
    },
    gold: {
      bg: "bg-[#D4AF37]/15",
      text: "text-[#E5C058]",
      border: "border-[#D4AF37]/30",
      dotColor: "bg-[#D4AF37]",
    },
    neutral: {
      bg: "bg-neutral-800/80",
      text: "text-neutral-300",
      border: "border-neutral-700/60",
      dotColor: "bg-neutral-400",
    },
  };

  const current = variantStyles[variant];

  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 font-medium rounded-full border transition-all",
        current.bg,
        current.text,
        current.border,
        size === "sm" ? "text-[11px] px-2.5 py-0.5" : "text-xs px-3 py-1",
        className
      )}
    >
      {dot && <span className={clsx("w-1.5 h-1.5 rounded-full shrink-0", current.dotColor)} />}
      <span>{children}</span>
    </span>
  );
};
