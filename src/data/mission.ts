import type { CurrentMission } from "../types";

export const missionProjectId = "codeatlas";

/*
 * CURRENT MISSION — CodeAtlas.
 *
 * Fill in only what is true:
 *   • objective  – the purpose of the mission. If left as TODO, the CodeAtlas
 *                  project summary from projects.ts is shown instead.
 *   • status     – e.g. "In progress". If left as TODO, the CodeAtlas project
 *                  status from projects.ts is shown instead.
 *   • tasks      – one entry per task. `done: true` = completed,
 *                  `done: false` = planned. Nothing is ever marked done for you.
 *   • progress   – optional 0–100. Left unset, no progress bar is shown.
 *
 * Example tasks (delete the TODO line when you add yours):
 *   { label: "Something you have finished", done: true },
 *   { label: "Something you intend to do next", done: false },
 */
export const currentMission: CurrentMission = {
  title: "CodeAtlas",
  objective: "TODO: what this mission is for, in one or two sentences.",
  status: "TODO: current status",
  tasks: [{ label: "Design UI/UX", done: false }],
   progress: 4,
};
