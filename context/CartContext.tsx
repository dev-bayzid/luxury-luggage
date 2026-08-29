"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { CartItem, Product, ProductColor } from "@/types";
import { useToast } from "./ToastContext";

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, color?: ProductColor, size?: string, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  couponCode: string | null;
  discountPercentage: number;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  subtotal: number;
  discountAmount: number;
  shipping: number;
  tax: number;
  total: number;
  totalItems: number;
  freeShippingThreshold: number;
  freeShippingProgress: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const COUPON_CODES: Record<string, number> = {
  FIRSTCLASS10: 10,
  LUXURY20: 20,
  AURELIA15: 15,
  VIPWELCOME: 10,
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [couponCode, setCouponCode] = useState<string | null>(null);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("aurelia_cart");
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
      const savedCoupon = localStorage.getItem("aurelia_coupon");
      if (savedCoupon && COUPON_CODES[savedCoupon.toUpperCase()]) {
        setCouponCode(savedCoupon.toUpperCase());
        setDiscountPercentage(COUPON_CODES[savedCoupon.toUpperCase()]);
      }
    } catch {
      // LocalStorage error fallback
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem("aurelia_cart", JSON.stringify(items));
      } catch {}
    }
  }, [items, isLoaded]);

  const addItem = (
    product: Product,
    selectedColor?: ProductColor,
    selectedSize?: string,
    quantity: number = 1
  ) => {
    const color = selectedColor || product.colors[0] || { name: "Default", hex: "#111111", image: product.images[0] };
    const size = selectedSize || (product.sizes && product.sizes[0] ? product.sizes[0].name : "Standard");

    let price = product.price;
    if (product.sizes && selectedSize) {
      const sizeObj = product.sizes.find((s) => s.name === selectedSize);
      if (sizeObj && sizeObj.priceDiff) {
        price += sizeObj.priceDiff;
      }
    }

    const uniqueId = `${product.id}-${color.name}-${size}`;

    setItems((prev) => {
      const existing = prev.find((item) => item.id === uniqueId);
      if (existing) {
        return prev.map((item) =>
          item.id === uniqueId ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        const newItem: CartItem = {
          id: uniqueId,
          productId: product.id,
          name: product.name,
          slug: product.slug,
          price: price,
          originalPrice: product.originalPrice,
          color: {
            name: color.name,
            hex: color.hex,
          },
          size: size,
          quantity: quantity,
          image: color.image || product.images[0],
        };
        return [...prev, newItem];
      }
    });

    showToast("Added to Suite", `${product.name} (${color.name}) added to your cart.`, "success");
    setIsCartOpen(true);
  };

  const removeItem = (itemId: string) => {
    const item = items.find((i) => i.id === itemId);
    setItems((prev) => prev.filter((i) => i.id !== itemId));
    if (item) {
      showToast("Removed from Suite", `${item.name} removed from cart.`, "info");
    }
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
    try {
      localStorage.removeItem("aurelia_cart");
    } catch {}
  };

  const applyCoupon = (code: string): boolean => {
    const cleanCode = code.trim().toUpperCase();
    if (COUPON_CODES[cleanCode]) {
      setCouponCode(cleanCode);
      setDiscountPercentage(COUPON_CODES[cleanCode]);
      try {
        localStorage.setItem("aurelia_coupon", cleanCode);
      } catch {}
      showToast("VIP Voucher Applied", `${COUPON_CODES[cleanCode]}% luxury privilege activated.`, "success");
      return true;
    } else {
      showToast("Invalid Privilege Code", "Please enter a valid promotional voucher.", "error");
      return false;
    }
  };

  const removeCoupon = () => {
    setCouponCode(null);
    setDiscountPercentage(0);
    try {
      localStorage.removeItem("aurelia_coupon");
    } catch {}
    showToast("Voucher Removed", "Promotional code cleared.", "info");
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = Math.round((subtotal * discountPercentage) / 100);
  const freeShippingThreshold = 300;
  const shipping = subtotal === 0 || subtotal >= freeShippingThreshold ? 0 : 35;
  const tax = Math.round((subtotal - discountAmount) * 0.08);
  const total = Math.max(0, subtotal - discountAmount + shipping + tax);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        toggleCart: () => setIsCartOpen(!isCartOpen),
        couponCode,
        discountPercentage,
        applyCoupon,
        removeCoupon,
        subtotal,
        discountAmount,
        shipping,
        tax,
        total,
        totalItems,
        freeShippingThreshold,
        freeShippingProgress,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
