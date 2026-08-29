"use client";

import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { AdminCard } from "../ui/AdminCard";

const categoryData = [
  { name: "Cabin Luggage", value: 44, color: "#D4AF37" },
  { name: "Checked Luggage", value: 28, color: "#94A3B8" },
  { name: "Aluminum Trunks", value: 16, color: "#E2E8F0" },
  { name: "Hybrid Spinners", value: 8, color: "#64748B" },
  { name: "Heritage Cases", value: 4, color: "#CA8A04" },
];

export const CategorySalesChart: React.FC = () => {
  return (
    <AdminCard
      title="Sales by Luggage Line"
      subtitle="Share of total revenue by category"
    >
      <div className="h-52 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-[#181818] border border-[#2D2A1E] p-2.5 rounded-xl shadow-2xl text-xs">
                      <p className="font-bold text-white">{payload[0].name}</p>
                      <p className="text-[#E5C058] font-mono mt-0.5">
                        {payload[0].value}% of Gross Sales
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={4}
              dataKey="value"
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="#121212" strokeWidth={2} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-2 space-y-2 border-t border-[#1F1F1F] pt-4">
        {categoryData.map((cat) => (
          <div key={cat.name} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
              <span className="text-neutral-300 font-medium">{cat.name}</span>
            </div>
            <span className="font-mono text-neutral-400 font-bold">{cat.value}%</span>
          </div>
        ))}
      </div>
    </AdminCard>
  );
};
