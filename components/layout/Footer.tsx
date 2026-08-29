"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/context/ToastContext";
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  MapPin,
  Lock,
} from "lucide-react";

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { showToast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      showToast(
        "Invalid Email",
        "Please enter a valid email address.",
        "error",
      );
      return;
    }
    setIsSubscribed(true);
    showToast(
      "Welcome to the Private Club",
      "You will receive exclusive previews and private sale invitations.",
      "success",
    );
    setEmail("");
  };

  return (
    <footer className="bg-primary-dark text-white pt-16 sm:pt-24 pb-12 border-t border-neutral-800">
      {/* Top Value Propositions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 border-b border-neutral-800/80">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold tracking-wide text-white uppercase">
                Lifetime Guarantee
              </h4>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                Unconditional worldwide protection covering any airline luggage
                damage.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold tracking-wide text-white uppercase">
                Complimentary Courier
              </h4>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                Express insured global courier service on all orders exceeding
                $300.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent shrink-0">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold tracking-wide text-white uppercase">
                100-Day Global Trial
              </h4>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                Experience luxury-luggage on your next flight risk-free with
                free return pickup.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold tracking-wide text-white uppercase">
                Bespoke Personalization
              </h4>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                Complimentary Italian leather hot-stamped gold foil
                monogramming.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <Link href="/" className="inline-flex items-center gap-2.5 group">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent via-accent-light to-accent-dark flex items-center justify-center shadow-gold-glow shrink-0">
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
                <div>
                  <span className="font-display font-bold text-xl tracking-tight text-white group-hover:text-accent transition-colors lowercase">
                    luxury-luggage
                  </span>
                  <div className="text-[8px] tracking-[0.3em] uppercase text-accent font-medium">
                    Haute Bagagerie & Travel Gear
                  </div>
                </div>
              </Link>
              <p className="text-xs text-neutral-400 mt-4 leading-relaxed max-w-sm">
                Crafted for modern travelers with premium materials, timeless
                design, and lifetime durability.
              </p>
            </div>

            {/* Newsletter Input */}
            <div className="pt-2">
              <h5 className="text-xs uppercase font-bold tracking-widest text-neutral-300 mb-2">
                Get Early Access
              </h5>
              <p className="text-xs text-neutral-400 mb-3">
                Be the first to know about new arrivals and private sales.
              </p>
              {isSubscribed ? (
                <div className="p-3 rounded-xl bg-accent/20 border border-accent/40 text-accent text-xs font-semibold">
                  Thank you. You have been granted early access.
                </div>
              ) : (
                <form
                  onSubmit={handleSubscribe}
                  className="flex gap-2 max-w-md"
                >
                  <input
                    type="email"
                    placeholder="Enter your email address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-white/5 border border-neutral-700 rounded-full px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-accent"
                  />
                  <Button
                    type="submit"
                    variant="gold"
                    size="sm"
                    className="px-5"
                  >
                    <span>Join</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </form>
              )}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-widest text-accent mb-4">
              Shop
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <Link
                  href="/shop?category=Cabin%20Luggage"
                  className="hover:text-white transition-colors"
                >
                  Carry-On
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=Checked%20Luggage"
                  className="hover:text-white transition-colors"
                >
                  Checked Luggage
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=Backpacks"
                  className="hover:text-white transition-colors"
                >
                  Backpacks
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=Duffel%20Bags"
                  className="hover:text-white transition-colors"
                >
                  Accessories
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=Travel%20Accessories"
                  className="hover:text-white transition-colors"
                >
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="hover:text-white transition-colors"
                >
                  Best Sellers
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Services */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-widest text-accent mb-4">
              Support
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <Link
                  href="/faq"
                  className="hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/faq#tsa-guide"
                  className="hover:text-white transition-colors"
                >
                  Shipping
                </Link>
              </li>
              <li>
                <Link
                  href="/faq#airline-sizing"
                  className="hover:text-white transition-colors"
                >
                  Returns
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors"
                >
                  Warranty
                </Link>
              </li>
              <li>
                <Link
                  href="/contact#stores"
                  className="hover:text-white transition-colors"
                >
                  Track Order
                </Link>
              </li>
              <li>
                <Link
                  href="/cart"
                  className="hover:text-white transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Boutiques */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-widest text-accent mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <Link
                  href="/faq"
                  className="hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/faq#tsa-guide"
                  className="hover:text-white transition-colors"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  href="/faq#airline-sizing"
                  className="hover:text-white transition-colors"
                >
                  Sustainability
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/contact#stores"
                  className="hover:text-white transition-colors"
                >
                  Press
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Payment Icons */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 border-t border-neutral-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
        <div className="flex items-center gap-6">
          <p>
            © {new Date().getFullYear()} luxury-luggage Group. All rights
            reserved.
          </p>
          <div className="hidden sm:flex items-center gap-4 text-neutral-400">
            <Link href="/about" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/about" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <span>•</span>
            <Link href="/faq" className="hover:text-white transition-colors">
              Accessibility
            </Link>
          </div>
        </div>

        {/* Social and Payment */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 text-neutral-400">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-accent transition-colors"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-accent transition-colors"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-accent transition-colors"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-accent transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>

          <div className="flex items-center gap-2 text-neutral-400 border-l border-neutral-800 pl-6">
            <Lock className="w-3.5 h-3.5 text-accent" />
            <span className="text-[11px] font-medium text-neutral-400">
              Encrypted Checkout
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
