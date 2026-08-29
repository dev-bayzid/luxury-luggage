"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Currency, CurrencyCode } from "@/types";

export const CURRENCIES: Record<CurrencyCode, Currency> = {
  USD: { code: "USD", symbol: "$", rate: 1.0 },
  EUR: { code: "EUR", symbol: "€", rate: 0.92 },
  GBP: { code: "GBP", symbol: "£", rate: 0.79 },
  JPY: { code: "JPY", symbol: "¥", rate: 154.0 },
};

interface CurrencyContextType {
  currency: Currency;
  currencyCode: CurrencyCode;
  setCurrencyCode: (code: CurrencyCode) => void;
  formatPrice: (amountInUSD: number) => string;
  convertPrice: (amountInUSD: number) => number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currencyCode, setCurrencyCodeState] = useState<CurrencyCode>("USD");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("aurelia_currency") as CurrencyCode;
      if (saved && CURRENCIES[saved]) {
        setCurrencyCodeState(saved);
      }
    } catch {
      // LocalStorage fallback
    }
  }, []);

  const setCurrencyCode = (code: CurrencyCode) => {
    setCurrencyCodeState(code);
    try {
      localStorage.setItem("aurelia_currency", code);
    } catch {}
  };

  const currency = CURRENCIES[currencyCode] || CURRENCIES.USD;

  const convertPrice = (amountInUSD: number): number => {
    const converted = amountInUSD * currency.rate;
    if (currencyCode === "JPY") {
      return Math.round(converted);
    }
    return Math.round(converted);
  };

  const formatPrice = (amountInUSD: number): string => {
    const converted = convertPrice(amountInUSD);
    if (currencyCode === "JPY") {
      return `¥${converted.toLocaleString()}`;
    }
    return `${currency.symbol}${converted.toLocaleString()}`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        currencyCode,
        setCurrencyCode,
        formatPrice,
        convertPrice,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
};
