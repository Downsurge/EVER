import { existsSync } from "node:fs";
import { join } from "node:path";
import { PARENT_LOGO_REVERSED_SRC, PARENT_LOGO_SRC } from "./brand-paths";

/**
 * Presence checks for optional brand artwork. SERVER ONLY.
 *
 * Some brand files arrive after the code that uses them. Rather than ship a
 * broken image, gate on the file actually being there, checked on the server
 * at render/build time. Drop the asset in and it appears; there is no flag to
 * remember to flip, and no build failure while it is missing.
 *
 * Never import this from a client component. It reads the filesystem, and
 * `node:fs` in a browser bundle is a fatal build error. Client components
 * import the paths from `brand-paths.ts` and receive the boolean as a prop.
 */

function publicFileExists(publicPath: string): boolean {
  try {
    return existsSync(join(process.cwd(), "public", publicPath.replace(/^\//, "")));
  } catch {
    return false;
  }
}

export function hasParentLogo(): boolean {
  return publicFileExists(PARENT_LOGO_SRC);
}

export function hasParentLogoReversed(): boolean {
  return publicFileExists(PARENT_LOGO_REVERSED_SRC);
}
