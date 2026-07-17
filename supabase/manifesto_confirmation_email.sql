-- Manifesto confirmation email delivery tracking
-- Run this once in the Supabase SQL editor before deploying the API change.

alter table public.manifesto_signatures
  add column if not exists confirmation_email_attempted_at timestamptz,
  add column if not exists confirmation_email_sent_at timestamptz,
  add column if not exists confirmation_email_id text,
  add column if not exists confirmation_email_error text;

comment on column public.manifesto_signatures.confirmation_email_attempted_at
  is 'Most recent attempt to send the transactional manifesto confirmation email.';

comment on column public.manifesto_signatures.confirmation_email_sent_at
  is 'Time Resend accepted the manifesto confirmation email.';

comment on column public.manifesto_signatures.confirmation_email_id
  is 'Resend email identifier for delivery troubleshooting.';

comment on column public.manifesto_signatures.confirmation_email_error
  is 'Most recent email delivery error, if any.';
