/**
 * IndexNow submission.
 *
 *   npm run indexnow            submit the URLs passed as arguments,
 *                               defaulting to the site root
 *   npm run indexnow:all        submit every URL in the live sitemap
 *
 * IndexNow tells participating engines (Bing, Yandex, Seznam, Naver, and
 * others sharing the endpoint) that a URL has changed. It does NOT index
 * anything. A 200 or 202 means the submission was accepted for processing,
 * nothing more; whether a page gets crawled or indexed is the engine's
 * decision and happens later, if at all.
 *
 * The key file must stay reachable at the declared keyLocation. Engines
 * fetch it to prove the submitter controls the host, so deleting
 * public/<key>.txt silently breaks every future submission.
 */

import { readFileSync } from "node:fs";
import { join } from "node:path";

const KEY = "40315e314ae95c33a9f29249c7a728b3";
const KEY_FILE = `${KEY}.txt`;
const ENDPOINT = "https://api.indexnow.org/indexnow";

/**
 * The canonical origin used for the sitemap and for the submitted URLs.
 * IndexNow rejects a batch whose URLs do not all belong to the declared
 * host, so this has to match what the sitemap actually emits rather than
 * what we would prefer it to be.
 */
const SITE = process.env.INDEXNOW_SITE ?? "https://electronicrecycle.net";

function fail(message) {
  console.error(`indexnow: ${message}`);
  process.exit(1);
}

/** Confirm the key file is present locally before asking anyone to fetch it. */
function assertKeyFilePresent() {
  const path = join(process.cwd(), "public", KEY_FILE);
  let contents;
  try {
    contents = readFileSync(path, "utf8");
  } catch {
    fail(`public/${KEY_FILE} is missing. Engines fetch it to verify ownership.`);
  }
  if (contents.trim() !== KEY) {
    fail(`public/${KEY_FILE} does not contain the key. Found: ${contents.trim().slice(0, 60)}`);
  }
}

async function urlsFromSitemap() {
  const sitemapUrl = `${SITE}/sitemap.xml`;
  const response = await fetch(sitemapUrl, { redirect: "follow" });
  if (!response.ok) fail(`${sitemapUrl} returned HTTP ${response.status}`);
  const xml = await response.text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  if (urls.length === 0) fail(`no <loc> entries found in ${sitemapUrl}`);
  return urls;
}

async function main() {
  assertKeyFilePresent();

  const args = process.argv.slice(2);
  const useSitemap = args.includes("--sitemap");
  const explicit = args.filter((a) => !a.startsWith("--"));

  const urls = useSitemap
    ? await urlsFromSitemap()
    : explicit.length > 0
      ? explicit
      : [SITE];

  // Every URL must share the declared host or IndexNow rejects the batch
  // wholesale with 422. Catching it here gives a usable error instead.
  const host = new URL(SITE).host;
  const foreign = urls.filter((u) => {
    try {
      return new URL(u).host !== host;
    } catch {
      return true;
    }
  });
  if (foreign.length > 0) {
    fail(
      `${foreign.length} URL(s) do not belong to ${host}, e.g. ${foreign[0]}. ` +
        `IndexNow would reject the whole batch.`,
    );
  }

  // The endpoint accepts up to 10,000 URLs per request.
  if (urls.length > 10000) fail(`${urls.length} URLs exceeds the 10,000 per-request limit.`);

  const payload = {
    host,
    key: KEY,
    keyLocation: `${SITE}/${KEY_FILE}`,
    urlList: urls,
  };

  console.log(`indexnow: submitting ${urls.length} URL(s) for ${host}`);
  console.log(`indexnow: keyLocation ${payload.keyLocation}`);

  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });

  const body = (await response.text()).trim();
  console.log(`indexnow: HTTP ${response.status} ${response.statusText}`);
  if (body) console.log(`indexnow: response body: ${body}`);

  // Documented meanings, so a failure explains itself rather than needing a
  // trip to the spec.
  const meaning = {
    200: "Accepted. The URLs were submitted; crawling and indexing remain the engine's decision.",
    202: "Accepted, key validation pending. The key file must stay reachable.",
    400: "Bad request. Malformed payload.",
    403: "Forbidden. The key was not valid for this host, or the key file could not be fetched.",
    422: "Unprocessable. URLs do not belong to the host, or the key does not match.",
    429: "Too many requests. Back off and retry later.",
  }[response.status];
  if (meaning) console.log(`indexnow: ${meaning}`);

  if (!response.ok) process.exit(1);
}

main().catch((error) => fail(error?.message ?? String(error)));
