"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Drawer } from "@/components/ui/Drawer";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag, ShoppingBag, Sparkles } from "lucide-react";
import { clsx } from "clsx";

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    closeCart,
    removeItem,
    updateQuantity,
    subtotal,
    discountAmount,
    discountPercentage,
    couponCode,
    applyCoupon,
    removeCoupon,
    shipping,
    total,
    totalItems,
    freeShippingThreshold,
    freeShippingProgress,
  } = useCart();

  const { formatPrice } = useCurrency();
  const [inputCoupon, setInputCoupon] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    setCouponLoading(true);
    setTimeout(() => {
      applyCoupon(inputCoupon);
      setInputCoupon("");
      setCouponLoading(false);
    }, 400);
  };

  const amountRemaining = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <Drawer
      isOpen={isCartOpen}
      onClose={closeCart}
      title="Your Travel Suite"
      subtitle={`${totalItems} ${totalItems === 1 ? "masterpiece" : "pieces"} selected`}
      width="md"
      footer={
        items.length > 0 ? (
          <div className="flex flex-col gap-3">
            {/* Promo Code Input */}
            {couponCode ? (
              <div className="flex items-center justify-between bg-accent/10 border border-accent/30 rounded-xl px-3.5 py-2 text-xs">
                <div className="flex items-center gap-2 text-accent-dark font-medium">
                  <Tag className="w-3.5 h-3.5" />
                  <span>
                    Code: <strong>{couponCode}</strong> ({discountPercentage}% Off)
                  </span>
                </div>
                <button
                  onClick={removeCoupon}
                  className="text-neutral-400 hover:text-red-500 text-xs transition-colors"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Privilege code (try FIRSTCLASS10)"
                  value={inputCoupon}
                  onChange={(e) => setInputCoupon(e.target.value)}
                  className="flex-1 bg-white border border-neutral-200 rounded-full px-4 py-2 text-xs focus:outline-none focus:border-accent text-neutral-800"
                />
                <Button type="submit" variant="secondary" size="sm" isLoading={couponLoading}>
                  Apply
                </Button>
              </form>
            )}

            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs text-neutral-600 pt-2 border-t border-neutral-200">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-primary">{formatPrice(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Privilege Discount ({discountPercentage}%)</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Complimentary Courier</span>
                <span className="text-primary font-medium">
                  {shipping === 0 ? "Free Worldwide" : formatPrice(shipping)}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-primary pt-2 border-t border-neutral-200">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            {/* Checkout & View Cart CTAs */}
            <div className="flex flex-col gap-2 pt-2">
              <Link href="/cart" onClick={closeCart} className="w-full">
                <Button variant="primary" className="w-full py-3.5 text-xs tracking-wider uppercase font-semibold">
                  <span>Proceed to Concierge Checkout</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-2" />
                </Button>
              </Link>
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-neutral-400">
                <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                <span>256-Bit Encrypted Security & Lifetime Guarantee</span>
              </div>
            </div>
          </div>
        ) : null
      }
    >
      {/* Free Shipping Bar */}
      <div className="bg-neutral-50 rounded-2xl p-4 border border-neutral-200/70 mb-6">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="flex items-center gap-1.5 font-medium text-neutral-700">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            {amountRemaining === 0 ? (
              <span className="text-accent-dark font-semibold">
                You've unlocked Complimentary Express Delivery!
              </span>
            ) : (
              <span>
                Add <strong>{formatPrice(amountRemaining)}</strong> more for Free Global Courier
              </span>
            )}
          </span>
          <span className="text-[11px] font-semibold text-neutral-500">
            {freeShippingProgress}%
          </span>
        </div>
        <div className="w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-accent transition-all duration-500 ease-out rounded-full"
            style={{ width: `${freeShippingProgress}%` }}
          />
        </div>
      </div>

      {/* Cart Items List */}
      {items.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center text-center py-16 px-4">
          <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-4">
            <ShoppingBag className="w-7 h-7" />
          </div>
          <h4 className="text-lg font-semibold text-primary mb-1">Your suite is empty</h4>
          <p className="text-xs text-neutral-500 max-w-xs mb-6 leading-relaxed">
            Discover our handcrafted aluminum and Italian leather luggage collection.
          </p>
          <Link href="/shop" onClick={closeCart}>
            <Button variant="primary" size="md">
              Explore Collection
            </Button>
          </Link>
        </div>
      ) : (
        <div className="divide-y divide-neutral-100">
          {items.map((item) => (
            <div key={item.id} className="py-4 first:pt-0 flex gap-4">
              {/* Image */}
              <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-neutral-100 shrink-0 border border-neutral-200/60">
                <Image src={item.image} alt={item.name} fill className="object-cover" />
              </div>

              {/* Info */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start gap-2">
                    <Link
                      href={`/product/${item.slug}`}
                      onClick={closeCart}
                      className="font-medium text-primary hover:text-accent text-sm leading-snug transition-colors line-clamp-1"
                    >
                      {item.name}
                    </Link>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-neutral-400 hover:text-red-500 p-1 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-neutral-500 mt-1">
                    <span className="flex items-center gap-1">
                      <span
                        className="w-2.5 h-2.5 rounded-full border border-neutral-300 inline-block"
                        style={{ backgroundColor: item.color.hex }}
                      />
                      {item.color.name}
                    </span>
                    <span>•</span>
                    <span>{item.size}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-3">
                  {/* Quantity */}
                  <div className="flex items-center border border-neutral-200 rounded-full px-2 py-0.5 bg-white">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 text-neutral-400 hover:text-primary transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-6 text-center text-xs font-semibold text-primary">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 text-neutral-400 hover:text-primary transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Price */}
                  <span className="text-sm font-semibold text-primary">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Drawer>
  );
};
