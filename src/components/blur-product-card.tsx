import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";

interface ProductCardProps {
  title: string;
  price: number;
  imageUrl: string;
  badge?: string;
}

export default function BlurProductCard({
  title,
  price,
  imageUrl,
  badge,
}: ProductCardProps) {
  return (
    <Card className="w-full max-w-sm overflow-hidden cursor-pointer">
      <div className="relative">
        <AspectRatio ratio={3 / 4}>
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </AspectRatio>
        {badge && (
          <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
            {badge}
          </Badge>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 backdrop-blur-md bg-black/30">
          <CardContent className="p-3">
            <CardTitle className="text-lg mb-1 text-white dark:text-gray-100 truncate">
              {title}
            </CardTitle>
            <p className="text-base font-bold text-white dark:text-gray-100">
              ${price.toFixed(2)}
            </p>
          </CardContent>
          <CardFooter className="flex justify-between p-3 pt-0">
            <Button
              variant="secondary"
              className="bg-white/20 hover:bg-white/30 text-white text-sm"
            >
              View
            </Button>
            <Button className="bg-primary/80 hover:bg-primary text-sm">
              Add to Cart
            </Button>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
}
