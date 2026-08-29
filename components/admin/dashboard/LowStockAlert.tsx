"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { AdminCard } from "../ui/AdminCard";
import { AdminBadge } from "../ui/AdminBadge";
import { ADMIN_INVENTORY } from "@/data/adminMockData";
import { AlertTriangle, ArrowRight, Plus } from "lucide-react";

export const LowStockAlert: React.FC = () => {
  const lowStockItems = ADMIN_INVENTORY.filter((item) => item.stock <= item.lowStockThreshold);

  return (
    <AdminCard
      title={
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          <span className="text-sm font-semibold tracking-wide text-neutral-100 font-display">
            Low Stock Atelier Warnings
          </span>
        </div>
      }
      subtitle="Pieces requiring immediate production or warehouse reallocation"
      action={
        <Link
          href="/admin/inventory"
          className="text-xs font-semibold text-[#D4AF37] hover:text-[#E5C058] flex items-center gap-1 transition-colors"
        >
          <span>Inventory Hub</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      }
      noPadding
    >
      <div className="divide-y divide-[#1F1F1F]">
        {lowStockItems.map((item) => (
          <div key={item.id} className="p-4 flex items-center justify-between gap-4 hover:bg-[#161616] transition-colors">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-neutral-900 border border-[#2A2A2A] shrink-0">
                <Image src={item.image} alt={item.productName} fill className="object-cover" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-white truncate">{item.productName}</h4>
                <p className="text-[10px] text-neutral-400 font-mono mt-0.5">
                  SKU: {item.sku} • {item.category}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="text-right">
                <span className="text-xs font-bold font-mono text-amber-400 block">
                  {item.stock} left
                </span>
                <span className="text-[10px] text-neutral-400 block">
                  Threshold: {item.lowStockThreshold}
                </span>
              </div>

              <Link
                href="/admin/inventory"
                className="p-1.5 rounded-lg bg-[#1E1E1E] hover:bg-[#D4AF37] text-neutral-300 hover:text-black transition-colors"
                title="Quick Reorder"
              >
                <Plus className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </AdminCard>
  );
};
