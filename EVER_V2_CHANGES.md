# EVER v2 — Interactive Redesign

## What changed
- Rebuilt the homepage around two clear paths: residential item checking and business pickup.
- Replaced the plain hero graphic with an animated routing junction tied to the EVER blue/cyan/lime V.
- Added the approved EVER horizontal logo as real production assets, including a reversed dark-background version.
- Added richer device icon cards and a more app-like residential item checker with a sticky live result panel.
- Rebuilt the commercial flow as a 3-step pickup brief builder with a live dark-mode summary.
- Turned Receive → Identify → Recover → Reuse → Recycle into a branded scroll/process rail.
- Added an interactive “Recycle everything vs Evaluate first” value-recovery comparison.
- Added an East Valley service-area schematic with city links.
- Split “Recycle” and “What We Accept” into different jobs:
  - Recycle = item-checking tool
  - What We Accept = maintained source-of-truth catalog
- Reworked the Business page into a technology-recovery workflow instead of a generic service page.
- Activated distinct city pages for Gilbert, Mesa, Chandler, Queen Creek, Tempe, and San Tan Valley for commercial pickup.
- Added responsive motion, microinteractions, reduced-motion fallbacks, sticky navigation polish, and stronger section pacing.
- Preserved the existing fact-verification architecture and accessibility-first interaction patterns.

## Important launch facts intentionally NOT invented
- No public EVER street address is published.
- No public drop-off hours are published.
- No certification badges are published.
- No Google review count, impact counter, or recycled-pound total is invented.
- No contact email/phone/CRM destination is invented.

## Needs operator sign-off before public launch
1. Final television acceptance/fee policy.
2. Final CRT policy.
3. Loose lithium-battery operating policy.
4. Any other drafted acceptance rules listed by `npm run facts`.
5. Final city-page copy if you want different local positioning.
6. A real EVER email, phone number, or CRM/form endpoint so the Business Pickup brief can submit instead of only copying the brief.
7. Physical drop-off address/hours once a yard is actually operating.

## Validation performed here
- CSS-module references audited.
- Local and `@/` import references audited.
- TypeScript/TSX syntax transpile audit passed with the global TypeScript parser.
- Full `tsc --noEmit` could not complete because dependency installation timed out in the sandbox; run `npm ci && npm run typecheck && npm run build` in a normal connected development environment.
