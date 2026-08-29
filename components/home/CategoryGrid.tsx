"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CATEGORIES } from "@/data/categories";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export const CategoryGrid: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-4">
          <div>
            <span className="text-xs uppercase font-bold tracking-[0.25em] text-accent">
              Curated Nomenclature
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-primary tracking-tight mt-1">
              Luggage Categories
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-500 max-w-md">
            Architected for every leg of your voyage. From lightweight international overhead spinners to deep-well transatlantic aluminum trunks.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1 (Large - Cabin Luggage) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-7 group relative rounded-3xl overflow-hidden min-h-[380px] sm:min-h-[440px] shadow-luxury"
          >
            <Link href={`/shop?category=${encodeURIComponent(CATEGORIES[0].name)}`} className="block w-full h-full">
              <Image
                src={CATEGORIES[0].image}
                alt={CATEGORIES[0].name}
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

              <div className="absolute inset-0 p-8 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-bold tracking-widest text-accent bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-accent/30">
                    {CATEGORIES[0].badge}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center transform group-hover:rotate-45 group-hover:bg-accent group-hover:text-primary transition-all duration-300">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2">
                    {CATEGORIES[0].name}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 max-w-md line-clamp-2 leading-relaxed">
                    {CATEGORIES[0].description}
                  </p>
                  <span className="inline-block text-xs text-accent font-semibold tracking-wider uppercase mt-4">
                    Explore {CATEGORIES[0].itemCount} Suitcases →
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Card 2 (Checked Luggage) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-5 group relative rounded-3xl overflow-hidden min-h-[380px] sm:min-h-[440px] shadow-luxury"
          >
            <Link href={`/shop?category=${encodeURIComponent(CATEGORIES[1].name)}`} className="block w-full h-full">
              <Image
                src={CATEGORIES[1].image}
                alt={CATEGORIES[1].name}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

              <div className="absolute inset-0 p-8 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-bold tracking-widest text-white bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                    {CATEGORIES[1].badge}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center transform group-hover:rotate-45 group-hover:bg-accent group-hover:text-primary transition-all duration-300">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-display font-bold text-white mb-2">
                    {CATEGORIES[1].name}
                  </h3>
                  <p className="text-xs text-neutral-300 line-clamp-2 leading-relaxed">
                    {CATEGORIES[1].description}
                  </p>
                  <span className="inline-block text-xs text-accent font-semibold tracking-wider uppercase mt-4">
                    Explore {CATEGORIES[1].itemCount} Suitcases →
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Bottom 3 Cards (Aluminum Trunks, Hybrid Spinners, Heritage Cases) */}
          {CATEGORIES.slice(2, 5).map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
              className="md:col-span-4 group relative rounded-3xl overflow-hidden min-h-[300px] shadow-luxury"
            >
              <Link href={`/shop?category=${encodeURIComponent(cat.name)}`} className="block w-full h-full">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-accent bg-black/40 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-accent/30">
                      {cat.badge}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center transform group-hover:rotate-45 group-hover:bg-accent group-hover:text-primary transition-all duration-300">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-display font-bold text-white mb-1">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-neutral-300 line-clamp-2">
                      {cat.description}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
