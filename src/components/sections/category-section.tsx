import CategoryCard from "../category-card";
import SectionTitle from "../section-title";

export default function CategorySection() {
  return (
    <section className="mb-8">
      <SectionTitle title="Categorías" />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <CategoryCard title="skate" imageUrl="" />
        <CategoryCard title="ropa" imageUrl="" />
        <CategoryCard title="zapatillas" imageUrl="" />
      </div>
    </section>
  );
}
