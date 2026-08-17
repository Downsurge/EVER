/**
 * EVER service-area content.
 *
 * City pages describe pickup/drop-off availability without inventing a street
 * address. Each page has distinct local copy so the service-area architecture
 * helps users rather than acting as duplicated doorway pages.
 */

import { Fact, isPublishable, operatorSupplied, verified } from "./verification";
import type { MarketKey } from "./markets";

export const serviceAreaStatement: Fact<string> = operatorSupplied(
  "EVER serves Arizona's East Valley plus Phoenix and Florence.",
  "Operator-defined service area, 2026-08-17.",
);

export type CityCoverage = {
  readonly residentialDropOff: Fact<{ readonly available: boolean; readonly destination: string }>;
  readonly commercialPickup: Fact<{ readonly available: boolean }>;
};

export type City = {
  readonly market: MarketKey;
  readonly slug: string;
  readonly name: string;
  readonly county: string;
  readonly coverage: CityCoverage;
  readonly pageTitle: Fact<string>;
  readonly metaDescription: Fact<string>;
  readonly localNotes: Fact<readonly string[]>;
  readonly localQuestions: Fact<readonly { readonly question: string; readonly answer: string }[]>;
  readonly neighbors: readonly string[];
};

const pickupCoverage = (market: MarketKey = "az"): CityCoverage => ({
  residentialDropOff: operatorSupplied(
    market === "az"
      ? { available: true, destination: "Contact EVER for current drop-off instructions." }
      : { available: true, destination: "Contact EPER for current handoff instructions." },
    market === "az"
      ? "Operator confirmation, 2026-08-17: free drop-off is available for eligible Arizona electronics; no public street address supplied yet."
      : "EPER market copied from the shared electronics-recycling site structure. El Paso handoff details must be confirmed locally before scheduling.",
  ),
  commercialPickup: operatorSupplied(
    { available: true },
    market === "az"
      ? "Commercial/business pickup is part of EVER's Arizona service model."
      : "Commercial/business pickup requests are enabled for EPER; pricing and scheduling are confirmed per load.",
  ),
});

const cityCopy = (
  title: string,
  meta: string,
  notes: readonly string[],
  questions: readonly { question: string; answer: string }[],
) => ({
  pageTitle: verified(title, "Operator sign-off, 2026-08-17: city page titles approved."),
  metaDescription: verified(meta, "Operator sign-off, 2026-08-17: city page descriptions approved."),
  localNotes: verified(notes, "Operator sign-off, 2026-08-17: local city content approved."),
  localQuestions: verified(questions, "City-specific FAQ copy using operator-confirmed pickup and acceptance policies."),
});

