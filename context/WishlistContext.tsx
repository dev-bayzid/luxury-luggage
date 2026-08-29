"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product, WishlistItem } from "@/types";
import { useToast } from "./ToastContext";

interface WishlistContextType {
  items: WishlistItem[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  removeFromWishlist: (productId: string) => void;
  clearWishlist: () => void;
  totalWishlist: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    try {
      const saved = localStorage.getItem("aurelia_wishlist");
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch {}
    finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem("aurelia_wishlist", JSON.stringify(items));
      } catch {}
    }
  }, [items, isLoaded]);

  const isInWishlist = (productId: string): boolean => {
    return items.some((item) => item.productId === productId);
  };

  const toggleWishlist = (product: Product) => {
    if (isInWishlist(product.id)) {
      setItems((prev) => prev.filter((item) => item.productId !== product.id));
      showToast("Removed from Wishlist", `${product.name} removed from your saved pieces.`, "info");
    } else {
      const newItem: WishlistItem = {
        productId: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.images[0],
        category: product.category,
        rating: product.rating,
        inStock: product.inStock,
      };
      setItems((prev) => [...prev, newItem]);
      showToast("Saved to Wishlist", `${product.name} added to your private collection.`, "success");
    }
  };

  const removeFromWishlist = (productId: string) => {
    const item = items.find((i) => i.productId === productId);
    setItems((prev) => prev.filter((i) => i.productId !== productId));
    if (item) {
      showToast("Removed from Wishlist", `${item.name} removed.`, "info");
    }
  };

  const clearWishlist = () => {
    setItems([]);
    try {
      localStorage.removeItem("aurelia_wishlist");
    } catch {}
  };

  return (
    <WishlistContext.Provider
      value={{
        items,
        toggleWishlist,
        isInWishlist,
        removeFromWishlist,
        clearWishlist,
        totalWishlist: items.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
