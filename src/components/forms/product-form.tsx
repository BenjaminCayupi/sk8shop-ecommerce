"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit, Loader2, Plus } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { Separator } from "../ui/separator";
import SizeSelect from "../select-multiple";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Brand, Size, SubCategory } from "@prisma/client";

interface Props {
  isEdit: boolean;
  id?: number;
  brands: Brand[] | undefined;
  subCategories: SubCategory[] | undefined;
  sizes: Size[] | undefined;
}

type Inputs = {
  title: string;
  price: number;
  description: string;
  brandId: string;
  subCategoryId: string;
  /* sizes: string[];
  quantity: { size: string; quantity: number }; */
  enabled: boolean;
};

export function ProductForm({ isEdit, id, brands, subCategories }: Props) {
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    setValue,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log("data :", data);
  };

  const editModel = async (id: number) => {};

  return (
    <Dialog>
      <DialogTrigger asChild>
        {isEdit ? (
          <Button size="icon" onClick={() => id !== undefined && editModel(id)}>
            <Edit />
          </Button>
        ) : (
          <Button onClick={() => setOpen(true)}>
            <Plus />
            Agregar
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md md:max-w-[800px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>{`${
              isEdit ? "Editar" : "Crear"
            } Producto`}</DialogTitle>
            <DialogDescription>
              Haz cambios en tus productos aquí. Oprime guardar cuando estés
              listo.
            </DialogDescription>
          </DialogHeader>
          {formLoading ? (
            <div className="w-full h-[250px] content-center justify-items-center">
              <Loader2 className="motion-preset-spin" size={50} />
            </div>
          ) : (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-left">
                  Nombre
                </Label>
                <Input
                  id="name"
                  className="col-span-3"
                  {...register("title", {
                    required: "El campo es requerido.",
                    minLength: {
                      value: 4,
                      message: "Mínimo 4 caracteres.",
                    },
                  })}
                />
                {errors.title?.message && (
                  <p className="text-sm text-red-400 w-full">
                    {errors.title?.message}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-left">
                  Precio
                </Label>
                <Input
                  id="name"
                  type="number"
                  className="col-span-3"
                  {...register("price", {
                    required: "El campo es requerido.",
                    min: {
                      value: 1000,
                      message: "Valor mínimo 1000",
                    },
                  })}
                />
                {errors.price?.message && (
                  <p className="text-sm text-red-400 w-full">
                    {errors.price?.message}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-left">
                  Descripción
                </Label>
                <Textarea
                  placeholder="Descripción de la categoría"
                  className="col-span-3"
                  {...register("description", {
                    required: "El campo es requerido.",
                    minLength: {
                      value: 4,
                      message: "Mínimo 4 caracteres.",
                    },
                    maxLength: {
                      value: 40,
                      message: "Máximo 40 caracteres.",
                    },
                  })}
                />
                {errors.description?.message && (
                  <p className="text-sm text-red-400 w-full">
                    {errors.description?.message}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-left">
                  Marca
                </Label>
                <Controller
                  name="brandId"
                  control={control}
                  rules={{
                    required: "El campo es requerido.",
                    validate: (value) =>
                      value !== "no-fruits" || "Debe seleccionar una opción",
                  }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full capitalize col-span-3">
                        <SelectValue placeholder="Seleccionar marca" />
                      </SelectTrigger>
                      <SelectContent>
                        {brands && brands.length ? (
                          brands.map((brand) => (
                            <SelectItem
                              key={brand.id}
                              value={brand.id.toString()}
                              className="capitalize"
                            >
                              {brand.title}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="no-fruits" disabled>
                            No hay marcas
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.brandId?.message && (
                  <p className="text-sm text-red-400 w-full">
                    {errors.brandId?.message}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-left">
                  Subcategoría
                </Label>
                <Controller
                  name="subCategoryId"
                  control={control}
                  rules={{
                    required: "El campo es requerido.",
                    validate: (value) =>
                      value !== "no-fruits" || "Debe seleccionar una opción",
                  }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full capitalize col-span-3">
                        <SelectValue placeholder="Seleccionar categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        {subCategories && subCategories.length ? (
                          subCategories.map((subCategory) => (
                            <SelectItem
                              key={subCategory.id}
                              value={subCategory.id.toString()}
                              className="capitalize"
                            >
                              {subCategory.title}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="no-fruits" disabled>
                            No hay subcategorías
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.subCategoryId?.message && (
                  <p className="text-sm text-red-400 w-full">
                    {errors.subCategoryId?.message}
                  </p>
                )}
              </div>
              <Separator className="my-4" />
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="name"
                  className="text-left align-top self-start mt-3"
                >
                  Tallas
                </Label>
                <div className="col-span-3">
                  <SizeSelect />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary" className="mr-2">
                Cerrar
              </Button>
            </DialogClose>
            <Button type="submit">Guardar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
