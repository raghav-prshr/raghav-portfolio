import type { SectionDef } from "../types";
import { inventory } from "../data/skills";
import { Panel } from "../components/Panel";
import { Reveal } from "../components/Reveal";
import { SectionShell } from "../components/SectionShell";

export function InventorySection({ def }: { def: SectionDef }) {
  return (
    <SectionShell id={def.id} number={def.number} title={def.label} subtitle="EQUIPPED TOOLS ">
      <div className="inventory-grid">
        {inventory.map((category, index) => (
          <Reveal key={category.id} delay={index * 0.04}>
            <Panel title={category.label} tag={`${String(category.skills.length).padStart(2, "0")} ITEMS`} accent={category.accent} className="inventory-panel">
              <div className="inventory-slots">
                {category.skills.map((skill) => (
                  <div className="inventory-item" key={skill.name} title={skill.note ?? skill.name}>
                    <span className="inventory-glyph">{skill.glyph}</span>
                    <span className="inventory-item-name">{skill.name}</span>
                    {skill.note && <span className="inventory-note">{skill.note}</span>}
                  </div>
                ))}
                {Array.from({ length: category.emptySlots }, (_, i) => <div className="inventory-empty" aria-hidden="true" key={`empty-${i}`}><span>+</span></div>)}
              </div>
            </Panel>
          </Reveal>
        ))}
      </div>
      <p className="section-footnote">Inventory reflects tools used in projects and current learning areas. Skills are not ranked by invented percentages.</p>
    </SectionShell>
  );
}
