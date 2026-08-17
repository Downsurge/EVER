import Image from "next/image";
import Link from "next/link";
import { Wordmark } from "./Wordmark";
import { cities, isCityPublishable } from "@/data/service-areas";
import { contact, veteranOwned } from "@/data/site";
import { isPublishable } from "@/data/verification";
import styles from "./SiteFooter.module.css";

const services = [
  { label: "Recycle Electronics", href: "/recycle" },
  { label: "Business Pickup", href: "/business" },
  { label: "What We Accept", href: "/what-we-accept" },
  { label: "FAQ", href: "/faq" },
] as const;

const policies = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Acceptance Policy", href: "/acceptance-policy" },
  { label: "Accessibility", href: "/accessibility" },
] as const;

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`ever-shell ${styles.top}`}>
        <div className={styles.brandBlock}>
          <Wordmark variant="reversed" />
          <p>
            Electronic recycling and commercial technology pickup across Arizona&rsquo;s East Valley.
          </p>
          {isPublishable(veteranOwned) ? (
            <Image src="/brand/veteran-owned-badge.png" alt={veteranOwned.value} width={360} height={464} className={styles.veteranBadge} />
          ) : null}
        </div>

        <div className={styles.linkGroup}>
          <h2>Services</h2>
          <ul>
            {services.map((item) => (
              <li key={item.href}><Link href={item.href}>{item.label}</Link></li>
            ))}
          </ul>
        </div>

        <div className={styles.linkGroup}>
          <h2>Service Areas</h2>
          <ul className={styles.areaList}>
            {cities.filter(isCityPublishable).map((city) => (
              <li key={city.slug}><Link href={`/areas/${city.slug}`}>{city.name}</Link></li>
            ))}
          </ul>
        </div>

        <div className={styles.linkGroup}>
          <h2>Policies</h2>
          <ul>
            {policies.map((item) => (
              <li key={item.href}><Link href={item.href}>{item.label}</Link></li>
            ))}
          </ul>
        </div>

        <div className={styles.contactBlock}>
          <h2>Need help?</h2>
          <p>Questions about an item, a business load, privacy, or website accessibility.</p>
          <div className={styles.contactList}>
            <a href={`tel:${contact.phone.value}`}>{contact.phone.value}</a>
            <a href={`mailto:${contact.email.value}`}>{contact.email.value}</a>
          </div>
          <Link href="/contact">Contact EVER</Link>
        </div>
      </div>

      <div className={`ever-shell ${styles.bottom}`}>
        <span>© {year} EVER — East Valley Electronic Recycle</span>
        <span>ElectronicRecycle.net</span>
      </div>
    </footer>
  );
}
