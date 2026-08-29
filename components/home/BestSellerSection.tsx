"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";
import { useQuickView } from "@/context/QuickViewContext";
import { Rating } from "@/components/ui/Rating";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ShoppingBag, Eye, ShieldCheck, Check, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export const BestSellerSection: React.FC = () => {
  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller).slice(0, 2);
  const { addItem } = useCart();
  const { formatPrice } = useCurrency();
  const { openQuickView } = useQuickView();
  const [addedId, setAddedId] = useState<string | null>(null);

  const handleAdd = (product: (typeof PRODUCTS)[0]) => {
    addItem(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <section className="py-20 sm:py-28 bg-primary-dark text-white relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Badge variant="gold" className="mb-3">
            <Sparkles className="w-3 h-3 mr-1 inline-block" />
            Hall of Icons
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            The Best Seller Spotlight
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-2">
            Praised by international business leaders and seasoned globetrotters for unmatched durability and timeless refinement.
          </p>
        </div>

        {/* Horizontal Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {bestSellers.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="bg-neutral-900/80 border border-neutral-800 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-center justify-between shadow-2xl backdrop-blur-xl hover:border-accent/40 transition-all duration-500 group"
            >
              {/* Product Image */}
              <div className="relative w-full sm:w-52 aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-950 shrink-0">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3">
                  <Badge variant="gold">#1 Best Seller</Badge>
                </div>
              </div>

              {/* Product Details */}
              <div className="flex-1 flex flex-col justify-between h-full space-y-4 w-full">
                <div>
                  <div className="text-[11px] uppercase tracking-widest text-accent font-semibold">
                    {product.category}
                  </div>
                  <Link href={`/product/${product.slug}`}>
                    <h3 className="text-xl font-bold text-white mt-1 group-hover:text-accent transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-xs text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
                    {product.tagline}
                  </p>

                  <div className="mt-2">
                    <Rating rating={product.rating} reviewCount={product.reviewCount} />
                  </div>
                </div>

                {/* Key Specs Pills */}
                <div className="grid grid-cols-2 gap-2 py-3 border-y border-neutral-800 text-[11px] text-neutral-300">
                  <div>
                    <span className="text-neutral-500 block text-[10px]">Volume:</span>
                    <span className="font-semibold">{product.dimensions.volume}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block text-[10px]">Weight:</span>
                    <span className="font-semibold">{product.dimensions.weight.split("/")[0]}</span>
                  </div>
                </div>

                {/* Price & Actions */}
                <div className="flex items-center justify-between pt-1">
                  <div>
                    <span className="text-xs text-neutral-400 block">Maison Price</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-bold text-white">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-neutral-500 line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openQuickView(product)}
                      className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white transition-colors"
                      title="Quick View"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <Button
                      variant={addedId === product.id ? "secondary" : "gold"}
                      size="sm"
                      onClick={() => handleAdd(product)}
                      className="px-4 py-2.5 text-xs font-semibold"
                    >
                      {addedId === product.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5 mr-1" />
                          <span>Acquire</span>
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
