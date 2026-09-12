-- Dados migrados do repositório antigo (js/arquivos.js), restritos aos
-- itens relevantes para o curso de ADS.

insert into public.tag_categories (id, name, slug)
values ('00000000-0000-0000-0000-000000000001', 'Tipo', 'tipo')
on conflict (slug) do nothing;

insert into public.tags (id, category_id, name, slug, icon)
values
  ('00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000001', 'IDE', 'ide', 'code'),
  ('00000000-0000-0000-0000-000000000102', '00000000-0000-0000-0000-000000000001', 'Analisador de Rede', 'analisador-de-rede', 'network')
on conflict (category_id, slug) do nothing;

insert into public.items (id, name, description, phase, professor_name, link_url)
values
  (
    '00000000-0000-0000-0000-000000001001',
    'VSCode',
    'Um editor de código desenvolvido pela Microsoft para criação de softwares Desktop com HTML, CSS e JavaScript.',
    '1fase',
    'Leandro Pickler',
    'https://code.visualstudio.com/download'
  ),
  (
    '00000000-0000-0000-0000-000000001002',
    'Android Studio',
    'Ambiente de Desenvolvimento Integrado (IDE) que oferece ferramentas para criar apps em todos os dispositivos móveis.',
    '3fase',
    'Leandro Pickler',
    'https://developer.android.com/studio?hl=pt-br#get-android-studio'
  ),
  (
    '00000000-0000-0000-0000-000000001003',
    'Wire Shark',
    'Analisador de protocolos que captura pacotes de dados em redes para análise e resolução de problemas.',
    '4fase',
    'Leandro Pickler',
    'https://www.wireshark.org/download.html'
  )
on conflict (id) do nothing;

insert into public.item_tags (item_id, tag_id)
values
  ('00000000-0000-0000-0000-000000001001', '00000000-0000-0000-0000-000000000101'),
  ('00000000-0000-0000-0000-000000001002', '00000000-0000-0000-0000-000000000101'),
  ('00000000-0000-0000-0000-000000001003', '00000000-0000-0000-0000-000000000102')
on conflict do nothing;
