-- ---------------------------------------------------------------------------
-- Grandfathering the signers who came before the six digit code
-- ---------------------------------------------------------------------------
-- When these people signed, signing was the whole act. Verification was a link
-- in an email that, in practice, nobody clicked: 91 signatures, 0 verified.
--
-- The new flow makes confirmation part of signing, and several things key off
-- email_verified_at:
--
--   * get_signer_page reports 'not_verified' and refuses to render a page
--   * award_hive_points gates the X task rules behind a verified email
--   * a referral only pays once the referred signer verifies
--
-- Left alone, every existing signer would be told to go and finish signing
-- something they finished months ago. They signed. Nothing about a later change
-- to our own plumbing should be their problem.
--
-- This marks them verified as of the moment they actually signed, then runs the
-- same crediting everyone else gets. It is idempotent: award_hive_points will
-- not pay a rule twice, and the update skips anyone already verified.
--
-- Takes a cutoff so an in-flight new signup, one that has requested a code but
-- not entered it, cannot be swept up and marked verified without ever
-- confirming. Pass the moment the new flow went live.
--
--   select * from public.grandfather_manifesto_signers('2026-08-07T00:00:00Z');

create or replace function public.grandfather_manifesto_signers(p_cutoff timestamptz)
returns table (public_id uuid, username text, credited integer)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_row public.manifesto_signatures%rowtype;
  v_credited integer;
begin
  for v_row in
    select *
    from public.manifesto_signatures
    where email_verified_at is null
      and signed_at < p_cutoff
    order by signed_at asc
  loop
    -- Verified as of when they signed, not now. The date is a record of what
    -- happened, and they did confirm their intent that day by signing.
    update public.manifesto_signatures
      set email_verified_at = v_row.signed_at
      where id = v_row.id;

    -- Same crediting path as a code confirmation: the signing award, any X
    -- tasks already confirmed, and any referral that was waiting on them.
    v_credited := public.finalize_manifesto_verification(v_row.id);

    public_id := v_row.public_id;
    username  := v_row.username;
    credited  := v_credited;
    return next;
  end loop;
end;
$$;

revoke all on function public.grandfather_manifesto_signers(timestamptz) from public, anon, authenticated;
grant execute on function public.grandfather_manifesto_signers(timestamptz) to service_role;
