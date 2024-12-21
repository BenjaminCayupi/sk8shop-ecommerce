import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Badge } from "./ui/badge";
import Link from "next/link";

interface Props {
  title: string;
  price: number;
  imageUrl: string;
  badge?: string;
}

export default function ProductCard({ title, price, badge }: Props) {
  return (
    <Link href="/product/asd">
      <Card>
        <AspectRatio ratio={16 / 9} className="overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
            alt="Photo by Drew Beamer"
            fill
            className="h-full w-full rounded-md object-cover hover:scale-125 transform transition duration-y"
            sizes="100%"
          />
          {badge && (
            <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground dark:bg-black dark:text-white capitalize">
              {badge}
            </Badge>
          )}
        </AspectRatio>
        <CardContent className="p-2 text-center">
          <p className="font-semibold tracking-tight capitalize">{title}</p>
          <p>$ {price}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
