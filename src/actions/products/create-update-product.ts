"use server";

import prisma from "@/lib/prisma";

interface ProductFields {
  title: string;
  slug: string;
  price: number;
  description: string;
  brandId: string;
  subCategoryId: string;
  sizes: { value: string; label: string }[];
  quantity: { size: string; quantity: number; sizeId: number }[];
  enabled: boolean;
  id?: number;
}

export async function createUpdateProduct({
  title,
  slug,
  price,
  description,
  brandId,
  subCategoryId,
  sizes,
  quantity,
  enabled,
  id,
}: ProductFields) {
  try {
    //Validate fields
    const transaction = await prisma.$transaction(async (tx) => {
      /* ---------- Create sizes if they don't exist ---------- */
      const formatSizes = sizes.map((item) => item.label);
      const existingSizes = await tx.size.findMany({
        where: {
          title: { in: formatSizes },
        },
      });
      const sizeTitles = existingSizes.map((size) => size.title);
      const nonExistingSizes = formatSizes.filter(
        (size) => !sizeTitles.includes(size)
      );

      if (nonExistingSizes.length > 0) {
        await tx.size.createMany({
          data: nonExistingSizes.map((item) => ({ title: item.toUpperCase() })),
          skipDuplicates: true,
        });
      }

      /*---------- Create/update product ---------- */
      let product;
      if (id) {
        product = await tx.product.update({
          data: {
            title,
            slug,
            price,
            description,
            gender: "unisex",
            brandId: +brandId,
            subCategoryId: +subCategoryId,
            enabled,
          },
          where: { id },
        });
      } else {
        product = await tx.product.create({
          data: {
            title,
            slug,
            price,
            description,
            gender: "unisex",
            brandId: +brandId,
            subCategoryId: +subCategoryId,
            enabled,
          },
        });
      }
      /* ---------- Create Inventory record ---------- */

      const newSizes = await tx.size.findMany({
        where: {
          title: { in: nonExistingSizes },
        },
      });
      const totalSizes = [...existingSizes, ...newSizes];
      const inventoryData = quantity.map((qty) => {
        const size = totalSizes.find((item) => item.title === qty.size);
        return {
          productId: product.id,
          quantity: qty.quantity,
          sizeId: size!.id,
        };
      });

      const inventory = await tx.inventory.createMany({ data: inventoryData });
      /* Upload Image */
      /* Create productImage record */

      return {
        product,
        inventory,
      };
    });

    return {
      ok: true,
      product: transaction.product,
      inventory: transaction.inventory,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.log("error :", error.message);
    }
  }
}
