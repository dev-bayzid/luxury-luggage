"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/context/ToastContext";
import { Sparkles, ArrowRight, ShieldCheck, Mail } from "lucide-react";
import { motion } from "framer-motion";

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      showToast("Invalid Email", "Please enter a valid email address.", "error");
      return;
    }
    setIsSuccess(true);
    showToast("VIP Invitation Confirmed", "Your private welcome package has been dispatched to your inbox.", "success");
    setEmail("");
  };

  return (
    <section className="py-20 sm:py-28 bg-neutral-50 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-primary-dark text-white rounded-3xl p-8 sm:p-14 overflow-hidden border border-neutral-800 shadow-2xl"
        >
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-accent/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-white/5 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 text-center max-w-2xl mx-auto space-y-6">
            <span className="inline-flex items-center gap-1.5 text-xs uppercase font-bold tracking-[0.25em] text-accent bg-accent/15 px-3.5 py-1 rounded-full border border-accent/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>The Aurelia Salon</span>
            </span>

            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
              Unlock Private VIP Concierge Status
            </h2>

            <p className="text-xs sm:text-sm text-neutral-300 max-w-lg mx-auto font-light leading-relaxed">
              Gain prioritized access to numbered limited editions, private salon showroom previews, and complimentary hot-stamped leather personalization.
            </p>

            {isSuccess ? (
              <div className="p-4 rounded-2xl bg-accent/20 border border-accent/40 text-accent text-sm font-semibold max-w-md mx-auto">
                Welcome to the Aurelia Society. Please check your inbox to activate your privileges.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    placeholder="Enter your private email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/10 border border-neutral-700/80 rounded-full pl-11 pr-4 py-3.5 text-xs text-white placeholder-neutral-400 focus:outline-none focus:border-accent backdrop-blur-md"
                  />
                </div>
                <Button
                  type="submit"
                  variant="gold"
                  size="md"
                  className="px-7 py-3.5 text-xs font-bold uppercase tracking-widest shrink-0"
                >
                  <span>Join Society</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </form>
            )}

            <div className="flex items-center justify-center gap-4 text-[11px] text-neutral-400 pt-2">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                Strict Privacy Guarantee
              </span>
              <span>•</span>
              <span>No Spam, Only Curated Invitations</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
