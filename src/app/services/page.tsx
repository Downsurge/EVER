import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { seoServices } from "@/data/seo-services";
import { publishableCities } from "@/data/service-areas";
import styles from "../service.module.css";

export const metadata: Metadata = {
  title: "Electronics Recycling Services | EVER Arizona",
  description: "Explore EVER electronic recycling, e-waste recycling, computer recycling, laptop recycling, TV recycling, server recycling, hard-drive recycling and electronics pickup services in Arizona.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  const cities = publishableCities();
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className="ever-shell">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Services" }]} />
          <h1>Electronics recycling services.</h1>
          <p>
            EVER provides electronic recycling, e-waste recycling, computer and laptop recycling, server and hard-drive recycling, LED TV recycling, residential electronics pickup, and commercial e-waste pickup across Arizona.
          </p>
        </div>
      </section>
      <section className={styles.body}>
        <div className="ever-shell">
          <div className={styles.serviceIndexGrid}>
            {seoServices.map((service) => (
              <Link key={service.slug} href={`/services/${service.slug}`} className={styles.serviceIndexCard}>
                <Image src={service.image} alt={service.imageAlt} width={320} height={220} />
                <div><h2>{service.h1}</h2><p>{service.description}</p></div>
              </Link>
            ))}
          </div>
          <section className={styles.serviceAreaIndex}>
            <h2>Electronics recycling service areas</h2>
            <p>EVER serves Gilbert, Chandler, Queen Creek, San Tan Valley, Mesa, Tempe, Phoenix, and Florence, Arizona.</p>
            <div className={styles.cityLinks}>{cities.map((city)=><Link key={city.slug} href={`/areas/${city.slug}`}>{city.name} electronics recycling</Link>)}</div>
          </section>
        </div>
      </section>
    </div>
  );
}
