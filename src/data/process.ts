/**
 * The EVER route: what happens to equipment after it arrives.
 *
 * These five stages are the service story the vision itself sets out, so the
 * wording is operator-authored rather than composed here. They are still
 * capability claims: publishing them says EVER performs each stage. The
 * operator confirmed on 2026-08-15 that residential drop-off and business
 * pickup are offered, which covers Receive.
 *
 * What each stage must NOT do, per the vision, is promise an outcome: no
 * guaranteed payout, no data-destruction guarantee, no certification, no
 * "zero landfill". The copy below describes judgement being applied, not
 * results being promised.
 */

import { Fact, operatorSupplied } from "./verification";

export type RouteStage = {
  readonly key: string;
  readonly name: string;
  readonly description: string;
};

export const routeStages: Fact<readonly RouteStage[]> = operatorSupplied(
  [
    {
      key: "receive",
      name: "Receive",
      description:
        "Drop off a few items, or book a pickup for a business. Everything starts by getting the equipment off your hands.",
    },
    {
      key: "identify",
      name: "Identify",
      description:
        "We look at what actually arrived: the equipment, how much of it, what condition it is in, and which items hold data.",
    },
    {
      key: "recover",
      name: "Recover",
      description:
        "Some equipment and components still hold value. Eligible items are evaluated rather than assumed, because not every load produces a return.",
    },
    {
      key: "reuse",
      name: "Reuse",
      description:
        "Where a responsible path exists, working technology stays in use instead of being broken down.",
    },
    {
      key: "recycle",
      name: "Recycle",
      description:
        "What has reached the end of its life is processed through appropriate recycling channels.",
    },
  ],
  "Service model as described in EVER_WEBSITE_VISION.md by the operator. Each stage is a capability claim and should be re-confirmed against actual operations before launch.",
);
