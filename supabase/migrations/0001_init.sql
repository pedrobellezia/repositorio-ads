-- Extensões
create extension if not exists "pg_trgm";

-- Perfis (estende auth.users com um papel: admin ou professor)
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role text not null default 'professor' check (role in ('admin', 'professor')),
  display_name text,
  created_at timestamptz not null default now()
);

-- Ao criar um usuário no Supabase Auth, cria automaticamente o perfil dele
-- (papel padrão: professor; o super-admin é promovido manualmente depois).
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, new.raw_user_meta_data->>'display_name');
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Categorias de tag (ex: "Tipo") — só o admin mexe aqui
create table if not exists public.tag_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  created_at timestamptz not null default now()
);

-- Tags (ex: "IDE" dentro da categoria "Tipo")
create table if not exists public.tags (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.tag_categories (id) on delete cascade,
  name text not null,
  slug text not null,
  icon text,
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  unique (category_id, slug)
);

create index if not exists tags_category_id_idx on public.tags (category_id);

-- Itens (links/documentos do repositório)
create table if not exists public.items (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null default '',
  phase text not null default 'geral' check (
    phase in ('geral', '1fase', '2fase', '3fase', '4fase', '5fase', '6fase', '7fase')
  ),
  professor_name text,
  link_url text,
  file_path text,
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint items_link_or_file check (link_url is not null or file_path is not null)
);

create index if not exists items_phase_idx on public.items (phase);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists items_set_updated_at on public.items;
create trigger items_set_updated_at
  before update on public.items
  for each row execute procedure public.set_updated_at();

-- Relação N:N entre itens e tags
create table if not exists public.item_tags (
  item_id uuid not null references public.items (id) on delete cascade,
  tag_id uuid not null references public.tags (id) on delete cascade,
  primary key (item_id, tag_id)
);

create index if not exists item_tags_tag_id_idx on public.item_tags (tag_id);

-- Busca por tags parecidas dentro da mesma categoria (usada na tela de
-- criação de tag pra avisar antes de criar uma duplicada tipo "IDE"/"IDEs").
create or replace function public.search_similar_tags(p_category_id uuid, p_name text)
returns table (id uuid, name text, similarity real)
language sql
stable
as $$
  select t.id, t.name, similarity(t.name, p_name) as similarity
  from public.tags t
  where t.category_id = p_category_id
    and similarity(t.name, p_name) > 0.3
  order by similarity desc
  limit 5;
$$;
