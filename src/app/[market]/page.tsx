import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Hero } from "@/components/Hero";
import { CommercialScene, EquipmentVisualScene, FinalDecisionScene, LocalServiceScene, QuickAnswerScene, RouteScene, TrustScene, ValueRecoveryScene } from "@/components/HomeSections";
import { getMarket, isMarketKey } from "@/data/markets";
import { PricingSnapshot, ResourceSnapshot, WhoWeServeSnapshot } from "@/components/MarketGrowthSections";

export async function generateMetadata({ params }: { params: Promise<{ market: string }> }): Promise<Metadata> {
  const { market } = await params; const cfg = getMarket(market); if (!cfg) return {};
  return { title: `Electronic Recycling & E-Waste Pickup in ${cfg.marketLabel} | ${cfg.brandShort}`, description: cfg.support, alternates: { canonical: cfg.homepage } };
}

export default async function MarketHome({ params }: { params: Promise<{ market: string }> }) {
  const { market } = await params; if (!isMarketKey(market)) notFound();
  return <><Hero market={market}/><QuickAnswerScene market={market}/><EquipmentVisualScene market={market}/><CommercialScene market={market}/><WhoWeServeSnapshot market={market}/><PricingSnapshot market={market}/><RouteScene market={market}/><ValueRecoveryScene market={market}/><LocalServiceScene market={market}/><TrustScene market={market}/><ResourceSnapshot market={market}/><FinalDecisionScene market={market}/></>;
}
