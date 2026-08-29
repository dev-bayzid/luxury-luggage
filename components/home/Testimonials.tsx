"use client";

import React from "react";
import Image from "next/image";
import { REVIEWS } from "@/data/reviews";
import { Rating } from "@/components/ui/Rating";
import { CheckCircle2, Quote, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export const Testimonials: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-neutral-50 border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-accent flex items-center justify-center gap-1.5 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Verified Society of Travelers</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-primary tracking-tight">
            Loved Across 140+ Countries
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 mt-2">
            Over 12,000 discerning international travelers have made Aurelia their lifelong voyage companion.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white rounded-3xl p-6 border border-neutral-200/80 shadow-luxury flex flex-col justify-between hover:shadow-luxury-hover transition-all duration-300 relative"
            >
              <div>
                <Quote className="w-8 h-8 text-accent/20 mb-3" />
                <Rating rating={review.rating} size="sm" showText={false} className="mb-3" />

                <h4 className="text-sm font-bold text-primary mb-2 line-clamp-1">
                  &ldquo;{review.title}&rdquo;
                </h4>

                <p className="text-xs text-neutral-600 leading-relaxed italic">
                  &ldquo;{review.content}&rdquo;
                </p>
              </div>

              {/* Author Footer */}
              <div className="pt-5 mt-6 border-t border-neutral-100 flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-neutral-200">
                  <Image
                    src={review.avatar}
                    alt={review.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-primary truncate">
                      {review.author}
                    </span>
                    <CheckCircle2 className="w-3 h-3 text-accent shrink-0" />
                  </div>
                  <div className="text-[11px] text-neutral-400 truncate">
                    {review.location}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
