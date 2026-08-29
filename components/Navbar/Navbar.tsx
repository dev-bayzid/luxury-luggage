"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MobileMenu } from "../layout/MobileMenu";
import { Menu } from "lucide-react";

import { clsx } from "clsx";
import DesktopNav from "./DesktopNav";
import SearchButton from "./SearchButton";
import WishlistButton from "./WishlistButton";
import CartButton from "./CartButton";
import { CartDrawer } from "../layout/CartDrawer";
import { QuickViewModal } from "../layout/QuickViewModal";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = pathname === "/";

  return (
    <>
      <header
        className={clsx(
          "fixed top-0 inset-x-0 z-40 transition-all duration-500",
          isScrolled || !isHome
            ? "bg-primary-dark/95 backdrop-blur-xl border-b border-neutral-800 shadow-glass py-3"
            : "bg-gradient-to-b from-black/85 via-black/45 to-transparent py-4",
        )}
      >
        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-12">
            {/* Left Section: Hamburger Menu + Logo (Emblem + "luxury-luggage") */}
            <div className="flex items-center gap-4 sm:gap-5">
              {/* Hamburger Button (Desktop & Mobile) */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 -ml-2 text-white hover:text-accent transition-colors rounded-lg hover:bg-white/5"
                aria-label="Open navigation drawer"
              >
                <Menu className="w-6 h-6 stroke-[1.8]" />
              </button>

              {/* Brand Logo: Geometric luxury emblem + "luxury-luggage" text */}
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent via-accent-light to-accent-dark flex items-center justify-center shadow-gold-glow shrink-0 group-hover:scale-105 transition-transform">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5 text-primary"
                  >
                    <rect x="3" y="6" width="18" height="15" rx="3" />
                    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    <line x1="8" y1="11" x2="8" y2="16" />
                    <line x1="16" y1="11" x2="16" y2="16" />
                  </svg>
                </div>

                <span className="font-display font-bold text-lg sm:text-xl tracking-tight text-white group-hover:text-accent transition-colors lowercase">
                  luxury-luggage
                </span>
              </Link>
            </div>

            <DesktopNav />

            {/* Right Section: Search, User, Cart */}
            <div className="flex items-center gap-1 sm:gap-3">
              {/* Search Trigger */}
              <SearchButton />

              {/* Wishlist Link (Compact) */}
              <WishlistButton />

              {/* Cart Drawer Trigger */}
              <CartButton />
            </div>
          </div>
        </div>
      </header>

      {/* Global Modals & Drawers */}

      <CartDrawer />
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
      <QuickViewModal />
    </>
  );
};
