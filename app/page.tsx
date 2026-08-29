import { HeroSection } from "@/components/home/HeroSection";
import { BrandTrust } from "@/components/home/BrandTrust";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { BestSellerSection } from "@/components/home/BestSellerSection";
import { NewArrivalCarousel } from "@/components/home/NewArrivalCarousel";
import { CollectionsBanner } from "@/components/home/CollectionsBanner";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { Testimonials } from "@/components/home/Testimonials";
import { InstagramGallery } from "@/components/home/InstagramGallery";
import { NewsletterSection } from "@/components/home/NewsletterSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BrandTrust />
      <CategoryGrid />
      <FeaturedProducts />
      <BestSellerSection />
      <NewArrivalCarousel />
      <CollectionsBanner />
      <WhyChooseUs />
      <Testimonials />
      <InstagramGallery />
      <NewsletterSection />
    </>
  );
}
