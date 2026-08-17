import type { Metadata } from "next";
import Link from "next/link";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "Accessibility | EVER",
  description: "EVER's website accessibility statement for ElectronicRecycle.net.",
  alternates: { canonical: "/accessibility" },
};

export default function AccessibilityPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className="ever-shell">
          <h1>Accessibility</h1>
          <p>
            EVER wants ElectronicRecycle.net to be usable by as many people as possible,
            including people who use assistive technology.
          </p>
          <span className={styles.updated}>Last updated August 16, 2026</span>
        </div>
      </section>

      <section className={styles.body}>
        <div className={`ever-shell ${styles.content}`}>
          <section>
            <h2>Our approach</h2>
            <p>
              The site is built with semantic headings and landmarks, keyboard-accessible
              controls, visible focus states, labeled form fields, text alternatives
              where images convey information, and reduced-motion support.
            </p>
          </section>

          <section>
            <h2>Motion</h2>
            <p>
              Decorative animation is reduced or removed when a device or browser reports
              a preference for reduced motion. Critical information does not depend on an
              animation completing.
            </p>
          </section>

          <section>
            <h2>Forms</h2>
            <p>
              Website forms use visible labels, keyboard-operable controls, and text
              feedback for submission errors or success states. If you encounter a form
              that is difficult to use, please tell us.
            </p>
          </section>

          <section>
            <h2>Report an accessibility problem</h2>
            <p>
              Use the <Link href="/contact">Contact page</Link> and include the page,
              device, browser, and a short description of the issue if possible. EVER
              will use that information to investigate and improve the experience.
            </p>
          </section>
        </div>
      </section>
    </div>
  );
}
