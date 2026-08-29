"use client";

import React from "react";
import Link from "next/link";
import { MetricCard } from "@/components/admin/dashboard/MetricCard";
import { RevenueChart } from "@/components/admin/dashboard/RevenueChart";
import { CategorySalesChart } from "@/components/admin/dashboard/CategorySalesChart";
import { RecentOrdersTable } from "@/components/admin/dashboard/RecentOrdersTable";
import { LowStockAlert } from "@/components/admin/dashboard/LowStockAlert";
import { RecentReviewsWidget } from "@/components/admin/dashboard/RecentReviewsWidget";
import {
  DollarSign,
  ShoppingBag,
  Users,
  Luggage,
  Activity,
  Plus,
  ArrowUpRight,
  Download,
  Calendar,
  Sparkles,
} from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#1F1F1F]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#D4AF37] bg-[#D4AF37]/10 px-2.5 py-0.5 rounded-full border border-[#D4AF37]/20">
              Executive Overview
            </span>
            <span className="text-xs text-neutral-400 font-mono">
              Live Zürich Atelier Sync
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight mt-1">
            Maison Atelier Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => alert("Exporting Maison Sales Ledger (CSV)...")}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#141414] hover:bg-[#1C1C1C] border border-[#242424] text-xs font-semibold text-neutral-300 hover:text-white transition-all shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Export Report</span>
          </button>

          <Link
            href="/admin/products/new"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B89328] hover:from-[#E5C058] hover:to-[#D4AF37] text-neutral-950 font-bold text-xs shadow-gold-glow transition-all"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Add Luggage</span>
          </Link>
        </div>
      </div>

      {/* 5 KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
        <MetricCard
          title="Total Gross Revenue"
          value="$1,248,500"
          change="+18.4%"
          isPositive={true}
          icon={DollarSign}
          comparisonText="vs last month"
        />
        <MetricCard
          title="Commissions / Orders"
          value="1,842"
          change="+12.6%"
          isPositive={true}
          icon={ShoppingBag}
          comparisonText="vs last month"
        />
        <MetricCard
          title="Maison Clients"
          value="4,290"
          change="+8.2%"
          isPositive={true}
          icon={Users}
          comparisonText="vs last month"
        />
        <MetricCard
          title="Luggage Catalog"
          value="8 Lines"
          change="+2 New"
          isPositive={true}
          icon={Luggage}
          comparisonText="active masterworks"
        />
        <MetricCard
          title="Conversion Rate"
          value="3.82%"
          change="+0.4%"
          isPositive={true}
          icon={Activity}
          comparisonText="industry avg 1.9%"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <RevenueChart />
        </div>
        <div className="lg:col-span-4">
          <CategorySalesChart />
        </div>
      </div>

      {/* Bottom Grids: Recent Orders & Alerts/Reviews */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <RecentOrdersTable />
        </div>

        <div className="lg:col-span-4 space-y-6">
          <LowStockAlert />
          <RecentReviewsWidget />
        </div>
      </div>
    </div>
  );
}
