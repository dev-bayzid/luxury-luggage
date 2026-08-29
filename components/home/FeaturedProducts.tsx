"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";

export const FeaturedProducts: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("All");

  const tabs = ["All", "Cabin Luggage", "Checked Luggage", "Aluminum Trunks", "Hybrid Spinners", "Heritage Cases"];

  const filteredProducts =
    activeTab === "All"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeTab);

  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <span className="text-xs uppercase font-bold tracking-[0.25em] text-accent">
              Permanent Collection
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-primary tracking-tight mt-1">
              Signature Luggage Creations
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={clsx(
                  "px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap",
                  activeTab === tab
                    ? "bg-primary text-white shadow-sm"
                    : "text-neutral-500 hover:text-primary hover:bg-neutral-100"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 sm:mt-16">
          <Link href="/shop">
            <Button variant="outline" size="lg" className="px-8 py-3.5 text-xs font-bold uppercase tracking-widest">
              <span>View Full Luggage Vault</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
