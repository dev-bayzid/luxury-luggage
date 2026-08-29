import type { Metadata } from "next";
import "./globals.css";
import { ToastProvider } from "@/context/ToastContext";
import { CurrencyProvider } from "@/context/CurrencyContext";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { QuickViewProvider } from "@/context/QuickViewContext";
import { Navbar } from "@/components/Navbar/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "luxury-luggage | Haute Bagagerie & Luxury Travel Gear",
  description:
    "Handcrafted aerospace aluminum and Tuscan leather luggage. Engineered in Zürich, perfected in Milan. Unconditional lifetime airline damage warranty.",
  keywords: [
    "luxury luggage",
    "aluminum suitcase",
    "cabin luggage",
    "carry-on spinner",
    "leather duffel bag",
    "travel gear",
    "rimowa alternative",
    "tumi alternative",
  ],
  authors: [{ name: "luxury-luggage" }],
  openGraph: {
    title: "luxury-luggage | Haute Bagagerie & Luxury Travel Gear",
    description:
      "The Art of Timeless Voyage. Handcrafted luxury luggage with unconditional lifetime warranty.",
    type: "website",
    locale: "en_US",
    siteName: "luxury-luggage",
  },
  twitter: {
    card: "summary_large_image",
    title: "luxury-luggage | Haute Bagagerie",
    description:
      "The Art of Timeless Voyage. Luxury luggage engineered in Zürich.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-secondary-offwhite text-primary min-h-screen flex flex-col antialiased">
        <ToastProvider>
          <CurrencyProvider>
            <CartProvider>
              <WishlistProvider>
                <QuickViewProvider>
                  <Navbar />
                  <main className="flex-1">{children}</main>
                  <Footer />
                </QuickViewProvider>
              </WishlistProvider>
            </CartProvider>
          </CurrencyProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
