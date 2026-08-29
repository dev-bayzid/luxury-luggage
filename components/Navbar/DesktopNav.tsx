"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  Plane,
  Luggage,
  Sparkles,
  Layers,
  Briefcase,
  ArrowRight,
  ShieldCheck,
  Award,
  Compass,
  Tag,
  CheckCircle2,
  Lock,
  RotateCw,
} from "lucide-react";

type DropdownKey = "shop" | "carry-on" | "checked" | null;

export default function DesktopNav() {
  const pathname = usePathname();
  const [activeDropdown, setActiveDropdown] = useState<DropdownKey>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (key: "shop" | "carry-on" | "checked") => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(key);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  };

  const closeDropdown = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(null);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeDropdown();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    closeDropdown();
  }, [pathname]);

  return (
    <div className="hidden md:block" onMouseLeave={handleMouseLeave}>
      {/* Navigation Links Bar */}
      <nav className="flex items-center gap-1 lg:gap-2 text-sm font-medium text-neutral-300">
        {/* ========================================================================= */}
        {/* 1. SHOP TRIGGER */}
        {/* ========================================================================= */}
        <div
          className="relative py-2"
          onMouseEnter={() => handleMouseEnter("shop")}
        >
          <Link
            href="/shop"
            onClick={closeDropdown}
            className={clsx(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-200",
              activeDropdown === "shop" || pathname === "/shop"
                ? "text-accent font-semibold bg-white/5 shadow-sm"
                : "hover:text-white hover:bg-white/[0.03]"
            )}
          >
            <span>Shop</span>
            <ChevronDown
              className={clsx(
                "w-3.5 h-3.5 transition-transform duration-200",
                activeDropdown === "shop" ? "rotate-180 text-accent" : "text-neutral-400"
              )}
            />
          </Link>
        </div>

        {/* ========================================================================= */}
        {/* 2. CARRY-ON TRIGGER */}
        {/* ========================================================================= */}
        <div
          className="relative py-2"
          onMouseEnter={() => handleMouseEnter("carry-on")}
        >
          <Link
            href="/shop?category=Cabin%20Luggage"
            onClick={closeDropdown}
            className={clsx(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-200",
              activeDropdown === "carry-on" || pathname.includes("Cabin")
                ? "text-accent font-semibold bg-white/5 shadow-sm"
                : "hover:text-white hover:bg-white/[0.03]"
            )}
          >
            <span>Carry-On</span>
            <ChevronDown
              className={clsx(
                "w-3.5 h-3.5 transition-transform duration-200",
                activeDropdown === "carry-on" ? "rotate-180 text-accent" : "text-neutral-400"
              )}
            />
          </Link>
        </div>

        {/* ========================================================================= */}
        {/* 3. CHECKED TRIGGER */}
        {/* ========================================================================= */}
        <div
          className="relative py-2"
          onMouseEnter={() => handleMouseEnter("checked")}
        >
          <Link
            href="/shop?category=Checked%20Luggage"
            onClick={closeDropdown}
            className={clsx(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-200",
              activeDropdown === "checked" || pathname.includes("Checked")
                ? "text-accent font-semibold bg-white/5 shadow-sm"
                : "hover:text-white hover:bg-white/[0.03]"
            )}
          >
            <span>Checked</span>
            <ChevronDown
              className={clsx(
                "w-3.5 h-3.5 transition-transform duration-200",
                activeDropdown === "checked" ? "rotate-180 text-accent" : "text-neutral-400"
              )}
            />
          </Link>
        </div>

        {/* ========================================================================= */}
        {/* 4. CATEGORIES LINK */}
        {/* ========================================================================= */}
        <Link
          href="/categories"
          className={clsx(
            "px-3 py-1.5 rounded-lg transition-all duration-200",
            pathname === "/categories"
              ? "text-accent font-semibold bg-white/5"
              : "hover:text-white hover:bg-white/[0.03]"
          )}
        >
          Categories
        </Link>

        {/* ========================================================================= */}
        {/* 5. ABOUT LINK */}
        {/* ========================================================================= */}
        <Link
          href="/about"
          className={clsx(
            "px-3 py-1.5 rounded-lg transition-all duration-200",
            pathname === "/about"
              ? "text-accent font-semibold bg-white/5"
              : "hover:text-white hover:bg-white/[0.03]"
          )}
        >
          About
        </Link>

        {/* ========================================================================= */}
        {/* 6. CARE & SIZING LINK */}
        {/* ========================================================================= */}
        <Link
          href="/faq"
          className={clsx(
            "px-3 py-1.5 rounded-lg transition-all duration-200",
            pathname === "/faq"
              ? "text-accent font-semibold bg-white/5"
              : "hover:text-white hover:bg-white/[0.03]"
          )}
        >
          Care & Sizing
        </Link>
      </nav>

      {/* ========================================================================= */}
      {/* CENTERED MEGAMENU DROPDOWN CONTAINER */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {activeDropdown && (
          <div
            className="fixed left-1/2 -translate-x-1/2 top-[56px] lg:top-[60px] z-50 pt-2 pointer-events-auto"
            onMouseEnter={() => {
              if (timeoutRef.current) clearTimeout(timeoutRef.current);
            }}
            onMouseLeave={handleMouseLeave}
          >
            {/* ========================================================================= */}
            {/* 1. SHOP CENTERED MEGAMENU (With User's Specified Category Structure) */}
            {/* ========================================================================= */}
            {activeDropdown === "shop" && (
              <motion.div
                key="megamenu-shop"
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="w-[900px] lg:w-[980px] max-w-[calc(100vw-2rem)]"
              >
                <div className="bg-neutral-900/95 backdrop-blur-2xl border border-neutral-800/90 rounded-2xl p-6 shadow-2xl shadow-black/90 ring-1 ring-white/10 overflow-hidden relative">
                  {/* Gold Accent Top Bar */}
                  <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-accent/0 via-accent to-accent/0" />

                  <div className="grid grid-cols-12 gap-6">
                    {/* Col 1: Categories Part 1 (4 cols) */}
                    <div className="col-span-4 space-y-2.5">
                      <div className="text-[11px] uppercase font-bold tracking-widest text-accent/90 pb-1 border-b border-neutral-800">
                        Collection
                      </div>

                      <div className="space-y-1">
                        {/* 1. All Luggage */}
                        <Link
                          href="/shop"
                          onClick={closeDropdown}
                          className="group flex items-start gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors"
                        >
                          <div className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary transition-colors shrink-0 mt-0.5">
                            <Luggage className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-white group-hover:text-accent transition-colors">
                              All Luggage
                            </div>
                            <div className="text-xs text-neutral-400 leading-tight mt-0.5">
                              Explore all handcrafted travel pieces
                            </div>
                          </div>
                        </Link>

                        {/* 2. Carry-On */}
                        <Link
                          href="/shop?category=Cabin%20Luggage"
                          onClick={closeDropdown}
                          className="group flex items-start gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors"
                        >
                          <div className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center text-neutral-300 group-hover:bg-accent group-hover:text-primary transition-colors shrink-0 mt-0.5">
                            <Plane className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-white group-hover:text-accent transition-colors flex items-center gap-1.5">
                              Carry-On
                              <span className="text-[10px] bg-accent/20 text-accent px-1.5 py-0.2 rounded font-mono">
                                36-42L
                              </span>
                            </div>
                            <div className="text-xs text-neutral-400 leading-tight mt-0.5">
                              Overhead approved cabin spinners
                            </div>
                          </div>
                        </Link>

                        {/* 3. Checked */}
                        <Link
                          href="/shop?category=Checked%20Luggage"
                          onClick={closeDropdown}
                          className="group flex items-start gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors"
                        >
                          <div className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center text-neutral-300 group-hover:bg-accent group-hover:text-primary transition-colors shrink-0 mt-0.5">
                            <Layers className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-white group-hover:text-accent transition-colors flex items-center gap-1.5">
                              Checked
                              <span className="text-[10px] bg-white/10 text-neutral-300 px-1.5 py-0.2 rounded font-mono">
                                68-85L
                              </span>
                            </div>
                            <div className="text-xs text-neutral-400 leading-tight mt-0.5">
                              High-capacity long voyage check-in
                            </div>
                          </div>
                        </Link>

                        {/* 4. Sets */}
                        <Link
                          href="/categories#cat-cabin"
                          onClick={closeDropdown}
                          className="group flex items-start gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors"
                        >
                          <div className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center text-neutral-300 group-hover:bg-accent group-hover:text-primary transition-colors shrink-0 mt-0.5">
                            <Sparkles className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-white group-hover:text-accent transition-colors">
                              Sets
                            </div>
                            <div className="text-xs text-neutral-400 leading-tight mt-0.5">
                              Coordinated cabin & checked pairs
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>

                    {/* Col 2: Categories Part 2 & Discovery (4 cols) */}
                    <div className="col-span-4 space-y-2.5">
                      <div className="text-[11px] uppercase font-bold tracking-widest text-accent/90 pb-1 border-b border-neutral-800">
                        explore
                      </div>

                      <div className="space-y-1">
                        {/* 5. Accessories */}
                        <Link
                          href="/categories#accessories"
                          onClick={closeDropdown}
                          className="group flex items-start gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors"
                        >
                          <div className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center text-neutral-300 group-hover:bg-accent group-hover:text-primary transition-colors shrink-0 mt-0.5">
                            <Briefcase className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-white group-hover:text-accent transition-colors">
                              Accessories
                            </div>
                            <div className="text-xs text-neutral-400 leading-tight mt-0.5">
                              Packing modules & travel essentials
                            </div>
                          </div>
                        </Link>

                        {/* 6. New Arrivals */}
                        <Link
                          href="/shop?sort=newest"
                          onClick={closeDropdown}
                          className="group flex items-start gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors"
                        >
                          <div className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center text-neutral-300 group-hover:bg-accent group-hover:text-primary transition-colors shrink-0 mt-0.5">
                            <Tag className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-white group-hover:text-accent transition-colors">
                              New Arrivals
                            </div>
                            <div className="text-xs text-neutral-400 leading-tight mt-0.5">
                              Latest limited atelier releases
                            </div>
                          </div>
                        </Link>

                        {/* 7. Best Sellers */}
                        <Link
                          href="/shop?sort=bestselling"
                          onClick={closeDropdown}
                          className="group flex items-start gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors"
                        >
                          <div className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center text-neutral-300 group-hover:bg-accent group-hover:text-primary transition-colors shrink-0 mt-0.5">
                            <Award className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-white group-hover:text-accent transition-colors">
                              Best Sellers
                            </div>
                            <div className="text-xs text-neutral-400 leading-tight mt-0.5">
                              Top-rated titanium & polycarbonate
                            </div>
                          </div>
                        </Link>

                        {/* Direct Airline Sizing & Warranty Link */}
                        <Link
                          href="/faq"
                          onClick={closeDropdown}
                          className="group flex items-center justify-between p-2 rounded-xl hover:bg-white/5 transition-colors pt-2 border-t border-neutral-850"
                        >
                          <div className="flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-accent" />
                            <span className="text-xs font-medium text-neutral-300 group-hover:text-accent transition-colors">
                              Airline Sizing & Care
                            </span>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-accent group-hover:translate-x-0.5 transition-all" />
                        </Link>
                      </div>
                    </div>

                    {/* Col 3: Spotlight Card (4 cols) */}
                    <div className="col-span-4">
                      <Link
                        href="/product/aurelia-titanium-cabin-plus"
                        onClick={closeDropdown}
                        className="group block relative h-full min-h-[260px] rounded-xl overflow-hidden border border-neutral-800 hover:border-accent/50 transition-colors shadow-lg"
                      >
                        <Image
                          src="https://images.unsplash.com/photo-1581553680321-4fffae59fccd?q=80&w=1200&auto=format&fit=crop"
                          alt="The Titanium Cabin Plus"
                          fill
                          sizes="(max-width: 1024px) 300px, 350px"
                          className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

                        <div className="absolute inset-0 p-4 flex flex-col justify-between">
                          <div className="flex justify-between items-start">
                            <span className="text-[10px] uppercase font-bold tracking-wider text-accent bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-accent/40">
                              Atelier Flagship
                            </span>
                            <span className="text-xs font-semibold text-white bg-white/10 backdrop-blur-md px-2 py-0.5 rounded">
                              $680
                            </span>
                          </div>

                          <div>
                            <h4 className="font-display font-bold text-base text-white group-hover:text-accent transition-colors">
                              The Titanium Cabin Plus
                            </h4>
                            <p className="text-xs text-neutral-300 line-clamp-2 mt-1 mb-2">
                              Anodized aluminum alloy with whisper-quiet Japanese wheels.
                            </p>
                            <div className="flex items-center gap-1 text-xs font-semibold text-accent group-hover:translate-x-1 transition-transform">
                              <span>Explore Piece</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>

                  {/* Dropdown Bottom Banner */}
                  <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                        Complimentary Global Express Shipping
                      </span>
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                        Unconditional Lifetime Guarantee
                      </span>
                    </div>
                    <Link
                      href="/shop"
                      onClick={closeDropdown}
                      className="text-accent hover:underline font-medium text-[11px]"
                    >
                      Explore Complete Vault (8) →
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ========================================================================= */}
            {/* 2. CARRY-ON CENTERED MEGAMENU */}
            {/* ========================================================================= */}
            {activeDropdown === "carry-on" && (
              <motion.div
                key="megamenu-carry-on"
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="w-[880px] lg:w-[940px] max-w-[calc(100vw-2rem)]"
              >
                <div className="bg-neutral-900/95 backdrop-blur-2xl border border-neutral-800/90 rounded-2xl p-6 shadow-2xl shadow-black/90 ring-1 ring-white/10 overflow-hidden relative">
                  {/* Gold Accent Top Bar */}
                  <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-accent/0 via-accent to-accent/0" />

                  <div className="grid grid-cols-12 gap-6">
                    {/* Col 1: Cabin Models (7 cols) */}
                    <div className="col-span-7 space-y-3">
                      <div className="flex items-center justify-between pb-1 border-b border-neutral-800">
                        <span className="text-[11px] uppercase font-bold tracking-widest text-accent/90">
                          Cabin Models & Sizing (34L–42L)
                        </span>
                        <span className="text-[11px] text-neutral-400">
                          Overhead Approved
                        </span>
                      </div>

                      <div className="space-y-1.5">
                        <Link
                          href="/product/aurelia-titanium-cabin-plus"
                          onClick={closeDropdown}
                          className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 border border-transparent hover:border-neutral-800 transition-all"
                        >
                          <div className="w-9 h-9 rounded-lg bg-neutral-800 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary transition-colors shrink-0 mt-0.5">
                            <Plane className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-semibold text-white group-hover:text-accent transition-colors">
                                The Titanium Cabin Plus
                              </span>
                              <span className="text-xs font-semibold text-accent">$680</span>
                            </div>
                            <p className="text-xs text-neutral-400 leading-tight mt-0.5">
                              42L capacity, anodized aluminum alloy, dual TSA latches
                            </p>
                          </div>
                        </Link>

                        <Link
                          href="/product/aurelia-executive-pilot-case-34l"
                          onClick={closeDropdown}
                          className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 border border-transparent hover:border-neutral-800 transition-all"
                        >
                          <div className="w-9 h-9 rounded-lg bg-neutral-800 flex items-center justify-center text-neutral-300 group-hover:bg-accent group-hover:text-primary transition-colors shrink-0 mt-0.5">
                            <Briefcase className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-semibold text-white group-hover:text-accent transition-colors">
                                The Executive Pilot Case
                              </span>
                              <span className="text-xs font-semibold text-accent">$610</span>
                            </div>
                            <p className="text-xs text-neutral-400 leading-tight mt-0.5">
                              34L compact business roller with top rapid-access organizer
                            </p>
                          </div>
                        </Link>

                        <Link
                          href="/product/aurelia-horizon-hybrid-cabin-spinner"
                          onClick={closeDropdown}
                          className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 border border-transparent hover:border-neutral-800 transition-all"
                        >
                          <div className="w-9 h-9 rounded-lg bg-neutral-800 flex items-center justify-center text-neutral-300 group-hover:bg-accent group-hover:text-primary transition-colors shrink-0 mt-0.5">
                            <Sparkles className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-semibold text-white group-hover:text-accent transition-colors">
                                The Horizon Hybrid Spinner
                              </span>
                              <span className="text-xs font-semibold text-accent">$520</span>
                            </div>
                            <p className="text-xs text-neutral-400 leading-tight mt-0.5">
                              38L hard-shell with front padded 16&quot; laptop compartment
                            </p>
                          </div>
                        </Link>
                      </div>

                      {/* Tech specs row */}
                      <div className="grid grid-cols-3 gap-2 pt-1">
                        <div className="p-2 rounded-lg bg-neutral-800/50 border border-neutral-800 text-center">
                          <div className="text-[10px] text-neutral-400 uppercase font-medium">Standard Fit</div>
                          <div className="text-xs font-bold text-white mt-0.5">55 × 35 × 20 cm</div>
                        </div>
                        <div className="p-2 rounded-lg bg-neutral-800/50 border border-neutral-800 text-center">
                          <div className="text-[10px] text-neutral-400 uppercase font-medium">Overhead Bins</div>
                          <div className="text-xs font-bold text-accent mt-0.5">100% Fit Rate</div>
                        </div>
                        <div className="p-2 rounded-lg bg-neutral-800/50 border border-neutral-800 text-center">
                          <div className="text-[10px] text-neutral-400 uppercase font-medium">Wheels</div>
                          <div className="text-xs font-bold text-white mt-0.5">Hinomoto 360°</div>
                        </div>
                      </div>
                    </div>

                    {/* Col 2: Feature / Spotlight (5 cols) */}
                    <div className="col-span-5">
                      <div className="relative h-full min-h-[250px] rounded-xl overflow-hidden border border-neutral-800 flex flex-col justify-between p-4">
                        <Image
                          src="https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1200&auto=format&fit=crop"
                          alt="Carry-On Engineering"
                          fill
                          sizes="(max-width: 1024px) 300px, 350px"
                          className="object-cover object-center"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/30" />

                        <div className="relative z-10">
                          <span className="text-[10px] uppercase font-bold tracking-wider text-accent bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-accent/40 inline-block">
                            Sky Priority
                          </span>
                        </div>

                        <div className="relative z-10 space-y-2">
                          <h4 className="font-display font-bold text-lg text-white">
                            Engineered for Overhead Flight
                          </h4>
                          <p className="text-xs text-neutral-300 leading-relaxed">
                            Sized strictly for Delta, United, American, Lufthansa, Emirates, and British Airways overhead bins.
                          </p>
                          <Link
                            href="/shop?category=Cabin%20Luggage"
                            onClick={closeDropdown}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-primary bg-accent hover:bg-accent-light px-3.5 py-1.5 rounded-lg transition-colors shadow-gold-glow"
                          >
                            Shop All Carry-On
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Dropdown Bottom Banner */}
                  <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                        Universal Airline Compatibility
                      </span>
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                        Dual Keyless TSA Security Latches
                      </span>
                    </div>
                    <Link
                      href="/shop?category=Cabin%20Luggage"
                      onClick={closeDropdown}
                      className="text-accent hover:underline font-medium text-[11px]"
                    >
                      View All Carry-On Models →
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ========================================================================= */}
            {/* 3. CHECKED CENTERED MEGAMENU */}
            {/* ========================================================================= */}
            {activeDropdown === "checked" && (
              <motion.div
                key="megamenu-checked"
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="w-[880px] lg:w-[940px] max-w-[calc(100vw-2rem)]"
              >
                <div className="bg-neutral-900/95 backdrop-blur-2xl border border-neutral-800/90 rounded-2xl p-6 shadow-2xl shadow-black/90 ring-1 ring-white/10 overflow-hidden relative">
                  {/* Gold Accent Top Bar */}
                  <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-accent/0 via-accent to-accent/0" />

                  <div className="grid grid-cols-12 gap-6">
                    {/* Col 1: Checked Models (7 cols) */}
                    <div className="col-span-7 space-y-3">
                      <div className="flex items-center justify-between pb-1 border-b border-neutral-800">
                        <span className="text-[11px] uppercase font-bold tracking-widest text-accent/90">
                          Checked Travel Suites (68L–95L)
                        </span>
                        <span className="text-[11px] text-neutral-400">
                          Expansive Volume
                        </span>
                      </div>

                      <div className="space-y-1.5">
                        <Link
                          href="/product/aurelia-grand-tour-checked-large"
                          onClick={closeDropdown}
                          className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 border border-transparent hover:border-neutral-800 transition-all"
                        >
                          <div className="w-9 h-9 rounded-lg bg-neutral-800 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary transition-colors shrink-0 mt-0.5">
                            <Luggage className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-semibold text-white group-hover:text-accent transition-colors">
                                The Grand Tour Checked 85L
                              </span>
                              <span className="text-xs font-semibold text-accent">$540</span>
                            </div>
                            <p className="text-xs text-neutral-400 leading-tight mt-0.5">
                              German Makrolon® polycarbonate with expansive dual-sided capacity
                            </p>
                          </div>
                        </Link>

                        <Link
                          href="/product/aurelia-vanguard-checked-medium-68l"
                          onClick={closeDropdown}
                          className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 border border-transparent hover:border-neutral-800 transition-all"
                        >
                          <div className="w-9 h-9 rounded-lg bg-neutral-800 flex items-center justify-center text-neutral-300 group-hover:bg-accent group-hover:text-primary transition-colors shrink-0 mt-0.5">
                            <Sparkles className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-semibold text-white group-hover:text-accent transition-colors">
                                The Vanguard Checked Medium 68L
                              </span>
                              <span className="text-xs font-semibold text-accent">$490</span>
                            </div>
                            <p className="text-xs text-neutral-400 leading-tight mt-0.5">
                              7–10 day transatlantic voyager with reinforced corner bumpers
                            </p>
                          </div>
                        </Link>

                        <Link
                          href="/product/aurelia-transatlantic-trunk-large-95l"
                          onClick={closeDropdown}
                          className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 border border-transparent hover:border-neutral-800 transition-all"
                        >
                          <div className="w-9 h-9 rounded-lg bg-neutral-800 flex items-center justify-center text-neutral-300 group-hover:bg-accent group-hover:text-primary transition-colors shrink-0 mt-0.5">
                            <Layers className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-semibold text-white group-hover:text-accent transition-colors">
                                The Transatlantic Trunk 95L
                              </span>
                              <span className="text-xs font-semibold text-accent">$890</span>
                            </div>
                            <p className="text-xs text-neutral-400 leading-tight mt-0.5">
                              Deep-well 80/20 proportion heavy-gauge aluminum trunk
                            </p>
                          </div>
                        </Link>
                      </div>

                      {/* Long haul perks */}
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-neutral-800/40 border border-neutral-800 text-xs text-neutral-300">
                        <span className="flex items-center gap-1.5">
                          <Lock className="w-3.5 h-3.5 text-accent" />
                          Dual TSA 008 Master Locks
                        </span>
                        <span className="flex items-center gap-1.5">
                          <RotateCw className="w-3.5 h-3.5 text-accent" />
                          250kg Structural Load Tested
                        </span>
                      </div>
                    </div>

                    {/* Col 2: Feature Spotlight (5 cols) */}
                    <div className="col-span-5">
                      <div className="relative h-full min-h-[250px] rounded-xl overflow-hidden border border-neutral-800 flex flex-col justify-between p-4">
                        <Image
                          src="https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?q=80&w=1200&auto=format&fit=crop"
                          alt="The Grand Tour Checked"
                          fill
                          sizes="(max-width: 1024px) 300px, 350px"
                          className="object-cover object-center"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/30" />

                        <div className="relative z-10">
                          <span className="text-[10px] uppercase font-bold tracking-wider text-accent bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-accent/40 inline-block">
                            Grand Tour Edition
                          </span>
                        </div>

                        <div className="relative z-10 space-y-2">
                          <h4 className="font-display font-bold text-lg text-white">
                            Uncompromising Capacity
                          </h4>
                          <p className="text-xs text-neutral-300 leading-relaxed">
                            Dual interior compression panels, waterproof laundry compartments, and indestructible shell protection.
                          </p>
                          <Link
                            href="/shop?category=Checked%20Luggage"
                            onClick={closeDropdown}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-primary bg-accent hover:bg-accent-light px-3.5 py-1.5 rounded-lg transition-colors shadow-gold-glow"
                          >
                            Shop All Checked
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Dropdown Bottom Banner */}
                  <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                        Withstands 250kg External Pressure
                      </span>
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                        Modular Compression Panels
                      </span>
                    </div>
                    <Link
                      href="/shop?category=Checked%20Luggage"
                      onClick={closeDropdown}
                      className="text-accent hover:underline font-medium text-[11px]"
                    >
                      View All Checked Models →
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
