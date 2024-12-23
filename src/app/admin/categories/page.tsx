import DataTable from "@/components/data-table/data-table";
import PageTitle from "@/components/page-title";

interface Data {
  id: number;
  name: string;
}

const testData: Data[] = [
  { id: 1, name: "title" },
  { id: 1, name: "title" },
  { id: 1, name: "title" },
  { id: 1, name: "title" },
  { id: 1, name: "title" },
];

export default function CategoriesPage() {
  return (
    <div className="container">
      <PageTitle title="Categorías" />
      <DataTable data={testData} />
    </div>
  );
}
