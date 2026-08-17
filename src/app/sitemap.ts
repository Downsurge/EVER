import type { MetadataRoute } from "next";
import { publishableCities } from "@/data/service-areas";
import { seoServices } from "@/data/seo-services";

const base = "https://electronicrecycle.net";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/recycle",
    "/business",
    "/what-we-accept",
    "/services",
    "/areas",
    "/faq",
    "/contact",
    "/privacy",
    "/terms",
    "/acceptance-policy",
    "/accessibility",
  ];

  return [
    ...staticRoutes.map((path) => ({
      url: `${base}${path}`,
      changeFrequency: path === "" ? "weekly" as const : "monthly" as const,
      priority: path === "" ? 1 : path === "/recycle" || path === "/business" ? .9 : .65,
    })),
    ...seoServices.map((service) => ({
      url: `${base}/services/${service.slug}`,
      changeFrequency: "monthly" as const,
      priority: .85,
    })),
    ...publishableCities().map((city) => ({
      url: `${base}/areas/${city.slug}`,
      changeFrequency: "monthly" as const,
      priority: .82,
    })),
  ];
}
