import type { MetadataRoute } from "next";
import { publishableCities } from "@/data/service-areas";
import { getMarketSeoServices } from "@/data/seo-services";
import { resourcesForMarket } from "@/data/resources";
import type { MarketKey } from "@/data/markets";

const base = "https://electronicrecycle.net";
const markets: MarketKey[] = ["az", "tx"];
const marketStatic = ["", "/recycle", "/business", "/what-we-accept", "/services", "/areas", "/pricing", "/who-we-serve", "/gallery", "/data-security", "/resources", "/faq", "/contact", "/privacy", "/terms", "/acceptance-policy", "/accessibility"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [{ url: base, changeFrequency: "monthly", priority: .7 }];
  for (const market of markets) {
    for (const path of marketStatic) entries.push({ url: `${base}/${market}${path}`, changeFrequency: path === "" ? "weekly" : "monthly", priority: path === "" ? 1 : path === "/recycle" || path === "/business" ? .9 : .68 });
    for (const service of getMarketSeoServices(market)) entries.push({ url: `${base}/${market}/services/${service.slug}`, changeFrequency: "monthly", priority: .86 });
    for (const city of publishableCities(market)) entries.push({ url: `${base}/${market}/${city.slug}`, changeFrequency: "monthly", priority: .84 });
    for (const article of resourcesForMarket(market)) entries.push({ url: `${base}/${market}/resources/${article.slug}`, lastModified: new Date(article.updated), changeFrequency: "monthly", priority: .74 });
  }
  return entries;
}
