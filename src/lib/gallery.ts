import { readdirSync } from "node:fs";
import { join } from "node:path";

/**
 * Reads whatever images are sitting in `public/gallery`. SERVER ONLY.
 *
 * The point is that nobody types filenames. Drop images in the folder and
 * they appear, in filename order, so prefixing with `01-`, `02-` controls the
 * sequence.
 *
 * Timing, worth knowing: pages that use this are statically prerendered, so
 * the folder is read at BUILD time in production. Adding an image means a
 * rebuild, which on Vercel is just a push. In development the server re-reads
 * on each request, so new files show up on refresh.
 *
 * Never import this from a client component: `node:fs` in a browser bundle is
 * a fatal build error. Read it in a server component and pass the result down.
 */

const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"];

export type GalleryImage = {
  /** Public URL, e.g. /gallery/01-truck.jpg */
  readonly src: string;
  /**
   * Alt text derived from the filename: `01-loading-dock.jpg` becomes
   * "Loading dock". Rename a file to improve its alt text.
   *
   * These are decorative supporting images, so a derived description is
   * honest about what it is. Anything load-bearing belongs in real copy, not
   * in an image caption.
   */
  readonly alt: string;
};

function altFromFilename(filename: string): string {
  const base = filename.replace(/\.[^.]+$/, "");
  const words = base
    // Drop a leading ordering prefix like "01-" or "3_".
    .replace(/^\d+[-_\s]*/, "")
    .replace(/[-_]+/g, " ")
    .trim();
  if (!words) return "EVER electronics recycling";
  return words.charAt(0).toUpperCase() + words.slice(1);
}

export function getGalleryImages(): readonly GalleryImage[] {
  try {
    const dir = join(process.cwd(), "public", "gallery");
    return readdirSync(dir)
      .filter((name) => IMAGE_EXTENSIONS.some((ext) => name.toLowerCase().endsWith(ext)))
      .sort((a, b) => a.localeCompare(b, "en", { numeric: true }))
      .map((name) => ({ src: `/gallery/${name}`, alt: altFromFilename(name) }));
  } catch {
    // Folder missing is the normal empty state, not an error.
    return [];
  }
}
