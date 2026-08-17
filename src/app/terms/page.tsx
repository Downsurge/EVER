import type { Metadata } from "next";
import Link from "next/link";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "Terms of Service | EVER",
  description: "Terms governing use of ElectronicRecycle.net and EVER website requests.",
};

export default function TermsPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className="ever-shell">
          <h1>Terms of Service</h1>
          <p>
            These terms govern use of ElectronicRecycle.net and requests submitted
            through the EVER website.
          </p>
          <span className={styles.updated}>Last updated August 16, 2026</span>
        </div>
      </section>

      <section className={styles.body}>
        <div className={`ever-shell ${styles.content}`}>
          <section>
            <h2>Website information</h2>
            <p>
              EVER provides website information to help users understand electronic
              recycling options, current acceptance rules, and commercial pickup
              services. Website content is general information and may change as
              operating policies, downstream options, or service availability change.
            </p>
          </section>

          <section>
            <h2>Acceptance is not guaranteed</h2>
            <p>
              An item shown as accepted is still subject to the current
              <Link href="/acceptance-policy"> Acceptance Policy</Link>, its actual
              condition, quantity, safety concerns, applicable fees, and any other
              published conditions. EVER may refuse material that is unsafe,
              misidentified, contaminated, outside its operating scope, or materially
              different from what was disclosed.
            </p>
          </section>

          <section>
            <h2>Pickup requests</h2>
            <p>
              Submitting a business pickup request does not create a confirmed
              appointment, price, contract, or guaranteed collection. A pickup is
              confirmed only after EVER accepts the request and the parties agree on
              the applicable details.
            </p>
          </section>

          <section>
            <h2>Value recovery</h2>
            <p>
              Evaluation for reuse, resale, parts recovery, or other value recovery is
              not a promise that equipment has value and is not a promise of payment.
              Any purchase, revenue share, credit, or other compensation must be
              separately agreed in writing.
            </p>
          </section>

          <section>
            <h2>Data-bearing devices</h2>
            <p>
              Unless EVER expressly agrees in writing to a specific data sanitization
              or destruction service, customers remain responsible for backing up,
              removing, or otherwise protecting data before handing over devices.
              Do not assume ordinary recycling automatically includes certified data
              destruction.
            </p>
          </section>

          <section>
            <h2>Safe and lawful use</h2>
            <p>
              You may not use the website to submit false information, interfere with
              website operation, transmit malicious code, impersonate another person or
              business, or arrange disposal of material you do not have the right to
              transfer.
            </p>
          </section>

          <section>
            <h2>Third-party services and links</h2>
            <p>
              The website may use or link to third-party services. EVER is not
              responsible for third-party websites, systems, or policies outside its
              control.
            </p>
          </section>

          <section>
            <h2>No warranty on website availability</h2>
            <p>
              The website is provided on an “as available” basis. EVER does not promise
              uninterrupted operation or that every item description will remain
              current indefinitely. The maintained acceptance page should be checked
              before relying on an older screenshot, search result, or saved page.
            </p>
          </section>

          <section>
            <h2>Contact</h2>
            <p>
              Questions about these terms can be submitted through the
              <Link href="/contact"> Contact page</Link>.
            </p>
          </section>

          <p className={styles.notice}>
            These website terms are a practical operating draft for EVER and should be
            reviewed by qualified counsel before launch if the business begins handling
            high-value ITAD contracts, certified data destruction, payments, equipment
            purchases, or other services that create additional contractual risk.
          </p>
        </div>
      </section>
    </div>
  );
}
