import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Compass, Home, ShoppingBag, Phone } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center pt-32 pb-20 px-4 bg-secondary-offwhite">
      <div className="max-w-lg w-full text-center space-y-6 bg-white rounded-3xl p-8 sm:p-14 border border-neutral-200 shadow-luxury">
        <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mx-auto">
          <Compass className="w-8 h-8 animate-spin-slow" />
        </div>

        <span className="text-xs uppercase font-bold tracking-[0.25em] text-accent">
          Error 404 • Flight Path Uncharted
        </span>

        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-primary tracking-tight">
          Coordinates Not Found
        </h1>

        <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed max-w-sm mx-auto font-light">
          The luggage piece or runway destination you are seeking has either departed or been relocated in our vault.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/" className="w-full sm:w-auto">
            <Button variant="primary" size="md" className="w-full sm:w-auto">
              <Home className="w-4 h-4 mr-2" />
              <span>Return Home</span>
            </Button>
          </Link>

          <Link href="/shop" className="w-full sm:w-auto">
            <Button variant="outline" size="md" className="w-full sm:w-auto">
              <ShoppingBag className="w-4 h-4 mr-2" />
              <span>Explore Vault</span>
            </Button>
          </Link>
        </div>

        <div className="pt-6 border-t border-neutral-100 text-xs text-neutral-400">
          Need assistance? <Link href="/contact" className="text-accent hover:underline font-semibold">Contact VIP Concierge</Link>
        </div>
      </div>
    </div>
  );
}
