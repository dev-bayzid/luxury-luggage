"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";
import { PRODUCTS } from "@/data/products";
import { PageHero } from "@/components/common/PageHero";
import { Button } from "@/components/ui/Button";
import { Rating } from "@/components/ui/Rating";
import { EmptyState } from "@/components/common/EmptyState";
import { Heart, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function WishlistPage() {
  const { items, removeFromWishlist, clearWishlist } = useWishlist();
  const { addItem } = useCart();
  const { formatPrice } = useCurrency();

  const handleMoveAllToCart = () => {
    items.forEach((item) => {
      const fullProduct = PRODUCTS.find((p) => p.id === item.productId);
      if (fullProduct) {
        addItem(fullProduct);
      }
    });
    clearWishlist();
  };

  const handleSingleAddToCart = (productId: string) => {
    const fullProduct = PRODUCTS.find((p) => p.id === productId);
    if (fullProduct) {
      addItem(fullProduct);
      removeFromWishlist(productId);
    }
  };

  return (
    <div>
      <PageHero
        badge="Private Collection"
        title="Saved Masterpieces"
        subtitle="Your personalized portfolio of desired travel gear and limited atelier luggage."
        breadcrumbs={[{ label: "Wishlist", href: "/wishlist" }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {items.length === 0 ? (
          <EmptyState
            icon={Heart}
            title="Your Wishlist is Empty"
            description="Save your favorite aluminum spinners, leather weekender duffels, and travel accessories while browsing."
            actionText="Discover Collection"
            actionHref="/shop"
          />
        ) : (
          <div className="space-y-8">
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 sm:p-6 rounded-3xl border border-neutral-200 shadow-sm">
              <span className="text-sm font-semibold text-primary">
                {items.length} {items.length === 1 ? "piece" : "pieces"} saved in your private vault
              </span>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearWishlist}
                  className="text-xs text-neutral-600 hover:text-red-500"
                >
                  Clear All
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleMoveAllToCart}
                  className="text-xs uppercase tracking-wider font-semibold"
                >
                  <ShoppingBag className="w-3.5 h-3.5 mr-1.5 text-accent" />
                  <span>Move All to Suite</span>
                </Button>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={item.productId}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="bg-white rounded-3xl p-4 border border-neutral-200/80 shadow-luxury flex flex-col justify-between group"
                  >
                    <div>
                      {/* Image */}
                      <div className="relative aspect-[4/4.5] rounded-2xl overflow-hidden bg-neutral-100 mb-4">
                        <Link href={`/product/${item.slug}`}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </Link>
                        <button
                          onClick={() => removeFromWishlist(item.productId)}
                          className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-md rounded-full text-neutral-400 hover:text-red-500 transition-colors shadow-sm"
                          aria-label="Remove from wishlist"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Info */}
                      <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-400">
                        {item.category}
                      </span>
                      <Link href={`/product/${item.slug}`}>
                        <h3 className="text-sm font-bold text-primary hover:text-accent transition-colors line-clamp-1 mt-1">
                          {item.name}
                        </h3>
                      </Link>

                      <div className="mt-1">
                        <Rating rating={item.rating} size="sm" />
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between">
                      <div>
                        <span className="text-base font-extrabold text-primary">
                          {formatPrice(item.price)}
                        </span>
                      </div>

                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleSingleAddToCart(item.productId)}
                        className="text-xs px-4"
                      >
                        <span>Add to Suite</span>
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
