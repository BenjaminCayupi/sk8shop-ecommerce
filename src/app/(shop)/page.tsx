import BannerSection from "@/components/banner-section";
import CategorySection from "@/components/category-section";
import Footer from "@/components/footer";
import HeroSection from "@/components/hero-section";
import OurBrandsSection from "@/components/our-brands-section";
import ProductsCarousel from "@/components/products-carousel";

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
