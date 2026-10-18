import type { MouseEvent } from "react";
import { site } from "../data/profile";
import { sections } from "../data/sections";
import { scrollToSection } from "../lib/scroll";

interface HudNavProps {
  /** id of the section currently in view ("home" or a section id). */
  active: string;
}

function go(e: MouseEvent<HTMLAnchorElement>, id: string) {
  e.preventDefault();
  scrollToSection(id);
}

/** Top HUD bar (brand + status) plus a nav that becomes a bottom dock on phones. */
export function HudNav({ active }: HudNavProps) {
  return (
    <>
      <header className="hud">
        <a className="hud__brand" href="#home" onClick={(e) => go(e, "home")}>
          <span className="hud__mark" aria-hidden="true" />
          {site.handle}
          <span className="hud__cursor" aria-hidden="true">_</span>
        </a>
        <span className="hud__status">
          <i aria-hidden="true" /> SYSTEM ONLINE
        </span>
      </header>

      <nav className="dock" aria-label="Sections">
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className={`dock__link${active === s.id ? " is-active" : ""}`}
            aria-current={active === s.id ? "true" : undefined}
            onClick={(e) => go(e, s.id)}
          >
            <span className="dock__num">{s.number}</span>
            <span className="dock__label">{s.menuLabel}</span>
          </a>
        ))}
      </nav>
    </>
  );
}
