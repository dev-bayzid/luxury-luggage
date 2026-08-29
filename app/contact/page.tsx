"use client";

import React, { useState } from "react";
import { PageHero } from "@/components/common/PageHero";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { useToast } from "@/context/ToastContext";
import { MapPin, Phone, Mail, Clock, ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const { showToast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "Private Appointment",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      showToast("Required Fields", "Please complete all fields.", "error");
      return;
    }
    setIsSubmitted(true);
    showToast("Inquiry Received", "Our private client concierge will contact you within 4 business hours.", "success");
    setForm({ name: "", email: "", subject: "Private Appointment", message: "" });
  };

  const stores = [
    {
      city: "Zürich (Maison Atelier)",
      address: "Bahnhofstrasse 42, 8001 Zürich, Switzerland",
      hours: "Mon – Sat: 10:00 – 19:00",
      phone: "+41 44 221 8800",
    },
    {
      city: "Paris Saint-Honoré",
      address: "231 Rue Saint-Honoré, 75001 Paris, France",
      hours: "Mon – Sat: 10:30 – 19:30",
      phone: "+33 1 42 68 9900",
    },
    {
      city: "New York Fifth Avenue",
      address: "680 Fifth Avenue, New York, NY 10019, USA",
      hours: "Mon – Sun: 11:00 – 20:00",
      phone: "+1 (212) 555-8820",
    },
    {
      city: "Tokyo Ginza Flagship",
      address: "6-10-1 Ginza, Chuo-ku, Tokyo 104-0061, Japan",
      hours: "Daily: 11:00 – 20:00",
      phone: "+81 3 5537 9000",
    },
  ];

  const miniFaqs = [
    {
      id: "c-faq-1",
      title: "How do I schedule a private monogramming consultation?",
      content: "You may either select the option in the form above or call our VIP hotline. We offer private after-hours salon appointments with our master engravers.",
    },
    {
      id: "c-faq-2",
      title: "How do I initiate an unconditional lifetime warranty repair?",
      content: "Simply bring your luggage into any of our 4 flagship boutiques worldwide or submit a warranty inquiry above. We provide pre-paid return shipping boxes for mail-in repairs.",
    },
  ];

  return (
    <div>
      <PageHero
        badge="VIP Concierge"
        title="Client Services & Boutiques"
        subtitle="Our global concierge team and atelier craftspeople are at your service 24/7."
        breadcrumbs={[{ label: "Concierge & Boutiques", href: "/contact" }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 space-y-24">
        {/* Form and Quick Contacts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-12 border border-neutral-200/80 shadow-luxury">
            <span className="text-xs uppercase font-bold tracking-widest text-accent flex items-center gap-1.5 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Direct Concierge Dispatch</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-primary tracking-tight mb-2">
              Send a Private Inquiry
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 mb-8">
              Whether arranging bespoke leather hot-stamping, bulk executive gifting, or urgent flight assistance.
            </p>

            {isSubmitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="text-base font-bold text-emerald-900">Inquiry Logged with Chief Concierge</h4>
                <p className="text-xs text-emerald-700">
                  Thank you. An Aurelia concierge officer will reach out directly.
                </p>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setIsSubmitted(false)}
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lady Genevieve Vance"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full border border-neutral-200 rounded-xl px-4 py-2.5 text-xs text-primary focus:outline-none focus:border-accent bg-neutral-50"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 block mb-1">
                      Private Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@domain.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full border border-neutral-200 rounded-xl px-4 py-2.5 text-xs text-primary focus:outline-none focus:border-accent bg-neutral-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 block mb-1">
                    Nature of Inquiry
                  </label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full border border-neutral-200 rounded-xl px-4 py-2.5 text-xs text-primary focus:outline-none focus:border-accent bg-neutral-50"
                  >
                    <option value="Private Appointment">Boutique Private Appointment</option>
                    <option value="Bespoke Monogramming">Bespoke Gold Foil Monogramming</option>
                    <option value="Lifetime Warranty">Lifetime Warranty & Repair Claim</option>
                    <option value="Corporate Gifting">Corporate & Aviation Fleet Inquiries</option>
                    <option value="Other">General Inquiries</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 block mb-1">
                    Message Details *
                  </label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Provide details regarding your piece, desired dates, or special requests..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full border border-neutral-200 rounded-xl p-4 text-xs text-primary focus:outline-none focus:border-accent bg-neutral-50 resize-none"
                  />
                </div>

                <Button type="submit" variant="primary" size="lg" className="w-full py-4 text-xs font-bold uppercase tracking-widest">
                  <span>Submit Inquiry to Concierge</span>
                </Button>
              </form>
            )}
          </div>

          {/* Right: Hotline & Mini FAQ */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-primary-dark text-white rounded-3xl p-8 border border-neutral-800 shadow-luxury space-y-6">
              <span className="text-xs uppercase font-bold tracking-widest text-accent flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5" />
                <span>24/7 Global Hotlines</span>
              </span>

              <div className="space-y-4">
                <div>
                  <div className="text-xs text-neutral-400">Europe & International Concierge</div>
                  <a href="tel:+41442218800" className="text-lg font-bold text-white hover:text-accent transition-colors">
                    +41 44 221 8800 (Zürich)
                  </a>
                </div>

                <div>
                  <div className="text-xs text-neutral-400">Americas VIP Desk</div>
                  <a href="tel:+18005558890" className="text-lg font-bold text-white hover:text-accent transition-colors">
                    +1 (800) 555-AURELIA
                  </a>
                </div>

                <div>
                  <div className="text-xs text-neutral-400">Direct Email</div>
                  <a href="mailto:concierge@aurelia.com" className="text-sm font-semibold text-accent hover:underline">
                    concierge@aurelia.com
                  </a>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-800 text-[11px] text-neutral-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-accent" />
                <span>Dedicated private response time: Under 4 hours</span>
              </div>
            </div>

            {/* Quick FAQ Accordion */}
            <div className="bg-white rounded-3xl p-8 border border-neutral-200/80 shadow-luxury">
              <h3 className="text-base font-bold text-primary mb-4">Concierge FAQ</h3>
              <Accordion items={miniFaqs} />
            </div>
          </div>
        </div>

        {/* Global Flagship Boutiques & Interactive Map Placeholder */}
        <div id="stores" className="scroll-mt-32 space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs uppercase font-bold tracking-[0.25em] text-accent">
              Flagship Destinations
            </span>
            <h2 className="text-3xl font-display font-extrabold text-primary tracking-tight mt-1">
              Global Boutiques & Ateliers
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 mt-2">
              Experience the weightless glide and bespoke monogramming at our premier salons.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stores.map((store) => (
              <div
                key={store.city}
                className="bg-white rounded-3xl p-6 border border-neutral-200/80 shadow-luxury space-y-3 hover:shadow-luxury-hover transition-all"
              >
                <div className="w-10 h-10 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
                  <MapPin className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-primary">{store.city}</h4>
                <p className="text-xs text-neutral-600 leading-relaxed">{store.address}</p>
                <div className="text-[11px] text-neutral-500 pt-2 border-t border-neutral-100 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-accent" />
                  <span>{store.hours}</span>
                </div>
                <div className="text-xs font-semibold text-primary">{store.phone}</div>
              </div>
            ))}
          </div>

          {/* Interactive Styled Map Placeholder */}
          <div className="relative w-full h-80 rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-800 flex items-center justify-center shadow-luxury">
            <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#c8a96a_1px,transparent_1px)] [background-size:20px_20px]" />
            <div className="relative z-10 text-center space-y-2 p-6">
              <span className="text-xs uppercase font-bold tracking-widest text-accent bg-black/60 px-4 py-1.5 rounded-full border border-accent/40 backdrop-blur-md inline-block">
                Worldwide Private Logistics Network
              </span>
              <h3 className="text-2xl font-bold text-white">4 Flagship Salons • 140+ Delivery Hubs</h3>
              <p className="text-xs text-neutral-400 max-w-md mx-auto">
                All cases are dispatched from our bonded vaults in Zürich, Frankfurt, and Tokyo with full transit insurance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
