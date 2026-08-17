import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AcceptanceCatalog } from "@/components/AcceptanceCatalog";
import { publishableCategories } from "@/data/accepted-items";
import { getMarket, isMarketKey } from "@/data/markets";
import styles from "../../page.module.css";
export async function generateMetadata({params}:{params:Promise<{market:string}>}):Promise<Metadata>{const{market}=await params;const cfg=getMarket(market);if(!cfg)return{};return{title:`Electronics We Accept in ${cfg.marketLabel} | ${cfg.brandShort}`,description:`See computers, laptops, servers, drives, monitors, TVs, phones, printers and other electronics accepted by ${cfg.brandShort}.`,alternates:{canonical:`/${market}/what-we-accept`}}}
export default async function Page({params}:{params:Promise<{market:string}>}){const{market}=await params;if(!isMarketKey(market))notFound();const cfg=getMarket(market)!;return <div className={styles.catalogPage}><section className={styles.catalogHero}><div className={`ever-shell ${styles.catalogHeroGrid}`}><div><h1>What {cfg.brandShort} accepts.</h1></div><div className={styles.catalogHeroCopy}><p>Scan the current operating scope, fees, special handling, and items that are not accepted.</p></div></div></section><section className={styles.catalogBody}><div className="ever-shell"><AcceptanceCatalog market={market} categories={publishableCategories()}/></div></section></div>}
