import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { CATEGORIES } from "@/data/categories";
import { PRODUCTS } from "@/data/products";
import { PageHero } from "@/components/common/PageHero";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Luggage Categories & Trunks | luxury-luggage",
  description: "Explore our range of cabin carry-on spinners, checked luggage, aluminum trunks, and vintage heritage travel cases.",
};

export default function CategoriesPage() {
  return (
    <div>
      <PageHero
        badge="Nomenclature"
        title="Luggage Categories & Trunks"
        subtitle="Every category is a study in precision engineering, durable lightness, and timeless European luxury."
        breadcrumbs={[{ label: "Luggage Categories", href: "/categories" }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-20">
        {CATEGORIES.map((category, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <div
              key={category.id}
              id={category.slug}
              className="scroll-mt-32 border-b border-neutral-200/80 pb-20 last:border-0"
            >
              <div
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center ${
                  isEven ? "" : "lg:flex-row-reverse"
                }`}
              >
                {/* Visual Image Banner */}
                <div className={`lg:col-span-6 ${isEven ? "" : "lg:order-2"}`}>
                  <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-luxury group">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6">
                      <Badge variant="gold">{category.badge}</Badge>
                      <h3 className="text-2xl font-bold text-white mt-1">
                        {category.name}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Narrative & Mini Showcase */}
                <div className={`lg:col-span-6 space-y-6 ${isEven ? "" : "lg:order-1"}`}>
                  <div>
                    <span className="text-xs uppercase font-bold tracking-[0.2em] text-accent">
                      {category.headline}
                    </span>
                    <h2 className="text-3xl font-display font-extrabold text-primary tracking-tight mt-1">
                      {category.name}
                    </h2>
                    <p className="text-sm text-neutral-600 mt-3 leading-relaxed">
                      {category.description}
                    </p>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2 text-xs text-neutral-700">
                      <Check className="w-4 h-4 text-accent" />
                      <span>Complimentary hot-stamped leather monogramming</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-neutral-700">
                      <Check className="w-4 h-4 text-accent" />
                      <span>Unconditional lifetime airline damage warranty</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-neutral-700">
                      <Check className="w-4 h-4 text-accent" />
                      <span>Complimentary white-glove express courier worldwide</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="pt-2">
                    <Link href={`/shop?category=${encodeURIComponent(category.name)}`}>
                      <Button variant="primary" size="md" className="text-xs uppercase tracking-wider font-semibold">
                        <span>Shop {category.name} ({category.itemCount})</span>
                        <ArrowRight className="w-3.5 h-3.5 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
