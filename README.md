# Repositório Acadêmico — ADS

Repositório de links e documentos do curso de ADS (FMP), organizado por fase
e por tags livres agrupadas em categorias. Frontend em Next.js (Vercel),
dados e autenticação no Supabase.

## Stack

- **Frontend**: Next.js (App Router) + TypeScript + Tailwind CSS, hospedado
  na Vercel.
- **Backend**: Supabase (Postgres + Auth + Storage, plano gratuito). Não há
  servidor próprio — o app fala direto com o Supabase, e as permissões são
  garantidas por Row Level Security (RLS) no banco. A única exceção é o
  convite de professores, que roda numa Route Handler
  (`app/api/admin/invite-professor/route.ts`) porque exige a *service role
  key* do Supabase.

## Configurar o Supabase (passo a passo)

1. Crie um projeto em [supabase.com](https://supabase.com) (plano free).
2. No **SQL Editor** do dashboard, rode nesta ordem:
   - `supabase/migrations/0001_init.sql` (tabelas, trigger de perfil, função
     de busca por tags parecidas)
   - `supabase/migrations/0002_rls.sql` (políticas de segurança + bucket de
     storage `item-files`)
   - `supabase/migrations/0003_seed_admin.sql` (cria o usuário admin padrão)
   - `supabase/seed.sql` (opcional: migra os itens do repositório antigo
     como dado inicial)
3. O login é por e-mail e senha (`supabase.auth.signInWithPassword`), sem
   nenhum envio de e-mail. A migration `0003_seed_admin.sql` já cria o admin
   padrão: e-mail `admin@fmp.edu.br`, senha `trocar-depois-123`. Entre com
   essas credenciais em `/login` e troque a senha o quanto antes (em
   **Authentication → Users**, no dashboard do Supabase). Novos professores
   são criados pelo admin em `/admin/professors`, informando e-mail e uma
   senha inicial.
4. Em **Project Settings → API**, copie a `URL`, a `anon public key` e a
   `service_role key` para o `.env.local` (veja abaixo). A `service_role
   key` é secreta — nunca a exponha no frontend.

## Rodando localmente

```bash
cp .env.local.example .env.local
# preencha as três variáveis com os dados do seu projeto Supabase

npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) para o site público e
[http://localhost:3000/admin](http://localhost:3000/admin) para o painel
(exige login).

## Deploy

- **Vercel**: importe este repositório e configure as mesmas três variáveis
  de ambiente do `.env.local` nas configurações do projeto.
- **Domínio**: por enquanto usando o subdomínio padrão `*.vercel.app`; um
  domínio próprio pode ser configurado depois em Project Settings → Domains.

## Estrutura

- `app/page.tsx` — site público (filtro por fase + tags).
- `app/login` — login por e-mail e senha.
- `app/admin/items`, `app/admin/tags`, `app/admin/categories`,
  `app/admin/professors` — painel de gestão (protegido pelo `proxy.ts`).
- `supabase/migrations`, `supabase/seed.sql` — schema, RLS e dado inicial.

## Papéis e permissões

- **Leitura pública**: qualquer visitante vê e baixa itens sem login.
- **Professor**: acesso criado pelo admin (e-mail + senha), CRUD completo de
  itens e tags.
- **Admin**: tudo que o professor pode, mais criar/excluir categorias de tag
  e convidar novos professores.
