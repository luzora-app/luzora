-- ---------------------------------------------------------------------------
-- Allow newsletter signups from named places, not just the website form
-- ---------------------------------------------------------------------------
-- The original policy pinned source to exactly 'website', which was right when
-- the website form was the only way in. The paused Manifesto page is a second
-- entry point and sends 'manifesto_paused', so every submission from it was
-- refused by row level security.
--
-- Keeping source constrained rather than open is deliberate. It is written by
-- the browser, so an unconstrained column lets anyone store arbitrary text.
-- Add a value here when a new entry point ships.

drop policy if exists "Allow public newsletter signup" on public.newsletter_subscribers;

create policy "Allow public newsletter signup"
  on public.newsletter_subscribers
  for insert
  to anon
  with check (
    source in ('website', 'manifesto_paused')
    and char_length(email) <= 254
    and email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'
  );

grant usage on schema public to anon;
grant insert on public.newsletter_subscribers to anon;
