alter table public.profiles enable row level security;
alter table public.tag_categories enable row level security;
alter table public.tags enable row level security;
alter table public.items enable row level security;
alter table public.item_tags enable row level security;

-- profiles: qualquer um lê (pra mostrar nome do professor); só o próprio dono
-- edita o próprio display_name; papel só é alterado via service role (admin).
create policy "profiles_select_all" on public.profiles
  for select using (true);

create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id)
  with check (auth.uid() = id and role = (select role from public.profiles where id = auth.uid()));

-- tag_categories: leitura pública; escrita só admin
create policy "tag_categories_select_all" on public.tag_categories
  for select using (true);

create policy "tag_categories_admin_write" on public.tag_categories
  for all using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  )
  with check (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- tags: leitura pública; qualquer usuário autenticado (professor ou admin)
-- cria/edita/exclui, sem checar autoria (modelo colaborativo)
create policy "tags_select_all" on public.tags
  for select using (true);

create policy "tags_authenticated_write" on public.tags
  for all using (auth.uid() is not null)
  with check (auth.uid() is not null);

-- items: leitura pública; qualquer autenticado cria/edita/exclui
create policy "items_select_all" on public.items
  for select using (true);

create policy "items_authenticated_write" on public.items
  for all using (auth.uid() is not null)
  with check (auth.uid() is not null);

-- item_tags: leitura pública; qualquer autenticado gerencia os vínculos
create policy "item_tags_select_all" on public.item_tags
  for select using (true);

create policy "item_tags_authenticated_write" on public.item_tags
  for all using (auth.uid() is not null)
  with check (auth.uid() is not null);

-- Storage: bucket público "item-files" para os documentos enviados
insert into storage.buckets (id, name, public, file_size_limit)
values ('item-files', 'item-files', true, 10485760)
on conflict (id) do update set public = true, file_size_limit = 10485760;

create policy "item_files_select_all" on storage.objects
  for select using (bucket_id = 'item-files');

create policy "item_files_authenticated_write" on storage.objects
  for insert with check (bucket_id = 'item-files' and auth.uid() is not null);

create policy "item_files_authenticated_delete" on storage.objects
  for delete using (bucket_id = 'item-files' and auth.uid() is not null);
