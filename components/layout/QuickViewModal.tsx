"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Rating } from "@/components/ui/Rating";
import { Badge } from "@/components/ui/Badge";
import { useQuickView } from "@/context/QuickViewContext";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";
import { useWishlist } from "@/context/WishlistContext";
import { ProductColor } from "@/types";
import { Heart, ShieldCheck, Check, ArrowRight, Minus, Plus } from "lucide-react";
import { clsx } from "clsx";

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, closeQuickView } = useQuickView();
  const { addItem } = useCart();
  const { formatPrice } = useCurrency();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [activeImage, setActiveImage] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (quickViewProduct) {
      const defaultColor = quickViewProduct.colors[0];
      setSelectedColor(defaultColor);
      setSelectedSize(quickViewProduct.sizes ? quickViewProduct.sizes[0]?.name : "Standard");
      setActiveImage(defaultColor?.image || quickViewProduct.images[0]);
      setQuantity(1);
      setIsAdded(false);
    }
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const isWishlisted = isInWishlist(quickViewProduct.id);

  let currentPrice = quickViewProduct.price;
  if (quickViewProduct.sizes && selectedSize) {
    const sizeObj = quickViewProduct.sizes.find((s) => s.name === selectedSize);
    if (sizeObj?.priceDiff) {
      currentPrice += sizeObj.priceDiff;
    }
  }

  const handleAddToCart = () => {
    if (!selectedColor) return;
    addItem(quickViewProduct, selectedColor, selectedSize, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <Modal
      isOpen={!!quickViewProduct}
      onClose={closeQuickView}
      maxWidth="4xl"
      className="p-0 overflow-hidden"
    >
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Left: Gallery */}
        <div className="bg-neutral-100 p-6 flex flex-col justify-between">
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-white/60 mb-4">
            <Image
              src={activeImage || quickViewProduct.images[0]}
              alt={quickViewProduct.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center transition-all duration-300"
            />
            {quickViewProduct.isNew && (
              <div className="absolute top-3 left-3">
                <Badge variant="gold">New Release</Badge>
              </div>
            )}
          </div>

          {/* Thumbnails */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {quickViewProduct.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img)}
                className={clsx(
                  "relative w-16 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all",
                  activeImage === img ? "border-accent ring-1 ring-accent" : "border-neutral-200 opacity-70 hover:opacity-100"
                )}
              >
                <Image src={img} alt={`View ${idx + 1}`} fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Product Options */}
        <div className="p-6 md:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs uppercase tracking-widest text-accent font-semibold">
                {quickViewProduct.category}
              </span>
              <span className="text-xs text-emerald-600 flex items-center gap-1 font-medium bg-emerald-50 px-2.5 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                In Stock ({quickViewProduct.stockCount} available)
              </span>
            </div>

            <h2 className="text-2xl font-bold text-primary mb-1">{quickViewProduct.name}</h2>

            <div className="flex items-center gap-3 my-2">
              <Rating rating={quickViewProduct.rating} reviewCount={quickViewProduct.reviewCount} />
              <span className="text-neutral-300">•</span>
              <span className="text-xs text-neutral-500">SKU: AUR-{quickViewProduct.id.toUpperCase()}</span>
            </div>

            <div className="flex items-baseline gap-3 my-3">
              <span className="text-2xl font-bold text-primary">{formatPrice(currentPrice)}</span>
              {quickViewProduct.originalPrice && (
                <span className="text-sm text-neutral-400 line-through">
                  {formatPrice(quickViewProduct.originalPrice)}
                </span>
              )}
            </div>

            <p className="text-xs text-neutral-600 leading-relaxed mb-5">
              {quickViewProduct.description}
            </p>

            {/* Colors */}
            <div className="mb-5">
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-800 block mb-2">
                Finish: <span className="font-normal text-neutral-500">{selectedColor?.name}</span>
              </label>
              <div className="flex items-center gap-3">
                {quickViewProduct.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => {
                      setSelectedColor(color);
                      if (color.image) setActiveImage(color.image);
                    }}
                    className={clsx(
                      "w-7 h-7 rounded-full transition-all border flex items-center justify-center",
                      selectedColor?.name === color.name
                        ? "ring-2 ring-accent ring-offset-2 scale-110"
                        : "opacity-80 hover:opacity-100"
                    )}
                    style={{ backgroundColor: color.hex, borderColor: color.borderHex || "rgba(0,0,0,0.2)" }}
                    title={color.name}
                  >
                    {selectedColor?.name === color.name && (
                      <Check className="w-3.5 h-3.5 text-white filter drop-shadow" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Sizes */}
            {quickViewProduct.sizes && (
              <div className="mb-5">
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-800 block mb-2">
                  Volume / Size
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {quickViewProduct.sizes.map((size) => (
                    <button
                      key={size.name}
                      onClick={() => setSelectedSize(size.name)}
                      className={clsx(
                        "py-2 px-3 rounded-xl text-xs font-medium border text-center transition-all",
                        selectedSize === size.name
                          ? "border-primary bg-primary text-white"
                          : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400"
                      )}
                    >
                      <div className="font-semibold">{size.name.split(" ")[0]}</div>
                      <div className="text-[10px] opacity-75">{size.volume}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-neutral-100 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              {/* Quantity Counter */}
              <div className="flex items-center border border-neutral-200 rounded-full px-2 py-1">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-1 text-neutral-500 hover:text-primary transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-8 text-center text-xs font-semibold text-primary">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                  className="p-1 text-neutral-500 hover:text-primary transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Add to Cart Button */}
              <Button
                variant={isAdded ? "secondary" : "primary"}
                className="flex-1 text-xs py-3"
                onClick={handleAddToCart}
              >
                {isAdded ? (
                  <span className="text-emerald-600 flex items-center gap-1.5 font-semibold">
                    <Check className="w-4 h-4" /> Added to Suite
                  </span>
                ) : (
                  <span>Add to Suite • {formatPrice(currentPrice * quantity)}</span>
                )}
              </Button>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(quickViewProduct)}
                className={clsx(
                  "p-3 rounded-full border transition-all",
                  isWishlisted
                    ? "bg-accent border-accent text-primary"
                    : "border-neutral-200 text-neutral-600 hover:text-accent hover:border-accent"
                )}
                aria-label="Wishlist"
              >
                <Heart className={clsx("w-4 h-4", isWishlisted && "fill-primary")} />
              </button>
            </div>

            {/* Bottom links */}
            <div className="flex items-center justify-between text-xs pt-1">
              <div className="flex items-center gap-1.5 text-neutral-500">
                <ShieldCheck className="w-4 h-4 text-accent" />
                <span>Lifetime Airline Damage Guarantee</span>
              </div>

              <Link
                href={`/product/${quickViewProduct.slug}`}
                onClick={closeQuickView}
                className="text-accent hover:text-accent-dark font-medium flex items-center gap-1 group"
              >
                <span>Full Details</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
