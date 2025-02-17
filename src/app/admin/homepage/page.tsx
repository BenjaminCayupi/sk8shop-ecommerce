import { getAllCategories } from "@/actions/categories/get-all-categories";
import BannerForm from "@/components/forms/banner-form";
import HighlightCategoriesForm from "@/components/forms/highlight-categories";
import PageTitle from "@/components/page-title";

export default async function HomePage() {
  const { categories } = await Promise.all([getAllCategories()]).then(
    (results) => ({ categories: results[0].data })
  );
  return (
    <div className="container">
      <PageTitle title="Pagina de inicio" />
      <div id="content" className="grid gap-y-6">
        <BannerForm />
        <HighlightCategoriesForm categories={categories ?? []} />
        {/* Alerta */}
        {/* Imagen del medio */}
      </div>
    </div>
  );
}
