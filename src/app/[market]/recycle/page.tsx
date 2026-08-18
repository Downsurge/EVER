import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AcceptanceFinder } from "@/components/AcceptanceFinder";
import { ResidentialEnquiry } from "@/components/ResidentialEnquiry";
import { publishableCategories } from "@/data/accepted-items";
import { getMarket, isMarketKey, marketRoutes } from "@/data/markets";
import styles from "../../page.module.css";

export async function generateMetadata({ params }: { params: Promise<{ market: string }> }): Promise<Metadata> { const {market}=await params; const cfg=getMarket(market); if(!cfg)return{}; return {title:`Electronics Recycling & E-Waste Drop-Off in ${cfg.marketLabel} | ${cfg.brandShort}`,description:`Check electronics, TV recycling, computer recycling, laptop recycling, and pickup options with ${cfg.brandShort} in ${cfg.marketLabel}.`,alternates:{canonical:`/${market}/recycle`}}; }

export default async function RecyclePage({ params, searchParams }: { params: Promise<{market:string}>; searchParams: Promise<{q?:string;item?:string}> }) {
  const {market}=await params; if(!isMarketKey(market))notFound(); const cfg=getMarket(market)!; const routes=marketRoutes(market); const query=await searchParams; const categories=publishableCategories();
  return <div className={styles.toolPage}><section className={styles.toolHero}><div className="ever-shell"><h1>Check an electronic item.</h1><p>Search an item, see the current acceptance rule, and know the next step before you load the car.</p><div className={styles.heroSignals}><span>$15 per LED TV</span><span>No CRT TVs</span><span>Business and residential options</span>{cfg.phone?<span>Questions? {cfg.phone}</span>:null}</div></div></section><section className={styles.toolBody}><div className="ever-shell"><AcceptanceFinder market={market} categories={categories} initialQuery={query.q??""} selectedSlug={query.item??null}/><ResidentialEnquiry market={market}/><div className={styles.residentialPickup}><div className={styles.residentialPickupCopy}><h2>Need pickup?</h2><p>Tell {cfg.brandShort} what you have and where you are. Pickup availability and any fee are confirmed before scheduling.</p><div className={styles.residentialPickupActions}><Link href={`${routes.contact}?subject=Residential%20pickup%20request`}>Request pickup pricing</Link>{cfg.phone?<a href={`tel:${cfg.phone}`}>Call {cfg.phone}</a>:null}</div></div><div className={styles.residentialPickupVisual} aria-hidden="true"><Image src="/brand/device-monitor.svg" alt="" width={320} height={220}/><Image src="/brand/device-phone.svg" alt="" width={320} height={220}/></div></div></div></section></div>;
}
