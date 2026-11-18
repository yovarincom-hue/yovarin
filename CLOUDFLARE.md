# Deploying to Cloudflare Workers

The Next.js app runs on Cloudflare Workers using OpenNext, with consultation
leads and newsletter subscribers stored in Cloudflare D1.

## Deploy

1. Install dependencies with `npm install`.
2. Log in with `npx wrangler login`.
3. Configure the Worker variables and secrets below.
4. Apply the D1 schema with `npx wrangler d1 migrations apply yovarin-db --remote`.
5. Test using `npm run cf:preview`.
6. Deploy with `npm run cf:deploy`.

The `yovarin-db` database is already provisioned for this project. The migration
creates the consultation-lead and newsletter-subscriber tables. Do not apply a
destructive migration or change DNS until the production deployment is verified.

## Form protection

Create a Cloudflare Turnstile widget that permits both the `workers.dev` host and
the production hostname once that hostname is added to this Cloudflare account.
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
`EMAIL_FROM` to a sender address verified with Resend. The existing
Gmail/Nodemailer settings remain available for Vercel and local Node.js
deployments.

```powershell
npx wrangler secret put RESEND_API_KEY
npx wrangler secret put TURNSTILE_SECRET_KEY
npm run cf:deploy
```

Set `EMAIL_FROM`, `ADMIN_EMAIL`, `CF_ACCESS_TEAM_DOMAIN`, and `CF_ACCESS_AUD` as
Worker variables in the Cloudflare dashboard.

## Production domain cutover

The `yovarin.com` zone is not yet in this Cloudflare account. Current public DNS
lookups return no records for `yovarin.com`; the existing Vercel deployment is
available at `yovarin.vercel.app`. Confirm the exact custom domain and its
registration before attempting a zone or nameserver change. If the intended
domain is registered, add the zone, review and preserve any existing DNS
records (especially MX, SPF, DKIM, and verification records), and verify the
Worker's custom-domain setup. Leave the Vercel deployment untouched until the
Cloudflare Worker and forms have been verified.

## Builds

In Cloudflare Workers Builds, use `npm run cf:build` as the build command and
`npx wrangler deploy` as the deploy command. Add
`NEXT_PUBLIC_TURNSTILE_SITE_KEY` to the build environment. Set the Worker
variables and secrets in the Cloudflare dashboard as described above.

To use the Next.js image optimization API, enable Cloudflare Images for the
account. Image transformations may incur Cloudflare Images charges.
