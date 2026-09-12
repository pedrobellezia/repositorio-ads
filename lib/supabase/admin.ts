import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Cliente com a service role key. Tem privilégios de admin sobre o projeto
 * Supabase inteiro (bypassa RLS). NUNCA importar isso em código que roda no
 * navegador — só em Route Handlers/Server Actions que já validaram que quem
 * está chamando é um admin autenticado.
 */
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  );
}
