import { useEffect, useState } from "react";
import type { SectionDef, Project } from "../types";
import { projects } from "../data/projects";

import { Reveal } from "../components/Reveal";
import { SectionShell } from "../components/SectionShell";

function ProjectDetails({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="mission-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="mission-dialog" role="dialog" aria-modal="true" aria-labelledby="mission-dialog-title">
        <header className="mission-dialog-head"><span>{project.codename} // BRIEFING</span><button type="button" onClick={onClose} aria-label="Close project details">×</button></header>
        <p className="mission-category">{project.category}</p>
        <h3 id="mission-dialog-title">{project.title}</h3>
        <p className="mission-summary">{project.summary}</p>
        <p className="mission-label">TECH STACK</p>
        <div className="stack-list">{project.stack.length ? project.stack.map((item) => <span key={item}>{item}</span>) : <span>Stack not added yet</span>}</div>
        <p className="mission-label">STATUS</p><p>{project.status}</p>
        <div className="mission-links">{project.links.filter((link) => /^https?:\/\//i.test(link.href)).map((link) => <a key={link.label} href={link.href} target="_blank" rel="noreferrer">{link.label} ↗</a>)}</div>
        {/* <p className="mission-footnote">Only verified repository and demo links are shown. Project status is kept explicit.</p> */}
      </section>
    </div>
  );
}

export function MissionsSection({ def }: { def: SectionDef }) {
  const [selected, setSelected] = useState<Project | null>(null);
  return (
    <SectionShell id={def.id} number={def.number} title={def.label} subtitle="SELECT A MISSION TO OPEN ITS BRIEFING">
      <div className="mission-grid">
        {projects.map((project, index) => (
          <Reveal key={project.id} delay={index * 0.04}>
            <article className={`mission-card mission-card--${project.accent}`}>
              <div className="mission-card-top"><span>{project.codename}</span><span className="mission-status-dot" aria-hidden="true" /></div>
              <p className="mission-category">{project.category}</p>
              <h3>{project.title}</h3>
              <p className="mission-card-summary">{project.summary}</p>
              <div className="stack-list">{project.stack.slice(0, 4).map((item) => <span key={item}>{item}</span>)}</div>
              <div className="mission-card-bottom"><span className="mission-status">{project.status}</span><button type="button" onClick={() => setSelected(project)}>OPEN BRIEFING <span aria-hidden="true">↗</span></button></div>
            </article>
          </Reveal>
        ))}
      </div>
      {selected && <ProjectDetails project={selected} onClose={() => setSelected(null)} />}
    </SectionShell>
  );
}
