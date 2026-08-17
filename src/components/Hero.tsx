import Link from "next/link";
import { brand, heroTrustLine, routes } from "@/data/site";
import { isPublishable } from "@/data/verification";
import { RoutingJunction } from "./RoutingJunction";
import styles from "./Hero.module.css";

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" focusable="false" aria-hidden="true">
      <path d="M4 12h14m-5-6 6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Hero() {
  const headline = brand.headline.value;

  return (
    <section className={`${styles.hero} everHero`} aria-labelledby="hero-heading">
      <div className={styles.topGlow} aria-hidden="true" />
      <div className={`ever-shell ${styles.grid}`}>
        <div className={styles.editorial}>
          <p className={styles.seoEyebrow}>Electronic Recycling &amp; E-Waste Pickup in Arizona</p>
          <h1 id="hero-heading" className={`ever-display ${styles.headline}`}>
            <span>{headline.line1}</span>
            <span className={styles.accentLine}>{headline.line2}</span>
          </h1>
          <p className={`ever-lede ${styles.support}`}>{brand.support.value}</p>

          <div className={styles.choices} aria-label="Choose how EVER can help">
            <Link href={routes.residential} className={`${styles.choice} everChoiceResidential`}>
              <span className={styles.choiceTop}>Residential</span>
              <span className={styles.choiceLabel}>I have a few items</span>
              <span className={styles.choiceMeta}>Free drop-off for most items or distance-based pickup</span>
              <span className={styles.choiceCue}><Arrow /></span>
            </Link>

            <Link href={routes.business} className={`${styles.choice} ${styles.choiceBusiness} everChoiceBusiness`}>
              <span className={styles.choiceTop}>Business</span>
              <span className={styles.choiceLabel}>I represent a business</span>
              <span className={styles.choiceMeta}>Free pickup with 10 qualifying items</span>
              <span className={styles.choiceCue}><Arrow /></span>
            </Link>
          </div>

          {isPublishable(heroTrustLine) ? (
            <ul className={styles.trustLine} aria-label="EVER highlights">
              {heroTrustLine.value.map((item, index) => (
                <li key={item}>
                  <span className={index === 2 ? styles.trustStar : styles.trustDot} aria-hidden="true">{index === 2 ? "★" : ""}</span>
                  {item}
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className={styles.visual}>
          <RoutingJunction />
        </div>
      </div>
    </section>
  );
}
