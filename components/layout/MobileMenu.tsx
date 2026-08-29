"use client";

import React from "react";
import Link from "next/link";
import { Drawer } from "@/components/ui/Drawer";
import { CurrencySelector } from "@/components/ui/CurrencySelector";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { CATEGORIES } from "@/data/categories";
import {
  ShoppingBag,
  Heart,
  Phone,
  Sparkles,
  ChevronRight,
  Luggage,
} from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { totalItems } = useCart();
  const { totalWishlist } = useWishlist();

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      position="left"
      title="luxury-luggage"
      subtitle="Haute Bagagerie & Travel Gear"
      width="sm"
      footer={
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-neutral-500 font-medium">
              Currency
            </span>
            <CurrencySelector variant="light" />
          </div>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Quick Utility Row */}
        <div className="grid grid-cols-2 gap-2 pb-4 border-b border-neutral-100">
          <Link
            href="/cart"
            onClick={onClose}
            className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 hover:bg-neutral-100 transition-colors"
          >
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-accent" />
              <span className="text-xs font-semibold text-primary">Suite</span>
            </div>
            <span className="text-xs bg-primary text-white font-bold px-2 py-0.5 rounded-full">
              {totalItems}
            </span>
          </Link>

          <Link
            href="/wishlist"
            onClick={onClose}
            className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 hover:bg-neutral-100 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-accent" />
              <span className="text-xs font-semibold text-primary">
                Wishlist
              </span>
            </div>
            <span className="text-xs bg-neutral-200 text-neutral-800 font-bold px-2 py-0.5 rounded-full">
              {totalWishlist}
            </span>
          </Link>
        </div>

        {/* Main Navigation Links matching screenshot */}
        <div>
          <div className="text-[10px] uppercase font-bold tracking-widest text-neutral-400 mb-2">
            Navigation
          </div>
          <div className="space-y-1">
            <Link
              href="/shop"
              onClick={onClose}
              className="flex items-center justify-between p-2.5 rounded-xl hover:bg-neutral-50 font-semibold text-sm text-primary transition-colors"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-accent" />
                <span>Shop</span>
              </div>
              <ChevronRight className="w-4 h-4 text-neutral-400" />
            </Link>

            <Link
              href="/categories"
              onClick={onClose}
              className="flex items-center justify-between p-2.5 rounded-xl hover:bg-neutral-50 font-medium text-sm text-neutral-700 hover:text-primary transition-colors"
            >
              <span>Carry-On</span>
              <ChevronRight className="w-4 h-4 text-neutral-400" />
            </Link>

            <Link
              href="/about"
              onClick={onClose}
              className="flex items-center justify-between p-2.5 rounded-xl hover:bg-neutral-50 font-medium text-sm text-neutral-700 hover:text-primary transition-colors"
            >
              <span>Journal</span>
              <ChevronRight className="w-4 h-4 text-neutral-400" />
            </Link>
          </div>
        </div>

        {/* Categories */}
        <div className="pt-2 border-t border-neutral-100">
          <div className="text-[10px] uppercase font-bold tracking-widest text-neutral-400 mb-2">
            Categories
          </div>
          <div className="space-y-1">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={`/shop?category=${encodeURIComponent(cat.name)}`}
                onClick={onClose}
                className="flex items-center justify-between p-2 rounded-xl hover:bg-neutral-50 text-xs text-neutral-600 hover:text-primary transition-colors"
              >
                <span>{cat.name}</span>
                <span className="text-[11px] text-neutral-400">
                  {cat.itemCount}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Drawer>
  );
};
