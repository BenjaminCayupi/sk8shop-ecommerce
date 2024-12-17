import Image from "next/image";

import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function BannerSection() {
  return (
    <div className="h-[300px] mb-8">
      <AspectRatio ratio={16 / 9} className="h-[300px] w-full">
        <Image
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
          alt="Photo by Drew Beamer"
          fill
          className="object-cover"
        />
      </AspectRatio>
    </div>
  );
}
