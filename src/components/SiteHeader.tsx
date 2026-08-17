"use client";

/**
 * Site header with progressively enhanced mobile navigation.
 *
 * Built to docs/plans/site-shell-header-mobile-navigation-and-footer.plan.md.
 *
 * Progressive enhancement is the load-bearing idea here:
 *   - The server renders one navigation list, expanded, with no toggle.
 *   - Once mounted, the toggle appears and the list becomes a disclosure.
 * So with JavaScript unavailable the navigation is fully usable rather than
 * collapsed behind a control that cannot work. There is a single copy of the
 * navigation markup; the presentations differ by CSS, not by duplication.
 *
 * The panel is a disclosure, not a modal: focus is not trapped, and opening
 * it leaves focus on the toggle so the next Tab reaches the first link.
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { Wordmark } from "./Wordmark";
import { persistentBusinessAction, publishedNav } from "@/data/navigation";
import { contact } from "@/data/site";
import styles from "./SiteHeader.module.css";

export function SiteHeader() {
  const [enhanced, setEnhanced] = useState(false);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const items = publishedNav();

  // The toggle only exists once the client can actually operate it.
  useEffect(() => setEnhanced(true), []);

  // Close on route change, so the panel never survives a navigation.
  useEffect(() => setOpen(false), [pathname]);

  // A viewport change to the desktop arrangement must clear stale expanded
  // state, or returning to mobile restores a panel the user never opened.
  useEffect(() => {
    const query = window.matchMedia("(min-width: 64em)");
    const onChange = (event: MediaQueryListEvent | MediaQueryList) => {
      if (event.matches) setOpen(false);
    };
    onChange(query);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  // Header scrolled state. Defaults to the solid surface if this never runs,
  // which is the safe direction: the divider is always legible.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape closes and returns focus to the toggle.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`${styles.header} ${scrolled || !enhanced ? styles.scrolled : ""}`}
      data-open={open ? "true" : "false"}
    >
      <div className={`ever-shell ${styles.bar}`}>
        <Link href="/" className={styles.brand} aria-label="EVER home">
          <Wordmark />
        </Link>

        {enhanced && items.length > 0 ? (
          <button
            ref={toggleRef}
            type="button"
            className={styles.toggle}
            aria-expanded={open}
            aria-controls={navId}
            onClick={() => setOpen((value) => !value)}
          >
            <span className={styles.toggleIcon} aria-hidden="true">
              {open ? (
                <svg viewBox="0 0 20 20" width="20" height="20" focusable="false">
                  <path
                    d="M4 4l12 12M16 4L4 16"
                    stroke="currentColor"
                    strokeWidth="2.25"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              ) : (
                <svg viewBox="0 0 20 20" width="20" height="20" focusable="false">
                  <path
                    d="M3 5h14M3 10h14M3 15h14"
                    stroke="currentColor"
                    strokeWidth="2.25"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              )}
            </span>
            {open ? "Close menu" : "Menu"}
          </button>
        ) : null}

        <nav
          id={navId}
          className={styles.nav}
          aria-label="Primary"
          data-enhanced={enhanced ? "true" : "false"}
          data-open={open ? "true" : "false"}
        >
          <ul className={styles.navList}>
            {items.map((item) => {
              const current = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={styles.navLink}
                    aria-current={current ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <a className={styles.phone} href={`tel:${contact.phone.value}`}>
            {contact.phone.value}
          </a>

          {persistentBusinessAction.published ? (
            <Link href={persistentBusinessAction.href} className={styles.action}>
              {persistentBusinessAction.label}
            </Link>
          ) : null}
        </nav>
      </div>
    </header>
  );
}
