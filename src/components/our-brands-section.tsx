"use client";
import SectionTitle from "./section-title";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { AspectRatio } from "./ui/aspect-ratio";
import Image from "next/image";

export default function OurBrandsSection() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );
  const x = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  return (
    <section className="mb-8">
      <SectionTitle title="Marcas" />
      <Carousel plugins={[plugin.current]}>
        <CarouselContent>
          {x.map((item, index) => (
            <CarouselItem className="md:basis-1/3 lg:basis-1/5" key={index}>
              <div className="">
                <AspectRatio ratio={4 / 3} className="bg-muted">
                  <Image
                    src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
                    alt="Photo by Drew Beamer"
                    fill
                    className="h-full w-full rounded-md object-cover"
                  />
                </AspectRatio>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
