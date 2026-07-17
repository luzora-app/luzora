-- Make manifesto_signatures the only source of reserved Luzora usernames.
-- Run this once in the Supabase SQL editor after manifesto_signatures.sql.

alter table public.manifesto_signatures
  add column if not exists claimed_by uuid references auth.users(id) on delete set null;

create index if not exists manifesto_signatures_claimed_by_idx
  on public.manifesto_signatures (claimed_by);

create or replace function public.sign_manifesto(p_name text, p_email text)
returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_name text := trim(coalesce(p_name, ''));
  v_email text := lower(trim(coalesce(p_email, '')));
  v_existing_email uuid;
  v_existing_name uuid;
  v_public_id uuid;
  v_signer_number bigint;
  v_share_url text;
  v_account_id uuid;
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

  select id into v_account_id
  from auth.users
  where lower(email) = v_email
  limit 1;

  if exists (
    select 1
    from public.profiles
    where lower(username) = lower(v_name)
      and id is distinct from v_account_id
  ) then
    return jsonb_build_object('ok', false, 'reason', 'name_taken');
  end if;

  insert into public.manifesto_signatures (username, email)
  values (v_name, v_email)
  returning public_id, signer_number, share_url
  into v_public_id, v_signer_number, v_share_url;

  if v_account_id is not null then
    update public.profiles
    set username = v_name
    where id = v_account_id
      and (
        username is null
        or username ~* '^luzora_[a-z0-9]{5}$'
        or lower(username) = lower(v_name)
      );

    if exists (
      select 1
      from public.profiles
      where id = v_account_id
        and lower(username) = lower(v_name)
    ) then
      update public.manifesto_signatures
      set claimed_by = v_account_id
      where public_id = v_public_id;
    end if;
  end if;

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

drop trigger if exists trg_apply_reserved_username on public.profiles;
drop trigger if exists trg_apply_manifesto_signature_username on public.profiles;
drop function if exists public.apply_reserved_username();

create or replace function public.apply_manifesto_signature_username()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_email text;
  v_signature_id uuid;
  v_reserved_username text;
begin
  select lower(trim(email)) into v_email
  from auth.users
  where id = new.id;

  if v_email is null then
    return new;
  end if;

  select id, username into v_signature_id, v_reserved_username
  from public.manifesto_signatures
  where email_normalized = v_email
  limit 1;

  if v_signature_id is null then
    return new;
  end if;

  if exists (
    select 1
    from public.profiles
    where lower(username) = lower(v_reserved_username)
      and id <> new.id
  ) then
    return new;
  end if;

  new.username := v_reserved_username;

  update public.manifesto_signatures
  set claimed_by = new.id
  where id = v_signature_id;

  return new;
end;
$$;

create trigger trg_apply_manifesto_signature_username
before insert on public.profiles
for each row
execute function public.apply_manifesto_signature_username();

-- Claim reservations for accounts created before this trigger was installed.
with eligible_profiles as (
  select
    profiles.id as profile_id,
    signatures.id as signature_id,
    signatures.username as reserved_username
  from public.profiles as profiles
  join auth.users as users on users.id = profiles.id
  join public.manifesto_signatures as signatures
    on signatures.email_normalized = lower(trim(users.email))
  where (
    profiles.username is null
    or profiles.username ~* '^luzora_[a-z0-9]{5}$'
    or lower(profiles.username) = signatures.username_normalized
  )
  and not exists (
    select 1
    from public.profiles as owner
    where owner.id <> profiles.id
      and lower(owner.username) = signatures.username_normalized
  )
)
update public.profiles as profiles
set username = eligible_profiles.reserved_username
from eligible_profiles
where profiles.id = eligible_profiles.profile_id;

update public.manifesto_signatures as signatures
set claimed_by = profiles.id
from public.profiles as profiles
join auth.users as users on users.id = profiles.id
where signatures.email_normalized = lower(trim(users.email))
  and signatures.username_normalized = lower(profiles.username);

create or replace function public.username_available(candidate text)
returns boolean
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_normalized text := lower(trim(candidate));
  v_email text;
begin
  if v_normalized is null or length(v_normalized) < 3 then
    return false;
  end if;

  select lower(trim(email)) into v_email
  from auth.users
  where id = auth.uid();

  return not exists (
    select 1
    from public.profiles
    where lower(username) = v_normalized
      and id is distinct from auth.uid()
  ) and not exists (
    select 1
    from public.manifesto_signatures
    where username_normalized = v_normalized
      and email_normalized <> coalesce(v_email, '')
  );
end;
$$;

create or replace function public.update_username(new_username text)
returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  requesting_user uuid := auth.uid();
  trimmed text := trim(new_username);
  normalized text := lower(trim(new_username));
  current_row public.profiles%rowtype;
  limit_value integer := public.username_change_limit();
  my_email text;
begin
  if requesting_user is null then
    return jsonb_build_object('ok', false, 'reason', 'unauthenticated');
  end if;

  if normalized is null or length(normalized) < 3 or length(trimmed) > 24 or trimmed !~ '^[A-Za-z0-9_]+$' then
    return jsonb_build_object('ok', false, 'reason', 'invalid');
  end if;

  select * into current_row
  from public.profiles
  where id = requesting_user;

  if not found then
    return jsonb_build_object('ok', false, 'reason', 'no_profile');
  end if;

  if lower(current_row.username) = normalized then
    update public.profiles
    set username = trimmed
    where id = requesting_user;

    return jsonb_build_object(
      'ok', true,
      'username', trimmed,
      'changes_left', greatest(0, limit_value - current_row.username_changes)
    );
  end if;

  if current_row.username_changes >= limit_value then
    return jsonb_build_object('ok', false, 'reason', 'limit_reached', 'changes_left', 0);
  end if;

  if exists (
    select 1
    from public.profiles
    where lower(username) = normalized
      and id <> requesting_user
  ) then
    return jsonb_build_object(
      'ok', false,
      'reason', 'taken',
      'changes_left', greatest(0, limit_value - current_row.username_changes)
    );
  end if;

  select lower(trim(email)) into my_email
  from auth.users
  where id = requesting_user;

  if exists (
    select 1
    from public.manifesto_signatures
    where username_normalized = normalized
      and email_normalized <> coalesce(my_email, '')
  ) then
    return jsonb_build_object(
      'ok', false,
      'reason', 'taken',
      'changes_left', greatest(0, limit_value - current_row.username_changes)
    );
  end if;

  update public.profiles
  set username = trimmed,
      username_changes = username_changes + 1
  where id = requesting_user;

  return jsonb_build_object(
    'ok', true,
    'username', trimmed,
    'changes_left', greatest(0, limit_value - (current_row.username_changes + 1))
  );
end;
$$;

revoke all on function public.sign_manifesto(text, text) from public;
revoke all on function public.apply_manifesto_signature_username() from public;
revoke all on function public.username_available(text) from public;
revoke all on function public.update_username(text) from public;
grant execute on function public.sign_manifesto(text, text) to anon, authenticated;
grant execute on function public.username_available(text) to authenticated;
grant execute on function public.update_username(text) to authenticated;

-- The legacy table is no longer part of the Luzora data model.
drop table if exists public.manifesto_signers;
