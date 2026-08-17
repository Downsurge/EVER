/**
 * EVER East Valley service-area content.
 *
 * East Valley city pages describe the service area, commercial pickup,
 * residential pickup, and free drop-off availability without inventing a
 * street address that has not been supplied for publication.
 */

import {
  Fact,
  drafted,
  isPublishable,
  operatorSupplied,
} from "./verification";

export const serviceAreaStatement: Fact<string> = operatorSupplied(
  "EVER serves Arizona's East Valley.",
  "The operator defined the East Valley as EVER's service area and requested a page for each serviced city.",
);

export type CityCoverage = {
  readonly residentialDropOff: Fact<{
    readonly available: boolean;
    readonly destination: string;
  }>;
  readonly commercialPickup: Fact<{ readonly available: boolean }>;
};

export type City = {
  readonly slug: string;
  readonly name: string;
  readonly county: string;
  readonly coverage: CityCoverage;
  readonly pageTitle: Fact<string>;
  readonly metaDescription: Fact<string>;
  readonly localNotes: Fact<readonly string[]>;
  readonly localQuestions: Fact<
    readonly { readonly question: string; readonly answer: string }[]
  >;
  readonly neighbors: readonly string[];
};

const pickupCoverage = (): CityCoverage => ({
  residentialDropOff: operatorSupplied(
    { available: true, destination: "Contact EVER for current drop-off instructions." },
    "Operator confirmation, 2026-08-17: free drop-off is available for eligible electronics; no public street address supplied yet.",
  ),
  commercialPickup: operatorSupplied(
    { available: true },
    "Commercial/business pickup is part of EVER's East Valley operating model.",
  ),
});

const cityCopy = (
  title: string,
  meta: string,
  notes: readonly string[],
  questions: readonly { question: string; answer: string }[],
) => ({
  pageTitle: drafted(title, "City-specific SEO/editorial copy drafted for the operator's requested service-area page."),
  metaDescription: drafted(meta, "City-specific SEO/editorial copy drafted for the operator's requested service-area page."),
  localNotes: drafted(notes, "City-specific copy; contains no physical-location claim."),
  localQuestions: drafted(questions, "City-specific FAQ copy using operator-confirmed pickup policies while avoiding invented hours, addresses, or certifications."),
});

