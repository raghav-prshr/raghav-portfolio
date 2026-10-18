import type { SectionDef } from "../types";
import { player } from "../data/profile";
import { Panel } from "../components/Panel";
import { Reveal } from "../components/Reveal";
import { SectionShell } from "../components/SectionShell";

export function PlayerSection({ def }: { def: SectionDef }) {
  return (
    <SectionShell id={def.id} number={def.number} title={def.label} subtitle="PLAYER DATA // PUBLIC PROFILE">
      <div className="player-layout">
        <Reveal className="player-main">
          <Panel title="PLAYER PROFILE" tag="PROFILE_001">
            <p className="player-kicker">CURRENT CLASS</p>
            <h3 className="player-name">{player.name}</h3>
            <p className="player-role">{player.title}</p>
            <div className="player-bio">{player.bio.map((p) => <p key={p}>{p}</p>)}</div>
          </Panel>
        </Reveal>
        <Reveal delay={0.08} className="player-facts">
          <Panel title="PLAYER DATA" tag="READ ONLY" accent="cyan">
            <dl className="fact-list">
              {player.facts.map((fact) => <div className="fact-row" key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}
            </dl>
          </Panel>
          <p className="section-footnote">STATUS: STUDENT DEVELOPER · BUILDING IN PUBLIC</p>
        </Reveal>
      </div>
    </SectionShell>
  );
}
