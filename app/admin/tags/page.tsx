import { getTagCategories } from "@/lib/data";
import { TagManager } from "@/components/admin/tag-manager";

export const revalidate = 0;

export default async function AdminTagsPage() {
  const categories = await getTagCategories();

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-slate-900">Tags</h1>
      {categories.length === 0 ? (
        <p className="text-sm text-slate-500">
          Nenhuma categoria de tag existe ainda — peça para o admin criar uma
          em &quot;Categorias&quot; antes de cadastrar tags.
        </p>
      ) : (
        <TagManager categories={categories} />
      )}
    </div>
  );
}
