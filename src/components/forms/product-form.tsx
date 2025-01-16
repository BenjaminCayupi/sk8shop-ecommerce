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
import { useState } from "react";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Brand, Size, SubCategory } from "@prisma/client";
import MultipleSelector, { Option } from "../ui/multiple-selector";
import { Badge } from "../ui/badge";
import { createSlug } from "@/utils";
import { Switch } from "../ui/switch";
import { createUpdateProduct } from "@/actions/products/create-update-product";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Props {
  isEdit: boolean;
  id?: number;
  brands: Brand[] | undefined;
  subCategories: SubCategory[] | undefined;
  sizes: Size[] | undefined;
}

type Inputs = {
  title: string;
  slug: string;
  price: number;
  description: string;
  brandId: string;
  subCategoryId: string;
  sizes: Option[];
  quantity: { size: string; quantity: number; sizeId: number }[];
  enabled: boolean;
};

export function ProductForm({
  isEdit,
  id,
  brands,
  subCategories,
  sizes,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    watch,
    setValue,
  } = useForm<Inputs>();

  const { fields, replace } = useFieldArray({
    control,
    name: "quantity",
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await createUpdateProduct(data);
  };

  const editModel = async (id: number) => {};

  const formattedSizes: Option[] = sizes
    ? sizes.map((item) => ({ value: item.id.toString(), label: item.title }))
    : [];

  const appendQuantityFields = (options: Option[]) => {
    const formattedOptions = options.map((item) => ({
      size: item.label,
      quantity: 0,
      sizeId: Number(item.value),
    }));

    replace(formattedOptions);
  };

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
      <DialogContent className="sm:max-w-md md:max-w-5xl">
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
            <ScrollArea className="h-[500px] w-full border-0 p-2">
              <div className="grid grid-cols-2 gap-4 py-4 p-2">
                {/* Name */}
                <div className="grid col-span-2 items-center gap-4">
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
                {/* Slug */}
                <div className="grid col-span-2 items-center gap-4">
                  <Label htmlFor="name" className="text-left">
                    Slug
                  </Label>
                  <Input
                    onFocus={() => setValue("slug", createSlug(watch("title")))}
                    id="name"
                    className="col-span-3"
                    {...register("slug", {
                      required: "El campo es requerido.",
                      minLength: {
                        value: 4,
                        message: "Mínimo 4 caracteres.",
                      },
                    })}
                  />
                  {errors.slug?.message && (
                    <p className="text-sm text-red-400 w-full">
                      {errors.slug?.message}
                    </p>
                  )}
                </div>
                {/* Price */}
                <div className="grid col-span-2 items-center gap-4">
                  <Label htmlFor="name" className="text-left">
                    Precio
                  </Label>
                  <Input
                    id="name"
                    type="number"
                    className="col-span-3"
                    {...register("price", {
                      required: "El campo es requerido.",
                      valueAsNumber: true,
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
                {/* Brand */}
                <div className="grid col-span-2 items-center gap-4">
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
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
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
                {/* Subcategory */}
                <div className="grid col-span-2 items-center gap-4">
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
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
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
                {/* Enabled */}
                <div className="grid items-center gap-4">
                  <Label htmlFor="airplane-mode">Habilitado</Label>
                  <Controller
                    control={control}
                    name="enabled"
                    defaultValue={false}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Switch
                        onCheckedChange={onChange}
                        onBlur={onBlur}
                        checked={value}
                      />
                    )}
                  />
                </div>
                {/* Description */}
                <div className="grid col-span-2 items-center gap-4">
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
                {/* Sizes */}
                <div className="grid col-span-2 items-center gap-4 mb-10">
                  <Separator className="my-4 col-span-3" />
                  <Label
                    htmlFor="name"
                    className="text-left align-top self-start col-span-3"
                  >
                    Tallas
                  </Label>
                  <div className="col-span-3">
                    <Controller
                      name="sizes"
                      control={control}
                      rules={{
                        required: "El campo es requerido.",
                      }}
                      render={({ field }) => (
                        <MultipleSelector
                          onChange={(e) => {
                            appendQuantityFields(e);
                            return field.onChange(e);
                          }}
                          badgeClassName="uppercase"
                          value={field.value}
                          defaultOptions={formattedSizes}
                          hidePlaceholderWhenSelected
                          placeholder="Seleccionar tallas"
                          creatable
                          emptyIndicator={
                            <p className="text-center text-sm  text-gray-600 dark:text-gray-400">
                              No quedan tallas
                            </p>
                          }
                        />
                      )}
                    />
                    {errors.sizes?.message && (
                      <p className="text-sm text-red-400 w-full">
                        {errors.sizes?.message}
                      </p>
                    )}
                    <div className="grid grid-cols-2 gap-x-3">
                      {fields.length > 0 &&
                        fields.map((item, index) => (
                          <div
                            key={item.size}
                            className="flex flex-row mt-4 align-middle justify-between"
                          >
                            <div className="w-1/6 flex">
                              <Badge
                                variant="outline"
                                className="w-4/6 flex justify-center"
                              >
                                {item.size.toUpperCase()}
                              </Badge>
                            </div>
                            <Input
                              {...register(`quantity.${index}.quantity`, {
                                required: "El campo es requerido.",
                                valueAsNumber: true,
                                min: 1,
                              })}
                              type="number"
                              className="w-5/6"
                              placeholder="Cantidad"
                            />
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary" className="mr-2">
                Cerrar
              </Button>
            </DialogClose>
            <Button type="submit" className="mb-2 ">
              Guardar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
