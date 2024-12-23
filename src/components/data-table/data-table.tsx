import { Card } from "../ui/card";
import DataTableData from "./data-table-data";
import DataTableHeader from "./data-table-header";
import DataTablePagination from "./data-table-pagination";

interface DataTableProps<T> {
  data: T[];
}

export default function DataTable<T>({ data }: DataTableProps<T>) {
  console.log(
    "data :",
    data.map((item) => item.name)
  );
  return (
    <div>
      <DataTableHeader />
      <Card className="p-5 mt-4">
        <DataTableData />
        <DataTablePagination />
      </Card>
    </div>
  );
}
