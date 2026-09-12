import { getTagCategories } from "@/lib/data";
import { CategoryManager } from "@/components/admin/category-manager";

export const revalidate = 0;

export default async function AdminCategoriesPage() {
  const categories = await getTagCategories();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Categorias de tag</h1>
        <p className="text-sm text-slate-500">
          Só administradores gerenciam categorias. Professores criam tags
          dentro delas em &quot;Tags&quot;.
        </p>
      </div>
      <CategoryManager categories={categories} />
    </div>
  );
}
