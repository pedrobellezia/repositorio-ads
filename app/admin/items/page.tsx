import { getCurrentProfile } from "@/lib/auth";
import { getPublicItems, getTagCategories } from "@/lib/data";
import { NewItemForm } from "@/components/admin/new-item-form";
import { ItemRow } from "@/components/admin/item-row";

export const revalidate = 0;

export default async function AdminItemsPage() {
  const [items, categories, profile] = await Promise.all([
    getPublicItems(),
    getTagCategories(),
    getCurrentProfile(),
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-slate-900">Itens</h1>
        <NewItemForm
          categories={categories}
          defaultProfessorName={profile?.display_name}
        />
      </div>

      <div className="space-y-3">
        {items.length === 0 && (
          <p className="text-sm text-slate-500">Nenhum item cadastrado ainda.</p>
        )}
        {items.map((item) => (
          <ItemRow key={item.id} item={item} categories={categories} />
        ))}
      </div>
    </div>
  );
}
