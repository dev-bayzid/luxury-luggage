"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PRODUCTS } from "@/data/products";
import { FilterState, Product } from "@/types";
import { ProductCard } from "@/components/product/ProductCard";
import { FilterSidebar } from "@/components/common/FilterSidebar";
import { PageHero } from "@/components/common/PageHero";
import { Pagination } from "@/components/common/Pagination";
import { EmptyState } from "@/components/common/EmptyState";
import { Drawer } from "@/components/ui/Drawer";
import { SlidersHorizontal, Grid3X3, LayoutList, Luggage, X } from "lucide-react";
import { clsx } from "clsx";

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "";

  const [filters, setFilters] = useState<FilterState>({
    category: initialCategory,
    priceRange: [0, 1000],
    colors: [],
    materials: [],
    sortBy: "featured",
    inStockOnly: false,
  });

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const resetFilters = () => {
    setFilters({
      category: "",
      priceRange: [0, 1000],
      colors: [],
      materials: [],
      sortBy: "featured",
      inStockOnly: false,
    });
    setCurrentPage(1);
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (filters.category && p.category !== filters.category) return false;
      if (p.price > filters.priceRange[1]) return false;
      if (filters.inStockOnly && !p.inStock) return false;
      if (
        filters.colors.length > 0 &&
        !p.colors.some((c) => filters.colors.includes(c.name))
      )
        return false;
      if (
        filters.materials.length > 0 &&
        !p.materials.some((m) =>
          filters.materials.some((fm) => m.toLowerCase().includes(fm.toLowerCase()))
        )
      )
        return false;
      return true;
    }).sort((a, b) => {
      if (filters.sortBy === "price-asc") return a.price - b.price;
      if (filters.sortBy === "price-desc") return b.price - a.price;
      if (filters.sortBy === "rating") return b.rating - a.rating;
      if (filters.sortBy === "newest") return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      if (filters.sortBy === "bestselling") return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
      return 0; // featured
    });
  }, [filters]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const activeFilterCount =
    (filters.category ? 1 : 0) +
    filters.colors.length +
    filters.materials.length +
    (filters.priceRange[1] < 1000 ? 1 : 0) +
    (filters.inStockOnly ? 1 : 0);

  return (
    <div>
      <PageHero
        badge="Haute Collection"
        title="The Luggage Vault"
        subtitle="Precision-engineered aluminum and Italian leather pieces sculpted for effortless international voyages."
        breadcrumbs={[{ label: "Shop Catalog", href: "/shop" }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-28 bg-white rounded-3xl p-6 border border-neutral-200/80 shadow-luxury">
              <FilterSidebar
                filters={filters}
                onFilterChange={(newFilters) => {
                  setFilters(newFilters);
                  setCurrentPage(1);
                }}
                onReset={resetFilters}
              />
            </div>
          </div>

          {/* Product Listing Main Area */}
          <div className="lg:col-span-9 space-y-6">
            {/* Control Bar: Total Count, Mobile Filter Trigger, Sort, View Toggle */}
            <div className="bg-white rounded-2xl p-4 border border-neutral-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center justify-between w-full sm:w-auto gap-4">
                <span className="text-xs font-semibold text-neutral-600">
                  Showing <strong className="text-primary">{filteredProducts.length}</strong> creations
                </span>

                {/* Mobile Filter Button */}
                <button
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-100 text-xs font-semibold text-primary border border-neutral-200"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-accent" />
                  <span>Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
                </button>
              </div>

              {/* Sort & Grid Switcher */}
              <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-3">
                <div className="flex items-center gap-2">
                  <label htmlFor="sort-select" className="text-xs text-neutral-500 font-medium whitespace-nowrap">
                    Sort by:
                  </label>
                  <select
                    id="sort-select"
                    value={filters.sortBy}
                    onChange={(e) =>
                      setFilters({ ...filters, sortBy: e.target.value as FilterState["sortBy"] })
                    }
                    className="bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-1.5 text-xs text-primary focus:outline-none focus:border-accent font-medium"
                  >
                    <option value="featured">Featured Curations</option>
                    <option value="bestselling">Best Selling</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="newest">Newest Releases</option>
                  </select>
                </div>

                {/* View Mode */}
                <div className="hidden sm:flex items-center gap-1 border border-neutral-200 rounded-xl p-1 bg-neutral-50">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={clsx(
                      "p-1 rounded-lg transition-colors",
                      viewMode === "grid" ? "bg-white shadow-sm text-primary" : "text-neutral-400 hover:text-primary"
                    )}
                    aria-label="Grid view"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={clsx(
                      "p-1 rounded-lg transition-colors",
                      viewMode === "list" ? "bg-white shadow-sm text-primary" : "text-neutral-400 hover:text-primary"
                    )}
                    aria-label="List view"
                  >
                    <LayoutList className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filters Badges */}
            {activeFilterCount > 0 && (
              <div className="flex items-center flex-wrap gap-2 pt-1">
                {filters.category && (
                  <span className="inline-flex items-center gap-1 text-xs bg-neutral-100 text-neutral-800 px-3 py-1 rounded-full border border-neutral-200">
                    Category: {filters.category}
                    <button
                      onClick={() => setFilters({ ...filters, category: "" })}
                      className="hover:text-red-500"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {filters.colors.map((c) => (
                  <span
                    key={c}
                    className="inline-flex items-center gap-1 text-xs bg-neutral-100 text-neutral-800 px-3 py-1 rounded-full border border-neutral-200"
                  >
                    Color: {c}
                    <button
                      onClick={() =>
                        setFilters({ ...filters, colors: filters.colors.filter((col) => col !== c) })
                      }
                      className="hover:text-red-500"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                {filters.materials.map((m) => (
                  <span
                    key={m}
                    className="inline-flex items-center gap-1 text-xs bg-neutral-100 text-neutral-800 px-3 py-1 rounded-full border border-neutral-200"
                  >
                    {m}
                    <button
                      onClick={() =>
                        setFilters({ ...filters, materials: filters.materials.filter((mat) => mat !== m) })
                      }
                      className="hover:text-red-500"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                {filters.priceRange[1] < 1000 && (
                  <span className="inline-flex items-center gap-1 text-xs bg-neutral-100 text-neutral-800 px-3 py-1 rounded-full border border-neutral-200">
                    Under ${filters.priceRange[1]}
                    <button
                      onClick={() => setFilters({ ...filters, priceRange: [0, 1000] })}
                      className="hover:text-red-500"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                <button
                  onClick={resetFilters}
                  className="text-xs text-accent hover:text-accent-dark font-semibold ml-2 underline"
                >
                  Clear All
                </button>
              </div>
            )}

            {/* Products Grid */}
            {paginatedProducts.length === 0 ? (
              <EmptyState
                icon={Luggage}
                title="No pieces match your specifications"
                description="Try broadening your price range, color selection, or clearing active filters."
                actionText="Reset All Filters"
                onAction={resetFilters}
              />
            ) : (
              <div
                className={clsx(
                  "grid gap-6",
                  viewMode === "grid"
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-1"
                )}
              >
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {/* Pagination */}
            <div className="pt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(p) => {
                  setCurrentPage(p);
                  window.scrollTo({ top: 300, behavior: "smooth" });
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      <Drawer
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        title="Filter Vault"
        position="left"
        width="sm"
      >
        <FilterSidebar
          filters={filters}
          onFilterChange={(newFilters) => {
            setFilters(newFilters);
            setCurrentPage(1);
          }}
          onReset={resetFilters}
        />
      </Drawer>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-32 text-center">Loading luxury catalog...</div>}>
      <ShopContent />
    </Suspense>
  );
}
