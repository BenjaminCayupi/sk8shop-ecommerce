"use client";
import { Category } from "@prisma/client";
import MultipleSelector, { Option } from "../ui/multiple-selector";
import { useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Trash2, Upload } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import { Input } from "../ui/input";
import toast from "react-hot-toast";

interface Props {
  categories: Category[];
}
export default function HighlightCategoriesForm({ categories }: Props) {
  const [options, setOptions] = useState<Option[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formattedCategories: Option[] = categories.map((category) => ({
    value: category.id.toString(),
    label: category.title,
    imageUrl: "",
  }));

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  console.log("options :", options);

  return (
    <div>
      <h3 className="text-lg font-bold mb-3">Categorías destacadas</h3>
      <MultipleSelector
        value={options}
        onChange={setOptions}
        defaultOptions={formattedCategories}
        hidePlaceholderWhenSelected
        placeholder="Seleccionar tallas"
        maxSelected={3}
        emptyIndicator={
          <p className="text-center text-sm  text-gray-600 dark:text-gray-400">
            No hay categorías creadas o habilitadas
          </p>
        }
        onMaxSelected={() => toast.error("Máximo 3 categorías")}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
        {options.map((item) => (
          <Card key={item.value}>
            <CardHeader>
              <CardTitle>{item?.label}</CardTitle>
            </CardHeader>
            <CardContent>
              {item.imageUrl ? (
                <Image
                  src={item.imageUrl !== "" || "/placeholder.svg"}
                  alt={`${item.label} image`}
                  className="w-full h-40 object-cover rounded-md"
                />
              ) : (
                <div className="w-full h-40 bg-gray-200 rounded-md flex items-center justify-center">
                  <p className="text-gray-500">No image uploaded</p>
                </div>
              )}
              <div className="mt-4 grid lg:grid-cols-2 gap-2">
                <Input
                  type="file"
                  ref={fileInputRef}
                  id={`file-${item.value}`}
                  className="hidden"
                  accept="image/*"
                  /* onChange={(e) => handleImageUpload(categoryId, e)} */
                />

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={triggerFileInput}
                >
                  <Upload className="mr-2 h-4 w-4" /> Subir
                </Button>

                <Button
                  variant="secondary"
                  className="w-full bg-red-500 text-white dark:bg-gray-800"
                  onClick={triggerFileInput}
                >
                  <Trash2 className="mr-2 h-4 w-4" /> Eliminar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
