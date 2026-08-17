export type MarketKey = "az" | "tx";

export type MarketConfig = {
  key: MarketKey;
  brandShort: "EVER" | "EPER";
  brandName: string;
  marketLabel: string;
  selectorTitle: string;
  state: string;
  stateAbbr: "AZ" | "TX";
  region: string;
  regionShort: string;
  support: string;
  homepage: string;
  phone?: string;
  email?: string;
  /**
   * A real street address, only where the market actually has one. Arizona
   * has no public yard yet, so it stays undefined there rather than being
   * faked; anything reading this must handle its absence.
   */
  address?: {
    street: string;
    city: string;
    stateAbbr: string;
    postalCode: string;
  };
  citiesLabel: string;
  serviceAreaSummary: string;
  ogImage: string;
};

export const markets: Record<MarketKey, MarketConfig> = {
  az: {
    key: "az",
    brandShort: "EVER",
    brandName: "East Valley Electronic Recycle",
    marketLabel: "Phoenix / East Valley, Arizona",
    selectorTitle: "Phoenix & East Valley",
    state: "Arizona",
    stateAbbr: "AZ",
    region: "Arizona's East Valley, Phoenix, and Florence",
    regionShort: "East Valley / Phoenix",
    support:
      "Electronic recycling and e-waste service across the East Valley, Phoenix, and Florence, with free drop-off for most accepted electronics, qualifying commercial pickup, and residential pickup.",
    homepage: "/az",
    phone: "480-942-5536",
    email: "ever@electronicrecycle.net",
    citiesLabel: "Arizona Service Areas",
    serviceAreaSummary: "Gilbert, Chandler, Queen Creek, San Tan Valley, Mesa, Tempe, Phoenix, and Florence",
    ogImage: "/brand/ever-og.png",
  },
  tx: {
    key: "tx",
    brandShort: "EPER",
    brandName: "El Paso Electronic Recycle",
    marketLabel: "El Paso, Texas",
    selectorTitle: "El Paso",
    state: "Texas",
    stateAbbr: "TX",
    region: "El Paso and surrounding West Texas communities",
    regionShort: "El Paso",
    support:
      "Electronic recycling and e-waste service for El Paso homes and businesses, with clear item guidance, commercial pickup requests, and local recycling resources.",
    homepage: "/tx",
    // Operator confirmation, 2026-08-17.
    phone: "915-843-8854",
    email: "elpaso@electronicrecycle.net",
    address: {
      street: "1700 Texas Ave",
      city: "El Paso",
      stateAbbr: "TX",
      postalCode: "79901",
    },
    citiesLabel: "Texas Service Area",
    serviceAreaSummary: "El Paso",
    ogImage: "/brand/ever-og.png",
  },
};

export function isMarketKey(value: string): value is MarketKey {
  return value === "az" || value === "tx";
}

export function getMarket(value: string): MarketConfig | undefined {
  return isMarketKey(value) ? markets[value] : undefined;
}

export function marketRoutes(market: MarketKey) {
  const base = `/${market}`;
  return {
    home: base,
    residential: `${base}/recycle`,
    business: `${base}/business`,
    whatWeAccept: `${base}/what-we-accept`,
    services: `${base}/services`,
    pricing: `${base}/pricing`,
    whoWeServe: `${base}/who-we-serve`,
    gallery: `${base}/gallery`,
    dataSecurity: `${base}/data-security`,
    resources: `${base}/resources`,
    contact: `${base}/contact`,
    faq: `${base}/faq`,
    privacy: `${base}/privacy`,
    terms: `${base}/terms`,
    acceptancePolicy: `${base}/acceptance-policy`,
    accessibility: `${base}/accessibility`,
  } as const;
}
