"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { Maximize2, RotateCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";

interface ProductGalleryProps {
  images: string[];
  productName: string;
  isNew?: boolean;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({
  images,
  productName,
  isNew,
}) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-4">
      {/* Thumbnail column */}
      <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto max-h-[580px] pb-2 lg:pb-0 scrollbar-none">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIdx(idx)}
            className={clsx(
              "relative w-20 h-24 sm:w-24 sm:h-28 rounded-2xl overflow-hidden border-2 shrink-0 transition-all bg-neutral-100",
              activeIdx === idx
                ? "border-accent ring-2 ring-accent/30 shadow-md"
                : "border-neutral-200/80 opacity-70 hover:opacity-100"
            )}
          >
            <Image
              src={img}
              alt={`${productName} thumbnail ${idx + 1}`}
              fill
              className="object-cover object-center"
            />
          </button>
        ))}
      </div>

      {/* Main Image Stage */}
      <div className="flex-1 relative aspect-[4/4.5] sm:aspect-[4/4.8] rounded-3xl overflow-hidden bg-neutral-100 border border-neutral-200/70 shadow-luxury group">
        {/* Badges */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          {isNew && <Badge variant="gold">2026 Edition</Badge>}
          <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-widest text-neutral-800 bg-white/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/40 shadow-sm">
            <RotateCw className="w-3 h-3 text-accent animate-spin-slow" />
            <span>360° Atelier View</span>
          </span>
        </div>

        {/* Zoom trigger */}
        <button
          onClick={() => setIsZoomed(!isZoomed)}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/80 backdrop-blur-md hover:bg-white text-neutral-600 hover:text-primary transition-all shadow-sm"
          aria-label="Toggle zoom"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={clsx(
              "relative w-full h-full cursor-zoom-in transition-transform duration-700",
              isZoomed && "scale-150 cursor-zoom-out"
            )}
            onClick={() => setIsZoomed(!isZoomed)}
          >
            <Image
              src={images[activeIdx] || images[0]}
              alt={productName}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
