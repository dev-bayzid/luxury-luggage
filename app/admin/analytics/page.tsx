"use client";

import React, { useState } from "react";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import { MetricCard } from "@/components/admin/dashboard/MetricCard";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Users,
  Globe,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

const regionalSales = [
  { region: "North America (US/CA)", share: 42, revenue: "$524,370", color: "#D4AF37" },
  { region: "Western Europe (CH/DE/UK/FR)", share: 34, revenue: "$424,490", color: "#E2E8F0" },
  { region: "Asia-Pacific (JP/SG/HK)", share: 18, revenue: "$224,730", color: "#94A3B8" },
  { region: "Middle East & GCC (UAE/QA)", share: 6, revenue: "$74,910", color: "#64748B" },
];

const topLuggagePerformers = [
  { name: "The Titanium Cabin Plus", units: 482, revenue: "$327,760", category: "Cabin Luggage" },
  { name: "The Grand Tour Checked 85L", units: 318, revenue: "$171,720", category: "Checked Luggage" },
  { name: "The Transatlantic Trunk 95L", units: 194, revenue: "$153,260", category: "Aluminum Trunks" },
  { name: "The Heritage Aluminum Trunk 88L", units: 112, revenue: "$99,680", category: "Heritage Cases" },
  { name: "The Horizon Hybrid Cabin Spinner", units: 186, revenue: "$85,560", category: "Hybrid Spinners" },
];

const trafficSources = [
  { source: "Direct Concierge / Private URL", percentage: 48, color: "#D4AF37" },
  { source: "High-Intent Organic Search", percentage: 26, color: "#E2E8F0" },
  { source: "Instagram Runway Showcase", percentage: 18, color: "#94A3B8" },
  { source: "Luxury Press & Editorial", percentage: 8, color: "#64748B" },
];

const aovTrend = [
  { month: "Jan", aov: 620 },
  { month: "Feb", aov: 678 },
  { month: "Mar", aov: 710 },
  { month: "Apr", aov: 695 },
  { month: "May", aov: 742 },
  { month: "Jun", aov: 780 },
  { month: "Jul", aov: 765 },
  { month: "Aug", aov: 820 },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#1F1F1F]">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37]">
            Intelligence & Haute Performance Metrics
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight mt-0.5">
            Maison Analytics & Financial Insights
          </h1>
        </div>

        <div className="text-xs text-neutral-400 font-mono">
          Currency: <strong className="text-white">USD (Consolidated)</strong>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Average Order Value (AOV)"
          value="$820.00"
          change="+14.2%"
          isPositive={true}
          icon={DollarSign}
        />
        <MetricCard
          title="Repeat Commission Rate"
          value="41.6%"
          change="+5.1%"
          isPositive={true}
          icon={Users}
        />
        <MetricCard
          title="Return / Defect Rate"
          value="0.12%"
          change="-0.04%"
          isPositive={true}
          icon={Sparkles}
          comparisonText="Swiss benchmark < 0.5%"
        />
        <MetricCard
          title="Global Delivery Speed"
          value="48.2 hrs"
          change="-4 hrs"
          isPositive={true}
          icon={Globe}
          comparisonText="DHL White-Glove average"
        />
      </div>

      {/* AOV Trajectory & Regional Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <AdminCard
            title="Average Commission Value Trajectory ($)"
            subtitle="Client suiting and multi-piece suitcase bundle growth"
          >
            <div className="h-64 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={aovTrend}>
                  <defs>
                    <linearGradient id="aovGold" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#D4AF37" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                  <XAxis dataKey="month" stroke="#666" fontSize={11} tickLine={false} />
                  <YAxis stroke="#666" fontSize={11} tickLine={false} tickFormatter={(v) => `$${v}`} />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-[#181818] border border-[#333] p-2.5 rounded-xl shadow-xl text-xs">
                            <span className="text-neutral-400 font-medium">{label}</span>
                            <p className="font-mono font-bold text-[#E5C058] mt-0.5">
                              ${payload[0].value} AOV
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="aov"
                    stroke="#D4AF37"
                    strokeWidth={2.5}
                    fill="url(#aovGold)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </AdminCard>
        </div>

        <div className="lg:col-span-4">
          <AdminCard
            title="Sales by Global Geography"
            subtitle="Regional revenue distribution"
          >
            <div className="space-y-4 pt-2">
              {regionalSales.map((r) => (
                <div key={r.region} className="space-y-1.5 text-xs">
                  <div className="flex justify-between font-medium">
                    <span className="text-neutral-300">{r.region}</span>
                    <span className="font-mono text-[#E5C058] font-bold">{r.revenue}</span>
                  </div>
                  <div className="h-1.5 w-full bg-[#202020] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${r.share}%`, backgroundColor: r.color }}
                    />
                  </div>
                  <div className="text-right text-[10px] text-neutral-400 font-mono">
                    {r.share}% of gross turnover
                  </div>
                </div>
              ))}
            </div>
          </AdminCard>
        </div>
      </div>

      {/* Top Performing Luggage Pieces Table & Traffic Channels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <AdminCard
            title="Top Performing Luggage Masterpieces"
            subtitle="Volume and revenue ranking across all collections"
            noPadding
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#181818] text-neutral-400 font-semibold uppercase tracking-wider text-[10px] border-b border-[#222222]">
                  <tr>
                    <th className="px-6 py-3.5">Piece</th>
                    <th className="px-6 py-3.5">Category</th>
                    <th className="px-6 py-3.5">Units Sold</th>
                    <th className="px-6 py-3.5 text-right">Gross Revenue</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1F1F1F]">
                  {topLuggagePerformers.map((p, idx) => (
                    <tr key={p.name} className="hover:bg-[#161616] transition-colors">
                      <td className="px-6 py-4 font-bold text-white flex items-center gap-2">
                        <span className="font-mono text-[#D4AF37] font-bold text-xs w-4">
                          #{idx + 1}
                        </span>
                        <span>{p.name}</span>
                      </td>
                      <td className="px-6 py-4 text-neutral-400">{p.category}</td>
                      <td className="px-6 py-4 font-mono text-neutral-200">{p.units}</td>
                      <td className="px-6 py-4 font-mono font-bold text-[#E5C058] text-right">
                        {p.revenue}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AdminCard>
        </div>

        <div className="lg:col-span-4">
          <AdminCard
            title="Client Acquisition Channels"
            subtitle="Traffic origin and concierge touchpoints"
          >
            <div className="space-y-4 pt-2">
              {trafficSources.map((t) => (
                <div key={t.source} className="space-y-1 text-xs">
                  <div className="flex justify-between text-neutral-300 font-medium">
                    <span className="truncate pr-2">{t.source}</span>
                    <span className="font-mono text-white font-bold">{t.percentage}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-[#202020] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${t.percentage}%`, backgroundColor: t.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </AdminCard>
        </div>
      </div>
    </div>
  );
}
