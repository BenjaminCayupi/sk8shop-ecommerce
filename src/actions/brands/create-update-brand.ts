"use server";

import prisma from "@/lib/prisma";
import { brandSchema } from "@/lib/zod";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { revalidatePath } from "next/cache";

interface BrandFields {
  title: string;
  enabled: boolean;
  id?: number;
}

export async function createUpdateBrand({
  title: titleField,
  enabled: enabledField,
  id,
}: BrandFields) {
  try {
    const { title, enabled } = await brandSchema.parseAsync({
      title: titleField,
      enabled: enabledField,
    });

    let result;

    if (id) {
      result = await prisma.brand.update({
        data: { title, enabled },
        where: { id },
      });
    } else {
      result = await prisma.brand.create({
        data: { title, enabled },
      });
    }

    revalidatePath("/admin/brands");

    return {
      ok: true,
      data: result,
      message: id ? "Marca actualizada" : "Marca creada",
    };
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return {
        ok: false,
        message: "El valor ingresado ya existe.",
      };
    }

    return {
      ok: false,
      message: "Hubo un error al registrar la marca.",
    };
  }
}
