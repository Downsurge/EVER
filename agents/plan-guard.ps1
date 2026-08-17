# Shared plan validation for the two gates. ASCII-only file: PS 5.1 reads
# BOM-less scripts as ANSI, so smart punctuation corrupts parsing.
#
# Both agy-verify.ps1 and codex-review.ps1 check work against a plan, so both
# must agree on what counts as a plan they may check against. Duplicating the
# rules let them drift apart, which is how one gate ends up accepting a
# proposal the other would reject.
#
# A plan is usable by a gate only when ALL of these hold:
#   - it is a docs/plans/*.plan.md file in this repo,
#   - it has a '## Verification checklist' with at least one item,
#   - its HEADER (everything before the first '##' heading) carries a line
#     starting with APPROVED, recording the orchestrator's review,
#   - no line anywhere says NOT APPROVED, which always wins over an APPROVED
#     line elsewhere in the same file.
# See docs/plans/README.md for the approval convention.

function Resolve-ApprovedPlan {
  param(
    [Parameter(Mandatory = $true)][string]$Plan,
    [Parameter(Mandatory = $true)][string]$Repo
  )

  $planPath = if ([System.IO.Path]::IsPathRooted($Plan)) { $Plan } else { Join-Path $Repo $Plan }
  if (-not (Test-Path -LiteralPath $planPath)) { throw "-Plan '$Plan' not found - there is nothing to check against." }
  if (-not (Test-Path -LiteralPath $planPath -PathType Leaf)) { throw "-Plan '$Plan' is a directory, not a plan file." }

  # Must be inside the repo: the path is handed to the agent as a
  # repo-relative string, so an outside path becomes one that does not exist
  # and the agent silently checks against nothing.
  $planFull = (Resolve-Path -LiteralPath $planPath).Path
  $repoFull = [System.IO.Path]::GetFullPath($Repo)
  $sep = [System.IO.Path]::DirectorySeparatorChar
  if (-not $planFull.StartsWith($repoFull + $sep, [System.StringComparison]::OrdinalIgnoreCase)) {
    throw "-Plan must be inside the repo (resolved to: $planFull)."
  }
  $planRel = $planFull.Substring($repoFull.Length).TrimStart("\", "/").Replace("\", "/")

  # A containment check on the path string is not a containment check on the
  # bytes: a junction or symlink under docs/plans points somewhere else
  # entirely. Windows PowerShell 5.1 has no ResolveLinkTarget, so refuse
  # reparse points outright rather than pretend to follow them.
  $probe = $planFull
  while ($probe -and $probe.Length -ge $repoFull.Length) {
    $item = Get-Item -LiteralPath $probe -Force -ErrorAction SilentlyContinue
    if ($item -and ($item.Attributes -band [System.IO.FileAttributes]::ReparsePoint)) {
      throw "'$planRel' is, or sits under, a reparse point ($probe). Gates will not follow links out of the repo."
    }
    $probe = Split-Path -Parent $probe
  }

  # Plans live in docs/plans and are named *.plan.md. Accepting any qualifying
  # markdown file would let a gate check against some unrelated document that
  # happens to have a checklist, instead of the plan that governs the work.
  $plansDir = [System.IO.Path]::GetFullPath((Join-Path $Repo "docs\plans"))
  if (-not $planFull.StartsWith($plansDir + $sep, [System.StringComparison]::OrdinalIgnoreCase)) {
    throw "-Plan must be a plan in docs/plans (got: $planRel)."
  }
  if (-not $planFull.EndsWith(".plan.md", [System.StringComparison]::OrdinalIgnoreCase)) {
    throw "-Plan must name a *.plan.md file (got: $planRel)."
  }

  $lines = @(Get-Content -LiteralPath $planFull)

  # The header is everything before the first level-2 heading. Approval must
  # live there: accepting an APPROVED line from anywhere would let ordinary
  # body prose, or a quoted example, clear the gate.
  $headerEnd = $lines.Count
  for ($i = 0; $i -lt $lines.Count; $i++) {
    if ($lines[$i] -match "^##\s") { $headerEnd = $i; break }
  }
  $header = @($lines | Select-Object -First $headerEnd)

  if (@($lines) -match "^\s*NOT APPROVED\b") {
    throw "'$planRel' contains a 'NOT APPROVED' line, which overrides any APPROVED line in the same plan. Resolve the contradiction before checking against it."
  }
  # A 'BLOCKED ON OPERATOR' marker deliberately does NOT fail here. Review
  # round 12 argued it should, to stop premature implementation reaching a
  # gate. Overruled: the gates compare code to plan, and the most useful run
  # against a blocked plan is exactly the one that reports nothing was built
  # yet. Blocking would delete that check and would also make a plan
  # unverifiable while a single operator answer is outstanding. Premature
  # implementation is caught by the gate reporting drift, and by the human
  # reading this marker.
  # Approval must live INSIDE the generated header comment, not merely
  # somewhere above the first heading: a copied example in front matter or a
  # fenced snippet would otherwise clear both gates on an unreviewed plan.
  $headerText = ($header -join "`n")
  $comment = [regex]::Match($headerText, "(?s)<!--(.*?)-->")
  if (-not $comment.Success) {
    throw "'$planRel' has no header comment block, so it carries no recordable approval. See docs/plans/README.md."
  }
  $commentLines = @($comment.Groups[1].Value -split "`r?`n")
  # Require the documented shape: APPROVED <date> by <who>. A bare "APPROVED"
  # or an "APPROVED pending operator sign-off" line would otherwise clear both
  # gates while recording no accountable review.
  if (-not (@($commentLines) -match "^\s*APPROVED\s+\d{4}-\d{2}-\d{2}\s+by\s+\S")) {
    if (@($commentLines) -match "^\s*APPROVED\b") {
      throw "'$planRel' has an APPROVED line that is not in the required form 'APPROVED <YYYY-MM-DD> by <who>'. See docs/plans/README.md."
    }
    throw "'$planRel' carries no APPROVED line inside its header comment - it is still a proposal. Review it against EVER_WEBSITE_VISION.md and record approval there before checking against it (see docs/plans/README.md)."
  }
  # The approval must also say what was checked. A dated signature alone is a
  # rubber stamp, and a rubber stamp is what lets an unreviewed design walk
  # through both gates.
  # Anchored to the start of a line so that a negation such as
  # "Not checked against EVER_WEBSITE_VISION.md" cannot satisfy it.
  if (-not (($comment.Groups[1].Value) -match "(?im)^\s*Checked against\s+EVER_WEBSITE_VISION\.md\s*:\s*\S")) {
    throw "'$planRel' records approval without stating what was checked. The header comment must say 'Checked against EVER_WEBSITE_VISION.md: ...' and name what was reviewed. See docs/plans/README.md."
  }

  # Count Verification checklist items. Each one gets a CL number that the
  # verify gate requires a check line for.
  $inChecklist = $false
  $checklistCount = 0
  foreach ($line in $lines) {
    if ($line -match "^##\s+Verification checklist\s*$") { $inChecklist = $true; continue }
    if ($inChecklist -and $line -match "^##\s") { break }
    if ($inChecklist -and $line -match "^\s*(-|\*|\d+\.)\s+\S") { $checklistCount++ }
  }
  if ($checklistCount -lt 1) {
    throw "'$planRel' has no '## Verification checklist' items - that is not a plan a gate can check against."
  }

  # Count Build steps too: the verify gate requires evidence that they were
  # examined, not just that the checklist numbers were echoed.
  $inSteps = $false
  $buildStepCount = 0
  foreach ($line in $lines) {
    if ($line -match "^##\s+Build steps\s*$") { $inSteps = $true; continue }
    if ($inSteps -and $line -match "^##\s") { break }
    if ($inSteps -and $line -match "^\s*(-|\*|\d+\.)\s+\S") { $buildStepCount++ }
  }
  # Must be at least one. PowerShell's 1..0 counts DOWN to (1, 0), so a plan
  # with no build steps would make the verify gate demand checks for "BS1" and
  # "BS0" and fail with nonsense instead of rejecting the plan here.
  if ($buildStepCount -lt 1) {
    throw "'$planRel' has no '## Build steps' items - that is not a plan a gate can check against."
  }

  return [pscustomobject]@{
    Full           = $planFull
    Rel            = $planRel
    Lines          = $lines
    ChecklistCount = $checklistCount
    BuildStepCount = $buildStepCount
  }
}

# Count finding lines that carry a recognizable bucket but do NOT match the
# required grammar in full: things like "[FIX ] ..." or "[FIX] no dash here".
# Both the gates' counters and the human triager drop those silently, so a
# malformed finding beside a passing verdict would clear a gate with its
# warning thrown away. Callers fail closed when this returns more than zero.
# $Buckets is a regex alternation, e.g. "BLOCK|FIX" or "MISS|DRIFT|RISK".
function Get-MalformedFindingCount {
  param(
    [Parameter(Mandatory = $true)][AllowEmptyCollection()][string[]]$OutputLines,
    [Parameter(Mandatory = $true)][string]$Buckets,
    # Only the verify gate uses CL<n>/BS<n> tags. Review triage does not, so a
    # tagged review finding would pass the wrapper and then be discarded.
    [switch]$AllowTags
  )
  # Loose: anything that opens with a bracketed bucket, however spaced, and
  # including a markdown list marker. Without the list marker, an agent that
  # bulleted its findings would have every one silently dropped while its
  # verdict still cleared the gate.
  $loose = @(@($OutputLines) -match ("^\s*([-*+]\s+|\d+\.\s+)?\[\s*({0})\s*\]" -f $Buckets) | Select-Object -Unique).Count
  # Strict: bucket at the line start, the expected tag if this gate uses one,
  # then file:line, " - ", and the finding text. A line without file:line
  # cannot be acted on, so accepting it would just move the silent drop from
  # the gate to the triager.
  $tag = if ($AllowTags) { "((CL|BS)\d+\s+)?" } else { "" }
  $strict = @(@($OutputLines) -match ("^\[({0})\]\s+{1}\S+:\d+\s+-\s+\S" -f $Buckets, $tag) | Select-Object -Unique).Count
  return ($loose - $strict)
}

# The verdict must be the LAST nonblank line an agent printed. Accepting one
# from anywhere in stdout would let a run that emitted a clean verdict and then
# fell apart still clear a gate.
function Test-VerdictIsFinal {
  param(
    [Parameter(Mandatory = $true)][AllowEmptyCollection()][string[]]$OutputLines,
    [Parameter(Mandatory = $true)][string]$Pattern
  )
  $nonBlank = @(@($OutputLines) | Where-Object { $null -ne $_ -and $_.Trim() -ne "" })
  if ($nonBlank.Count -lt 1) { return $false }
  return ($nonBlank[$nonBlank.Count - 1] -match $Pattern)
}
