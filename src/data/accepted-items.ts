/**
 * Accepted-equipment policy: the source of truth behind the acceptance
 * finder and the What We Accept page.
 *
 * STATUS OF THIS DATA, read this before trusting a number:
 *
 *   verified  - the operator stated it directly. Two rules qualify today:
 *               flat screen TVs carry a $15 fee, and CRTs are refused.
 *   drafted   - written here at the operator's instruction, shaped by what
 *               generally holds value in e-scrap rather than by EVER's own
 *               margins. Every drafted line needs sign-off. Run
 *               `npm run facts` to list them.
 *
 * The commercial logic behind the drafted lines, so it can be argued with:
 *   - Free intake for anything with recoverable board, precious metal, or
 *     resale value: servers, networking, laptops, desktops, components,
 *     drives, phones. These pay for the operation.
 *   - Free intake for copper-bearing cable and power equipment.
 *   - A fee only where processing genuinely costs more than the material
 *     returns: flat panel displays.
 *   - Refusal where the cost is structural: leaded CRT glass, and items that
 *     are not electronics recycling at all.
 *   - Contact first where the risk, not the value, is the issue: lithium
 *     batteries, and anything at pallet scale.
 */

import { Fact, drafted, operatorSupplied, verified } from "./verification";

export type AcceptanceStatus =
  | "accepted-no-fee"
  | "accepted-fee"
  | "contact-first"
  | "not-accepted"
  /** No confirmed policy yet. Never presented as an answer. */
  | "unconfirmed";

/** Keys map to the outlined icons in `components/ItemIcon.tsx`. */
export type IconKey =
  | "laptop"
  | "desktop"
  | "server"
  | "network"
  | "component"
  | "drive"
  | "phone"
  | "monitor"
  | "tv"
  | "crt"
  | "printer"
  | "console"
  | "cable"
  | "power"
  | "battery"
  | "camera"
  | "audio"
  | "appliance";

export type ItemCategory = {
  readonly slug: string;
  readonly name: string;
  readonly icon: IconKey;
  readonly synonyms: readonly string[];
  readonly policy: Fact<{
    readonly status: AcceptanceStatus;
    readonly conditions: string;
    readonly preparation: string;
    readonly fee: string;
  }>;
};

const free = (conditions: string, preparation = "") =>
  drafted(
    { status: "accepted-no-fee" as const, conditions, preparation, fee: "" },
    "Drafted from general e-scrap value, not from EVER's margins. Confirm before launch.",
  );

