"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight, Sparkles, ShieldCheck, Plane, Award } from "lucide-react";
import { motion } from "framer-motion";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[95vh] sm:min-h-screen bg-primary-dark overflow-hidden flex items-center justify-center pt-24 pb-16 sm:py-32">
      {/* Background Subtle Gradient & Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[500px] bg-gradient-to-tr from-accent/15 via-accent/5 to-transparent blur-3xl rounded-full opacity-60" />
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-primary-dark to-transparent" />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & CTAs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2">
              <Badge variant="gold" className="px-3 py-1">
                <Sparkles className="w-3 h-3 mr-1 inline-block" />
                The New 2026 Collection
              </Badge>
            </div>

            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold font-display text-white tracking-tight leading-[1.08]">
              The Art of <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-accent">
                Timeless Voyage.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-neutral-300 max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
              Crafted from anodized aluminum and premium leather. Designed for
              years of travel.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link href="/shop" className="w-full sm:w-auto">
                <Button
                  variant="gold"
                  size="lg"
                  className="w-full sm:w-auto text-xs tracking-widest uppercase font-bold px-8 py-4"
                >
                  <span>Explore The Collection</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link
                href="/product/aurelia-titanium-cabin-plus"
                className="w-full sm:w-auto"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto text-xs tracking-widest uppercase text-white border-white/30 hover:border-white hover:bg-white/10 px-8 py-4"
                >
                  <span>Discover Titanium Plus</span>
                </Button>
              </Link>
            </div>

            {/* Metrics & Accreditations */}
            <div className="pt-8 border-t border-neutral-800/90 grid grid-cols-3 gap-4 text-left max-w-lg mx-auto lg:mx-0">
              <div>
                <div className="text-xl sm:text-2xl font-bold text-white flex items-center gap-1"></div>
                <div className="text-[11px] text-neutral-400 font-medium">
                  Aircraft-grade Aluminum
                </div>
              </div>

              <div>
                <div className="text-xl sm:text-2xl font-bold text-white flex items-center gap-1"></div>
                <div className="text-[11px] text-neutral-400 font-medium">
                  Whisper-Quiet Wheels
                </div>
              </div>

              <div>
                <div className="text-xl sm:text-2xl font-bold text-white flex items-center gap-1"></div>
                <div className="text-[11px] text-neutral-400 font-medium">
                  10-Year Warranty
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Floating Luxury Luggage Hero Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="lg:col-span-5 relative flex items-center justify-center"
          >
            {/* Animated Floating Glow Card */}
            <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl p-1 bg-gradient-to-b from-white/20 via-accent/20 to-white/5 backdrop-blur-2xl shadow-2xl animate-float">
              <div className="relative w-full h-full rounded-[22px] overflow-hidden bg-neutral-900/90 flex items-center justify-center p-4">
                <Image
                  src="https://images.unsplash.com/photo-1581553680321-4fffae59fccd?q=80&w=1200&auto=format&fit=crop"
                  alt="Aurelia Titanium Cabin Plus"
                  fill
                  priority
                  className="object-cover object-center scale-105 transition-transform duration-1000 hover:scale-110"
                />

                {/* Floating Feature Pins */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="absolute top-6 right-6 bg-primary-dark/85 backdrop-blur-md border border-accent/40 rounded-2xl p-3 shadow-xl text-left max-w-[170px]"
                >
                  <div className="flex items-center gap-1.5 text-accent text-xs font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Dual TSA Latches</span>
                  </div>
                  <div className="text-[10px] text-neutral-300 mt-0.5">
                    Integrated keyless security without zipper breach.
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  className="absolute bottom-6 left-6 bg-primary-dark/85 backdrop-blur-md border border-white/20 rounded-2xl p-3 shadow-xl text-left max-w-[170px]"
                >
                  <div className="flex items-center gap-1.5 text-white text-xs font-semibold">
                    <Plane className="w-3.5 h-3.5 text-accent" />
                    <span>IATA Cabin Compliant</span>
                  </div>
                  <div className="text-[10px] text-neutral-300 mt-0.5">
                    Fits overhead bins on all major international flights.
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
