import Link from "next/link";
import { getCurrentProfile } from "@/lib/auth";
import { SignOutButton } from "@/components/admin/sign-out-button";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getCurrentProfile();
  const isAdmin = profile?.role === "admin";

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 py-8">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-sm font-semibold text-slate-900">
            ← Repositório Acadêmico
          </Link>
          <nav className="flex gap-4 text-sm">
            <Link href="/admin/items" className="text-slate-600 hover:text-slate-900">
              Itens
            </Link>
            <Link href="/admin/tags" className="text-slate-600 hover:text-slate-900">
              Tags
            </Link>
            {isAdmin && (
              <>
                <Link
                  href="/admin/categories"
                  className="text-slate-600 hover:text-slate-900"
                >
                  Categorias
                </Link>
                <Link
                  href="/admin/professors"
                  className="text-slate-600 hover:text-slate-900"
                >
                  Professores
                </Link>
              </>
            )}
          </nav>
        </div>
        <div className="flex items-center gap-3 text-sm text-slate-500">
          <span>
            {profile?.display_name ?? "Sem nome"} ·{" "}
            {isAdmin ? "admin" : "professor"}
          </span>
          <SignOutButton />
        </div>
      </header>
      {children}
    </div>
  );
}
