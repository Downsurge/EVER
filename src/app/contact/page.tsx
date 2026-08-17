import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { contact } from "@/data/site";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "Contact EVER",
  description: "Contact EVER about electronic recycling, business pickup, privacy, or accessibility.",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ subject?: string }>;
}) {
  const params = await searchParams;
  const allowedSubjects = new Set([
    "General question",
    "Residential recycling question",
    "Residential pickup request",
    "Business pickup question",
    "Privacy request",
    "Accessibility issue",
  ]);
  const initialSubject = params.subject && allowedSubjects.has(params.subject)
    ? params.subject
    : "";
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className="ever-shell">
          <h1>Contact EVER</h1>
          <p>
            For a commercial equipment load, the business pickup form is the fastest
            route. For everything else, send a message below.
          </p>
          <div className={styles.policyLinks}>
            <a href={`tel:${contact.phone.value}`}>{contact.phone.value}</a>
            <a href={`mailto:${contact.email.value}`}>{contact.email.value}</a>
            <Link href="/business">Plan a business pickup</Link>
            <Link href="/recycle">Check a residential item</Link>
          </div>
        </div>
      </section>

      <section className={styles.body}>
        <div className={`ever-shell ${styles.content}`}>
          <ContactForm initialSubject={initialSubject} />
        </div>
      </section>
    </div>
  );
}
