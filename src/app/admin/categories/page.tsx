import { getCategories } from "@/actions/categories/get-categories";
import DataTableFilter from "@/components/data-table/data-table-filter";
import DataTableHeaders from "@/components/data-table/data-table-headers";
import DataTablePagination from "@/components/data-table/data-table-pagination";
import { CategoryForm } from "@/components/forms/category-form";
import PageTitle from "@/components/page-title";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { paramNumber, paramTake } from "@/utils";
import { Check, X } from "lucide-react";

const categoriesHeaders = [
  { title: "id", key: "id" },
  { title: "nombre", key: "name" },
  { title: "habilitado", key: "enabled" },
];

interface Props {
  searchParams: { page?: string; take?: string; query: string };
}

export default async function CategoriesPage({ searchParams }: Props) {
  const param = await searchParams;

  const page = paramNumber(param.page);
  const take = paramTake(param.take);

  const { data, paginationOptions } = await getCategories({
    page,
    rowsPerPage: take,
    query: param?.query,
  });

  return (
    <div className="container">
      <PageTitle title="Categorías" />
      <div className="mb-3 flex flex-row justify-between">
        <div className="w-4/6 sm:w-4/6">
          <DataTableFilter />
        </div>
        <div className="w-2/6 flex justify-end">
          <CategoryForm isEdit={false} />
        </div>
      </div>
      <Card className="p-5 mt-4">
        <Table>
          <DataTableHeaders headers={categoriesHeaders} />
          <TableBody>
            {data?.length ? (
              data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.enabled ? <Check /> : <X />}</TableCell>
                  <TableCell className="flex flex-row justify-end">
                    <CategoryForm isEdit={true} id={item.id} />
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
