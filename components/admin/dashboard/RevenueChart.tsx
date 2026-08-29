"use client";

import React, { useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { AdminCard } from "../ui/AdminCard";
import { clsx } from "clsx";

const dataMonthly = [
  { name: "Jan", revenue: 42000, orders: 58 },
  { name: "Feb", revenue: 58000, orders: 82 },
  { name: "Mar", revenue: 64000, orders: 90 },
  { name: "Apr", revenue: 51000, orders: 72 },
  { name: "May", revenue: 79000, orders: 110 },
  { name: "Jun", revenue: 92000, orders: 130 },
  { name: "Jul", revenue: 86000, orders: 122 },
  { name: "Aug", revenue: 112000, orders: 154 },
  { name: "Sep", revenue: 98000, orders: 138 },
  { name: "Oct", revenue: 124000, orders: 172 },
  { name: "Nov", revenue: 148000, orders: 205 },
  { name: "Dec", revenue: 182000, orders: 248 },
];

const dataWeekly = [
  { name: "Mon", revenue: 14200, orders: 18 },
  { name: "Tue", revenue: 18900, orders: 24 },
  { name: "Wed", revenue: 22400, orders: 31 },
  { name: "Thu", revenue: 19800, orders: 27 },
  { name: "Fri", revenue: 31200, orders: 42 },
  { name: "Sat", revenue: 28400, orders: 38 },
  { name: "Sun", revenue: 24500, orders: 33 },
];

export const RevenueChart: React.FC = () => {
  const [timeframe, setTimeframe] = useState<"monthly" | "weekly">("monthly");
  const data = timeframe === "monthly" ? dataMonthly : dataWeekly;

  return (
    <AdminCard
      title="Revenue Trajectory & Volume"
      subtitle="Financial performance across global boutiques and online orders"
      action={
        <div className="flex items-center gap-1 bg-[#1A1A1A] p-1 rounded-xl border border-[#282828]">
          <button
            onClick={() => setTimeframe("monthly")}
            className={clsx(
              "px-3 py-1 rounded-lg text-xs font-semibold transition-all",
              timeframe === "monthly"
                ? "bg-[#282828] text-[#E5C058] shadow-sm"
                : "text-neutral-400 hover:text-white"
            )}
          >
            Year 2026
          </button>
          <button
            onClick={() => setTimeframe("weekly")}
            className={clsx(
              "px-3 py-1 rounded-lg text-xs font-semibold transition-all",
              timeframe === "weekly"
                ? "bg-[#282828] text-[#E5C058] shadow-sm"
                : "text-neutral-400 hover:text-white"
            )}
          >
            This Week
          </button>
        </div>
      }
    >
      <div className="h-72 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#D4AF37" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#222222" vertical={false} />
            <XAxis
              dataKey="name"
              stroke="#666666"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: "#222222" }}
            />
            <YAxis
              stroke="#666666"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: "#222222" }}
              tickFormatter={(v) => `$${v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v}`}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-[#181818] border border-[#2D2A1E] p-3 rounded-xl shadow-2xl">
                      <p className="text-xs font-bold text-neutral-300 mb-1">{label}</p>
                      <p className="text-sm font-mono font-extrabold text-[#E5C058]">
                        ${Number(payload[0].value).toLocaleString()}
                      </p>
                      <p className="text-[11px] text-neutral-400 mt-0.5">
                        {payload[0].payload.orders} Commissions
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#D4AF37"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#goldGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </AdminCard>
  );
};
