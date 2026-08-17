import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getMarket, isMarketKey, markets } from "@/data/markets";
import { publishableCities } from "@/data/service-areas";

export function generateStaticParams() { return [{ market: "az" }, { market: "tx" }]; }

export async function generateMetadata({ params }: { params: Promise<{ market: string }> }): Promise<Metadata> {
  const { market } = await params;
  const cfg = getMarket(market);
  if (!cfg) return {};
  return {
    title: `${cfg.brandShort} | ${cfg.brandName}`,
    description: cfg.support,
    alternates: { canonical: cfg.homepage },
    openGraph: { type: "website", siteName: `${cfg.brandShort} — ${cfg.brandName}`, title: `${cfg.brandShort} | ${cfg.brandName}`, description: cfg.support, url: cfg.homepage, images: [{ url: cfg.ogImage, width: 1200, height: 630, alt: `${cfg.brandShort} electronics recycling in ${cfg.marketLabel}` }] },
    twitter: { card: "summary_large_image", title: `${cfg.brandShort} | ${cfg.brandName}`, description: cfg.support, images: [cfg.ogImage] },
  };
}

export default async function MarketLayout({ children, params }: { children: React.ReactNode; params: Promise<{ market: string }> }) {
  const { market } = await params;
  if (!isMarketKey(market)) notFound();
  const cfg = markets[market];
  const cities = publishableCities(market);
  const organizationSchema = {
    "@context": "https://schema.org", "@type": "Organization", name: `${cfg.brandShort} — ${cfg.brandName}`,
    url: `https://electronicrecycle.net/${market}`,
    ...(market === "az" ? { logo: "https://electronicrecycle.net/brand/ever-logo.png" } : {}),
    ...(cfg.phone ? { telephone: cfg.phone } : {}), ...(cfg.email ? { email: cfg.email } : {}),
    // A postal address is only emitted for a market that genuinely has one.
    // Publishing an address in structured data is a strong local-search
    // signal, and a wrong or invented one is correspondingly damaging.
    ...(cfg.address
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: cfg.address.street,
            addressLocality: cfg.address.city,
            addressRegion: cfg.address.stateAbbr,
            postalCode: cfg.address.postalCode,
            addressCountry: "US",
          },
        }
      : {}),
    areaServed: cities.map((city) => ({ "@type": "City", name: `${city.name}, ${cfg.state}` })),
  };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
    <SiteHeader market={market} />
    <main id="main">{children}</main>
    <SiteFooter market={market} />
  </>;
}
