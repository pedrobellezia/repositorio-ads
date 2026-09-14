-- O curso só tem 5 fases; reduz a lista de valores válidos em items.phase
-- (era 'geral' + 1fase..7fase, agora é 'geral' + 1fase..5fase).
-- Itens que porventura estejam em 6fase/7fase são reclassificados como
-- 5fase antes de apertar a constraint, pra migration não falhar.
update public.items set phase = '5fase' where phase in ('6fase', '7fase');

alter table public.items drop constraint if exists items_phase_check;

alter table public.items add constraint items_phase_check check (
  phase in ('geral', '1fase', '2fase', '3fase', '4fase', '5fase')
);
