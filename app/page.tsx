import { HeroSection } from "@/components/home/HeroSection";
import { BrandTrust } from "@/components/home/BrandTrust";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { BestSellerSection } from "@/components/home/BestSellerSection";
import { NewArrivalCarousel } from "@/components/home/NewArrivalCarousel";

import { Testimonials } from "@/components/home/Testimonials";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BrandTrust />
      <NewArrivalCarousel />
      <CategoryGrid />
      <FeaturedProducts />
      <BestSellerSection />

      <Testimonials />
    </>
  );
}
