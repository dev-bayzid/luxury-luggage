"use client";

import React from "react";
import { FilterState } from "@/types";
import { CATEGORIES } from "@/data/categories";
import { RotateCcw, Check, Sparkles } from "lucide-react";
import { clsx } from "clsx";

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onReset: () => void;
  className?: string;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFilterChange,
  onReset,
  className,
}) => {
  const colorOptions = [
    { name: "Silver Titanium", hex: "#D8D8D8" },
    { name: "Matte Obsidian", hex: "#1C1C1C" },
    { name: "Champagne Gold", hex: "#C8A96A" },
    { name: "Desert Sand", hex: "#D6C7B2" },
    { name: "Alpine Slate", hex: "#475569" },
  ];

  const materialOptions = [
    "Aerospace Aluminum",
    "German Makrolon® Polycarbonate",
    "Tuscan Vachetta Leather",
  ];

  const handleCategory = (category: string) => {
    onFilterChange({
      ...filters,
      category: filters.category === category ? "" : category,
    });
  };

  const handleColor = (colorName: string) => {
    const exists = filters.colors.includes(colorName);
    const updated = exists
      ? filters.colors.filter((c) => c !== colorName)
      : [...filters.colors, colorName];
    onFilterChange({ ...filters, colors: updated });
  };

  const handleMaterial = (mat: string) => {
    const exists = filters.materials.includes(mat);
    const updated = exists
      ? filters.materials.filter((m) => m !== mat)
      : [...filters.materials, mat];
    onFilterChange({ ...filters, materials: updated });
  };

  const handlePriceMax = (maxVal: number) => {
    onFilterChange({
      ...filters,
      priceRange: [filters.priceRange[0], maxVal],
    });
  };

  const hasActiveFilters =
    filters.category !== "" ||
    filters.colors.length > 0 ||
    filters.materials.length > 0 ||
    filters.priceRange[1] < 1000 ||
    filters.inStockOnly;

  return (
    <aside className={clsx("space-y-8", className)}>
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
        <h3 className="text-xs uppercase font-bold tracking-widest text-primary flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-accent" />
          <span>Luggage Filters</span>
        </h3>
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="text-xs text-accent hover:text-accent-dark flex items-center gap-1 font-medium transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Categories */}
      <div className="space-y-3">
        <label className="text-xs font-bold uppercase tracking-wider text-neutral-800 block">
          Luggage Type
        </label>
        <div className="space-y-1">
          <button
            onClick={() => handleCategory("")}
            className={clsx(
              "w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium transition-colors flex items-center justify-between",
              filters.category === ""
                ? "bg-primary text-white"
                : "text-neutral-600 hover:bg-neutral-100"
            )}
          >
            <span>All Luggage Pieces</span>
          </button>
          {CATEGORIES.map((cat) => {
            const isSelected = filters.category === cat.name;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategory(cat.name)}
                className={clsx(
                  "w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium transition-colors flex items-center justify-between",
                  isSelected
                    ? "bg-primary text-white"
                    : "text-neutral-600 hover:bg-neutral-100"
                )}
              >
                <span>{cat.name}</span>
                <span className={clsx("text-[10px]", isSelected ? "text-neutral-300" : "text-neutral-400")}>
                  {cat.itemCount}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range Slider */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-neutral-800 block">
            Max Price
          </label>
          <span className="text-xs font-bold text-accent">
            ${filters.priceRange[1]}
          </span>
        </div>
        <input
          type="range"
          min={300}
          max={1000}
          step={50}
          value={filters.priceRange[1]}
          onChange={(e) => handlePriceMax(Number(e.target.value))}
          className="w-full accent-accent bg-neutral-200 rounded-lg cursor-pointer h-1.5"
        />
        <div className="flex justify-between text-[10px] text-neutral-400 font-mono">
          <span>$300</span>
          <span>$1,000+</span>
        </div>
      </div>

      {/* Color Finishes */}
      <div className="space-y-3">
        <label className="text-xs font-bold uppercase tracking-wider text-neutral-800 block">
          Finishes & Tones
        </label>
        <div className="flex flex-wrap gap-2">
          {colorOptions.map((c) => {
            const isSelected = filters.colors.includes(c.name);
            return (
              <button
                key={c.name}
                onClick={() => handleColor(c.name)}
                title={c.name}
                className={clsx(
                  "w-7 h-7 rounded-full border flex items-center justify-center transition-all",
                  isSelected
                    ? "ring-2 ring-accent ring-offset-2 scale-110"
                    : "opacity-80 hover:opacity-100"
                )}
                style={{ backgroundColor: c.hex, borderColor: "rgba(0,0,0,0.15)" }}
              >
                {isSelected && <Check className="w-3.5 h-3.5 text-white filter drop-shadow" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Materials */}
      <div className="space-y-3">
        <label className="text-xs font-bold uppercase tracking-wider text-neutral-800 block">
          Shell Material
        </label>
        <div className="space-y-2">
          {materialOptions.map((mat) => {
            const isChecked = filters.materials.includes(mat);
            return (
              <label
                key={mat}
                onClick={() => handleMaterial(mat)}
                className="flex items-center gap-2.5 text-xs text-neutral-600 hover:text-primary cursor-pointer select-none"
              >
                <div
                  className={clsx(
                    "w-4 h-4 rounded border flex items-center justify-center transition-colors",
                    isChecked
                      ? "bg-accent border-accent text-primary"
                      : "border-neutral-300 bg-white"
                  )}
                >
                  {isChecked && <Check className="w-3 h-3 text-primary stroke-[3]" />}
                </div>
                <span>{mat}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* In-Stock Toggle */}
      <div className="pt-2 border-t border-neutral-200">
        <label className="flex items-center justify-between text-xs text-neutral-700 cursor-pointer select-none py-1">
          <span className="font-semibold">In-Stock Only</span>
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => onFilterChange({ ...filters, inStockOnly: e.target.checked })}
            className="w-4 h-4 accent-accent rounded"
          />
        </label>
      </div>
    </aside>
  );
};
