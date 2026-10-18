import type { SectionDef } from "../types";
import { Panel } from "./Panel";
import { Reveal } from "./Reveal";
import { SectionShell } from "./SectionShell";

/** Temporary stand-in for sections that are delivered in later file groups. */
export function LockedSection({ def }: { def: SectionDef }) {
  return (
    <SectionShell id={def.id} number={def.number} title={def.label} subtitle={def.hint}>
      <Reveal>
        <Panel title="Module locked" tag="PENDING" accent="cyan">
          <p className="locked">
            [ LOCKED ] This section is delivered in a later file group. The shell, nav and scroll
            tracking are already wired up.
          </p>
        </Panel>
      </Reveal>
    </SectionShell>
  );
}
