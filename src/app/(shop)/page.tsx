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

const slides = [
  {
    imageUrl:
      "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80",
  },
];

export default function ShopPage() {
  return (
    <>
      <HeroSection slides={slides} />
      <div className="container">
        <ProductsCarousel title="New Arrivals" products={testProducts} />
        <CategorySection />
      </div>
      <BannerSection />
      <div className="container">
        <ProductsCarousel title="Mas vendidos" products={testProducts} />
        <OurBrandsSection />
      </div>
    </>
  );
}
