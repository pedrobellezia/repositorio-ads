import Link from "next/link";
import { ItemBrowser } from "@/components/site/item-browser";
import { getPublicItems, getTagCategories } from "@/lib/data";

export const revalidate = 0;

export default async function HomePage() {
  const [items, categories] = await Promise.all([
    getPublicItems(),
    getTagCategories(),
  ]);

  return (
    <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-10">
      <header className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Repositório Acadêmico — ADS
          </h1>
          <p className="text-sm text-slate-500">
            Links e documentos organizados por fase e por tags do curso.
          </p>
        </div>
        <Link
          href="/login"
          className="shrink-0 text-sm font-medium text-slate-500 hover:text-slate-900"
        >
          Área do professor
        </Link>
      </header>

      <ItemBrowser items={items} categories={categories} />
    </div>
  );
}
