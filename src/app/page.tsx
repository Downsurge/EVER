import type { Metadata } from "next";
import { MarketSelector } from "./MarketSelector";

export const metadata: Metadata = {
  title: "Electronics Recycling Locations | Arizona & Texas | ElectronicRecycle.net",
  description: "Choose your local electronics recycling market: EVER for Phoenix and Arizona's East Valley, or EPER for El Paso, Texas.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ElectronicRecycle.net",
    url: "https://electronicrecycle.net",
    description: "Local electronics recycling websites for Arizona and Texas markets.",
  };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} /><MarketSelector /></>;
}
