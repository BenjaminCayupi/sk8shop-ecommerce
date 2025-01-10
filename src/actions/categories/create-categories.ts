"use server";

import prisma from "@/lib/prisma";
import { categorySchema } from "@/lib/zod";
import { revalidatePath } from "next/cache";

interface CategoryFields {
  title: string;
  description: string;
  enabled: boolean;
}

export async function createCategory({
  title: titleField,
  description: descriptionField,
  enabled: enabledField,
}: CategoryFields) {
  try {
    const { title, description, enabled } = await categorySchema.parseAsync({
      title: titleField,
      description: descriptionField,
      enabled: enabledField,
    });

    const createdCategory = await prisma.category.create({
      data: { title, description, enabled },
    });

    revalidatePath("/admin/categories");

    return {
      ok: true,
      data: createdCategory,
      message: "Categoría creada",
    };
  } catch (error) {
    console.log("error :", error);
    return {
      ok: false,
      message: "Hubo un error al registrar la categoría",
    };
  }
}
