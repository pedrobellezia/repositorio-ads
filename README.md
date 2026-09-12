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
   - `supabase/seed.sql` (opcional: migra os itens do repositório antigo
     como dado inicial)
3. Em **Authentication → Providers**, deixe o login por e-mail (magic link)
   habilitado — é o único método usado neste projeto (sem senha).
4. Em **Authentication → URL Configuration**, adicione a URL do seu site
   (local e/ou de produção) em *Redirect URLs*, ex:
   `http://localhost:3000/auth/callback` e
   `https://seu-projeto.vercel.app/auth/callback`.
5. Crie sua própria conta acessando `/login` do app rodando localmente e
   entrando com seu e-mail — isso cria seu `profiles` com papel `professor`
   por padrão. Depois, no SQL Editor, promova essa conta a admin:
   ```sql
   update public.profiles set role = 'admin' where id = 'SEU_USER_ID';
   ```
   (o `id` aparece em **Authentication → Users**).
6. Em **Project Settings → API**, copie a `URL`, a `anon public key` e a
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
- `app/login`, `app/auth/callback` — login por magic link.
- `app/admin/items`, `app/admin/tags`, `app/admin/categories`,
  `app/admin/professors` — painel de gestão (protegido pelo `proxy.ts`).
- `supabase/migrations`, `supabase/seed.sql` — schema, RLS e dado inicial.

## Papéis e permissões

- **Leitura pública**: qualquer visitante vê e baixa itens sem login.
- **Professor**: login por convite, CRUD completo de itens e tags.
- **Admin**: tudo que o professor pode, mais criar/excluir categorias de tag
  e convidar novos professores.
