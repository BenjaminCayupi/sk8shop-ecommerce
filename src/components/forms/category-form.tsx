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

import { createUpdateCategory } from "@/actions/categories/create-update-category";
import { getCategory } from "@/actions/categories/get-category";
import toast from "react-hot-toast";

interface Props {
  isEdit: boolean;
  id?: number;
}

type Inputs = {
  title: string;
  description: string;
  enabled: boolean;
};

export function CategoryForm({ isEdit, id }: Props) {
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
      response = await createUpdateCategory({ ...data, id });
    } else {
      response = await createUpdateCategory(data);
    }

    if (!response.ok) {
      toast.error(response.message);
      setLoading(false);
      return;
    }

    setLoading(false);
    setOpen(false);
    toast.success(response.message);
  };

  const editModel = async (id: number) => {
    setOpen(true);
    setFormLoading(true);

    const response = await getCategory(id);

    if (!response.ok) {
      toast.error(response.message);
    }

    setValue("title", response.data!.title, { shouldValidate: true });
    setValue("description", response.data!.description, {
      shouldValidate: true,
    });
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
            } Categoría`}</DialogTitle>
            <DialogDescription>
              Haz cambios en tus categorías aquí. Oprime guardar cuando estes
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
                <p className="text-sm text-red-400">
                  {errors.description?.message}
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
