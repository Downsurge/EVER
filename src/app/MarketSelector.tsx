"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GalleryStrip } from "@/components/GalleryStrip";
import { markets } from "@/data/markets";
import { PARENT_LOGO_SRC } from "@/lib/brand-paths";
import type { GalleryImage } from "@/lib/gallery";
import styles from "./selector.module.css";

const choices = [
  { key: "az", brand: "EVER", name: "East Valley Electronic Recycle", title: "Phoenix & East Valley", state: "Arizona", cities: "Gilbert · Mesa · Chandler · Queen Creek · Tempe · Phoenix · San Tan Valley · Florence" },
  { key: "tx", brand: "EPER", name: "El Paso Electronic Recycle", title: "El Paso", state: "Texas", cities: "El Paso · West Texas" },
] as const;

export function MarketSelector({ gallery = [] }: { gallery?: readonly GalleryImage[] }) {
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
      {/* The explanatory paragraph that sat here has been removed. It told
          visitors how the site is organised, and mentioned "local SEO
          resources", which is our own vocabulary rather than theirs. The two
          cards below already answer the question the heading asks. */}
      <div className={styles.intro}><p className={styles.kicker}>LOCAL ELECTRONICS RECYCLING</p><h1>Where are you recycling?</h1></div>
      {/* Each card is a container rather than one big <Link>, because the
          phone and email inside have to be real tel: and mailto: links and an
          anchor cannot be nested inside another anchor. The card link still
          covers the whole card via a stretched ::after, so clicking anywhere
          except the contact details still enters the market. */}
      <div className={styles.choices}>
        {choices.map((choice) => {
          const cfg = markets[choice.key];
          return (
            <div key={choice.key} className={styles.card} data-last={last === choice.key ? "true" : "false"}>
              {last === choice.key ? <span className={styles.last}>Your last location</span> : null}
              <Link
                href={`/${choice.key}`}
                onClick={() => remember(choice.key)}
                className={styles.cardLink}
              >
                <span className={styles.state}>{choice.state}</span>
                <strong className={styles.market}>{choice.title}</strong>
                <div className={styles.localBrand}><b>{choice.brand}</b><span>{choice.name}</span></div>
                <p>{choice.cities}</p>
                <span className={styles.enter}>Enter {choice.brand} <b>→</b></span>
              </Link>
              {(cfg.phone || cfg.email) ? (
                <div className={styles.cardContact}>
                  {cfg.phone ? <a href={`tel:${cfg.phone}`}>{cfg.phone}</a> : null}
                  {cfg.email ? <a href={`mailto:${cfg.email}`}>{cfg.email}</a> : null}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
      {/* Renders only when public/gallery actually has images in it. */}
      <GalleryStrip images={gallery} />
    </div>
  </main>;
}
