"use server";

import prisma from "@/lib/prisma";

export async function getProduct(id: number) {
  console.log("id :", id);
  try {
    const product = await prisma.product.findUnique({
      where: { id: +id },
      include: {
        Inventory: {
          include: {
            size: true,
          },
        },
        ProductImage: true,
      },
    });
    return {
      ok: true,
      data: product,
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
