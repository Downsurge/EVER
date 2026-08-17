/**
 * Outlined equipment icons.
 *
 * One set, drawn to a shared 24-unit grid with a single stroke weight, so the
 * categories read as a family rather than as clip art from three sources. The
 * vision bans mixing icon styles and using emoji as production icons.
 *
 * All strokes are `currentColor`, so an icon inherits whatever the surrounding
 * state has set: navy at rest, cyan when its category is current. They are
 * decorative in every current usage, because the category name sits next to
 * them, so callers pass `aria-hidden`.
 */

import type { IconKey } from "@/data/accepted-items";

const paths: Record<IconKey, React.ReactNode> = {
  laptop: (
    <>
      <rect x="4" y="5" width="16" height="10" rx="1" />
      <path d="M2 18h20M10 15h4" />
    </>
  ),
  desktop: (
    <>
      <rect x="5" y="3" width="9" height="18" rx="1" />
      <path d="M17 8h3M17 12h3M8 7h3M8 17.5h3" />
    </>
  ),
  server: (
    <>
      <rect x="3" y="4" width="18" height="6" rx="1" />
      <rect x="3" y="14" width="18" height="6" rx="1" />
      <path d="M6.5 7h.01M6.5 17h.01M10 7h4M10 17h4" />
    </>
  ),
  network: (
    <>
      <rect x="3" y="13" width="18" height="7" rx="1" />
      <path d="M7 16.5h.01M10.5 16.5h.01M14 16.5h.01M12 13V8m-5 5V9.5m10 3.5V9.5" />
      <path d="M12 4v2" />
    </>
  ),
  component: (
    <>
      <rect x="7" y="7" width="10" height="10" rx="1" />
      <path d="M10 7V4m4 3V4m-4 16v-3m4 3v-3M7 10H4m3 4H4m16-4h-3m3 4h-3" />
    </>
  ),
  drive: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="1" />
      <circle cx="12" cy="12" r="3" />
      <path d="M17.5 15.5h.01" />
    </>
  ),
  phone: (
    <>
      <rect x="7" y="2.5" width="10" height="19" rx="2" />
      <path d="M10.5 5.5h3M11 18.5h2" />
    </>
  ),
  monitor: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="1" />
      <path d="M9 20h6M12 16v4" />
    </>
  ),
  tv: (
    <>
      <rect x="2.5" y="5" width="19" height="12" rx="1" />
      <path d="M8 20l4-3 4 3" />
    </>
  ),
  crt: (
    <>
      <path d="M4 6h16v11H4z" />
      <path d="M6.5 20h11M9 17v3m6-3v3" />
      <path d="M6.5 8.5c3.5-1 7.5-1 11 0v6c-3.5 1-7.5 1-11 0z" />
    </>
  ),
  printer: (
    <>
      <path d="M7 9V3.5h10V9" />
      <rect x="3" y="9" width="18" height="7" rx="1" />
      <path d="M7 16h10v4.5H7z" />
    </>
  ),
  console: (
    <>
      <path d="M8.5 8h7a5.5 5.5 0 0 1 5.5 5.5v.5a3 3 0 0 1-5.4 1.8L15 15H9l-.6.8A3 3 0 0 1 3 14v-.5A5.5 5.5 0 0 1 8.5 8z" />
      <path d="M7 11.5v2M6 12.5h2M16 12h.01M18 13.5h.01" />
    </>
  ),
  cable: (
    <>
      <path d="M4 20c0-4 6-3 6-7s6-3 6-7" />
      <path d="M2.5 20h3M14 4.5h4v3h-4z" />
    </>
  ),
  power: (
    <>
      <rect x="3" y="7" width="18" height="10" rx="1" />
      <path d="M12 10v4M7 12h.01M17 12h.01" />
    </>
  ),
  battery: (
    <>
      <rect x="3" y="8" width="16" height="8" rx="1.5" />
      <path d="M21 11v2M7 12h5" />
    </>
  ),
  camera: (
    <>
      <path d="M3 8h4l1.5-2.5h7L17 8h4v11H3z" />
      <circle cx="12" cy="13" r="3.5" />
    </>
  ),
  audio: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="1.5" />
      <circle cx="12" cy="14" r="3.5" />
      <path d="M9 6.5h6" />
    </>
  ),
  appliance: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="1.5" />
      <circle cx="12" cy="13" r="4" />
      <path d="M8.5 6.5h7" />
    </>
  ),
};

export function ItemIcon({
  icon,
  size = 28,
  className,
}: {
  icon: IconKey;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paths[icon]}
    </svg>
  );
}
