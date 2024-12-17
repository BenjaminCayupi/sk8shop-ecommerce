import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

interface CategoryCardProps {
  title: string;
  imageUrl: string;
}

export default function CategoryCard({ title, imageUrl }: CategoryCardProps) {
  const url = imageUrl.startsWith("https")
    ? imageUrl
    : "/imgs/placeholder-image.jpg";
  return (
    <Card className="w-full overflow-hidden cursor-pointer">
      <div className="relative">
        <AspectRatio ratio={3 / 3} className="hover:scale-125">
          <Image
            src={url}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </AspectRatio>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 backdrop-blur-md bg-black/30">
          <CardContent className="p-7 text-center">
            <CardTitle className="text-lg mb-1 text-white dark:text-gray-100 truncate uppercase">
              {title}
            </CardTitle>
          </CardContent>
        </div>
      </div>
    </Card>
  );
}
