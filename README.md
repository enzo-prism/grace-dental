# Grace Dental — Santa Rosa, CA (preview redraft)

Next.js 16 + React 19 + Tailwind 4 + shadcn preview redraft for Grace Dental
(Dr. Tingjen Ji, DDS, MSD), replacing the live Webflow site at
https://www.tingjenjidds.com/.

Production preview: https://grace-dental.vercel.app

## Stack

- Next.js App Router, all-static content in code (`lib/`)
- Contact + appointment-request forms POST to `app/api/*`, delivered via Resend
- GA4 lead tracking (`lib/ga4.ts`, ID `G-9ZMKH4V6FR`)

## Getting started

```bash
pnpm install
cp .env.example .env.local   # fill in values below
pnpm dev
```

## Environment

| Variable | Where | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | public | Canonical URL for metadata, sitemap, robots. Defaults to `https://grace-dental.vercel.app` when unset. |
| `RESEND_API_KEY` | server only | Resend API key for form emails. Without it (and `EMAIL_FROM`), forms return 503 with a "call the office" fallback. |
| `EMAIL_FROM` | server only | Verified Resend sender, e.g. `Grace Dental <hello@your-verified-domain.com>`. |
| `CONTACT_TO_EMAIL` | server only | Inbox for form submissions. Defaults to `gracedentalsantarosa@gmail.com`. |

All four must be set in the Vercel project settings before launch —
there are currently no env vars configured on the Vercel project.

## Commands

```bash
pnpm dev     # local dev (wraps next dev)
pnpm lint    # eslint
pnpm build   # production build (27 static pages)
pnpm start   # serve production build
```

## Booking strategy

Hybrid: native appointment-request flow at `/registration` (emails the
office, GA4 `generate_lead` event) plus a "Use Zocdoc" fallback link
(`siteConfig.zocdocHref` in `lib/site.ts`) for instant booking.

## Notes

- Form API routes share an in-memory per-IP rate limiter (`lib/rate-limit.ts`,
  5 req/min). It resets on redeploy — fine for this traffic level.
- `pnpm-workspace.yaml` pins `allowBuilds`; all currently `false`.
