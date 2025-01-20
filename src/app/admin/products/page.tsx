import { getFormData } from "@/actions/products/get-form-data";
import { getProducts } from "@/actions/products/get-products";
import DataTableFilter from "@/components/data-table/data-table-filter";
import DataTableHeaders from "@/components/data-table/data-table-headers";
import DataTablePagination from "@/components/data-table/data-table-pagination";
import { ProductForm } from "@/components/forms/product-form";
import PageTitle from "@/components/page-title";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { paramNumber, paramTake } from "@/utils";
import { Check, X } from "lucide-react";

const productsHeaders = [
  { title: "id", key: "id" },
  { title: "nombre", key: "title" },
  { title: "marca", key: "brand" },
  { title: "SubCategoría", key: "subCategory" },
  { title: "habilitado", key: "enabled" },
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

export default async function ProductsPage({ searchParams }: Props) {
  const param = await searchParams;

  const page = paramNumber(param.page);
  const take = paramTake(param.take);

  const { data, paginationOptions, brands, subCategories, sizes } =
    await Promise.all([
      getProducts({
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
        brands: results[1].data?.brands,
        subCategories: results[1].data?.subCategories,
        sizes: results[1].data?.sizes,
      };
    });

  return (
    <div className="container">
      <PageTitle title="Productos" />
      <div className="mb-3 flex flex-row justify-between">
        <div className="w-4/6 sm:w-4/6">
          <DataTableFilter />
        </div>
        <div className="w-2/6 flex justify-end">
          <ProductForm
            isEdit={false}
            brands={brands}
            subCategories={subCategories}
            sizes={sizes}
          />
        </div>
      </div>
      <Card className="p-5 mt-4 motion-preset-slide-up">
        <Table>
          <DataTableHeaders headers={productsHeaders} />
          <TableBody>
            {data?.length ? (
              data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell className="capitalize">
                    {item.brand.title}
                  </TableCell>
                  <TableCell className="capitalize">
                    {item.subCategory.title}
                  </TableCell>
                  <TableCell>{item.enabled ? <Check /> : <X />}</TableCell>
                  <TableCell className="flex flex-row justify-end">
                    <ProductForm
                      isEdit={true}
                      id={item.id}
                      brands={brands}
                      subCategories={subCategories}
                      sizes={sizes}
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
