import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { contact } from "@/data/site";
import { getSeoService, seoServices } from "@/data/seo-services";
import { publishableCities } from "@/data/service-areas";
import styles from "../../service.module.css";

export function generateStaticParams() {
  return seoServices.map((service) => ({ service: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ service: string }> }): Promise<Metadata> {
  const { service: slug } = await params;
  const service = getSeoService(slug);
  if (!service) return {};
  const url = `/services/${service.slug}`;
  return {
    title: service.title,
    description: service.description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: service.title,
      description: service.description,
      images: [{ url: "/brand/ever-og.png", width: 1200, height: 630, alt: service.imageAlt }],
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ service: string }> }) {
  const { service: slug } = await params;
  const service = getSeoService(slug);
  if (!service) notFound();

  const related = service.related.map(getSeoService).filter((item): item is NonNullable<ReturnType<typeof getSeoService>> => Boolean(item));
  const cities = publishableCities();
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.h1,
    description: service.description,
    provider: { "@type": "Organization", name: "EVER — East Valley Electronic Recycle", url: "https://electronicrecycle.net" },
    areaServed: cities.map((city) => ({ "@type": "City", name: `${city.name}, Arizona` })),
    url: `https://electronicrecycle.net/services/${service.slug}`,
  };

  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <section className={styles.hero}>
        <div className={`ever-shell ${styles.heroGrid}`}>
          <div>
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: service.h1 }]} />
            <h1>{service.h1}</h1>
            <p>{service.intro}</p>
            <div className={styles.heroActions}>
              <Link href="/recycle">Check an item</Link>
              <Link href="/business">Plan a business pickup</Link>
            </div>
          </div>
          <div className={styles.heroVisual}>
            <Image src={service.image} alt={service.imageAlt} width={640} height={440} priority />
          </div>
        </div>
      </section>

      <section className={styles.body}>
        <div className="ever-shell">
          <ul className={styles.bullets}>
            {service.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
          </ul>

          <div className={styles.contentGrid}>
            <div className={styles.mainContent}>
              {service.sections.map((section) => (
                <section key={section.heading}>
                  <h2>{section.heading}</h2>
                  <p>{section.body}</p>
                </section>
              ))}

              <section>
                <h2>Service areas</h2>
                <p>
                  EVER serves Gilbert, Chandler, Queen Creek, San Tan Valley, Mesa, Tempe, Phoenix, and Florence, Arizona. Pickup availability and pricing depend on the load type, qualifying item count, and distance.
                </p>
                <div className={styles.cityLinks}>
                  {cities.map((city) => <Link key={city.slug} href={`/areas/${city.slug}`}>{city.name}</Link>)}
                </div>
              </section>

              <section>
                <h2>Frequently asked questions</h2>
                <div className={styles.faqList}>
                  {service.faqs.map((item) => (
                    <details key={item.question}>
                      <summary>{item.question}</summary>
                      <p>{item.answer}</p>
                    </details>
                  ))}
                </div>
              </section>
            </div>

            <aside className={styles.sidebar}>
              <h2>Related services</h2>
              <ul>
                {related.map((item) => (
                  <li key={item.slug}><Link href={`/services/${item.slug}`}>{item.h1}</Link></li>
                ))}
              </ul>
              <div className={styles.contactCard}>
                <strong>Questions?</strong>
                <a href={`tel:${contact.phone.value}`}>{contact.phone.value}</a>
                <a href={`mailto:${contact.email.value}`}>{contact.email.value}</a>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
