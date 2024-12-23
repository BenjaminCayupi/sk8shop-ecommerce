import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Badge, Heart, ShoppingCart } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";

interface Props {
  title: string;
  price: number;
  imageUrl: string;
  badge?: string;
}

export default function FavoriteProductCard({ title, price, badge }: Props) {
  return (
    <Card>
      <AspectRatio ratio={16 / 9} className="overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
          alt="Photo by Drew Beamer"
          fill
          className="h-full w-full rounded-t-md object-cover hover:scale-125 transform transition duration-y"
          sizes="100%"
        />
        {badge && (
          <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground dark:bg-black dark:text-white capitalize">
            {badge}
          </Badge>
        )}
      </AspectRatio>
      <CardContent className="p-4 text-left">
        <p className="font-semibold tracking-tight capitalize">{title}</p>
        <p>$ {price}</p>
        <div className="flex flex-col sm:flex-row justify-between pt-3 gap-3">
          <Button size="lg" className="w-full">
            <ShoppingCart /> Agregar
          </Button>
          <Button size="lg" variant="secondary" className="w-full">
            <Heart />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
