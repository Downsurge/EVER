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
