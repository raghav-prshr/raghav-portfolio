import type { ReactNode } from "react";
import type { Accent } from "../types";

interface PanelProps {
  title?: string;
  /** Small label on the right of the header, e.g. "LV 3" or "LOCKED". */
  tag?: string;
  accent?: Accent;
  className?: string;
  children: ReactNode;
}

/** The base "game window": notched corners, accent border, optional header. */
export function Panel({ title, tag, accent = "green", className = "", children }: PanelProps) {
  return (
    <div className={`panel panel--${accent} ${className}`.trim()}>
      {(title || tag) && (
        <header className="panel__head">
          {title && <h3 className="panel__title">{title}</h3>}
          {tag && <span className="panel__tag">{tag}</span>}
        </header>
      )}
      <div className="panel__body">{children}</div>
    </div>
  );
}
