-- Store manually confirmed X tasks collected during manifesto signing.
alter table public.manifesto_signatures
  add column if not exists x_handle text,
  add column if not exists x_follow_confirmed boolean not null default false,
  add column if not exists x_retweet_confirmed boolean not null default false,
  add column if not exists x_tasks_confirmed_at timestamptz;

create index if not exists manifesto_signatures_x_handle_idx
  on public.manifesto_signatures (lower(regexp_replace(coalesce(x_handle, ''), '^@', '')));
