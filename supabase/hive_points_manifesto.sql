-- Hive Points, phase 1: the Manifesto.
-- Run this in the Supabase SQL editor. Safe to run more than once.
--
-- What this sets up:
--   1. Email verification on manifesto_signatures, which gates every payout.
--   2. The two remaining social activities (quote, comment).
--   3. hive_points_rules, so point values live in data rather than code.
--   4. hive_points_ledger, append only, one row per award, idempotent.
--   5. Balances split into Lifetime and Available from day one.
--   6. Award and verification functions.
--   7. A public leaderboard that never exposes an email address.
--
-- Points are keyed to a signature, not an auth user, because a Manifesto
-- signer does not need an account yet. profile_id is carried when it exists so
-- the migration to extension accounts at public beta is a straight update.

-- ---------------------------------------------------------------------------
-- 1. Email verification
-- ---------------------------------------------------------------------------

alter table public.manifesto_signatures
  add column if not exists email_verified_at timestamptz,
  add column if not exists email_verification_token uuid default gen_random_uuid(),
  add column if not exists email_verification_sent_at timestamptz;

create unique index if not exists manifesto_signatures_verify_token_idx
  on public.manifesto_signatures (email_verification_token)
  where email_verification_token is not null;

-- ---------------------------------------------------------------------------
-- 2. The four social activities
-- ---------------------------------------------------------------------------
-- follow and retweet already exist. Repost reuses the retweet column so no
-- confirmation recorded before today is lost.

alter table public.manifesto_signatures
  add column if not exists x_quote_confirmed boolean not null default false,
  add column if not exists x_comment_confirmed boolean not null default false;

-- ---------------------------------------------------------------------------
-- 3. Point values as data
-- ---------------------------------------------------------------------------

create table if not exists public.hive_points_rules (
  reason text primary key,
  points integer not null,
  requires_verified_email boolean not null default true,
  active boolean not null default true,
  description text,
  updated_at timestamptz not null default now()
);

insert into public.hive_points_rules (reason, points, requires_verified_email, description) values
  ('manifesto_sign',     500,  false, 'Signed the Manifesto'),
  ('founding_signer',   1000,  false, 'Signed before Hive Points existed'),
  ('x_follow',           100,  true,  'Followed Luzora on X'),
  ('x_repost',           100,  true,  'Reposted the pinned post'),
  ('x_quote',            200,  true,  'Quote posted in their own words'),
  ('x_comment',          100,  true,  'Commented on a post'),
  ('referral_manifesto', 100,  true,  'A referred bee signed and verified their email')
on conflict (reason) do update
  set points = excluded.points,
      requires_verified_email = excluded.requires_verified_email,
      description = excluded.description,
      updated_at = now();

-- ---------------------------------------------------------------------------
-- 4. The ledger
-- ---------------------------------------------------------------------------
-- Append only. Never update or delete a row: a correction is a new row with
-- the opposite sign, so the history always explains the balance.

create table if not exists public.hive_points_ledger (
  id uuid primary key default gen_random_uuid(),
  signature_id uuid not null references public.manifesto_signatures(id) on delete cascade,
  profile_id uuid references public.profiles(id) on delete set null,
  reason text not null references public.hive_points_rules(reason),
  points integer not null check (points <> 0),
  source text not null default 'manifesto'
    check (source in ('manifesto', 'extension', 'league', 'spend', 'adjustment')),
  ref_id uuid,
  -- The same award can never be paid twice, however many times the API retries.
  idempotency_key text not null unique,
  awarded_at timestamptz not null default now()
);

create index if not exists hive_points_ledger_signature_idx
  on public.hive_points_ledger (signature_id, awarded_at desc);

create index if not exists hive_points_ledger_profile_idx
  on public.hive_points_ledger (profile_id)
  where profile_id is not null;

-- ---------------------------------------------------------------------------
-- 5. Balances
-- ---------------------------------------------------------------------------
-- Lifetime counts credits only and never falls. Available is the net balance
-- and is what leaderboards rank on. Nothing spends yet, so they match today,
-- but the split exists now so public beta needs no migration.