export const cities: readonly City[] = [
  {
    slug: "gilbert",
    name: "Gilbert",
    county: "Maricopa County",
    coverage: pickupCoverage(),
    ...cityCopy(
      "Electronic Recycling & Business Pickup in Gilbert, AZ | EVER",
      "EVER serves Gilbert businesses with commercial electronic pickup and gives residents a clear online item-checking path for old electronics.",
      [
        "Gilbert is part of EVER's core East Valley commercial pickup area.",
        "Free drop-off is available for eligible electronics. Contact EVER for current drop-off instructions; residential pickup is also available for a distance-based fee.",
      ],
      [
        {
          question: "Does EVER offer business electronic pickup in Gilbert?",
          answer: "Yes. Gilbert is within EVER's defined East Valley commercial pickup area. Build a pickup brief with the equipment type, quantity, and priorities.",
        },
        {
          question: "Does EVER offer residential pickup in Gilbert?",
          answer: "Yes. Residential pickup is available with a fee based on distance. Free drop-off is available for eligible electronics; contact EVER for current drop-off instructions.",
        },
      ],
    ),
    neighbors: ["mesa", "chandler", "queen-creek"],
  },
  {
    slug: "mesa",
    name: "Mesa",
    county: "Maricopa County",
    coverage: pickupCoverage(),
    ...cityCopy(
      "Mesa Business Electronic Pickup & E-Waste Answers | EVER",
      "Mesa businesses can build an EVER commercial electronics pickup brief, while residents can check individual electronics online for the current handling path.",
      [
        "Mesa is part of EVER's East Valley pickup area for residential and commercial electronics.",
        "Business loads can include mixed retired office technology; the pickup brief is designed to capture the mix before anyone schedules the next step.",
      ],
      [
        {
          question: "Can a Mesa business request electronics pickup?",
          answer: "Yes. Commercial pickup is available in Mesa. Loads with at least 10 qualifying items may qualify for free pickup.",
        },
        {
          question: "Can Mesa residents check whether EVER handles a TV or computer?",
          answer: "Yes. The residential item checker publishes the current acceptance route by item type.",
        },
      ],
    ),
    neighbors: ["gilbert", "tempe", "chandler"],
  },
  {
    slug: "chandler",
    name: "Chandler",
    county: "Maricopa County",
    coverage: pickupCoverage(),
    ...cityCopy(
      "Chandler IT Equipment Recovery & Electronic Pickup | EVER",
      "EVER provides Chandler businesses an organized path for retired computers, servers, networking equipment, monitors, and mixed office electronics.",
      [
        "Chandler commercial loads can start with the pickup brief so EVER can review the equipment mix and quantity before scheduling.",
        "Equipment that may still have reuse or recovery value can be evaluated before the remaining material is routed toward recycling.",
      ],
      [
        {
          question: "What should a Chandler company include in a pickup request?",
          answer: "Start with equipment categories, a rough item count, and priorities such as fast removal, data-bearing devices, asset inventory, or value recovery.",
        },
        {
          question: "Does EVER promise resale value on retired Chandler equipment?",
          answer: "No. Eligible equipment can be evaluated, but evaluation is not a promise that an item has resale value or that a payment will result.",
        },
      ],
    ),
    neighbors: ["gilbert", "mesa", "tempe"],
  },
  {
    slug: "queen-creek",
    name: "Queen Creek",
    county: "Maricopa County",
    coverage: pickupCoverage(),
    ...cityCopy(
      "Queen Creek Electronic Recycling & Commercial Pickup | EVER",
      "EVER extends commercial electronic pickup to Queen Creek and gives residents a direct way to check the current route for old electronics.",
      [
        "Queen Creek businesses can use the same structured EVER pickup workflow as the rest of the East Valley.",
        "Queen Creek residents can use free drop-off for eligible electronics or request residential pickup with a distance-based fee.",
      ],
      [
        {
          question: "Is Queen Creek in EVER's business pickup area?",
          answer: "Yes. Queen Creek is one of the East Valley cities included in EVER's commercial pickup area.",
        },
        {
          question: "Does EVER offer residential pickup in Queen Creek?",
          answer: "Yes. Residential pickup is available with a fee based on distance. Contact EVER with your ZIP code and items for pricing.",
        },
      ],
    ),
    neighbors: ["gilbert", "san-tan-valley"],
  },
  {
    slug: "tempe",
    name: "Tempe",
    county: "Maricopa County",
    coverage: pickupCoverage(),
    ...cityCopy(
      "Tempe Business Electronics Pickup & Technology Recovery | EVER",
      "EVER serves Tempe commercial electronics loads with a pickup-first workflow built around equipment type, quantity, data needs, and recovery priorities.",
      [
        "Tempe business requests are routed through EVER's commercial workflow, which is designed for mixed technology rather than one-item consumer disposal.",
        "Tempe residents can check individual items online, use free drop-off for eligible electronics, or request residential pickup.",
      ],
      [
        {
          question: "How does a Tempe business start with EVER?",
          answer: "Use the business page to build a three-step pickup brief. It records the equipment mix, rough quantity, and the priorities for the load.",
        },
        {
          question: "Can a Tempe resident still use EVER's website?",
          answer: "Yes. The item checker is available for residents who want to see the current published route for a specific electronic item.",
        },
      ],
    ),
    neighbors: ["mesa", "chandler"],
  },
  {
    slug: "san-tan-valley",
    name: "San Tan Valley",
    county: "Pinal County",
    coverage: pickupCoverage(),
    ...cityCopy(
      "San Tan Valley Electronic Pickup & Recycling Answers | EVER",
      "EVER includes San Tan Valley in its East Valley commercial pickup area and provides an item-by-item online route for residential electronics.",
      [
        "San Tan Valley is included in EVER's East Valley commercial and residential pickup coverage.",
        "Free drop-off is available for eligible electronics; contact EVER for current instructions or residential pickup pricing.",
      ],
      [
        {
          question: "Will EVER pick up commercial electronics in San Tan Valley?",
          answer: "Yes. San Tan Valley is included in EVER's defined East Valley business pickup area.",
        },
        {
          question: "Does EVER offer residential pickup in San Tan Valley?",
          answer: "Yes. Residential pickup is available with a distance-based fee. Contact EVER with your ZIP code and item list for pricing.",
        },
      ],
    ),
    neighbors: ["queen-creek"],
  },
] as const;

export function getCity(slug: string): City | undefined {
  return cities.find((city) => city.slug === slug);
}

export function isCityPublishable(city: City): boolean {
  const pickup = city.coverage.commercialPickup;
  const hasActionablePath = isPublishable(pickup) && pickup.value.available;
  const hasApprovedCopy =
    isPublishable(city.pageTitle) &&
    city.pageTitle.value.trim() !== "" &&
    isPublishable(city.metaDescription) &&
    city.metaDescription.value.trim() !== "";
  return hasActionablePath && hasApprovedCopy;
}

export function publishableCities(): readonly City[] {
  return cities.filter(isCityPublishable);
}
