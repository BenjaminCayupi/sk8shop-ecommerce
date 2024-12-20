import MobileProductFilter from "./mobile-product-filter";
import FilterProductContent from "./filter-product-content";
import SortByFilter from "./sort-by-filter";

export default function ProductFilter() {
  return (
    <>
      <div className="w-full lg:hidden my-4 flex justify-between">
        <MobileProductFilter>
          <FilterProductContent />
        </MobileProductFilter>
        <SortByFilter />
      </div>
      <div className="hidden lg:block">
        <FilterProductContent />
      </div>
    </>
  );
}
