-- ---------------------------------------------------------------------------
-- Recording bounces
-- ---------------------------------------------------------------------------
-- confirmation_email_sent_at means Resend accepted the send. A bounce happens
-- after that, asynchronously, and nothing tells this database about it. So an
-- address that hard bounced still looks like a successful send here, and the
-- Resend sync rule would treat it as evidence the address works.
--
-- It is the opposite: a bounce is the strongest evidence we have that an
-- address does not work. Syncing it costs sending reputation for everyone else
-- on the list.
--
-- Marking them sets confirmation_email_error, which the pending rule already
-- excludes on.

alter table public.manifesto_signatures
  add column if not exists confirmation_email_bounced_at timestamptz;

-- Marks addresses as bounced. Takes a list, so a batch pulled from the Resend
-- dashboard can be pasted in one go. Returns what it matched, so a typo shows
-- up as a smaller count rather than silently doing nothing.
create or replace function public.mark_manifesto_bounces(p_emails text[])
returns table (username text, email text)
language plpgsql
security definer
set search_path = public
as $$
begin
  return query
  update public.manifesto_signatures s
    set confirmation_email_bounced_at = coalesce(s.confirmation_email_bounced_at, now()),
        confirmation_email_error = coalesce(s.confirmation_email_error, 'bounced')
    where s.email_normalized = any (
      select lower(trim(e)) from unnest(coalesce(p_emails, '{}')) as e
    )
    returning s.username, s.email;
end;
$$;

-- Undo, for a soft bounce that was really a full mailbox or a temporary outage.
create or replace function public.clear_manifesto_bounce(p_email text)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.manifesto_signatures
    set confirmation_email_bounced_at = null,
        confirmation_email_error = null
    where email_normalized = lower(trim(coalesce(p_email, '')));

  return found;
end;
$$;

revoke all on function public.mark_manifesto_bounces(text[]) from public, anon, authenticated;
revoke all on function public.clear_manifesto_bounce(text) from public, anon, authenticated;

grant execute on function public.mark_manifesto_bounces(text[]) to service_role;
grant execute on function public.clear_manifesto_bounce(text) to service_role;
