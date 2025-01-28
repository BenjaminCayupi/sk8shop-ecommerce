"use server";

import prisma from "@/lib/prisma";
import bcryptjs from "bcryptjs";

type Params = {
  name: string;
  email: string;
  password: string;
};

export default async function registerUser({ name, email, password }: Params) {
  try {
    const userExist = await prisma.user.findUnique({ where: { email } });

    if (userExist) {
      return { ok: false, message: "Usuario con ese correo ya registrado" };
    }

    const createdUser = await prisma.user.create({
      data: {
        name,
        email,
        password: bcryptjs.hashSync(password),
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return {
      ok: true,
      message: "Usuario registrado",
      data: createdUser,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error registering user: ", error.message);
    }
    return {
      ok: false,
      message: "Hubo un error al registrar usuario",
    };
  }
}
