import Image from "next/image";
import Link from "next/link";
import type { MarketKey } from "@/data/markets";
import { markets, marketRoutes } from "@/data/markets";
import { publishableCities } from "@/data/service-areas";
import { Wordmark } from "./Wordmark";
import styles from "./SiteFooter.module.css";

const serviceSlugs = [
  ["Electronic Recycling", "electronic-recycling"],
  ["E-Waste Recycling", "e-waste-recycling"],
  ["Computer Recycling", "computer-recycling"],
  ["Laptop Recycling", "laptop-recycling"],
  ["TV Recycling", "tv-recycling"],
  ["Server Recycling", "server-recycling"],
  ["Hard Drive Recycling", "hard-drive-recycling"],
  ["Business Electronics", "business-electronics-recycling"],
  ["Electronics Pickup", "electronics-pickup"],
] as const;

export function SiteFooter({ market }: { market: MarketKey }) {
  const year = new Date().getFullYear();
  const cfg = markets[market];
  const routes = marketRoutes(market);
  const cities = publishableCities(market);

  return (
    <footer className={styles.footer}>
      <div className={`ever-shell ${styles.top}`}>
        <div className={styles.brandBlock}>
          <Wordmark market={market} variant="reversed" />
          <p>Electronic recycling, e-waste recycling, and electronics pickup for {cfg.region}.</p>
          <Image src="/brand/veteran-owned-badge.png" alt="Veteran Owned & Operated" width={360} height={464} className={styles.veteranBadge} />
        </div>

        <div className={styles.linkGroup}>
          <h2>Services</h2>
          <ul>
            <li><Link href={routes.services}>All Recycling Services</Link></li>
            {serviceSlugs.map(([label, slug]) => <li key={slug}><Link href={`${routes.services}/${slug}`}>{label}</Link></li>)}
          </ul>
        </div>

        <div className={styles.linkGroup}>
          <h2>{cfg.citiesLabel}</h2>
          <ul className={styles.areaList}>
            <li><Link href={`${routes.home}/areas`}>All service areas</Link></li>
            {cities.map((city) => <li key={city.slug}><Link href={`${routes.home}/${city.slug}`}>{city.name}</Link></li>)}
          </ul>
          <h2 className={styles.secondaryHeading}>Explore</h2>
          <ul>
            <li><Link href={routes.pricing}>Free vs. Fee</Link></li>
            <li><Link href={routes.whoWeServe}>Who We Serve</Link></li>
            <li><Link href={routes.gallery}>Equipment Gallery</Link></li>
            <li><Link href={routes.dataSecurity}>Data-Bearing Devices</Link></li>
            <li><Link href={routes.resources}>Resources</Link></li>
          </ul>
        </div>

        <div className={styles.linkGroup}>
          <h2>Policies</h2>
          <ul>
            <li><Link href={routes.privacy}>Privacy Policy</Link></li>
            <li><Link href={routes.terms}>Terms of Service</Link></li>
            <li><Link href={routes.acceptancePolicy}>Acceptance Policy</Link></li>
            <li><Link href={routes.accessibility}>Accessibility</Link></li>
          </ul>
        </div>

        <div className={styles.contactBlock}>
          <h2>Need help?</h2>
          <p>Questions about an item, a business load, pickup, or website accessibility.</p>
          {(cfg.phone || cfg.email) ? <div className={styles.contactList}>
            {cfg.phone ? <a href={`tel:${cfg.phone}`}>{cfg.phone}</a> : null}
            {cfg.email ? <a href={`mailto:${cfg.email}`}>{cfg.email}</a> : null}
          </div> : null}
          {/* Only markets with a confirmed physical location show one. */}
          {cfg.address ? (
            <address className={styles.address}>
              {cfg.address.street}
              <br />
              {cfg.address.city}, {cfg.address.stateAbbr} {cfg.address.postalCode}
            </address>
          ) : null}
          <Link href={routes.contact}>Contact {cfg.brandShort}</Link>
          <Link href="/" className={styles.changeMarket}>Change location</Link>
        </div>
      </div>

      <div className={`ever-shell ${styles.bottom}`}>
        <span>© {year} {cfg.brandShort} — {cfg.brandName}</span>
        <span>ElectronicRecycle.net/{market}</span>
      </div>
    </footer>
  );
}
