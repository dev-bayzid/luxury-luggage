"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AdminProduct } from "@/types/admin";
import { LuggageCategory } from "@/types";
import { AdminCard } from "../ui/AdminCard";
import { ImageUploader } from "./ImageUploader";
import {
  Save,
  ArrowLeft,
  Eye,
  Trash2,
  Copy,
  Sparkles,
  Layers,
  DollarSign,
  Package,
  Truck,
  FileText,
  Search as SearchIcon,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { clsx } from "clsx";

interface ProductFormProps {
  initialData?: Partial<AdminProduct>;
  isEditing?: boolean;
}

export const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  isEditing = false,
}) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<
    "basic" | "pricing" | "inventory" | "shipping" | "images" | "specs" | "seo"
  >("basic");
  const [isSaved, setIsSaved] = useState(false);

  const [formData, setFormData] = useState<Partial<AdminProduct>>({
    name: initialData?.name || "",
    slug: initialData?.slug || "",
    sku: initialData?.sku || `AUR-LUG-${Math.floor(100 + Math.random() * 900)}`,
    barcode: initialData?.barcode || "7640192800195",
    category: (initialData?.category as LuggageCategory) || "Cabin Luggage",
    price: initialData?.price || 680,
    comparePrice: initialData?.comparePrice || 750,
    cost: initialData?.cost || 258,
    stock: initialData?.stock || 12,
    trackInventory: initialData?.trackInventory ?? true,
    status: initialData?.status || "Published",
    isFeatured: initialData?.isFeatured ?? true,
    isBestSeller: initialData?.isBestSeller ?? false,
    shortDescription: initialData?.shortDescription || "Anodized aerospace aluminum with whisper-quiet Japanese ball-bearing wheels.",
    description: initialData?.description || "Engineered from high-grade anodized aluminum-magnesium alloy, this piece is the pinnacle of timeless travel luxury.",
    images: initialData?.images || [
      "https://images.unsplash.com/photo-1581553680321-4fffae59fccd?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?q=80&w=1200&auto=format&fit=crop",
    ],
    thumbnail: initialData?.thumbnail || "https://images.unsplash.com/photo-1581553680321-4fffae59fccd?q=80&w=1200&auto=format&fit=crop",
    weight: initialData?.weight || "4.3 kg / 9.4 lbs",
    dimensions: initialData?.dimensions || {
      height: "56 cm / 22.0 in",
      width: "39 cm / 15.3 in",
      depth: "23 cm / 9.0 in",
      weight: "4.3 kg / 9.4 lbs",
      volume: "42 L",
    },
    specs: initialData?.specs || {
      shell: "100% Virgin Aerospace Aluminum-Magnesium Alloy (1.2mm thickness)",
      wheels: "4x Japanese Hinomoto Lisof® 360° silent wheels",
      lock: "Dual TSA-approved keyless combination lock latches",
      handle: "3-stage telescopic aircraft aluminum handle",
      interior: "Recycled jacquard with antibacterial silver-ion coating",
      zippers: "Hermetic latch frame closure (no zippers)",
    },
    seo: initialData?.seo || {
      metaTitle: initialData?.name ? `${initialData.name} | luxury-luggage` : "The Titanium Cabin Plus | luxury-luggage",
      metaDescription: initialData?.shortDescription || "Anodized aerospace aluminum carry-on spinner. Unconditional lifetime warranty.",
    },
  });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const autoSlug = val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    setFormData((prev) => ({
      ...prev,
      name: val,
      slug: prev.slug === "" || !isEditing ? autoSlug : prev.slug,
      seo: {
        metaTitle: `${val} | luxury-luggage`,
        metaDescription: prev.seo?.metaDescription || prev.shortDescription || "",
      },
    }));
  };

  const calculateMargin = () => {
    const p = formData.price || 0;
    const c = formData.cost || 0;
    if (p <= 0) return 0;
    return (((p - c) / p) * 100).toFixed(1);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      router.push("/admin/products");
    }, 1200);
  };

  const categories: LuggageCategory[] = [
    "Cabin Luggage",
    "Checked Luggage",
    "Aluminum Trunks",
    "Hybrid Spinners",
    "Heritage Cases",
  ];

  return (
    <form onSubmit={handleSave} className="space-y-8">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#1F1F1F]">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="p-2 rounded-xl bg-[#141414] hover:bg-[#1E1E1E] border border-[#242424] text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37]">
              {isEditing ? "Atelier Specification Editor" : "Commission New Masterpiece"}
            </span>
            <h1 className="text-2xl font-display font-extrabold text-white tracking-tight">
              {formData.name || "Untitled Luggage Piece"}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isEditing && formData.slug && (
            <Link
              href={`/product/${formData.slug}`}
              target="_blank"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#141414] hover:bg-[#1E1E1E] border border-[#242424] text-xs font-semibold text-neutral-300 hover:text-white transition-colors"
            >
              <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Preview Live</span>
            </Link>
          )}

          <button
            type="submit"
            disabled={isSaved}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B89328] hover:from-[#E5C058] hover:to-[#D4AF37] text-neutral-950 font-bold text-xs shadow-gold-glow transition-all disabled:opacity-50"
          >
            {isSaved ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-950" />
                <span>Saved & Synchronized</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4 stroke-[2.5]" />
                <span>{isEditing ? "Update Piece" : "Publish to Vault"}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Editor Tabs Navigation */}
      <div className="flex items-center gap-1 border-b border-[#1F1F1F] overflow-x-auto pb-px scrollbar-none">
        {[
          { id: "basic", label: "Basic Details", icon: FileText },
          { id: "pricing", label: "Pricing & Margin", icon: DollarSign },
          { id: "inventory", label: "Inventory & SKU", icon: Package },
          { id: "shipping", label: "Dimensions & Shipping", icon: Truck },
          { id: "images", label: "Media & Cover", icon: Layers },
          { id: "specs", label: "Aviation Specs", icon: Sparkles },
          { id: "seo", label: "Search & SEO", icon: SearchIcon },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={clsx(
                "flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-t-xl transition-all whitespace-nowrap border-b-2",
                isActive
                  ? "text-[#E5C058] border-[#D4AF37] bg-[#141414]"
                  : "text-neutral-400 border-transparent hover:text-neutral-200 hover:bg-[#111]"
              )}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: BASIC DETAILS */}
      {activeTab === "basic" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <AdminCard title="Product Nomenclature & Story">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                    Piece Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name || ""}
                    onChange={handleNameChange}
                    placeholder="e.g. The Titanium Cabin Plus"
                    required
                    className="w-full bg-[#161616] border border-[#2A2A2A] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                    URL Slug
                  </label>
                  <div className="flex items-center rounded-xl bg-[#161616] border border-[#2A2A2A] px-3">
                    <span className="text-xs text-neutral-400 font-mono">
                      /product/
                    </span>
                    <input
                      type="text"
                      value={formData.slug || ""}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      className="flex-1 bg-transparent px-2 py-2.5 text-xs text-neutral-200 font-mono focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                    Tagline / Short Summary
                  </label>
                  <input
                    type="text"
                    value={formData.shortDescription || ""}
                    onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                    placeholder="Short one-line subtitle"
                    className="w-full bg-[#161616] border border-[#2A2A2A] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                    Full Atelier Description
                  </label>
                  <textarea
                    rows={5}
                    value={formData.description || ""}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-[#161616] border border-[#2A2A2A] rounded-xl p-4 text-xs text-white leading-relaxed focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>
            </AdminCard>
          </div>

          {/* Right Column: Status & Category */}
          <div className="space-y-6">
            <AdminCard title="Status & Classification">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                    Publishing Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as AdminProduct["status"] })}
                    className="w-full bg-[#161616] border border-[#2A2A2A] rounded-xl px-3.5 py-2.5 text-xs text-white font-medium focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="Published">Published (Live in Vault)</option>
                    <option value="Draft">Draft (Private Atelier Only)</option>
                    <option value="Archived">Archived (Discontinued)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                    Luggage Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as LuggageCategory })}
                    className="w-full bg-[#161616] border border-[#2A2A2A] rounded-xl px-3.5 py-2.5 text-xs text-white font-medium focus:outline-none focus:border-[#D4AF37]"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="pt-2 border-t border-[#1F1F1F] space-y-3">
                  <label className="flex items-center justify-between cursor-pointer text-xs">
                    <span className="font-semibold text-neutral-200">Featured in Hall of Icons</span>
                    <input
                      type="checkbox"
                      checked={formData.isFeatured}
                      onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                      className="w-4 h-4 accent-[#D4AF37] rounded"
                    />
                  </label>

                  <label className="flex items-center justify-between cursor-pointer text-xs">
                    <span className="font-semibold text-neutral-200">Best Seller Tag</span>
                    <input
                      type="checkbox"
                      checked={formData.isBestSeller}
                      onChange={(e) => setFormData({ ...formData, isBestSeller: e.target.checked })}
                      className="w-4 h-4 accent-[#D4AF37] rounded"
                    />
                  </label>
                </div>
              </div>
            </AdminCard>
          </div>
        </div>
      )}

      {/* TAB 2: PRICING & MARGIN */}
      {activeTab === "pricing" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <AdminCard title="Pricing & Commercial Structure">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                    Retail Price ($) *
                  </label>
                  <input
                    type="number"
                    value={formData.price || 0}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full bg-[#161616] border border-[#2A2A2A] rounded-xl px-4 py-2.5 text-sm font-mono text-[#E5C058] font-bold focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                    Compare-At Price ($)
                  </label>
                  <input
                    type="number"
                    value={formData.comparePrice || 0}
                    onChange={(e) => setFormData({ ...formData, comparePrice: Number(e.target.value) })}
                    className="w-full bg-[#161616] border border-[#2A2A2A] rounded-xl px-4 py-2.5 text-sm font-mono text-neutral-400 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                    Atelier Unit Cost ($)
                  </label>
                  <input
                    type="number"
                    value={formData.cost || 0}
                    onChange={(e) => setFormData({ ...formData, cost: Number(e.target.value) })}
                    className="w-full bg-[#161616] border border-[#2A2A2A] rounded-xl px-4 py-2.5 text-sm font-mono text-neutral-300 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>
            </AdminCard>
          </div>

          <div>
            <AdminCard title="Margin & Profitability Breakdown">
              <div className="space-y-4 text-xs">
                <div className="flex justify-between py-2 border-b border-[#1F1F1F]">
                  <span className="text-neutral-400">Gross Margin</span>
                  <span className="font-mono font-bold text-emerald-400">
                    {calculateMargin()}%
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#1F1F1F]">
                  <span className="text-neutral-400">Net Profit / Unit</span>
                  <span className="font-mono font-bold text-[#E5C058]">
                    ${((formData.price || 0) - (formData.cost || 0)).toLocaleString()}
                  </span>
                </div>
                <p className="text-[11px] text-neutral-400 leading-relaxed">
                  Complimentary global white-glove courier is calculated automatically for pieces over $300.
                </p>
              </div>
            </AdminCard>
          </div>
        </div>
      )}

      {/* TAB 3: INVENTORY & SKU */}
      {activeTab === "inventory" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AdminCard title="Stock Tracking & Codes">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                  Maison SKU *
                </label>
                <input
                  type="text"
                  value={formData.sku || ""}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                  className="w-full bg-[#161616] border border-[#2A2A2A] rounded-xl px-4 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                  EAN / Barcode
                </label>
                <input
                  type="text"
                  value={formData.barcode || ""}
                  onChange={(e) => setFormData({ ...formData, barcode: e.target.value })}
                  className="w-full bg-[#161616] border border-[#2A2A2A] rounded-xl px-4 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                  Current Available Units
                </label>
                <input
                  type="number"
                  value={formData.stock || 0}
                  onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                  className="w-full bg-[#161616] border border-[#2A2A2A] rounded-xl px-4 py-2.5 text-sm font-mono text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <label className="flex items-center gap-2 pt-2 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={formData.trackInventory}
                  onChange={(e) => setFormData({ ...formData, trackInventory: e.target.checked })}
                  className="w-4 h-4 accent-[#D4AF37] rounded"
                />
                <span className="font-semibold text-neutral-200">
                  Track atelier inventory automatically across global hubs
                </span>
              </label>
            </div>
          </AdminCard>
        </div>
      )}

      {/* TAB 4: DIMENSIONS & SHIPPING */}
      {activeTab === "shipping" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AdminCard title="Dimensions & Flight Specifications">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                  Height
                </label>
                <input
                  type="text"
                  value={formData.dimensions?.height || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      dimensions: { ...formData.dimensions!, height: e.target.value },
                    })
                  }
                  className="w-full bg-[#161616] border border-[#2A2A2A] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                  Width
                </label>
                <input
                  type="text"
                  value={formData.dimensions?.width || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      dimensions: { ...formData.dimensions!, width: e.target.value },
                    })
                  }
                  className="w-full bg-[#161616] border border-[#2A2A2A] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                  Depth
                </label>
                <input
                  type="text"
                  value={formData.dimensions?.depth || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      dimensions: { ...formData.dimensions!, depth: e.target.value },
                    })
                  }
                  className="w-full bg-[#161616] border border-[#2A2A2A] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                  Volume (Liters)
                </label>
                <input
                  type="text"
                  value={formData.dimensions?.volume || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      dimensions: { ...formData.dimensions!, volume: e.target.value },
                    })
                  }
                  className="w-full bg-[#161616] border border-[#2A2A2A] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                  Net Weight
                </label>
                <input
                  type="text"
                  value={formData.weight || ""}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  className="w-full bg-[#161616] border border-[#2A2A2A] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>
          </AdminCard>
        </div>
      )}

      {/* TAB 5: MEDIA & IMAGES */}
      {activeTab === "images" && (
        <AdminCard title="High-Resolution Luggage Photography">
          <ImageUploader
            images={formData.images || []}
            thumbnail={formData.thumbnail || ""}
            onChange={(imgs, thumb) =>
              setFormData({ ...formData, images: imgs, thumbnail: thumb })
            }
          />
        </AdminCard>
      )}

      {/* TAB 6: SPECS */}
      {activeTab === "specs" && (
        <AdminCard title="Engineering & Hardware Specifications">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                Shell Alloy / Material
              </label>
              <input
                type="text"
                value={formData.specs?.shell || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    specs: { ...formData.specs!, shell: e.target.value },
                  })
                }
                className="w-full bg-[#161616] border border-[#2A2A2A] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                Wheel System
              </label>
              <input
                type="text"
                value={formData.specs?.wheels || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    specs: { ...formData.specs!, wheels: e.target.value },
                  })
                }
                className="w-full bg-[#161616] border border-[#2A2A2A] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                TSA Lock System
              </label>
              <input
                type="text"
                value={formData.specs?.lock || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    specs: { ...formData.specs!, lock: e.target.value },
                  })
                }
                className="w-full bg-[#161616] border border-[#2A2A2A] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                Telescopic Handle
              </label>
              <input
                type="text"
                value={formData.specs?.handle || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    specs: { ...formData.specs!, handle: e.target.value },
                  })
                }
                className="w-full bg-[#161616] border border-[#2A2A2A] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>
        </AdminCard>
      )}

      {/* TAB 7: SEO */}
      {activeTab === "seo" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AdminCard title="Search Engine Metadata">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                  Meta Title
                </label>
                <input
                  type="text"
                  value={formData.seo?.metaTitle || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      seo: { ...formData.seo!, metaTitle: e.target.value },
                    })
                  }
                  className="w-full bg-[#161616] border border-[#2A2A2A] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                  Meta Description
                </label>
                <textarea
                  rows={3}
                  value={formData.seo?.metaDescription || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      seo: { ...formData.seo!, metaDescription: e.target.value },
                    })
                  }
                  className="w-full bg-[#161616] border border-[#2A2A2A] rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>
          </AdminCard>

          <AdminCard title="Live Search Snippet Preview">
            <div className="p-4 rounded-xl bg-[#080808] border border-[#222] font-sans space-y-1">
              <span className="text-[11px] text-neutral-400 block font-mono">
                https://luxury-luggage.com/product/{formData.slug || "item"}
              </span>
              <h4 className="text-sm font-semibold text-[#8AB4F8] hover:underline cursor-pointer">
                {formData.seo?.metaTitle || formData.name}
              </h4>
              <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                {formData.seo?.metaDescription || formData.shortDescription}
              </p>
            </div>
          </AdminCard>
        </div>
      )}
    </form>
  );
};
