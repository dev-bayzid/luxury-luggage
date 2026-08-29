"use client";

import React from "react";
import Image from "next/image";
import { AdminOrder } from "@/types/admin";
import { Modal } from "@/components/ui/Modal";
import { Printer, Download, ShieldCheck, Mail } from "lucide-react";

interface InvoiceModalProps {
  order: AdminOrder | null;
  isOpen: boolean;
  onClose: () => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({
  order,
  isOpen,
  onClose,
}) => {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="lg"
      className="bg-[#141414] border-[#2A2A2A] p-0 overflow-hidden"
    >
      {/* Top Action Bar */}
      <div className="p-4 bg-[#181818] border-b border-[#242424] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
            Official Commercial Invoice
          </span>
          <span className="text-xs text-neutral-400 font-mono">
            #{order.orderNumber}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#D4AF37] text-black font-bold text-xs rounded-xl hover:bg-[#E5C058] transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Invoice</span>
          </button>
        </div>
      </div>

      {/* Invoice Document Body */}
      <div className="p-8 space-y-8 bg-[#0D0D0D] text-neutral-100 font-sans text-xs">
        {/* Header Branding */}
        <div className="flex justify-between items-start border-b border-[#222] pb-6">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#D4AF37] flex items-center justify-center text-black font-bold text-xs">
                LL
              </div>
              <span className="font-display font-bold text-lg text-white lowercase">
                luxury-luggage
              </span>
            </div>
            <p className="text-[11px] text-neutral-400 mt-2 leading-relaxed">
              Maison Atelier Zürich • Bahnhofstrasse 42, 8001 Zürich, Switzerland<br />
              VAT ID: CHE-109.842.190 • concierge@luxury-luggage.com
            </p>
          </div>

          <div className="text-right">
            <h2 className="text-xl font-display font-extrabold text-[#D4AF37]">
              COMMERCIAL INVOICE
            </h2>
            <p className="font-mono text-neutral-300 mt-1 font-bold">
              INV-{order.orderNumber}
            </p>
            <p className="text-neutral-400 text-[11px]">Date: {order.createdAt}</p>
          </div>
        </div>

        {/* Client & Shipping Info */}
        <div className="grid grid-cols-2 gap-8 border-b border-[#222] pb-6">
          <div>
            <span className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider block mb-1">
              Billed & Shipped To:
            </span>
            <p className="font-bold text-sm text-white">{order.customerName}</p>
            <p className="text-neutral-400 mt-0.5">{order.customerEmail}</p>
            <p className="text-neutral-400 mt-1 leading-relaxed">
              {order.shippingAddress.street}<br />
              {order.shippingAddress.city}, {order.shippingAddress.postalCode}<br />
              {order.shippingAddress.country}
            </p>
          </div>

          <div className="space-y-2 text-right">
            <div>
              <span className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider">
                Payment Status
              </span>
              <p className="font-bold text-emerald-400">{order.paymentStatus} ({order.paymentMethod})</p>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider">
                Courier Service
              </span>
              <p className="text-neutral-300">{order.carrier} (Track: {order.trackingNumber})</p>
            </div>
          </div>
        </div>

        {/* Line Items Table */}
        <table className="w-full text-left">
          <thead className="border-b border-[#222] text-neutral-400 text-[10px] uppercase font-bold">
            <tr>
              <th className="py-2.5">Luggage Piece & Specifications</th>
              <th className="py-2.5">SKU</th>
              <th className="py-2.5 text-center">Qty</th>
              <th className="py-2.5 text-right">Unit Price</th>
              <th className="py-2.5 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1A1A1A]">
            {order.items.map((item) => (
              <tr key={item.id}>
                <td className="py-3">
                  <span className="font-bold text-white block">{item.name}</span>
                  <span className="text-[10px] text-neutral-400">
                    Finish: {item.color} • Volume: {item.size}
                  </span>
                </td>
                <td className="py-3 font-mono text-neutral-400">{item.sku}</td>
                <td className="py-3 text-center text-white font-mono">{item.quantity}</td>
                <td className="py-3 text-right font-mono text-neutral-300">${item.price}</td>
                <td className="py-3 text-right font-mono font-bold text-white">
                  ${(item.price * item.quantity).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals Calculation */}
        <div className="flex justify-end pt-4">
          <div className="w-64 space-y-1.5 text-xs">
            <div className="flex justify-between text-neutral-400">
              <span>Subtotal:</span>
              <span className="font-mono text-neutral-200">${order.subtotal.toLocaleString()}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-400">
                <span>VIP Courtesy Discount:</span>
                <span className="font-mono">-${order.discount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between text-neutral-400">
              <span>White-Glove Courier:</span>
              <span className="font-mono text-neutral-200">
                {order.shipping === 0 ? "COMPLIMENTARY" : `$${order.shipping}`}
              </span>
            </div>
            <div className="flex justify-between text-neutral-400">
              <span>Estimated VAT / Tax:</span>
              <span className="font-mono text-neutral-200">${order.tax.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-2 border-t border-[#333] text-sm font-bold text-white">
              <span>Total Paid:</span>
              <span className="font-mono text-[#D4AF37]">${order.total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Guarantee Seal */}
        <div className="pt-6 border-t border-[#222] flex items-center justify-between text-neutral-400 text-[10px]">
          <div className="flex items-center gap-2 text-[#D4AF37]">
            <ShieldCheck className="w-4 h-4" />
            <span className="font-semibold">Registered Lifetime Global Warranty Included</span>
          </div>
          <span>luxury-luggage © {new Date().getFullYear()}</span>
        </div>
      </div>
    </Modal>
  );
};
