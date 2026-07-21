# Luzora Email Templates

These templates mirror the shared Resend layout in `api/_email.js`.

Use these in Supabase Auth:

1. Go to Supabase Dashboard.
2. Open `Authentication`.
3. Open `Emails`.
4. Choose the matching template.
5. Paste the HTML from the matching file.

Templates:

- `supabase-confirm-email.html` for the Confirm signup email.
- `supabase-reset-password.html` for the Reset password email.
- `survey-responders-invite.html` for the Resend broadcast to 2024 research respondents.
- `manifesto-signed.html` is a browser preview of the automatic transactional email sent by `api/manifesto-sign.js`.

The Supabase templates use Supabase's `{{ .ConfirmationURL }}` variable for the action link.
The Resend broadcast template uses Resend's unsubscribe URL placeholder in the footer.

The survey responders invite uses private media from `assets/brand-kit/other assets/Private`.
Those files are intentionally not listed on the public brand assets page.

Before deploying automatic manifesto confirmation emails, run
`supabase/manifesto_confirmation_email.sql` in the Supabase SQL editor.

The manifesto form posts to `api/manifesto-sign.js`. That endpoint saves the
signature through Supabase, sends the transactional email through Resend, and
records the Resend email ID on the signature row.

Required Vercel environment variables:

- `RESEND_API_KEY`
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

After changing an environment variable, redeploy the website before testing.
Use a new email address and a new manifesto name because each can sign only
once.
