"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PARENT_LOGO_SRC } from "@/lib/brand-paths";
import styles from "./selector.module.css";

const choices = [
  { key: "az", brand: "EVER", name: "East Valley Electronic Recycle", title: "Phoenix & East Valley", state: "Arizona", cities: "Gilbert · Mesa · Chandler · Queen Creek · Tempe · Phoenix · San Tan Valley · Florence" },
  { key: "tx", brand: "EPER", name: "El Paso Electronic Recycle", title: "El Paso", state: "Texas", cities: "El Paso · West Texas" },
] as const;

export function MarketSelector() {
  const [last, setLast] = useState<string | null>(null);
  useEffect(() => setLast(window.localStorage.getItem("electronicRecycleMarket")), []);
  function remember(key: string) { window.localStorage.setItem("electronicRecycleMarket", key); }
  return <main id="main" className={styles.page}>
    <div className={styles.glow} aria-hidden="true" />
    <div className={styles.shell}>
      {/* The parent lockup already reads "ARIZONA - TEXAS", so it replaces
          the text brand rather than sitting next to it. `fill` avoids
          hardcoding pixel dimensions for an asset that may be re-exported.

          Rendered unconditionally. An earlier version gated this on a
          server-side fs check for the asset, which caused a hydration
          mismatch: the page is statically prerendered, so the HTML was
          generated while the file was still missing and showed the text
          fallback, while the client rendered the image. The file is in the
          repo now, so there is nothing to guard against. */}
      <div className={styles.logo}>
        <Image
          src={PARENT_LOGO_SRC}
          alt="Electronic Recycle, Arizona and Texas"
          fill
          priority
          sizes="(min-width: 48em) 30rem, 80vw"
          className={styles.logoImage}
        />
      </div>
      <div className={styles.intro}><p className={styles.kicker}>LOCAL ELECTRONICS RECYCLING</p><h1>Where are you recycling?</h1><p>Choose your local market. Each site has its own service area, contact information, pickup details, local SEO resources, and recycling guidance.</p></div>
      <div className={styles.choices}>
        {choices.map((choice) => <Link key={choice.key} href={`/${choice.key}`} onClick={() => remember(choice.key)} className={styles.card} data-last={last === choice.key ? "true" : "false"}>
          {last === choice.key ? <span className={styles.last}>Your last location</span> : null}
          <span className={styles.state}>{choice.state}</span><strong className={styles.market}>{choice.title}</strong>
          <div className={styles.localBrand}><b>{choice.brand}</b><span>{choice.name}</span></div>
          <p>{choice.cities}</p><span className={styles.enter}>Enter {choice.brand} <b>→</b></span>
        </Link>)}
      </div>
      <p className={styles.note}>You can change locations anytime from the site header.</p>
    </div>
  </main>;
}
