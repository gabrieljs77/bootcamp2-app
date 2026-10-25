-- Rode no Supabase: SQL Editor > New query > Run
create table if not exists public.pokemons_favoritos (
  id bigint generated always as identity primary key,
  nome text not null,
  pokemon_id int,
  nota text,
  criado_em timestamptz not null default now()
);
alter table public.pokemons_favoritos add column if not exists pokemon_id int;
alter table public.pokemons_favoritos add column if not exists nota text;
alter table public.pokemons_favoritos add column if not exists criado_em timestamptz not null default now();

alter table public.pokemons_favoritos enable row level security;

drop policy if exists "ler" on public.pokemons_favoritos;
drop policy if exists "inserir" on public.pokemons_favoritos;
drop policy if exists "atualizar" on public.pokemons_favoritos;
drop policy if exists "apagar" on public.pokemons_favoritos;
create policy "ler" on public.pokemons_favoritos for select to anon using (true);
create policy "inserir" on public.pokemons_favoritos for insert to anon with check (true);
create policy "atualizar" on public.pokemons_favoritos for update to anon using (true) with check (true);
create policy "apagar" on public.pokemons_favoritos for delete to anon using (true);
