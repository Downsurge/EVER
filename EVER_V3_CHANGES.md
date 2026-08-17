# EVER v3 — Refinement Pass

## Visual cleanup
- Removed unnecessary micro-labels, annotation-style captions, status callouts, and extra slogan copy.
- Reduced decorative outlines on cards and content boxes. Borders remain mainly where they communicate an actual input/control/state.
- Kept the strong EVER motion/interaction system while making the pages feel less like an AI-generated component library.

## Business pickup
- Completed briefs now open an accessible modal contact form.
- The brief is attached automatically to the contact information.
- Added a server-side email endpoint at `/api/business-lead`.
- Added spam honeypot, validation, HTML escaping, reply-to handling, and user-facing success/error states.
- Email delivery uses Resend's HTTPS API without adding a new npm dependency.

### Required deployment environment variables
- `RESEND_API_KEY`
- `EVER_LEADS_TO_EMAIL`
- `EVER_LEADS_FROM_EMAIL`

See `.env.example`.

## Footer
- Finished footer navigation with:
  - Services
  - East Valley service areas
  - Privacy Policy
  - Terms of Use
  - Acceptance Policy
  - Accessibility
  - Contact
  - Veteran Owned & Operated
  - Copyright/domain line

## New pages
- `/privacy`
- `/terms`
- `/acceptance-policy`
- `/accessibility`
- `/contact`

## General contact
- Added a general contact form and `/api/contact` route using the same email configuration.

## Legal note
The legal/policy pages are practical launch drafts designed around this website's current data and service flows. They should be reviewed if EVER adds customer accounts, payments, advertising tracking, certified data-destruction contracts, equipment purchases, or other higher-risk services.

## Validation performed
- CSS-module reference audit passed.
- Local and `@/` import audit passed.
- TypeScript/TSX syntax transpile audit passed.
- No new npm dependency was introduced.
