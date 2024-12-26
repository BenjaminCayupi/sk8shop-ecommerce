import DataTableHeaders from "@/components/data-table/data-table-headers";
import DataTablePagination from "@/components/data-table/data-table-pagination";
import { CategoryForm } from "@/components/forms/category-form";
import PageTitle from "@/components/page-title";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Search, Trash } from "lucide-react";

const testData = [
  { id: 1, name: "title" },
  { id: 1, name: "title" },
  { id: 1, name: "title" },
  { id: 1, name: "title" },
  { id: 1, name: "title" },
];

export default function CategoriesPage() {
  const categoriesHeaders = [
    { title: "id" },
    { title: "nombre" },
    { title: "test" },
    { title: "test2" },
  ];

  return (
    <div className="container">
      <PageTitle title="Categorías" />
      <div className="mb-3 flex flex-row justify-between">
        <div className="w-4/6 sm:w-4/6">
          <div className="flex flex-row">
            <Input type="text" placeholder="Filtrar" className="mr-2" />
            <Button type="submit">
              <Search />
            </Button>
          </div>
        </div>
        <div className="w-2/6 flex justify-end">
          <CategoryForm isEdit={false} />
        </div>
      </div>
      <Card className="p-5 mt-4">
        <Table>
          <DataTableHeaders headers={categoriesHeaders} />
          <TableBody>
            {testData.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>item.name</TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell>$250.00</TableCell>
                <TableCell className="flex flex-row justify-end">
                  <CategoryForm isEdit={true} />
                  <Button
                    className="bg-red-500 hover:bg-red-700 ml-2"
                    size="icon"
                  >
                    <Trash />
                  </Button>
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
