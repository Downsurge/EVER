import type { Metadata } from "next";
import { AcceptanceCatalog } from "@/components/AcceptanceCatalog";
import { publishableCategories } from "@/data/accepted-items";
import styles from "../page.module.css";

export const metadata: Metadata = {
  title: "Electronics We Accept | E-Waste Recycling | EVER Arizona",
  description: "See which computers, laptops, servers, drives, monitors, TVs, phones, printers and other electronics EVER accepts for recycling and e-waste service.",
  alternates: { canonical: "/what-we-accept" },
};

export default function WhatWeAcceptPage() {
  const categories = publishableCategories();

  return (
    <div className={styles.catalogPage}>
      <section className={styles.catalogHero}>
        <div className={`ever-shell ${styles.catalogHeroGrid}`}>
          <div>
            <h1>What EVER accepts.</h1>
          </div>
          <div className={styles.catalogHeroCopy}>
            <p>
              This page is the maintained acceptance policy. The Recycle page helps you
              check one item quickly; this page lets you scan the whole operating scope.
            </p>
            <div className={styles.legend}>
              <span><i className={styles.legendStandard} /> Standard electronics</span>
              <span><i className={styles.legendSpecial} /> Special handling</span>
              <span><i className={styles.legendNo} /> Not currently accepted</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.catalogBody}>
        <div className="ever-shell">
          <AcceptanceCatalog categories={categories} />
        </div>
      </section>
    </div>
  );
}
