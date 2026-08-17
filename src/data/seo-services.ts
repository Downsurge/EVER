import type { MarketKey } from "./markets";
import { markets } from "./markets";
export type SeoService = {
  readonly slug: string;
  readonly title: string;
  readonly h1: string;
  readonly description: string;
  readonly image: string;
  readonly imageAlt: string;
  readonly intro: string;
  readonly bullets: readonly string[];
  readonly sections: readonly { heading: string; body: string }[];
  readonly faqs: readonly { question: string; answer: string }[];
  readonly related: readonly string[];
};

export const seoServices: readonly SeoService[] = [
  {
    slug: "electronic-recycling",
    title: "Electronic Recycling & E-Waste Recycling in Arizona | EVER",
    h1: "Electronic recycling for Arizona homes and businesses.",
    description: "Recycle electronics and e-waste with EVER. Free drop-off for most accepted electronics plus residential and commercial pickup across Arizona.",
    image: "/brand/electronic-recycling-arizona.svg",
    imageAlt: "Laptop prepared for electronic recycling with EVER",
    intro: "EVER handles old computers, laptops, servers, networking equipment, drives, phones, monitors, printers, gaming systems, cables, and other accepted electronics. Residents can check items online before drop-off, while businesses can build a pickup request for larger loads.",
    bullets: [
      "Free drop-off for most accepted electronics",
      "Residential electronics pickup available for a distance-based fee",
      "Free commercial pickup with at least 10 qualifying items",
      "$15 per LED TV; CRT televisions are not accepted",
    ],
    sections: [
      { heading: "What counts as electronic waste?", body: "Electronic waste, often called e-waste, includes retired or unwanted electronic equipment such as computers, laptops, servers, networking hardware, phones, tablets, monitors, printers, storage drives, gaming systems, and related accessories. EVER publishes an item-by-item acceptance list so customers can check the current route before bringing equipment." },
      { heading: "Residential electronic recycling", body: "Residents can use EVER's item checker to confirm whether an item is accepted and whether a fee applies. Free drop-off is available for most accepted electronics. Residential pickup is also available, with pricing based on distance." },
      { heading: "Business electronic recycling", body: "Businesses can request pickup for office electronics, retired IT equipment, servers, networking gear, monitors, drives, and mixed technology loads. Commercial pickup is free with at least 10 qualifying items. Smaller loads can use free drop-off or request a distance-based pickup." },
    ],
    faqs: [
      { question: "What electronics does EVER recycle?", answer: "EVER accepts many common electronics including computers, laptops, servers, networking equipment, hard drives, phones, tablets, monitors, printers, gaming systems, cables, and computer components. Check the What We Accept page for the current item-by-item policy." },
      { question: "Is electronic recycling drop-off free?", answer: "Drop-off is free for most accepted electronics. Published item fees still apply where listed, including the $15 LED TV fee." },
      { question: "Does EVER pick up electronics?", answer: "Yes. Residential pickup is available for a distance-based fee. Commercial pickup is free with at least 10 qualifying items; smaller commercial loads can use drop-off or a distance-based pickup." },
    ],
    related: ["e-waste-recycling", "computer-recycling", "business-electronics-recycling", "electronics-pickup"],
  },
  {
    slug: "e-waste-recycling",
    title: "E-Waste Recycling & Electronics Disposal in Arizona | EVER",
    h1: "E-waste recycling without the guesswork.",
    description: "E-waste recycling for computers, laptops, servers, drives, monitors and more across the East Valley, Phoenix and Florence, Arizona.",
    image: "/brand/e-waste-recycling-arizona.svg",
    imageAlt: "Electronic networking equipment prepared for e-waste recycling",
    intro: "E-waste should be sorted by what the equipment actually is, not treated like ordinary trash. EVER helps residents and businesses identify accepted electronics, understand item-specific fees, and choose drop-off or pickup.",
    bullets: [
      "Electronics and e-waste item checker",
      "Business e-waste pickup for qualifying loads",
      "Residential e-waste pickup based on distance",
      "Published acceptance rules before you travel",
    ],
    sections: [
      { heading: "E-waste recycling for residents", body: "Use the online item checker for computers, phones, monitors, televisions, printers, gaming systems, batteries, cables, and other electronics. The current acceptance status, preparation notes, and any published fee appear before you choose your next step." },
      { heading: "Commercial e-waste recycling", body: "EVER works with businesses that need to clear retired office electronics or IT equipment. Ten or more qualifying items may qualify for free commercial pickup. Smaller loads can use free drop-off or request pickup priced by distance." },
      { heading: "Reuse and recovery before recycling", body: "Some electronics may still have useful components or recovery value. EVER's process separates evaluation, reuse, recovery, and recycling so working or recoverable technology does not automatically enter the same material stream." },
    ],
    faqs: [
      { question: "What is e-waste?", answer: "E-waste is unwanted or retired electronic equipment such as computers, laptops, servers, phones, monitors, storage drives, printers, networking equipment, gaming systems, and related accessories." },
      { question: "Can a business schedule e-waste pickup?", answer: "Yes. EVER offers commercial e-waste pickup. Loads with at least 10 qualifying items may qualify for free pickup." },
      { question: "Does EVER accept CRT televisions?", answer: "No. CRT televisions and CRT monitors are not accepted." },
    ],
    related: ["electronic-recycling", "business-electronics-recycling", "electronics-pickup", "tv-recycling"],
  },
  {
    slug: "computer-recycling",
    title: "Computer Recycling & PC Recycling in Arizona | EVER",
    h1: "Computer recycling for desktops, workstations, and office PCs.",
    description: "Recycle desktop computers, workstations, PC components and business computer equipment with EVER across Arizona's East Valley, Phoenix and Florence.",
    image: "/brand/computer-recycling-arizona.svg",
    imageAlt: "Computer prepared for PC and computer recycling",
    intro: "EVER accepts desktop computers and workstations as standard electronics. Residents can use free drop-off for accepted computers, while businesses with larger quantities can request commercial pickup.",
    bullets: [
      "Desktop computer and workstation recycling",
      "Computer component recycling",
      "Business computer pickup for qualifying loads",
      "Free drop-off for accepted computers",
    ],
    sections: [
      { heading: "Recycle old desktop computers", body: "Old desktop PCs and workstations can take up significant space at home or in an office. EVER accepts desktop computers and many related computer components, making it easier to move retired equipment into an appropriate reuse, recovery, or recycling route." },
      { heading: "Office computer recycling", body: "Businesses replacing multiple computers can submit the equipment mix and approximate quantity through EVER's pickup workflow. Commercial pickup is free with at least 10 qualifying items." },
      { heading: "Before recycling a computer", body: "Back up files you need and remove personal or business data unless a specific data-handling service has been confirmed. Standard electronics recycling should not be assumed to include certified data destruction." },
    ],
    faqs: [
      { question: "Does EVER recycle desktop computers?", answer: "Yes. Desktops and workstations are accepted as standard electronics under EVER's current acceptance policy." },
      { question: "Can EVER pick up old office computers?", answer: "Yes. Commercial pickup is available, and loads with at least 10 qualifying items may qualify for free pickup." },
      { question: "Is computer drop-off free?", answer: "Drop-off is free for accepted desktop computers and workstations under the current policy." },
    ],
    related: ["laptop-recycling", "hard-drive-recycling", "business-electronics-recycling", "electronic-recycling"],
  },
  {
    slug: "laptop-recycling",
    title: "Laptop Recycling & Old Laptop Disposal in Arizona | EVER",
    h1: "Recycle old laptops with EVER.",
    description: "Laptop recycling for residents and businesses across Gilbert, Mesa, Chandler, Queen Creek, Tempe, Phoenix, San Tan Valley and Florence, Arizona.",
    image: "/brand/laptop-recycling-arizona.svg",
    imageAlt: "Laptop ready for recycling and electronics recovery",
    intro: "Laptops are accepted as standard electronics. EVER gives residents a simple drop-off path and businesses a pickup workflow for larger laptop refreshes or mixed IT equipment loads.",
    bullets: [
      "Laptop recycling with no recycling fee under the current policy",
      "Business pickup for laptop refreshes and mixed IT loads",
      "Free drop-off for accepted laptops",
      "Residential pickup available based on distance",
    ],
    sections: [
      { heading: "Laptop recycling for residents", body: "If you have one or a few old laptops, check the current item policy online and use the drop-off route for accepted devices. Residential pickup is available when convenience matters, with a fee based on distance." },
      { heading: "Bulk laptop recycling for businesses", body: "Businesses replacing laptops can request pickup for the retired equipment. Ten or more qualifying items may qualify for free commercial pickup." },
      { heading: "Data on old laptops", body: "Laptops may contain personal or confidential information. Back up and remove data before recycling unless EVER has specifically confirmed a separate data-handling service for your load." },
    ],
    faqs: [
      { question: "Does EVER accept old laptops?", answer: "Yes. Laptops are accepted under EVER's current standard electronics policy." },
      { question: "Is laptop recycling free?", answer: "There is currently no recycling fee for accepted laptops. Pickup fees may still apply based on the pickup type and distance." },
      { question: "Can a business recycle many laptops at once?", answer: "Yes. Businesses can submit a pickup request, and loads with at least 10 qualifying items may qualify for free commercial pickup." },
    ],
    related: ["computer-recycling", "hard-drive-recycling", "business-electronics-recycling", "e-waste-recycling"],
  },
  {
    slug: "tv-recycling",
    title: "TV Recycling & LED TV Recycling in Arizona | EVER",
    h1: "LED TV recycling for $15 per television.",
    description: "Recycle flat-screen LED TVs with EVER for $15 per TV. CRT and tube televisions are not accepted. Residential pickup is available based on distance.",
    image: "/brand/tv-recycling-arizona.svg",
    imageAlt: "Flat screen television prepared for LED TV recycling",
    intro: "EVER accepts flat-screen LED televisions for a $15 recycling fee per TV. CRT televisions and CRT monitors are not accepted. Keep screens intact during transport.",
    bullets: [
      "$15 per LED TV",
      "Flat-screen LED TVs accepted",
      "CRT and tube TVs not accepted",
      "Residential pickup available for a distance-based fee",
    ],
    sections: [
      { heading: "Flat-screen and LED TV recycling", body: "Flat-screen LED televisions are accepted for $15 per television. Bring the stand or power cable if you still have them, and keep the screen intact during transport." },
      { heading: "CRT and tube TVs", body: "EVER does not accept CRT televisions or CRT monitors. Tube displays require a different downstream route, so use a CRT-specific recycling or household hazardous waste program instead." },
      { heading: "TV pickup", body: "Residential pickup is available and is priced based on distance. The $15 LED TV recycling fee still applies in addition to any pickup charge." },
    ],
    faqs: [
      { question: "How much does EVER charge to recycle an LED TV?", answer: "The recycling fee is $15 per LED TV." },
      { question: "Does EVER take CRT or tube TVs?", answer: "No. CRT televisions and CRT monitors are not accepted." },
      { question: "Can EVER pick up a TV from my home?", answer: "Yes. Residential pickup is available for a distance-based fee. The LED TV recycling fee also applies." },
    ],
    related: ["electronic-recycling", "electronics-pickup", "e-waste-recycling"],
  },
  {
    slug: "server-recycling",
    title: "Server Recycling & IT Equipment Recycling | EVER Arizona",
    h1: "Server and rack equipment recycling for Arizona businesses.",
    description: "Recycle servers, rack equipment, networking hardware and related IT equipment with EVER. Commercial pickup available across the East Valley, Phoenix and Florence.",
    image: "/brand/server-recycling-arizona.svg",
    imageAlt: "Rack servers prepared for server recycling and IT equipment recovery",
    intro: "Servers and rack equipment are accepted as standard electronics. EVER can evaluate commercial server loads for reuse, recovery, parts, or recycling before the final route is chosen.",
    bullets: [
      "Server and rack equipment recycling",
      "Networking hardware accepted",
      "Commercial pickup for qualifying loads",
      "Evaluation for potential reuse or recovery",
    ],
    sections: [
      { heading: "Recycle retired servers", body: "Retired servers can contain reusable components, recoverable parts, and recyclable material. EVER evaluates equipment before deciding whether it belongs in reuse, recovery, parts, or material recycling." },
      { heading: "Business and IT equipment pickup", body: "Server refreshes often involve multiple systems plus switches, routers, storage, UPS equipment, cables, and monitors. Businesses can describe the full load in one pickup request. Ten or more qualifying items may qualify for free commercial pickup." },
      { heading: "Server data", body: "Do not assume standard server recycling includes certified data destruction. If your business requires sanitization, chain of custody, serialized reporting, witnessed destruction, or certificates, confirm those requirements before pickup." },
    ],
    faqs: [
      { question: "Does EVER recycle servers?", answer: "Yes. Servers and rack equipment are accepted under EVER's current standard electronics policy." },
      { question: "Can EVER pick up a server room or IT closet?", answer: "Yes. Commercial pickup is available for mixed IT equipment loads. Ten or more qualifying items may qualify for free pickup." },
      { question: "Does server recycling include certified data destruction?", answer: "Not automatically. Any specific data sanitization, destruction, chain-of-custody, or certificate requirement must be confirmed separately." },
    ],
    related: ["hard-drive-recycling", "business-electronics-recycling", "computer-recycling", "electronics-pickup"],
  },
  {
    slug: "hard-drive-recycling",
    title: "Hard Drive Recycling & SSD Recycling in Arizona | EVER",
    h1: "Hard drive and SSD recycling.",
    description: "Recycle hard drives and SSDs with EVER across Arizona's East Valley, Phoenix and Florence. Business pickup available for qualifying electronic equipment loads.",
    image: "/brand/hard-drive-recycling-arizona.svg",
    imageAlt: "Hard drives and SSDs prepared for electronics recycling",
    intro: "Hard drives and SSDs are accepted electronics. They can be included with computers, servers, laptops, or mixed business equipment loads, or handled as individual accepted items.",
    bullets: [
      "Hard drive recycling",
      "SSD and storage device recycling",
      "Business pickup for mixed IT loads",
      "Data handling requirements must be confirmed separately",
    ],
    sections: [
      { heading: "Hard drive recycling and SSD recycling", body: "EVER accepts hard disk drives and solid-state drives as standard electronics. Hard drive recycling and SSD recycling can be part of a larger computer or server load or handled as individual accepted items." },
      { heading: "Business storage-device recycling", body: "Businesses retiring computers, servers, and storage devices can submit one pickup brief for the entire load. Commercial pickup is free with at least 10 qualifying items." },
      { heading: "Data destruction is a separate requirement", body: "Recycling a drive is not the same as agreeing to certified data destruction. If your organization requires sanitization, serialized reporting, chain of custody, witnessed destruction, or a certificate, specify those needs before handing over equipment." },
    ],
    faqs: [
      { question: "Does EVER recycle hard drives?", answer: "Yes. Hard drives and SSDs are accepted under the current standard electronics policy." },
      { question: "Can hard drives be included with a business pickup?", answer: "Yes. Drives can be included with computers, servers, networking equipment, or other qualifying electronics." },
      { question: "Does EVER automatically wipe or destroy every drive?", answer: "No. Do not assume standard recycling includes certified data sanitization or destruction. Confirm any data-handling requirement separately." },
    ],
    related: ["server-recycling", "computer-recycling", "business-electronics-recycling", "electronic-recycling"],
  },
  {
    slug: "business-electronics-recycling",
    title: "Business Electronics Recycling & E-Waste Pickup | EVER",
    h1: "Business electronics recycling and commercial e-waste pickup.",
    description: "Commercial electronics recycling for computers, laptops, servers, networking gear, drives and office electronics. Free pickup with 10 qualifying items.",
    image: "/brand/business-electronics-recycling-arizona.svg",
    imageAlt: "Commercial servers and electronics prepared for business electronics recycling",
    intro: "EVER helps businesses clear retired computers, laptops, servers, networking equipment, drives, monitors, printers, phones, and mixed office electronics. Commercial pickup is free with at least 10 qualifying items.",
    bullets: [
      "Free commercial pickup with 10 qualifying items",
      "Mixed office and IT equipment accepted",
      "Smaller loads can use free drop-off or distance-based pickup",
      "Equipment can be evaluated for reuse or recovery before recycling",
    ],
    sections: [
      { heading: "Commercial electronics recycling", body: "Businesses can submit one request for mixed retired technology instead of handling each item separately. EVER's intake flow captures equipment categories, approximate quantity, and priorities for the load." },
      { heading: "Free business e-waste pickup", body: "Commercial pickup is free when the load contains at least 10 qualifying items. Smaller commercial loads can use free drop-off for accepted electronics or request pickup priced by distance." },
      { heading: "Office cleanouts and technology refreshes", body: "The commercial workflow can handle laptops, desktops, servers, networking gear, drives, monitors, printers, phones, tablets, computer components, and mixed office electronics. Describe the load as accurately as possible so EVER can confirm the route before scheduling." },
    ],
    faqs: [
      { question: "How many items are needed for free business pickup?", answer: "At least 10 qualifying items are required for free commercial pickup." },
      { question: "What if my business has fewer than 10 items?", answer: "Smaller commercial loads can use free drop-off for accepted electronics or request a pickup with a fee based on distance." },
      { question: "Can EVER handle mixed office electronics?", answer: "Yes. Businesses can include mixed computers, laptops, servers, networking equipment, drives, monitors, printers, phones, and other accepted electronics in one request." },
    ],
    related: ["electronics-pickup", "server-recycling", "computer-recycling", "e-waste-recycling"],
  },
  {
    slug: "electronics-pickup",
    title: "Electronics Pickup & E-Waste Pickup in Arizona | EVER",
    h1: "Electronics pickup for homes and businesses.",
    description: "Residential and commercial electronics pickup across the East Valley, Phoenix and Florence. Free business pickup with 10 qualifying items.",
    image: "/brand/electronics-pickup-arizona.svg",
    imageAlt: "Electronics prepared for residential and commercial e-waste pickup",
    intro: "EVER offers electronics pickup for residents and businesses. Commercial pickup is free with at least 10 qualifying items. Residential pickup and smaller commercial pickups are priced by distance.",
    bullets: [
      "Residential electronics pickup available",
      "Free commercial pickup with 10 qualifying items",
      "Distance-based pickup pricing for smaller loads",
      "Free drop-off for most accepted electronics",
    ],
    sections: [
      { heading: "Residential electronics pickup", body: "Residents can request pickup for accepted electronics when transporting the equipment is inconvenient. Pricing depends on distance. Send your ZIP code and item list so EVER can confirm the pickup fee." },
      { heading: "Commercial electronics pickup", body: "Businesses with at least 10 qualifying items receive free commercial pickup. The pickup brief lets you identify the equipment, rough quantity, and priorities before EVER follows up." },
      { heading: "Drop-off instead of pickup", body: "Free drop-off is available for most accepted electronics. Item-specific fees still apply where published, including the $15 LED TV recycling fee." },
    ],
    faqs: [
      { question: "Is residential electronics pickup free?", answer: "Residential pickup has a fee based on distance." },
      { question: "When is commercial electronics pickup free?", answer: "Commercial pickup is free with at least 10 qualifying items." },
      { question: "Can I drop electronics off instead?", answer: "Yes. Free drop-off is available for most accepted electronics, subject to the current item policy and any published item-specific fee." },
    ],
    related: ["business-electronics-recycling", "electronic-recycling", "tv-recycling", "computer-recycling"],
  },
] as const;

