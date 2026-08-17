/**
 * Public paths to brand artwork.
 *
 * Deliberately free of any Node import so client components can use these.
 *
 * There was briefly a companion module that checked whether each file existed
 * on disk, so a missing asset would fall back to text instead of rendering a
 * broken image. It is gone, and worth not reinventing: these pages are
 * statically prerendered, so the check ran at build time and froze into the
 * HTML, which produced a hydration mismatch when the asset landed afterwards.
 * Commit the artwork, then reference it.
 */

/** The parent ElectronicRecycle.net lockup, covering both markets. */
export const PARENT_LOGO_SRC = "/brand/electronic-recycle-logo.png";

/** Reversed lockup, for the navy footer field. Optional. */
export const PARENT_LOGO_REVERSED_SRC = "/brand/electronic-recycle-logo-reversed.png";
