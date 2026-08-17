import Image from "next/image";
import type { Metadata } from "next";
import { PickupBrief } from "@/components/PickupBrief";
import { contact } from "@/data/site";
import styles from "../page.module.css";

export const metadata: Metadata = {
  title: "Business Electronic Pickup | EVER",
  description:
    "Plan an East Valley commercial electronics pickup with EVER and build a clear brief for retired IT equipment.",
};

export default function BusinessPage() {
  return (
    <div className={styles.businessPage}>
      <section className={styles.businessHero}>
        <div className={`ever-shell ${styles.businessHeroGrid}`}>
          <div>
            <h1>Commercial electronic pickup for the East Valley.</h1>
            <p>
              Free commercial pickup starts at 10 qualifying items. Smaller loads can use free
              drop-off or a distance-based pickup, depending on what you have and where it is.
            </p>

            <ul className={styles.businessPolicyList}>
              <li>Free commercial pickup with 10 qualifying items</li>
              <li>Under 10 items: free drop-off or distance-based pickup</li>
              <li>Questions first? Call {contact.phone.value} or email {contact.email.value}</li>
            </ul>
          </div>

          <div className={styles.businessHeroVisual} aria-hidden="true">
            <div className={styles.heroAssetGrid}>
              {[
                { src: "/brand/device-laptop.svg", label: "LAPTOPS" },
                { src: "/brand/device-server.svg", label: "SERVERS" },
                { src: "/brand/device-network.svg", label: "NETWORKING" },
                { src: "/brand/device-drives.svg", label: "DRIVES" },
              ].map((asset) => (
                <figure key={asset.label} className={styles.heroAssetCard}>
                  <Image src={asset.src} alt="" width={320} height={220} className={styles.heroAssetImage} />
                  <figcaption>{asset.label}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.businessBody}>
        <div className="ever-shell">
          <PickupBrief />
        </div>
      </section>
    </div>
  );
}
