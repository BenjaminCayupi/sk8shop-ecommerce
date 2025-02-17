"use server";

import prisma from "@/lib/prisma";

export async function getAllCategories() {
  try {
    const categories = await prisma.category.findMany({
      where: { enabled: true },
      orderBy: { title: "asc" },
    });
    return {
      ok: true,
      data: categories,
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
