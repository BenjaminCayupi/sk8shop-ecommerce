import BannerSection from "@/components/sections/banner-section";
import Footer from "@/components/footer";
import HeroSection from "@/components/sections/hero-section";
import ProductsCarousel from "@/components/products-carousel";
import CategorySection from "@/components/sections/category-section";
import OurBrandsSection from "@/components/sections/our-brands-section";

const testProducts = [
  { title: "Tabla Skate", price: 30000, imageUrl: "", badge: "Nuevo" },
  { title: "Tabla Skate", price: 30000, imageUrl: "", badge: "Nuevo" },
  { title: "Tabla Skate", price: 30000, imageUrl: "", badge: "Nuevo" },
  { title: "Tabla Skate", price: 30000, imageUrl: "", badge: "Nuevo" },
  { title: "Tabla Skate", price: 30000, imageUrl: "", badge: "Nuevo" },
  { title: "Tabla Skate", price: 30000, imageUrl: "", badge: "Nuevo" },
  { title: "Tabla Skate", price: 30000, imageUrl: "", badge: "Nuevo" },
];

export default function ShopPage() {
  return (
    <>
      <HeroSection />
      <div className="container mx-auto px-4">
        <ProductsCarousel title="New Arrivals" products={testProducts} />
        <CategorySection />
      </div>
      <BannerSection />
      <div className="container mx-auto px-4">
        <ProductsCarousel title="Mas vendidos" products={testProducts} />
        <OurBrandsSection />
      </div>
      <Footer />
    </>
  );
}
