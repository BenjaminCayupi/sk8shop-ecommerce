"use client";

import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";

interface Props {
  slides: { imageUrl: string }[];
}

export default function HeroSection({ slides }: Props) {
  const options = {
    loop: true,
  };
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ playOnInit: true, delay: 3000 }),
  ]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <>
      <div className="embla">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {slides.length ? (
              slides.map((slide, index) => (
                <div className="embla__slide sm:h-[300px]  " key={index}>
                  <AspectRatio ratio={16 / 9} className="h-full w-full">
                    <Image
                      src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
                      alt="Photo by Drew Beamer"
                      fill
                      className="object-cover"
                    />
                  </AspectRatio>
                </div>
              ))
            ) : (
              <p className="text-center w-full my-6">No slides</p>
            )}
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-2">
        <Button variant="ghost" onClick={scrollPrev} size={"icon"}>
          <ChevronLeft />
        </Button>
        <Button variant="ghost" onClick={scrollNext} size={"icon"}>
          <ChevronRight />
        </Button>
      </div>
    </>
  );
}
