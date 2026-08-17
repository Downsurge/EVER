/**
 * Fact verification status.
 *
 * EVER_WEBSITE_VISION.md forbids publishing unverified operational claims:
 * fees, hours, locations, service areas, certifications, turnaround times,
 * reviews, and impact numbers. This module makes that rule mechanical instead
 * of a matter of authorial discipline.
 *
 * Every operational fact in `src/data` carries a status. Anything that is not
 * `verified` must not reach rendered output. Components use the helpers here
 * rather than deciding for themselves, so a fact cannot leak by being read
 * from the wrong place.
 */

export type FactStatus =
  /** Confirmed by the operator against a maintained source. Safe to publish. */
  | "verified"
  /**
   * Supplied by the operator as direction but not yet confirmed against a
   * final written policy. Publishable only where the operator explicitly
   * directed this exact wording. Tracked so launch review can find it.
   */
  | "operator-supplied"
  /**
   * Drafted here at the operator's instruction, from general knowledge rather
   * than from EVER's own numbers. Renders, because the operator asked for a
   * working policy, but it is the status that most needs sign-off: a drafted
   * fee or acceptance rule is a guess wearing the same clothes as a fact.
   * `npm run facts` lists every one of these.
   */
  | "drafted"
  /** Structure only. Never renders. Exists so the shape is reviewable. */
  | "placeholder";

export type Fact<T> = {
  readonly status: FactStatus;
  readonly value: T;
  /** Where a verified value must come from, or why this is not yet verified. */
  readonly source: string;
};

export function verified<T>(value: T, source: string): Fact<T> {
  return { status: "verified", value, source };
}

export function operatorSupplied<T>(value: T, source: string): Fact<T> {
  return { status: "operator-supplied", value, source };
}

export function drafted<T>(value: T, source: string): Fact<T> {
  return { status: "drafted", value, source };
}

export function placeholder<T>(value: T, source: string): Fact<T> {
  return { status: "placeholder", value, source };
}

/**
 * True when a fact may be rendered. Placeholders never render: showing a
 * realistic-looking placeholder fee or address is the specific failure the
 * vision calls out, because a visitor cannot tell it from a real one.
 */
export function isPublishable<T>(fact: Fact<T>): boolean {
  return fact.status === "verified" || fact.status === "operator-supplied";
}

/** The value if publishable, otherwise null. Callers must handle null. */
export function publishable<T>(fact: Fact<T>): T | null {
  return isPublishable(fact) ? fact.value : null;
}
