import type { NextRequest } from "next/server";

/**
 * Per-IP rate limiting for the lead forms.
 *
 * HONEST LIMITATION, read before relying on this. State lives in the memory of
 * one serverless instance. Vercel runs several, and recycles them, so a
 * determined flood spread across instances will get more through than the
 * numbers below suggest, and counters reset on a cold start.
 *
 * It is still worth having: the ordinary case is one script hammering one
 * endpoint, which lands on a warm instance and gets stopped. Treat this as a
 * cost-control and noise filter, not a security boundary.
 *
 * To make it strict, swap the Map for a shared store (Vercel KV or Upstash
 * Redis) and keep the same `check` signature; nothing else has to change.
 */

type Hit = { count: number; first: number };

const WINDOWS = [
  /** Burst: stops a script submitting repeatedly in one sitting. */
  { label: "burst", ms: 10 * 60 * 1000, max: 3 },
  /** Daily: stops a slow drip from one address. */
  { label: "daily", ms: 24 * 60 * 60 * 1000, max: 12 },
] as const;

const buckets = new Map<string, Hit>();

/** Drop expired entries so the map cannot grow without bound. */
function sweep(now: number): void {
  const longest = Math.max(...WINDOWS.map((w) => w.ms));
  for (const [key, hit] of buckets) {
    if (now - hit.first > longest) buckets.delete(key);
  }
}

/**
 * The caller's IP.
 *
 * Behind Vercel the socket address is a proxy, so the real client is the FIRST
 * entry of x-forwarded-for. Later entries are proxies and are trivially
 * spoofable by the client, so only the first is used.
 */
export function clientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

export type RateVerdict = { ok: true } | { ok: false; retryAfterSeconds: number };

/**
 * Record an attempt and say whether it is allowed.
 *
 * `scope` keeps separate counters per form, so someone who used the contact
 * form is not blocked from sending a pickup request.
 */
export function check(ip: string, scope: string): RateVerdict {
  const now = Date.now();
  sweep(now);

  for (const window of WINDOWS) {
    const key = `${scope}:${window.label}:${ip}`;
    const hit = buckets.get(key);

    if (!hit || now - hit.first > window.ms) {
      buckets.set(key, { count: 1, first: now });
      continue;
    }

    if (hit.count >= window.max) {
      return {
        ok: false,
        retryAfterSeconds: Math.max(1, Math.ceil((window.ms - (now - hit.first)) / 1000)),
      };
    }

    hit.count += 1;
  }

  return { ok: true };
}

/** A 429 with the header clients and crawlers actually respect. */
export function tooManyRequests(retryAfterSeconds: number): Response {
  return Response.json(
    {
      error:
        "That is a lot of messages from one connection. Please wait a little while, or call us instead.",
    },
    { status: 429, headers: { "Retry-After": String(retryAfterSeconds) } },
  );
}
