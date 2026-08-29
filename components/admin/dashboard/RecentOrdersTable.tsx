"use client";

import React from "react";
import Link from "next/link";
import { AdminCard } from "../ui/AdminCard";
import { AdminBadge } from "../ui/AdminBadge";
import { ADMIN_ORDERS } from "@/data/adminMockData";
import { ArrowRight, ExternalLink } from "lucide-react";

export const RecentOrdersTable: React.FC = () => {
  const getStatusBadgeVariant = (status: string) => {
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
    <AdminCard
      title="Latest Commissions & Orders"
      subtitle="Real-time transactions from global boutique clients"
      action={
        <Link
          href="/admin/orders"
          className="text-xs font-semibold text-[#D4AF37] hover:text-[#E5C058] flex items-center gap-1 transition-colors"
        >
          <span>View All Orders</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      }
      noPadding
    >
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#181818] text-neutral-400 font-semibold uppercase tracking-wider text-[10px] border-b border-[#222222]">
            <tr>
              <th className="px-6 py-3.5">Order</th>
              <th className="px-6 py-3.5">Client</th>
              <th className="px-6 py-3.5">Items</th>
              <th className="px-6 py-3.5">Total</th>
              <th className="px-6 py-3.5">Status</th>
              <th className="px-6 py-3.5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1F1F1F]">
            {ADMIN_ORDERS.slice(0, 5).map((order) => (
              <tr key={order.id} className="hover:bg-[#161616] transition-colors">
                <td className="px-6 py-4 font-mono font-bold text-white">
                  {order.orderNumber}
                </td>
                <td className="px-6 py-4">
                  <div className="font-semibold text-neutral-200">{order.customerName}</div>
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
                  <AdminBadge variant={getStatusBadgeVariant(order.status)} dot>
                    {order.status}
                  </AdminBadge>
                </td>
                <td className="px-6 py-4 text-right">
                  <Link
                    href={`/admin/orders?id=${order.id}`}
                    className="p-1.5 rounded-lg bg-[#202020] hover:bg-[#D4AF37] text-neutral-300 hover:text-black transition-colors inline-block"
                    title="View Details"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminCard>
  );
};
