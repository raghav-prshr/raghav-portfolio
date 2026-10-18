import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

interface SectionShellProps {
  id: string;
  number: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}

/** Shared wrapper for every scroll section: anchor id, numbered heading, content width. */
export function SectionShell({ id, number, title, subtitle, children }: SectionShellProps) {
  return (
    <section id={id} className="section" aria-labelledby={`${id}-title`}>
      <div className="section__inner">
        <Reveal>
          <header className="section__head">
            <span className="section__num">{number}</span>
            <div className="section__titles">
              <h2 id={`${id}-title`} className="section__title">
                {title}
              </h2>
              {subtitle && <p className="section__sub">{subtitle}</p>}
            </div>
            <span className="section__rule" aria-hidden="true" />
          </header>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
