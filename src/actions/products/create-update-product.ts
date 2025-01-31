"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { uploadProductImages } from "./upload-image";

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
  images?: FileList;
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
  images,
  id,
}: ProductFields) {
  try {
    //Validate fields
    const transaction = await prisma.$transaction(async (tx) => {
      /* ---------- Create sizes if they don't exist ---------- */
      const formatSizes = sizes.map((item) => item.label.toUpperCase());
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
          include: { ProductImage: true },
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
          include: { ProductImage: true },
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
        const size = totalSizes.find(
          (item) => item.title === qty.size.toUpperCase()
        );
        return {
          productId: product.id,
          quantity: qty.quantity,
          sizeId: size!.id,
        };
      });

      let inventory;

      if (id) {
        const productInventory = await tx.inventory.findMany({
          where: { productId: id },
        });

        const toDeleteItems = productInventory.filter(
          (item) => !quantity.some((data) => data.sizeId === item.sizeId)
        );

        if (toDeleteItems.length > 0) {
          await tx.inventory.deleteMany({
            where: { id: { in: toDeleteItems.map((item) => item.id) } },
          });
        }

        inventory = await Promise.all(
          inventoryData.map((item) =>
            tx.inventory.upsert({
              where: {
                productId_sizeId: {
                  productId: item.productId,
                  sizeId: item.sizeId,
                },
              },
              update: { quantity: item.quantity },
              create: {
                quantity: item.quantity,
                sizeId: item.sizeId,
                productId: item.productId,
              },
            })
          )
        );
      } else {
        inventory = await tx.inventory.createMany({ data: inventoryData });
      }

      /* Upload Image */
      if (images) {
        const response = await uploadProductImages(images);

        if (!response) {
          throw new Error("Hubo un error al cargar las imágenes");
        }

        const productImages = response
          .filter((item) => item !== null)
          .map((item) => ({
            productId: product.id,
            url: item as string,
          }));

        await tx.productImage.createMany({
          data: productImages,
        });
      }

      return {
        product,
        inventory,
      };
    });

    revalidatePath("/admin/products");

    return {
      ok: true,
      product: transaction.product,
      inventory: transaction.inventory,
      message: `Producto ${id ? "editado" : "creado"} correctamente`,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.log("error :", error.message);
    }

    return {
      ok: false,
      message: "Hubo un error al registrar el producto.",
    };
  }
}
