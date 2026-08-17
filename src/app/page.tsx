import type { Metadata } from "next";
import { MarketSelector } from "./MarketSelector";
import { getGalleryImages } from "@/lib/gallery";

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
  // Read on the server and passed down, so the client never touches node:fs
  // and cannot compute a different list than the HTML was built with.
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} /><MarketSelector gallery={getGalleryImages()} /></>;
}
