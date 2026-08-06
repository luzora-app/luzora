-- ---------------------------------------------------------------------------
-- The signer page
-- ---------------------------------------------------------------------------
-- One read that returns everything a signer page shows: the card, both
-- balances, rank, the four X tasks, and the referral list with what each
-- referral earned.
--
-- A page can be reached by public id, username, or email. Email is a lookup
-- key only. It is never returned, not for the signer and not for anyone in
-- their referral list, so the page cannot be used to harvest addresses.
--
-- Service role only, so the API route can rate limit it. Left open to anon it
-- would let anyone test whether a given address signed Luzora.

create or replace function public.get_signer_page(p_lookup text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_lookup     text := trim(coalesce(p_lookup, ''));
  v_normalized text := lower(v_lookup);
  v_uuid       uuid;
  v_sig        public.manifesto_signatures%rowtype;
  v_balance    public.hive_points_balances%rowtype;
  v_position   bigint;
  v_referrals  jsonb;
  v_ref_total  bigint;
  v_ref_count  bigint;
begin
  if v_lookup = '' then
    return jsonb_build_object('ok', false, 'reason', 'not_found');
  end if;

  -- Public id first, then username, then email. A username cannot contain @
  -- and is never a uuid, so the three spaces cannot collide.
  begin
    v_uuid := v_lookup::uuid;
  exception
    when invalid_text_representation then
      v_uuid := null;
  end;

  if v_uuid is not null then
    select * into v_sig from public.manifesto_signatures where public_id = v_uuid limit 1;
  elsif position('@' in v_normalized) > 0 then
    select * into v_sig from public.manifesto_signatures where email_normalized = v_normalized limit 1;
  else
    select * into v_sig from public.manifesto_signatures where username_normalized = v_normalized limit 1;
  end if;

  if not found then
    return jsonb_build_object('ok', false, 'reason', 'not_found');
  end if;

  -- An unverified row is not a page yet. Saying so lets the caller send that
  -- person back to finish rather than showing an empty card.
  if v_sig.email_verified_at is null then
    return jsonb_build_object(
      'ok', false,
      'reason', 'not_verified',
      'username', v_sig.username
    );
  end if;

  select * into v_balance
  from public.hive_points_balances
  where signature_id = v_sig.id;

  select position into v_position
  from public.hive_leaderboard
  where public_id = v_sig.public_id;

  -- Everyone this signer brought in who made it past verification, with what
  -- that referral actually paid.
  select
    coalesce(jsonb_agg(entry order by entry ->> 'signed_at' desc), '[]'::jsonb),
    coalesce(sum((entry ->> 'points')::bigint), 0),
    count(*)
  into v_referrals, v_ref_total, v_ref_count
  from (
    select jsonb_build_object(
      'username', rs.username,
      'public_id', rs.public_id,
      'signed_at', rs.signed_at,
      'points', coalesce(l.points, 0)
    ) as entry
    from public.manifesto_referrals r
    join public.manifesto_signatures rs on rs.id = r.referred_signature_id
    left join public.hive_points_ledger l
      on l.signature_id = r.referrer_signature_id
     and l.ref_id = r.id
     and l.reason = 'referral_manifesto'
    where r.referrer_signature_id = v_sig.id
      and r.status = 'active'
  ) rows;

  return jsonb_build_object(
    'ok', true,
    'username', v_sig.username,
    'public_id', v_sig.public_id,
    'signer_number', v_sig.signer_number,
    'signed_at', v_sig.signed_at,
    'share_url', v_sig.share_url,
    'x_handle', v_sig.x_handle,
    'tasks', jsonb_build_object(
      'x_follow', coalesce(v_sig.x_follow_confirmed, false),
      'x_repost', coalesce(v_sig.x_retweet_confirmed, false),
      'x_quote', coalesce(v_sig.x_quote_confirmed, false),
      'x_comment', coalesce(v_sig.x_comment_confirmed, false)
    ),
    'tasks_complete', (
      coalesce(v_sig.x_follow_confirmed, false)
      and coalesce(v_sig.x_retweet_confirmed, false)
      and coalesce(v_sig.x_quote_confirmed, false)
      and coalesce(v_sig.x_comment_confirmed, false)
    ),
    'lifetime_hp', coalesce(v_balance.lifetime_hp, 0),
    'available_hp', coalesce(v_balance.available_hp, 0),
    'rank', v_position,
    'referrals', v_referrals,
    'referral_count', v_ref_count,
    'referral_points', v_ref_total
  );
end;
$$;

revoke all on function public.get_signer_page(text) from public, anon, authenticated;
grant execute on function public.get_signer_page(text) to service_role;

-- ---------------------------------------------------------------------------
-- Resuming an unfinished signing session
-- ---------------------------------------------------------------------------
-- A verified signer who closed the tab before finishing the tasks would
-- otherwise be locked out: start_manifesto_verification refuses a verified
-- address, and the page itself is read only. This lets them ask for a code
-- again, under the same rate limits, purely to get back into their session.

create or replace function public.start_manifesto_resume(
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
  v_email text := lower(trim(coalesce(p_email, '')));
  v_sig   public.manifesto_signatures%rowtype;
  v_window_start timestamptz;
  v_send_count integer;
begin
  select * into v_sig
  from public.manifesto_signatures
  where email_normalized = v_email
  limit 1;

  if not found then
    return jsonb_build_object('ok', false, 'reason', 'not_found');
  end if;

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
    set verification_code_hash         = p_code_hash,
        verification_code_expires_at   = now() + make_interval(secs => greatest(p_ttl_seconds, 60)),
        verification_code_attempts     = 0,
        verification_code_sent_at      = now(),
        verification_code_send_count   = v_send_count + 1,
        verification_code_window_start = v_window_start
    where id = v_sig.id
    returning * into v_sig;

  return jsonb_build_object(
    'ok', true,
    'username', v_sig.username,
    'public_id', v_sig.public_id,
    'expires_at', v_sig.verification_code_expires_at
  );
end;
$$;

revoke all on function public.start_manifesto_resume(text, text, integer) from public, anon, authenticated;
grant execute on function public.start_manifesto_resume(text, text, integer) to service_role;
