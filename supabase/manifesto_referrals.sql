-- Pending manifesto referrals become active after the referred signer creates
-- an extension account with the same email address.

create table if not exists public.manifesto_referrals (
  id uuid primary key default gen_random_uuid(),
  referrer_signature_id uuid not null references public.manifesto_signatures(id) on delete cascade,
  referred_signature_id uuid not null unique references public.manifesto_signatures(id) on delete cascade,
  referrer_code text not null,
  referred_email text not null,
  referrer_profile_id uuid references public.profiles(id) on delete set null,
  referred_profile_id uuid references public.profiles(id) on delete set null,
  status text not null default 'pending' check (status in ('pending', 'active', 'superseded', 'invalid')),
  created_at timestamptz not null default now(),
  activated_at timestamptz,
  updated_at timestamptz not null default now()
);

create index if not exists manifesto_referrals_referrer_code_idx
  on public.manifesto_referrals (lower(referrer_code));
create index if not exists manifesto_referrals_referred_email_idx
  on public.manifesto_referrals (lower(referred_email));
create index if not exists manifesto_referrals_status_idx
  on public.manifesto_referrals (status);

alter table public.manifesto_referrals enable row level security;
revoke all on public.manifesto_referrals from anon, authenticated;

create or replace function public.reconcile_manifesto_referral(p_referral_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  v_referral public.manifesto_referrals%rowtype;
  v_referrer_profile uuid;
  v_referred_profile uuid;
  v_existing_referrer uuid;
begin
  select * into v_referral
  from public.manifesto_referrals
  where id = p_referral_id
  for update;

  if not found then
    return jsonb_build_object('ok', false, 'reason', 'referral_not_found');
  end if;

  select id into v_referrer_profile
  from public.profiles
  where lower(username) = lower(v_referral.referrer_code)
  limit 1;

  select p.id into v_referred_profile
  from public.profiles p
  join auth.users u on u.id = p.id
  where lower(u.email) = lower(v_referral.referred_email)
  limit 1;

  if v_referrer_profile is null or v_referred_profile is null then
    update public.manifesto_referrals
    set referrer_profile_id = v_referrer_profile,
        referred_profile_id = v_referred_profile,
        status = 'pending',
        updated_at = now()
    where id = p_referral_id;
    return jsonb_build_object('ok', true, 'status', 'pending');
  end if;

  if v_referrer_profile = v_referred_profile then
    update public.manifesto_referrals
    set referrer_profile_id = v_referrer_profile,
        referred_profile_id = v_referred_profile,
        status = 'invalid',
        updated_at = now()
    where id = p_referral_id;
    return jsonb_build_object('ok', false, 'status', 'invalid', 'reason', 'self_referral');
  end if;

  select referred_by into v_existing_referrer
  from public.profiles
  where id = v_referred_profile
  for update;

  if v_existing_referrer is null then
    update public.profiles
    set referred_by = v_referrer_profile,
        referred_at = coalesce(referred_at, now())
    where id = v_referred_profile;
    v_existing_referrer := v_referrer_profile;
  end if;

  update public.manifesto_referrals
  set referrer_profile_id = v_referrer_profile,
      referred_profile_id = v_referred_profile,
      status = case when v_existing_referrer = v_referrer_profile then 'active' else 'superseded' end,
      activated_at = case when v_existing_referrer = v_referrer_profile then coalesce(activated_at, now()) else activated_at end,
      updated_at = now()
  where id = p_referral_id;

  return jsonb_build_object(
    'ok', true,
    'status', case when v_existing_referrer = v_referrer_profile then 'active' else 'superseded' end
  );
end;
$$;

create or replace function public.record_manifesto_referral(
  p_referred_public_id text,
  p_referrer_code text
)
returns jsonb
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  v_referrer public.manifesto_signatures%rowtype;
  v_referred public.manifesto_signatures%rowtype;
  v_referral_id uuid;
begin
  if auth.role() <> 'service_role' then
    raise exception 'Not authorized';
  end if;

  select * into v_referred
  from public.manifesto_signatures
  where public_id = p_referred_public_id::uuid
  limit 1;

  select * into v_referrer
  from public.manifesto_signatures
  where username_normalized = lower(trim(p_referrer_code))
  limit 1;

  if v_referred.id is null or v_referrer.id is null then
    return jsonb_build_object('ok', false, 'reason', 'signature_not_found');
  end if;

  if v_referred.id = v_referrer.id or v_referred.email_normalized = v_referrer.email_normalized then
    return jsonb_build_object('ok', false, 'reason', 'self_referral');
  end if;

  insert into public.manifesto_referrals (
    referrer_signature_id,
    referred_signature_id,
    referrer_code,
    referred_email
  ) values (
    v_referrer.id,
    v_referred.id,
    v_referrer.username_normalized,
    v_referred.email_normalized
  )
  on conflict (referred_signature_id) do nothing
  returning id into v_referral_id;

  if v_referral_id is null then
    select id into v_referral_id
    from public.manifesto_referrals
    where referred_signature_id = v_referred.id;
  end if;

  return public.reconcile_manifesto_referral(v_referral_id);
end;
$$;

revoke all on function public.record_manifesto_referral(text, text) from public, anon, authenticated;
grant execute on function public.record_manifesto_referral(text, text) to service_role;

create or replace function public.sync_manifesto_referrals_for_profile()
returns trigger
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  v_email text;
  v_row record;
begin
  select lower(email) into v_email from auth.users where id = new.id;

  for v_row in
    select id
    from public.manifesto_referrals
    where status = 'pending'
      and (
        lower(referrer_code) = lower(coalesce(new.username, ''))
        or lower(referred_email) = coalesce(v_email, '')
      )
  loop
    perform public.reconcile_manifesto_referral(v_row.id);
  end loop;

  return new;
end;
$$;

drop trigger if exists sync_manifesto_referrals_after_profile on public.profiles;
create trigger sync_manifesto_referrals_after_profile
after insert or update of username on public.profiles
for each row execute function public.sync_manifesto_referrals_for_profile();

do $$
declare
  v_row record;
begin
  for v_row in select id from public.manifesto_referrals where status = 'pending'
  loop
    perform public.reconcile_manifesto_referral(v_row.id);
  end loop;
end;
$$;
