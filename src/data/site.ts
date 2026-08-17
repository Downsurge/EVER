/**
 * Site-wide identity, contact, location, and trust facts.
 *
 * Read `verification.ts` first. Nothing here renders unless it is publishable.
 * When the operator confirms a fact, change `placeholder(...)` to
 * `verified(...)` and record the source. That is the only edit required: the
 * components already handle both states.
 */

import { Fact, operatorSupplied, placeholder, verified } from "./verification";

export const brand = {
  /** The legal/spoken name. Confirmed by the operator's own brief. */
  name: verified("East Valley Electronic Recycle", "Operator brief, 2026-08-15"),
  shortName: verified("EVER", "Operator brief, 2026-08-15"),
  /**
   * Operator-directed hero headline. The approved plan held this as blocked
   * because "we'll take it" reads as a broad acceptance claim; the operator
   * directed this exact wording on 2026-08-15, which resolves the block for
   * the wording while leaving the underlying acceptance policy to be
   * confirmed before launch.
   */
  headline: operatorSupplied(
    { line1: "OLD TECH?", line2: "WE'LL TAKE IT." },
    "Operator direction, 2026-08-15. Acceptance policy still to be confirmed before launch.",
  ),
  /**
   * Operator-directed support copy. Contains a fee claim ("Free") and a
   * service-area claim ("across Arizona's East Valley"). Supplied verbatim by
   * the operator, not composed here. Both claims still need a maintained
   * policy source before launch.
   */
  support: operatorSupplied(
    "Free local drop-off for most electronics, free commercial pickup with 10 qualifying items, and residential pickup available for a distance-based fee.",
    "Operator direction, 2026-08-17.",
  ),
} as const;

/**
 * The hero trust line. The vision specifies its shape but every component is
 * an operational claim, so it stays a placeholder and does not render.
 */
export const heroTrustLine: Fact<readonly string[]> = operatorSupplied(
  ["East Valley, Arizona", "Free commercial pickup with 10 qualifying items", "Veteran owned & operated"],
  "Current operating/ownership positioning supplied by the operator. No physical drop-off location is implied.",
);

/**
 * Veteran ownership. The vision uses this credential twice, near the hero
 * trust line and in the footer. It is a claim about the business, so it needs
 * operator confirmation before it renders anywhere.
 */
export const veteranOwned: Fact<string> = operatorSupplied(
  "Veteran owned & operated",
  "Stated by the operator in EVER_WEBSITE_VISION.md. See src/data/trust.ts. The vision limits this to two placements and forbids it inside the logo.",
);

/**
 * Physical drop-off location.
 *
 * No public EVER yard is operating yet. Keep every location field withheld
 * until the operator supplies the real, active site.
 */
export const dropOffLocation = {
  streetAddress: placeholder(
    "",
    "Needs the operator-confirmed street address. The city is confirmed; the street is not.",
  ),
  city: placeholder("", "No public drop-off yard has been secured yet. Publish only after the street location is operating."),
  postalCode: placeholder("", "Needs operator-confirmed postal code."),
  directionsUrl: placeholder(
    "",
    "Needs a map link that matches the confirmed street address. Do not link to a city-level map and call it directions.",
  ),
} as const;

/**
 * Opening hours.
 *
 * The operator gave 8:00 to 18:00. They did NOT say which days, so the days
 * are held separately and the site renders the times without claiming a
 * weekly schedule. Fill `days` in and it appears everywhere at once.
 */
export const openingHours: Fact<{ opens: string; closes: string }> = placeholder(
  { opens: "", closes: "" },
  "No public drop-off hours should be published until the physical yard is operating.",
);

export const openingDays: Fact<string> = placeholder(
  "",
  "Needs the operator-confirmed public drop-off schedule once the physical yard is active.",
);

/** Contact routes. */
export const contact = {
  phone: verified("480-942-5536", "Operator confirmation, 2026-08-17."),
  email: verified("ever@electronicrecycle.net", "Operator confirmation, 2026-08-17."),
} as const;

/**
 * Certifications. The vision is explicit: no certification seal unless EVER
 * holds the certification and has permission to display it.
 */
export const certifications: Fact<readonly string[]> = placeholder(
  [],
  "Needs active certifications plus permission to display each seal. Do not render R2, e-Stewards, or similar until both are true.",
);

/**
 * Whether each service is actually offered.
 *
 * The hero's choice LABELS ("I have a few items", "I represent a business")
 * describe the visitor and assert nothing. The branch sublabels
 * ("Drop-off answers", "Business pickup") name services, and naming a service
 * claims it exists, so they are gated on these facts and do not render yet.
 */
export const services = {
  residentialDropOff: verified(true, "Operator confirmation, 2026-08-17."),
  businessPickup: verified(true, "Operator confirmation, 2026-08-15."),
} as const;

/** Canonical destinations for the two hero paths. */
export const routes = {
  residential: "/recycle",
  business: "/business",
  whatWeAccept: "/what-we-accept",
  howItWorks: "/how-it-works",
  about: "/about",
  resources: "/resources",
  businessPickup: "/business/pickup",
} as const;
