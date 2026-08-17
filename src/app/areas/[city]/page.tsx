import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { notFound } from "next/navigation";
import {
  getCity,
  isCityPublishable,
  publishableCities,
} from "@/data/service-areas";
import { isPublishable } from "@/data/verification";
import { contact, routes } from "@/data/site";
import { seoServices } from "@/data/seo-services";
import styles from "../../page.module.css";

export function generateStaticParams() {
  return publishableCities().map((city) => ({ city: city.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getCity(slug);

  if (!city || !isCityPublishable(city)) return {};

  const url = `/areas/${city.slug}`;
  return {
    title: city.pageTitle.value,
    description: city.metaDescription.value,
    alternates: { canonical: url },
    openGraph: { type: "website", url, title: city.pageTitle.value, description: city.metaDescription.value },
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city: slug } = await params;
  const city = getCity(slug);

  if (!city || !isCityPublishable(city)) notFound();

  const neighbors = city.neighbors
    .map(getCity)
    .filter((item): item is NonNullable<ReturnType<typeof getCity>> => Boolean(item))
    .filter(isCityPublishable);

  const notes = isPublishable(city.localNotes) ? city.localNotes.value : [];
  const questions = isPublishable(city.localQuestions) ? city.localQuestions.value : [];
  const faqSchema = questions.length ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })),
  } : null;

  return (
    <div className={styles.cityPage}>
      {faqSchema ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} /> : null}
      <section className={styles.cityHero}>
        <div className={`ever-shell ${styles.cityHeroGrid}`}>
          <div>
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Service Areas", href: "/areas" }, { label: `${city.name}, AZ` }]} />
            <p className="ever-eyebrow">{city.county}</p>
            <h1>Electronics Recycling in {city.name}, AZ</h1>
          </div>

          <div className={styles.cityHeroCopy}>
            <p>{city.metaDescription.value}</p>
            <div className={styles.cityPathTags}>
              <span>Commercial pickup</span>
              <span>Residential pickup available</span>
              <span>Free drop-off for eligible electronics</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.cityBody}>
        <div className={`ever-shell ${styles.cityGrid}`}>
          <div className={styles.cityPrimary}>
            <h2>Electronic recycling, e-waste pickup, and computer recycling in {city.name}.</h2>
            <p>
              EVER serves {city.name} residents and businesses with electronics recycling for computers, laptops, servers, hard drives, networking equipment, monitors, phones, printers, gaming systems, LED TVs, and other accepted e-waste. Check individual electronics online, request residential pickup with a distance-based fee, or plan a commercial pickup. Commercial loads with at least 10 qualifying items may qualify for free pickup.
            </p>

            <div className={styles.cityActions}>
              <Link href={routes.business} className={styles.cityActionPrimary}>Plan a business pickup</Link>
              <Link href={routes.residential} className={styles.cityActionSecondary}>Check an item</Link>
              <Link href="/contact?subject=Residential%20pickup%20request" className={styles.cityActionSecondary}>Request residential pickup</Link>
            </div>
            <p className={styles.cityContactLine}>
              Questions? <a href={`tel:${contact.phone.value}`}>{contact.phone.value}</a> · <a href={`mailto:${contact.email.value}`}>{contact.email.value}</a>
            </p>

            <div className={styles.cityRoute} aria-label="EVER service path">
              <div><span>01</span><strong>Identify the equipment</strong></div>
              <div><span>02</span><strong>Choose the right route</strong></div>
              <div><span>03</span><strong>Recover, reuse, or recycle</strong></div>
            </div>

            {notes.length ? (
              <div className={styles.localNotes}>
                {notes.map((note) => <p key={note}>{note}</p>)}
              </div>
            ) : null}

            <section className={styles.cityFaq} aria-labelledby="city-services-heading">
              <h2 id="city-services-heading">Popular electronics recycling services in {city.name}</h2>
              <div className={styles.cityServiceLinks}>
                {seoServices.slice(0, 9).map((service) => (
                  <Link key={service.slug} href={`/services/${service.slug}`}>{service.h1}</Link>
                ))}
              </div>
            </section>

            {questions.length ? (
              <section className={styles.cityFaq} aria-labelledby="city-faq-heading">
                <h2 id="city-faq-heading">Common questions in {city.name}</h2>
                <div className={styles.faqList}>
                  {questions.map((item) => (
                    <details key={item.question}>
                      <summary>{item.question}</summary>
                      <p>{item.answer}</p>
                    </details>
                  ))}
                </div>
              </section>
            ) : null}
          </div>

          <aside className={styles.citySidebar}>
            <h2>Nearby service areas</h2>
            <ul className={styles.neighborList}>
              {neighbors.map((neighbor) => (
                <li key={neighbor.slug}>
                  <Link href={`/areas/${neighbor.slug}`}>{neighbor.name}</Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>
    </div>
  );
}
