import Image from "next/image";
import Link from "next/link";
import type { MarketKey } from "@/data/markets";
import { markets, marketRoutes } from "@/data/markets";
import { resourcesForMarket } from "@/data/resources";
import styles from "./MarketGrowthSections.module.css";

const audiences = ["Businesses & offices", "IT departments & MSPs", "Schools", "Property managers", "Healthcare", "Organizations"];

export function PricingSnapshot({ market }: { market: MarketKey }) {
  const cfg=markets[market], r=marketRoutes(market);
  return <section className={styles.pricing}><div className={`ever-shell ${styles.pricingGrid}`}><div><p className="ever-eyebrow">FREE VS. FEE</p><h2 className="ever-section-title">Know the basics before you load the car.</h2><p className="ever-lede">{cfg.brandShort} publishes the common rules instead of hiding every answer behind a quote form.</p><Link href={r.pricing} className={styles.action}>View pricing & pickup rules →</Link></div><div className={styles.rules}><div><strong>Most accepted electronics</strong><span>No standard recycling fee</span></div><div><strong>LED TVs</strong><span>$15 per TV</span></div><div><strong>CRT TVs & monitors</strong><span>Not accepted</span></div>{market==="az"?<div><strong>Commercial pickup</strong><span>Free with 10 qualifying items</span></div>:<div><strong>Commercial pickup</strong><span>Reviewed by load and location</span></div>}</div></div></section>;
}

export function WhoWeServeSnapshot({ market }: { market: MarketKey }) {
  const cfg=markets[market],r=marketRoutes(market);
  return <section className={styles.audiences}><div className="ever-shell"><div className={styles.sectionHead}><div><p className="ever-eyebrow">COMMERCIAL RECYCLING</p><h2 className="ever-section-title">Built for more than one old laptop.</h2></div><p>{cfg.brandShort} can start with a photo, rough item count, or existing inventory file, then review the equipment before scheduling.</p></div><div className={styles.audienceGrid}>{audiences.map(a=><div key={a}><span aria-hidden="true">→</span><strong>{a}</strong></div>)}</div><div className={styles.actions}><Link href={r.whoWeServe}>Who we serve</Link><Link href={r.business}>Build a pickup request</Link><Link href={r.dataSecurity}>Data-bearing devices</Link></div></div></section>;
}

export function ResourceSnapshot({ market }: { market: MarketKey }) {
  const cfg=markets[market],r=marketRoutes(market),articles=resourcesForMarket(market).slice(0,3);
  return <section className={styles.resources}><div className="ever-shell"><div className={styles.sectionHead}><div><p className="ever-eyebrow">LOCAL RESOURCES</p><h2 className="ever-section-title">Answers built around real searches.</h2></div><Link href={r.resources} className={styles.textLink}>View all resources →</Link></div><div className={styles.resourceGrid}>{articles.map(a=><Link key={a.slug} href={`${r.resources}/${a.slug}`} className={styles.resourceCard}><Image src={a.image} alt={a.imageAlt} width={320} height={220}/><div><small>{cfg.stateAbbr} · {a.primaryKeyword}</small><strong>{a.title}</strong><span>Read guide →</span></div></Link>)}</div></div></section>;
}
