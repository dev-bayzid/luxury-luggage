import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { PageHero } from "@/components/common/PageHero";
import { Button } from "@/components/ui/Button";
import { ShieldCheck, Compass, Sparkles, Award, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Maison Heritage & Atelier Craft | AURELIA & CO.",
  description: "Founded in Zürich in 1928, Aurelia combines aerospace engineering with Italian leather atelier craftsmanship.",
};

export default function AboutPage() {
  const milestones = [
    {
      year: "1928",
      title: "The Zürich Workshop",
      description: "Founded by master metalworker Heinrich Von Aurel in Zürich to build custom aluminum trunks for Alpine locomotive journeys.",
    },
    {
      year: "1954",
      title: "Aviation Alloy Revolution",
      description: "Pioneered the use of ribbed anodized aluminum for transatlantic commercial flight, setting the international luxury standard.",
    },
    {
      year: "1988",
      title: "The Florentine Atelier",
      description: "Merged with a historic leather workshop in Florence to introduce hand-burnished Vachetta leather grab handles and trims.",
    },
    {
      year: "2026",
      title: "The Modern Era of Poise",
      description: "Launching whisper-quiet Japanese Hinomoto ball-bearing wheels and unconditional lifetime damage guarantees worldwide.",
    },
  ];

  return (
    <div>
      <PageHero
        badge="Since 1928"
        title="The Soul of Haute Bagagerie"
        subtitle="Where Swiss mechanical precision meets the timeless romance of Italian leather artistry."
        breadcrumbs={[{ label: "About Maison", href: "/about" }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 space-y-24">
        {/* Heritage Story Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase font-bold tracking-[0.25em] text-accent flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Artisanal Philosophy</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-primary tracking-tight leading-tight">
              Luggage Designed to Become a Family Heirloom
            </h2>
            <p className="text-sm text-neutral-600 leading-relaxed font-light">
              At Aurelia & Co., we believe true luxury does not shout; it glides effortlessly across marble concourses. We build travel luggage not merely as containers for belongings, but as armor for life’s most profound voyages.
            </p>
            <p className="text-sm text-neutral-600 leading-relaxed font-light">
              Every aluminum curve is stamped from virgin aircraft-grade alloy, each rivet is hand-hammered, and our leather is hand-dyed using organic Tuscan tree barks that create an indelible patina with every border crossed.
            </p>
            <div className="pt-2">
              <Link href="/shop">
                <Button variant="primary" size="md">
                  <span>Explore The Creations</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-luxury">
              <Image
                src="https://images.unsplash.com/photo-1581553680321-4fffae59fccd?q=80&w=1200&auto=format&fit=crop"
                alt="Aurelia Craftsmanship"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-3xl p-8 sm:p-14 border border-neutral-200/80 shadow-luxury">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase font-bold tracking-[0.25em] text-accent">
              Chronology
            </span>
            <h2 className="text-3xl font-display font-extrabold text-primary tracking-tight mt-1">
              Nearly a Century of Flight
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {milestones.map((m) => (
              <div key={m.year} className="relative pl-6 border-l-2 border-accent/40 space-y-2">
                <span className="text-2xl font-black text-accent font-display block">
                  {m.year}
                </span>
                <h4 className="text-base font-bold text-primary">{m.title}</h4>
                <p className="text-xs text-neutral-500 leading-relaxed">{m.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Materials Anatomy */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase font-bold tracking-[0.25em] text-accent">
              Anatomy of Perfection
            </span>
            <h2 className="text-3xl font-display font-extrabold text-primary tracking-tight mt-1">
              Four Pillars of Material Mastery
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-neutral-50 p-6 rounded-3xl border border-neutral-200/60 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-accent">01. Metallurgy</span>
              <h3 className="text-base font-bold text-primary">Aerospace-Grade Alloy</h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                1.2mm thickness aluminum-magnesium alloy resistant to torsional deformation up to 250kg.
              </p>
            </div>

            <div className="bg-neutral-50 p-6 rounded-3xl border border-neutral-200/60 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-accent">02. Polymer</span>
              <h3 className="text-base font-bold text-primary">German Makrolon®</h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Multi-layer virgin polycarbonate from Germany that absorbs high-velocity impact without fracture.
              </p>
            </div>

            <div className="bg-neutral-50 p-6 rounded-3xl border border-neutral-200/60 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-accent">03. Leather</span>
              <h3 className="text-base font-bold text-primary">Tuscan Vachetta</h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Certified Italian vegetable-tanned leather that darkens into a deep honeyed amber patina over time.
              </p>
            </div>

            <div className="bg-neutral-50 p-6 rounded-3xl border border-neutral-200/60 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-accent">04. Bearings</span>
              <h3 className="text-base font-bold text-primary">Hinomoto Lisof®</h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Japanese silent spinner wheels with grease-sealed ball-bearings running at an ultra-low 0.0dB.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
