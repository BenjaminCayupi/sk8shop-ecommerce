"use client";
import { Label } from "@radix-ui/react-label";
import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { Input } from "../ui/input";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import { signIn } from "@/actions/auth/helper";
import { Loader2 } from "lucide-react";

type Inputs = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { email, password } = data;
    setLoading(true);
    const result = await signIn(email, password);
    if (!result.ok) {
      setError(result.message);
      setLoading(false);
      return;
    }

    setError("");
    setLoading(false);
    window.location.replace("/");
  };

  return (
    <div className="flex flex-col gap-6">
      <Card className="motion-preset-slide-up">
        <CardHeader>
          <CardTitle className="text-2xl">Bienvenido</CardTitle>
          <CardDescription>
            Haz login con tus credenciales o crea una nueva cuenta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-6">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email" className="font-medium">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
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
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password" className="font-medium">
                      Contraseña
                    </Label>
                    <a
                      href="#"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Olvidaste tu contraseña?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    {...register("password", {
                      required: "El campo es requerido",
                    })}
                  />
                  <p className="text-sm text-red-400">
                    {errors.password?.message}
                  </p>
                  <p className="text-sm text-red-400">{error}</p>
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading && <Loader2 className="animate-spin" />}
                  Login
                </Button>
              </div>
              <div className="text-center text-sm">
                No tienes una cuenta?{" "}
                <Link href="/register" className="underline underline-offset-4">
                  Regístrate
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
