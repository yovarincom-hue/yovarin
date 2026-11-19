# Deploying to Cloudflare Workers

The Next.js app runs on Cloudflare Workers using OpenNext, with consultation
leads and newsletter subscribers stored in Cloudflare D1.

## Deploy

1. Install dependencies with `npm install`.
2. Log in with `npx wrangler login`.
3. Configure the Worker variables and secrets below.
4. Apply the D1 schema with `npx wrangler d1 migrations apply yovarin-db --remote`.
5. Test using `npm run cf:preview`.
6. Deploy with `npm run cf:deploy`; the production URL is
   `https://yovarin.yovarin.workers.dev/`.

The `yovarin-db` database is already provisioned for this project. Migrations
create the consultation-lead, newsletter-subscriber, and account-authentication
tables. Do not apply a destructive migration.

### Automatic deployment from GitHub

`.github/workflows/deploy-cloudflare.yml` builds and deploys the Worker after
each push to `main`, applying pending D1 migrations first. Configure these
GitHub repository Actions secrets and variable:

- `CLOUDFLARE_API_TOKEN`: token with Workers Scripts Edit and D1 Edit access.
- `CLOUDFLARE_ACCOUNT_ID`: Cloudflare account ID.
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` (Actions variable): the public key for the
  Turnstile widget allowed on the production hostname.

The Worker must also have the runtime secrets `AUTH_SECRET`,
`TURNSTILE_SECRET_KEY`, and `RESEND_API_KEY`, plus the `EMAIL_FROM` variable.
Set those in Cloudflare before relying on account registration and recovery.

## Form protection

Create a Cloudflare Turnstile widget that permits `yovarin.yovarin.workers.dev`.
Set `NEXT_PUBLIC_TURNSTILE_SITE_KEY` in the build environment and
`TURNSTILE_SECRET_KEY` as a Worker secret. Public form submissions are rate
limited using the `API_LIMITER` binding and rejected if Turnstile is missing or
invalid; the forms remain unavailable until both keys are configured.

For local development, copy `.dev.vars.example` to `.dev.vars` and provide the
secret values. `NEXT_PUBLIC_TURNSTILE_SITE_KEY` must also be set in the build
environment.

## Private admin dashboard

The dashboard is available at `/admin`. Create a Cloudflare Access self-hosted
application covering `/admin*` and `/api/admin/*`, and restrict its allow policy
to the intended administrator. Configure these Worker variables:

- `ADMIN_EMAIL`: the exact email allowed to view lead and subscriber records.
- `CF_ACCESS_TEAM_DOMAIN`: the Access team hostname, such as
  `your-team.cloudflareaccess.com`.
- `CF_ACCESS_AUD`: the Access application's audience tag.

Admin API routes independently verify the Access JWT signature, issuer,
audience, expiration, and email before querying D1. The dashboard cannot read
records until these variables are configured and the Access application is
active.

Cloudflare Access public-hostname applications require an active domain zone.
The current `workers.dev` hostname cannot be used to finish this setup, so the
admin API correctly denies all requests until an owned domain is added to
Cloudflare and Access is configured for it.

## Email

Cloudflare Workers do not support outbound SMTP connections. For Cloudflare,
configure a Resend API key as the Worker secret `RESEND_API_KEY` and set
`EMAIL_FROM` to a sender address verified with Resend. The Gmail/Nodemailer settings remain available for local Node.js deployments.

Account registration and password recovery send a six-digit email code that
expires after 10 minutes. Set a unique random `AUTH_SECRET` Worker secret to
protect the stored one-time-code verifiers; it must be at least 32 characters.
Account access also requires the
Turnstile site and secret keys described above. Passwords are stored as PBKDF2
hashes; browser sessions use HttpOnly, SameSite cookies. Resetting a password
invalidates existing sessions.

```powershell
npx wrangler secret put RESEND_API_KEY
npx wrangler secret put TURNSTILE_SECRET_KEY
npx wrangler secret put AUTH_SECRET
npx wrangler d1 migrations apply yovarin-db --remote
npm run cf:deploy
```

Set `EMAIL_FROM`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `ADMIN_EMAIL`,
`CF_ACCESS_TEAM_DOMAIN`, and `CF_ACCESS_AUD` as Worker/build variables in the
Cloudflare dashboard. For local development, set `AUTH_SECRET`,
`TURNSTILE_SECRET_KEY`, `RESEND_API_KEY`, and `EMAIL_FROM` in `.dev.vars`, and
set `NEXT_PUBLIC_TURNSTILE_SITE_KEY` in the build environment.

## Production URL

The site uses `https://yovarin.yovarin.workers.dev/` as its production URL.
`workers_dev` is enabled in `wrangler.jsonc`. Vercel deployments are not managed
by this repository and must be disabled separately in the Vercel dashboard.

## Builds

In Cloudflare Workers Builds, use `npm run cf:build` as the build command and
`npx wrangler deploy` as the deploy command. Add
`NEXT_PUBLIC_TURNSTILE_SITE_KEY` to the build environment. Set the Worker
variables and secrets in the Cloudflare dashboard as described above.

To use the Next.js image optimization API, enable Cloudflare Images for the
account. Image transformations may incur Cloudflare Images charges.
