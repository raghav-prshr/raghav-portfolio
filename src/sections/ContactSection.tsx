import { Panel } from "../components/Panel";
import { Reveal } from "../components/Reveal";
import { SectionShell } from "../components/SectionShell";
import { contact } from "../data/profile";
import { getContactChannels } from "../lib/contactChannels";
import { firstText } from "../lib/text";
import type { SectionDef } from "../types";
import "../styles/mission-terminal-contact.css";

const DEFAULT_MESSAGE = "Want to talk about a project or an opportunity? Pick a channel below.";

export function ContactSection({ def }: { def: SectionDef }) {
  const channels = getContactChannels();
  const message = firstText(contact.message) ?? DEFAULT_MESSAGE;

  return (
    <SectionShell id={def.id} number={def.number} title={def.label} subtitle={def.hint}>
      <Reveal>
        <Panel
          title="Open channels"
          tag={channels.length > 0 ? `${channels.length} AVAILABLE` : "NONE YET"}
          accent="cyan"
        >
          <p className="contact__message">{message}</p>

          {channels.length > 0 ? (
            <ul className="contact__grid">
              {channels.map((c) => {
                const newTab = c.kind !== "mailto";
                return (
                  <li key={c.id}>
                    <a
                      className="channel"
                      href={c.href}
                      {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      <span className="channel__slot" aria-hidden="true">
                        {c.glyph}
                      </span>
                      <span className="channel__text">
                        <span className="channel__label">{c.label}</span>
                        <span className="channel__value">{c.display}</span>
                      </span>
                      <span className="channel__arrow" aria-hidden="true">
                        {newTab ? "↗" : "→"}
                      </span>
                      {newTab && <span className="sr-only">(opens in a new tab)</span>}
                    </a>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="contact__empty">Contact channels have not been configured yet.</p>
          )}
        </Panel>
      </Reveal>
    </SectionShell>
  );
}
