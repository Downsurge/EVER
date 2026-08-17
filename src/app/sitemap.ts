import type { MetadataRoute } from "next";
import { publishableCities } from "@/data/service-areas";
const base="https://electronicrecycle.net";
export default function sitemap(): MetadataRoute.Sitemap { const staticRoutes=["","/recycle","/business","/what-we-accept","/faq","/contact","/privacy","/terms","/acceptance-policy","/accessibility"]; return [ ...staticRoutes.map((path)=>({url:`${base}${path}`,changeFrequency:path===""?"weekly" as const:"monthly" as const,priority:path===""?1:path==="/recycle"||path==="/business"?.9:.7})), ...publishableCities().map((city)=>({url:`${base}/areas/${city.slug}`,changeFrequency:"monthly" as const,priority:.75})) ]; }
