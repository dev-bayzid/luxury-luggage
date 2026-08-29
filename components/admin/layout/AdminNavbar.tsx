"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  Plus,
  Moon,
  LogOut,
  Settings,
  Shield,
  User,
  ExternalLink,
  Command,
  Luggage,
} from "lucide-react";
import { AdminNotifications } from "./AdminNotifications";
import { Modal } from "@/components/ui/Modal";
import { ADMIN_PRODUCTS } from "@/data/adminMockData";
import { clsx } from "clsx";

interface AdminNavbarProps {
  isSidebarCollapsed: boolean;
  onMobileMenuOpen?: () => void;
}

export const AdminNavbar: React.FC<AdminNavbarProps> = ({
  isSidebarCollapsed,
}) => {
  const router = useRouter();
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const filteredItems = searchQuery.trim()
    ? ADMIN_PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : ADMIN_PRODUCTS.slice(0, 4);

  return (
    <>
      <header
        className={clsx(
          "sticky top-0 z-30 h-16 bg-[#0D0D0D]/90 backdrop-blur-xl border-b border-[#1F1F1F] px-4 sm:px-8 flex items-center justify-between transition-all duration-300",
          isSidebarCollapsed ? "lg:pl-24" : "lg:pl-72"
        )}
      >
        {/* Left Search Bar Trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSearchModalOpen(true)}
            className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-[#141414] hover:bg-[#1A1A1A] border border-[#242424] text-xs text-neutral-400 hover:text-neutral-200 transition-all w-48 sm:w-72"
          >
            <Search className="w-3.5 h-3.5 text-neutral-400" />
            <span className="truncate">Search products, orders...</span>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 ml-auto text-[10px] font-mono bg-[#202020] text-neutral-400 px-1.5 py-0.5 rounded border border-[#333]">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          {/* Quick Create Button */}
          <Link
            href="/admin/products/new"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B89328] hover:from-[#E5C058] hover:to-[#D4AF37] text-neutral-950 font-bold text-xs shadow-gold-glow transition-all"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>New Piece</span>
          </Link>

          {/* Notifications */}
          <AdminNotifications />

          {/* Theme Indicator */}
          <div className="hidden sm:flex items-center justify-center w-9 h-9 rounded-xl bg-[#141414] border border-[#242424] text-[#D4AF37]" title="Obsidian Dark Edition">
            <Moon className="w-4 h-4" />
          </div>

          {/* Profile Menu Trigger */}
          <div className="relative">
            <button
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-[#1A1A1A] border border-transparent hover:border-[#242424] transition-all"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#7A6117] flex items-center justify-center text-black font-bold text-xs shadow-md">
                AL
              </div>
              <div className="hidden md:block text-left text-xs leading-tight">
                <span className="font-bold text-neutral-200 block">Lord Alexander</span>
                <span className="text-[10px] text-[#D4AF37] block font-mono">Director</span>
              </div>
            </button>

            {/* Profile Dropdown */}
            {isProfileMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsProfileMenuOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-56 bg-[#141414] border border-[#262626] rounded-2xl shadow-2xl z-50 p-2 text-xs divide-y divide-[#222]">
                  <div className="px-3 py-2">
                    <p className="font-bold text-white">Lord Alexander</p>
                    <p className="text-[11px] text-neutral-400 truncate">director@luxury-luggage.com</p>
                    <span className="inline-block mt-1 text-[9px] uppercase font-bold tracking-widest text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 rounded-full">
                      Full Root Access
                    </span>
                  </div>

                  <div className="py-1 space-y-0.5">
                    <Link
                      href="/admin/settings"
                      onClick={() => setIsProfileMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-neutral-300 hover:text-white hover:bg-[#1F1F1F] transition-colors"
                    >
                      <Settings className="w-3.5 h-3.5 text-neutral-400" />
                      <span>Console Settings</span>
                    </Link>

                    <Link
                      href="/"
                      target="_blank"
                      onClick={() => setIsProfileMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-neutral-300 hover:text-white hover:bg-[#1F1F1F] transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>View Live Storefront</span>
                    </Link>
                  </div>

                  <div className="pt-1">
                    <button
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                        router.push("/");
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors text-left"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Exit Atelier Console</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Global Quick Search Modal (Command Palette Style) */}
      <Modal
        isOpen={isSearchModalOpen}
        onClose={() => {
          setIsSearchModalOpen(false);
          setSearchQuery("");
        }}
        maxWidth="lg"
        className="p-0 overflow-hidden bg-[#121212] border-[#2A2A2A]"
      >
        <div className="p-4 border-b border-[#242424] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#D4AF37]" />
          <input
            type="text"
            placeholder="Search luggage products, SKU, or orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
            className="flex-1 bg-transparent text-sm text-white placeholder-neutral-500 focus:outline-none"
          />
          <kbd className="text-[10px] bg-[#222] text-neutral-400 px-2 py-1 rounded border border-[#333]">
            ESC
          </kbd>
        </div>

        <div className="max-h-96 overflow-y-auto p-3 space-y-1">
          <div className="px-3 py-1.5 text-[10px] uppercase font-bold tracking-widest text-neutral-500">
            {searchQuery ? "Search Results" : "Suggested Luggage Pieces"}
          </div>

          {filteredItems.map((prod) => (
            <button
              key={prod.id}
              onClick={() => {
                setIsSearchModalOpen(false);
                router.push(`/admin/products/${prod.id}/edit`);
              }}
              className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-[#1A1A1A] transition-colors text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#202020] text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black transition-colors">
                  <Luggage className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{prod.name}</h4>
                  <p className="text-[10px] text-neutral-400">
                    SKU: {prod.sku} • {prod.category}
                  </p>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-[#E5C058]">
                ${prod.price}
              </span>
            </button>
          ))}
        </div>
      </Modal>
    </>
  );
};
