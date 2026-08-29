"use client";

import React from "react";
import { Product } from "@/types";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "./ProductCard";

interface RelatedProductsProps {
  currentProduct: Product;
}

export const RelatedProducts: React.FC<RelatedProductsProps> = ({ currentProduct }) => {
  const related = PRODUCTS.filter((p) => p.id !== currentProduct.id).slice(0, 4);

  return (
    <section className="py-16 sm:py-24 border-t border-neutral-200">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
        <div>
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-accent">
            Curated Pairings
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-primary tracking-tight mt-1">
            Complete Your Travel Suite
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {related.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
