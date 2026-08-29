import React from "react";
import { TrendingUp, TrendingDown, LucideIcon } from "lucide-react";
import { clsx } from "clsx";

interface MetricCardProps {
  title: string;
  value: string | number;
  change: string;
  isPositive: boolean;
  icon: LucideIcon;
  comparisonText?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  isPositive,
  icon: Icon,
  comparisonText = "vs previous month",
}) => {
  return (
    <div className="bg-[#121212] border border-[#222222] hover:border-[#333333] p-5 sm:p-6 rounded-2xl shadow-xl transition-all duration-300 relative group overflow-hidden">
      {/* Subtle Gold Hover Glow Top Border */}
      <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="flex items-center justify-between">
        <span className="text-xs uppercase font-bold tracking-widest text-neutral-400 font-display">
          {title}
        </span>
        <div className="w-10 h-10 rounded-xl bg-[#1A1A1A] border border-[#262626] flex items-center justify-center text-[#D4AF37] group-hover:scale-105 group-hover:border-[#D4AF37]/30 transition-all">
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <div className="mt-4 flex items-baseline gap-2">
        <span className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
          {value}
        </span>
      </div>

      <div className="mt-3 flex items-center gap-2 text-xs">
        <div
          className={clsx(
            "flex items-center gap-1 font-semibold px-2 py-0.5 rounded-md",
            isPositive
              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
              : "bg-red-500/10 text-red-400 border border-red-500/20"
          )}
        >
          {isPositive ? (
            <TrendingUp className="w-3 h-3" />
          ) : (
            <TrendingDown className="w-3 h-3" />
          )}
          <span>{change}</span>
        </div>
        <span className="text-[11px] text-neutral-400 truncate">{comparisonText}</span>
      </div>
    </div>
  );
};
