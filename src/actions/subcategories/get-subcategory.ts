"use server";

import prisma from "@/lib/prisma";

export async function getSubcategory(id: number) {
  try {
    const subCategory = await prisma.subCategory.findUnique({ where: { id } });
    return {
      ok: true,
      data: subCategory,
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
