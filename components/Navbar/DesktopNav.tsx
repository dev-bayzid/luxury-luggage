"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";

export default function DesktopNav() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-neutral-200">
      {/* Shop All */}
      <div className="relative py-2">
        <Link
          href="/shop"
          className={clsx(
            "hover:text-accent transition-colors",
            pathname === "/shop" && "text-accent font-semibold",
          )}
        >
          Shop
        </Link>
      </div>

      {/* Cabin Luggage */}
      <Link
        href="/shop?category=Cabin%20Luggage"
        className={clsx(
          "hover:text-accent transition-colors",
          pathname.includes("Cabin") && "text-accent font-semibold",
        )}
      >
        Carry-On
      </Link>

      {/* Checked Luggage */}
      <Link
        href="/shop?category=Checked%20Luggage"
        className={clsx(
          "hover:text-accent transition-colors",
          pathname.includes("Checked") && "text-accent font-semibold",
        )}
      >
        Checked
      </Link>

      {/* Aluminum Trunks */}
      <Link
        href="/shop?category=Aluminum%20Trunks"
        className={clsx(
          "hover:text-accent transition-colors",
          pathname.includes("Trunks") && "text-accent font-semibold",
        )}
      >
        Accessories
      </Link>

      {/* Heritage Cases */}
      <Link
        href="/shop?category=Heritage%20Cases"
        className={clsx(
          "hover:text-accent transition-colors",
          pathname.includes("Heritage") && "text-accent font-semibold",
        )}
      >
        About
      </Link>

      {/* Blog / Journal */}
      <Link
        href="/about"
        className={clsx(
          "hover:text-accent transition-colors",
          pathname === "/about" && "text-accent font-semibold",
        )}
      >
        Journal
      </Link>
    </nav>
  );
}
