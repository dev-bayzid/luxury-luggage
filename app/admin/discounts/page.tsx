"use client";

import React, { useState } from "react";
import { ADMIN_DISCOUNTS } from "@/data/adminMockData";
import { AdminDiscount } from "@/types/admin";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import { AdminBadge } from "@/components/admin/ui/AdminBadge";
import { Modal } from "@/components/ui/Modal";
import {
  Plus,
  Percent,
  Tag,
  Copy,
  Trash2,
  Calendar,
  CheckCircle2,
  DollarSign,
} from "lucide-react";

export default function DiscountsPage() {
  const [discounts, setDiscounts] = useState<AdminDiscount[]>(ADMIN_DISCOUNTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    code: "",
    type: "Percentage" as "Percentage" | "Fixed Amount",
    value: 15,
    minOrderValue: 500,
    usageLimit: 300,
    startDate: "2026-03-01",
    endDate: "2026-12-31",
    isActive: true,
    description: "",
  });

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleToggleActive = (id: string) => {
    setDiscounts(
      discounts.map((d) => (d.id === id ? { ...d, isActive: !d.isActive } : d))
    );
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this discount coupon?")) {
      setDiscounts(discounts.filter((d) => d.id !== id));
    }
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const newDiscount: AdminDiscount = {
      id: `disc-${Date.now()}`,
      usedCount: 0,
      ...formData,
    };
    setDiscounts([newDiscount, ...discounts]);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#1F1F1F]">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37]">
            Privilege Vouchers & Promotions
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight mt-0.5">
            Discount Engine
          </h1>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B89328] hover:from-[#E5C058] hover:to-[#D4AF37] text-neutral-950 font-bold text-xs shadow-gold-glow transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>New Privilege Voucher</span>
        </button>
      </div>

      {/* Discounts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {discounts.map((disc) => (
          <AdminCard key={disc.id} noPadding className="p-6 space-y-4">
            {/* Header Voucher Pill */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-[#1C1C1C] border border-[#2D2A1E] text-[#D4AF37]">
                  {disc.type === "Percentage" ? (
                    <Percent className="w-4 h-4" />
                  ) : (
                    <DollarSign className="w-4 h-4" />
                  )}
                </div>
                <div>
                  <span className="font-mono font-extrabold text-sm text-white tracking-wider">
                    {disc.code}
                  </span>
                  <span className="text-[10px] text-neutral-400 block">
                    {disc.type === "Percentage"
                      ? `${disc.value}% off commission`
                      : `$${disc.value} flat credit`}
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleToggleActive(disc.id)}
                title="Toggle Active"
              >
                <AdminBadge variant={disc.isActive ? "success" : "neutral"} dot>
                  {disc.isActive ? "Active" : "Paused"}
                </AdminBadge>
              </button>
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed min-h-[36px]">
              {disc.description}
            </p>

            {/* Criteria */}
            <div className="pt-2 border-t border-[#1F1F1F] space-y-1.5 text-xs text-neutral-400">
              <div className="flex justify-between">
                <span>Minimum Order:</span>
                <span className="font-mono text-neutral-200">${disc.minOrderValue}</span>
              </div>
              <div className="flex justify-between">
                <span>Redemptions:</span>
                <span className="font-mono text-neutral-200">
                  {disc.usedCount} {disc.usageLimit ? `/ ${disc.usageLimit}` : "uses"}
                </span>
              </div>
              {disc.endDate && (
                <div className="flex justify-between">
                  <span>Valid Until:</span>
                  <span className="font-mono text-neutral-200">{disc.endDate}</span>
                </div>
              )}
            </div>

            {/* Footer Buttons */}
            <div className="pt-3 border-t border-[#1F1F1F] flex items-center justify-between">
              <button
                onClick={() => handleCopy(disc.code)}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#D4AF37] hover:underline"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copiedCode === disc.code ? "Copied!" : "Copy Code"}</span>
              </button>

              <button
                onClick={() => handleDelete(disc.id)}
                className="p-1.5 rounded-lg bg-[#1C1C1C] hover:bg-red-500/20 text-neutral-400 hover:text-red-400 transition-colors"
                title="Delete Voucher"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </AdminCard>
        ))}
      </div>

      {/* Create Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create Privilege Voucher"
        subtitle="Configure client promotional codes & volume privileges"
        maxWidth="md"
        className="bg-[#141414] border-[#2A2A2A]"
      >
        <form onSubmit={handleCreate} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold uppercase tracking-wider text-neutral-300 mb-1">
              Voucher Code *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. VIPSUITE25"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
              className="w-full bg-[#181818] border border-[#333] rounded-xl px-3.5 py-2 text-xs font-mono font-bold text-[#E5C058] focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold uppercase tracking-wider text-neutral-300 mb-1">
                Discount Type
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as typeof formData.type })}
                className="w-full bg-[#181818] border border-[#333] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="Percentage">Percentage (%)</option>
                <option value="Fixed Amount">Fixed Amount ($)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold uppercase tracking-wider text-neutral-300 mb-1">
                Value ({formData.type === "Percentage" ? "%" : "$"})
              </label>
              <input
                type="number"
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: Number(e.target.value) })}
                className="w-full bg-[#181818] border border-[#333] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold uppercase tracking-wider text-neutral-300 mb-1">
                Min. Order ($)
              </label>
              <input
                type="number"
                value={formData.minOrderValue}
                onChange={(e) => setFormData({ ...formData, minOrderValue: Number(e.target.value) })}
                className="w-full bg-[#181818] border border-[#333] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block font-bold uppercase tracking-wider text-neutral-300 mb-1">
                Usage Limit
              </label>
              <input
                type="number"
                value={formData.usageLimit}
                onChange={(e) => setFormData({ ...formData, usageLimit: Number(e.target.value) })}
                className="w-full bg-[#181818] border border-[#333] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold uppercase tracking-wider text-neutral-300 mb-1">
              Description / Notes
            </label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="e.g. 15% privilege code on complete luggage sets."
              className="w-full bg-[#181818] border border-[#333] rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#D4AF37] hover:bg-[#E5C058] text-black font-bold text-xs rounded-xl shadow-gold-glow transition-all"
            >
              Create Voucher
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
