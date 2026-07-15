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

The Supabase templates use Supabase's `{{ .ConfirmationURL }}` variable for the action link.
The Resend broadcast template uses Resend's unsubscribe URL placeholder in the footer.

The survey responders invite uses private media from `assets/brand-kit/other assets/Private`.
Those files are intentionally not listed on the public brand assets page.
