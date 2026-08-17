import type { Metadata, Viewport } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { contact } from "@/data/site";
import { publishableCities } from "@/data/service-areas";
import "@/styles/globals.css";

/**
 * Root layout.
 *
 * Landmark order is fixed by the shell plan: skip link, header, main, footer.
 * `main` is never nested inside header or footer.
 *
 * No webfont is loaded. The approved typeface has not been supplied, and a
 * substitute would either impersonate the brand or be swapped later and
 * invalidate the layout-shift work. A system stack ships zero bytes and zero
 * shift until the real family arrives.
 */

export const viewport: Viewport = { themeColor: "#0b1b34" };

export const metadata: Metadata = {
  metadataBase: new URL("https://electronicrecycle.net"),
  title: "EVER | East Valley Electronic Recycle",
  description: "Electronic recycling, free drop-off for most accepted electronics, and commercial or residential pickup across Arizona's East Valley.",
  icons: { icon: "/icon.png", shortcut: "/icon.png", apple: "/icon.png" },
  openGraph: { type:"website", siteName:"EVER — East Valley Electronic Recycle", title:"EVER | East Valley Electronic Recycle", description:"Electronic recycling and pickup across Arizona's East Valley.", images:[{url:"/brand/ever-social-circle.png",width:1254,height:1254,alt:"EVER — East Valley Electronic Recycle"}] },
  twitter: { card:"summary_large_image", title:"EVER | East Valley Electronic Recycle", description:"Electronic recycling and pickup across Arizona's East Valley.", images:["/brand/ever-social-circle.png"] },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "EVER — East Valley Electronic Recycle",
    url: "https://electronicrecycle.net",
    logo: "https://electronicrecycle.net/brand/ever-logo.png",
    telephone: contact.phone.value,
    email: contact.email.value,
    areaServed: publishableCities().map((city) => ({ "@type": "City", name: `${city.name}, Arizona` })),
  };
  return (
    <html lang="en">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <a className="ever-skip-link" href="#main">
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
