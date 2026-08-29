"use client";

import React, { useState } from "react";
import { Product } from "@/types";
import { AIRLINE_SIZE_GUIDE } from "@/data/faq";
import { ShieldCheck, Check, Sparkles, Plane, Ruler, Wrench } from "lucide-react";
import { clsx } from "clsx";

interface ProductTabsProps {
  product: Product;
}

export const ProductTabs: React.FC<ProductTabsProps> = ({ product }) => {
  const [activeTab, setActiveTab] = useState<"overview" | "specs" | "dimensions" | "airline" | "warranty">("overview");

  const tabs = [
    { id: "overview", label: "Craftsmanship & Story", icon: Sparkles },
    { id: "specs", label: "Technical Specs", icon: Wrench },
    { id: "dimensions", label: "Dimensions & Capacity", icon: Ruler },
    { id: "airline", label: "Airline Overhead Fit", icon: Plane },
    { id: "warranty", label: "Lifetime Guarantee", icon: ShieldCheck },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-neutral-200/80 shadow-luxury">
      {/* Tabs Header */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 border-b border-neutral-200 scrollbar-none">
        {tabs.map((t) => {
          const Icon = t.icon;
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as typeof activeTab)}
              className={clsx(
                "flex items-center gap-2 px-5 py-3 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all",
                isActive
                  ? "bg-primary text-white shadow-sm"
                  : "text-neutral-500 hover:text-primary hover:bg-neutral-100"
              )}
            >
              <Icon className={clsx("w-4 h-4", isActive ? "text-accent" : "text-neutral-400")} />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="pt-8">
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="max-w-3xl">
              <h3 className="text-xl font-bold text-primary mb-3">
                Architectural Elegance Meets Unyielding Resilience
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                {product.description}
              </p>
              <p className="text-sm text-neutral-600 leading-relaxed mt-4 italic bg-neutral-50 p-4 rounded-2xl border border-neutral-200/60">
                &ldquo;{product.story}&rdquo;
              </p>
            </div>

            <div className="pt-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-accent mb-3">
                Signature Functional Highlights
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {product.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-700 bg-neutral-50 p-3 rounded-xl">
                    <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "specs" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-neutral-50 p-5 rounded-2xl border border-neutral-200/60 space-y-1">
              <div className="text-[11px] uppercase font-bold tracking-wider text-neutral-400">Exterior Shell</div>
              <div className="text-sm font-semibold text-primary">{product.specs.shell}</div>
            </div>

            <div className="bg-neutral-50 p-5 rounded-2xl border border-neutral-200/60 space-y-1">
              <div className="text-[11px] uppercase font-bold tracking-wider text-neutral-400">Wheel System</div>
              <div className="text-sm font-semibold text-primary">{product.specs.wheels}</div>
            </div>

            <div className="bg-neutral-50 p-5 rounded-2xl border border-neutral-200/60 space-y-1">
              <div className="text-[11px] uppercase font-bold tracking-wider text-neutral-400">Security & Locks</div>
              <div className="text-sm font-semibold text-primary">{product.specs.lock}</div>
            </div>

            <div className="bg-neutral-50 p-5 rounded-2xl border border-neutral-200/60 space-y-1">
              <div className="text-[11px] uppercase font-bold tracking-wider text-neutral-400">Telescopic Handle</div>
              <div className="text-sm font-semibold text-primary">{product.specs.handle}</div>
            </div>

            <div className="bg-neutral-50 p-5 rounded-2xl border border-neutral-200/60 space-y-1">
              <div className="text-[11px] uppercase font-bold tracking-wider text-neutral-400">Interior Lining</div>
              <div className="text-sm font-semibold text-primary">{product.specs.interior}</div>
            </div>

            <div className="bg-neutral-50 p-5 rounded-2xl border border-neutral-200/60 space-y-1">
              <div className="text-[11px] uppercase font-bold tracking-wider text-neutral-400">Zippers & Hardware</div>
              <div className="text-sm font-semibold text-primary">{product.specs.zippers}</div>
            </div>
          </div>
        )}

        {activeTab === "dimensions" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-200/60 text-center">
                <span className="text-[10px] uppercase font-bold text-neutral-400 block">Height</span>
                <span className="text-sm font-bold text-primary">{product.dimensions.height}</span>
              </div>
              <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-200/60 text-center">
                <span className="text-[10px] uppercase font-bold text-neutral-400 block">Width</span>
                <span className="text-sm font-bold text-primary">{product.dimensions.width}</span>
              </div>
              <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-200/60 text-center">
                <span className="text-[10px] uppercase font-bold text-neutral-400 block">Depth</span>
                <span className="text-sm font-bold text-primary">{product.dimensions.depth}</span>
              </div>
              <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-200/60 text-center">
                <span className="text-[10px] uppercase font-bold text-neutral-400 block">Weight</span>
                <span className="text-sm font-bold text-primary">{product.dimensions.weight}</span>
              </div>
              <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-200/60 text-center col-span-2 sm:col-span-1">
                <span className="text-[10px] uppercase font-bold text-accent block">Capacity</span>
                <span className="text-sm font-bold text-primary">{product.dimensions.volume}</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "airline" && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
              <Plane className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>
                {product.airlineFit.cabinApproved
                  ? "Approved as IATA International Overhead Carry-On luggage across 99% of global airlines."
                  : "Engineered for international checked luggage compliance (under 62 linear inches)."}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-neutral-200 rounded-2xl overflow-hidden">
                <thead className="bg-neutral-100 text-neutral-700 font-bold uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="p-3">Airline Carrier</th>
                    <th className="p-3">Carry-On Limit</th>
                    <th className="p-3">Weight Allowance</th>
                    <th className="p-3">Aurelia Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {AIRLINE_SIZE_GUIDE.slice(0, 4).map((row, idx) => (
                    <tr key={idx} className="hover:bg-neutral-50">
                      <td className="p-3 font-semibold text-primary">{row.airline}</td>
                      <td className="p-3 text-neutral-600">{row.carryOnMax}</td>
                      <td className="p-3 text-neutral-600">{row.maxWeight}</td>
                      <td className="p-3 font-semibold text-emerald-600">✓ Guaranteed Fit</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "warranty" && (
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-start gap-4 p-5 rounded-2xl bg-accent/10 border border-accent/30">
              <ShieldCheck className="w-8 h-8 text-accent shrink-0" />
              <div>
                <h4 className="text-base font-bold text-primary">
                  The Aurelia Unconditional Lifetime Covenant
                </h4>
                <p className="text-xs text-neutral-700 mt-1 leading-relaxed">
                  {product.warranty} If an airline handler cracks the shell, destroys a wheel, or bends a lock at any time in your life, we repair or replace it with zero receipts required.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