function localizeText(value: string, market: MarketKey): string {
  if (market === "az") return value;
  return value
    .replaceAll("Free commercial pickup with 10 qualifying items", "Commercial pickup reviewed by load and location")
    .replaceAll("Commercial pickup is free with at least 10 qualifying items.", "Commercial pickup availability and any fee are confirmed after EPER reviews the equipment, quantity, and location.")
    .replaceAll("Businesses with at least 10 qualifying items receive free commercial pickup.", "EPER reviews business pickup requests by equipment mix, quantity, access, and location before scheduling.")
    .replaceAll("Ten or more qualifying items may qualify for free commercial pickup.", "Commercial pickup availability is confirmed after EPER reviews the load.")
    .replaceAll("Loads with at least 10 qualifying items may qualify for free pickup.", "Pickup availability is confirmed after EPER reviews the load.")
    .replaceAll("loads with at least 10 qualifying items may qualify for free pickup", "pickup availability is confirmed after EPER reviews the load")
    .replaceAll("free drop-off", "local drop-off")
    .replaceAll("Free drop-off", "Local drop-off")
    .replaceAll("EVER Arizona", "EPER El Paso")
    .replaceAll("| EVER", "| EPER")
    .replaceAll("EVER", "EPER")
    .replaceAll("Arizona's East Valley, Phoenix and Florence", "El Paso, Texas")
    .replaceAll("Arizona's East Valley, Phoenix, and Florence", "El Paso, Texas")
    .replaceAll("the East Valley, Phoenix and Florence", "El Paso")
    .replaceAll("the East Valley, Phoenix, and Florence", "El Paso")
    .replaceAll("East Valley, Phoenix and Florence", "El Paso")
    .replaceAll("East Valley, Phoenix, and Florence", "El Paso")
    .replaceAll("Gilbert, Mesa, Chandler, Queen Creek, Tempe, Phoenix, San Tan Valley and Florence, Arizona", "El Paso, Texas")
    .replaceAll("across Arizona", "across El Paso")
    .replaceAll("for Arizona homes and businesses", "for El Paso homes and businesses")
    .replaceAll("for Arizona businesses", "for El Paso businesses")
    .replaceAll("in Arizona", "in El Paso TX")
    .replaceAll("Arizona", "Texas");
}

