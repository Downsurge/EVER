import Link from "next/link";
import type { MarketKey } from "@/data/markets";
import { markets, marketRoutes } from "@/data/markets";
import { RoutingJunction } from "./RoutingJunction";
import { TrackedLink } from "./TrackedLink";
import styles from "./Hero.module.css";

function Arrow() {
  return <svg viewBox="0 0 24 24" width="22" height="22" focusable="false" aria-hidden="true"><path d="M4 12h14m-5-6 6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export function Hero({ market }: { market: MarketKey }) {
  const cfg = markets[market];
  const routes = marketRoutes(market);
  return (
    <section className={`${styles.hero} everHero`} aria-labelledby="hero-heading">
      <div className={styles.topGlow} aria-hidden="true" />
      <div className={`ever-shell ${styles.grid}`}>
        <div className={styles.editorial}>
          <p className="ever-eyebrow">{cfg.brandShort} · {cfg.marketLabel}</p>
          <h1 id="hero-heading" className={`ever-display ${styles.headline}`}>
            {/* Trailing space inside the first span, not between the tags.
                Adjacent block spans contribute no whitespace to the accessible
                name, so this announced as "OLD TECH?WE'LL TAKE IT." with the
                words run together. */}
            <span>OLD TECH? </span><span className={styles.accentLine}>WE&apos;LL TAKE IT.</span>
          </h1>
          <p className={`ever-lede ${styles.support}`}>{cfg.support}</p>
          <div className={styles.choices} aria-label={`Choose how ${cfg.brandShort} can help`}>
            <TrackedLink href={routes.residential} event="path_selected" props={{ market, path: "residential" }} className={`${styles.choice} everChoiceResidential`}>
              <span className={styles.choiceTop}>Residential</span><span className={styles.choiceLabel}>I have a few items</span><span className={styles.choiceMeta}>Check an item and see the next step</span><span className={styles.choiceCue}><Arrow /></span>
            </TrackedLink>
            <TrackedLink href={routes.business} event="path_selected" props={{ market, path: "business" }} className={`${styles.choice} ${styles.choiceBusiness} everChoiceBusiness`}>
              <span className={styles.choiceTop}>Business</span><span className={styles.choiceLabel}>I represent a business</span><span className={styles.choiceMeta}>Build a pickup brief and upload photos or an inventory list</span><span className={styles.choiceCue}><Arrow /></span>
            </TrackedLink>
          </div>
          <ul className={styles.trustLine} aria-label={`${cfg.brandShort} highlights`}>
            <li><span className={styles.trustDot} aria-hidden="true" />{cfg.regionShort}</li>
            <li><span className={styles.trustDot} aria-hidden="true" />Business pickup available</li>
            <li><span className={styles.trustStar} aria-hidden="true">★</span>Veteran owned &amp; operated</li>
          </ul>
        </div>
        <div className={styles.visual}><RoutingJunction /></div>
      </div>
    </section>
  );
}
