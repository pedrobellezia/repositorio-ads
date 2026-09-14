import Image from "next/image";
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
    <div className="flex-1">
      <header
        className="px-4 py-10 text-white"
        style={{
          backgroundImage:
            "linear-gradient(15deg, rgba(19,84,122,0.7) 0%, #13547a 100%)",
        }}
      >
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4">
          <div className="rounded-lg bg-white/95 px-3 py-1.5">
            <Image
              src="/fmp-logo.png"
              alt="FMP — Faculdade Municipal de Palhoça"
              width={220}
              height={44}
              className="h-8 w-auto"
              priority
            />
          </div>
          <Link
            href="/login"
            className="shrink-0 rounded-full border-2 border-white/70 px-4 py-1.5 font-heading text-sm font-semibold text-white transition-colors hover:bg-white hover:text-secondary"
          >
            Área do professor
          </Link>
        </div>
        <div className="mx-auto mt-8 w-full max-w-6xl">
          <h1 className="text-3xl font-bold sm:text-4xl">
            Repositório Acadêmico — ADS
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-white/85">
            Links e documentos organizados por fase e por tags do curso,
            centralizados para estudantes e professores.
          </p>
        </div>
      </header>

      <div className="mx-auto w-full max-w-6xl px-4 py-10">
        <ItemBrowser items={items} categories={categories} />
      </div>
    </div>
  );
}
