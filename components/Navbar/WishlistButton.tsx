"use client";

import { useWishlist } from "@/context/WishlistContext";
import { Heart } from "lucide-react";
import Link from "next/link";

export default function WishlistButton() {
  const { totalWishlist } = useWishlist();

  return (
    <Link
      href="/wishlist"
      className="hidden sm:inline-flex relative p-2.5 text-neutral-300 hover:text-white transition-colors rounded-full hover:bg-white/5"
      aria-label="Wishlist"
    >
      <Heart className="w-5 h-5 stroke-[1.8]" />
      {totalWishlist > 0 && (
        <span className="absolute top-1.5 right-1.5 w-3.5 h-3.5 rounded-full bg-accent text-primary text-[9px] font-bold flex items-center justify-center shadow-sm">
          {totalWishlist}
        </span>
      )}
    </Link>
  );
}
