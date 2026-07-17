-- Public Luzora manifesto cards
-- Run this once in the Supabase SQL editor after manifesto_signatures.sql.

alter table public.manifesto_signatures
  add column if not exists public_id uuid default gen_random_uuid(),
  add column if not exists signer_number bigint,
  add column if not exists share_url text,
  add column if not exists confirmation_email_attempted_at timestamptz,
  add column if not exists confirmation_email_sent_at timestamptz,
  add column if not exists confirmation_email_id text,
  add column if not exists confirmation_email_error text;

update public.manifesto_signatures
set public_id = gen_random_uuid()
where public_id is null;

alter table public.manifesto_signatures
  alter column public_id set default gen_random_uuid(),
  alter column public_id set not null;

create unique index if not exists manifesto_signatures_public_id_key
  on public.manifesto_signatures (public_id);

create sequence if not exists public.manifesto_signer_number_seq;

with ranked as (
  select
    id,
    row_number() over (order by signed_at asc, created_at asc, id asc) as position
  from public.manifesto_signatures
)
update public.manifesto_signatures as signatures
set signer_number = ranked.position
from ranked
where signatures.id = ranked.id
  and signatures.signer_number is null;

select setval(
  'public.manifesto_signer_number_seq',
  greatest(coalesce((select max(signer_number) from public.manifesto_signatures), 0) + 1, 1),
  false
);

alter sequence public.manifesto_signer_number_seq
  owned by public.manifesto_signatures.signer_number;

alter table public.manifesto_signatures
  alter column signer_number set default nextval('public.manifesto_signer_number_seq'),
  alter column signer_number set not null;

create unique index if not exists manifesto_signatures_signer_number_key
  on public.manifesto_signatures (signer_number);

create or replace function public.set_manifesto_share_url()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if new.public_id is null then
    new.public_id := gen_random_uuid();
  end if;

  new.share_url := 'https://luzora.app/manifesto/s/' || new.public_id::text;
  return new;
end;
$$;

drop trigger if exists set_manifesto_share_url_before_write on public.manifesto_signatures;
create trigger set_manifesto_share_url_before_write
before insert or update of public_id
on public.manifesto_signatures
for each row
execute function public.set_manifesto_share_url();

update public.manifesto_signatures
set share_url = 'https://luzora.app/manifesto/s/' || public_id::text
where share_url is null
   or share_url <> 'https://luzora.app/manifesto/s/' || public_id::text;

alter table public.manifesto_signatures
  alter column share_url set not null;

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
  v_public_id uuid;
  v_signer_number bigint;
  v_share_url text;
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
  values (v_name, v_email)
  returning public_id, signer_number, share_url
  into v_public_id, v_signer_number, v_share_url;

  return jsonb_build_object(
    'ok', true,
    'username', v_name,
    'public_id', v_public_id,
    'signer_number', v_signer_number,
    'share_url', v_share_url
  );
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

create or replace function public.get_manifesto_signature(p_public_id text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_public_id uuid;
  v_signature jsonb;
begin
  begin
    v_public_id := trim(coalesce(p_public_id, ''))::uuid;
  exception
    when invalid_text_representation then
      return jsonb_build_object('ok', false, 'reason', 'not_found');
  end;

  select jsonb_build_object(
    'ok', true,
    'username', username,
    'signer_number', signer_number,
    'signed_at', signed_at,
    'share_url', share_url
  )
  into v_signature
  from public.manifesto_signatures
  where public_id = v_public_id
  limit 1;

  return coalesce(v_signature, jsonb_build_object('ok', false, 'reason', 'not_found'));
end;
$$;

grant usage on schema public to anon;
grant execute on function public.sign_manifesto(text, text) to anon;
grant execute on function public.get_manifesto_signature(text) to anon;
