"use client";

import { useEffect, useState } from "react";
import { SearchModal } from "../layout/SearchModal";
import { Search } from "lucide-react";

export default function SearchButton() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <button
        onClick={() => setIsSearchOpen(true)}
        className="p-2.5 text-neutral-300 hover:text-white transition-colors rounded-full hover:bg-white/5"
        aria-label="Search"
      >
        <Search className="w-5 h-5 stroke-[1.8]" />
      </button>

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
