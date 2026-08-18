/**
 * Image slots.
 *
 * ONE place to point every photo on the site at whatever you want. Each slot
 * accepts either:
 *
 *   a local file   "/gallery/01-sorting-bench.jpg"   (put it in public/)
 *   a remote URL   "https://images.example.com/x.jpg"
 *
 * Remote URLs need their hostname allowed in next.config.ts under
 * images.remotePatterns, otherwise next/image refuses to load them. There is a
 * note there pointing back here.
 *
 * The slideshow on the landing page works differently by design: it reads
 * whatever is in public/gallery automatically, so you can drop files in
 * without editing code. Set `slideshow` below only if you would rather list
 * exact images or use remote URLs; leaving it empty keeps the folder
 * behaviour.
 */

export type ImageSlot = {
  /** Local path under public/, or a full https:// URL. */
  readonly src: string;
  /** Describe what is shown. Leave empty only for purely decorative images. */
  readonly alt: string;
};

/**
 * Landing page slideshow.
 *
 * Empty  -> read public/gallery automatically (the default).
 * Listed -> use exactly these, in this order, local or remote.
 */
export const slideshow: readonly ImageSlot[] = [
  // { src: "/gallery/01-sorting-bench.jpg", alt: "Sorting bench" },
  // { src: "https://your-cdn.com/ever/pickup.jpg", alt: "Loading a pickup" },
];

/**
 * Fixed slots elsewhere on the site. Each is currently a labelled placeholder
 * so the position is obvious in the page; replace the src and the alt.
 */
export const imageSlots = {
  /** Business page hero, four equipment tiles. */
  businessHero: [
    { src: "/brand/device-laptop.svg", alt: "Laptops" },
    { src: "/brand/device-server.svg", alt: "Servers and rack equipment" },
    { src: "/brand/device-network.svg", alt: "Networking equipment" },
    { src: "/brand/device-drives.svg", alt: "Hard drives" },
  ],
  /** Recycle page, beside the pickup panel. */
  recyclePickup: [
    { src: "/brand/device-monitor.svg", alt: "Monitors" },
    { src: "/brand/device-phone.svg", alt: "Phones and tablets" },
  ],
} as const satisfies Record<string, readonly ImageSlot[]>;

/** True when a slot points at another origin rather than public/. */
export function isRemote(src: string): boolean {
  return /^https?:\/\//i.test(src);
}
