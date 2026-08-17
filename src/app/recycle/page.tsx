import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { AcceptanceFinder } from "@/components/AcceptanceFinder";
import { publishableCategories } from "@/data/accepted-items";
import { contact } from "@/data/site";
import styles from "../page.module.css";

export const metadata: Metadata = {
  title: "Recycle Electronics | EVER",
  description:
    "Check whether EVER handles your electronics and see the published next step for each item.",
};

export default async function RecyclePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; item?: string }>;
}) {
  const params = await searchParams;
  const categories = publishableCategories();

  return (
    <div className={styles.toolPage}>
      <section className={styles.toolHero}>
        <div className="ever-shell">
          <h1>Check an electronic item.</h1>
          <p>
            Old electronics are easier to deal with when the answer is clear.
            Search an item, see the current acceptance rule, and know the next step.
          </p>
          <div className={styles.heroSignals}>
            <span>$15 per LED TV</span>
            <span>No CRT TVs</span>
            <span>Residential pickup fee depends on distance</span>
            <span>Questions? {contact.phone.value}</span>
          </div>
        </div>
      </section>

      <section className={styles.toolBody}>
        <div className="ever-shell">
          <AcceptanceFinder
            categories={categories}
            initialQuery={params.q ?? ""}
            selectedSlug={params.item ?? null}
          />

          <div className={styles.residentialPickup}>
            <div className={styles.residentialPickupCopy}>
              <h2>Need residential pickup?</h2>
              <p>
                Residential pickup is available across the East Valley. The pickup fee
                depends on distance. Send your ZIP code and item details so EVER can confirm it.
              </p>
              <div className={styles.residentialPickupActions}>
                <Link href="/contact?subject=Residential%20pickup%20request">Request pickup pricing</Link>
                <a href={`tel:${contact.phone.value}`}>Call {contact.phone.value}</a>
              </div>
            </div>

            <div className={styles.residentialPickupVisual} aria-hidden="true">
              <Image src="/brand/device-monitor.svg" alt="" width={320} height={220} />
              <Image src="/brand/device-phone.svg" alt="" width={320} height={220} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
