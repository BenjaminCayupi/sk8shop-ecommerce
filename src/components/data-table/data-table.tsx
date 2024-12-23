import { Card } from "../ui/card";
import DataTableData from "./data-table-data";
import DataTableHeader from "./data-table-header";
import DataTablePagination from "./data-table-pagination";

export default function DataTable() {
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
