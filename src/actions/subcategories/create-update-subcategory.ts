"use server";

import prisma from "@/lib/prisma";
import { subcategorySchema } from "@/lib/zod";
import { revalidatePath } from "next/cache";

interface CategoryFields {
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
}: CategoryFields) {
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
      message: id ? "SubCategoría actualizada" : "SubCategoría creada",
    };
  } catch {
    return {
      ok: false,
      message: "Hubo un error al registrar la subcategoría",
    };
  }
}
