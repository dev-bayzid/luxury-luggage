"use client";

import React, { useState } from "react";
import { ADMIN_CUSTOMERS, ADMIN_ORDERS } from "@/data/adminMockData";
import { AdminCustomer } from "@/types/admin";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import { AdminBadge } from "@/components/admin/ui/AdminBadge";
import { Modal } from "@/components/ui/Modal";
import {
  Search,
  Users,
  Eye,
  Mail,
  Phone,
  MapPin,
  Package,
  Sparkles,
  Shield,
  Crown,
} from "lucide-react";
import { clsx } from "clsx";

export default function CustomersPage() {
  const [customers, setCustomers] = useState<AdminCustomer[]>(ADMIN_CUSTOMERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<AdminCustomer | null>(null);

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const customerOrders = selectedCustomer
    ? ADMIN_ORDERS.filter((o) => o.customerEmail === selectedCustomer.email)
    : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#1F1F1F]">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37]">
            VIP Client Registry & CRM
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight mt-0.5">
            Customer Directory
          </h1>
        </div>

        <div className="text-xs text-neutral-400 font-mono">
          Total Registered Clients: <strong className="text-white">4,290</strong>
        </div>
      </div>

      {/* Search */}
      <div className="relative w-full sm:w-80">
        <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search client name, email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-[#141414] border border-[#262626] rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37]"
        />
      </div>

      {/* Customers Table */}
      <AdminCard noPadding>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#181818] text-neutral-400 font-semibold uppercase tracking-wider text-[10px] border-b border-[#222222]">
              <tr>
                <th className="px-6 py-3.5">Client Profile</th>
                <th className="px-6 py-3.5">VIP Tier</th>
                <th className="px-6 py-3.5">Commissions</th>
                <th className="px-6 py-3.5">Lifetime Spend</th>
                <th className="px-6 py-3.5">Last Order</th>
                <th className="px-6 py-3.5">Joined</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#1F1F1F]">
              {filteredCustomers.map((cust) => (
                <tr key={cust.id} className="hover:bg-[#161616] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#7A6117] flex items-center justify-center text-black font-bold text-xs shrink-0 shadow-md">
                        {cust.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)}
                      </div>
                      <div>
                        <h4 className="font-bold text-white">{cust.name}</h4>
                        <p className="text-[10px] text-neutral-400">{cust.email}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <AdminBadge
                      variant={
                        cust.tier === "VIP First Class"
                          ? "gold"
                          : cust.tier === "Executive Voyager"
                          ? "info"
                          : "neutral"
                      }
                    >
                      {cust.tier}
                    </AdminBadge>
                  </td>

                  <td className="px-6 py-4 font-mono font-bold text-neutral-200">
                    {cust.totalOrders} orders
                  </td>

                  <td className="px-6 py-4 font-mono font-bold text-[#E5C058]">
                    ${cust.lifetimeSpend.toLocaleString()}
                  </td>

                  <td className="px-6 py-4 text-neutral-400 font-mono text-[11px]">
                    {cust.lastOrderDate}
                  </td>

                  <td className="px-6 py-4 text-neutral-400 font-mono text-[11px]">
                    {cust.joinedDate}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => setSelectedCustomer(cust)}
                      className="p-1.5 rounded-lg bg-[#202020] hover:bg-[#D4AF37] text-neutral-300 hover:text-black transition-colors"
                      title="View Dossier"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminCard>

      {/* Customer Profile Dossier Modal */}
      {selectedCustomer && (
        <Modal
          isOpen={Boolean(selectedCustomer)}
          onClose={() => setSelectedCustomer(null)}
          title="Client Concierge Dossier"
          subtitle={`Client ID: ${selectedCustomer.id}`}
          maxWidth="md"
          className="bg-[#141414] border-[#2A2A2A]"
        >
          <div className="space-y-6 text-xs">
            {/* Profile Overview */}
            <div className="p-4 rounded-2xl bg-[#181818] border border-[#262626] flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#7A6117] flex items-center justify-center text-black font-bold text-lg shadow-md shrink-0">
                {selectedCustomer.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white font-display">
                    {selectedCustomer.name}
                  </h3>
                  <AdminBadge variant="gold">{selectedCustomer.tier}</AdminBadge>
                </div>
                <p className="text-xs text-neutral-400 mt-0.5">{selectedCustomer.email}</p>
                <p className="text-[11px] text-neutral-400 mt-0.5">{selectedCustomer.phone}</p>
              </div>
            </div>

            {/* Lifetime Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-[#181818] border border-[#222] text-center">
                <span className="text-[10px] uppercase font-bold text-neutral-400 block">
                  Lifetime Value
                </span>
                <span className="text-lg font-mono font-extrabold text-[#E5C058] mt-0.5 block">
                  ${selectedCustomer.lifetimeSpend.toLocaleString()}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#181818] border border-[#222] text-center">
                <span className="text-[10px] uppercase font-bold text-neutral-400 block">
                  Total Commissions
                </span>
                <span className="text-lg font-mono font-extrabold text-white mt-0.5 block">
                  {selectedCustomer.totalOrders}
                </span>
              </div>
            </div>

            {/* Addresses */}
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider block">
                Registered Atelier Delivery Address
              </span>
              {selectedCustomer.addresses.map((addr, i) => (
                <div key={i} className="p-3 rounded-xl bg-[#181818] border border-[#222] space-y-1">
                  <span className="text-[10px] font-semibold text-[#D4AF37] block">
                    {addr.type}
                  </span>
                  <p className="text-neutral-300 leading-relaxed">
                    {addr.street}<br />
                    {addr.city}, {addr.postalCode} • {addr.country}
                  </p>
                </div>
              ))}
            </div>

            {/* Notes */}
            {selectedCustomer.notes && (
              <div className="p-3 rounded-xl bg-[#181818] border border-[#222]">
                <span className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-wider block mb-1">
                  Concierge Preferences & Notes
                </span>
                <p className="text-neutral-300 leading-relaxed">
                  {selectedCustomer.notes}
                </p>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}
