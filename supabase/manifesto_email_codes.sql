-- ---------------------------------------------------------------------------
-- Six digit email verification for the Manifesto flow
-- ---------------------------------------------------------------------------
-- The old flow mailed a UUID link. This adds a six digit code instead, and
-- moves verification to the front of the funnel: name and email, then the
-- code, and only then the signing page.
--
-- The code itself never reaches this database. The API route generates it,
-- mails it, and stores only a salted hash. Verification hashes the submitted
-- code the same way and compares. That keeps a database read from handing
-- someone a working code.
--
-- Both entry points are service role only. A six digit code is guessable in a
-- million tries, so the browser must never be able to call these directly and
-- grind them.
--
-- Existing signers are untouched. verify_manifesto_email still works for
-- anyone holding an old link, and both paths now credit points through the
-- same helper so they cannot drift apart.

-- ---------------------------------------------------------------------------
-- 1. Columns
-- ---------------------------------------------------------------------------

alter table public.manifesto_signatures
  add column if not exists verification_code_hash text,
  add column if not exists verification_code_expires_at timestamptz,
  add column if not exists verification_code_attempts integer not null default 0,
  add column if not exists verification_code_sent_at timestamptz,
  add column if not exists verification_code_send_count integer not null default 0,
  add column if not exists verification_code_window_start timestamptz;

create index if not exists manifesto_signatures_email_normalized_idx
  on public.manifesto_signatures (email_normalized);

-- ---------------------------------------------------------------------------
-- 2. Shared crediting
-- ---------------------------------------------------------------------------
-- Lifted out of verify_manifesto_email so the link path and the code path
-- award identically. Safe to call twice: award_hive_points is idempotent and
-- the referral update is guarded by status.

create or replace function public.finalize_manifesto_verification(p_signature_id uuid)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  v_sig      public.manifesto_signatures%rowtype;
  v_credited integer := 0;
  v_referral public.manifesto_referrals%rowtype;
begin
  select * into v_sig from public.manifesto_signatures where id = p_signature_id;
  if not found then
    return 0;
  end if;

  if v_sig.email_verified_at is null then
    update public.manifesto_signatures
      set email_verified_at = now()
      where id = v_sig.id
      returning * into v_sig;
  end if;

  v_credited := v_credited + public.award_hive_points(v_sig.id, 'manifesto_sign');

  -- Activities confirmed before verifying become payable now.
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

  return v_credited;
end;
$$;

-- The old link path, now delegating so the two cannot drift.
create or replace function public.verify_manifesto_email(p_token uuid)
returns table (signature_id uuid, username text, credited integer)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_sig      public.manifesto_signatures%rowtype;
  v_credited integer := 0;
begin
  select * into v_sig
  from public.manifesto_signatures
  where email_verification_token = p_token;

  if not found then
    return;
  end if;

  v_credited := public.finalize_manifesto_verification(v_sig.id);

  select * into v_sig from public.manifesto_signatures where id = v_sig.id;

  return query select v_sig.id, v_sig.username, v_credited;
end;
$$;

-- ---------------------------------------------------------------------------
-- 3. Requesting a code
-- ---------------------------------------------------------------------------
-- Reuses an unverified row for the same address rather than refusing it, so
-- someone who closes the tab before entering the code can simply start again.
-- An address that is already verified is not an error either: the caller is
-- told so and can send that person to their page.

