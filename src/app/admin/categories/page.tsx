import DataTableActions from "@/components/data-table/data-table-actions";
import DataTableHeaders from "@/components/data-table/data-table-headers";
import DataTablePagination from "@/components/data-table/data-table-pagination";
import PageTitle from "@/components/page-title";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Edit, Trash } from "lucide-react";

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
      <DataTableActions />
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
                  <Button size="icon">
                    <Edit />
                  </Button>
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
