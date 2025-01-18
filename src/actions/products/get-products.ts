"use server";

import prisma from "@/lib/prisma";
import { paginationSchema } from "@/lib/zod";
import { ZodError } from "zod";

interface PaginationOptions {
  page?: number;
  rowsPerPage?: 5 | 10 | 15;
  enabled?: boolean;
  query?: string;
  sortBy?: string;
  sortDirection?: string;
}

export async function getProducts({
  page = 1,
  rowsPerPage = 5,
  enabled,
  query,
  sortBy = "id",
  sortDirection = "desc",
}: PaginationOptions) {
  try {
    await paginationSchema.parseAsync({
      page,
      rowsPerPage,
      query,
      sortBy,
      sortDirection,
    });

    let sortConditions = {};

    if (sortBy === "brand") {
      sortConditions = {
        brand: {
          title: sortDirection,
        },
      };
    } else if (sortBy === "subCategory") {
      sortConditions = {
        subCategory: {
          title: sortDirection,
        },
      };
    } else {
      sortConditions = { [sortBy]: sortDirection };
    }

    const [products, count] = await Promise.all([
      prisma.product.findMany({
        include: {
          brand: {
            select: {
              title: true,
            },
          },
          subCategory: {
            select: {
              title: true,
            },
          },
        },
        orderBy: sortConditions,
        where: {
          title: {
            contains: query,
            mode: "insensitive",
          },
          enabled,
        },
        skip: (page - 1) * rowsPerPage,
        take: rowsPerPage,
      }),
      prisma.product.count(),
    ]);

    return {
      data: products,
      paginationOptions: {
        currentPage: page,
        totalCount: count,
        totalPages: Math.ceil(count / rowsPerPage),
        rowsPerPage,
      },
    };
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        error: true,
        message: "Parámetro invalido",
      };
    }

    return { error: true, message: "Ha ocurrido un error" };
  }
}
