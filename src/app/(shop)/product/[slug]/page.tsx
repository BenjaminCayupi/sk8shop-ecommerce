import ProductThumbnail from "@/components/product-thumbnail/product-thumbnail";
import ProductsCarousel from "@/components/products-carousel";
import { Button } from "@/components/ui/button";
import { EmblaOptionsType } from "embla-carousel";
import { Heart, Minus, Plus, ShoppingCart } from "lucide-react";

const products = [
  {
    title: "Tabla Skate",
    price: 3000,
    imageUrl: "",
    badge: "nuevo",
  },
  {
    title: "Tabla Skate",
    price: 3000,
    imageUrl: "",
    badge: "nuevo",
  },
  {
    title: "Tabla Skate",
    price: 3000,
    imageUrl: "",
    badge: "nuevo",
  },
  {
    title: "Tabla Skate",
    price: 3000,
    imageUrl: "",
    badge: "nuevo",
  },
];

export default function ProductPage() {
  const OPTIONS: EmblaOptionsType = {};
  const SLIDE_COUNT = 3;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());
  return (
    <div className="container px-4 mt-8 flex flex-col">
      {/* Product Data */}
      <div className="w-full flex flex-col md:flex-row">
        <div className="w-full md:w-7/12 p-3">
          <ProductThumbnail slides={SLIDES} options={OPTIONS} />
        </div>
        <div className="w-full md:w-5/12 p-3 flex flex-col gap-y-5">
          <h2 className="font-bold text-3xl">Nombre Producto</h2>
          <p className="font-semibold">$10.990</p>
          <div className="w-4/6 lg:w-2/5 grid grid-cols-4 gap-2">
            <Button variant="outline">S</Button>
            <Button variant="outline">M</Button>
            <Button variant="outline">L</Button>
            <Button variant="outline">XL</Button>
          </div>
          <div className="w-fit flex flex-row items-center gap-x-4">
            <Button variant="secondary" size="icon">
              <Minus className="h-4 w-4" />
            </Button>
            <p>2</p>
            <Button variant="secondary" size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-col xl:flex-row w-full gap-4">
            <Button size="lg" className="w-full">
              <ShoppingCart /> Agregar al carro
            </Button>
            <Button size="lg" variant="secondary" className="w-full">
              <Heart /> Añadir a favoritos
            </Button>
          </div>
          <p className="text-gray-500">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio rem
            modi distinctio blanditiis temporibus voluptates! Doloremque placeat
            ratione voluptatibus rerum?sad
          </p>
        </div>
      </div>
      {/* Other Products */}
      <div>
        <ProductsCarousel title="Podría interesarte" products={products} />
      </div>
    </div>
  );
}
