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
import FormDialog from "./form-dialog";
import FieldContainer from "./field-container";

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

    const response = await createUpdateCategory(
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

    const response = await getCategory(id);

    if (!response.ok) {
      toast.error(response.message);
      return;
    }

    const { data } = response;

    const valuesToSet = {
      title: data!.title,
      description: data!.description,
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
