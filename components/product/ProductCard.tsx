"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useQuickView } from "@/context/QuickViewContext";
import { useCurrency } from "@/context/CurrencyContext";
import { Rating } from "@/components/ui/Rating";
import { Badge } from "@/components/ui/Badge";
import { Heart, Eye, ShoppingBag, Check } from "lucide-react";
import { motion } from "framer-motion";
import { clsx } from "clsx";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, className }) => {
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { openQuickView } = useQuickView();
  const { formatPrice } = useCurrency();

  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const activeColor = product.colors[selectedColorIdx] || product.colors[0];
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, activeColor);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openQuickView(product);
  };

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // Choose secondary image on hover if available
  const displayImage = isHovered && product.images.length > 1 ? product.images[1] : activeColor.image || product.images[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4 }}
      className={clsx(
        "group relative bg-white rounded-2xl p-3 sm:p-4 border border-neutral-100/90 shadow-luxury hover:shadow-luxury-hover transition-all duration-500 flex flex-col justify-between",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Image Container */}
      <div className="relative w-full aspect-[4/4.5] rounded-xl overflow-hidden bg-neutral-100/80 mb-4">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 pointer-events-none">
          {product.isNew && <Badge variant="gold">New Arrival</Badge>}
          {product.isBestSeller && !product.isNew && <Badge variant="dark">Best Seller</Badge>}
          {discountPercent > 0 && <Badge variant="discount">Save {discountPercent}%</Badge>}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className={clsx(
            "absolute top-3 right-3 z-10 p-2.5 rounded-full transition-all duration-300 shadow-md backdrop-blur-md",
            isWishlisted
              ? "bg-accent text-primary"
              : "bg-white/80 text-neutral-600 hover:text-accent hover:bg-white"
          )}
        >
          <Heart className={clsx("w-4 h-4 transition-transform active:scale-125", isWishlisted && "fill-primary")} />
        </button>

        {/* Product Image Link */}
        <Link href={`/product/${product.slug}`} className="block w-full h-full">
          <div className="relative w-full h-full transform transition-transform duration-700 ease-out group-hover:scale-105">
            <Image
              src={displayImage}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover object-center"
              priority={product.isFeatured}
            />
          </div>
        </Link>

        {/* Quick Action Floating Bar on Hover */}
        <div className="absolute bottom-3 inset-x-3 z-10 flex items-center justify-center gap-2 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <button
            onClick={handleQuickView}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 bg-white/95 hover:bg-white text-primary text-xs font-semibold rounded-full shadow-lg backdrop-blur-md transition-colors border border-neutral-200"
          >
            <Eye className="w-3.5 h-3.5 text-accent" />
            <span>Quick View</span>
          </button>
          <button
            onClick={handleAddToCart}
            className={clsx(
              "flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-semibold rounded-full shadow-lg backdrop-blur-md transition-colors",
              isAdded
                ? "bg-emerald-600 text-white"
                : "bg-primary hover:bg-neutral-900 text-white"
            )}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 text-accent" />
                <span>Add to Suite</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Details Area */}
      <div className="flex flex-col flex-1 justify-between">
        <div>
          {/* Category & Color Swatches */}
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] uppercase tracking-widest text-neutral-400 font-medium">
              {product.category}
            </span>

            {/* Color swatches */}
            {product.colors.length > 1 && (
              <div className="flex items-center gap-1.5">
                {product.colors.map((color, idx) => (
                  <button
                    key={color.name}
                    title={color.name}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSelectedColorIdx(idx);
                    }}
                    className={clsx(
                      "w-3.5 h-3.5 rounded-full transition-all duration-200 border",
                      selectedColorIdx === idx
                        ? "ring-1 ring-offset-1 ring-accent scale-110"
                        : "opacity-75 hover:opacity-100"
                    )}
                    style={{
                      backgroundColor: color.hex,
                      borderColor: color.borderHex || "rgba(0,0,0,0.2)",
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Title */}
          <Link href={`/product/${product.slug}`} className="block group-hover:text-accent transition-colors">
            <h3 className="font-semibold text-primary text-base line-clamp-1 leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Tagline */}
          <p className="text-xs text-neutral-500 mt-1 line-clamp-1 font-normal">
            {product.tagline}
          </p>
        </div>

        {/* Rating & Price */}
        <div className="mt-3 pt-3 border-t border-neutral-100 flex items-center justify-between">
          <Rating rating={product.rating} reviewCount={product.reviewCount} size="sm" />

          <div className="flex items-baseline gap-2">
            {product.originalPrice && (
              <span className="text-xs text-neutral-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            <span className="text-base font-bold text-primary">
              {formatPrice(product.price)}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
