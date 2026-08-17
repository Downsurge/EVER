# Runtime evidence: hero routing junction

Records observations that only exist in a running page, for the checklist
items tagged `(runtime evidence)` in `hero-routing-junction.plan.md`.

Rule for this file: record what was actually observed, by whom, how, and what
the result was. An item with no entry here is not verified. Do not pre-fill
entries for tests that have not been run.

Environment unless stated otherwise: Chromium via the in-app browser, Next
16.3.1 dev server on port 3400, 2026-08-15.

**Important environment note:** this browser reports
`prefers-reduced-motion: reduce`. Every observation below was therefore made
in the reduced-motion state. That makes the reduced-motion evidence strong and
means the animated path could not be observed here at all.

---

## Keyboard focus is visible at all supported breakpoints

**Status: PASS (partial coverage).** Observed 2026-08-15 by Claude Code.

Method: tabbed to each hero choice and read the computed `outline-color` and
`outline-width` of `document.activeElement`.

Result: focus indicator computes to `rgb(15, 79, 196)` at `3px` with a 3px
offset on both hero choices. That is the blue token, measured at 7.15:1
against white, above the 3:1 the plan requires. Verified at 1440x900 and
375x812.

Not covered: 320px and 200% zoom were checked for reflow and clipping, not
for focus ring visibility specifically.

## Screen reader announcement order

**Status: NOT TESTED.** No screen reader was run.

What is known from the accessibility tree only: the landmark order is skip
link, banner, main, contentinfo; the hero exposes one `h1` whose accessible
name is "OLD TECH? WE'LL TAKE IT."; the residential choice precedes the
business choice. The route graphic is absent from the tree.

That is a DOM inspection, not an announcement test. A real pass needs NVDA,
JAWS, or VoiceOver driven by a person.

## Route and state animation under CPU throttling

**Status: NOT TESTED, and not testable in this environment.**

The browser reports `prefers-reduced-motion: reduce`, so the one-time route
draw never ran and no frame timing could be observed. This needs a normal
motion environment plus a throttled CPU profile.

## WCAG 2.2 AA contrast on the rendered page

**Status: PARTIAL.** Computed 2026-08-15 by Claude Code.

Method: contrast ratios computed from the token values in `tokens.css` using
the WCAG relative luminance formula, not sampled from rendered pixels.

Results against the white canvas: navy 17.37:1, navy-body 14.14:1,
navy-muted 6.74:1, blue 7.15:1, cyan-route 4.22:1, cyan-ink 6.31:1,
lime-ink 5.89:1. White on navy 17.37:1. Navy on lime 11.52:1.

Two values were found to FAIL the 3:1 minimum and are therefore restricted in
the tokens file: bright cyan at 2.46:1 and lime at 1.51:1. Neither carries
text or meaning; lime is used only as a fill behind navy, and the route
stroke uses cyan-route.

Not covered: these are token-level computations. Contrast of text over any
future photograph, and of any color that arrives with the real brand package,
is unverified. The provisional palette will be replaced wholesale.

## Reflow at 320 CSS pixels

**Status: PASS.** Observed 2026-08-15 by Claude Code.

Method: viewport set to 320x720, homepage loaded, every element in header,
main, and footer measured for overflow past the viewport edge.

Result: `document.scrollWidth` equals 320, no horizontal scrolling, zero
clipped or overflowing elements. The headline scales to 44px and fits in
288px.

Not covered: 200% text zoom was not separately exercised.

## Paused desktop and mobile screenshots

**Status: NOT CAPTURED.**

The screenshot tool requires the Browser pane to be displayed, and it was not
available during this session. Layout was verified by measuring computed
geometry instead, which is recorded in the build report, but that is not a
substitute for looking at the page.
