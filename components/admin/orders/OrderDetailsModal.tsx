"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AdminOrder, OrderStatus } from "@/types/admin";
import { Modal } from "@/components/ui/Modal";
import { AdminBadge } from "../ui/AdminBadge";
import {
  Package,
  Truck,
  CreditCard,
  MapPin,
  Clock,
  User,
  Check,
  FileText,
  Send,
  Printer,
} from "lucide-react";
import { clsx } from "clsx";

interface OrderDetailsModalProps {
  order: AdminOrder | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus: (orderId: string, newStatus: OrderStatus) => void;
  onOpenInvoice: (order: AdminOrder) => void;
}

export const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  order,
  isOpen,
  onClose,
  onUpdateStatus,
  onOpenInvoice,
}) => {
  if (!order) return null;

  const statuses: OrderStatus[] = [
    "Pending",
    "Paid",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Commission #${order.orderNumber}`}
      subtitle={`Placed on ${order.createdAt}`}
      maxWidth="lg"
      className="bg-[#141414] border-[#2A2A2A]"
    >
      <div className="space-y-6">
        {/* Status Transition Control Bar */}
        <div className="p-4 rounded-2xl bg-[#181818] border border-[#262626] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs text-neutral-400 font-medium">Order Status:</span>
            <select
              value={order.status}
              onChange={(e) => onUpdateStatus(order.id, e.target.value as OrderStatus)}
              className="bg-[#101010] border border-[#333] rounded-xl px-3 py-1.5 text-xs font-bold text-[#E5C058] focus:outline-none focus:border-[#D4AF37]"
            >
              {statuses.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => onOpenInvoice(order)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#222] hover:bg-[#D4AF37] text-neutral-300 hover:text-black font-semibold text-xs transition-colors self-start sm:self-auto"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Generate Invoice</span>
          </button>
        </div>

        {/* Client & Shipping Grids */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Customer */}
          <div className="p-4 rounded-2xl bg-[#181818] border border-[#242424] space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
              <User className="w-3.5 h-3.5" />
              <span>Client Concierge Details</span>
            </div>
            <p className="font-bold text-sm text-white">{order.customerName}</p>
            <p className="text-xs text-neutral-400">{order.customerEmail}</p>
            {order.customerPhone && (
              <p className="text-xs text-neutral-400">{order.customerPhone}</p>
            )}
            <div className="pt-2">
              <span className="text-[10px] text-neutral-400 block font-mono">
                Payment: {order.paymentMethod}
              </span>
            </div>
          </div>

          {/* Shipping */}
          <div className="p-4 rounded-2xl bg-[#181818] border border-[#242424] space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
              <MapPin className="w-3.5 h-3.5" />
              <span>Destination & Tracking</span>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              {order.shippingAddress.street}<br />
              {order.shippingAddress.city}, {order.shippingAddress.state ? `${order.shippingAddress.state} ` : ""}{order.shippingAddress.postalCode}<br />
              {order.shippingAddress.country}
            </p>
            <div className="pt-1 text-[11px] font-mono text-neutral-400">
              Carrier: <span className="text-white font-semibold">{order.carrier}</span><br />
              Tracking: <span className="text-[#E5C058] font-bold">{order.trackingNumber}</span>
            </div>
          </div>
        </div>

        {/* Item Breakdown */}
        <div className="space-y-3">
          <h4 className="text-xs uppercase font-bold tracking-wider text-neutral-400">
            Commissioned Luggage ({order.items.length} pieces)
          </h4>
          <div className="space-y-2">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-xl bg-[#181818] border border-[#242424] flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-neutral-900 border border-[#333] shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white">{item.name}</h5>
                    <p className="text-[10px] text-neutral-400 font-mono">
                      SKU: {item.sku} • Finish: {item.color} • {item.size}
                    </p>
                  </div>
                </div>

                <div className="text-right font-mono">
                  <span className="text-xs font-bold text-[#E5C058] block">
                    ${item.price} × {item.quantity}
                  </span>
                  <span className="text-[10px] text-neutral-400">
                    ${(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Financial Summary */}
        <div className="p-4 rounded-2xl bg-[#181818] border border-[#242424] flex justify-between items-center text-xs">
          <div className="space-y-0.5 text-neutral-400">
            <span>Subtotal: ${order.subtotal}</span> •{" "}
            <span>Tax: ${order.tax}</span> •{" "}
            <span>Courier: {order.shipping === 0 ? "Complimentary" : `$${order.shipping}`}</span>
          </div>
          <div className="text-right">
            <span className="text-base font-bold font-mono text-[#D4AF37]">
              Total: ${order.total.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </Modal>
  );
};
