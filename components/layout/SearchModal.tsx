"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Modal } from "@/components/ui/Modal";
import { PRODUCTS } from "@/data/products";
import { useCurrency } from "@/context/CurrencyContext";
import { Search, X, ArrowRight, Sparkles } from "lucide-react";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const { formatPrice } = useCurrency();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  const trendingTags = [
    "Titanium Cabin",
    "Checked 85L",
    "Weekender Duffel",
    "Commuter Backpack",
    "Compression Cubes",
    "Aluminum Trunk",
  ];

  const results = query.trim()
    ? PRODUCTS.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.materials.some((m) => m.toLowerCase().includes(q))
        );
      })
    : [];

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="2xl" className="p-0 overflow-hidden">
      {/* Search Input Header */}
      <div className="p-4 sm:p-6 border-b border-neutral-100 flex items-center gap-3 bg-neutral-50/50">
        <Search className="w-5 h-5 text-accent shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search luggage, collections, materials..."
          className="w-full bg-transparent text-base text-primary placeholder-neutral-400 focus:outline-none font-medium"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="p-1 text-neutral-400 hover:text-primary transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Content Area */}
      <div className="p-6 max-h-[60vh] overflow-y-auto">
        {!query.trim() ? (
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span>Trending Searches</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              {trendingTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="px-3.5 py-1.5 rounded-full text-xs bg-neutral-100 hover:bg-accent/15 hover:text-accent-dark text-neutral-700 transition-colors border border-neutral-200/60"
                >
                  {tag}
                </button>
              ))}
            </div>

            <div className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-3">
              Curated Highlights
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PRODUCTS.slice(0, 2).map((prod) => (
                <Link
                  key={prod.id}
                  href={`/product/${prod.slug}`}
                  onClick={onClose}
                  className="flex items-center gap-3 p-2.5 rounded-xl border border-neutral-100 hover:border-accent/40 bg-white hover:bg-neutral-50/80 transition-all group"
                >
                  <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-neutral-100 shrink-0">
                    <Image src={prod.images[0]} alt={prod.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-primary group-hover:text-accent transition-colors truncate">
                      {prod.name}
                    </div>
                    <div className="text-[11px] text-neutral-500">{prod.category}</div>
                    <div className="text-xs font-bold text-primary mt-0.5">{formatPrice(prod.price)}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : results.length > 0 ? (
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-3">
              Found {results.length} results
            </div>
            <div className="space-y-3">
              {results.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.slug}`}
                  onClick={onClose}
                  className="flex items-center justify-between p-3 rounded-xl border border-neutral-100 hover:border-accent/40 hover:bg-neutral-50/80 transition-all group"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-neutral-100 shrink-0">
                      <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-semibold text-primary group-hover:text-accent transition-colors truncate">
                        {product.name}
                      </h4>
                      <p className="text-xs text-neutral-500 truncate">{product.tagline}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0 pl-3">
                    <span className="text-sm font-bold text-primary">{formatPrice(product.price)}</span>
                    <div className="text-[10px] text-accent font-medium">{product.category}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-sm text-neutral-600">No pieces found matching &ldquo;{query}&rdquo;.</p>
            <p className="text-xs text-neutral-400 mt-1">
              Try searching for &ldquo;Titanium&rdquo;, &ldquo;Cabin&rdquo;, or &ldquo;Leather&rdquo;.
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 py-3 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
        <span>Press ESC to close</span>
        <Link
          href="/shop"
          onClick={onClose}
          className="text-accent hover:text-accent-dark font-medium flex items-center gap-1 group"
        >
          <span>View all products</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </Modal>
  );
};