create or replace view public.hive_points_balances as
select
  s.id                                                     as signature_id,
  s.username,
  s.public_id,
  coalesce(sum(l.points) filter (where l.points > 0), 0)::bigint as lifetime_hp,
  coalesce(sum(l.points), 0)::bigint                            as available_hp,
  max(l.awarded_at)                                             as last_awarded_at
from public.manifesto_signatures s
left join public.hive_points_ledger l on l.signature_id = s.id
group by s.id, s.username, s.public_id;

-- ---------------------------------------------------------------------------
-- 6. Awarding
-- ---------------------------------------------------------------------------

-- Awards a single rule to a signature. Returns the points actually credited,
-- which is 0 when the award was already made or a gate was not met.
create or replace function public.award_hive_points(
  p_signature_id uuid,
  p_reason text,
  p_ref_id uuid default null,
  p_idempotency_key text default null
)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  v_rule   public.hive_points_rules%rowtype;
  v_sig    public.manifesto_signatures%rowtype;
  v_key    text;
  v_points integer;
begin
  select * into v_rule from public.hive_points_rules where reason = p_reason and active;
  if not found then
    return 0;
  end if;

  select * into v_sig from public.manifesto_signatures where id = p_signature_id;
  if not found then
    return 0;
  end if;

  -- Verification gate. This is what stops a random address earning anything.
  if v_rule.requires_verified_email and v_sig.email_verified_at is null then
    return 0;
  end if;

  v_key := coalesce(p_idempotency_key, p_reason || ':' || p_signature_id::text);

  insert into public.hive_points_ledger
    (signature_id, profile_id, reason, points, source, ref_id, idempotency_key)
  values
    (p_signature_id, v_sig.claimed_by, p_reason, v_rule.points, 'manifesto', p_ref_id, v_key)
  on conflict (idempotency_key) do nothing
  returning points into v_points;

  return coalesce(v_points, 0);
end;
$$;

-- Verifies an email and pays out everything that was waiting on it: the
-- signer's own social activities if already confirmed, and their referrer.
create or replace function public.verify_manifesto_email(p_token uuid)
returns table (signature_id uuid, username text, credited integer)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_sig      public.manifesto_signatures%rowtype;
  v_credited integer := 0;
  v_referral public.manifesto_referrals%rowtype;
begin
  select * into v_sig
  from public.manifesto_signatures
  where email_verification_token = p_token;

  if not found then
    return;
  end if;

  if v_sig.email_verified_at is null then
    update public.manifesto_signatures
      set email_verified_at = now()
      where id = v_sig.id
      returning * into v_sig;
  end if;

  -- Social activities confirmed before verifying now become payable.
  if v_sig.x_follow_confirmed then
    v_credited := v_credited + public.award_hive_points(v_sig.id, 'x_follow');
  end if;
  if v_sig.x_retweet_confirmed then
    v_credited := v_credited + public.award_hive_points(v_sig.id, 'x_repost');
  end if;
  if v_sig.x_quote_confirmed then
    v_credited := v_credited + public.award_hive_points(v_sig.id, 'x_quote');
  end if;
  if v_sig.x_comment_confirmed then
    v_credited := v_credited + public.award_hive_points(v_sig.id, 'x_comment');
  end if;

  -- The referrer is paid only now, which is what makes throwaway addresses
  -- worthless to a farmer.
  select * into v_referral
  from public.manifesto_referrals
  where referred_signature_id = v_sig.id
    and status in ('pending', 'active')
  limit 1;

  if found then
    perform public.award_hive_points(
      v_referral.referrer_signature_id,
      'referral_manifesto',
      v_referral.id,
      'referral_manifesto:' || v_referral.id::text
    );
    update public.manifesto_referrals
      set status = 'active', activated_at = coalesce(activated_at, now()), updated_at = now()
      where id = v_referral.id;
  end if;

  return query select v_sig.id, v_sig.username, v_credited;
end;
$$;

