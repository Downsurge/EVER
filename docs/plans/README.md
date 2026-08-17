# Plans

One file per scene or page: `<scene-slug>.plan.md`.

Written by Codex through `agents/codex-plan.ps1`, then reviewed by Claude Code
against `EVER_WEBSITE_VISION.md` before any code is written. A plan in this
directory is a proposal until Claude has approved it in writing.

## Approval

Approval is a line inside the plan's header comment, in the form
`APPROVED <YYYY-MM-DD> by <who>`, followed by a `Checked against
EVER_WEBSITE_VISION.md:` statement naming what was reviewed. Both gates enforce
that shape, so a dated signature with no stated review is rejected: a rubber
stamp is exactly what would let an unreviewed design through. A `NOT APPROVED`
line anywhere overrides any approval. Record amendments the same way, with
`AMENDED`.

```
APPROVED 2026-08-15 by Claude Code (orchestrator). Checked against
EVER_WEBSITE_VISION.md: no invented operational facts, motion budget respected,
reduced-motion and keyboard paths specified, no state signalled by color alone.
```

Each plan carries a **Verification checklist**. That checklist is the input to
`agents/agy-verify.ps1`, so it must be specific enough that a reader with repo
access can mark every line true or false against the code. A vague checklist
produces a vague verdict, which is worse than no verification because it looks
like proof.

## Runtime evidence

agy reads code. It cannot run a browser, so it cannot confirm a screen-reader
announcement, contrast after the CSS cascade, reflow at 320px, frame rates under
CPU throttling, or what a paused screenshot communicates. A checklist item that
requires one of those must be tagged `(runtime evidence)`.

Tagged items are recorded by whoever ran the test, in a sibling file named
`<plan-slug>.evidence.md`, with the date, how it was tested, and the observed
result. `agy-verify.ps1` then confirms the record exists and names the check.

Be clear about what that buys: the gate verifies that an observation was
recorded, not that the behavior is correct. A human still has to look at the
running page. Untagged items are verified against the code itself and carry no
such caveat, so do not tag an item that code can actually prove.

When a plan is amended during implementation, amend the file. The verifier
checks the plan as written, so an out-of-date plan produces false drift.

Regenerating over an existing plan requires `-Force`. Approved plans are not
disposable.
