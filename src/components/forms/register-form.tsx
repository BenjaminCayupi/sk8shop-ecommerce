"use client";
import { Label } from "@radix-ui/react-label";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";

import { SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import { PasswordRequirements } from "../password-requirements";

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Inputs>();

  const password = watch("password") || "";

  const passwordMatch = (value: string) => {
    if (value.trim() !== password.trim()) {
      return "Las contraseñas no coinciden";
    }
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <div className="flex flex-col gap-6">
      <Card className="w-full sm:w-[400px] motion-preset-slide-up">
        <CardHeader>
          <CardTitle className="text-2xl">Regístrate</CardTitle>
          <CardDescription>Crea una nueva cuenta</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-6">
              <div className="grid gap-3">
                <div className="grid gap-1">
                  <Label htmlFor="name">Nombre</Label>
                  <Input
                    id="name"
                    type="text"
                    {...register("name", {
                      required: "El campo es requerido",
                      minLength: {
                        value: 3,
                        message: "Mínimo 3 caracteres",
                      },
                      maxLength: {
                        value: 10,
                        message: "Máximo 3 caracteres",
                      },
                    })}
                  />
                  <p className="text-sm text-red-400">{errors.name?.message}</p>
                </div>
                <div className="grid gap-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="text"
                    placeholder="m@ejemplo.com"
                    {...register("email", {
                      required: "El campo es requerido",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "El valor ingresado no es un email",
                      },
                    })}
                  />
                  <p className="text-sm text-red-400">
                    {errors.email?.message}
                  </p>
                </div>
                <div className="grid gap-1">
                  <Label htmlFor="password">Contraseña</Label>
                  <Input
                    id="password"
                    type="password"
                    {...register("password", {
                      required: "El campo es requerido",
                      pattern: {
                        value: /^(?=(.*[a-z]))(?=(.*[A-Z]))(?=(.*\d)).{8,}$/,
                        message: "Formato invalido",
                      },
                    })}
                  />
                  <PasswordRequirements password={password} />
                  <p className="text-sm text-red-400">
                    {errors.password?.message}
                  </p>
                </div>
                <div className="grid gap-1">
                  <Label htmlFor="confirm-password">Confirmar Contraseña</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    {...register("confirmPassword", {
                      required: "El campo es requerido",
                      validate: (value) => passwordMatch(value),
                    })}
                  />
                  <p className="text-sm text-red-400">
                    {errors.confirmPassword?.message}
                  </p>
                </div>
                <Button type="submit" className="w-full">
                  Regístrate
                </Button>
              </div>
              <div className="text-center text-sm">
                Ya tienes una cuenta?{" "}
                <Link href="/login" className="underline underline-offset-4">
                  Inicia sesión
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
