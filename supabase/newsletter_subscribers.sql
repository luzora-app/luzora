-- Luzora newsletter signups
-- Run this in the Supabase SQL editor for the Luzora project.

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  email_normalized text generated always as (lower(trim(email))) stored,
  source text not null default 'website',
  page_url text,
  referrer text,
  user_agent text,
  subscribed_at timestamptz not null default now(),
  unsubscribed_at timestamptz,
  created_at timestamptz not null default now()
);

create unique index if not exists newsletter_subscribers_email_normalized_key
  on public.newsletter_subscribers (email_normalized);

alter table public.newsletter_subscribers enable row level security;

drop policy if exists "Allow public newsletter signup" on public.newsletter_subscribers;

create policy "Allow public newsletter signup"
  on public.newsletter_subscribers
  for insert
  to anon
  with check (
    source = 'website'
    and char_length(email) <= 254
    and email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'
  );

grant usage on schema public to anon;
grant insert on public.newsletter_subscribers to anon;
