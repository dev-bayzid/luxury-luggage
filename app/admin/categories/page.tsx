"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ADMIN_CATEGORIES } from "@/data/adminMockData";
import { AdminCategory } from "@/types/admin";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import { AdminBadge } from "@/components/admin/ui/AdminBadge";
import { Modal } from "@/components/ui/Modal";
import {
  Plus,
  FolderTree,
  Edit,
  Trash2,
  ChevronRight,
  Sparkles,
  Layers,
  Image as ImageIcon,
} from "lucide-react";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<AdminCategory[]>(ADMIN_CATEGORIES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<AdminCategory | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    headline: "",
    description: "",
    image: "https://images.unsplash.com/photo-1581553680321-4fffae59fccd?q=80&w=800&auto=format&fit=crop",
    badge: "New Line",
    isFeatured: true,
  });

  const handleOpenNew = () => {
    setEditingCategory(null);
    setFormData({
      name: "",
      slug: "",
      headline: "",
      description: "",
      image: "https://images.unsplash.com/photo-1581553680321-4fffae59fccd?q=80&w=800&auto=format&fit=crop",
      badge: "Atelier Drop",
      isFeatured: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cat: AdminCategory) => {
    setEditingCategory(cat);
    setFormData({
      name: cat.name,
      slug: cat.slug,
      headline: cat.headline,
      description: cat.description,
      image: cat.image,
      badge: cat.badge || "",
      isFeatured: cat.isFeatured,
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCategory) {
      setCategories(
        categories.map((c) =>
          c.id === editingCategory.id
            ? { ...c, ...formData }
            : c
        )
      );
    } else {
      const newCat: AdminCategory = {
        id: `cat-${Date.now()}`,
        itemCount: 0,
        ...formData,
      };
      setCategories([...categories, newCat]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this luggage category?")) {
      setCategories(categories.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#1F1F1F]">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37]">
            Catalog Hierarchy & Taxonomy
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight mt-0.5">
            Category Management
          </h1>
        </div>

        <button
          onClick={handleOpenNew}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B89328] hover:from-[#E5C058] hover:to-[#D4AF37] text-neutral-950 font-bold text-xs shadow-gold-glow transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>New Category</span>
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <AdminCard key={cat.id} noPadding className="overflow-hidden group">
            {/* Featured Image Header */}
            <div className="relative aspect-[16/9] w-full bg-neutral-900 overflow-hidden">
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-black/40 to-transparent" />

              <div className="absolute top-3 left-3 flex items-center gap-2">
                {cat.badge && (
                  <span className="text-[9px] uppercase font-bold tracking-wider bg-[#D4AF37] text-black px-2 py-0.5 rounded-md shadow-md">
                    {cat.badge}
                  </span>
                )}
                {cat.isFeatured && (
                  <span className="text-[9px] uppercase font-bold tracking-wider bg-black/60 backdrop-blur-md text-white px-2 py-0.5 rounded-md border border-white/20">
                    Featured
                  </span>
                )}
              </div>

              <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white drop-shadow">
                    {cat.name}
                  </h3>
                  <span className="text-[10px] text-neutral-300 font-mono">
                    /{cat.slug}
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-[#E5C058] bg-black/70 backdrop-blur px-2 py-1 rounded-lg border border-[#333]">
                  {cat.itemCount} pieces
                </span>
              </div>
            </div>

            {/* Body */}
            <div className="p-5 space-y-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-wider block">
                  {cat.headline}
                </span>
                <p className="text-xs text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              {/* Subcategories */}
              {cat.subcategories && cat.subcategories.length > 0 && (
                <div className="pt-2 border-t border-[#1F1F1F]">
                  <span className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider block mb-2">
                    Nested Classifications
                  </span>
                  <div className="space-y-1">
                    {cat.subcategories.map((sub) => (
                      <div
                        key={sub.id}
                        className="flex items-center justify-between text-xs py-1 px-2 rounded-lg bg-[#181818] border border-[#222]"
                      >
                        <span className="text-neutral-300">{sub.name}</span>
                        <span className="text-[10px] text-neutral-400 font-mono">
                          {sub.itemCount} items
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Footer Actions */}
              <div className="pt-3 border-t border-[#1F1F1F] flex items-center justify-between">
                <span className="text-[10px] text-neutral-400 font-mono">
                  ID: {cat.id}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEdit(cat)}
                    className="p-1.5 rounded-lg bg-[#1C1C1C] hover:bg-[#D4AF37] text-neutral-300 hover:text-black transition-colors"
                    title="Edit Category"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="p-1.5 rounded-lg bg-[#1C1C1C] hover:bg-red-500/20 text-neutral-400 hover:text-red-400 transition-colors"
                    title="Delete Category"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </AdminCard>
        ))}
      </div>

      {/* Category Creation / Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCategory ? "Edit Category" : "Commission New Luggage Category"}
        subtitle="Catalog classification & featured store presentation"
        maxWidth="md"
        className="bg-[#141414] border-[#2A2A2A]"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1">
              Category Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => {
                const name = e.target.value;
                const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                setFormData({ ...formData, name, slug: formData.slug ? formData.slug : slug });
              }}
              placeholder="e.g. Aluminum Trunks"
              className="w-full bg-[#181818] border border-[#333] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1">
              URL Slug
            </label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full bg-[#181818] border border-[#333] rounded-xl px-3.5 py-2 text-xs text-neutral-200 font-mono focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1">
              Headline
            </label>
            <input
              type="text"
              value={formData.headline}
              onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
              placeholder="e.g. Deep-Well Architecture for Grand Tours"
              className="w-full bg-[#181818] border border-[#333] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1">
              Description
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-[#181818] border border-[#333] rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1">
              Banner Image URL
            </label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full bg-[#181818] border border-[#333] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <label className="flex items-center gap-2 text-xs text-neutral-200 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isFeatured}
                onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                className="w-4 h-4 accent-[#D4AF37] rounded"
              />
              <span>Feature on Storefront Grid</span>
            </label>

            <button
              type="submit"
              className="px-5 py-2 bg-[#D4AF37] hover:bg-[#E5C058] text-black font-bold text-xs rounded-xl shadow-gold-glow transition-all"
            >
              {editingCategory ? "Update Category" : "Create Category"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
