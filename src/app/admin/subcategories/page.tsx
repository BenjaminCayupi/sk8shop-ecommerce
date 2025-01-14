import { getFormData } from "@/actions/subcategories/get-form-data";
import { getSubCategories } from "@/actions/subcategories/get-subcategories";
import DataTableFilter from "@/components/data-table/data-table-filter";
import DataTableHeaders from "@/components/data-table/data-table-headers";
import DataTablePagination from "@/components/data-table/data-table-pagination";
import { SubcategoryForm } from "@/components/forms/subcategory-form";
import PageTitle from "@/components/page-title";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { paramNumber, paramTake } from "@/utils";
import { Check, X } from "lucide-react";

const subcategoriesHeaders = [
  { title: "id", key: "id" },
  { title: "nombre", key: "title" },
  { title: "habilitado", key: "enabled" },
  { title: "categoría", key: "category" },
];

interface Props {
  searchParams: {
    page?: string;
    take?: string;
    query?: string;
    sortBy?: string;
    sortDirection?: string;
  };
}

export default async function SubcategoriesPage({ searchParams }: Props) {
  const param = await searchParams;

  const page = paramNumber(param.page);
  const take = paramTake(param.take);

  const { data, paginationOptions, categories } = await Promise.all([
    getSubCategories({
      page,
      rowsPerPage: take,
      query: param?.query,
      sortBy: param?.sortBy,
      sortDirection: param?.sortDirection,
    }),
    getFormData(),
  ]).then((results) => {
    return {
      data: results[0].data,
      paginationOptions: results[0].paginationOptions,
      categories: results[1].data,
    };
  });

  return (
    <div className="container">
      <PageTitle title="Subcategorías" />
      <div className="mb-3 flex flex-row justify-between">
        <div className="w-4/6 sm:w-4/6">
          <DataTableFilter />
        </div>
        <div className="w-2/6 flex justify-end">
          <SubcategoryForm isEdit={false} categories={categories} />
        </div>
      </div>
      <Card className="p-5 mt-4">
        <Table>
          <DataTableHeaders headers={subcategoriesHeaders} />
          <TableBody>
            {data?.length ? (
              data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.enabled ? <Check /> : <X />}</TableCell>
                  <TableCell className="capitalize">
                    {item.category.title}
                  </TableCell>
                  <TableCell className="flex flex-row justify-end">
                    <SubcategoryForm
                      isEdit={true}
                      id={item.id}
                      categories={categories}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  className="font-medium text-center text-gray-500"
                  colSpan={4}
                >
                  No hay registros
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <DataTablePagination
          currentPage={page}
          totalPages={paginationOptions?.totalPages}
        />
      </Card>
    </div>
  );
}
