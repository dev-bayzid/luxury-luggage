"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { SearchModal } from "./SearchModal";
import { CartDrawer } from "./CartDrawer";
import { MobileMenu } from "./MobileMenu";
import { QuickViewModal } from "./QuickViewModal";
import { CurrencySelector } from "@/components/ui/CurrencySelector";
import { Modal } from "@/components/ui/Modal";
import { PRODUCTS } from "@/data/products";
import {
  Menu,
  Search,
  User,
  ShoppingBag,
  Heart,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Package,
  LogOut,
  Mail,
  Luggage,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);

  const { totalItems, openCart } = useCart();
  const { totalWishlist } = useWishlist();

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const isHome = pathname === "/";

  return (
    <>
      <header
        className={clsx(
          "fixed top-0 inset-x-0 z-40 transition-all duration-500",
          isScrolled || !isHome
            ? "bg-primary-dark/95 backdrop-blur-xl border-b border-neutral-800 shadow-glass py-3"
            : "bg-gradient-to-b from-black/85 via-black/45 to-transparent py-4"
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

            {/* Center Section: Navigation Links - LUGGAGE ONLY */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-neutral-200">
              {/* Shop All */}
              <div
                className="relative py-2"
                onMouseEnter={() => setActiveMegaMenu("shop")}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                <Link
                  href="/shop"
                  className={clsx(
                    "hover:text-accent transition-colors",
                    pathname === "/shop" && "text-accent font-semibold"
                  )}
                >
                  Shop
                </Link>
              </div>

              {/* Cabin Luggage */}
              <Link
                href="/shop?category=Cabin%20Luggage"
                className={clsx(
                  "hover:text-accent transition-colors",
                  pathname.includes("Cabin") && "text-accent font-semibold"
                )}
              >
                Carry-On
              </Link>

              {/* Checked Luggage */}
              <Link
                href="/shop?category=Checked%20Luggage"
                className={clsx(
                  "hover:text-accent transition-colors",
                  pathname.includes("Checked") && "text-accent font-semibold"
                )}
              >
                Checked
              </Link>

              {/* Aluminum Trunks */}
              <Link
                href="/shop?category=Aluminum%20Trunks"
                className={clsx(
                  "hover:text-accent transition-colors",
                  pathname.includes("Trunks") && "text-accent font-semibold"
                )}
              >
               Accessories
              </Link>

              {/* Heritage Cases */}
              <Link
                href="/shop?category=Heritage%20Cases"
                className={clsx(
                  "hover:text-accent transition-colors",
                  pathname.includes("Heritage") && "text-accent font-semibold"
                )}
              >
                About
              </Link>

              {/* Blog / Journal */}
              <Link
                href="/about"
                className={clsx(
                  "hover:text-accent transition-colors",
                  pathname === "/about" && "text-accent font-semibold"
                )}
              >
                Journal
              </Link>
            </nav>

            {/* Right Section: Search, User, Cart */}
            <div className="flex items-center gap-1 sm:gap-3">
              {/* Search Trigger */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2.5 text-neutral-300 hover:text-white transition-colors rounded-full hover:bg-white/5"
                aria-label="Search"
              >
                <Search className="w-5 h-5 stroke-[1.8]" />
              </button>

              {/* User / VIP Account Trigger */}
              <button
                onClick={() => setIsAccountModalOpen(true)}
                className="p-2.5 text-neutral-300 hover:text-white transition-colors rounded-full hover:bg-white/5"
                aria-label="VIP Client Account"
              >
                <User className="w-5 h-5 stroke-[1.8]" />
              </button>

              {/* Wishlist Link (Compact) */}
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

              {/* Cart Drawer Trigger */}
              <button
                onClick={openCart}
                className="relative p-2.5 text-neutral-300 hover:text-white transition-colors rounded-full hover:bg-white/5"
                aria-label="Shopping Cart"
              >
                <ShoppingBag className="w-5 h-5 stroke-[1.8]" />
                {totalItems > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-accent text-primary text-[10px] font-bold flex items-center justify-center shadow-sm animate-pulse">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mega Menu Overlay */}
        <AnimatePresence>
          {activeMegaMenu && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              onMouseEnter={() => setActiveMegaMenu(activeMegaMenu)}
              onMouseLeave={() => setActiveMegaMenu(null)}
              className="absolute top-full inset-x-0 bg-primary-dark/95 backdrop-blur-2xl border-b border-neutral-800 shadow-2xl py-8 z-30"
            >
              <div className="max-w-7xl mx-auto px-6 grid grid-cols-4 gap-8">
                {/* Col 1: Cabin Luggage */}
                <div className="space-y-3">
                  <div className="text-xs uppercase font-bold tracking-widest text-accent flex items-center gap-1.5">
                    <Luggage className="w-3.5 h-3.5" />
                    <span>Cabin & Carry-On</span>
                  </div>
                  <ul className="space-y-2 text-sm text-neutral-300">
                    <li>
                      <Link
                        href="/shop?category=Cabin%20Luggage"
                        className="hover:text-white transition-colors block py-1"
                      >
                        Titanium Cabin Plus (42L)
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/shop?category=Cabin%20Luggage"
                        className="hover:text-white transition-colors block py-1"
                      >
                        Executive Pilot Case (34L)
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/shop?category=Hybrid%20Spinners"
                        className="hover:text-white transition-colors block py-1"
                      >
                        Horizon Hybrid Tech Spinner (39L)
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/shop"
                        className="text-accent hover:text-accent-light font-semibold pt-2 block flex items-center gap-1 text-xs uppercase tracking-wider"
                      >
                        <span>View Entire Luggage Vault</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Col 2: Checked & Trunks */}
                <div className="space-y-3">
                  <div className="text-xs uppercase font-bold tracking-widest text-accent">
                    Checked & Trunks
                  </div>
                  <ul className="space-y-2 text-sm text-neutral-300">
                    <li>
                      <Link
                        href="/shop?category=Checked%20Luggage"
                        className="hover:text-white transition-colors block py-1"
                      >
                        Grand Tour Checked (85L)
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/shop?category=Checked%20Luggage"
                        className="hover:text-white transition-colors block py-1"
                      >
                        Vanguard Frame Checked (68L)
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/shop?category=Aluminum%20Trunks"
                        className="hover:text-white transition-colors block py-1"
                      >
                        Transatlantic Trunk (95L)
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/shop?category=Heritage%20Cases"
                        className="hover:text-white transition-colors block py-1"
                      >
                        Heritage Vintage Trunks & Vanity Cases
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Col 3 & 4: Spotlight Product */}
                <div className="col-span-2 bg-white/5 rounded-2xl p-4 border border-white/10 flex gap-4 items-center">
                  <div className="relative w-36 h-36 rounded-xl overflow-hidden bg-neutral-900 shrink-0">
                    <Image
                      src={PRODUCTS[0].images[0]}
                      alt={PRODUCTS[0].name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-accent bg-accent/20 px-2 py-0.5 rounded-full">
                      Flagship Aluminum Luggage
                    </span>
                    <h4 className="text-base font-bold text-white mt-1.5">{PRODUCTS[0].name}</h4>
                    <p className="text-xs text-neutral-400 line-clamp-2 mt-1">
                      {PRODUCTS[0].tagline}
                    </p>
                    <Link
                      href={`/product/${PRODUCTS[0].slug}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:text-white mt-3 transition-colors"
                    >
                      <span>Discover the Titanium Series</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* VIP Client Account Modal */}
      <Modal
        isOpen={isAccountModalOpen}
        onClose={() => setIsAccountModalOpen(false)}
        title="VIP Client Concierge Portal"
        subtitle="luxury-luggage Maison Member"
        maxWidth="md"
      >
        <div className="space-y-6">
          {/* User Profile Overview */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center text-primary font-bold text-xl shadow-md shrink-0">
              AL
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h4 className="text-sm font-bold text-primary truncate">Lord Alexander</h4>
                <span className="text-[10px] uppercase font-bold tracking-wider bg-accent/20 text-accent-dark px-2 py-0.5 rounded-full">
                  First Class
                </span>
              </div>
              <p className="text-xs text-neutral-500 truncate mt-0.5">alexander@concierge.luxury-luggage.com</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <Link
              href="/cart"
              onClick={() => setIsAccountModalOpen(false)}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-neutral-50 text-xs font-semibold text-primary transition-colors border border-neutral-100"
            >
              <div className="flex items-center gap-3">
                <Package className="w-4 h-4 text-accent" />
                <span>Track Active Commission & Shipments</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
            </Link>

            <Link
              href="/wishlist"
              onClick={() => setIsAccountModalOpen(false)}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-neutral-50 text-xs font-semibold text-primary transition-colors border border-neutral-100"
            >
              <div className="flex items-center gap-3">
                <Heart className="w-4 h-4 text-accent" />
                <span>Private Collection Vault ({totalWishlist} pieces)</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
            </Link>

            <Link
              href="/faq#warranty"
              onClick={() => setIsAccountModalOpen(false)}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-neutral-50 text-xs font-semibold text-primary transition-colors border border-neutral-100"
            >
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-accent" />
                <span>Registered Lifetime Warranties (2 Active)</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
            </Link>

            <Link
              href="/contact"
              onClick={() => setIsAccountModalOpen(false)}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-neutral-50 text-xs font-semibold text-primary transition-colors border border-neutral-100"
            >
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-accent" />
                <span>Direct Concierge Desk Access</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
            </Link>
          </div>

          <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
            <span>Maison Member Since 2024</span>
            <button
              onClick={() => setIsAccountModalOpen(false)}
              className="text-neutral-400 hover:text-red-500 flex items-center gap-1 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </Modal>

      {/* Global Modals & Drawers */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <CartDrawer />
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      <QuickViewModal />
    </>
  );
};
