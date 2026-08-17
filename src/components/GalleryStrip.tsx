"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { GalleryImage } from "@/lib/gallery";
import styles from "./GalleryStrip.module.css";

/**
 * A slideshow strip. Advances on its own, and stays polite about it.
 *
 * EVER_WEBSITE_VISION.md rules out decoration that loops forever, so this is
 * bounded on every side that matters:
 *   - it stops permanently the moment the visitor scrolls, drags or uses the
 *     buttons, because they have taken over and it should get out of the way,
 *   - it pauses on hover and on keyboard focus anywhere inside,
 *   - it pauses when the tab is hidden, rather than animating to nobody,
 *   - it does not run at all under prefers-reduced-motion,
 *   - it never runs when everything already fits on screen.
 *
 * Renders nothing at all when the folder is empty, rather than showing an
 * empty frame.
 */
const ADVANCE_MS = 4500;
export function GalleryStrip({ images }: { images: readonly GalleryImage[] }) {
  const trackRef = useRef<HTMLUListElement>(null);
  // Few enough images to fit on screen means the arrows have nothing to do.
  // Controls that visibly do nothing when clicked are worse than no controls,
  // so they are disabled until the track actually overflows. Recomputed on
  // resize, because a narrower window can make the same set scrollable.
  const [canScroll, setCanScroll] = useState(false);

  // Set once the visitor takes control. Never unset: having the slideshow
  // resume under someone who is reading is worse than it never starting.
  const [surrendered, setSurrendered] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => setCanScroll(track.scrollWidth > track.clientWidth + 1);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    return () => observer.disconnect();
  }, [images.length]);

  // Pause while the tab is in the background.
  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    if (!canScroll || surrendered || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const track = trackRef.current;
    if (!track) return;

    const id = window.setInterval(() => {
      const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
      track.scrollTo({
        left: atEnd ? 0 : track.scrollLeft + track.clientWidth * 0.8,
        behavior: "smooth",
      });
    }, ADVANCE_MS);

    return () => window.clearInterval(id);
  }, [canScroll, surrendered, paused]);

  if (images.length === 0) return null;

  const scrollBy = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    setSurrendered(true);
    // One "page" is roughly the visible width, so a click advances a screenful
    // rather than a fixed pixel count that would be wrong on other viewports.
    track.scrollBy({ left: direction * track.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <section
      className={styles.strip}
      aria-labelledby="gallery-heading"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
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
        // Any manual scroll, including a drag or a wheel, hands control over.
        onPointerDown={() => setSurrendered(true)}
        onWheel={() => setSurrendered(true)}
        onKeyDown={() => setSurrendered(true)}
      >
        {images.map((image) => (
          <li key={image.src} className={styles.item}>
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 64em) 22rem, 70vw"
              className={styles.image}
              data-fit={image.fit}
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
