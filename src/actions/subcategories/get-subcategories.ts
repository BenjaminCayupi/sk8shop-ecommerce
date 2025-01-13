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

export async function getSubCategories({
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

    if (sortBy === "category") {
      sortConditions = {
        category: {
          title: sortDirection,
        },
      };
    } else {
      sortConditions = { [sortBy]: sortDirection };
    }

    const [categories, count] = await Promise.all([
      prisma.subCategory.findMany({
        include: {
          category: {
            select: {
              title: true,
            },
          },
        },
        orderBy: sortConditions,
        where: {
          AND: [
            {
              OR: [
                {
                  id: { equals: query && !isNaN(+query) ? +query : undefined },
                },
                { title: { contains: query, mode: "insensitive" } },
                { description: { contains: query, mode: "insensitive" } },
                {
                  category: {
                    title: {
                      contains: query,
                      mode: "insensitive",
                    },
                  },
                },
              ],
            },
            { enabled: enabled },
          ],
        },
        skip: (page - 1) * rowsPerPage,
        take: rowsPerPage,
      }),
      prisma.category.count(),
    ]);

    console.log("categories :", categories);

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
    console.log("error :", error);
    if (error instanceof ZodError) {
      return {
        error: true,
        message: "Parámetro invalido",
      };
    }

    return { error: true, message: "Ha ocurrido un error" };
  }
}
