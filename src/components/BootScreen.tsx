import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface BootScreenProps {
  title: string;
  lines: string[];
  onDone: () => void;
}

const STEP_MS = 260;
const HOLD_MS = 450;

/** ~2 second boot log. Skippable with any key or the skip button. */
export function BootScreen({ title, lines, onDone }: BootScreenProps) {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(reduce ? lines.length : 0);
  const finished = useRef(false);

  const finish = useCallback(() => {
    if (finished.current) return;
    finished.current = true;
    onDone();
  }, [onDone]);

  // Reveal one line at a time, then hold briefly and hand over.
  useEffect(() => {
    if (count >= lines.length) {
      const t = window.setTimeout(finish, reduce ? 500 : HOLD_MS);
      return () => window.clearTimeout(t);
    }
    const t = window.setTimeout(() => setCount((c) => c + 1), STEP_MS);
    return () => window.clearTimeout(t);
  }, [count, lines.length, reduce, finish]);

  // Any key skips.
  useEffect(() => {
    window.addEventListener("keydown", finish);
    return () => window.removeEventListener("keydown", finish);
  }, [finish]);

  const progress = lines.length === 0 ? 1 : Math.min(count / lines.length, 1);

  return (
    <motion.div
      className="boot"
      role="status"
      aria-label="Loading portfolio"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="boot__inner">
        <p className="boot__brand">{title}</p>
        <ul className="boot__log">
          {lines.slice(0, count).map((line, i) => (
            <li key={`${i}-${line}`}>
              <span className="boot__ok">[ OK ]</span> {line}
            </li>
          ))}
        </ul>
        <div className="boot__bar" aria-hidden="true">
          <span style={{ transform: `scaleX(${progress})` }} />
        </div>
        <button type="button" className="boot__skip" onClick={finish}>
          SKIP ▸ <span>(any key)</span>
        </button>
      </div>
    </motion.div>
  );
}
