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
    setLoading(true);
    let response;

    if (isEdit) {
      response = await createUpdateSubCategory({ ...data, id });
    } else {
      response = await createUpdateSubCategory(data);
    }

    if (!response.ok) {
      toast.error(response.message);
      setLoading(false);
      reset();
      return;
    }

    setLoading(false);
    setOpen(false);
    reset();
    toast.success(response.message);
  };

  const editModel = async (id: number) => {
    setOpen(true);
    setFormLoading(true);

    const response = await getSubcategory(id);

    if (!response.ok) {
      toast.error(response.message);
    }

    setValue("title", response.data!.title, { shouldValidate: true });
    setValue("description", response.data!.description, {
      shouldValidate: true,
    });
    setValue("categoryId", response.data!.categoryId.toString());
    setValue("enabled", response.data!.enabled, {
      shouldValidate: true,
    });

    setFormLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={(value) => setOpen(value)}>
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
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>{`${
              isEdit ? "Editar" : "Crear"
            } Subcategoría`}</DialogTitle>
            <DialogDescription>
              Haz cambios en tus subcategorías aquí. Oprime guardar cuando estés
              listo.
            </DialogDescription>
          </DialogHeader>
          {formLoading ? (
            <div className="w-full h-[250px] content-center justify-items-center">
              <Loader2 className="motion-preset-spin" size={50} />
            </div>
          ) : (
            <div className="grid gap-4 py-4">
              <div className="grid items-center gap-3">
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
                <p className="text-sm text-red-400 w-full">
                  {errors.title?.message}
                </p>
              </div>

              <div className="grid items-center gap-3">
                <Label htmlFor="description" className="text-left">
                  Descripción
                </Label>
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
                <p className="text-sm text-red-400">
                  {errors.description?.message}
                </p>
              </div>

              <div className="grid items-center gap-3">
                <Label htmlFor="description" className="text-left">
                  Categoría
                </Label>
                <Controller
                  name="categoryId"
                  control={control}
                  rules={{ required: "El campo es requerido." }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full capitalize">
                        <SelectValue placeholder="Seleccionar categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories &&
                          categories.map((category) => (
                            <SelectItem
                              key={category.id}
                              value={category.id.toString()}
                              className="capitalize"
                            >
                              {category.title}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                <p className="text-sm text-red-400">
                  {errors.categoryId?.message}
                </p>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
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
            </div>
          )}

          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="button"
                variant="secondary"
                className="mr-2"
                disabled={loading}
                onClick={() => {
                  reset();
                  setOpen(false);
                }}
              >
                Cerrar
              </Button>
            </DialogClose>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="animate-spin" />}
              Guardar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
