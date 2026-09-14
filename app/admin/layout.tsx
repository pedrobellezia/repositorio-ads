import Image from "next/image";
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
      <header className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-accent-border/30 pb-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/fmp-logo.png"
              alt="FMP — Faculdade Municipal de Palhoça"
              width={150}
              height={30}
              className="h-6 w-auto"
            />
          </Link>
          <nav className="flex gap-4 font-heading text-sm font-medium">
            <Link href="/admin/items" className="text-secondary hover:text-primary">
              Itens
            </Link>
            <Link href="/admin/tags" className="text-secondary hover:text-primary">
              Tags
            </Link>
            {isAdmin && (
              <>
                <Link
                  href="/admin/categories"
                  className="text-secondary hover:text-primary"
                >
                  Categorias
                </Link>
                <Link
                  href="/admin/professors"
                  className="text-secondary hover:text-primary"
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
