import CategoryCard from "@/components/category-card";
import { HeroSection } from "@/components/hero-section";
import { ProductsCarousel } from "@/components/products-carousel";
import SectionTitle from "@/components/section-title";

export default function ShopPage() {
  return (
    <>
      <HeroSection />
      <div className="container mx-auto px-4 pt-4">
        {/* Recien llegados */}
        <ProductsCarousel />

        {/* Categorías */}
        <section className="pt-5">
          <SectionTitle title="Categorías" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <CategoryCard title="skate" imageUrl="" />
            <CategoryCard title="ropa" imageUrl="" />
            <CategoryCard title="zapatillas" imageUrl="" />
          </div>
        </section>
      </div>
    </>
  );
}
