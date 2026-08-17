import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMarket,isMarketKey } from "@/data/markets";
import { publishableCities } from "@/data/service-areas";
import styles from "../../service.module.css";
export async function generateMetadata({params}:{params:Promise<{market:string}>}):Promise<Metadata>{const{market}=await params;const cfg=getMarket(market);if(!cfg)return{};return{title:`Electronics Recycling Service Areas | ${cfg.marketLabel} | ${cfg.brandShort}`,description:`Local ${cfg.brandShort} electronics recycling and e-waste service pages for ${cfg.serviceAreaSummary}.`,alternates:{canonical:`/${market}/areas`}}}
export default async function Page({params}:{params:Promise<{market:string}>}){const{market}=await params;if(!isMarketKey(market))notFound();const cfg=getMarket(market)!;const cities=publishableCities(market);return <div className={styles.page}><section className={styles.hero}><div className="ever-shell"><p className="ever-eyebrow">SERVICE AREAS</p><h1>Local electronics recycling in {cfg.regionShort}.</h1><p>Choose your city for local electronics recycling, e-waste, computer recycling, TV policy, and pickup information.</p></div></section><section className={styles.body}><div className="ever-shell"><div className={styles.cityLinks}>{cities.map(city=><Link key={city.slug} href={`/${market}/${city.slug}`}>{city.name}, {cfg.stateAbbr}</Link>)}</div></div></section></div>}
