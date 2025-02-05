"use client";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Switch } from "../ui/switch";
import { Textarea } from "../ui/textarea";

import { createUpdateSubCategory } from "@/actions/subcategories/create-update-subcategory";
import { Category } from "@prisma/client";
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { getSubcategory } from "@/actions/subcategories/get-subcategory";
import FormDialog from "./form-dialog";
import FieldContainer from "./field-container";

interface Props {
  isEdit: boolean;
  id?: number;
  categories: Category[] | undefined;
}

type Inputs = {
  title: string;
  description: string;
  categoryId: string;
  enabled: boolean;
};

export function SubcategoryForm({ isEdit, id, categories }: Props) {
  const [{ loading, formLoading, open }, setStates] = useState({
    loading: false,
    formLoading: false,
    open: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset: resetForm,
    setValue,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setStates((prev) => ({ ...prev, loading: true }));

    const response = await createUpdateSubCategory(
      isEdit ? { ...data, id } : data
    );

    if (!response.ok) {
      toast.error(response.message);
      setStates((prev) => ({ ...prev, loading: false }));
      return;
    }

    setStates((prev) => ({ ...prev, loading: false, open: false }));
    resetForm();
    toast.success(response.message);
  };

  const editModel = async (id: number) => {
    setStates((prev) => ({ ...prev, open: true, formLoading: true }));

    const response = await getSubcategory(id);

    if (!response.ok) {
      toast.error(response.message);
      return;
    }

    const { data } = response;

    const valuesToSet = {
      title: data!.title,
      description: data!.description,
      categoryId: data!.categoryId.toString(),
      enabled: data!.enabled,
    };

    Object.entries(valuesToSet).forEach(([key, value]) => {
      setValue(key as keyof typeof valuesToSet, value, {
        shouldValidate: true,
      });
    });

    setStates((prev) => ({ ...prev, formLoading: false }));
  };

  return (
    <FormDialog
      open={open}
      onOpenChange={(open) => setStates((prev) => ({ ...prev, open }))}
      isEdit={isEdit}
      id={id}
      toggleEdit={editModel}
      openModal={() => setStates((prev) => ({ ...prev, open: true }))}
      loading={loading}
      formLoading={formLoading}
      closeForm={() => {
        setStates((prev) => ({ ...prev, open: false }));
        resetForm();
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid gap-4 py-4">
        <div className="grid items-center gap-3">
          <FieldContainer label="Nombre" error={errors.title?.message}>
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
          </FieldContainer>
        </div>

        <div className="grid items-center gap-3">
          <FieldContainer
            label="Descripción"
            error={errors.description?.message}
          >
            <Textarea
              placeholder="Descripción de la subcategoría"
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
          </FieldContainer>
        </div>

        <div className="grid items-center gap-3">
          <FieldContainer label="Categoría" error={errors.categoryId?.message}>
            <Controller
              name="categoryId"
              control={control}
              rules={{
                required: "El campo es requerido.",
                validate: (value) =>
                  value !== "no-values" || "Debe seleccionar una opción",
              }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full capitalize">
                    <SelectValue placeholder="Seleccionar categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories && categories.length ? (
                      categories.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={category.id.toString()}
                          className="capitalize"
                        >
                          {category.title}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="no-values" disabled>
                        No hay categorías
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              )}
            />
          </FieldContainer>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
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
      </div>
    </FormDialog>
  );
}
