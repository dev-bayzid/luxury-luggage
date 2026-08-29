"use client";

import React, { useState, useRef, useEffect } from "react";
import { useCurrency, CURRENCIES } from "@/context/CurrencyContext";
import { CurrencyCode } from "@/types";
import { ChevronDown, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";

interface CurrencySelectorProps {
  className?: string;
  variant?: "light" | "dark";
}

export const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  className,
  variant = "dark",
}) => {
  const { currencyCode, setCurrencyCode } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currencies: { code: CurrencyCode; label: string; flag: string }[] = [
    { code: "USD", label: "USD ($)", flag: "🇺🇸" },
    { code: "EUR", label: "EUR (€)", flag: "🇪🇺" },
    { code: "GBP", label: "GBP (£)", flag: "🇬🇧" },
    { code: "JPY", label: "JPY (¥)", flag: "🇯🇵" },
  ];

  const isLight = variant === "light";

  return (
    <div ref={containerRef} className={clsx("relative inline-block text-left", className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium tracking-wider transition-all",
          isLight
            ? "text-neutral-700 hover:text-primary hover:bg-neutral-100/80 border border-neutral-200"
            : "text-neutral-300 hover:text-white hover:bg-white/10 border border-neutral-700/60"
        )}
        aria-label="Select currency"
      >
        <Globe className="w-3.5 h-3.5 text-accent" />
        <span>{currencyCode}</span>
        <ChevronDown className={clsx("w-3 h-3 transition-transform", isOpen && "rotate-180")} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-36 bg-primary-dark/95 backdrop-blur-xl border border-neutral-800 rounded-xl shadow-2xl z-50 py-1 overflow-hidden"
          >
            <div className="px-3 py-1.5 text-[10px] uppercase font-semibold tracking-widest text-neutral-400 border-b border-neutral-800">
              Select Currency
            </div>
            {currencies.map((curr) => (
              <button
                key={curr.code}
                onClick={() => {
                  setCurrencyCode(curr.code);
                  setIsOpen(false);
                }}
                className={clsx(
                  "w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-colors",
                  currencyCode === curr.code
                    ? "bg-accent/20 text-accent font-semibold"
                    : "text-neutral-300 hover:bg-white/5 hover:text-white"
                )}
              >
                <span>{curr.flag} {curr.label}</span>
                {currencyCode === curr.code && <span className="w-1.5 h-1.5 rounded-full bg-accent" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
