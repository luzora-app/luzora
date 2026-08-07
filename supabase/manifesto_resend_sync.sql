-- ---------------------------------------------------------------------------
-- Recording the Resend contact for a signer
-- ---------------------------------------------------------------------------
-- Signers have never reached Resend. newsletter_subscribers carries
-- resend_contact_id, resend_topic_id and resend_synced_at, but
-- manifesto_signatures has no equivalent, so there was nowhere to record a
-- contact even if one had been created.
--
-- Syncing happens at verification, not at signup. An address that never
-- confirmed is a typo or an abandoned attempt, and putting those into a
-- sending list costs deliverability for everyone else on it.

-- ---------------------------------------------------------------------------
-- Columns
-- ---------------------------------------------------------------------------
-- Same three names newsletter_subscribers uses, so the two tables stay
-- readable side by side.

alter table public.manifesto_signatures
  add column if not exists resend_contact_id text,
  add column if not exists resend_topic_id text,
  add column if not exists resend_synced_at timestamptz;

-- Finding unsynced signers is the backfill's hot path.
create index if not exists manifesto_signatures_resend_pending_idx
  on public.manifesto_signatures (signed_at)
  where email_verified_at is not null and resend_synced_at is null;

-- Marks one signature as synced. Called after Resend confirms the contact.
create or replace function public.mark_manifesto_resend_synced(
  p_public_id uuid,
  p_contact_id text,
  p_topic_id text
)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.manifesto_signatures
    set resend_contact_id = coalesce(nullif(p_contact_id, ''), resend_contact_id),
        resend_topic_id   = coalesce(nullif(p_topic_id, ''), resend_topic_id),
        resend_synced_at  = now()
    where public_id = p_public_id;

  return found;
end;
$$;

-- Everyone verified who has never been synced. Drives the backfill for signers
-- who came in before this existed.
create or replace function public.manifesto_signers_pending_resend(p_limit integer default 100)
returns table (public_id uuid, email text, username text, signed_at timestamptz)
language sql
security definer
set search_path = public
as $$
  select public_id, email, username, signed_at
  from public.manifesto_signatures
  where email_verified_at is not null
    and resend_synced_at is null
  order by signed_at asc
  limit greatest(coalesce(p_limit, 100), 1);
$$;

revoke all on function public.mark_manifesto_resend_synced(uuid, text, text) from public, anon, authenticated;
revoke all on function public.manifesto_signers_pending_resend(integer) from public, anon, authenticated;

grant execute on function public.mark_manifesto_resend_synced(uuid, text, text) to service_role;
grant execute on function public.manifesto_signers_pending_resend(integer) to service_role;
