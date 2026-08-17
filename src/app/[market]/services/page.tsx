import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMarket, isMarketKey } from "@/data/markets";
import { getMarketSeoServices, marketServicesIntro } from "@/data/seo-services";
import { publishableCities } from "@/data/service-areas";
import styles from "../../service.module.css";

export async function generateMetadata({params}:{params:Promise<{market:string}>}):Promise<Metadata>{const{market}=await params;const cfg=getMarket(market);if(!cfg)return{};return{title:`Electronics Recycling Services in ${cfg.marketLabel} | ${cfg.brandShort}`,description:marketServicesIntro(market as "az"|"tx"),alternates:{canonical:`/${market}/services`}}}
export default async function ServicesPage({params}:{params:Promise<{market:string}>}){const{market}=await params;if(!isMarketKey(market))notFound();const cfg=getMarket(market)!;const services=getMarketSeoServices(market);const cities=publishableCities(market);return <div className={styles.page}><section className={styles.hero}><div className="ever-shell"><h1>Electronics recycling services in {cfg.regionShort}.</h1><p>{marketServicesIntro(market)}</p></div></section><section className={styles.body}><div className="ever-shell"><div className={styles.contentGrid}><div className={styles.mainContent}><section><h2>Services</h2><div className={styles.cityLinks}>{services.map(s=><Link key={s.slug} href={`/${market}/services/${s.slug}`}>{s.h1}</Link>)}</div></section><section><h2>Local service areas</h2><div className={styles.cityLinks}>{cities.map(c=><Link key={c.slug} href={`/${market}/${c.slug}`}>{c.name}, {cfg.stateAbbr}</Link>)}</div></section></div></div></div></section></div>}
