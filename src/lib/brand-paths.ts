/**
 * Public paths to optional brand artwork.
 *
 * Deliberately free of any Node import so client components can use these.
 * The filesystem presence checks live in `brand-assets.ts`, which is
 * server-only: importing that from a client component pulls `node:fs` into
 * the browser bundle and fails the build outright.
 */

/** The parent ElectronicRecycle.net lockup, covering both markets. */
export const PARENT_LOGO_SRC = "/brand/electronic-recycle-logo.png";

/** Reversed lockup, for the navy footer field. Optional. */
export const PARENT_LOGO_REVERSED_SRC = "/brand/electronic-recycle-logo-reversed.png";
