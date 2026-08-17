import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import {
  CommercialScene,
  EquipmentVisualScene,
  FinalDecisionScene,
  LocalServiceScene,
  QuickAnswerScene,
  RouteScene,
  TrustScene,
  ValueRecoveryScene,
} from "@/components/HomeSections";

export const metadata: Metadata = {
  title: "Electronic Recycling & E-Waste Pickup in Arizona | EVER",
  description: "Electronic recycling, e-waste recycling, free drop-off for most accepted electronics, residential pickup, and business electronics pickup across Gilbert, Chandler, Queen Creek, San Tan Valley, Mesa, Tempe, Phoenix, and Florence, Arizona.",
  alternates: { canonical: "/" },
  openGraph: { title: "Electronic Recycling & E-Waste Pickup in Arizona | EVER", description: "Recycle electronics, computers, laptops, servers, drives, TVs and e-waste with EVER across the East Valley, Phoenix and Florence.", url: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <QuickAnswerScene />
      <EquipmentVisualScene />
      <CommercialScene />
      <RouteScene />
      <ValueRecoveryScene />
      <LocalServiceScene />
      <TrustScene />
      <FinalDecisionScene />
    </>
  );
}
