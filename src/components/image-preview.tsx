import Image from "next/image";
import { Button } from "./ui/button";
import { Loader2, X } from "lucide-react";

interface Props {
  previews: { id: number; url: string; productId: number }[];
  deleteImage: (
    imageId: number,
    imageUrl: string
  ) => Promise<string | undefined>;
  loading: boolean;
}

export function ImagePreview({ previews, deleteImage, loading }: Props) {
  return (
    <div className="flex flex-row gap-4">
      {previews.map((preview, index) => (
        <div key={index} className="relative w-[150px] h-[150px]">
          <Image
            src={preview.url || "/placeholder.svg"}
            alt={`Preview ${index + 1}`}
            className="w-[150px] h-[150px] object-cover rounded-md"
            width={0}
            height={0}
          />

          {loading ? (
            <div className="absolute inset-0 bg-gray-400 bg-opacity-40 rounded-md flex items-center justify-center">
              <Loader2 className="animate-spin text-white font-extrabold w-[70px] h-[70px]" />
            </div>
          ) : (
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2"
              onClick={() => deleteImage(preview.id, preview.url)}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      ))}
    </div>
  );
}