export const cities: readonly City[] = [
  {
    market: "az",
    slug: "gilbert",
    name: "Gilbert",
    county: "Maricopa County",
    coverage: pickupCoverage(),
    ...cityCopy(
      "Electronics Recycling Gilbert AZ | E-Waste Pickup | EVER",
      "Electronics recycling in Gilbert, AZ for computers, laptops, servers, TVs and e-waste. Free drop-off for most accepted items and pickup options from EVER.",
      [
        "Gilbert is part of EVER's core East Valley electronics recycling and e-waste pickup area.",
        "Residents can check individual electronics online, use free drop-off for most accepted items, or request residential pickup priced by distance.",
        "Gilbert businesses with at least 10 qualifying electronics may qualify for free commercial pickup for computers, laptops, servers, networking equipment, drives, monitors, and other accepted technology.",
      ],
      [
        { question: "Where can I recycle electronics in Gilbert, AZ?", answer: "EVER serves Gilbert for electronics recycling. Check your item online first, then use the current drop-off instructions or request pickup." },
        { question: "Does EVER offer free business e-waste pickup in Gilbert?", answer: "Yes. Commercial pickup is free with at least 10 qualifying items. Smaller loads can use free drop-off or a distance-based pickup." },
        { question: "Does EVER recycle TVs in Gilbert?", answer: "Flat-screen LED TVs are accepted for $15 per TV. CRT and tube televisions are not accepted." },
      ],
    ),
    neighbors: ["chandler", "mesa", "queen-creek", "phoenix"],
  },
  {
    market: "az",
    slug: "chandler",
    name: "Chandler",
    county: "Maricopa County",
    coverage: pickupCoverage(),
    ...cityCopy(
      "Electronics Recycling Chandler AZ | E-Waste Pickup | EVER",
      "Recycle computers, laptops, servers, hard drives and electronics in Chandler, AZ. EVER offers free drop-off, residential pickup and qualifying business pickup.",
      [
        "Chandler electronics recycling customers can use EVER for accepted computers, laptops, servers, networking hardware, drives, monitors, printers, phones, gaming systems, and related e-waste.",
        "Residential pickup in Chandler is available for a fee based on distance, while free drop-off is available for most accepted electronics.",
        "Chandler companies replacing office computers or IT equipment can submit one commercial pickup request; 10 qualifying items may qualify for free pickup.",
      ],
      [
        { question: "Can I recycle old computers in Chandler?", answer: "Yes. Desktops, workstations, laptops, servers, drives, networking equipment, and many computer components are accepted under EVER's current policy." },
        { question: "Is residential electronics pickup available in Chandler?", answer: "Yes. Residential pickup is available with a fee based on distance." },
        { question: "Can a Chandler business recycle a full IT closet?", answer: "Yes. Build a commercial pickup brief with the equipment mix and quantity. Ten or more qualifying items may qualify for free pickup." },
      ],
    ),
    neighbors: ["gilbert", "mesa", "tempe", "phoenix"],
  },
  {
    market: "az",
    slug: "queen-creek",
    name: "Queen Creek",
    county: "Maricopa County",
    coverage: pickupCoverage(),
    ...cityCopy(
      "Electronics Recycling Queen Creek AZ | E-Waste Pickup | EVER",
      "Electronics and e-waste recycling in Queen Creek, AZ. Free drop-off for most accepted electronics, residential pickup and business electronics pickup from EVER.",
      [
        "Queen Creek residents can check accepted electronics before leaving home, including computers, laptops, phones, monitors, printers, gaming systems, cables, and flat-screen TVs.",
        "Free drop-off is available for most accepted electronics; LED TVs are $15 each and CRT televisions are not accepted.",
        "Queen Creek businesses can request mixed office-electronics or IT-equipment pickup. Loads with at least 10 qualifying items may qualify for free commercial pickup.",
      ],
      [
        { question: "Does EVER pick up electronics in Queen Creek?", answer: "Yes. Residential pickup is available for a distance-based fee, and qualifying business loads may receive free commercial pickup." },
        { question: "Is electronics drop-off free for Queen Creek residents?", answer: "Drop-off is free for most accepted electronics. Item-specific fees still apply where published, including $15 per LED TV." },
        { question: "Does EVER take tube TVs in Queen Creek?", answer: "No. CRT and tube televisions are not accepted." },
      ],
    ),
    neighbors: ["gilbert", "san-tan-valley", "florence", "chandler"],
  },
  {
    market: "az",
    slug: "san-tan-valley",
    name: "San Tan Valley",
    county: "Pinal County",
    coverage: pickupCoverage(),
    ...cityCopy(
      "Electronics Recycling San Tan Valley AZ | E-Waste | EVER",
      "Recycle electronics and e-waste in San Tan Valley, AZ. EVER offers accepted-item drop-off, distance-based residential pickup and business electronics pickup.",
      [
        "San Tan Valley is included in EVER's electronics recycling and pickup coverage for homes and businesses.",
        "Residents can recycle accepted computers, laptops, phones, monitors, drives, printers, networking equipment, gaming systems, and more through EVER's published item policy.",
        "Commercial electronics loads with at least 10 qualifying items may qualify for free pickup in San Tan Valley; smaller loads can use drop-off or request distance-based pickup.",
      ],
      [
        { question: "Does EVER serve San Tan Valley for e-waste recycling?", answer: "Yes. EVER provides electronics recycling options and pickup service in San Tan Valley." },
        { question: "How much is residential electronics pickup in San Tan Valley?", answer: "Residential pickup pricing depends on distance. Send your ZIP code and item list to EVER for pricing." },
        { question: "Can San Tan Valley businesses get free electronics pickup?", answer: "Yes, when the load includes at least 10 qualifying items." },
      ],
    ),
    neighbors: ["queen-creek", "florence", "gilbert"],
  },
  {
    market: "az",
    slug: "mesa",
    name: "Mesa",
    county: "Maricopa County",
    coverage: pickupCoverage(),
    ...cityCopy(
      "Electronics Recycling Mesa AZ | E-Waste Pickup | EVER",
      "Electronics recycling in Mesa, AZ for computers, laptops, servers, TVs, drives and e-waste. EVER offers drop-off plus residential and commercial pickup.",
      [
        "Mesa customers can use EVER for computer recycling, laptop recycling, server recycling, hard-drive recycling, monitor recycling, LED TV recycling, and other accepted e-waste.",
        "Most accepted electronics can use free drop-off. Residential pickup is available for a distance-based fee.",
        "Mesa businesses with retired computers, servers, networking gear, drives, monitors, printers, phones, and mixed office electronics can request commercial pickup; 10 qualifying items may qualify for free pickup.",
      ],
      [
        { question: "Where can I recycle a computer in Mesa?", answer: "EVER serves Mesa for computer and electronics recycling. Desktops, laptops, servers, hard drives and many components are accepted under the current policy." },
        { question: "Does EVER recycle LED TVs in Mesa?", answer: "Yes. Flat-screen LED TVs are $15 per television. CRT televisions are not accepted." },
        { question: "Is business electronics pickup available in Mesa?", answer: "Yes. Commercial pickup is available, and loads with at least 10 qualifying items may qualify for free pickup." },
      ],
    ),
    neighbors: ["gilbert", "tempe", "chandler", "phoenix"],
  },
  {
    market: "az",
    slug: "tempe",
    name: "Tempe",
    county: "Maricopa County",
    coverage: pickupCoverage(),
    ...cityCopy(
      "Electronics Recycling Tempe AZ | E-Waste Pickup | EVER",
      "Electronics recycling and e-waste pickup in Tempe, AZ for laptops, computers, servers, drives, monitors and office technology. Residential pickup available.",
      [
        "Tempe businesses can use EVER for office electronics recycling, computer equipment recycling, server recycling, hard-drive recycling, and mixed commercial e-waste pickup.",
        "Commercial pickup is free with at least 10 qualifying items. Smaller Tempe business loads can use free drop-off or request distance-based pickup.",
        "Tempe residents can check individual items online and choose free drop-off for most accepted electronics or residential pickup based on distance.",
      ],
      [
        { question: "Does EVER offer business e-waste pickup in Tempe?", answer: "Yes. Commercial electronics pickup is available in Tempe, with free pickup for loads containing at least 10 qualifying items." },
        { question: "Can Tempe residents recycle laptops and computers with EVER?", answer: "Yes. Laptops, desktops, workstations, servers, drives and many computer components are accepted." },
        { question: "Can EVER pick electronics up from a Tempe residence?", answer: "Yes. Residential pickup is available for a fee based on distance." },
      ],
    ),
    neighbors: ["mesa", "chandler", "phoenix", "gilbert"],
  },
  {
    market: "az",
    slug: "phoenix",
    name: "Phoenix",
    county: "Maricopa County",
    coverage: pickupCoverage(),
    ...cityCopy(
      "Electronics Recycling Phoenix AZ | E-Waste Pickup | EVER",
      "Phoenix electronics recycling for computers, laptops, servers, drives, monitors, TVs and e-waste, with residential and commercial pickup from EVER.",
      [
        "EVER extends electronics recycling and pickup service into Phoenix for customers who need an alternative to East Valley-only options.",
        "Phoenix residents can check electronics online, then use drop-off for accepted items or request residential pickup with pricing based on distance.",
        "Phoenix businesses can request computer recycling, server recycling, networking equipment recycling, drive recycling, and mixed office e-waste pickup. Ten qualifying items may qualify for free commercial pickup.",
      ],
      [
        { question: "Does EVER provide electronics recycling service in Phoenix?", answer: "Yes. EVER serves Phoenix for residential and commercial electronics recycling and pickup." },
        { question: "Can a Phoenix business get free e-waste pickup?", answer: "Yes, when the commercial load contains at least 10 qualifying items." },
        { question: "Does EVER offer TV recycling in Phoenix?", answer: "Yes for flat-screen LED TVs at $15 per TV. CRT and tube televisions are not accepted." },
      ],
    ),
    neighbors: ["tempe", "mesa", "chandler", "gilbert"],
  },
  {
    market: "az",
    slug: "florence",
    name: "Florence",
    county: "Pinal County",
    coverage: pickupCoverage(),
    ...cityCopy(
      "Electronics Recycling Florence AZ | E-Waste Pickup | EVER",
      "Electronics recycling and e-waste pickup in Florence, AZ. EVER handles accepted computers, laptops, servers, drives, monitors and business electronics.",
      [
        "EVER serves Florence customers who need electronics recycling, e-waste pickup, computer recycling, or business technology removal beyond the central East Valley.",
        "Florence residents can check accepted items online and request pickup based on distance. Free drop-off remains available for most accepted electronics when drop-off is the better option.",
        "Florence businesses can submit mixed electronics loads for pickup. Commercial loads with at least 10 qualifying items may qualify for free pickup.",
      ],
      [
        { question: "Does EVER serve Florence, Arizona for electronics recycling?", answer: "Yes. Florence is included in EVER's residential and commercial electronics recycling service area." },
        { question: "Can EVER pick up electronics from a Florence home?", answer: "Yes. Residential pickup is available, with pricing based on distance." },
        { question: "Does EVER offer commercial e-waste pickup in Florence?", answer: "Yes. Ten or more qualifying items may qualify for free commercial pickup." },
      ],
    ),
    neighbors: ["san-tan-valley", "queen-creek", "gilbert"],
  },
  {
    market: "tx",
    slug: "el-paso",
    name: "El Paso",
    county: "El Paso County",
    coverage: pickupCoverage("tx"),
    ...cityCopy(
      "Electronics Recycling El Paso TX | E-Waste Recycling | EPER",
      "Electronics recycling in El Paso, TX for computers, laptops, servers, drives, TVs and business e-waste. Check accepted electronics and request pickup with EPER.",
      [
        "EPER is the El Paso market of ElectronicRecycle.net, focused on local electronics recycling for residents, businesses, schools, property managers, and organizations.",
        "El Paso customers can check electronics online before making the trip, including computers, laptops, servers, networking equipment, drives, monitors, phones, printers, gaming systems, and other accepted e-waste.",
        "Businesses can submit mixed electronics loads through the commercial pickup request. Exact EPER pickup pricing and local drop-off details should be confirmed before scheduling.",
      ],
      [
        { question: "Where can I recycle electronics in El Paso, TX?", answer: "EPER provides an El Paso-specific electronics recycling experience on ElectronicRecycle.net. Check your item online and contact EPER for the current handoff or pickup route." },
        { question: "Does EPER handle business electronics in El Paso?", answer: "Yes. Businesses can submit computers, laptops, servers, networking equipment, drives, monitors, printers, phones, and mixed office electronics for review and pickup planning." },
        { question: "Can I recycle old computers and laptops in El Paso?", answer: "Yes. Computers, laptops, workstations, and many related components are part of the accepted electronics catalog." },
      ],
    ),
    neighbors: [],
  },
] as const;

export function getCity(market: MarketKey, slug: string): City | undefined {
  return cities.find((city) => city.market === market && city.slug === slug);
}

export function isCityPublishable(city: City): boolean {
  const pickup = city.coverage.commercialPickup;
  const hasActionablePath = isPublishable(pickup) && pickup.value.available;
  const hasApprovedCopy = isPublishable(city.pageTitle) && city.pageTitle.value.trim() !== "" && isPublishable(city.metaDescription) && city.metaDescription.value.trim() !== "";
  return hasActionablePath && hasApprovedCopy;
}

export function publishableCities(market?: MarketKey): readonly City[] {
  return cities.filter((city) => (!market || city.market === market) && isCityPublishable(city));
}

export function marketServiceAreaStatement(market: MarketKey): string {
  return market === "az"
    ? "EVER serves Arizona's East Valley plus Phoenix and Florence."
    : "EPER serves El Paso, Texas.";
}
