# ElectronicRecycle.net V5 — Multi-Market + Conversion/SEO Pass

## Multi-market architecture
- Root `/` is now a clean location selector for:
  - `/az` — EVER, East Valley Electronic Recycle
  - `/tx` — EPER, El Paso Electronic Recycle
- The selected market is remembered in local storage and can be changed from the header at any time.
- Direct Google/search traffic to a city/service page does not get interrupted by the selector.
- Existing V4 Arizona URLs redirect permanently to the matching `/az` URL to preserve SEO equity.

## Arizona URLs
- `/az`
- `/az/gilbert`
- `/az/chandler`
- `/az/queen-creek`
- `/az/san-tan-valley`
- `/az/mesa`
- `/az/tempe`
- `/az/phoenix`
- `/az/florence`
- `/az/services/...`
- `/az/recycle`, `/az/business`, `/az/pricing`, `/az/resources`, etc.

## Texas / EPER URLs
- `/tx`
- `/tx/el-paso`
- `/tx/services/...`
- `/tx/recycle`, `/tx/business`, `/tx/pricing`, `/tx/resources`, etc.

EPER intentionally does not publish a phone number, public email address, street address, or public hours because those facts were not supplied for this build. The forms remain functional through the deployment email routing configuration.

## Competitor-inspired improvements added
- Dedicated `Free vs. Fee` pricing page.
- `Who We Serve` page for businesses, IT departments/MSPs, schools, property managers, healthcare/professional offices, government and organizations.
- Business pickup form now supports up to five photos or inventory files (CSV, Excel, PDF, text) with server-side size/type validation.
- Data-bearing device / hard-drive page that is explicit about what standard recycling does **not** promise. No fake certified destruction claims were added.
- Equipment gallery framework added without pretending illustrative assets are real customer projects.
- Resource/blog architecture created under each market.
- Seed SEO articles added for Arizona and El Paso.
- Homepage now surfaces pricing, commercial audiences, and local resources instead of hiding those pages in the footer.

## SEO architecture
- Separate canonical URLs per market.
- City-specific pages under short `/az/<city>` and `/tx/el-paso` URLs.
- Nine service keyword pages exist for each market.
- Root, market, service, city, resource, pricing, FAQ, and policy pages have unique metadata.
- Service and city internal linking updated to stay inside the selected market.
- Expanded XML sitemap includes both markets, service pages, city pages, and articles.
- Organization/Service/FAQ/Article/Breadcrumb structured data used where appropriate.
- Old V4 `/services/*`, `/areas/*`, `/business`, `/recycle`, etc. permanently redirect to Arizona equivalents.
- Texas service illustration filenames were duplicated with `-el-paso` filenames so local pages are not loading assets named `-arizona`.

## Automated blog foundation
- `src/data/resources.ts` is the current resource/article source of truth.
- `/az/resources` and `/tx/resources` are live hubs.
- Article pages include Article schema, canonical URLs, internal city/service links, dates, SEO descriptions, and image alt text.
- `CONTENT_AUTOMATION.md` documents the generation + QA pipeline for future scheduled AI content/image publishing.

## Form routing
Deployment environment supports:
- `RESEND_API_KEY`
- `EVER_LEADS_TO_EMAIL`
- `EVER_LEADS_FROM_EMAIL`
- optional `EPER_LEADS_TO_EMAIL`
- optional `EPER_LEADS_FROM_EMAIL`

If EPER-specific variables are absent, EPER form submissions fall back to the EVER lead destination so requests are not silently lost.

## Validation completed
- TS/TSX syntax transpile audit passed.
- Local and alias import resolution audit passed.
- CSS-module class reference audit passed.
- Referenced brand asset existence audit passed.
- Fact audit reports zero placeholder facts withholding current rendered content.

A full `next build` could not be executed in this environment because project dependencies could not be installed from npm. No source syntax/import/CSS reference errors were found by the local audits.
