"use server";

import prisma from "@/lib/prisma";
import { categorySchema } from "@/lib/zod";
import { revalidatePath } from "next/cache";

interface CategoryFields {
  title: string;
  description: string;
  enabled: boolean;
  id?: number;
}

export async function createUpdateCategory({
  title: titleField,
  description: descriptionField,
  enabled: enabledField,
  id,
}: CategoryFields) {
  try {
    const { title, description, enabled } = await categorySchema.parseAsync({
      title: titleField,
      description: descriptionField,
      enabled: enabledField,
    });

    let result;

    if (id) {
      result = await prisma.category.update({
        data: { title, description, enabled },
        where: { id },
      });
    } else {
      result = await prisma.category.create({
        data: { title, description, enabled },
      });
    }

    revalidatePath("/admin/categories");

    return {
      ok: true,
      data: result,
      message: id ? "Categoría actualizada" : "Categoría creada",
    };
  } catch (error) {
    console.log("error :", error);
    return {
      ok: false,
      message: "Hubo un error al registrar la categoría",
    };
  }
}