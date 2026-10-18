import type { SectionDef } from "../types";

/** Order here = order on the page = order in the nav and main menu. */
export const sections: SectionDef[] = [
  { id: "player", number: "01", label: "Player Profile", menuLabel: "Player", hint: "Who is behind the controller" },
  { id: "inventory", number: "02", label: "Skills Inventory", menuLabel: "Inventory", hint: "Tools and tech equipped" },
  { id: "missions", number: "03", label: "Project Missions", menuLabel: "Missions", hint: "Pick a mission to inspect" },
  { id: "current", number: "04", label: "Current Mission", menuLabel: "Now", hint: "What is in progress right now" },
  { id: "terminal", number: "05", label: "Terminal", menuLabel: "Terminal", hint: "Type help to get started" },
  { id: "contact", number: "06", label: "Contact", menuLabel: "Contact", hint: "Open a channel" },
];
