"use client";
import { createUpdateProduct } from "@/actions/products/create-update-product";
import { getProduct } from "@/actions/products/get-product";
import { deleteProductImage } from "@/actions/products/remove-image";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { createSlug, productValidations } from "@/utils";
import { Brand, Size, SubCategory } from "@prisma/client";
import { useState } from "react";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import toast from "react-hot-toast";
import { ImagePreview } from "../image-preview";
import { Badge } from "../ui/badge";
import MultipleSelector, { Option } from "../ui/multiple-selector";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Separator } from "../ui/separator";
import { Switch } from "../ui/switch";
import { Textarea } from "../ui/textarea";
import FormDialog from "./form-dialog";
import FieldContainer from "./field-container";

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
  images?: FileList;
};

export function ProductForm({
  isEdit,
  id,
  brands,
  subCategories,
  sizes,
}: Props) {
  const [{ loading, formLoading, open }, setStates] = useState({
    loading: false,
    formLoading: false,
    open: false,
  });
  const [previews, setPreviews] = useState<
    { id: number; url: string; productId: number }[]
  >([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    watch,
    setValue,
  } = useForm<Inputs>();

  const { fields, replace } = useFieldArray({ control, name: "quantity" });

  const resetForm = () => {
    reset();
    replace([]);
    setValue("sizes", []);
    setPreviews([]);
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setStates((prev) => ({ ...prev, loading: true }));
    const response = await createUpdateProduct(isEdit ? { ...data, id } : data);

    if (!response.ok) {
      toast.error(response.message);
      setStates((prev) => ({ ...prev, loading: false }));
      return;
    }

    setStates((prev) => ({ ...prev, loading: false, open: false }));
    resetForm();
    toast.success(response.message);
  };

  const editModal = async (id: number) => {
    setStates((prev) => ({ ...prev, open: true, formLoading: true }));
    const response = await getProduct(id);

    if (!response.ok) {
      toast.error(response.message);
      return;
    }

    const { data } = response;
    const valuesToSet = {
      title: data!.title,
      slug: data!.slug,
      price: data!.price,
      brandId: data!.brandId.toString(),
      subCategoryId: data!.subCategoryId.toString(),
      enabled: data!.enabled,
      description: data!.description,
      sizes: data!.Inventory.map((item) => ({
        value: item.size.id.toString(),
        label: item.size.title,
      })),
    };

    Object.entries(valuesToSet).forEach(([key, value]) => {
      setValue(key as keyof typeof valuesToSet, value, {
        shouldValidate: true,
      });
    });

    if (data?.ProductImage.length) setPreviews(data.ProductImage);

    const options = data?.Inventory.map((item) => ({
      size: item.size.title,
      quantity: item.quantity,
      sizeId: item.size.id,
    }));

    if (options) replace(options);
    setStates((prev) => ({ ...prev, formLoading: false }));
  };

  const formattedSizes: Option[] =
    sizes?.map((item) => ({
      value: item.id.toString(),
      label: item.title,
    })) ?? [];

  const appendQuantityFields = (options: Option[]) => {
    const newFields = options.map((item) => ({
      size: item.label,
      quantity: id
        ? fields.find((f) => f.sizeId === Number(item.value))?.quantity ?? 0
        : 0,
      sizeId: Number(item.value),
    }));
    replace(newFields);
  };

  const deleteImage = async (imageId: number, imageUrl: string) => {
    setStates((prev) => ({ ...prev, loading: true }));
    const response = await deleteProductImage(imageId, imageUrl);

    if (!response.ok) {
      toast.error("Hubo un error al eliminar la imagen.");
    } else {
      setPreviews((prev) => prev.filter((item) => item.id !== imageId));
    }
    setStates((prev) => ({ ...prev, loading: false }));
  };

  const validateFiles = (files: FileList | undefined) => {
    const previewCount = previews.length;
    const fileCount = files?.length ?? 0;
    return files || previewCount ? previewCount + fileCount <= 2 : false;
  };

  return (
    <FormDialog
      name="producto"
      open={open}
      onOpenChange={(open) => setStates((prev) => ({ ...prev, open }))}
      isEdit={isEdit}
      id={id}
      toggleEdit={editModal}
      openModal={() => setStates((prev) => ({ ...prev, open: true }))}
      loading={loading}
      formLoading={formLoading}
      closeForm={() => {
        setStates((prev) => ({ ...prev, open: false }));
        resetForm();
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <ScrollArea className="h-[500px] w-full border-0 p-2">
        <div className="grid grid-cols-2 gap-4 py-4 p-2">
          {/* Name */}
          <div className="grid col-span-2 items-center gap-4">
            <FieldContainer label="Nombre" error={errors.title?.message}>
              <Input
                id="name"
                className="col-span-3"
                {...register("title", productValidations.title)}
              />
            </FieldContainer>
          </div>
          {/* Slug */}
          <div className="grid col-span-2 items-center gap-4">
            <FieldContainer label="Slug" error={errors.slug?.message}>
              <Input
                onFocus={() => setValue("slug", createSlug(watch("title")))}
                id="name"
                className="col-span-3"
                {...register("slug", productValidations.slug)}
              />
            </FieldContainer>
          </div>
          {/* Price */}
          <div className="grid col-span-2 items-center gap-4">
            <FieldContainer label="Precio" error={errors.price?.message}>
              <Input
                id="name"
                type="number"
                className="col-span-3"
                {...register("price", productValidations.price)}
              />
            </FieldContainer>
          </div>
          {/* Brand */}
          <div className="grid col-span-2 items-center gap-4">
            <FieldContainer label="Marca" error={errors.brandId?.message}>
              <Controller
                name="brandId"
                control={control}
                rules={productValidations.brandId}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full capitalize col-span-3">
                      <SelectValue placeholder="Seleccionar marca" />
                    </SelectTrigger>
                    <SelectContent>
                      {brands?.map((brand) => (
                        <SelectItem
                          key={brand.id}
                          value={brand.id.toString()}
                          className="capitalize cursor-pointer"
                        >
                          {brand.title}
                        </SelectItem>
                      )) ?? (
                        <SelectItem value="no-values" disabled>
                          No hay marcas
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                )}
              />
            </FieldContainer>
          </div>
          {/* Subcategory */}
          <div className="grid col-span-2 items-center gap-4">
            <FieldContainer
              label="Subcategoría"
              error={errors.subCategoryId?.message}
            >
              <Controller
                name="subCategoryId"
                control={control}
                rules={productValidations.subCategoryId}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full capitalize col-span-3">
                      <SelectValue placeholder="Seleccionar categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      {subCategories?.map((subCategory) => (
                        <SelectItem
                          key={subCategory.id}
                          value={subCategory.id.toString()}
                          className="capitalize cursor-pointer"
                        >
                          {subCategory.title}
                        </SelectItem>
                      )) ?? (
                        <SelectItem value="no-values" disabled>
                          No hay subcategorías
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                )}
              />
            </FieldContainer>
          </div>
          {/* Enabled */}
          <div className="grid items-center gap-4">
            <FieldContainer label="Habilitado">
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
            </FieldContainer>
          </div>
          {/* Description */}
          <div className="grid col-span-2 items-center gap-4">
            <FieldContainer
              label="Descripción"
              error={errors.description?.message}
            >
              <Textarea
                placeholder="Descripción de la categoría"
                className="col-span-3"
                {...register("description", productValidations.description)}
              />
            </FieldContainer>
          </div>
          {/* Images */}
          <div className="grid col-span-2 items-center gap-4">
            <Separator className="my-4 col-span-3" />
            <FieldContainer label="Imágenes" error={errors.images?.message}>
              <Controller
                name="images"
                control={control}
                defaultValue={undefined}
                rules={{
                  validate: (files) =>
                    validateFiles(files) ||
                    "Solo puedes subir un máximo de 2 archivos en total.",
                }}
                render={({ field }) => (
                  <Input
                    id="picture"
                    type="file"
                    accept="image/png, image/jpg, image/jpeg"
                    multiple
                    onChange={(e) => field.onChange(e.target.files)}
                    ref={field.ref}
                    className="w-full col-span-3"
                    disabled={previews.length >= 2}
                  />
                )}
              />
            </FieldContainer>
          </div>

          {previews.length > 0 && (
            <div className="grid col-span-2 items-center gap-4">
              <ImagePreview
                previews={previews}
                deleteImage={deleteImage}
                loading={loading}
              />
            </div>
          )}

          {/* Sizes */}
          <div className="grid col-span-2 items-center gap-4 mb-10">
            <Separator className="my-4 col-span-3" />
            <FieldContainer
              label="Tallas"
              error={errors.sizes?.message}
              className="text-left align-top self-start col-span-3"
            >
              <div className="col-span-3">
                <Controller
                  name="sizes"
                  control={control}
                  rules={productValidations.sizes}
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

                <div className="grid grid-cols-2 gap-x-3">
                  {fields.map((item, index) => (
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
            </FieldContainer>
          </div>
        </div>
      </ScrollArea>
    </FormDialog>
  );
}
