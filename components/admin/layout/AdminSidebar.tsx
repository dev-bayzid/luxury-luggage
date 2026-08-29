"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  Luggage,
  FolderTree,
  Users,
  Star,
  Warehouse,
  Percent,
  Image as ImageIcon,
  BarChart3,
  Sliders,
  Settings,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Shield,
} from "lucide-react";
import { clsx } from "clsx";
import { motion } from "framer-motion";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeVariant?: "gold" | "warning";
  highlight?: boolean;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

interface AdminSidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  isCollapsed,
  onToggleCollapse,
}) => {
  const pathname = usePathname();

  const navGroups: NavGroup[] = [
    {
      label: "Overview",
      items: [
        { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
        { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
      ],
    },
    {
      label: "Catalog & Sales",
      items: [
        { label: "Orders", href: "/admin/orders", icon: ShoppingBag, badge: "3" },
        { label: "Products", href: "/admin/products", icon: Luggage },
        { label: "Categories", href: "/admin/categories", icon: FolderTree },
        { label: "Inventory", href: "/admin/inventory", icon: Warehouse, badge: "2", badgeVariant: "warning" },
        { label: "Discounts", href: "/admin/discounts", icon: Percent },
      ],
    },
    {
      label: "Audience & Content",
      items: [
        { label: "Customers", href: "/admin/customers", icon: Users },
        { label: "Reviews", href: "/admin/reviews", icon: Star, badge: "1" },
        { label: "Media Library", href: "/admin/media", icon: ImageIcon },
        { label: "Homepage CMS", href: "/admin/cms", icon: Sliders, highlight: true },
      ],
    },
    {
      label: "System",
      items: [
        { label: "Settings", href: "/admin/settings", icon: Settings },
      ],
    },
  ];

  return (
    <aside
      className={clsx(
        "fixed top-0 bottom-0 left-0 z-40 bg-[#0D0D0D] border-r border-[#1F1F1F] flex flex-col transition-all duration-300",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      {/* Brand Header */}
      <div className="h-16 border-b border-[#1F1F1F] px-4 flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-2.5 overflow-hidden group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#D4AF37] via-[#E5C058] to-[#997D25] flex items-center justify-center shrink-0 shadow-gold-glow">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 text-[#0D0D0D]"
            >
              <rect x="3" y="6" width="18" height="15" rx="3" />
              <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              <line x1="8" y1="11" x2="8" y2="16" />
              <line x1="16" y1="11" x2="16" y2="16" />
            </svg>
          </div>

          {!isCollapsed && (
            <div className="leading-tight">
              <span className="font-display font-bold text-sm tracking-tight text-white block lowercase">
                luxury-luggage
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-[#D4AF37] font-semibold block">
                Atelier Console
              </span>
            </div>
          )}
        </Link>

        <button
          onClick={onToggleCollapse}
          className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-[#1A1A1A] transition-colors"
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6 scrollbar-none">
        {navGroups.map((group, gIdx) => (
          <div key={gIdx} className="space-y-1">
            {!isCollapsed && (
              <div className="px-3 pb-1.5 text-[10px] uppercase font-bold tracking-widest text-neutral-500">
                {group.label}
              </div>
            )}

            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    "group relative flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200",
                    isActive
                      ? "bg-[#1C1C1C] text-[#E5C058] font-semibold border border-[#2D2A1E]"
                      : "text-neutral-400 hover:text-white hover:bg-[#151515]"
                  )}
                  title={isCollapsed ? item.label : undefined}
                >
                  {/* Left Active Glow Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeSideBarTab"
                      className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-[#D4AF37] rounded-r-full shadow-gold-glow"
                    />
                  )}

                  <Icon
                    className={clsx(
                      "w-4 h-4 shrink-0 transition-colors",
                      isActive
                        ? "text-[#D4AF37]"
                        : "text-neutral-400 group-hover:text-neutral-200"
                    )}
                  />

                  {!isCollapsed && (
                    <span className="flex-1 truncate">{item.label}</span>
                  )}

                  {!isCollapsed && item.badge && (
                    <span
                      className={clsx(
                        "text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0",
                        item.badgeVariant === "warning"
                          ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                          : "bg-[#D4AF37]/20 text-[#E5C058] border border-[#D4AF37]/30"
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      {/* Footer / Storefront Bridge */}
      <div className="p-3 border-t border-[#1F1F1F] space-y-2">
        <Link
          href="/"
          target="_blank"
          className={clsx(
            "flex items-center gap-2.5 p-2.5 rounded-xl bg-[#141414] hover:bg-[#1A1A1A] border border-[#242424] text-xs font-medium text-neutral-300 hover:text-[#E5C058] transition-all group",
            isCollapsed && "justify-center"
          )}
        >
          <ArrowUpRight className="w-4 h-4 text-[#D4AF37] shrink-0 group-hover:rotate-45 transition-transform" />
          {!isCollapsed && (
            <div className="flex-1 truncate">
              <span className="block font-semibold">Live Storefront</span>
              <span className="text-[10px] text-neutral-400 block">luxury-luggage.com</span>
            </div>
          )}
        </Link>
      </div>
    </aside>
  );
};
