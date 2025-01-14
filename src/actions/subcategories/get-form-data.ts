"use server";

import prisma from "@/lib/prisma";

export async function getFormData() {
  try {
    const categories = await prisma.category.findMany({
      where: { enabled: true },
      orderBy: { title: "asc" },
    });

    return {
      data: categories,
    };
  } catch (error) {
    console.log("error :", error);
    return {
      ok: false,
    };
  }
}
