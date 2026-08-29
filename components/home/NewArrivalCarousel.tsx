"use client";

import React, { useState } from "react";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const NewArrivalCarousel: React.FC = () => {
  const newProducts = PRODUCTS.filter((p) => p.isNew || p.id === "aur-05" || p.id === "aur-08");
  const [startIndex, setStartIndex] = useState(0);

  const visibleCount = 3;
  const maxIndex = Math.max(0, newProducts.length - visibleCount);

  const prev = () => {
    setStartIndex((prev) => Math.max(0, prev - 1));
  };

  const next = () => {
    setStartIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  return (
    <section className="py-20 sm:py-28 bg-neutral-50 border-y border-neutral-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header with Navigation Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs uppercase font-bold tracking-[0.25em] text-accent flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Limited Atelier Drops</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-primary tracking-tight mt-1">
              New Arrivals & Innovations
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={prev}
              disabled={startIndex === 0}
              aria-label="Previous items"
              className="p-3 rounded-full border border-neutral-300 bg-white hover:bg-neutral-900 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              disabled={startIndex >= maxIndex}
              aria-label="Next items"
              className="p-3 rounded-full border border-neutral-300 bg-white hover:bg-neutral-900 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Sliding Grid */}
        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {newProducts.slice(startIndex, startIndex + visibleCount).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
