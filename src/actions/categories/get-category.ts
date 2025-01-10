"use server";

import prisma from "@/lib/prisma";

export async function getCategory(id: number) {
  try {
    const category = await prisma.category.findUnique({ where: { id: +id } });
    return {
      ok: true,
      data: category,
      message: "",
    };
  } catch (error) {
    console.log("error :", error);
    return {
      ok: false,
      message: "Ha ocurrido un error",
    };
  }
}
