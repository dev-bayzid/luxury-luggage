"use client";

import React from "react";
import { Disc, Layers, Sparkles, Lock, ShieldCheck, Cpu } from "lucide-react";
import { motion } from "framer-motion";

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      icon: Disc,
      title: "Hinomoto Lisof® Silent Spinners",
      subtitle: "Japanese Precision Ball-Bearings",
      description: "Patented polyurethane wheels glide over marble, cobblestone, and tarmac at an inaudible 0.0dB with effortless 360-degree rotation.",
    },
    {
      icon: Layers,
      title: "German Aerospace Aluminum",
      subtitle: "Alloy-Magnesium 1.2mm Shell",
      description: "Forged with dual-fluted structural ridges that absorb shock and resist up to 250kg of direct baggage crush pressure.",
    },
    {
      icon: Lock,
      title: "Integrated Dual TSA Latches",
      subtitle: "Zero-Zipper Puncture Security",
      description: "Tamper-proof aluminum tongue-and-groove hermetic seals with flush TSA combination latches for absolute cargo safety.",
    },
    {
      icon: Sparkles,
      title: "Handcrafted Tuscan Leather",
      subtitle: "Florence Artisan Heritage",
      description: "Full-grain vegetable-tanned Italian leather trims that age into a magnificent golden patina with every flight.",
    },
    {
      icon: Cpu,
      title: "Precision Ergonomic Handle",
      subtitle: "Multi-Stage Aircraft Aluminum",
      description: "Custom engineered handle tubing with minimal tolerance to eliminate rattle and distribute weight seamlessly.",
    },
    {
      icon: ShieldCheck,
      title: "Unconditional Lifetime Guarantee",
      subtitle: "Worldwide Airline Damage Coverage",
      description: "If an airline airline damages your luggage at any point in your lifetime, we repair or replace it with zero fuss.",
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-neutral-900 text-white relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-accent/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-accent">
            Swiss Engineering & Italian Artistry
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight mt-1">
            Engineered to Outlast Generations
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-2">
            Every component is obsessively refined, stress-tested over 5,000 drop cycles, and sculpted for a lifetime of distinguished travel.
          </p>
        </div>

        {/* 6 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="bg-neutral-950/70 border border-neutral-800/80 rounded-3xl p-8 hover:border-accent/40 transition-all duration-300 hover:shadow-2xl flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent mb-6 group-hover:scale-110 group-hover:bg-accent group-hover:text-primary transition-all duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-400 block mb-1">
                    {pillar.subtitle}
                  </span>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-accent transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
