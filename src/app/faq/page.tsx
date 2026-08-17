import type { Metadata } from "next";
import Link from "next/link";
import { contact } from "@/data/site";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "Electronic Recycling FAQ | EVER",
  description: "Answers about EVER drop-off, residential pickup, commercial pickup, TV fees, CRT televisions, and electronic recycling in Arizona's East Valley.",
};

const questions = [
  { q: "What electronics does EVER accept?", a: "EVER accepts many common electronics including laptops, desktops, servers, networking equipment, hard drives, phones, tablets, monitors, computer components, printers, gaming systems, cables, power equipment, cameras, and audio/video equipment. Check the What We Accept page for the current item-by-item policy." },
  { q: "How much does it cost to recycle an LED TV?", a: "LED televisions are $15 per TV. Keep the screen intact when transporting it." },
  { q: "Does EVER accept CRT or tube TVs?", a: "No. EVER does not accept CRT televisions or CRT monitors." },
  { q: "Is commercial pickup free?", a: "Commercial pickup is free with at least 10 qualifying items. Smaller commercial loads can use free drop-off or a pickup with a fee based on distance." },
  { q: "Does EVER offer residential pickup?", a: "Yes. Residential pickup is available across the East Valley. The pickup fee depends on distance, so send your ZIP code and item list for pricing." },
  { q: "Is drop-off free?", a: "Drop-off is free for most accepted electronics. Item-specific fees still apply where published, including the $15 LED TV fee. Contact EVER for current drop-off instructions." },
  { q: "What areas does EVER serve?", a: "EVER serves Arizona's East Valley, including Gilbert, Mesa, Chandler, Queen Creek, Tempe, and San Tan Valley." },
  { q: "Does normal recycling include certified data destruction?", a: "No. Do not assume standard recycling includes certified data destruction. If your business needs sanitization, serialized reporting, chain of custody, witnessed destruction, or certificates, that service must be specifically confirmed before pickup." },
];

export default function FaqPage() {
  const faqSchema = { "@context":"https://schema.org", "@type":"FAQPage", mainEntity: questions.map((item)=>({ "@type":"Question", name:item.q, acceptedAnswer:{ "@type":"Answer", text:item.a } })) };
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <section className={styles.hero}><div className="ever-shell"><h1>Frequently Asked Questions</h1><p>Quick answers about electronics, pickup, drop-off, and current EVER policies.</p></div></section>
      <section className={styles.body}><div className={`ever-shell ${styles.content}`}>
        {questions.map((item)=><section key={item.q}><h2>{item.q}</h2><p>{item.a}</p></section>)}
        <section><h2>Still have a question?</h2><p>Call <a href={`tel:${contact.phone.value}`}>{contact.phone.value}</a>, email <a href={`mailto:${contact.email.value}`}>{contact.email.value}</a>, or use the <Link href="/contact">contact form</Link>.</p></section>
      </div></section>
    </div>
  );
}
