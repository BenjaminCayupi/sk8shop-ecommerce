"use client";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Switch } from "../ui/switch";

import toast from "react-hot-toast";
import { createUpdateBrand } from "@/actions/brands/create-update-brand";
import { getBrand } from "@/actions/brands/get-brand";
import FormDialog from "./form-dialog";
import FieldContainer from "./field-container";
interface Props {
  isEdit: boolean;
  id?: number;
}

type Inputs = {
  title: string;
  enabled: boolean;
};

export function BrandsForm({ isEdit, id }: Props) {
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
    const response = await createUpdateBrand(isEdit ? { ...data, id } : data);

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

    const response = await getBrand(id);

    if (!response.ok) {
      toast.error(response.message);
      return;
    }

    const { data } = response;

    const valuesToSet = {
      title: data!.title,
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
