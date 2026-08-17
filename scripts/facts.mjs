/**
 * Fact audit.
 *
 * Lists every operational fact in src/data by status, so nobody has to
 * remember which numbers are real. Run it before any launch:
 *
 *   npm run facts
 *
 * It reads the source text rather than importing the modules, because the
 * data files are TypeScript and this needs to run without a build step. That
 * makes it a reporting aid, not a gate: `agy-verify` and the review gates are
 * what actually block.
 */

import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const DATA_DIR = join(process.cwd(), "src", "data");
const STATUSES = ["verified", "operatorSupplied", "drafted", "placeholder"];

const found = Object.fromEntries(STATUSES.map((s) => [s, []]));

for (const file of readdirSync(DATA_DIR).filter((f) => f.endsWith(".ts"))) {
  const lines = readFileSync(join(DATA_DIR, file), "utf8").split(/\r?\n/);
  lines.forEach((line, i) => {
    for (const status of STATUSES) {
      // Match a call to the factory, not the import or the type definition.
      const re = new RegExp(`(^|[^A-Za-z])${status}\\s*\\(`);
      if (re.test(line) && !line.trimStart().startsWith("*") && !line.includes("import")) {
        found[status].push(`${file}:${i + 1}`);
      }
    }
  });
}

const label = {
  verified: "VERIFIED        confirmed by the operator, safe to publish",
  operatorSupplied: "OPERATOR-SUPPLIED  operator's own words, policy source still needed",
  drafted: "DRAFTED         written for the operator, NEEDS SIGN-OFF",
  placeholder: "PLACEHOLDER     never renders, waiting on a fact",
};

let exitCode = 0;
for (const status of STATUSES) {
  const hits = found[status];
  console.log(`\n${label[status]}  (${hits.length})`);
  for (const hit of hits) console.log(`  ${hit}`);
  if (status === "drafted" && hits.length > 0) exitCode = 0; // report, do not fail
}

console.log(
  `\n${found.drafted.length} drafted fact(s) need operator sign-off before launch.`,
);
console.log(
  `${found.placeholder.length} placeholder(s) are still withholding content from the site.\n`,
);

process.exit(exitCode);
