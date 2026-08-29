"use client";

import React, { useState } from "react";
import { ADMIN_DEFAULT_SETTINGS } from "@/data/adminMockData";
import { AdminSettingsConfig } from "@/types/admin";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import {
  Save,
  Globe,
  DollarSign,
  Truck,
  Shield,
  CreditCard,
  Search,
  Share2,
  CheckCircle2,
  Building,
  Mail,
} from "lucide-react";
import { clsx } from "clsx";

export default function SettingsPage() {
  const [settings, setSettings] = useState<AdminSettingsConfig>(ADMIN_DEFAULT_SETTINGS);
  const [activeTab, setActiveTab] = useState<
    "general" | "shipping" | "payments" | "seo" | "socials"
  >("general");
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#1F1F1F]">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37]">
            Console Configuration & Global Policies
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight mt-0.5">
            System & Store Settings
          </h1>
        </div>

        <button
          type="submit"
          disabled={isSaved}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B89328] hover:from-[#E5C058] hover:to-[#D4AF37] text-neutral-950 font-bold text-xs shadow-gold-glow transition-all disabled:opacity-50 self-start sm:self-auto"
        >
          {isSaved ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-950" />
              <span>Settings Synchronized</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4 stroke-[2.5]" />
              <span>Save System Settings</span>
            </>
          )}
        </button>
      </div>

      {/* Settings Tab Navigation */}
      <div className="flex items-center gap-1 border-b border-[#1F1F1F] pb-1 overflow-x-auto scrollbar-none">
        {[
          { id: "general", label: "General & Identity", icon: Building },
          { id: "shipping", label: "Shipping & Taxes", icon: Truck },
          { id: "payments", label: "Payments & Gateways", icon: CreditCard },
          { id: "seo", label: "Global SEO Defaults", icon: Search },
          { id: "socials", label: "Socials & Boutiques", icon: Share2 },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={clsx(
                "flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-t-xl transition-all border-b-2 whitespace-nowrap",
                isActive
                  ? "text-[#E5C058] border-[#D4AF37] bg-[#141414]"
                  : "text-neutral-400 border-transparent hover:text-neutral-200"
              )}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB: GENERAL */}
      {activeTab === "general" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AdminCard title="Brand Nomenclature & Contact">
            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold uppercase tracking-wider text-neutral-300 mb-1">
                  Maison Brand Name
                </label>
                <input
                  type="text"
                  value={settings.storeName}
                  onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
                  className="w-full bg-[#161616] border border-[#2A2A2A] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-neutral-300 mb-1">
                  Tagline / Subtitle
                </label>
                <input
                  type="text"
                  value={settings.tagline}
                  onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                  className="w-full bg-[#161616] border border-[#2A2A2A] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-neutral-300 mb-1">
                  VIP Concierge Email Desk
                </label>
                <input
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                  className="w-full bg-[#161616] border border-[#2A2A2A] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-neutral-300 mb-1">
                  Direct Concierge Phone
                </label>
                <input
                  type="text"
                  value={settings.hotlinePhone}
                  onChange={(e) => setSettings({ ...settings, hotlinePhone: e.target.value })}
                  className="w-full bg-[#161616] border border-[#2A2A2A] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>
          </AdminCard>

          <AdminCard title="Primary Base Currency & Formatting">
            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold uppercase tracking-wider text-neutral-300 mb-1">
                  Default Operational Currency
                </label>
                <select
                  value={settings.currency}
                  onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                  className="w-full bg-[#161616] border border-[#2A2A2A] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="USD ($)">USD ($) - United States Dollar</option>
                  <option value="EUR (€)">EUR (€) - Eurozone</option>
                  <option value="GBP (£)">GBP (£) - British Pound</option>
                  <option value="CHF (CHF)">CHF (CHF) - Swiss Franc</option>
                  <option value="JPY (¥)">JPY (¥) - Japanese Yen</option>
                </select>
              </div>

              <div className="p-4 rounded-xl bg-[#0E0E0E] border border-[#222] space-y-1">
                <span className="font-bold text-white block">Multi-Currency Live Converter</span>
                <p className="text-[11px] text-neutral-400 leading-relaxed">
                  Real-time exchange rates for EUR, GBP, and JPY are synchronized with European Central Bank rates.
                </p>
              </div>
            </div>
          </AdminCard>
        </div>
      )}

      {/* TAB: SHIPPING & TAXES */}
      {activeTab === "shipping" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AdminCard title="White-Glove Courier Rules">
            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold uppercase tracking-wider text-neutral-300 mb-1">
                  Complimentary Free Shipping Threshold ($)
                </label>
                <input
                  type="number"
                  value={settings.freeShippingThreshold}
                  onChange={(e) =>
                    setSettings({ ...settings, freeShippingThreshold: Number(e.target.value) })
                  }
                  className="w-full bg-[#161616] border border-[#2A2A2A] rounded-xl px-3.5 py-2 text-xs font-mono font-bold text-[#E5C058] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-neutral-300 mb-1">
                  Standard Flat Shipping Fee ($)
                </label>
                <input
                  type="number"
                  value={settings.standardShippingFee}
                  onChange={(e) =>
                    setSettings({ ...settings, standardShippingFee: Number(e.target.value) })
                  }
                  className="w-full bg-[#161616] border border-[#2A2A2A] rounded-xl px-3.5 py-2 text-xs font-mono text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>
          </AdminCard>

          <AdminCard title="Global Tax & VAT Calculation">
            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold uppercase tracking-wider text-neutral-300 mb-1">
                  Default Estimated Tax Rate (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={settings.taxRate}
                  onChange={(e) =>
                    setSettings({ ...settings, taxRate: Number(e.target.value) })
                  }
                  className="w-full bg-[#161616] border border-[#2A2A2A] rounded-xl px-3.5 py-2 text-xs font-mono text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
              <p className="text-[11px] text-neutral-400">
                Destination-based tax rates are automatically calculated during checkout for US states and EU VAT territories.
              </p>
            </div>
          </AdminCard>
        </div>
      )}

      {/* TAB: PAYMENTS */}
      {activeTab === "payments" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AdminCard title="Enabled Payment Methods">
            <div className="space-y-3 text-xs">
              {[
                { name: "Stripe Luxury Gateway", desc: "Visa, Mastercard, Amex Centurion", enabled: true },
                { name: "Apple Pay & Google Pay", desc: "One-touch biometric checkout", enabled: true },
                { name: "Private Bank Wire Transfer", desc: "SWIFT / IBAN for high-value orders over $5,000", enabled: true },
                { name: "Concierge Private Billing", desc: "Invoice to Maison house account", enabled: true },
              ].map((m) => (
                <div key={m.name} className="p-3 rounded-xl bg-[#161616] border border-[#242424] flex items-center justify-between">
                  <div>
                    <h5 className="font-bold text-white">{m.name}</h5>
                    <p className="text-[11px] text-neutral-400">{m.desc}</p>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    Active
                  </span>
                </div>
              ))}
            </div>
          </AdminCard>
        </div>
      )}

      {/* TAB: SEO */}
      {activeTab === "seo" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AdminCard title="Global Metadata Defaults">
            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold uppercase tracking-wider text-neutral-300 mb-1">
                  Default Title
                </label>
                <input
                  type="text"
                  value={settings.seo.defaultTitle}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      seo: { ...settings.seo, defaultTitle: e.target.value },
                    })
                  }
                  className="w-full bg-[#161616] border border-[#2A2A2A] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-neutral-300 mb-1">
                  Default Description
                </label>
                <textarea
                  rows={3}
                  value={settings.seo.defaultDescription}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      seo: { ...settings.seo, defaultDescription: e.target.value },
                    })
                  }
                  className="w-full bg-[#161616] border border-[#2A2A2A] rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-neutral-300 mb-1">
                  Target Keywords
                </label>
                <input
                  type="text"
                  value={settings.seo.keywords}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      seo: { ...settings.seo, keywords: e.target.value },
                    })
                  }
                  className="w-full bg-[#161616] border border-[#2A2A2A] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>
          </AdminCard>
        </div>
      )}

      {/* TAB: SOCIALS */}
      {activeTab === "socials" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AdminCard title="Official Brand Social Links">
            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold uppercase tracking-wider text-neutral-300 mb-1">
                  Instagram
                </label>
                <input
                  type="url"
                  value={settings.socials.instagram}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      socials: { ...settings.socials, instagram: e.target.value },
                    })
                  }
                  className="w-full bg-[#161616] border border-[#2A2A2A] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-neutral-300 mb-1">
                  Facebook
                </label>
                <input
                  type="url"
                  value={settings.socials.facebook}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      socials: { ...settings.socials, facebook: e.target.value },
                    })
                  }
                  className="w-full bg-[#161616] border border-[#2A2A2A] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-neutral-300 mb-1">
                  LinkedIn
                </label>
                <input
                  type="url"
                  value={settings.socials.linkedin}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      socials: { ...settings.socials, linkedin: e.target.value },
                    })
                  }
                  className="w-full bg-[#161616] border border-[#2A2A2A] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>
          </AdminCard>
        </div>
      )}
    </form>
  );
}
