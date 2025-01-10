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
import { Switch } from "../ui/switch";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { createCategory } from "@/actions/categories/create-categories";
import toast from "react-hot-toast";

interface Props {
  isEdit: boolean;
}

type Inputs = {
  title: string;
  description: string;
  enabled: boolean;
};

export function CategoryForm({ isEdit }: Props) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);

    const response = await createCategory(data);

    if (!response.ok) {
      toast.error(response.message);
      setLoading(false);
      return;
    }

    setLoading(false);
    setOpen(false);
    toast.success(response.message);
  };

  return (
    <Dialog open={open} onOpenChange={(value) => setOpen(value)}>
      <DialogTrigger asChild>
        {isEdit ? (
          <Button size="icon" onClick={() => setOpen(true)}>
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
          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="button"
                variant="secondary"
                className="mr-2"
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
