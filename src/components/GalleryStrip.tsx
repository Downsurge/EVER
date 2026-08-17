"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { GalleryImage } from "@/lib/gallery";
import styles from "./GalleryStrip.module.css";

/**
 * A horizontal strip of photos, scrolled by the visitor.
 *
 * Deliberately NOT an auto-playing carousel. EVER_WEBSITE_VISION.md rules out
 * indefinitely looping decoration, and an auto-advancing slider takes control
 * away from someone still reading. This scrolls on drag, wheel, arrow keys,
 * and the two buttons, snapping to each image.
 *
 * Renders nothing at all when the folder is empty, rather than showing an
 * empty frame.
 */
export function GalleryStrip({ images }: { images: readonly GalleryImage[] }) {
  const trackRef = useRef<HTMLUListElement>(null);
  // Few enough images to fit on screen means the arrows have nothing to do.
  // Controls that visibly do nothing when clicked are worse than no controls,
  // so they are disabled until the track actually overflows. Recomputed on
  // resize, because a narrower window can make the same set scrollable.
  const [canScroll, setCanScroll] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => setCanScroll(track.scrollWidth > track.clientWidth + 1);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    return () => observer.disconnect();
  }, [images.length]);

  if (images.length === 0) return null;

  const scrollBy = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    // One "page" is roughly the visible width, so a click advances a screenful
    // rather than a fixed pixel count that would be wrong on other viewports.
    track.scrollBy({ left: direction * track.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <section className={styles.strip} aria-labelledby="gallery-heading">
      <div className={styles.head}>
        <h2 id="gallery-heading" className={styles.heading}>
          Around the operation
        </h2>
        {canScroll ? (
          <div className={styles.controls}>
            <button
              type="button"
              className={styles.control}
              onClick={() => scrollBy(-1)}
              aria-label="Scroll images backward"
            >
              <Chevron dir="left" />
            </button>
            <button
              type="button"
              className={styles.control}
              onClick={() => scrollBy(1)}
              aria-label="Scroll images forward"
            >
              <Chevron dir="right" />
            </button>
          </div>
        ) : null}
      </div>

      {/* A scrollable region needs to be reachable and operable by keyboard,
          hence tabIndex and the group role. Arrow keys scroll it natively. */}
      <ul
        ref={trackRef}
        className={styles.track}
        tabIndex={0}
        role="group"
        aria-label="Photo strip, scrollable"
      >
        {images.map((image) => (
          <li key={image.src} className={styles.item}>
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 64em) 22rem, 70vw"
              className={styles.image}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
      <path
        d={dir === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
