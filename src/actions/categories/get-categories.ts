"use server";

import prisma from "@/lib/prisma";

interface PaginationOptions {
  page?: number;
  rowsPerPage?: 5 | 10 | 15;
  enabled?: boolean;
}

export async function getCategories({
  page = 1,
  rowsPerPage = 5,
  enabled,
}: PaginationOptions) {
  try {
    const [categories, count] = await Promise.all([
      prisma.category.findMany({
        orderBy: { id: "desc" },
        where: { enabled },
        skip: (page - 1) * rowsPerPage,
        take: rowsPerPage,
      }),
      prisma.category.count(),
    ]);

    return {
      data: categories,
      paginationOptions: {
        currentPage: page,
        totalCount: count,
        totalPages: Math.ceil(count / rowsPerPage),
        rowsPerPage,
      },
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        error: true,
        message: error.message,
      };
    }

    return { error: true, message: "Ha ocurrido un error" };
  }
}
