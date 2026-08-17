"use client";
import { trackEvent } from "@/lib/analytics";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import type { MarketKey } from "@/data/markets";
import { markets, marketRoutes } from "@/data/markets";
import { persistentBusinessAction, publishedNav } from "@/data/navigation";
import { Wordmark } from "./Wordmark";
import styles from "./SiteHeader.module.css";

export function SiteHeader({ market }: { market: MarketKey }) {
  const [enhanced, setEnhanced] = useState(false);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const cfg = markets[market];
  const routes = marketRoutes(market);
  const items = publishedNav(market);
  const action = persistentBusinessAction(market);

  useEffect(() => setEnhanced(true), []);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const query = window.matchMedia("(min-width: 64em)");
    const onChange = (event: MediaQueryListEvent | MediaQueryList) => { if (event.matches) setOpen(false); };
    onChange(query);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); toggleRef.current?.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={`${styles.header} ${scrolled || !enhanced ? styles.scrolled : ""}`} data-open={open ? "true" : "false"}>
      <div className={`ever-shell ${styles.bar}`}>
        <Link href={routes.home} className={styles.brand} aria-label={`${cfg.brandShort} home`}><Wordmark market={market} /></Link>
        {enhanced && items.length > 0 ? (
          <button ref={toggleRef} type="button" className={styles.toggle} aria-expanded={open} aria-controls={navId} onClick={() => setOpen((value) => !value)}>
            <span className={styles.toggleIcon} aria-hidden="true">
              {open ? <svg viewBox="0 0 20 20" width="20" height="20"><path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" fill="none" /></svg> : <svg viewBox="0 0 20 20" width="20" height="20"><path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" fill="none" /></svg>}
            </span>
            {open ? "Close menu" : "Menu"}
          </button>
        ) : null}
        <nav id={navId} className={styles.nav} aria-label="Primary" data-enhanced={enhanced ? "true" : "false"} data-open={open ? "true" : "false"}>
          <ul className={styles.navList}>
            {items.map((item) => {
              const current = pathname === item.href;
              return <li key={item.href}><Link href={item.href} className={styles.navLink} aria-current={current ? "page" : undefined}>{item.label}</Link></li>;
            })}
          </ul>
          <Link className={styles.locationSwitch} href="/" title="Change location">{cfg.stateAbbr} ▾</Link>
          {cfg.phone ? <a className={styles.phone} href={`tel:${cfg.phone}`} onClick={() => trackEvent("contact_click", { market, method: "phone", location: "header" })}>{cfg.phone}</a> : null}
          {action.published ? <Link href={action.href} className={styles.action} onClick={() => trackEvent("cta_click", { market, cta: "plan_a_pickup", location: "header" })}>{action.label}</Link> : null}
        </nav>
      </div>
    </header>
  );
}
