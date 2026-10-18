import { useCallback, useEffect, useRef, useState } from "react";
import type { FormEvent, KeyboardEvent } from "react";
import { Panel } from "../components/Panel";
import { Reveal } from "../components/Reveal";
import { SectionShell } from "../components/SectionShell";
import { site } from "../data/profile";
import { COMMAND_NAMES, bannerLines, completeCommand, execute } from "../lib/terminalCommands";
import type { TerminalLine } from "../lib/terminalCommands";
import type { SectionDef } from "../types";
import "../styles/mission-terminal-contact.css";

type Entry = TerminalLine & { id: number };

const MAX_ENTRIES = 300;
const MAX_HISTORY = 50;

function LineContent({ line }: { line: TerminalLine }) {
  const external = line.href?.startsWith("http");
  return (
    <>
      {line.tone === "input" && (
        <span className="term__ps" aria-hidden="true">
          ${" "}
        </span>
      )}
      {line.text}
      {line.href && (
        <a
          href={line.href}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {line.hrefLabel ?? line.href}
        </a>
      )}
    </>
  );
}

export function TerminalSection({ def }: { def: SectionDef }) {
  const nextId = useRef(0);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const withIds = useCallback((lines: TerminalLine[]): Entry[] => lines.map((line) => ({ ...line, id: nextId.current++ })), []);

  const [entries, setEntries] = useState<Entry[]>(() => bannerLines().map((line, i) => ({ ...line, id: -1 - i })));
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState(-1); // -1 = not browsing history

  // Keep the newest output in view (scrolls the log box only, never the page).
  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [entries]);

  const run = useCallback(
    (raw: string) => {
      const command = raw.trim();
      if (!command) return;

      setHistory((h) => (h[h.length - 1] === command ? h : [...h, command].slice(-MAX_HISTORY)));
      setCursor(-1);

      const result = execute(command);
      if (result.type === "clear") {
        setEntries([]);
        return;
      }
      const added = withIds([{ tone: "input", text: command }, ...result.lines]);
      setEntries((prev) => [...prev, ...added].slice(-MAX_ENTRIES));
    },
    [withIds],
  );

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    run(value);
    setValue("");
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return;

    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const next = Math.min(cursor + 1, history.length - 1);
      setCursor(next);
      setValue(history[history.length - 1 - next] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (cursor < 0) return;
      const next = cursor - 1;
      setCursor(next);
      setValue(next < 0 ? "" : (history[history.length - 1 - next] ?? ""));
    } else if (e.key === "Tab" && value.trim()) {
      const match = completeCommand(value);
      if (match) {
        e.preventDefault();
        setValue(match);
      }
    } else if (e.key.toLowerCase() === "l" && e.ctrlKey) {
      e.preventDefault();
      setEntries([]);
    }
  };

  // Click anywhere on the log to focus the input, unless the visitor is selecting text.
  const focusInput = () => {
    if (window.getSelection()?.toString()) return;
    inputRef.current?.focus({ preventScroll: true });
  };

  const host = `guest@${site.handle.toLowerCase()}`;

  return (
    <SectionShell id={def.id} number={def.number} title={def.label} subtitle={def.hint}>
      <Reveal>
        <Panel title={host} tag="READ-ONLY" accent="green" className="panel--flush">
          <div className="term">
            <div
              ref={logRef}
              className="term__log"
              role="log"
              aria-live="polite"
              aria-label="Terminal output"
              tabIndex={0}
              onClick={focusInput}
            >
              {entries.map((entry) => (
                <p key={entry.id} className={`term__line term__line--${entry.tone}`}>
                  <LineContent line={entry} />
                </p>
              ))}
            </div>

            <form className="term__form" onSubmit={onSubmit}>
              <label htmlFor="terminal-input" className="term__ps">
                <span className="term__host" aria-hidden="true">
                  {host}:~
                </span>
                <span aria-hidden="true">$</span>
                <span className="sr-only">Terminal command</span>
              </label>
              <input
                ref={inputRef}
                id="terminal-input"
                className="term__input"
                type="text"
                value={value}
                maxLength={120}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={onKeyDown}
                enterKeyHint="send"
                autoCapitalize="off"
                autoCorrect="off"
                autoComplete="off"
                spellCheck={false}
                placeholder="type a command, e.g. help"
              />
              <button type="submit" className="term__send">
                Run
              </button>
            </form>

            <div className="term__chips" role="group" aria-label="Quick commands">
              {COMMAND_NAMES.map((name) => (
                <button key={name} type="button" className="term__chip" onClick={() => run(name)}>
                  {name}
                </button>
              ))}
            </div>
          </div>
        </Panel>
      </Reveal>
    </SectionShell>
  );
}
