"use client";

import React, { useState } from "react";
import { AdminSidebar } from "@/components/admin/layout/AdminSidebar";
import { AdminNavbar } from "@/components/admin/layout/AdminNavbar";
import { clsx } from "clsx";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-neutral-100 font-sans selection:bg-[#D4AF37] selection:text-black">
      {/* Fixed Collapsible Sidebar */}
      <AdminSidebar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* Top Navbar */}
      <AdminNavbar isSidebarCollapsed={isSidebarCollapsed} />

      {/* Main Routed Content */}
      <main
        className={clsx(
          "min-h-[calc(100vh-4rem)] p-4 sm:p-8 transition-all duration-300",
          isSidebarCollapsed ? "lg:pl-24" : "lg:pl-72"
        )}
      >
        <div className="max-w-7xl mx-auto space-y-8">
          {children}
        </div>
      </main>
    </div>
  );
}
