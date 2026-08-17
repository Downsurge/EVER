import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { publishableCities } from "@/data/service-areas";
import styles from "../service.module.css";

export const metadata: Metadata = {
  title: "Arizona Electronics Recycling Service Areas | EVER",
  description: "EVER electronics recycling and e-waste pickup service areas include Gilbert, Chandler, Queen Creek, San Tan Valley, Mesa, Tempe, Phoenix and Florence, Arizona.",
  alternates: { canonical: "/areas" },
};

export default function AreasPage() {
  const cities = publishableCities();
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className="ever-shell">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Service Areas" }]} />
          <h1>Electronics recycling service areas in Arizona.</h1>
          <p>EVER provides electronic recycling, e-waste pickup, computer recycling, residential electronics pickup, and commercial electronics pickup throughout the East Valley plus Phoenix and Florence.</p>
        </div>
      </section>
      <section className={styles.body}>
        <div className="ever-shell">
          <div className={styles.areaIndexGrid}>
            {cities.map((city) => (
              <Link key={city.slug} href={`/areas/${city.slug}`} className={styles.areaIndexCard}>
                <span>{city.county}</span>
                <h2>Electronics Recycling in {city.name}, AZ</h2>
                <p>{city.metaDescription.value}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
