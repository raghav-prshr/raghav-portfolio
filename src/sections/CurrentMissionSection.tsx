import { Panel } from "../components/Panel";
import { Reveal } from "../components/Reveal";
import { SectionShell } from "../components/SectionShell";
import { currentMission, missionProjectId } from "../data/mission";
import { projects } from "../data/projects";
import { displayUrl, externalUrl } from "../lib/safeLinks";
import { firstText } from "../lib/text";
import type { MissionTask, SectionDef } from "../types";
import "../styles/mission-terminal-contact.css";

function TaskList({ tasks, state }: { tasks: MissionTask[]; state: "done" | "planned" }) {
  const done = state === "done";
  return (
    <ul className="quest__list" aria-label={done ? "Completed tasks" : "Planned tasks"}>
      {tasks.map((task, i) => {
        const placeholder = firstText(task.label) === undefined;
        return (
          <li
            key={`${i}-${task.label}`}
            className={`quest__task quest__task--${state}${placeholder ? " is-placeholder" : ""}`}
          >
            <span className="quest__box" aria-hidden="true">
              {done ? "✔" : ""}
            </span>
            <span className="quest__text">{task.label}</span>
            <span className="quest__badge">{done ? "Done" : "Planned"}</span>
          </li>
        );
      })}
    </ul>
  );
}

export function CurrentMissionSection({ def }: { def: SectionDef }) {
  const project = projects.find((p) => p.id === missionProjectId);
  const purpose = firstText(currentMission.objective, project?.summary);
  const status = firstText(currentMission.status, project?.status);

  const done = currentMission.tasks.filter((t) => t.done);
  const planned = currentMission.tasks.filter((t) => !t.done);
  const realDone = done.filter((t) => firstText(t.label) !== undefined).length;
  const realPlanned = planned.filter((t) => firstText(t.label) !== undefined).length;

  // Only shown if you set `progress` yourself in src/data/mission.ts.
  const rawProgress = currentMission.progress;
  const progress =
    typeof rawProgress === "number" && Number.isFinite(rawProgress)
      ? Math.min(100, Math.max(0, Math.round(rawProgress)))
      : undefined;

  const links = (project?.links ?? [])
    .map((l) => ({ label: l.label, href: externalUrl(l.href) }))
    .filter((l): l is { label: string; href: string } => l.href !== null);

  return (
    <SectionShell id={def.id} number={def.number} title={def.label} subtitle={def.hint}>
      <Reveal>
        <Panel title="Active mission" tag="CURRENT" accent="cyan">
          <div className="quest">
            <div className="quest__brief">
              <p className="quest__label">Mission brief</p>
              <h3 className="quest__title">{currentMission.title}</h3>

              <p className="quest__label quest__label--gap">Purpose</p>
              {purpose ? (
                <p className="quest__purpose">{purpose}</p>
              ) : (
                <p className="quest__purpose is-placeholder">Purpose not written yet.</p>
              )}

              <p className="quest__label quest__label--gap">Status</p>
              <div className="quest__meta">
                {status ? (
                  <span className="quest__chip">{status}</span>
                ) : (
                  <span className="quest__chip is-placeholder">Not set</span>
                )}
              </div>

              {progress !== undefined && (
                <div className="quest__progress">
                  <div
                    className="quest__bar"
                    role="progressbar"
                    aria-label="Mission progress"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={progress}
                  >
                    <span style={{ width: `${progress}%` }} />
                  </div>
                  <span className="quest__pct">{progress}%</span>
                </div>
              )}

              {links.length > 0 && (
                <div className="quest__links">
                  {links.map((l) => (
                    <a key={l.href} className="quest__link" href={l.href} target="_blank" rel="noopener noreferrer">
                      {l.label}
                      <span className="sr-only"> ({displayUrl(l.href)}, opens in a new tab)</span>
                    </a>
                  ))}
                </div>
              )}
            </div>

            <div className="quest__log">
              <p className="quest__label">
                Objectives
                {realDone + realPlanned > 0 && (
                  <span className="quest__count">
                    {" "}
                    · {realDone} done · {realPlanned} planned
                  </span>
                )}
              </p>

              <section className="quest__group" aria-label="Completed">
                <h4 className="quest__group-head quest__group-head--done">Completed</h4>
                {done.length > 0 ? (
                  <TaskList tasks={done} state="done" />
                ) : (
                  <p className="quest__empty">No completed tasks listed yet.</p>
                )}
              </section>

              <section className="quest__group" aria-label="Planned">
                <h4 className="quest__group-head quest__group-head--planned">Planned</h4>
                {planned.length > 0 ? (
                  <TaskList tasks={planned} state="planned" />
                ) : (
                  <p className="quest__empty">No planned tasks listed yet.</p>
                )}
              </section>
            </div>
          </div>
        </Panel>
      </Reveal>
    </SectionShell>
  );
}
