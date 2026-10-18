import type { ComponentType } from "react";
import type { SectionDef } from "../types";
import { PlayerSection } from "./PlayerSection";
import { InventorySection } from "./InventorySection";
import { MissionsSection } from "./MissionsSection";
import { CurrentMissionSection } from "./CurrentMissionSection";
import { TerminalSection } from "./TerminalSection";
import { ContactSection } from "./ContactSection";

export type SectionComponent = ComponentType<{ def: SectionDef }>;

export const sectionComponents: Record<string, SectionComponent> = {
  player: PlayerSection,
  inventory: InventorySection,
  missions: MissionsSection,
  current: CurrentMissionSection,
  terminal: TerminalSection,
  contact: ContactSection,
};
