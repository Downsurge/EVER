import type { Metadata } from "next";
import Link from "next/link";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "Acceptance Policy | EVER",
  description: "Rules that apply when electronics are handed to EVER for recycling or recovery.",
};

export default function AcceptancePolicyPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className="ever-shell">
          <h1>Acceptance Policy</h1>
          <p>
            The rules that apply when electronics are offered to EVER for pickup,
            recycling, reuse, or recovery.
          </p>
          <span className={styles.updated}>Last updated August 16, 2026</span>
        </div>
      </section>

      <section className={styles.body}>
        <div className={`ever-shell ${styles.content}`}>
          <section>
            <h2>Check the current item list first</h2>
            <p>
              The <Link href="/what-we-accept">What We Accept</Link> page is the current
              item-by-item source for EVER. Item policies may differ by category and may
              include conditions, fees, contact-first requirements, or a not-accepted
              status.
            </p>
          </section>

          <section>
            <h2>Current TV policy</h2>
            <p>Flat screen LED televisions are accepted for <strong>$15 per TV</strong>. CRT televisions and CRT monitors are not accepted.</p>
          </section>

          <section>
            <h2>Commercial pickup</h2>
            <p>Commercial pickup is free when a load includes at least 10 qualifying items. Loads below that threshold can use free drop-off for eligible electronics or may request pickup for a fee based on distance.</p>
          </section>

          <section>
            <h2>Residential pickup and drop-off</h2>
            <p>Residential pickup is available with a fee based on distance. Free drop-off is available for most accepted electronics, except where an item-specific fee is published. Contact EVER for current drop-off instructions and residential pickup pricing.</p>
          </section>

          <section>
            <h2>Condition matters</h2>
            <p>
              An item that is normally accepted may be refused or require a different
              route if it is leaking, swollen, burned, contaminated, broken in a way
              that creates a safety hazard, or contains material that was not disclosed.
            </p>
          </section>

          <section>
            <h2>Commercial loads must match the request</h2>
            <p>
              Businesses should describe the equipment and approximate quantity as
              accurately as reasonably possible. Significant changes in quantity,
              access conditions, material type, or special handling needs may change
              whether a pickup can be completed or whether a fee applies.
            </p>
          </section>

          <section>
            <h2>Data-bearing equipment</h2>
            <p>
              Acceptance for recycling is not the same as an agreement to provide
              certified data destruction. If a business requires sanitization,
              serialized reporting, witnessed destruction, chain of custody, or a
              certificate, that service must be specifically confirmed.
            </p>
          </section>

          <section>
            <h2>Batteries and hazardous conditions</h2>
            <p>
              Loose, damaged, swollen, leaking, or otherwise unsafe batteries require
              special handling. Do not place damaged batteries into a general
              electronics load without first confirming the safe route. EVER does not
              accept unidentified chemicals, general household trash, medical waste, or
              other material outside its published electronic-recycling scope.
            </p>
          </section>

          <section>
            <h2>Ownership and authority to transfer</h2>
            <p>
              By handing equipment to EVER, you represent that you own the equipment or
              have authority to transfer it for the requested service. Equipment known
              or reasonably suspected to be stolen may be refused.
            </p>
          </section>

          <section>
            <h2>Policy changes</h2>
            <p>
              Downstream markets, safety requirements, and operating capacity can
              change. EVER may update item acceptance, conditions, or fees prospectively.
              Check the website before a drop-off or large pickup rather than relying on
              an older copy of the policy.
            </p>
          </section>

          <div className={styles.policyLinks}>
            <Link href="/recycle">Check an item</Link>
            <Link href="/what-we-accept">View full accepted-material list</Link>
            <Link href="/business">Plan a business pickup</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
