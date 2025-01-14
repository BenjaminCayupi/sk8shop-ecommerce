"use server";

import prisma from "@/lib/prisma";
import { subcategorySchema } from "@/lib/zod";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { revalidatePath } from "next/cache";

interface SubcategoryFields {
  title: string;
  description: string;
  categoryId: string;
  enabled: boolean;
  id?: number;
}

export async function createUpdateSubCategory({
  title,
  description,
  enabled,
  categoryId,
  id,
}: SubcategoryFields) {
  try {
    await subcategorySchema.parseAsync({
      title,
      description,
      enabled,
      categoryId,
    });

    let result;

    if (id) {
      result = await prisma.subCategory.update({
        data: { title, description, categoryId: +categoryId, enabled },
        where: { id },
      });
    } else {
      result = await prisma.subCategory.create({
        data: { title, description, categoryId: +categoryId, enabled },
      });
    }

    revalidatePath("/admin/subcategories");

    return {
      ok: true,
      data: result,
      message: id ? "Subcategoría actualizada" : "Subcategoría creada",
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