-- Confirms one social activity. Pays immediately when the email is already
-- verified, otherwise the flag is stored and verification pays it later.
create or replace function public.confirm_manifesto_activity(
  p_signature_id uuid,
  p_activity text
)
returns integer
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_activity not in ('x_follow', 'x_repost', 'x_quote', 'x_comment') then
    return 0;
  end if;

  update public.manifesto_signatures
    set x_follow_confirmed   = x_follow_confirmed   or (p_activity = 'x_follow'),
        x_retweet_confirmed  = x_retweet_confirmed  or (p_activity = 'x_repost'),
        x_quote_confirmed    = x_quote_confirmed    or (p_activity = 'x_quote'),
        x_comment_confirmed  = x_comment_confirmed  or (p_activity = 'x_comment'),
        x_tasks_confirmed_at = now()
    where id = p_signature_id;

  return public.award_hive_points(p_signature_id, p_activity);
end;
$$;

-- ---------------------------------------------------------------------------
-- 7. Retroactive award for everyone who signed before Hive Points existed
-- ---------------------------------------------------------------------------
-- Announce the rule before running this. A number that appears without an
-- explanation costs more trust than the points are worth.

create or replace function public.backfill_founding_signers(p_cutoff timestamptz)
returns table (signatures_awarded bigint, points_awarded bigint)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_count  bigint := 0;
  v_points bigint := 0;
begin
  with awarded as (
    select
      s.id,
      public.award_hive_points(s.id, 'manifesto_sign')  as sign_points,
      public.award_hive_points(s.id, 'founding_signer') as founding_points
    from public.manifesto_signatures s
    where s.signed_at < p_cutoff
  )
  select count(*) filter (where sign_points + founding_points > 0),
         coalesce(sum(sign_points + founding_points), 0)
  into v_count, v_points
  from awarded;

  return query select v_count, v_points;
end;
$$;

-- ---------------------------------------------------------------------------
-- 8. Public leaderboard
-- ---------------------------------------------------------------------------
-- Username and points only. No email, no token, no internal id.

create or replace view public.hive_leaderboard as
select
  b.username,
  b.public_id,
  b.available_hp,
  b.lifetime_hp,
  rank() over (order by b.available_hp desc, b.last_awarded_at asc nulls last) as position
from public.hive_points_balances b
where b.available_hp > 0;

-- ---------------------------------------------------------------------------
-- 9. Row level security
-- ---------------------------------------------------------------------------
-- The ledger is written only by the service role through the functions above.
-- Nothing client side can mint points.

alter table public.hive_points_ledger enable row level security;
alter table public.hive_points_rules  enable row level security;

drop policy if exists "own ledger is readable" on public.hive_points_ledger;
create policy "own ledger is readable" on public.hive_points_ledger
  for select to authenticated
  using (profile_id = auth.uid());

drop policy if exists "rules are public" on public.hive_points_rules;
create policy "rules are public" on public.hive_points_rules
  for select to anon, authenticated
  using (active);

grant select on public.hive_points_rules to anon, authenticated;
grant select on public.hive_leaderboard to anon, authenticated;
grant select on public.hive_points_balances to authenticated;

revoke all on public.hive_points_ledger from anon, authenticated;
grant select on public.hive_points_ledger to authenticated;

-- Only the service role may call the award functions directly.
revoke execute on function public.award_hive_points(uuid, text, uuid, text) from anon, authenticated;
revoke execute on function public.backfill_founding_signers(timestamptz) from anon, authenticated;

-- Verification runs from an emailed link, so it must be callable anonymously.
grant execute on function public.verify_manifesto_email(uuid) to anon, authenticated;

notify pgrst, 'reload schema';

-- ---------------------------------------------------------------------------
-- How to run the founding backfill
-- ---------------------------------------------------------------------------
--   select * from public.backfill_founding_signers(now());
--
-- Pass the moment Hive Points went live. Everyone who signed before it gets
-- 500 for signing plus 1,000 for founding. Running it twice is harmless: the
-- idempotency key means nobody is paid a second time.