create or replace function public.start_manifesto_verification(
  p_name text,
  p_email text,
  p_code_hash text,
  p_ttl_seconds integer default 900
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_name  text := trim(coalesce(p_name, ''));
  v_email text := lower(trim(coalesce(p_email, '')));
  v_sig   public.manifesto_signatures%rowtype;
  v_owner uuid;
  v_window_start timestamptz;
  v_send_count integer;
begin
  if v_name !~ '^[A-Za-z0-9_]{3,24}$' then
    return jsonb_build_object('ok', false, 'reason', 'invalid_name');
  end if;

  if v_email !~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$' then
    return jsonb_build_object('ok', false, 'reason', 'invalid_email');
  end if;

  if coalesce(p_code_hash, '') = '' then
    return jsonb_build_object('ok', false, 'reason', 'missing_code');
  end if;

  select * into v_sig
  from public.manifesto_signatures
  where email_normalized = v_email
  limit 1;

  -- Already done. Not an error, just a different destination.
  if found and v_sig.email_verified_at is not null then
    return jsonb_build_object(
      'ok', false,
      'reason', 'already_verified',
      'username', v_sig.username,
      'public_id', v_sig.public_id
    );
  end if;

  -- The name must be free, unless it is already this same pending row.
  select id into v_owner
  from public.manifesto_signatures
  where username_normalized = lower(v_name)
    and (v_sig.id is null or id <> v_sig.id)
  limit 1;

  if v_owner is not null then
    return jsonb_build_object('ok', false, 'reason', 'name_taken');
  end if;

  if found then
    -- One code per minute, and five per hour, per address.
    if v_sig.verification_code_sent_at is not null
       and v_sig.verification_code_sent_at > now() - interval '60 seconds' then
      return jsonb_build_object('ok', false, 'reason', 'too_soon');
    end if;

    v_window_start := v_sig.verification_code_window_start;
    v_send_count   := coalesce(v_sig.verification_code_send_count, 0);

    if v_window_start is null or v_window_start < now() - interval '1 hour' then
      v_window_start := now();
      v_send_count   := 0;
    end if;

    if v_send_count >= 5 then
      return jsonb_build_object('ok', false, 'reason', 'too_many_requests');
    end if;

    update public.manifesto_signatures
      set username                       = v_name,
          verification_code_hash         = p_code_hash,
          verification_code_expires_at   = now() + make_interval(secs => greatest(p_ttl_seconds, 60)),
          verification_code_attempts     = 0,
          verification_code_sent_at      = now(),
          verification_code_send_count   = v_send_count + 1,
          verification_code_window_start = v_window_start
      where id = v_sig.id
      returning * into v_sig;
  else
    insert into public.manifesto_signatures (
      username, email,
      verification_code_hash, verification_code_expires_at,
      verification_code_attempts, verification_code_sent_at,
      verification_code_send_count, verification_code_window_start
    )
    values (
      v_name, v_email,
      p_code_hash, now() + make_interval(secs => greatest(p_ttl_seconds, 60)),
      0, now(), 1, now()
    )
    returning * into v_sig;
  end if;

  return jsonb_build_object(
    'ok', true,
    'username', v_sig.username,
    'public_id', v_sig.public_id,
    'expires_at', v_sig.verification_code_expires_at
  );
exception
  when unique_violation then
    return jsonb_build_object('ok', false, 'reason', 'name_taken');
end;
$$;

-- ---------------------------------------------------------------------------
-- 4. Checking a code
-- ---------------------------------------------------------------------------
-- Five wrong answers burn the code. The caller must request a new one, which
-- is itself rate limited, so guessing a six digit code is not worth trying.

create or replace function public.verify_manifesto_code(
  p_email text,
  p_code_hash text
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_email    text := lower(trim(coalesce(p_email, '')));
  v_sig      public.manifesto_signatures%rowtype;
  v_credited integer := 0;
begin
  select * into v_sig
  from public.manifesto_signatures
  where email_normalized = v_email
  limit 1;

  if not found then
    return jsonb_build_object('ok', false, 'reason', 'not_found');
  end if;

  -- Idempotent: a double submit lands somewhere useful, not on an error.
  if v_sig.email_verified_at is not null then
    return jsonb_build_object(
      'ok', true,
      'already_verified', true,
      'username', v_sig.username,
      'public_id', v_sig.public_id,
      'share_url', v_sig.share_url,
      'credited', 0
    );
  end if;

  if v_sig.verification_code_hash is null then
    return jsonb_build_object('ok', false, 'reason', 'no_code');
  end if;

  if v_sig.verification_code_expires_at is null
     or v_sig.verification_code_expires_at < now() then
    return jsonb_build_object('ok', false, 'reason', 'code_expired');
  end if;

  if coalesce(v_sig.verification_code_attempts, 0) >= 5 then
    return jsonb_build_object('ok', false, 'reason', 'too_many_attempts');
  end if;

  if v_sig.verification_code_hash <> coalesce(p_code_hash, '') then
    update public.manifesto_signatures
      set verification_code_attempts = coalesce(verification_code_attempts, 0) + 1
      where id = v_sig.id
      returning * into v_sig;

    return jsonb_build_object(
      'ok', false,
      'reason', 'code_invalid',
      'attempts_left', greatest(0, 5 - v_sig.verification_code_attempts)
    );
  end if;

  -- Correct. Spend the code so it cannot be replayed.
  update public.manifesto_signatures
    set verification_code_hash       = null,
        verification_code_expires_at = null,
        verification_code_attempts   = 0
    where id = v_sig.id;

  v_credited := public.finalize_manifesto_verification(v_sig.id);

  select * into v_sig from public.manifesto_signatures where id = v_sig.id;

  return jsonb_build_object(
    'ok', true,
    'already_verified', false,
    'username', v_sig.username,
    'public_id', v_sig.public_id,
    'share_url', v_sig.share_url,
    'credited', v_credited
  );
end;
$$;

-- ---------------------------------------------------------------------------
-- 5. Service role only
-- ---------------------------------------------------------------------------
-- The browser talks to the API route, and the API route holds the pepper that
-- makes a hash. Neither function is reachable with the publishable key.

revoke all on function public.start_manifesto_verification(text, text, text, integer) from public, anon, authenticated;
revoke all on function public.verify_manifesto_code(text, text) from public, anon, authenticated;
revoke all on function public.finalize_manifesto_verification(uuid) from public, anon, authenticated;

grant execute on function public.start_manifesto_verification(text, text, text, integer) to service_role;
grant execute on function public.verify_manifesto_code(text, text) to service_role;
grant execute on function public.finalize_manifesto_verification(uuid) to service_role;
