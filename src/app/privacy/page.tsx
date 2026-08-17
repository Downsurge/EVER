import type { Metadata } from "next";
import Link from "next/link";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "Privacy Policy | EVER",
  description: "How EVER handles information submitted through ElectronicRecycle.net.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className="ever-shell">
          <h1>Privacy Policy</h1>
          <p>
            This policy explains what information ElectronicRecycle.net collects,
            how EVER uses it, and the choices available to you.
          </p>
          <span className={styles.updated}>Last updated August 16, 2026</span>
        </div>
      </section>

      <section className={styles.body}>
        <div className={`ever-shell ${styles.content}`}>
          <section>
            <h2>Information we collect</h2>
            <p>
              You can browse the site and use the electronics item checker without
              creating an account. When you submit a business pickup or contact request,
              we may collect the information you choose to provide, such as your name,
              company, email address, phone number, ZIP code, equipment details, pickup
              priorities, and notes.
            </p>
            <p>
              Our hosting and security providers may also process routine technical
              information such as IP address, browser type, request logs, and similar
              data needed to deliver and protect the website.
            </p>
          </section>

          <section>
            <h2>How we use information</h2>
            <ul>
              <li>Respond to questions and pickup requests.</li>
              <li>Evaluate equipment and plan collection or recycling services.</li>
              <li>Operate, secure, troubleshoot, and improve the website and services.</li>
              <li>Maintain records reasonably necessary for business, safety, and compliance purposes.</li>
              <li>Prevent spam, fraud, abuse, or misuse of the website.</li>
            </ul>
          </section>

          <section>
            <h2>How information is shared</h2>
            <p>
              EVER does not sell personal information. Information may be shared with
              service providers that help us operate the website, send email, host data,
              or perform other business functions on our behalf. We may also disclose
              information when reasonably necessary to comply with law, protect rights
              or safety, investigate abuse, or complete a transaction you requested.
            </p>
          </section>

          <section>
            <h2>Email delivery</h2>
            <p>
              Website forms may use a third-party transactional email provider to deliver
              your request to EVER. The provider processes the submitted information only
              as needed to transmit and operate that service, subject to its own terms and
              privacy practices.
            </p>
          </section>

          <section>
            <h2>Cookies and analytics</h2>
            <p>
              This build does not require an account or advertising cookie to use the
              item checker. If EVER later adds analytics, advertising pixels, or other
              tracking technologies, this policy should be updated before those tools
              are enabled and any consent mechanism required by applicable law should be
              implemented.
            </p>
          </section>

          <section>
            <h2>Retention and security</h2>
            <p>
              EVER keeps submitted information only as long as reasonably needed for the
              purpose it was collected, business records, dispute resolution, or legal
              obligations. We use reasonable administrative and technical safeguards,
              but no online system can guarantee absolute security.
            </p>
          </section>

          <section>
            <h2>Your choices</h2>
            <p>
              You may ask EVER to review, correct, or delete information you submitted,
              subject to records we may need to retain for legitimate business or legal
              reasons. Use the <Link href="/contact">Contact page</Link> for a privacy
              request and identify it as a privacy request.
            </p>
          </section>

          <section>
            <h2>Children</h2>
            <p>
              The website is intended for general audiences and business users, not for
              children to submit personal information on their own.
            </p>
          </section>

          <section>
            <h2>Changes to this policy</h2>
            <p>
              We may update this policy as the website, services, or legal requirements
              change. The date above will be revised when a material update is published.
            </p>
          </section>

          <p className={styles.notice}>
            This policy is designed to describe the website practices in this build.
            It should be reviewed if EVER adds advertising tracking, customer accounts,
            payments, new data services, or operations outside the current service model.
          </p>
        </div>
      </section>
    </div>
  );
}
