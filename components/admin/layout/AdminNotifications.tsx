"use client";

import React, { useState } from "react";
import { Bell, CheckCircle2, AlertTriangle, Package, Sparkles, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: "order" | "inventory" | "review";
  read: boolean;
  link: string;
}

export const AdminNotifications: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: "n-1",
      title: "New High-Value Order ($1,428)",
      message: "Lord Alexander Hastings placed an order for 2 luggage pieces.",
      time: "10 mins ago",
      type: "order",
      read: false,
      link: "/admin/orders",
    },
    {
      id: "n-2",
      title: "Low Inventory Warning",
      message: "The Heritage Aluminum Trunk 88L is down to 3 units remaining.",
      time: "1 hour ago",
      type: "inventory",
      read: false,
      link: "/admin/inventory",
    },
    {
      id: "n-3",
      title: "New Verified Review (5★)",
      message: "Harrison Forde reviewed 'The Grand Tour Checked 85L'.",
      time: "3 hours ago",
      type: "review",
      read: true,
      link: "/admin/reviews",
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2.5 rounded-xl bg-[#141414] hover:bg-[#1C1C1C] border border-[#242424] text-neutral-300 hover:text-white transition-colors"
        aria-label="Notifications"
      >
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#D4AF37] ring-2 ring-[#0D0D0D] animate-pulse" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#141414] border border-[#262626] rounded-2xl shadow-2xl z-50 overflow-hidden"
            >
              {/* Header */}
              <div className="p-4 border-b border-[#222222] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-white font-display">
                    Activity & Alerts
                  </span>
                  {unreadCount > 0 && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#E5C058] border border-[#D4AF37]/30">
                      {unreadCount} new
                    </span>
                  )}
                </div>

                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-[11px] text-[#D4AF37] hover:underline font-medium"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              {/* List */}
              <div className="max-h-80 overflow-y-auto divide-y divide-[#1F1F1F]">
                {notifications.map((n) => (
                  <Link
                    key={n.id}
                    href={n.link}
                    onClick={() => setIsOpen(false)}
                    className="p-3.5 flex items-start gap-3 hover:bg-[#1A1A1A] transition-colors block"
                  >
                    <div className="p-2 rounded-xl bg-[#1F1F1F] text-[#D4AF37] shrink-0 mt-0.5">
                      {n.type === "order" && <Package className="w-3.5 h-3.5" />}
                      {n.type === "inventory" && <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />}
                      {n.type === "review" && <Sparkles className="w-3.5 h-3.5" />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <h5 className="text-xs font-bold text-neutral-200 truncate">
                          {n.title}
                        </h5>
                        <span className="text-[10px] text-neutral-400 whitespace-nowrap">
                          {n.time}
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-400 mt-0.5 line-clamp-2 leading-relaxed">
                        {n.message}
                      </p>
                    </div>

                    {!n.read && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0 mt-1.5" />
                    )}
                  </Link>
                ))}
              </div>

              {/* Footer */}
              <div className="p-2.5 border-t border-[#222222] bg-[#0F0F0F] text-center">
                <Link
                  href="/admin/orders"
                  onClick={() => setIsOpen(false)}
                  className="text-xs font-semibold text-neutral-400 hover:text-[#E5C058] transition-colors"
                >
                  View All Orders & Log →
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
