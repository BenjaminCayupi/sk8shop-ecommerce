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

export async function getBrands({
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

    const [brands, count] = await Promise.all([
      prisma.brand.findMany({
        orderBy: { [sortBy]: sortDirection },
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
      prisma.brand.count(),
    ]);

    return {
      data: brands,
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