"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ADMIN_PRODUCTS } from "@/data/adminMockData";
import { AdminProduct, ProductStatus } from "@/types/admin";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import { AdminBadge } from "@/components/admin/ui/AdminBadge";
import {
  Plus,
  Search,
  SlidersHorizontal,
  Edit,
  Copy,
  Trash2,
  Eye,
  CheckCircle,
  Clock,
  MoreVertical,
  Luggage,
  Sparkles,
} from "lucide-react";
import { clsx } from "clsx";

export default function ProductsPage() {
  const [products, setProducts] = useState<AdminProduct[]>(ADMIN_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Filtering
  const filteredProducts = products.filter((p) => {
    if (
      searchQuery &&
      !p.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !p.sku.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;
    if (selectedCategory !== "All" && p.category !== selectedCategory)
      return false;
    if (selectedStatus !== "All" && p.status !== selectedStatus)
      return false;
    return true;
  });

  // Action handlers
  const handleToggleStatus = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const nextStatus: ProductStatus =
            p.status === "Published" ? "Draft" : "Published";
          return { ...p, status: nextStatus };
        }
        return p;
      })
    );
  };

  const handleDuplicate = (prod: AdminProduct) => {
    const duplicated: AdminProduct = {
      ...prod,
      id: `aur-${Date.now()}`,
      sku: `${prod.sku}-COPY`,
      name: `${prod.name} (Copy)`,
      slug: `${prod.slug}-copy`,
      status: "Draft",
      createdAt: new Date().toISOString().split("T")[0],
    };
    setProducts([duplicated, ...products]);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you wish to delete this luggage piece?")) {
      setProducts(products.filter((p) => p.id !== id));
      setSelectedIds(selectedIds.filter((sid) => sid !== id));
    }
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredProducts.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredProducts.map((p) => p.id));
    }
  };

  const toggleSelectOne = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((sid) => sid !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#1F1F1F]">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37]">
            Luggage Inventory & Catalog
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight mt-0.5">
            Product Management
          </h1>
        </div>

        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B89328] hover:from-[#E5C058] hover:to-[#D4AF37] text-neutral-950 font-bold text-xs shadow-gold-glow transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add New Luggage</span>
        </Link>
      </div>

      {/* Filter and Control Bar */}
      <div className="bg-[#121212] border border-[#222222] p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search luggage name, SKU..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#181818] border border-[#2A2A2A] rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        {/* Dropdown Filters */}
        <div className="flex items-center gap-3 w-full md:w-auto flex-wrap">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-[#181818] border border-[#2A2A2A] rounded-xl px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-[#D4AF37]"
          >
            <option value="All">All Categories</option>
            <option value="Cabin Luggage">Cabin Luggage</option>
            <option value="Checked Luggage">Checked Luggage</option>
            <option value="Aluminum Trunks">Aluminum Trunks</option>
            <option value="Hybrid Spinners">Hybrid Spinners</option>
            <option value="Heritage Cases">Heritage Cases</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-[#181818] border border-[#2A2A2A] rounded-xl px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-[#D4AF37]"
          >
            <option value="All">All Statuses</option>
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
          </select>

          {selectedIds.length > 0 && (
            <button
              onClick={() => {
                if (confirm(`Delete ${selectedIds.length} selected pieces?`)) {
                  setProducts(products.filter((p) => !selectedIds.includes(p.id)));
                  setSelectedIds([]);
                }
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold hover:bg-red-500 hover:text-white transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete ({selectedIds.length})</span>
            </button>
          )}
        </div>
      </div>

      {/* Product Table Card */}
      <AdminCard noPadding>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#181818] text-neutral-400 font-semibold uppercase tracking-wider text-[10px] border-b border-[#222222]">
              <tr>
                <th className="px-4 py-3.5 w-10 text-center">
                  <input
                    type="checkbox"
                    checked={
                      selectedIds.length === filteredProducts.length &&
                      filteredProducts.length > 0
                    }
                    onChange={toggleSelectAll}
                    className="w-3.5 h-3.5 accent-[#D4AF37] rounded"
                  />
                </th>
                <th className="px-4 py-3.5">Piece</th>
                <th className="px-4 py-3.5">SKU</th>
                <th className="px-4 py-3.5">Category</th>
                <th className="px-4 py-3.5">Price</th>
                <th className="px-4 py-3.5">Stock</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#1F1F1F]">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-neutral-400">
                    No luggage pieces match your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => {
                  const isSelected = selectedIds.includes(product.id);
                  const isLowStock = product.stock <= 5;

                  return (
                    <tr
                      key={product.id}
                      className={clsx(
                        "hover:bg-[#161616] transition-colors group",
                        isSelected && "bg-[#181818]"
                      )}
                    >
                      <td className="px-4 py-4 text-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSelectOne(product.id)}
                          className="w-3.5 h-3.5 accent-[#D4AF37] rounded"
                        />
                      </td>

                      {/* Product Thumbnail + Name */}
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-neutral-900 border border-[#282828] shrink-0">
                            <Image
                              src={product.thumbnail || product.images[0]}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <Link
                              href={`/admin/products/${product.id}/edit`}
                              className="font-bold text-neutral-200 hover:text-[#E5C058] transition-colors line-clamp-1"
                            >
                              {product.name}
                            </Link>
                            <div className="flex items-center gap-2 mt-0.5">
                              {product.isFeatured && (
                                <span className="text-[9px] uppercase font-bold tracking-wider text-[#D4AF37] bg-[#D4AF37]/10 px-1.5 py-0.2 rounded">
                                  Featured
                                </span>
                              )}
                              <span className="text-[10px] text-neutral-400 truncate max-w-[200px]">
                                {product.shortDescription}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* SKU */}
                      <td className="px-4 py-4 font-mono text-[11px] text-neutral-400">
                        {product.sku}
                      </td>

                      {/* Category */}
                      <td className="px-4 py-4 text-neutral-300">
                        {product.category}
                      </td>

                      {/* Price */}
                      <td className="px-4 py-4">
                        <div className="font-mono font-bold text-white">
                          ${product.price}
                        </div>
                        {product.comparePrice && (
                          <div className="text-[10px] font-mono text-neutral-400 line-through">
                            ${product.comparePrice}
                          </div>
                        )}
                      </td>

                      {/* Stock */}
                      <td className="px-4 py-4">
                        <span
                          className={clsx(
                            "font-mono font-bold text-xs",
                            isLowStock ? "text-amber-400" : "text-neutral-300"
                          )}
                        >
                          {product.stock} units
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-4">
                        <button
                          onClick={() => handleToggleStatus(product.id)}
                          title="Click to toggle status"
                        >
                          <AdminBadge
                            variant={product.status === "Published" ? "success" : "neutral"}
                            dot
                          >
                            {product.status}
                          </AdminBadge>
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link
                            href={`/admin/products/${product.id}/edit`}
                            className="p-1.5 rounded-lg bg-[#202020] hover:bg-[#D4AF37] text-neutral-300 hover:text-black transition-colors"
                            title="Edit Piece"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </Link>

                          <button
                            onClick={() => handleDuplicate(product)}
                            className="p-1.5 rounded-lg bg-[#202020] hover:bg-[#1E1E1E] text-neutral-300 hover:text-white transition-colors"
                            title="Duplicate"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => handleDelete(product.id)}
                            className="p-1.5 rounded-lg bg-[#202020] hover:bg-red-500/20 text-neutral-400 hover:text-red-400 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </AdminCard>
    </div>
  );
}
