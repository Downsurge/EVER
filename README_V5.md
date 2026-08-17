# ElectronicRecycle.net V5

Multi-market architecture for:

- `/az` — EVER / East Valley Electronic Recycle
- `/tx` — EPER / El Paso Electronic Recycle
- `/` — market selector

## Included in V5

- Market-aware branding, navigation, forms, SEO, city pages, service pages, resources and legal pages.
- Arizona city pages: Gilbert, Chandler, Queen Creek, San Tan Valley, Mesa, Tempe, Phoenix, Florence.
- Texas city page: El Paso.
- Agape-inspired improvements implemented without copying its content: Free vs. Fee, Who We Serve, gallery framework, data-bearing-device guidance, business photo/inventory uploads, and resources architecture.
- Resource/blog structure prepared for future automated content generation.
- Old V4 URLs permanently redirect into `/az` equivalents.

## Email environment variables

```env
RESEND_API_KEY=re_your_api_key
EVER_LEADS_TO_EMAIL=ever@electronicrecycle.net
EVER_LEADS_FROM_EMAIL=EVER Website <website@your-verified-domain.com>
EPER_LEADS_TO_EMAIL=
EPER_LEADS_FROM_EMAIL=
```

EPER email variables are intentionally optional until the operator supplies the desired Texas inbox/sender.

## Important EPER facts still needed

Do not publish invented values. Add these when confirmed:

- EPER public phone number
- EPER public email address, if different from the form-routing inbox
- El Paso drop-off address
- El Paso public hours
- Any EPER-specific pickup minimum/fee policy if it differs from the current review-first language

## Validation

Static syntax transpilation, local import resolution, CSS-module references and public brand-asset references were audited successfully. A full Next.js production build was not run because the sandbox did not have the project dependency/type packages fully available.
