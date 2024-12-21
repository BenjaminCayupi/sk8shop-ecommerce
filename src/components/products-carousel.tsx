import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import SectionTitle from "./section-title";
import ProductCard from "./product-card";

interface Props {
  title: string;
  products: {
    title: string;
    price: number;
    imageUrl: string;
    badge?: string;
  }[];
}

export default function ProductsCarousel({ title, products }: Props) {
  return (
    <section className="w-full mb-8 motion-preset-slide-up">
      <SectionTitle title={title} />
      <Carousel className="w-full mt-8">
        <CarouselContent className="-ml-1">
          {products.length ? (
            products.map((_, index) => (
              <CarouselItem
                key={index}
                className="pl-1 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <div className="p-1">
                  <ProductCard
                    title="tabla skate"
                    price={3000}
                    imageUrl=""
                    badge="nuevo"
                  />
                </div>
              </CarouselItem>
            ))
          ) : (
            <div className="w-full">
              <p className="text-center text-semibold text-gray-500">
                Hubo un error al cargar los productos
              </p>
            </div>
          )}
        </CarouselContent>

        <div className="hidden lg:block">
          <CarouselPrevious />
          <CarouselNext />
        </div>
        <div className="lg:hidden">
          <div className="absolute top-1/2 left-2 flex items-center justify-center">
            <CarouselPrevious className="relative left-0 translate-x-0 hover:translate-x-0 hover:bg-gray-200 dark:hover:bg-gray-700" />
          </div>
          <div className="absolute top-1/2 right-2 flex items-center justify-center">
            <CarouselNext className="relative right-0 translate-x-0 hover:translate-x-0 hover:bg-gray-200 dark:hover:bg-gray-700" />
          </div>
        </div>
      </Carousel>
    </section>
  );
}
