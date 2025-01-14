"use server";

import prisma from "@/lib/prisma";

export async function getBrand(id: number) {
  try {
    const brand = await prisma.brand.findUnique({ where: { id: +id } });
    return {
      ok: true,
      data: brand,
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
