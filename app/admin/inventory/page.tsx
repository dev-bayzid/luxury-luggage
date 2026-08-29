"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ADMIN_INVENTORY } from "@/data/adminMockData";
import { AdminInventoryItem } from "@/types/admin";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import { AdminBadge } from "@/components/admin/ui/AdminBadge";
import {
  Warehouse,
  AlertTriangle,
  Plus,
  Minus,
  RotateCcw,
  Building2,
  Globe,
  Search,
  CheckCircle,
} from "lucide-react";
import { clsx } from "clsx";

export default function InventoryPage() {
  const [inventory, setInventory] = useState<AdminInventoryItem[]>(ADMIN_INVENTORY);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedWarehouse, setSelectedWarehouse] = useState<string>("All");

  const filteredInventory = inventory.filter((item) => {
    if (
      searchQuery &&
      !item.productName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !item.sku.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;
    return true;
  });

  const handleAdjustStock = (id: string, delta: number) => {
    setInventory((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextStock = Math.max(0, item.stock + delta);
          const nextStatus =
            nextStock === 0
              ? "Out of Stock"
              : nextStock <= item.lowStockThreshold
              ? "Low Stock"
              : "In Stock";
          return {
            ...item,
            stock: nextStock,
            status: nextStatus,
          };
        }
        return item;
      })
    );
  };

  const handleRestockModal = (item: AdminInventoryItem) => {
    const qty = prompt(`How many units to commission for ${item.productName}?`, "10");
    if (qty && !isNaN(Number(qty))) {
      handleAdjustStock(item.id, Number(qty));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#1F1F1F]">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37]">
            Global Atelier Warehouses & Stock Control
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight mt-0.5">
            Inventory Management
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-xl bg-[#141414] border border-[#242424] text-xs font-mono text-neutral-300">
            Zürich Hub: <span className="text-[#D4AF37] font-bold">18 units</span>
          </div>
          <div className="px-3.5 py-1.5 rounded-xl bg-[#141414] border border-[#242424] text-xs font-mono text-neutral-300">
            Frankfurt Hub: <span className="text-[#D4AF37] font-bold">14 units</span>
          </div>
        </div>
      </div>

      {/* Warehouse Hubs Summary Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { name: "Zürich Flagship Atelier", code: "ZUR-01", country: "Switzerland", stock: 18, flag: "🇨🇭" },
          { name: "Frankfurt Logistics Hub", code: "FRA-02", country: "Germany", stock: 14, flag: "🇩🇪" },
          { name: "New York Fifth Ave Suite", code: "NYC-03", country: "United States", stock: 10, flag: "🇺🇸" },
          { name: "Tokyo Ginza Vault", code: "TYO-04", country: "Japan", stock: 7, flag: "🇯🇵" },
        ].map((hub) => (
          <div key={hub.code} className="p-4 rounded-2xl bg-[#121212] border border-[#222222] space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-base">{hub.flag}</span>
              <span className="text-[10px] font-mono text-neutral-400 font-bold">{hub.code}</span>
            </div>
            <h4 className="text-xs font-bold text-white truncate mt-1">{hub.name}</h4>
            <p className="text-[11px] text-neutral-400 font-mono">
              Available Units: <strong className="text-[#E5C058]">{hub.stock}</strong>
            </p>
          </div>
        ))}
      </div>

      {/* Search Bar */}
      <div className="relative w-full sm:w-80">
        <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search inventory pieces, SKU..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-[#141414] border border-[#262626] rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37]"
        />
      </div>

      {/* Inventory Table */}
      <AdminCard noPadding>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#181818] text-neutral-400 font-semibold uppercase tracking-wider text-[10px] border-b border-[#222222]">
              <tr>
                <th className="px-6 py-3.5">Luggage Masterpiece</th>
                <th className="px-6 py-3.5">SKU</th>
                <th className="px-6 py-3.5">Global Stock</th>
                <th className="px-6 py-3.5">Warehouses (ZUR / FRA / NYC / TYO)</th>
                <th className="px-6 py-3.5">Threshold</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Quick Adjust</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#1F1F1F]">
              {filteredInventory.map((item) => (
                <tr key={item.id} className="hover:bg-[#161616] transition-colors">
                  {/* Piece */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-neutral-900 border border-[#282828] shrink-0">
                        <Image src={item.image} alt={item.productName} fill className="object-cover" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white">{item.productName}</h4>
                        <span className="text-[10px] text-neutral-400">{item.category}</span>
                      </div>
                    </div>
                  </td>

                  {/* SKU */}
                  <td className="px-6 py-4 font-mono text-[11px] text-neutral-400">
                    {item.sku}
                  </td>

                  {/* Stock */}
                  <td className="px-6 py-4 font-mono font-bold text-sm text-white">
                    {item.stock} units
                  </td>

                  {/* Warehouses breakdown */}
                  <td className="px-6 py-4 font-mono text-[11px] text-neutral-300">
                    <span className="text-[#D4AF37] font-bold">{item.warehouses.zurich}</span> /{" "}
                    <span>{item.warehouses.frankfurt}</span> /{" "}
                    <span>{item.warehouses.newYork}</span> /{" "}
                    <span>{item.warehouses.tokyo}</span>
                  </td>

                  {/* Threshold */}
                  <td className="px-6 py-4 font-mono text-neutral-400 text-[11px]">
                    {item.lowStockThreshold} units
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <AdminBadge
                      variant={
                        item.status === "In Stock"
                          ? "success"
                          : item.status === "Low Stock"
                          ? "warning"
                          : "danger"
                      }
                      dot
                    >
                      {item.status}
                    </AdminBadge>
                  </td>

                  {/* Quick Adjust buttons */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleAdjustStock(item.id, -1)}
                        className="p-1.5 rounded-lg bg-[#202020] hover:bg-[#282828] text-neutral-300 hover:text-white transition-colors"
                        title="Reduce stock by 1"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleAdjustStock(item.id, 1)}
                        className="p-1.5 rounded-lg bg-[#202020] hover:bg-[#282828] text-neutral-300 hover:text-white transition-colors"
                        title="Increase stock by 1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleRestockModal(item)}
                        className="px-2.5 py-1 rounded-lg bg-[#D4AF37]/15 hover:bg-[#D4AF37] text-[#E5C058] hover:text-black font-semibold text-[11px] transition-colors border border-[#D4AF37]/30"
                        title="Batch Reorder"
                      >
                        Batch Reorder
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminCard>
    </div>
  );
}
