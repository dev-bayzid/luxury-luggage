"use client";

import React from "react";
import { Truck, ShieldCheck, Gem, Lock } from "lucide-react";
import { motion } from "framer-motion";

export const BrandTrust: React.FC = () => {
  const pillars = [
    {
      icon: Truck,
      title: "Complimentary Global Courier",
      description: "Express insured door-to-door delivery on all orders over $300.",
    },
    {
      icon: ShieldCheck,
      title: "Unconditional Lifetime Guarantee",
      description: "We repair or replace any airline-incurred damage anywhere on Earth.",
    },
    {
      icon: Gem,
      title: "Aerospace Materials & Leather",
      description: "German Makrolon® polycarbonate, aircraft alloy & Tuscan leather.",
    },
    {
      icon: Lock,
      title: "Certified Security Standards",
      description: "Integrated TSA 008 keyless locks & 256-bit encrypted checkout.",
    },
  ];

  return (
    <section className="bg-white py-12 border-b border-neutral-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="flex items-start gap-4 p-4 rounded-2xl hover:bg-neutral-50/80 transition-colors group"
              >
                <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0 group-hover:scale-110 group-hover:bg-accent group-hover:text-primary transition-all duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-primary tracking-wide">
                    {p.title}
                  </h3>
                  <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                    {p.description}
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
