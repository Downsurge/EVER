# EVER

**East Valley Electronic Recycle.** Public website: residential drop-off answers
and commercial technology recovery intake, for Arizona's East Valley.

Promise: *Old technology, handled clearly.*

## Read before doing anything

1. `EVER_WEBSITE_VISION.md` (repo root) - the source of truth for brand,
   narrative, motion, accessibility, performance, and copy voice. It outranks
   every agent's taste, including yours.
2. `docs/ORCHESTRATION.md` - who does what. Codex designs and plans, Claude Code
   builds, agy verifies the two against each other.
3. `docs/plans/` - the approved plan for the scene you are about to touch. No
   implementation starts without one.

## Hard rules

- **Never invent an operational fact.** Fees, hours, locations, service areas,
  certifications, insurance, downstream vendors, response times, turnaround,
  reviews, impact statistics, and equipment valuations are unknown until the
  operator supplies them. Placeholder facts that read as real are a blocking
  defect, not a TODO.
- **No unsupported claims.** No "certified", "100% secure", "zero landfill", or
  "highest value" until it is true and documentable.
- **No fake systems.** No live tracking, no invented inventory dashboards, no
  automated valuation, no certificates or reporting until those systems exist.
- **Accessibility is not a phase.** WCAG 2.2 AA contrast, full keyboard
  operation, visible focus, state never signalled by color alone,
  `prefers-reduced-motion` honored with final states preserved.
- **Respect the motion budget.** At most one primary narrative animation, one
  direct-input response, and one subtle ambient effect at a time. Every
  animation must orient, explain, confirm, or transition. Nothing loops forever.
- **No em dashes** in any copy or documentation.
- The page must still be compelling as a screenshot with all animation paused.

## Current state

- The vision document exists and is approved as direction.
- **Stack: Next.js 16.3.1 (App Router), React 19, TypeScript, CSS Modules.**
  No CSS framework, no motion library, and no webfont. Recorded in
  `docs/plans/hero-routing-junction.plan.md` under RECORDED DECISIONS.
- Built so far: design tokens, typography scale, 12-column grid, site header
  with progressively enhanced mobile navigation, footer, homepage hero with
  the routing junction, the residential acceptance finder, and a reusable
  city-page template driven by `src/data/service-areas.ts`.
- **Colors are the real brand palette**, read from the supplied logo, though
  from a raster rather than the vector source. The rule that falls out of
  measuring them: brand blue, cyan, and lime are too light to carry text or
  meaning on white (2.10:1 to 4.19:1), so each has a darker `ink` sibling.
  Brand color for identity, large fills, and the navy field; ink sibling for
  text, borders, focus, and meaningful strokes. See `src/styles/tokens.css`.
- **The logo asset file is still missing.** Drop it in `public/brand/`. Until
  then the wordmark is plain type and the hero junction is neutral fork
  geometry; neither imitates the `V`, which the vision forbids redrawing.
- **Almost no operational fact is confirmed.** See `src/data/verification.ts`:
  facts carry a status, and anything not verified does not render. Zero city
  pages are generated because no city has confirmed coverage.
- The agent scripts in `agents/` and the process in `docs/ORCHESTRATION.md` are
  live and verified.

## Checks

`npm run typecheck` and `npm run build` both pass. There is no test suite and
no linter configured yet; both are real gaps, not oversights to leave silent.

## Commands

```powershell
.\agents\codex-plan.ps1   -Scene "hero routing junction"        # Codex: design + plan
.\agents\agy-verify.ps1   -Plan docs\plans\<scene>.plan.md       # agy: verify code vs plan vs vision
.\agents\codex-review.ps1 -Plan docs\plans\<scene>.plan.md       # Codex: review the diff
.\agents\agy-scan.ps1     -Prompt "..."                          # agy: repo-wide question
```

Slash commands: `/xplan`, `/xverify`, `/xreview`.

Exit codes and triage grammar: `docs/ORCHESTRATION.md`.
