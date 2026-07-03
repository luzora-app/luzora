-- Luzora data deletion verification requests
-- Run this in the Supabase SQL editor for the Luzora project.

create table if not exists public.data_deletion_requests (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  email_normalized text generated always as (lower(trim(email))) stored,
  scope text not null check (scope in ('data', 'account')),
  reason text not null,
  token_hash text not null,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'expired', 'processed', 'rejected')),
  page_url text,
  referrer text,
  user_agent text,
  requested_at timestamptz not null default now(),
  expires_at timestamptz not null,
  verified_at timestamptz,
  processed_at timestamptz
);

create unique index if not exists data_deletion_requests_token_hash_key
  on public.data_deletion_requests (token_hash);

create index if not exists data_deletion_requests_email_status_idx
  on public.data_deletion_requests (email_normalized, status);

alter table public.data_deletion_requests enable row level security;

grant usage on schema public to anon;
