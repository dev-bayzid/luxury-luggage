"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FAQS, AIRLINE_SIZE_GUIDE } from "@/data/faq";
import { PageHero } from "@/components/common/PageHero";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { ShieldCheck, Lock, Plane, Search, HelpCircle, CheckCircle2 } from "lucide-react";
import { clsx } from "clsx";

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "All",
    "Orders & Shipping",
    "Warranty & Care",
    "TSA Locks & Sizing",
    "Materials & Design",
  ];

  const filteredFaqs = FAQS.filter((faq) => {
    if (selectedCategory !== "All" && faq.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        faq.question.toLowerCase().includes(q) ||
        faq.answer.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const accordionItems = filteredFaqs.map((f) => ({
    id: f.id,
    title: f.question,
    subtitle: f.category,
    content: f.answer,
  }));

  return (
    <div>
      <PageHero
        badge="Concierge Knowledge Base"
        title="Frequently Asked Questions & Guides"
        subtitle="Detailed guidance regarding our lifetime warranty, TSA lock settings, and international airline carry-on regulations."
        breadcrumbs={[{ label: "Support & FAQ", href: "/faq" }]}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24 space-y-20">
        {/* Search & Category Filter */}
        <div className="space-y-6">
          <div className="relative max-w-xl mx-auto">
            <Search className="w-5 h-5 text-accent absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search lock reset, warranty claims, airline sizes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-neutral-200 rounded-full pl-12 pr-4 py-3.5 text-xs text-primary placeholder-neutral-400 focus:outline-none focus:border-accent shadow-sm"
            />
          </div>

          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={clsx(
                  "px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap",
                  selectedCategory === cat
                    ? "bg-primary text-white shadow-sm"
                    : "bg-white text-neutral-600 hover:text-primary border border-neutral-200"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-neutral-200/80 shadow-luxury">
          {accordionItems.length > 0 ? (
            <Accordion items={accordionItems} allowMultiple />
          ) : (
            <div className="text-center py-12">
              <p className="text-sm text-neutral-600">No questions found matching &ldquo;{searchQuery}&rdquo;.</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="text-xs text-accent font-semibold mt-2 underline"
              >
                Reset Search
              </button>
            </div>
          )}
        </div>

        {/* TSA Lock Reset Guide */}
        <div id="tsa-guide" className="scroll-mt-32 bg-neutral-900 text-white rounded-3xl p-8 sm:p-12 border border-neutral-800 shadow-luxury space-y-8">
          <div className="flex items-center gap-3 text-accent">
            <Lock className="w-6 h-6" />
            <span className="text-xs uppercase font-bold tracking-widest">
              Tutorial & Setup
            </span>
          </div>

          <div>
            <h3 className="text-2xl font-bold font-display text-white">
              How to Reset Your Integrated TSA 008 Master Lock
            </h3>
            <p className="text-xs text-neutral-400 mt-1">
              Your new Aurelia luggage arrives with default factory combination 0-0-0.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-neutral-950 p-6 rounded-2xl border border-neutral-800 space-y-2">
              <span className="text-accent text-2xl font-black font-display">01</span>
              <h4 className="text-sm font-bold text-white">Press Reset Pin</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Locate the small reset pin button next to the dials. Use a ballpoint pen tip to press it inward until you hear a distinct click.
              </p>
            </div>

            <div className="bg-neutral-950 p-6 rounded-2xl border border-neutral-800 space-y-2">
              <span className="text-accent text-2xl font-black font-display">02</span>
              <h4 className="text-sm font-bold text-white">Select Secret 3 Digits</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Turn the numbered wheels to your desired custom 3-digit secret code (e.g. 7-4-2).
              </p>
            </div>

            <div className="bg-neutral-950 p-6 rounded-2xl border border-neutral-800 space-y-2">
              <span className="text-accent text-2xl font-black font-display">03</span>
              <h4 className="text-sm font-bold text-white">Slide Latch to Lock In</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Slide the main release button toward the dials. The reset button will pop back up. Your combination is now securely programmed.
              </p>
            </div>
          </div>
        </div>

        {/* Airline Size Allowance Matrix */}
        <div id="airline-sizing" className="scroll-mt-32 space-y-6">
          <div className="flex items-center gap-3">
            <Plane className="w-6 h-6 text-accent" />
            <h3 className="text-2xl font-bold font-display text-primary">
              Global Airline Carry-On Sizing Guide
            </h3>
          </div>
          <p className="text-xs text-neutral-500">
            Our Titanium Cabin Plus and Horizon Hybrid have been tested for exact fit across overhead bins on major carriers worldwide.
          </p>

          <div className="overflow-x-auto bg-white rounded-3xl border border-neutral-200 shadow-luxury">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-100/80 text-neutral-700 font-bold uppercase text-[10px] tracking-wider border-b border-neutral-200">
                <tr>
                  <th className="p-4">Airline Carrier</th>
                  <th className="p-4">Maximum Dimensions</th>
                  <th className="p-4">Weight Restriction</th>
                  <th className="p-4">Compatibility</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {AIRLINE_SIZE_GUIDE.map((guide, idx) => (
                  <tr key={idx} className="hover:bg-neutral-50/80">
                    <td className="p-4 font-bold text-primary">{guide.airline}</td>
                    <td className="p-4 text-neutral-600 font-mono text-[11px]">{guide.carryOnMax}</td>
                    <td className="p-4 text-neutral-600">{guide.maxWeight}</td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        {guide.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Still need help CTA */}
        <div className="bg-neutral-50 rounded-3xl p-8 border border-neutral-200/80 text-center space-y-4">
          <HelpCircle className="w-8 h-8 text-accent mx-auto" />
          <h3 className="text-xl font-bold text-primary">Have an Unanswered Question?</h3>
          <p className="text-xs text-neutral-600 max-w-md mx-auto">
            Our dedicated concierge team is available around the clock to assist with flight regulations, repair scheduling, or custom orders.
          </p>
          <Link href="/contact" className="inline-block pt-2">
            <Button variant="primary" size="md">
              Speak with Concierge
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
