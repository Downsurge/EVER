import type { Metadata } from "next";
import Link from "next/link";
import { contact } from "@/data/site";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "Electronics Recycling & E-Waste FAQ | EVER Arizona",
  description: "Answers about electronics recycling, e-waste, computer recycling, TV recycling, residential pickup, commercial pickup, drop-off and EVER service areas in Arizona.",
  alternates: { canonical: "/faq" },
};

const questions = [
  { q: "What electronics does EVER accept?", a: "EVER accepts many common electronics including laptops, desktops, servers, networking equipment, hard drives, SSDs, phones, tablets, monitors, computer components, printers, gaming systems, cables, power equipment, cameras, and audio/video equipment. Check the What We Accept page for the current item-by-item policy." },
  { q: "Does EVER provide electronics recycling and e-waste recycling in Arizona?", a: "Yes. EVER serves Gilbert, Chandler, Queen Creek, San Tan Valley, Mesa, Tempe, Phoenix, and Florence for residential and commercial electronics recycling and pickup." },
  { q: "Can I recycle old computers and laptops with EVER?", a: "Yes. Desktops, workstations, laptops, servers, hard drives, SSDs, networking equipment, and many computer components are accepted under the current policy." },
  { q: "How much does it cost to recycle an LED TV?", a: "LED televisions are $15 per TV. Keep the screen intact when transporting it." },
  { q: "Does EVER accept CRT or tube TVs?", a: "No. EVER does not accept CRT televisions or CRT monitors." },
  { q: "Is commercial electronics pickup free?", a: "Commercial electronics and e-waste pickup is free with at least 10 qualifying items. Smaller commercial loads can use free drop-off or a pickup with a fee based on distance." },
  { q: "Does EVER offer residential electronics pickup?", a: "Yes. Residential electronics and e-waste pickup is available. The pickup fee depends on distance, so send your ZIP code and item list for pricing." },
  { q: "Is electronics recycling drop-off free?", a: "Drop-off is free for most accepted electronics. Item-specific fees still apply where published, including the $15 LED TV fee. Contact EVER for current drop-off instructions." },
  { q: "Does EVER recycle servers and business IT equipment?", a: "Yes. EVER accepts servers, rack equipment, networking hardware, drives, computers, laptops, monitors and other accepted business electronics. Ten qualifying items may qualify for free commercial pickup." },
  { q: "Does EVER recycle hard drives and SSDs?", a: "Yes. Hard drives and SSDs are accepted electronics and can be included with computer, server, or mixed business equipment loads." },
  { q: "Does normal electronics recycling include certified data destruction?", a: "No. Do not assume standard recycling includes certified data destruction. If your business needs sanitization, serialized reporting, chain of custody, witnessed destruction, or certificates, that service must be specifically confirmed before pickup." },
  { q: "What cities does EVER serve?", a: "EVER serves Gilbert, Chandler, Queen Creek, San Tan Valley, Mesa, Tempe, Phoenix, and Florence, Arizona. Pickup availability and pricing depend on the load and distance." },
];

export default function FaqPage() {
  const faqSchema = { "@context":"https://schema.org", "@type":"FAQPage", mainEntity: questions.map((item)=>({ "@type":"Question", name:item.q, acceptedAnswer:{ "@type":"Answer", text:item.a } })) };
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <section className={styles.hero}><div className="ever-shell"><h1>Electronics Recycling FAQ</h1><p>Answers about e-waste recycling, computers, TVs, pickup, drop-off, and current EVER policies.</p></div></section>
      <section className={styles.body}><div className={`ever-shell ${styles.content}`}>
        {questions.map((item)=><section key={item.q}><h2>{item.q}</h2><p>{item.a}</p></section>)}
        <section><h2>Explore recycling services</h2><p><Link href="/services/electronic-recycling">Electronic recycling</Link>, <Link href="/services/computer-recycling">computer recycling</Link>, <Link href="/services/tv-recycling">TV recycling</Link>, <Link href="/services/business-electronics-recycling">business electronics recycling</Link>, and <Link href="/services/electronics-pickup">electronics pickup</Link>.</p></section>
        <section><h2>Still have a question?</h2><p>Call <a href={`tel:${contact.phone.value}`}>{contact.phone.value}</a>, email <a href={`mailto:${contact.email.value}`}>{contact.email.value}</a>, or use the <Link href="/contact">contact form</Link>.</p></section>
      </div></section>
    </div>
  );
}
