import DataTableFilter from "@/components/data-table/data-table-filter";
import DataTableHeaders from "@/components/data-table/data-table-headers";
import DataTablePagination from "@/components/data-table/data-table-pagination";
import { CategoryForm } from "@/components/forms/category-form";
import PageTitle from "@/components/page-title";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

const testData = [
  { id: 1, name: "title" },
  { id: 1, name: "title" },
  { id: 1, name: "title" },
  { id: 1, name: "title" },
  { id: 1, name: "title" },
];

export default function CategoriesPage() {
  const categoriesHeaders = [
    { title: "id", key: "id" },
    { title: "nombre", key: "name" },
    { title: "habilitado", key: "enabled" },
  ];

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
      <Card className="p-5 mt-4 motion-preset-slide-up">
        <Table>
          <DataTableHeaders headers={categoriesHeaders} />
          <TableBody>
            {testData.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>Test name</TableCell>
                <TableCell>test</TableCell>
                <TableCell className="flex flex-row justify-end">
                  <CategoryForm isEdit={true} />
                  {/*  <Button
                    className="bg-red-500 hover:bg-red-700 ml-2"
                    size="icon"
                  >
                    <Trash />
                  </Button> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <DataTablePagination />
      </Card>
    </div>
  );
}
