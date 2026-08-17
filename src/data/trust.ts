/**
 * Trust credentials.
 *
 * The vision is blunt about this section: trust must be "specific and
 * selectively placed", no certification seal unless EVER holds it and has
 * permission to display it, no reviews until they exist, no placeholder
 * statistics, no animated counters.
 *
 * So each credential is a fact with a status, and the trust scene renders
 * only the publishable ones. A credential that has not been confirmed is
 * absent from the page entirely rather than shown as "coming soon", because
 * announcing a missing credential is still a way of implying it.
 */

import { Fact, operatorSupplied, placeholder } from "./verification";

export type Credential = {
  readonly key: string;
  readonly label: string;
  readonly detail: string;
};

/**
 * Veteran ownership. Stated by the operator in EVER_WEBSITE_VISION.md, which
 * they authored, so it carries the same weight as the hero copy and the
 * service model: operator-supplied, still worth a final confirmation before
 * launch. The vision limits it to two placements, near the hero trust area
 * and in the footer, and forbids it inside the logo or as a repeated
 * patriotic motif.
 */
export const veteranOwnership: Fact<Credential> = operatorSupplied(
  {
    key: "veteran",
    label: "Veteran owned & operated",
    detail:
      "EVER is a veteran owned and operated business working in the East Valley.",
  },
  "Stated by the operator in EVER_WEBSITE_VISION.md. Confirm the exact wording, and supply approved badge artwork if a badge is wanted, before launch.",
);

/**
 * Certifications. R2, e-Stewards and similar. The vision forbids showing a
 * seal without both the certification and permission to display it.
 */
export const certifications: Fact<readonly Credential[]> = placeholder(
  [],
  "Needs an active certification plus written permission to display its seal. Do not render any seal before both exist.",
);

/** Insurance and downstream vendor detail. */
export const insuranceAndDownstream: Fact<readonly Credential[]> = placeholder(
  [],
  "Needs confirmed insurance detail and the downstream processing chain EVER actually uses.",
);

/** Customer reviews. */
export const reviews: Fact<readonly Credential[]> = placeholder(
  [],
  "Needs real reviews from real customers. Never seed this with examples.",
);

/**
 * The data-handling position. This is the credential businesses care about
 * most, and the one most dangerous to overstate: the vision forbids promising
 * destruction methods or security outcomes that operations do not support.
 */
export const dataHandling: Fact<Credential> = placeholder(
  {
    key: "data",
    label: "",
    detail: "",
  },
  "Needs EVER's actual data-handling process, written down. Do not publish any wording about wiping, destruction, certificates, or chain of custody until it describes what operations genuinely do.",
);
