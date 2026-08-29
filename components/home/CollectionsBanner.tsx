"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { COLLECTIONS } from "@/data/collections";
import { ArrowRight, Compass } from "lucide-react";
import { motion } from "framer-motion";

export const CollectionsBanner: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-accent flex items-center justify-center gap-1.5 mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span>Curated Journeys</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-primary tracking-tight">
            Travel Collections & Horizons
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 mt-2">
            Every itinerary possesses a distinctive spirit. Select the travel wardrobe built specifically for your destination.
          </p>
        </div>

        {/* 2x2 Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {COLLECTIONS.map((col, idx) => (
            <motion.div
              key={col.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative rounded-3xl overflow-hidden min-h-[420px] sm:min-h-[480px] shadow-luxury flex flex-col justify-end p-8 sm:p-10"
            >
              {/* Background Image */}
              <Image
                src={col.image}
                alt={col.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center transform transition-transform duration-1000 ease-out group-hover:scale-105"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              {/* Content */}
              <div className="relative z-10 space-y-3">
                <span className="text-[11px] uppercase font-bold tracking-widest text-accent bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-accent/30 inline-block">
                  {col.tag}
                </span>

                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white leading-tight">
                  {col.title}
                </h3>

                <p className="text-xs sm:text-sm text-neutral-300 max-w-md leading-relaxed">
                  {col.description}
                </p>

                <div className="pt-2">
                  <Link
                    href={`/shop?collection=${encodeURIComponent(col.tag)}`}
                    className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-white group-hover:text-accent transition-colors"
                  >
                    <span>Explore {col.title}</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
