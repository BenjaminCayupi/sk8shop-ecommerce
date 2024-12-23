import DataTable from "@/components/data-table/data-table";
import PageTitle from "@/components/page-title";

export default function CategoriesPage() {
  return (
    <div className="container">
      <PageTitle title="Categorías" />
      <DataTable />
    </div>
  );
}