export const itemCategories: readonly ItemCategory[] = [
  {
    slug: "laptops",
    name: "Laptops",
    icon: "laptop",
    synonyms: ["notebook", "macbook", "chromebook", "ultrabook", "netbook"],
    policy: free(
      "Any age or condition, working or not.",
      "Remove any personal case or sticker you want to keep. Tell us if the drive is still inside.",
    ),
  },
  {
    slug: "desktops",
    name: "Desktops and workstations",
    icon: "desktop",
    synonyms: ["pc", "tower", "imac", "workstation", "computer", "all in one"],
    policy: free(
      "Complete machines or bare cases.",
      "Leave the machine assembled if you can. We open it here.",
    ),
  },
  {
    slug: "servers",
    name: "Servers and rack equipment",
    icon: "server",
    synonyms: ["server", "rack", "blade", "san", "nas", "chassis", "rails"],
    policy: free(
      "Rack and tower servers, chassis, rails, and shelves.",
      "Tell us the rack height and how many units so we bring the right vehicle.",
    ),
  },
  {
    slug: "networking",
    name: "Networking equipment",
    icon: "network",
    synonyms: ["switch", "router", "firewall", "access point", "modem", "patch panel"],
    policy: free(
      "Switches, routers, firewalls, access points, and patch panels.",
      "Managed equipment often holds configuration. Reset it if you can; we will handle it if you cannot.",
    ),
  },
  {
    slug: "components",
    name: "Computer components",
    icon: "component",
    synonyms: ["ram", "cpu", "gpu", "graphics card", "motherboard", "processor", "memory"],
    policy: free(
      "Boards, processors, memory, and graphics cards, loose or installed.",
      "Anti-static bags are welcome but not required.",
    ),
  },
  {
    slug: "drives",
    name: "Hard drives and SSDs",
    icon: "drive",
    synonyms: ["hdd", "ssd", "hard disk", "nvme", "storage", "flash drive"],
    policy: free(
      "Drives of any size or interface.",
      "Drives hold data. Tell us at drop-off if a drive still has data on it so it is handled accordingly.",
    ),
  },
  {
    slug: "phones-tablets",
    name: "Phones and tablets",
    icon: "phone",
    synonyms: ["iphone", "android", "ipad", "cell", "mobile", "smartphone"],
    policy: free(
      "Any make, working or not, with or without the battery.",
      "Sign out of your accounts and remove any activation lock first, or the device cannot be reused.",
    ),
  },
  {
    slug: "monitors",
    name: "Monitors",
    icon: "monitor",
    synonyms: ["display", "screen", "lcd", "led monitor", "flat panel"],
    policy: free(
      "Flat panel computer monitors.",
      "Bring the stand if it detaches. Cables are welcome too.",
    ),
  },
  {
    slug: "flat-screen-tvs",
    name: "Flat screen TVs",
    icon: "tv",
    synonyms: ["television", "tv", "lcd tv", "led tv", "plasma", "flat screen"],
    policy: verified(
      {
        status: "accepted-fee" as const,
        conditions:
          "Flat screen LED televisions are accepted. CRT televisions are not accepted.",
        preparation: "Keep the screen intact and bring the stand or power cable if you still have them.",
        fee: "$15 per LED TV",
      },
      "Operator confirmation, 2026-08-17.",
    ),
  },
  {
    slug: "crt",
    name: "CRT TVs and monitors",
    icon: "crt",
    synonyms: ["crt", "tube tv", "old tv", "picture tube", "cathode"],
    policy: verified(
      {
        status: "not-accepted" as const,
        conditions:
          "CRT televisions and CRT monitors are not accepted by EVER.",
        preparation:
          "Use a local CRT-specific recycling or household hazardous waste program for tube displays.",
        fee: "",
      },
      "Operator confirmation, 2026-08-17.",
    ),
  },
  {
    slug: "printers",
    name: "Printers and scanners",
    icon: "printer",
    synonyms: ["printer", "scanner", "copier", "all in one", "plotter", "fax"],
    policy: free(
      "Desktop and office printers, scanners, and copiers.",
      "Take the toner or ink cartridge out if you can. Most cartridge programs take those separately.",
    ),
  },
  {
    slug: "gaming",
    name: "Gaming systems",
    icon: "console",
    synonyms: ["console", "xbox", "playstation", "nintendo", "ps5", "controller", "handheld"],
    policy: free(
      "Consoles, controllers, and handhelds.",
      "Sign out of your account first if the console still powers on.",
    ),
  },
  {
    slug: "cables",
    name: "Cables and accessories",
    icon: "cable",
    synonyms: ["cable", "cord", "keyboard", "mouse", "charger", "adapter", "wire", "dock"],
    policy: free(
      "Cabling, keyboards, mice, chargers, docks, and adapters.",
      "Loose in a box is fine. No need to coil or sort anything.",
    ),
  },
  {
    slug: "power",
    name: "Power supplies and UPS units",
    icon: "power",
    synonyms: ["psu", "ups", "battery backup", "power supply", "pdu", "surge protector"],
    policy: free(
      "Power supplies, PDUs, and uninterruptible power supplies.",
      "A UPS usually contains a sealed lead battery. Leave it in place and tell us it is there.",
    ),
  },
  {
    slug: "batteries",
    name: "Loose lithium batteries",
    icon: "battery",
    synonyms: ["battery", "lithium", "li-ion", "power bank", "swollen", "vape"],
    policy: drafted(
      {
        status: "contact-first" as const,
        conditions:
          "Loose lithium cells and power banks are a fire risk in transport and in the bin, so they need to be arranged rather than dropped off unannounced. A battery still inside its device is fine.",
        preparation:
          "Do not bring a swollen or damaged battery in a vehicle. Contact us and we will tell you the safe route.",
        fee: "",
      },
      "Drafted on safety grounds rather than economics. Confirm how EVER wants to handle loose lithium.",
    ),
  },
  {
    slug: "cameras",
    name: "Cameras and drones",
    icon: "camera",
    synonyms: ["camera", "dslr", "gopro", "drone", "lens", "camcorder", "security camera"],
    policy: free(
      "Digital cameras, lenses, drones, and security cameras.",
      "Remove the memory card if it has photos you want.",
    ),
  },
  {
    slug: "audio-video",
    name: "Audio and video equipment",
    icon: "audio",
    synonyms: ["stereo", "receiver", "amplifier", "speaker", "soundbar", "dvd", "projector"],
    policy: free(
      "Receivers, amplifiers, players, projectors, and powered speakers.",
      "Bring the remote and power cable if they are still together.",
    ),
  },
  {
    slug: "appliances",
    name: "Large appliances",
    icon: "appliance",
    synonyms: ["fridge", "microwave", "washer", "dryer", "oven", "dishwasher", "ac"],
    policy: drafted(
      {
        status: "not-accepted" as const,
        conditions:
          "White goods and kitchen appliances are a different recycling stream with different handling, so EVER does not take them.",
        preparation: "Your local scrap metal or appliance recycler is the right route.",
        fee: "",
      },
      "Drafted as out of scope for an electronics recycler. Confirm EVER does not want this stream.",
    ),
  },
] as const;

/** A category may be presented as an answer only once its policy renders. */
export function isCategoryPublishable(category: ItemCategory): boolean {
  return category.policy.status !== "placeholder" && category.policy.value.status !== "unconfirmed";
}

export function publishableCategories(): readonly ItemCategory[] {
  return itemCategories.filter(isCategoryPublishable);
}

export function findCategory(slug: string): ItemCategory | undefined {
  return itemCategories.find((c) => c.slug === slug);
}

/** Match a typed query against a category name or its synonyms. */
export function matchesQuery(category: ItemCategory, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  if (category.name.toLowerCase().includes(q)) return true;
  return category.synonyms.some((s) => s.includes(q) || q.includes(s));
}

/** Human-readable status text. */
export function statusLabel(status: AcceptanceStatus): string {
  switch (status) {
    case "accepted-no-fee":
      return "Accepted: no recycling fee";
    case "accepted-fee":
      return "Accepted: fee applies";
    case "contact-first":
      return "Contact EVER first";
    case "not-accepted":
      return "Not currently accepted";
    case "unconfirmed":
      return "Acceptance information is not available right now.";
  }
}
