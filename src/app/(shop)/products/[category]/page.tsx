import ProductCard from "@/components/product-card";
import ProductFilter from "@/components/product-filter/product-filter";
import SortByFilter from "@/components/product-filter/sort-by-filter";
import ProductPagination from "@/components/product-pagination";
import SectionTitle from "@/components/section-title";

interface Props {
  params: {
    category: string;
  };
}
export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  return (
    <div className="container mt-10">
      <SectionTitle title={category} />
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/6 xl:w-1/6 mr-5">
          <ProductFilter />
        </div>
        <div className="w-full lg:w-5/6 xl:w-5/6">
          <div className="items-center justify-between mb-4 hidden lg:flex">
            <p className="text-sm">80 Productos.</p>
            <SortByFilter />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 motion-preset-fade motion-duration-1500">
            {Array.from({ length: 5 }, (_, index) => (
              <ProductCard title="test" price={200} imageUrl="" key={index} />
            ))}
          </div>
          <div className="mt-12">
            <ProductPagination />
          </div>
        </div>
      </div>
    </div>
  );
}
