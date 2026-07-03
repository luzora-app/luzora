-- Luzora manifesto signatures
-- Run this in the Supabase SQL editor for the Luzora project.

create table if not exists public.manifesto_signatures (
  id uuid primary key default gen_random_uuid(),
  username text not null,
  username_normalized text generated always as (lower(trim(username))) stored,
  email text not null,
  email_normalized text generated always as (lower(trim(email))) stored,
  signed_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create unique index if not exists manifesto_signatures_username_normalized_key
  on public.manifesto_signatures (username_normalized);

create unique index if not exists manifesto_signatures_email_normalized_key
  on public.manifesto_signatures (email_normalized);

alter table public.manifesto_signatures enable row level security;

drop policy if exists "Deny direct public reads" on public.manifesto_signatures;
drop policy if exists "Deny direct public inserts" on public.manifesto_signatures;

create policy "Deny direct public reads"
  on public.manifesto_signatures
  for select
  to anon
  using (false);

create policy "Deny direct public inserts"
  on public.manifesto_signatures
  for insert
  to anon
  with check (false);

create or replace function public.sign_manifesto(p_name text, p_email text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_name text := trim(coalesce(p_name, ''));
  v_email text := lower(trim(coalesce(p_email, '')));
  v_existing_email uuid;
  v_existing_name uuid;
begin
  if v_name !~ '^[A-Za-z0-9_]{3,24}$' then
    return jsonb_build_object('ok', false, 'reason', 'invalid_name');
  end if;

  if v_email !~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$' then
    return jsonb_build_object('ok', false, 'reason', 'invalid_email');
  end if;

  select id into v_existing_email
  from public.manifesto_signatures
  where email_normalized = v_email
  limit 1;

  if v_existing_email is not null then
    return jsonb_build_object('ok', false, 'reason', 'email_taken');
  end if;

  select id into v_existing_name
  from public.manifesto_signatures
  where username_normalized = lower(v_name)
  limit 1;

  if v_existing_name is not null then
    return jsonb_build_object('ok', false, 'reason', 'name_taken');
  end if;

  insert into public.manifesto_signatures (username, email)
  values (v_name, v_email);

  return jsonb_build_object('ok', true, 'username', v_name);
exception
  when unique_violation then
    if exists (
      select 1 from public.manifesto_signatures
      where email_normalized = v_email
    ) then
      return jsonb_build_object('ok', false, 'reason', 'email_taken');
    end if;

    return jsonb_build_object('ok', false, 'reason', 'name_taken');
end;
$$;

grant usage on schema public to anon;
grant execute on function public.sign_manifesto(text, text) to anon;
