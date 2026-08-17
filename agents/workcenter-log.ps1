# Run-log telemetry for the non-Claude agents. ASCII-only file: PS 5.1 reads
# BOM-less scripts as ANSI, so smart punctuation corrupts parsing.
#
# Codex and agy have no transcript store of their own, so the wrappers append
# NDJSON to .workcenter/agents/<runId>.jsonl. One line per fact the wrapper
# actually observes - launch, the command template with the prompt redacted,
# the clipped request it was given, files it was pointed at, exit code,
# verdict. Full prompts are never stored. Nothing is inferred or invented.
#
# Same schema as the Homeful repo's logger on purpose: if EVER ever grows an
# Agent Workcenter view, these files are already readable by it. Today there is
# no viewer here - read the .jsonl files directly.
#
# Logging must never break a run: every write is best-effort.

function New-WorkcenterRunId {
  param([Parameter(Mandatory = $true)][string]$Agent)
  return ("{0}-{1}-{2}" -f $Agent, (Get-Date -Format "yyyyMMdd-HHmmss"), $PID)
}

function Write-WorkcenterEvent {
  param(
    [Parameter(Mandatory = $true)][string]$RunId,
    [Parameter(Mandatory = $true)][string]$Agent,
    [Parameter(Mandatory = $true)][string]$Repo,
    [Parameter(Mandatory = $true)][ValidateSet("started", "file", "message", "blocker", "completed", "stopped")][string]$Event,
    [string]$Role = "",
    [string]$Detail = "",
    [string]$Command = "",
    [string]$File = "",
    [string]$Verdict = "",
    [Nullable[bool]]$Ok = $null,
    [Nullable[int]]$ExitCode = $null
  )

  try {
    $dir = Join-Path $Repo ".workcenter\agents"
    if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Force -Path $dir | Out-Null }
    # NOTE: must not be called $file - PowerShell variable names are
    # case-insensitive, so it would overwrite the -File parameter.
    $logPath = Join-Path $dir ("{0}.jsonl" -f $RunId)

    # Cap free text so a runaway tool output cannot bloat the log.
    $clip = {
      param($s, $n)
      if ($null -eq $s) { return "" }
      $s = [string]$s
      if ($s.Length -gt $n) { return $s.Substring(0, $n) }
      return $s
    }

    $record = [ordered]@{
      ts    = (Get-Date).ToUniversalTime().ToString("o")
      runId = $RunId
      agent = $Agent
      event = $Event
      cwd   = $Repo
    }
    if ($Role) { $record.role = $Role }
    if ($Detail) { $record.detail = (& $clip $Detail 4000) }
    if ($Command) { $record.command = (& $clip $Command 1000) }
    if ($File) { $record.file = (& $clip $File 400) }
    if ($Verdict) { $record.verdict = (& $clip $Verdict 400) }
    if ($null -ne $Ok) { $record.ok = [bool]$Ok }
    if ($null -ne $ExitCode) { $record.exitCode = [int]$ExitCode }

    $json = ($record | ConvertTo-Json -Compress -Depth 4)
    # UTF8 without BOM, append one line.
    $stream = New-Object System.IO.StreamWriter($logPath, $true, (New-Object System.Text.UTF8Encoding($false)))
    try { $stream.WriteLine($json) } finally { $stream.Dispose() }
  } catch {
    Write-Verbose ("run log write failed: {0}" -f $_.Exception.Message)
  }
}
