import type { ReactNode } from "react";

interface GlitchTextProps {
  /** Plain text used for the glitch layers. */
  text: string;
  /** Optional styled content; defaults to `text`. */
  children?: ReactNode;
}

/** CSS-only glitch: a brief burst every few seconds, no JS timers. */
export function GlitchText({ text, children }: GlitchTextProps) {
  return (
    <span className="glitch" data-text={text}>
      {children ?? text}
    </span>
  );
}
