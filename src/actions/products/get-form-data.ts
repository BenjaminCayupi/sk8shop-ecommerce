"use server";

import prisma from "@/lib/prisma";

export async function getFormData() {
  try {
    const brands = await prisma.brand.findMany({
      where: { enabled: true },
      orderBy: { title: "asc" },
    });

    const subCategories = await prisma.subCategory.findMany({
      where: { enabled: true },
      orderBy: { title: "asc" },
    });

    const sizes = await prisma.size.findMany({
      orderBy: { id: "asc" },
    });

    return {
      data: { brands, subCategories, sizes },
    };
  } catch (error) {
    console.log("error :", error);
    return {
      ok: false,
    };
  }
}
