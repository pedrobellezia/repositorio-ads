import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { InviteProfessorForm } from "@/components/admin/invite-professor-form";
import { Badge } from "@/components/ui/badge";

export const revalidate = 0;

export default async function AdminProfessorsPage() {
  const admin = createAdminClient();
  const supabase = await createClient();

  const [{ data: usersData }, { data: profiles }] = await Promise.all([
    admin.auth.admin.listUsers(),
    supabase.from("profiles").select("id, role, display_name"),
  ]);

  const profileById = new Map(profiles?.map((p) => [p.id, p]));

  const rows = usersData?.users.map((u) => ({
    id: u.id,
    email: u.email,
    role: profileById.get(u.id)?.role ?? "professor",
    displayName: profileById.get(u.id)?.display_name,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Professores</h1>
        <p className="text-sm text-slate-500">
          Convide novos professores por e-mail — eles recebem um link de
          acesso e já entram logados, sem precisar de senha.
        </p>
      </div>

      <InviteProfessorForm />

      <div className="space-y-2">
        {rows?.map((row) => (
          <div
            key={row.id}
            className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-3"
          >
            <div>
              <p className="text-sm font-medium text-slate-900">
                {row.displayName || row.email}
              </p>
              <p className="text-xs text-slate-500">{row.email}</p>
            </div>
            <Badge variant={row.role === "admin" ? "default" : "secondary"}>
              {row.role}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
}
