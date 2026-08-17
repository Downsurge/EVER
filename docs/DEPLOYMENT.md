# Deploying EVER

Target: **Vercel**. The site is Next.js 16 with genuinely dynamic routes
(`/recycle`, `/what-we-accept`, `/contact`) and two API routes, so it needs a
host that runs Next.js server-side rather than a static export.

Note on plan: Vercel's free Hobby tier prohibits commercial use. EVER is a
business, so this needs **Pro** (currently $20/month). Netlify's free tier
permits commercial use if that matters more than Next-version support.

## One-time machine setup

Already done on this machine, recorded so it can be repeated elsewhere:

- `npm install -g vercel` (CLI 59.1.3)
- `XDG_DATA_HOME` is set to `C:\Users\izaia\.vercel-cli` at user scope.
  Without it the CLI dies with `EXDEV: cross-device link not permitted`,
  because its default config directory under `AppData\Roaming\xdg.data` is
  EFS-encrypted and Windows will not rename a plaintext temp file into an
  encrypted directory. Pointing the config at a non-encrypted folder avoids
  changing any encryption setting.

## Steps that need your credentials

These cannot be automated for you, by design: they involve your account and
an API key.

1. **Log in.** Opens a browser.

   ```
   vercel login
   ```

2. **Link the repo.** From the project root. Accept the detected framework
   (Next.js); take the defaults for build and output.

   ```
   vercel link
   ```

3. **Add the three environment variables.** The CLI prompts for the value, so
   the key is typed by you and never passes through a script or a log.

   ```
   vercel env add RESEND_API_KEY production
   vercel env add EVER_LEADS_TO_EMAIL production
   vercel env add EVER_LEADS_FROM_EMAIL production
   ```

   - `RESEND_API_KEY` comes from the Resend dashboard.
   - `EVER_LEADS_TO_EMAIL` is where business leads land, currently
     `ever@electronicrecycle.net`.
   - `EVER_LEADS_FROM_EMAIL` must use a domain **verified in Resend**. An
     unverified sending domain is the usual reason the first real lead never
     arrives, so verify it before launch rather than during it.

   Repeat with `preview` in place of `production` if you want the forms
   working on preview deployments too.

4. **Deploy a preview first.** This gives a URL to review without touching a
   production domain.

   ```
   vercel
   ```

5. **Promote to production** only once the checks below pass.

   ```
   vercel --prod
   ```

## Before the first production deploy

Run the fact audit and read the drafted list:

```
npm run facts
```

Anything marked **DRAFTED** renders on the live site but has not been
confirmed by the operator. Today that includes most of the acceptance policy:
the `$15` flat screen TV fee and the CRT refusal are operator-confirmed, and
the rest of the equipment rules were drafted from general e-scrap economics.
Publishing an unconfirmed fee or acceptance rule is the one failure mode
`EVER_WEBSITE_VISION.md` spends most of its length warning about.

Also confirm before going live:

- The phone number and email in `src/data/site.ts` are correct, since they
  are rendered publicly and are `verified`.
- The drop-off street address is still withheld. The finder tells visitors
  the address is not published rather than inventing one.
- Opening days are still unset, so the site shows the times without claiming
  a weekly schedule.

## Domain

Point `electronicrecycle.net` at the Vercel project once a production deploy
looks right. Vercel issues the certificate automatically. Keep the apex and
`www` both attached, with one redirecting to the other so the site has a
single canonical host.

## What the build produces

Verified locally with `npm run build`:

- Static: `/`, `/business`, `/faq`, `/privacy`, `/terms`,
  `/acceptance-policy`, `/accessibility`, `/robots.txt`, `/sitemap.xml`,
  `/manifest.webmanifest`
- Dynamic: `/recycle`, `/what-we-accept`, `/contact`, and both API routes
- SSG: `/areas/[city]`, which currently emits **zero** pages because no city
  has both an actionable service path and an operator-approved title and
  summary. That is intended, not a build failure.