export function getMarketSeoServices(market: MarketKey): readonly SeoService[] {
  if (market === "az") return seoServices;
  return seoServices.map((service) => ({
    ...service,
    title: (() => {
      const localized = localizeText(service.title, market);
      if (localized.toLowerCase().includes("el paso")) return localized;
      const parts = localized.split("|");
      return `${parts[0]?.trim()} in El Paso TX | EPER`;
    })(),
    h1: localizeText(service.h1, market),
    description: localizeText(service.description, market),
    image: service.image.replace("-arizona.svg", "-el-paso.svg"),
    imageAlt: localizeText(service.imageAlt, market),
    intro: localizeText(service.intro, market),
    bullets: service.bullets.map((item) => localizeText(item, market)),
    sections: service.sections.map((section) => ({ heading: localizeText(section.heading, market), body: localizeText(section.body, market) })),
    faqs: service.faqs.map((item) => ({ question: localizeText(item.question, market), answer: localizeText(item.answer, market) })),
  }));
}

export function getSeoService(market: MarketKey, slug: string): SeoService | undefined {
  return getMarketSeoServices(market).find((service) => service.slug === slug);
}

export function marketServicesIntro(market: MarketKey): string {
  const cfg = markets[market];
  return `${cfg.brandShort} provides electronics recycling, e-waste recycling, computer and IT equipment recycling, and pickup options for ${cfg.region}.`;
}
