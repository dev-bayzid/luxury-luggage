"use client";

import React, { useState } from "react";
import { ADMIN_ORDERS } from "@/data/adminMockData";
import { AdminOrder, OrderStatus } from "@/types/admin";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import { AdminBadge } from "@/components/admin/ui/AdminBadge";
import { OrderDetailsModal } from "@/components/admin/orders/OrderDetailsModal";
import { InvoiceModal } from "@/components/admin/orders/InvoiceModal";
import {
  Search,
  SlidersHorizontal,
  Eye,
  Printer,
  Download,
  Filter,
  Package,
  Calendar,
} from "lucide-react";
import { clsx } from "clsx";

export default function OrdersPage() {
  const [orders, setOrders] = useState<AdminOrder[]>(ADMIN_ORDERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<string>("All");
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);
  const [invoiceOrder, setInvoiceOrder] = useState<AdminOrder | null>(null);

  const tabs = [
    "All",
    "Pending",
    "Paid",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];

  const filteredOrders = orders.filter((o) => {
    if (activeTab !== "All" && o.status !== activeTab) return false;
    if (
      searchQuery &&
      !o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !o.customerEmail.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;
    return true;
  });

  const handleUpdateStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  const getStatusBadgeVariant = (status: OrderStatus) => {
    switch (status) {
      case "Paid":
      case "Delivered":
        return "success" as const;
      case "Processing":
      case "Pending":
        return "warning" as const;
      case "Shipped":
        return "info" as const;
      case "Cancelled":
        return "danger" as const;
      default:
        return "neutral" as const;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#1F1F1F]">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37]">
            Fulfillment & VIP Commissions
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight mt-0.5">
            Order Management
          </h1>
        </div>

        <button
          onClick={() => alert("Downloading global dispatch manifest (PDF)...")}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#141414] hover:bg-[#1E1E1E] border border-[#242424] text-xs font-semibold text-neutral-300 hover:text-white transition-all shadow-sm self-start sm:self-auto"
        >
          <Download className="w-4 h-4 text-[#D4AF37]" />
          <span>Export Dispatch Manifest</span>
        </button>
      </div>

      {/* Tabs & Search Bar */}
      <div className="space-y-4">
        {/* Status Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none border-b border-[#1F1F1F]">
          {tabs.map((tab) => {
            const count =
              tab === "All"
                ? orders.length
                : orders.filter((o) => o.status === tab).length;
            const isActive = activeTab === tab;

            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={clsx(
                  "flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-t-xl transition-all whitespace-nowrap border-b-2",
                  isActive
                    ? "text-[#E5C058] border-[#D4AF37] bg-[#141414]"
                    : "text-neutral-400 border-transparent hover:text-neutral-200 hover:bg-[#111]"
                )}
              >
                <span>{tab}</span>
                <span
                  className={clsx(
                    "text-[10px] font-mono px-2 py-0.2 rounded-full",
                    isActive
                      ? "bg-[#D4AF37]/20 text-[#E5C058]"
                      : "bg-[#202020] text-neutral-400"
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search order number, client name, email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#141414] border border-[#262626] rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37]"
          />
        </div>
      </div>

      {/* Order Table */}
      <AdminCard noPadding>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#181818] text-neutral-400 font-semibold uppercase tracking-wider text-[10px] border-b border-[#222222]">
              <tr>
                <th className="px-6 py-3.5">Commission #</th>
                <th className="px-6 py-3.5">Date & Time</th>
                <th className="px-6 py-3.5">Client</th>
                <th className="px-6 py-3.5">Pieces</th>
                <th className="px-6 py-3.5">Total</th>
                <th className="px-6 py-3.5">Payment</th>
                <th className="px-6 py-3.5">Fulfillment</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#1F1F1F]">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-neutral-400">
                    No orders match your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-[#161616] transition-colors">
                    <td className="px-6 py-4 font-mono font-bold text-white">
                      {order.orderNumber}
                    </td>

                    <td className="px-6 py-4 text-neutral-400 text-[11px]">
                      {order.createdAt}
                    </td>

                    <td className="px-6 py-4">
                      <div className="font-semibold text-neutral-200">
                        {order.customerName}
                      </div>
                      <div className="text-[10px] text-neutral-400 truncate max-w-[160px]">
                        {order.customerEmail}
                      </div>
                    </td>

                    <td className="px-6 py-4 text-neutral-300">
                      {order.items.length} {order.items.length === 1 ? "piece" : "pieces"}
                    </td>

                    <td className="px-6 py-4 font-mono font-bold text-[#E5C058]">
                      ${order.total.toLocaleString()}
                    </td>

                    <td className="px-6 py-4">
                      <AdminBadge
                        variant={order.paymentStatus === "Paid" ? "success" : "warning"}
                        size="sm"
                      >
                        {order.paymentStatus}
                      </AdminBadge>
                    </td>

                    <td className="px-6 py-4">
                      <AdminBadge variant={getStatusBadgeVariant(order.status)} dot>
                        {order.status}
                      </AdminBadge>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="p-1.5 rounded-lg bg-[#202020] hover:bg-[#D4AF37] text-neutral-300 hover:text-black transition-colors"
                          title="View Order Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => setInvoiceOrder(order)}
                          className="p-1.5 rounded-lg bg-[#202020] hover:bg-[#1E1E1E] text-neutral-300 hover:text-white transition-colors"
                          title="Print Invoice"
                        >
                          <Printer className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </AdminCard>

      {/* Details & Invoice Modals */}
      <OrderDetailsModal
        order={selectedOrder}
        isOpen={Boolean(selectedOrder)}
        onClose={() => setSelectedOrder(null)}
        onUpdateStatus={handleUpdateStatus}
        onOpenInvoice={(ord) => {
          setSelectedOrder(null);
          setInvoiceOrder(ord);
        }}
      />

      <InvoiceModal
        order={invoiceOrder}
        isOpen={Boolean(invoiceOrder)}
        onClose={() => setInvoiceOrder(null)}
      />
    </div>
  );
}
