"use client";

import React, { useState } from "react";
import { Product, ProductColor } from "@/types";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useCurrency } from "@/context/CurrencyContext";
import { Rating } from "@/components/ui/Rating";
import { Button } from "@/components/ui/Button";
import {
  Heart,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  Minus,
  Plus,
  Plane,
  Sparkles,
} from "lucide-react";
import { clsx } from "clsx";

interface ProductInfoProps {
  product: Product;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { formatPrice } = useCurrency();

  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes && product.sizes[0] ? product.sizes[0].name : "Standard"
  );
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const isWishlisted = isInWishlist(product.id);

  let currentPrice = product.price;
  if (product.sizes && selectedSize) {
    const sizeObj = product.sizes.find((s) => s.name === selectedSize);
    if (sizeObj?.priceDiff) {
      currentPrice += sizeObj.priceDiff;
    }
  }

  const handleAddToCart = () => {
    addItem(product, selectedColor, selectedSize, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Category & Stock Status */}
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase font-bold tracking-[0.2em] text-accent">
          {product.category}
        </span>
        <span className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-0.5 rounded-full font-medium flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          In Stock ({product.stockCount} handcrafted remaining)
        </span>
      </div>

      {/* Product Title */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-primary tracking-tight">
          {product.name}
        </h1>
        <p className="text-sm text-neutral-500 mt-2 leading-relaxed">
          {product.tagline}
        </p>
      </div>

      {/* Rating & Review Summary */}
      <div className="flex items-center gap-4 py-2 border-y border-neutral-100">
        <Rating rating={product.rating} reviewCount={product.reviewCount} size="md" />
        <span className="text-neutral-300">•</span>
        <span className="text-xs text-neutral-500 font-mono">MODEL NO. {product.id.toUpperCase()}-2026</span>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span className="text-3xl sm:text-4xl font-extrabold text-primary">
          {formatPrice(currentPrice)}
        </span>
        {product.originalPrice && (
          <span className="text-lg text-neutral-400 line-through">
            {formatPrice(product.originalPrice)}
          </span>
        )}
      </div>

      {/* Finishes / Colors */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-neutral-800">
            Selected Finish: <span className="font-normal text-neutral-600">{selectedColor.name}</span>
          </label>
        </div>
        <div className="flex items-center gap-3">
          {product.colors.map((color) => (
            <button
              key={color.name}
              onClick={() => setSelectedColor(color)}
              title={color.name}
              className={clsx(
                "w-9 h-9 rounded-full border flex items-center justify-center transition-all",
                selectedColor.name === color.name
                  ? "ring-2 ring-accent ring-offset-2 scale-110 shadow-sm"
                  : "opacity-75 hover:opacity-100"
              )}
              style={{ backgroundColor: color.hex, borderColor: color.borderHex || "rgba(0,0,0,0.2)" }}
            >
              {selectedColor.name === color.name && (
                <Check className="w-4 h-4 text-white filter drop-shadow" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Size / Volume selector */}
      {product.sizes && (
        <div className="space-y-3 pt-2">
          <label className="text-xs font-bold uppercase tracking-wider text-neutral-800 block">
            Volume Capacity & Frame
          </label>
          <div className="grid grid-cols-3 gap-3">
            {product.sizes.map((size) => (
              <button
                key={size.name}
                onClick={() => setSelectedSize(size.name)}
                className={clsx(
                  "p-3 rounded-2xl border text-left transition-all",
                  selectedSize === size.name
                    ? "border-primary bg-primary text-white shadow-md"
                    : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400"
                )}
              >
                <div className="font-bold text-xs">{size.name}</div>
                <div className={clsx("text-[11px] mt-0.5", selectedSize === size.name ? "text-neutral-300" : "text-neutral-500")}>
                  {size.volume}
                </div>
                {size.priceDiff ? (
                  <div className={clsx("text-[10px] font-semibold mt-1", selectedSize === size.name ? "text-accent" : "text-accent-dark")}>
                    {size.priceDiff > 0 ? `+${formatPrice(size.priceDiff)}` : `-${formatPrice(Math.abs(size.priceDiff))}`}
                  </div>
                ) : (
                  <div className={clsx("text-[10px] mt-1", selectedSize === size.name ? "text-neutral-400" : "text-neutral-400")}>
                    Standard
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Add to Cart Actions */}
      <div className="pt-4 space-y-3">
        <div className="flex items-center gap-3">
          {/* Quantity Selector */}
          <div className="flex items-center border border-neutral-200 rounded-full px-3 py-2 bg-neutral-50">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="p-1 text-neutral-500 hover:text-primary transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-10 text-center font-bold text-sm text-primary">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => Math.min(10, q + 1))}
              className="p-1 text-neutral-500 hover:text-primary transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add to Cart Button */}
          <Button
            variant={isAdded ? "secondary" : "primary"}
            size="lg"
            className="flex-1 py-4 text-xs font-bold uppercase tracking-widest"
            onClick={handleAddToCart}
          >
            {isAdded ? (
              <span className="text-emerald-600 flex items-center gap-2">
                <Check className="w-4 h-4" /> Piece Added to Suite
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-accent" />
                <span>Add to Travel Suite • {formatPrice(currentPrice * quantity)}</span>
              </span>
            )}
          </Button>

          {/* Wishlist Button */}
          <button
            onClick={() => toggleWishlist(product)}
            className={clsx(
              "p-4 rounded-full border transition-all shadow-sm",
              isWishlisted
                ? "bg-accent border-accent text-primary"
                : "border-neutral-200 text-neutral-600 hover:text-accent hover:border-accent bg-white"
            )}
            aria-label="Wishlist"
          >
            <Heart className={clsx("w-5 h-5", isWishlisted && "fill-primary")} />
          </button>
        </div>
      </div>

      {/* Trust Badges Bar */}
      <div className="pt-6 border-t border-neutral-200 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-neutral-600">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-accent shrink-0" />
          <span>Unconditional Lifetime Warranty</span>
        </div>
        <div className="flex items-center gap-2">
          <Truck className="w-4 h-4 text-accent shrink-0" />
          <span>Complimentary Express Courier</span>
        </div>
        <div className="flex items-center gap-2">
          <RotateCcw className="w-4 h-4 text-accent shrink-0" />
          <span>100-Day Risk-Free Voyage Trial</span>
        </div>
      </div>
    </div>
  );
};
